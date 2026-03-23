/**
 * Generate download filename from Markdown content.
 * Source: 05-技术方案 §6.4
 */

import type { ConvertFormat } from '@/lib/types';

export function generateFilename(markdown: string, format: ConvertFormat): string {
  const ext = format === 'word' ? 'docx' : format;

  // Try to extract first H1 title
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
