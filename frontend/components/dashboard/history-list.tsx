'use client';

/**
 * Conversion history list — last 50 records.
 * Source: 07 §4 Phase 3 任务 3.18, 06-数据库设计 §5.3
 * No download buttons — files are not stored (privacy feature).
 */

import { FileText, FileIcon, Globe, AlertCircle } from 'lucide-react';
import { getTranslations } from '@/lib/i18n/get-translations';

interface HistoryRecord {
  id: string;
  format: 'pdf' | 'word' | 'html';
  filename: string;
  file_size_bytes: number | null;
  status: 'success' | 'failed';
  created_at: string;
}

const FORMAT_ICON: Record<string, { icon: typeof FileText; color: string; bg: string; label: string }> = {
  pdf: { icon: FileText, color: 'text-red-700', bg: 'bg-red-50', label: 'PDF' },
  word: { icon: FileIcon, color: 'text-blue-700', bg: 'bg-blue-50', label: 'Word' },
  html: { icon: Globe, color: 'text-orange-700', bg: 'bg-orange-50', label: 'HTML' },
};

function formatBytes(bytes: number | null): string {
  if (bytes === null) return '—';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatTime(isoString: string, lang: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const locale = lang === 'zh' ? 'zh-CN' : 'en-US';

  if (isToday) {
    return date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
  }
  return date.toLocaleDateString(locale, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export function HistoryList({ records, lang = 'en' }: { records: HistoryRecord[]; lang?: string }) {
  const t = getTranslations(lang);

  if (records.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 text-sm">
        {t.dashboard.historyEmpty}
      </div>
    );
  }

  return (
    <div>
      {/* Privacy notice */}
      <p className="text-sm text-gray-500 mb-4">
        {t.dashboard.privacyNote}
      </p>

      <div className="space-y-0">
        {records.map((record) => {
          const fmt = FORMAT_ICON[record.format] || FORMAT_ICON.pdf;
          const Icon = fmt.icon;

          return (
            <div key={record.id} className="flex items-center gap-4 py-3 border-b border-gray-100">
              {/* Format icon */}
              <Icon size={16} className={fmt.color} />

              {/* Filename */}
              <span className="text-sm text-gray-900 font-medium flex-1 truncate">
                {record.filename}
              </span>

              {/* Status */}
              {record.status === 'failed' && (
                <AlertCircle size={14} className="text-red-400" />
              )}

              {/* Format badge */}
              <span className={`${fmt.bg} ${fmt.color} text-xs font-medium px-2 py-0.5 rounded`}>
                {fmt.label}
              </span>

              {/* Size */}
              <span className="text-xs text-gray-500 w-16 text-right">
                {formatBytes(record.file_size_bytes)}
              </span>

              {/* Time */}
              <span className="text-xs text-gray-500 w-24 text-right">
                {formatTime(record.created_at, lang)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
