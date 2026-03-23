'use client';

/**
 * Real-time Markdown preview panel.
 * Source: 05-技术方案 §5.1 (debounce 300ms → unified → HTML)
 *
 * Uses unified (remark + rehype) for rendering, same pipeline as backend
 * to ensure preview matches PDF output.
 */

import { useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/use-debounce';
import { CONTENT_LIMITS } from '@/lib/types';

// Import github-markdown-css for preview styling
import 'github-markdown-css/github-markdown-light.css';

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

      // Check if content exceeds preview truncation limit (200KB)
      const sizeBytes = new Blob([debouncedMarkdown]).size;
      const isTruncated = sizeBytes > CONTENT_LIMITS.PREVIEW_TRUNCATION;
      const contentToRender = isTruncated
        ? debouncedMarkdown.slice(0, CONTENT_LIMITS.PREVIEW_TRUNCATION)
        : debouncedMarkdown;

      try {
        // Dynamic import to keep initial bundle small
        const { unified } = await import('unified');
        const { default: remarkParse } = await import('remark-parse');
        const { default: remarkGfm } = await import('remark-gfm');
        const { default: remarkRehype } = await import('remark-rehype');
        const { default: rehypeHighlight } = await import('rehype-highlight');
        const { default: rehypeStringify } = await import('rehype-stringify');

        const result = await unified()
          .use(remarkParse)
          .use(remarkGfm)
          .use(remarkRehype, { allowDangerousHtml: true })
          .use(rehypeHighlight, { detect: true })
          .use(rehypeStringify, { allowDangerousHtml: true })
          .process(contentToRender);

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
      {/* Panel header */}
      <div className="bg-gray-50 border-b border-gray-200 px-4 py-2">
        <span className="text-sm font-medium text-gray-700">Live Preview</span>
      </div>

      {/* Preview content */}
      <div
        className="markdown-body p-4 overflow-auto bg-white flex-1"
        style={{ minHeight: '400px' }}
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {/* Truncation warning */}
      {truncated && (
        <div className="px-4 py-2 bg-yellow-50 border-t border-yellow-200 text-xs text-yellow-700">
          Content truncated in preview. Full content will be included in the conversion.
        </div>
      )}
    </div>
  );
}
