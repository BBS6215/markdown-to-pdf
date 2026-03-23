/**
 * Markdown → HTML rendering service.
 * Source: 05-技术方案 §2.2 (unified remark + rehype)
 *
 * Used by both PDF generator (HTML → Puppeteer → PDF)
 * and shared with frontend for preview consistency.
 */

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm) // GitHub Flavored Markdown: tables, strikethrough, task lists
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeHighlight, { detect: true }) // Code block syntax highlighting
  .use(rehypeStringify, { allowDangerousHtml: true });

/**
 * Convert Markdown string to HTML string.
 */
export async function renderMarkdownToHtml(markdown: string): Promise<string> {
  const result = await processor.process(markdown);
  return String(result);
}

/**
 * Parse Markdown to remark AST (for Word generator which traverses AST directly).
 */
export function parseMarkdownToAst(markdown: string) {
  const parser = unified().use(remarkParse).use(remarkGfm);
  return parser.parse(markdown);
}
