'use client';

/**
 * Real-time Markdown preview panel.
 * Source: 05-技术方案 §5.1 (debounce 300ms → unified → HTML)
 *
 * Uses unified (remark + rehype) for rendering, same pipeline as backend
 * to ensure preview matches PDF output.
 * F6 fix: Processor instance cached at module level (not re-created per render).
 */

import { useEffect, useState, useRef } from 'react';
import { useDebounce } from '@/hooks/use-debounce';
import { CONTENT_LIMITS } from '@/lib/types';

import 'github-markdown-css/github-markdown-light.css';

// Cached processor — created once, reused across renders
let processorPromise: Promise<any> | null = null;

async function getProcessor() {
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

interface MarkdownPreviewProps {
  markdown: string;
  className?: string;
}

export function MarkdownPreview({ markdown, className = '' }: MarkdownPreviewProps) {
  const [html, setHtml] = useState('');
  const [truncated, setTruncated] = useState(false);
  const debouncedMarkdown = useDebounce(markdown, 300);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      if (!debouncedMarkdown) {
        setHtml('');
        setTruncated(false);
        return;
      }

      const sizeBytes = new Blob([debouncedMarkdown]).size;
      const isTruncated = sizeBytes > CONTENT_LIMITS.PREVIEW_TRUNCATION;
      const contentToRender = isTruncated
        ? debouncedMarkdown.slice(0, CONTENT_LIMITS.PREVIEW_TRUNCATION)
        : debouncedMarkdown;

      try {
        const processor = await getProcessor();
        const result = await processor.process(contentToRender);

        if (!cancelled) {
          setHtml(String(result));
          setTruncated(isTruncated);
        }
      } catch (err) {
        console.error('[preview] Render error:', err);
      }
    }

    render();
    return () => { cancelled = true; };
  }, [debouncedMarkdown]);

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="bg-gray-50 border-b border-gray-200 px-4 py-2">
        <span className="text-sm font-medium text-gray-700">Live Preview</span>
      </div>

      <div
        className="markdown-body p-4 overflow-auto bg-white flex-1"
        style={{ minHeight: '400px' }}
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {truncated && (
        <div className="px-4 py-2 bg-yellow-50 border-t border-yellow-200 text-xs text-yellow-700">
          Content truncated in preview. Full content will be included in the conversion.
        </div>
      )}
    </div>
  );
}
