/**
 * IP-based rate limiting middleware (anonymous callers only).
 * Source: 05-技术方案 §6.2, docs/09-服务端权威用量补丁.md
 *
 * IP resolution relies on Express `app.set('trust proxy', ...)` configured
 * in index.ts. Do NOT reintroduce a custom keyGenerator that reads
 * X-Forwarded-For directly — that lets any caller spoof its IP and bypass
 * the limit. See https://express-rate-limit.mintlify.app/guides/troubleshooting-proxy-issues
 */

import { rateLimit } from 'express-rate-limit';
import { USAGE_LIMITS } from './constants.js';

export const convertRateLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: USAGE_LIMITS.IP_DAILY,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'RATE_LIMITED',
    message: 'Daily limit exceeded. Try again tomorrow.',
  },
  // Authenticated callers are gated by per-user quota (services/quota.ts).
  skip: (req) => Boolean(req.user),
  // Default keyGenerator uses req.ip, which is the trusted client IP once
  // trust proxy is configured correctly.
});
