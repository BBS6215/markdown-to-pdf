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
import { Upload, Trash2 } from 'lucide-react';
import { getTranslations } from '@/lib/i18n/get-translations';

interface EditorToolbarProps {
  format: ConvertFormat;
  status: ConversionStatus;
  lastAction?: ConversionAction;
  errorMessage?: string;
  onConvert: () => void;
  onCopyHtml?: () => void;
  onUpload: () => void;
  onClear: () => void;
  clearDisabled?: boolean;
  convertDisabled?: boolean;
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
  onClear,
  clearDisabled,
  convertDisabled,
  onRetry,
  lang = 'en',
}: EditorToolbarProps) {
  const t = getTranslations(lang);
  const uploadLabel = t.editor.uploadButton;
  const clearLabel = t.editor.clear;

  return (
    <div className="sticky bottom-0 z-10 bg-white border-t border-gray-200 px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))]">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        {/* Left: Upload + Clear — both manage editor input, kept away from
            the destructive-adjacent-to-primary trap of sitting next to Convert. */}
        <div className="flex items-center gap-2">
          <button
            onClick={onUpload}
            aria-label={uploadLabel}
            title={uploadLabel}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Upload size={16} />
            <span className="hidden sm:inline">{uploadLabel}</span>
          </button>
          <button
            onClick={onClear}
            disabled={clearDisabled}
            aria-label={clearLabel}
            title={clearLabel}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          >
            <Trash2 size={16} />
            <span className="hidden sm:inline">{clearLabel}</span>
          </button>
        </div>

        {/* Center: Progress */}
        <div className="order-3 w-full min-w-0 sm:order-2 sm:flex-1 sm:w-auto">
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
          disabled={convertDisabled || status === 'loading'}
          lang={lang}
        />
      </div>
    </div>
  );
}
