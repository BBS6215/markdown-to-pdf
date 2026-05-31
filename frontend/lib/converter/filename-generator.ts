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
      // Keep letters (any script, incl. CJK) and numbers; drop punctuation.
      // The previous \w-based filter stripped all non-ASCII, so a title like
      // "种植业标准100问" collapsed to "100" — Chinese users saw the filename
      // lose its title entirely. \p{L}\p{N} (with the /u flag) preserves it.
      // Case is left untouched so the filename matches the title as written.
      .replace(/[^\p{L}\p{N}\s-]/gu, '')
      .trim()
      .replace(/\s+/g, '-')
      .slice(0, 50);
    if (title) return `${title}.${ext}`;
  }

  return `markdown-${Date.now()}.${ext}`;
}
