/**
 * JWT auth middleware.
 *
 * - Reads Authorization: Bearer <access_token> from the request.
 * - If present, verifies the token with Supabase and attaches req.user.
 * - If absent or invalid, leaves req.user = null and lets the request through
 *   (anonymous flow handled downstream by IP rate limiter).
 *
 * Source: docs/09-服务端权威用量补丁.md
 */

import type { Request, Response, NextFunction } from 'express';
import { getAuthClient } from '../services/supabase.js';

export interface AuthUser {
  id: string;
  email: string | null;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user: AuthUser | null;
    }
  }
}

export async function attachUser(
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> {
  req.user = null;

  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return next();
  }

  const token = header.slice('Bearer '.length).trim();
  if (!token) return next();

  try {
    const client = getAuthClient();
    const { data, error } = await client.auth.getUser(token);
    if (!error && data?.user) {
      req.user = { id: data.user.id, email: data.user.email ?? null };
    }
  } catch (err) {
    // Treat verification failure as anonymous; do not block.
    console.warn('[auth] token verify failed:', (err as Error).message);
  }

  next();
}
