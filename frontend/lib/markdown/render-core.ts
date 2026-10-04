import type { Root, RootContent } from 'hast';
import { getBodyStats, type BodyStats } from '../editor/text-stats';

export interface MarkdownRenderResult { html: string; plainText?: string; stats?: BodyStats }
export interface RenderOptions { collectText?: boolean }
const BLOCKS = new Set(['p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'tr', 'table', 'pre', 'blockquote', 'details', 'summary']);

function plainNode(node: RootContent): string {
  if (node.type === 'text') return node.value;
  if (node.type !== 'element') return '';
  if (node.tagName === 'br') return '\n';
  if (node.tagName === 'img') return '';
  const content = node.children.map(plainNode).join('');
  return content + (BLOCKS.has(node.tagName) ? '\n' : ['td', 'th'].includes(node.tagName) ? ' ' : '');
}
export function extractPlainText(tree: Root): string {
  return tree.children.map(plainNode).join('').trim();
}

let processorPromise: ReturnType<typeof createProcessor> | null = null;
async function createProcessor() {
  const [
    { unified }, { default: remarkParse }, { default: remarkGfm },
    { default: remarkRehype }, { default: rehypeRaw },
    { default: rehypeSanitize, defaultSchema }, { default: rehypeHighlight },
    { default: rehypeStringify },
  ] = await Promise.all([
    import('unified'), import('remark-parse'), import('remark-gfm'),
    import('remark-rehype'), import('rehype-raw'), import('rehype-sanitize'),
    import('rehype-highlight'), import('rehype-stringify'),
  ]);
  const schema = { ...defaultSchema, tagNames: [
    ...(defaultSchema.tagNames ?? []), 'details', 'summary', 'sub', 'sup', 'kbd', 'mark', 'ins', 'abbr',
  ] };
  return unified().use(remarkParse).use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true }).use(rehypeRaw)
    .use(rehypeSanitize, schema)
    .use(() => (tree: Root, file: { data: Record<string, unknown> }) => {
      if (file.data.collectText) file.data.plainText = extractPlainText(tree);
    })
    .use(rehypeHighlight, { detect: false }).use(rehypeStringify);
}
export function getMarkdownProcessor() {
  if (!processorPromise) {
    processorPromise = createProcessor().catch(error => {
      processorPromise = null;
      throw error;
    });
  }
  return processorPromise;
}
export async function renderMarkdownCore(markdown: string, options: RenderOptions = {}): Promise<MarkdownRenderResult> {
  const processor = await getMarkdownProcessor();
  const file = await processor.process({ value: markdown, data: { collectText: !!options.collectText } });
  const plainText = options.collectText ? String(file.data.plainText ?? '') : undefined;
  return { html: String(file), ...(plainText !== undefined && { plainText, stats: getBodyStats(plainText) }) };
}
