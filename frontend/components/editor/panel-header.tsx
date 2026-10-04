/**
 * Shared panel header for the editor and preview panes.
 * Source: 04-UI规范 §2.1 (面板标题 + 副文案)
 *
 * Subtitle uses gray-500 (not the spec's original gray-400): at text-xs on
 * white/gray-50, gray-400 is ~2.8:1 contrast, below WCAG AA for meaningful
 * text. See docs/04 §4.1 amendment note.
 */
export function PanelHeader({ title, subtitle, stats }: { title: string; subtitle?: string; stats?: React.ReactNode }) {
  return (
    <div className="bg-surface border-b border-border px-4 py-2 min-h-[72px] flex flex-col justify-center">
      <div className="flex items-baseline justify-between gap-2 flex-wrap">
        <span className="text-sm font-medium text-gray-700">{title}</span>
        {stats && <span className="text-xs text-gray-500">{stats}</span>}
      </div>
      {subtitle && (
        <span className="block text-xs text-gray-500 mt-0.5">{subtitle}</span>
      )}
    </div>
  );
}
