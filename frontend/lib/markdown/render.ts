/**
 * Shared Markdown → sanitized HTML pipeline for the frontend.
 *
 * Used by both the live preview and the HTML export so they cannot drift.
 * Mirrors the schema in backend/src/services/markdown-renderer.ts.
 *
 * Source: docs/08-安全设计补丁.md
 */

let processorPromise: Promise<{ process: (md: string) => Promise<unknown> }> | null = null;

export async function getMarkdownProcessor() {
  if (!processorPromise) {
    processorPromise = (async () => {
      const { unified } = await import('unified');
      const { default: remarkParse } = await import('remark-parse');
      const { default: remarkGfm } = await import('remark-gfm');
      const { default: remarkRehype } = await import('remark-rehype');
      const { default: rehypeRaw } = await import('rehype-raw');
      const { default: rehypeSanitize, defaultSchema } = await import('rehype-sanitize');
      const { default: rehypeHighlight } = await import('rehype-highlight');
      const { default: rehypeStringify } = await import('rehype-stringify');

      const schema = {
        ...defaultSchema,
        tagNames: [
          ...(defaultSchema.tagNames ?? []),
          'details', 'summary', 'sub', 'sup', 'kbd', 'mark', 'ins', 'abbr',
        ],
      };

      return unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeRaw)
        .use(rehypeSanitize, schema)
        .use(rehypeHighlight, { detect: true })
        .use(rehypeStringify);
    })();
  }
  return processorPromise;
}

export async function renderMarkdownToSafeHtml(markdown: string): Promise<string> {
  const processor = await getMarkdownProcessor();
  const result = await processor.process(markdown);
  return String(result);
}
