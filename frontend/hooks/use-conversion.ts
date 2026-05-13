'use client';

/**
 * Conversion state management hook.
 * Source: docs/09-服务端权威用量补丁.md
 *
 * - PDF/Word: backend now owns quota + history. Frontend just calls the API
 *   with the access token; backend writes daily_usage and conversion_history.
 * - HTML: pure frontend. Inserts conversion_history directly per docs/06 §5.2
 *   (no quota impact, INSERT RLS policy still allows own-user rows).
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
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user ?? null;
      const accessToken = session?.access_token ?? null;
      const sourceSize = new Blob([markdown]).size;

      try {
        let blob: Blob;
        let filename: string;

        if (format === 'html') {
          // HTML: pure frontend, no API call, no quota.
          const result = await exportHtml(markdown);
          blob = result.blob;
          filename = generateFilename(markdown, 'html');
        } else {
          // PDF/Word: backend handles quota + history via JWT.
          const convertFn = format === 'pdf' ? convertToPdf : convertToWord;
          const result = await convertFn(markdown, accessToken);
          blob = result.blob;
          filename = result.filename;
        }

        triggerDownload(blob, filename);

        // HTML history: still client-written (no quota, see docs/06 §5.2).
        if (format === 'html' && user) {
          await supabase.from('conversion_history').insert({
            user_id: user.id,
            format,
            filename,
            file_size_bytes: blob.size,
            source_size_bytes: sourceSize,
            status: 'success',
          });
        }

        // Anonymous PDF/Word: increment localStorage counter (UI display only;
        // backend IP rate limit is authoritative).
        if (!user && format !== 'html') {
          incrementAnonymousUsage();
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
