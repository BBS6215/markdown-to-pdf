'use client';

import { useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/use-debounce';
import { CONTENT_LIMITS } from '@/lib/types';
import { renderMarkdown } from '@/lib/markdown/render';
import { truncateUtf8, type BodyStats } from '@/lib/editor/text-stats';
import { PanelHeader } from './panel-header';
import { BodyStatistics } from './text-statistics';
import { getTranslations } from '@/lib/i18n/get-translations';
import 'github-markdown-css/github-markdown-light.css';

interface MarkdownPreviewProps { markdown: string; className?: string; lang?: string; showStats?: boolean }

export function MarkdownPreview({ markdown, className = '', lang = 'en', showStats = false }: MarkdownPreviewProps) {
  const [result, setResult] = useState({ html: '', truncated: false, stats: { characters: 0, words: null } as BodyStats });
  const [renderError, setRenderError] = useState(false);
  const delayed = useDebounce(markdown, 300);
  const t = getTranslations(lang);
  useEffect(() => {
    let cancelled = false;
    if (!delayed.trim()) {
      setResult({ html: '', truncated: false, stats: { characters: 0, words: 0 } });
      setRenderError(false);
      return;
    }
    const preview = truncateUtf8(delayed, CONTENT_LIMITS.PREVIEW_TRUNCATION);
    void renderMarkdown(preview.text, { collectText: showStats }).then(rendered => {
      if (cancelled) return;
      setResult({ html: rendered.html, truncated: preview.truncated, stats: rendered.stats ?? { characters: 0, words: null } });
      setRenderError(false);
    }).catch(error => {
      if (cancelled) return;
      console.error('[preview] Render failed:', error);
      setRenderError(true);
    });
    return () => { cancelled = true; };
  }, [delayed, showStats]);
  // Empty input must clear stale preview immediately, without waiting 300ms.
  const empty = !markdown.trim();
  return (
    <div className={`flex flex-col ${className}`}>
      <PanelHeader title={t.editor.previewTitle} subtitle={t.editor.previewSubtitle}
        stats={showStats && <BodyStatistics stats={empty ? { characters: 0, words: 0 } : result.stats} truncated={!empty && result.truncated} lang={lang} />} />
      {!empty && renderError && <div role="alert" className="px-4 py-2 bg-red-50 border-b border-red-200 text-xs text-red-700">{t.editor.previewError}</div>}
      <div className="markdown-body p-4 overflow-auto bg-white flex-1 min-w-0"
        style={{ minHeight: 'min(400px, 65vh)', maxHeight: '65vh' }}
        dangerouslySetInnerHTML={{ __html: empty ? '' : result.html }} />
      {!empty && result.truncated && <div className="px-4 py-2 bg-yellow-50 border-t border-yellow-200 text-xs text-yellow-700">{t.editor.truncated}</div>}
    </div>
  );
}
