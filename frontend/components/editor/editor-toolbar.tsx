'use client';

/**
 * Editor toolbar — Upload + Convert + usage info + status feedback.
 * Source: 05-技术方案 §4.1, 04-UI规范 §2.1 (sticky 操作栏)
 * Updated: Phase 3 — shows remaining conversions + rate limit state
 */

import type { ConvertFormat, ConversionStatus } from '@/lib/types';
import { ConvertButton } from '@/components/converter/convert-button';
import { ConvertProgress } from '@/components/converter/convert-progress';
import { Upload } from 'lucide-react';

interface EditorToolbarProps {
  format: ConvertFormat;
  status: ConversionStatus;
  errorMessage?: string;
  onConvert: () => void;
  onCopyHtml?: () => void;
  onUpload: () => void;
  onRetry: () => void;
  remaining?: number;
  limit?: number;
  canConvert?: boolean;
  isHtml?: boolean;
  isLoggedIn?: boolean;
}

export function EditorToolbar({
  format,
  status,
  errorMessage,
  onConvert,
  onCopyHtml,
  onUpload,
  onRetry,
  remaining = Infinity,
  limit = Infinity,
  canConvert = true,
  isHtml = false,
  isLoggedIn = false,
}: EditorToolbarProps) {
  return (
    <div className="sticky bottom-0 z-10 bg-white border-t border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between gap-3">
        {/* Left: Upload */}
        <button
          onClick={onUpload}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Upload size={16} />
          <span className="hidden sm:inline">Upload .md</span>
        </button>

        {/* Center: Progress + Usage info */}
        <div className="flex items-center gap-3">
          <ConvertProgress
            status={status}
            format={format}
            errorMessage={errorMessage}
            onRetry={onRetry}
          />

          {/* Usage counter (not shown for HTML) */}
          {!isHtml && status === 'idle' && remaining < Infinity && (
            <span className={`text-xs ${remaining === 0 ? 'text-red-500' : 'text-gray-400'}`}>
              {remaining} of {limit} remaining today
            </span>
          )}
        </div>

        {/* Right: Convert button */}
        <ConvertButton
          format={format}
          status={status}
          onClick={onConvert}
          onCopyHtml={onCopyHtml}
          disabled={status === 'loading' || (!canConvert && !isHtml)}
        />
      </div>

      {/* Inline sign-up prompt when anonymous user hits limit */}
      {!canConvert && !isHtml && !isLoggedIn && status === 'idle' && (
        <p className="mt-2 text-sm text-gray-500 text-center">
          Sign up for 5 free conversions per day — no credit card needed.
        </p>
      )}
    </div>
  );
}
