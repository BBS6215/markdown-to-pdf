/**
 * Word conversion route.
 * Source: 05-技术方案 §5.2 + §5.6 (API 响应规范)
 *
 * POST /api/convert/word
 * Body: { markdown: string }
 * Success: 200 + application/vnd.openxmlformats binary stream
 * Errors: 400/413/429/500/504
 */

import { Router } from 'express';
import { generateWord } from '../services/word-generator.js';
import { validateConvertRequest } from '../middleware/request-validator.js';
import { extractFilename } from './convert-pdf.js';

const router = Router();

/** Express route timeout: 35s (consistent with PDF route, 05 §11 风险 4) */
const ROUTE_TIMEOUT_MS = 35_000;

router.post('/word', validateConvertRequest, async (req, res) => {
  // Set route-level timeout
  req.setTimeout(ROUTE_TIMEOUT_MS);
  res.setTimeout(ROUTE_TIMEOUT_MS);

  try {
    const { markdown } = req.body;

    const wordBuffer = await generateWord(markdown);
    const filename = extractFilename(markdown, 'word');

    // Log memory for pressure testing (07 §4 任务 1.14)
    const mem = process.memoryUsage();
    console.log(
      `[convert-word] Memory: RSS ${Math.round(mem.rss / 1024 / 1024)}MB, ` +
      `input ${markdown.length} bytes, output ${wordBuffer.length} bytes`
    );

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    );
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', wordBuffer.length.toString());
    res.send(wordBuffer);
  } catch (error: any) {
    console.error('[convert-word] Error:', error.message);

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
