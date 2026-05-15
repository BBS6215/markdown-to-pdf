'use client';

/**
 * Editor toolbar — Upload + Convert + status feedback.
 * Source: 05-技术方案 §4.1, 04-UI规范 §2.1 (sticky 操作栏)
 *
 * The frontend-only pipeline has no per-day quota, so this component no
 * longer renders a remaining-conversions counter or a "sign up for more"
 * prompt. If a backend renderer is re-enabled later, restore the
 * remaining/limit/canConvert/isLoggedIn props from git history.
 */

import type { ConvertFormat, ConversionStatus, ConversionAction } from '@/lib/types';
import { ConvertButton } from '@/components/converter/convert-button';
import { ConvertProgress } from '@/components/converter/convert-progress';
import { Upload } from 'lucide-react';

interface EditorToolbarProps {
  format: ConvertFormat;
  status: ConversionStatus;
  lastAction?: ConversionAction;
  errorMessage?: string;
  onConvert: () => void;
  onCopyHtml?: () => void;
  onUpload: () => void;
  onRetry: () => void;
  lang?: string;
}

export function EditorToolbar({
  format,
  status,
  lastAction,
  errorMessage,
  onConvert,
  onCopyHtml,
  onUpload,
  onRetry,
  lang = 'en',
}: EditorToolbarProps) {
  const uploadLabel = lang === 'zh' ? '上传 .md' : 'Upload .md';

  return (
    <div className="sticky bottom-0 z-10 bg-white border-t border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between gap-3">
        {/* Left: Upload */}
        <button
          onClick={onUpload}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Upload size={16} />
          <span className="hidden sm:inline">{uploadLabel}</span>
        </button>

        {/* Center: Progress */}
        <div className="flex items-center gap-3">
          <ConvertProgress
            status={status}
            format={format}
            lastAction={lastAction}
            errorMessage={errorMessage}
            onRetry={onRetry}
            lang={lang}
          />
        </div>

        {/* Right: Convert button */}
        <ConvertButton
          format={format}
          status={status}
          onClick={onConvert}
          onCopyHtml={onCopyHtml}
          disabled={status === 'loading'}
          lang={lang}
        />
      </div>
    </div>
  );
}
