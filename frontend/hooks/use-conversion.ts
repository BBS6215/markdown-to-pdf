'use client';

/**
 * Conversion state management hook — with DB writes and rate limit integration.
 * Source: 07 §4 Phase 3 任务 3.13-3.15, 06-数据库设计 §5
 *
 * Write order on success: UPSERT daily_usage → INSERT conversion_history
 * Failure: skip daily_usage → INSERT conversion_history(status='failed')
 * HTML: skip daily_usage → INSERT conversion_history(format='html')
 */

import { useState, useCallback } from 'react';
import type { ConvertFormat, ConversionStatus } from '@/lib/types';
import { convertToPdf, convertToWord, ConvertError } from '@/lib/converter/api-client';
import { exportHtml, copyHtmlToClipboard } from '@/lib/converter/html-export';
import { generateFilename } from '@/lib/converter/filename-generator';
import { triggerDownload } from '@/components/converter/download-trigger';
import { incrementAnonymousUsage } from '@/lib/rate-limit/client-tracker';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

export function useConversion(format: ConvertFormat) {
  const [status, setStatus] = useState<ConversionStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>();

  const convert = useCallback(
    async (markdown: string, onUsageChange?: () => void) => {
      if (!markdown.trim()) return;

      setStatus('loading');
      setErrorMessage(undefined);

      const supabase = getSupabaseBrowserClient();
      const { data: { user } } = await supabase.auth.getUser();
      const sourceSize = new Blob([markdown]).size;

      try {
        let blob: Blob;
        let filename: string;

        if (format === 'html') {
          // HTML: pure frontend, no API call, no rate limit
          const result = await exportHtml(markdown);
          blob = result.blob;
          filename = generateFilename(markdown, 'html');
        } else {
          // PDF/Word: call backend API
          const convertFn = format === 'pdf' ? convertToPdf : convertToWord;
          const result = await convertFn(markdown);
          blob = result.blob;
          filename = result.filename;
        }

        triggerDownload(blob, filename);

        // ── DB writes (logged-in users only) ──
        if (user) {
          // 1. UPSERT daily_usage (PDF/Word only, not HTML)
          // Write order: daily_usage first (quota), then history (nice-to-have) — 06 §5.1
          if (format !== 'html') {
            const today = new Date().toISOString().slice(0, 10);
            const { data: existing } = await supabase
              .from('daily_usage')
              .select('pdf_word_count')
              .eq('user_id', user.id)
              .eq('usage_date', today)
              .single();

            if (existing) {
              await supabase
                .from('daily_usage')
                .update({ pdf_word_count: existing.pdf_word_count + 1 })
                .eq('user_id', user.id)
                .eq('usage_date', today);
            } else {
              await supabase
                .from('daily_usage')
                .insert({ user_id: user.id, usage_date: today, pdf_word_count: 1 });
            }
          }

          // 2. INSERT conversion_history
          await supabase.from('conversion_history').insert({
            user_id: user.id,
            format,
            filename,
            file_size_bytes: blob.size,
            source_size_bytes: sourceSize,
            status: 'success',
          });
        } else {
          // Anonymous: increment localStorage (PDF/Word only)
          if (format !== 'html') {
            incrementAnonymousUsage();
          }
        }

        setStatus('success');
        onUsageChange?.();
        setTimeout(() => setStatus('idle'), 3000);
      } catch (err) {
        setStatus('error');

        if (err instanceof ConvertError) {
          setErrorMessage(err.message);
        } else {
          setErrorMessage('An unexpected error occurred. Please try again.');
        }

        // Failed conversion: log to history but don't deduct usage (07 §11.1 D2)
        if (user && format !== 'html') {
          await supabase.from('conversion_history').insert({
            user_id: user.id,
            format,
            filename: generateFilename(markdown, format),
            source_size_bytes: sourceSize,
            status: 'failed',
          }).catch(() => {}); // Don't let history write failure block the error display
        }
      }
    },
    [format]
  );

  const copyHtml = useCallback(async (markdown: string) => {
    try {
      await copyHtmlToClipboard(markdown);
      setStatus('success');
      setTimeout(() => setStatus('idle'), 2000);
    } catch {
      setErrorMessage('Failed to copy HTML to clipboard.');
      setStatus('error');
    }
  }, []);

  const retry = useCallback(() => {
    setStatus('idle');
    setErrorMessage(undefined);
  }, []);

  return { status, errorMessage, convert, copyHtml, retry };
}
