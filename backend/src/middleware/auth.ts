/**
 * JWT auth middleware.
 *
 * Behavior:
 *   - No Authorization header                 → req.user = null, continue (anonymous flow).
 *   - Authorization present + token verifies  → req.user populated, continue.
 *   - Authorization present + token invalid   → 401 (do not silently degrade).
 *   - Authorization present + auth env missing → 503 (server misconfiguration).
 *
 * Silently downgrading invalid tokens to anonymous was the previous behavior;
 * it masked deploys where SUPABASE_ANON_KEY was wrong, made expired tokens
 * indistinguishable from logged-out, and let callers consume the anonymous
 * IP quota while believing they were logged in.
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
  res: Response,
  next: NextFunction
): Promise<void> {
  req.user = null;

  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return next();
  }

  const token = header.slice('Bearer '.length).trim();
  if (!token) {
    res.status(401).json({ error: 'INVALID_TOKEN', message: 'Empty bearer token.' });
    return;
  }

  let client;
  try {
    client = getAuthClient();
  } catch (err) {
    console.error('[auth] auth client unavailable:', (err as Error).message);
    res.status(503).json({
      error: 'AUTH_UNAVAILABLE',
      message: 'Authentication service is not configured.',
    });
    return;
  }

  try {
    const { data, error } = await client.auth.getUser(token);
    if (error || !data?.user) {
      res.status(401).json({
        error: 'INVALID_TOKEN',
        message: 'Token is invalid or expired. Sign in again.',
      });
      return;
    }
    req.user = { id: data.user.id, email: data.user.email ?? null };
    return next();
  } catch (err) {
    console.error('[auth] token verify exception:', (err as Error).message);
    res.status(503).json({
      error: 'AUTH_UNAVAILABLE',
      message: 'Authentication service is temporarily unavailable.',
    });
    return;
  }
}
