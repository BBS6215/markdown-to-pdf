/**
 * Pure-frontend Markdown → PDF via the browser's native print pipeline.
 *
 * Strategy: render the Markdown into a hidden iframe styled for print, then
 * call `iframe.contentWindow.print()`. The browser opens its native print
 * dialog where the default destination is "Save as PDF" — using the same
 * Chromium PDF engine that our backend Puppeteer pipeline would use, so the
 * output quality is essentially identical to the server-side path.
 *
 * Tradeoff vs server-side Puppeteer: the user has to confirm the save
 * dialog. We surface this expectation in the UI so it's not a surprise.
 */

import { renderMarkdownToSafeHtml } from '@/lib/markdown/render';
import { generateFilename } from './filename-generator';

const PRINT_STYLES = `
  @page { size: A4; margin: 20mm 15mm; }
  * { box-sizing: border-box; }
  html, body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans",
      Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    color: #1f2328;
    line-height: 1.6;
    font-size: 11pt;
  }
  body { padding: 0; }
  h1, h2, h3, h4, h5, h6 { color: #1f2328; line-height: 1.25; margin-top: 1.2em; margin-bottom: 0.6em; page-break-after: avoid; }
  h1 { font-size: 1.8em; border-bottom: 1px solid #d0d7de; padding-bottom: 0.3em; }
  h2 { font-size: 1.5em; border-bottom: 1px solid #d0d7de; padding-bottom: 0.3em; }
  h3 { font-size: 1.25em; }
  h4 { font-size: 1em; }
  p, ul, ol, blockquote, table, pre { margin: 0 0 1em 0; }
  ul, ol { padding-left: 2em; }
  blockquote { color: #59636e; border-left: 0.25em solid #d0d7de; padding: 0 1em; }
  code { font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace; font-size: 0.9em; padding: 0.2em 0.4em; background: #f6f8fa; border-radius: 6px; }
  pre { background: #f6f8fa; padding: 1em; border-radius: 6px; overflow-x: auto; page-break-inside: avoid; }
  pre code { padding: 0; background: transparent; font-size: 0.9em; }
  table { border-collapse: collapse; width: 100%; page-break-inside: avoid; }
  th, td { border: 1px solid #d0d7de; padding: 6px 12px; text-align: left; }
  th { background: #f6f8fa; font-weight: 600; }
  img { max-width: 100%; }
  a { color: #0969da; text-decoration: underline; }
  hr { border: none; border-top: 1px solid #d0d7de; margin: 1.5em 0; }
  details { margin: 0.5em 0; }
  summary { cursor: pointer; font-weight: 600; }
  kbd { font-family: ui-monospace, monospace; font-size: 0.85em; padding: 0.1em 0.4em; border: 1px solid #d0d7de; border-radius: 4px; background: #f6f8fa; }
  mark { background: #fff8c5; padding: 0 0.2em; }
`;

/**
 * Open a print dialog with the rendered Markdown. The user picks
 * "Save as PDF" in the dialog. Returns when the iframe is set up; we don't
 * (and can't reliably) wait for the user's choice in the print UI.
 */
export async function printMarkdownAsPdf(markdown: string): Promise<{ filename: string }> {
  const bodyHtml = await renderMarkdownToSafeHtml(markdown);
  const filename = generateFilename(markdown, 'pdf');

  // Suggest filename via document title — most browsers use this as the
  // default "Save as PDF" filename in the print dialog.
  const titleForPrint = filename.replace(/\.pdf$/, '');

  const fullHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>${escapeHtml(titleForPrint)}</title>
<style>${PRINT_STYLES}</style>
</head>
<body>${bodyHtml}</body>
</html>`;

  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  iframe.setAttribute('aria-hidden', 'true');
  document.body.appendChild(iframe);

  const cleanup = () => {
    // Defer removal so the print dialog finishes referencing the document.
    setTimeout(() => {
      if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
    }, 1000);
  };

  await new Promise<void>((resolve, reject) => {
    iframe.onload = () => {
      try {
        const win = iframe.contentWindow;
        if (!win) throw new Error('iframe has no contentWindow');
        win.focus();
        win.print();
        resolve();
      } catch (err) {
        reject(err);
      } finally {
        cleanup();
      }
    };
    iframe.onerror = () => {
      cleanup();
      reject(new Error('iframe failed to load'));
    };

    const doc = iframe.contentDocument;
    if (!doc) {
      cleanup();
      reject(new Error('iframe contentDocument unavailable'));
      return;
    }
    doc.open();
    doc.write(fullHtml);
    doc.close();
  });

  return { filename };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
