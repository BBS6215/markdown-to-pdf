/**
 * Word conversion route.
 * Source: 05-技术方案 §5.2 + §5.6 (API 响应规范)
 *
 * POST /api/convert/word
 * Body: { markdown: string }
 * Success: 200 + application/vnd.openxmlformats binary stream
 * Errors: 400/413/429/500
 */

import { Router } from 'express';
import { generateWord } from '../services/word-generator.js';
import { validateConvertRequest } from '../middleware/request-validator.js';
import { extractFilename } from './convert-pdf.js';

const router = Router();

router.post('/word', validateConvertRequest, async (req, res) => {
  try {
    const { markdown } = req.body;

    const wordBuffer = await generateWord(markdown);
    const filename = extractFilename(markdown, 'word');

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    );
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', wordBuffer.length.toString());
    res.send(wordBuffer);
  } catch (error: any) {
    console.error('[convert-word] Error:', error.message);

    res.status(500).json({
      error: 'CONVERSION_FAILED',
      message: 'Failed to generate Word document. Please try again.',
    });
  }
});

export default router;
