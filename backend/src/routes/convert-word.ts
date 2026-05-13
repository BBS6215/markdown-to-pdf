/**
 * Word conversion route.
 * Source: 05-技术方案 §5.2 + §5.6, docs/09-服务端权威用量补丁.md
 *
 * POST /api/convert/word
 * Body: { markdown: string }
 * Optional Authorization: Bearer <supabase access_token>
 * Success: 200 + application/vnd.openxmlformats binary stream
 * Errors: 400/413/429/500/504
 */

import { Router } from 'express';
import { generateWord } from '../services/word-generator.js';
import { validateConvertRequest } from '../middleware/request-validator.js';
import { extractFilename } from './convert-pdf.js';
import { consumeQuota, refundQuota, recordConversion } from '../services/quota.js';

const router = Router();

const ROUTE_TIMEOUT_MS = 35_000;

router.post('/word', validateConvertRequest, async (req, res) => {
  req.setTimeout(ROUTE_TIMEOUT_MS);
  res.setTimeout(ROUTE_TIMEOUT_MS);

  const { markdown } = req.body;
  const user = req.user;
  const sourceSize = Buffer.byteLength(markdown, 'utf8');
  const filename = extractFilename(markdown, 'word');

  if (user) {
    try {
      const quota = await consumeQuota(user.id, 'word');
      if (!quota.allowed) {
        res.status(429).json({
          error: 'RATE_LIMITED',
          message: `Daily PDF/Word limit reached (${quota.count}/${quota.limit}). Resets at midnight UTC.`,
        });
        return;
      }
    } catch (err) {
      console.error('[convert-word] quota gate failed:', (err as Error).message);
      res.status(503).json({
        error: 'QUOTA_UNAVAILABLE',
        message: 'Quota service is temporarily unavailable. Please try again shortly.',
      });
      return;
    }
  }

  try {
    const wordBuffer = await generateWord(markdown);

    const mem = process.memoryUsage();
    console.log(
      `[convert-word] Memory: RSS ${Math.round(mem.rss / 1024 / 1024)}MB, ` +
      `input ${markdown.length} bytes, output ${wordBuffer.length} bytes`
    );

    if (user) {
      await recordConversion({
        userId: user.id,
        format: 'word',
        filename,
        fileSizeBytes: wordBuffer.length,
        sourceSizeBytes: sourceSize,
        status: 'success',
      });
    }

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    );
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', wordBuffer.length.toString());
    res.send(wordBuffer);
  } catch (error: any) {
    console.error('[convert-word] Error:', error.message);

    if (user) {
      await refundQuota(user.id, 'word');
      await recordConversion({
        userId: user.id,
        format: 'word',
        filename,
        fileSizeBytes: null,
        sourceSizeBytes: sourceSize,
        status: 'failed',
      });
    }

    if (error.message?.includes('timed out') || error.message?.includes('timeout')) {
      res.status(504).json({
        error: 'TIMEOUT',
        message: 'Conversion timed out. Try shorter content.',
      });
      return;
    }

    res.status(500).json({
      error: 'CONVERSION_FAILED',
      message: 'Failed to generate Word document. Please try again.',
    });
  }
});

export default router;
