'use client';

/**
 * Conversion state management hook — pure-frontend pipeline.
 *
 * All three formats run entirely in the browser:
 *   - HTML: unified + rehype-sanitize -> Blob (no quota).
 *   - PDF : window.print() against a styled iframe (user picks "Save as PDF").
 *   - Word: docx package -> Blob (no quota).
 *
 * Backend conversion routes (backend/src/routes/convert-*.ts) and the
 * server-authoritative quota machinery are intentionally kept in the repo.
 * They are unused while we ship the zero-cost flavor of the site, and can be
 * re-enabled by switching this hook back to the API-client path once a
 * server is provisioned (see docs/09).
 */

import { useState, useCallback } from 'react';
import type { ConvertFormat, ConversionStatus } from '@/lib/types';
import { exportHtml, copyHtmlToClipboard } from '@/lib/converter/html-export';
import { generateFilename } from '@/lib/converter/filename-generator';
import { triggerDownload } from '@/components/converter/download-trigger';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

// Word and PDF code paths are dynamically imported so the docx package
// (~300KB gzip) and the print iframe helper are not part of the initial
// bundle for users who never touch them.

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
        let blob: Blob | null = null;
        let filename: string;

        if (format === 'html') {
          const result = await exportHtml(markdown);
          blob = result.blob;
          filename = generateFilename(markdown, 'html');
          triggerDownload(blob, filename);
        } else if (format === 'word') {
          const { exportWord } = await import('@/lib/converter/word-export');
          const result = await exportWord(markdown);
          blob = result.blob;
          filename = result.filename;
          triggerDownload(blob, filename);
        } else {
          // PDF: opens the browser print dialog; user chooses "Save as PDF".
          // No Blob is produced on our side — the browser owns the save UX.
          const { printMarkdownAsPdf } = await import('@/lib/converter/pdf-print');
          const result = await printMarkdownAsPdf(markdown);
          filename = result.filename;
        }

        // History (logged-in only). HTML/Word: file_size = blob.size; PDF: null
        // since we don't generate the file ourselves.
        if (user) {
          await supabase.from('conversion_history').insert({
            user_id: user.id,
            format,
            filename,
            file_size_bytes: blob ? blob.size : null,
            source_size_bytes: sourceSize,
            status: 'success',
          });
        }

        setStatus('success');
        onUsageChange?.();
        setTimeout(() => setStatus('idle'), 3000);
      } catch (err) {
        setStatus('error');
        setErrorMessage(
          err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.'
        );
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
