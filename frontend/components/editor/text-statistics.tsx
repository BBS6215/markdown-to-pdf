'use client';

import { useMemo } from 'react';
import { useDebounce } from '@/hooks/use-debounce';
import { getSourceStats, type BodyStats } from '@/lib/editor/text-stats';
import { getTranslations } from '@/lib/i18n/get-translations';

export function SourceStatistics({ content, lang }: { content: string; lang: string }) {
  const delayed = useDebounce(content, 300);
  const text = content ? delayed : '';
  const stats = useMemo(() => getSourceStats(text), [text]);
  const t = getTranslations(lang).editor;
  return <span title={t.statsHint}>{t.sourceStats
    .replace('{characters}', stats.characters.toLocaleString('en'))
    .replace('{size}', (stats.sizeBytes / 1024).toFixed(1))}</span>;
}

export function BodyStatistics({ stats, truncated, lang }: { stats: BodyStats; truncated: boolean; lang: string }) {
  const t = getTranslations(lang).editor;
  return <span title={t.statsHint}>{(truncated ? t.fragmentStats : t.bodyStats)
    .replace('{characters}', stats.characters.toLocaleString('en'))}
    {stats.words !== null && t.wordStats.replace('{words}', stats.words.toLocaleString('en'))}
  </span>;
}
