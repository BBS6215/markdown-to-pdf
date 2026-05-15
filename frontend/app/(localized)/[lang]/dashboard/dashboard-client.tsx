'use client';

/**
 * Dashboard client component — renders the conversion history.
 * The usage-bar was removed when PDF/Word moved fully to the frontend, since
 * there is no longer any quota to display. UsageBar component is kept in the
 * tree (components/dashboard/usage-bar.tsx) for future re-enablement.
 */

import { HistoryList } from '@/components/dashboard/history-list';
import { getTranslations } from '@/lib/i18n/get-translations';

interface DashboardClientProps {
  lang?: string;
  history: Array<{
    id: string;
    format: 'pdf' | 'word' | 'html';
    filename: string;
    file_size_bytes: number | null;
    status: 'success' | 'failed';
    created_at: string;
  }>;
}

export function DashboardClient({ history, lang = 'en' }: DashboardClientProps) {
  const t = getTranslations(lang);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">{t.dashboard.title}</h1>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">{t.dashboard.historyTitle}</h2>
        <HistoryList records={history} lang={lang} />
      </div>
    </div>
  );
}
