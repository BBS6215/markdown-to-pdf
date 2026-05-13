/**
 * IP-based rate limiting middleware.
 * Source: 05-技术方案 §6.2 (匿名用户用量追踪)
 *
 * - Same IP: max 10 PDF+Word requests per day (24h sliding window)
 * - Exceeding returns 429 with JSON error body
 * - Only applied to /api/convert routes (not /health)
 */

import rateLimit from 'express-rate-limit';
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
  // Skip authenticated users — they are gated by per-user quota instead.
  skip: (req) => Boolean(req.user),
  keyGenerator: (req) => {
    // Use X-Forwarded-For if behind proxy (Render), otherwise remoteAddress
    return (
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      req.ip ||
      'unknown'
    );
  },
});
