/**
 * PDF conversion route.
 * Source: 05-技术方案 §5.1 + §5.6 (API 响应规范)
 *
 * POST /api/convert/pdf
 * Body: { markdown: string }
 * Success: 200 + application/pdf binary stream
 * Errors: 400/413/429/500/504
 */

import { Router } from 'express';
import { generatePdf } from '../services/pdf-generator.js';
import { validateConvertRequest } from '../middleware/request-validator.js';

const router = Router();

/** Express route timeout: 35s (5s more than Puppeteer's 30s for cleanup) */
const ROUTE_TIMEOUT_MS = 35_000;

router.post('/pdf', validateConvertRequest, async (req, res) => {
  // Set route-level timeout
  req.setTimeout(ROUTE_TIMEOUT_MS);
  res.setTimeout(ROUTE_TIMEOUT_MS);

  try {
    const { markdown } = req.body;

    const pdfBuffer = await generatePdf(markdown);

    // Generate filename from first H1 or fallback to timestamp
    const filename = extractFilename(markdown, 'pdf');

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', pdfBuffer.length.toString());
    res.send(pdfBuffer);
  } catch (error: any) {
    console.error('[convert-pdf] Error:', error.message);

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
