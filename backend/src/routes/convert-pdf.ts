/**
 * PDF conversion route.
 * Source: 05-技术方案 §5.1 + §5.6, docs/09-服务端权威用量补丁.md
 *
 * POST /api/convert/pdf
 * Body: { markdown: string }
 * Optional Authorization: Bearer <supabase access_token>
 * Success: 200 + application/pdf binary stream
 * Errors: 400/413/429/500/504
 */

import { Router } from 'express';
import { generatePdf } from '../services/pdf-generator.js';
import { validateConvertRequest } from '../middleware/request-validator.js';
import { consumeQuota, refundQuota, recordConversion } from '../services/quota.js';

const router = Router();

/** Express route timeout: 35s (5s more than Puppeteer's 30s for cleanup) */
const ROUTE_TIMEOUT_MS = 35_000;

router.post('/pdf', validateConvertRequest, async (req, res) => {
  req.setTimeout(ROUTE_TIMEOUT_MS);
  res.setTimeout(ROUTE_TIMEOUT_MS);

  const { markdown } = req.body;
  const user = req.user;
  const sourceSize = Buffer.byteLength(markdown, 'utf8');
  const filename = extractFilename(markdown, 'pdf');

  // ── 1. Quota gate (logged-in users only; anonymous already passed IP limit) ──
  if (user) {
    try {
      const quota = await consumeQuota(user.id, 'pdf');
      if (!quota.allowed) {
        res.status(429).json({
          error: 'RATE_LIMITED',
          message: `Daily PDF/Word limit reached (${quota.count}/${quota.limit}). Resets at midnight UTC.`,
        });
        return;
      }
    } catch (err) {
      // RPC missing, service_role key wrong, Supabase outage, etc.
      // Return a structured JSON error instead of letting Express emit
      // an HTML 500 page that the frontend cannot parse.
      console.error('[convert-pdf] quota gate failed:', (err as Error).message);
      res.status(503).json({
        error: 'QUOTA_UNAVAILABLE',
        message: 'Quota service is temporarily unavailable. Please try again shortly.',
      });
      return;
    }
  }

  // ── 2. Convert ──
  try {
    const pdfBuffer = await generatePdf(markdown);

    if (user) {
      await recordConversion({
        userId: user.id,
        format: 'pdf',
        filename,
        fileSizeBytes: pdfBuffer.length,
        sourceSizeBytes: sourceSize,
        status: 'success',
      });
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', pdfBuffer.length.toString());
    res.send(pdfBuffer);
  } catch (error: any) {
    console.error('[convert-pdf] Error:', error.message);

    // ── 3. Refund quota on failure (per docs/06 §5.1: failed conversions don't count) ──
    if (user) {
      await refundQuota(user.id, 'pdf');
      await recordConversion({
        userId: user.id,
        format: 'pdf',
        filename,
        fileSizeBytes: null,
        sourceSizeBytes: sourceSize,
        status: 'failed',
      });
    }

    if (error.message?.includes('timed out')) {
      res.status(504).json({
        error: 'TIMEOUT',
        message: 'Conversion timed out. Try shorter content.',
      });
      return;
    }

    res.status(500).json({
      error: 'CONVERSION_FAILED',
      message: 'Failed to generate PDF. Please try again.',
    });
  }
});

/**
 * Extract filename from Markdown content.
 * Source: 05-技术方案 §6.4
 */
function extractFilename(markdown: string, format: string): string {
  const ext = format === 'word' ? 'docx' : format;
  const h1Match = markdown.match(/^#\s+(.+)$/m);
  if (h1Match) {
    const title = h1Match[1]
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .toLowerCase()
      .slice(0, 50);
    if (title) return `${title}.${ext}`;
  }
  return `markdown-${Date.now()}.${ext}`;
}

export default router;
export { extractFilename };
