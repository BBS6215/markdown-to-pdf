/**
 * Pure frontend HTML export — no backend API call.
 * Source: 05-技术方案 §3.2, docs/08-安全设计补丁.md
 *
 * Uses the same sanitized renderer as the live preview so raw <script>,
 * onerror handlers, javascript: URLs etc. are stripped before being written
 * to the downloaded file.
 */

import { renderMarkdownToSafeHtml } from '@/lib/markdown/render';

/**
 * Generate a full HTML document from Markdown and return both the body
 * fragment and a downloadable Blob.
 */
export async function exportHtml(markdown: string): Promise<{ html: string; blob: Blob }> {
  const bodyHtml = await renderMarkdownToSafeHtml(markdown);

  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Markdown Export</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 32px; color: #1f2937; line-height: 1.6; }
    pre { background: #f3f4f6; padding: 16px; border-radius: 6px; overflow-x: auto; }
    code { font-family: "SFMono-Regular", Consolas, monospace; font-size: 0.9em; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #d1d5db; padding: 8px 12px; text-align: left; }
    th { background: #f9fafb; }
    blockquote { border-left: 4px solid #d1d5db; margin: 0; padding: 0 16px; color: #6b7280; }
    img { max-width: 100%; }
  </style>
</head>
<body>
${bodyHtml}
</body>
</html>`;

  const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
  return { html: bodyHtml, blob };
}

/**
 * Copy the sanitized HTML body fragment to the clipboard.
 */
export async function copyHtmlToClipboard(markdown: string): Promise<string> {
  const { html } = await exportHtml(markdown);
  await navigator.clipboard.writeText(html);
  return html;
}
