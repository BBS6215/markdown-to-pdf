'use client';

/**
 * Real-time Markdown preview panel.
 * Source: 05-技术方案 §5.1 (debounce 300ms → unified → HTML)
 *
 * Uses unified (remark + rehype) for rendering, same pipeline as backend
 * to ensure preview matches PDF output.
 * F6 fix: Processor instance cached at module level (not re-created per render).
 */

import { useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/use-debounce';
import { CONTENT_LIMITS } from '@/lib/types';
import { renderMarkdownToSafeHtml } from '@/lib/markdown/render';
import { PanelHeader } from '@/components/editor/panel-header';
import { getTranslations } from '@/lib/i18n/get-translations';

import 'github-markdown-css/github-markdown-light.css';

interface MarkdownPreviewProps {
  markdown: string;
  className?: string;
  lang?: string;
}

export function MarkdownPreview({ markdown, className = '', lang = 'en' }: MarkdownPreviewProps) {
  const [html, setHtml] = useState('');
  const [truncated, setTruncated] = useState(false);
  // Render-failure state: keep showing the last good HTML and flag it as
  // possibly stale, rather than blanking the panel. Cleared on empty input,
  // at the start of every new render, and on success.
  const [renderError, setRenderError] = useState(false);
  const debouncedMarkdown = useDebounce(markdown, 300);
  const t = getTranslations(lang);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      if (!debouncedMarkdown) {
        if (!cancelled) {
          setHtml('');
          setTruncated(false);
          setRenderError(false);
        }
        return;
      }

      if (!cancelled) setRenderError(false);

      const sizeBytes = new Blob([debouncedMarkdown]).size;
      const isTruncated = sizeBytes > CONTENT_LIMITS.PREVIEW_TRUNCATION;
      const contentToRender = isTruncated
        ? debouncedMarkdown.slice(0, CONTENT_LIMITS.PREVIEW_TRUNCATION)
        : debouncedMarkdown;

      try {
        const rendered = await renderMarkdownToSafeHtml(contentToRender);
        if (!cancelled) {
          setHtml(rendered);
          setTruncated(isTruncated);
          setRenderError(false);
        }
      } catch (err) {
        if (!cancelled) {
          console.error('[preview] Render error:', err);
          setRenderError(true);
        }
      }
    }

    render();
    return () => { cancelled = true; };
  }, [debouncedMarkdown]);

  return (
    <div className={`flex flex-col ${className}`}>
      <PanelHeader title={t.editor.previewTitle} subtitle={t.editor.previewSubtitle} />

      {renderError && (
        <div role="alert" className="px-4 py-2 bg-red-50 border-b border-red-200 text-xs text-red-700">
          {t.editor.previewError}
        </div>
      )}

      <div
        className="markdown-body p-4 overflow-auto bg-white flex-1"
        style={{ minHeight: 'min(400px, 65vh)', maxHeight: '65vh' }}
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {truncated && (
        <div className="px-4 py-2 bg-yellow-50 border-t border-yellow-200 text-xs text-yellow-700">
          {lang === 'zh'
            ? '预览内容已截断，转换时仍会包含完整内容。'
            : 'Content truncated in preview. Full content will be included in the conversion.'}
        </div>
      )}
    </div>
  );
}
