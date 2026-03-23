/**
 * PDF generation service.
 * Source: 05-技术方案 §5.1 (数据流场景 1) + §11 风险 1/4
 *
 * Flow: Markdown → HTML (via markdown-renderer) → Puppeteer page.setContent → page.pdf → Buffer
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { getBrowser } from './browser-pool.js';
import { renderMarkdownToHtml } from './markdown-renderer.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const stylesDir = join(__dirname, '..', 'styles');

// Load CSS files once at startup
let githubMarkdownCss: string;
let pageBreakCss: string;

try {
  // In dev mode (tsx), resolve from src/styles/
  githubMarkdownCss = readFileSync(join(stylesDir, 'github-markdown.css'), 'utf-8');
  pageBreakCss = readFileSync(join(stylesDir, 'pdf-page-break.css'), 'utf-8');
} catch {
  // In production (compiled), styles are copied to dist/styles/
  const distStylesDir = join(__dirname, 'styles');
  githubMarkdownCss = readFileSync(join(distStylesDir, 'github-markdown.css'), 'utf-8');
  pageBreakCss = readFileSync(join(distStylesDir, 'pdf-page-break.css'), 'utf-8');
}

/** PDF generation timeout in milliseconds (05 §11 风险 4) */
const PDF_TIMEOUT_MS = 30_000;

/**
 * Generate PDF buffer from Markdown string.
 * @returns PDF as Buffer
 * @throws Error on timeout or generation failure
 */
export async function generatePdf(markdown: string): Promise<Buffer> {
  const html = await renderMarkdownToHtml(markdown);

  const fullHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>${githubMarkdownCss}</style>
  <style>${pageBreakCss}</style>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans",
        Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
      padding: 32px;
      max-width: 800px;
      margin: 0 auto;
    }
  </style>
</head>
<body class="markdown-body">
  ${html}
</body>
</html>`;

  const browser = await getBrowser();
  const page = await browser.newPage();

  try {
    await page.setContent(fullHtml, { waitUntil: 'networkidle0' });

    // Log memory usage for Phase 1 pressure testing (07 §4 任务 1.14)
    const memBefore = process.memoryUsage();

    const pdfBuffer = await Promise.race([
      page.pdf({
        format: 'A4',
        margin: { top: '20mm', right: '15mm', bottom: '20mm', left: '15mm' },
        printBackground: true,
      }),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('PDF generation timed out')), PDF_TIMEOUT_MS)
      ),
    ]);

    const memAfter = process.memoryUsage();
    console.log(
      `[pdf-generator] Memory: RSS ${Math.round(memAfter.rss / 1024 / 1024)}MB ` +
      `(delta +${Math.round((memAfter.rss - memBefore.rss) / 1024 / 1024)}MB), ` +
      `input ${markdown.length} bytes`
    );

    return Buffer.from(pdfBuffer);
  } finally {
    await page.close();
  }
}
