/**
 * Express backend entry point.
 * Source: 05-技术方案文档 §4.2
 */

import express from 'express';
import cors from 'cors';
import { config } from './config.js';
import healthRouter from './routes/health.js';
import convertPdfRouter from './routes/convert-pdf.js';
import convertWordRouter from './routes/convert-word.js';
import { convertRateLimiter } from './middleware/rate-limiter.js';
import { attachUser } from './middleware/auth.js';

const app = express();

// ─── Middleware ───────────────────────────────────────────────

// CORS: only allow requests from the frontend origin (05 §2.2)
app.use(
  cors({
    origin: config.allowedOrigin,
    methods: ['GET', 'POST'],
  })
);

// JSON body parser with 500KB limit (05 §2.2, shared CONTENT_LIMITS)
app.use(express.json({ limit: '500kb' }));

// ─── Routes ──────────────────────────────────────────────────

app.use(healthRouter);

// Auth: parse bearer token if present; populate req.user. Always runs before
// rate-limiter so the limiter can skip authenticated callers.
app.use('/api/convert', attachUser);

// IP rate limiting on convert routes for anonymous callers only.
// Authenticated users are gated by per-user quota inside each route.
app.use('/api/convert', convertRateLimiter);
// Convert routes
app.use('/api/convert', convertPdfRouter);
app.use('/api/convert', convertWordRouter);

// ─── Start Server ────────────────────────────────────────────

app.listen(config.port, () => {
  console.log(
    `[backend] Server running on port ${config.port} (${config.nodeEnv})`
  );
});

export default app;
