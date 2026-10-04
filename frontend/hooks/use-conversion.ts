'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import type { ConvertFormat, ConversionStatus, ConversionAction } from '@/lib/types';
import { exportHtml, copyHtmlToClipboard } from '@/lib/converter/html-export';
import { generateFilename } from '@/lib/converter/filename-generator';
import { triggerDownload } from '@/components/converter/download-trigger';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import { getTranslations } from '@/lib/i18n/get-translations';

interface FailedAction { markdown: string; format: ConvertFormat; action: 'convert' | 'copy' }

/** One execution lock and one timer for download, print, copy and retry. */
export function useConversion({ format, lang, markdown }: { format: ConvertFormat; lang: string; markdown: string }) {
  const [status, setStatus] = useState<ConversionStatus>('idle');
  const [lastAction, setLastAction] = useState<ConversionAction>(null);
  const [errorMessage, setErrorMessage] = useState<string>();
  const active = useRef(false);
  const mounted = useRef(false);
  const operation = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const failed = useRef<FailedAction | null>(null);
  const current = useRef({ markdown, format });
  current.current = { markdown, format };
  const t = getTranslations(lang);

  const clearTimer = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  }, []);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      active.current = false;
      clearTimer();
    };
  }, [clearTimer]);
  useEffect(() => {
    failed.current = null;
    clearTimer();
    if (!active.current) { setStatus('idle'); setErrorMessage(undefined); }
  }, [markdown, format, clearTimer]);

  const execute = useCallback(async (request: FailedAction) => {
    if (!request.markdown.trim() || active.current) return;
    active.current = true;
    clearTimer();
    failed.current = null;
    const id = ++operation.current;
    const isCurrent = () => mounted.current && id === operation.current;
    setStatus('loading');
    setErrorMessage(undefined);
    setLastAction(request.action === 'copy' ? 'copy' : request.format === 'pdf' ? 'print' : 'download');
    let blob: Blob | null = null;
    let filename = '';
    try {
      if (request.action === 'copy') {
        await copyHtmlToClipboard(request.markdown);
      } else if (request.format === 'word') {
        const { exportWord } = await import('@/lib/converter/word-export');
        const result = await exportWord(request.markdown);
        blob = result.blob;
        filename = result.filename;
        if (isCurrent()) triggerDownload(blob, filename);
      } else if (request.format === 'html') {
        const result = await exportHtml(request.markdown);
        blob = result.blob;
        filename = generateFilename(request.markdown, 'html');
        if (isCurrent()) triggerDownload(blob, filename);
      } else {
        const { printMarkdownAsPdf } = await import('@/lib/converter/pdf-print');
        if (!isCurrent()) return;
        await printMarkdownAsPdf(request.markdown);
      }
      if (!isCurrent()) return;
      setStatus('success');
      timer.current = setTimeout(() => {
        if (isCurrent()) setStatus('idle');
        timer.current = null;
      }, request.action === 'copy' ? 2000 : 3000);

      // Best-effort history never blocks export. PDF saves/cancels cannot
      // be distinguished; copies and PDFs are not recorded.
      if (request.action === 'convert' && request.format !== 'pdf') {
        void (async () => {
          try {
            const supabase = getSupabaseBrowserClient();
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;
            const { error } = await supabase.from('conversion_history').insert({
              user_id: user.id, format: request.format, filename,
              file_size_bytes: blob?.size ?? null,
              source_size_bytes: new Blob([request.markdown]).size, status: 'success',
            });
            if (error) console.warn('[history] insert failed:', error.message);
          } catch (error) { console.warn('[history] unavailable:', error); }
        })();
      }
    } catch (error) {
      if (!isCurrent()) return;
      console.error('[conversion] Action failed:', error);
      if (current.current.markdown === request.markdown && current.current.format === request.format) {
        failed.current = request;
        setStatus('error');
        setErrorMessage(request.action === 'copy' ? t.conversion.copyFailed :
          t.conversion.failed.replace('{format}', request.format === 'word' ? 'Word' : request.format.toUpperCase()));
      } else { setStatus('idle'); }
    } finally {
      if (id === operation.current) active.current = false;
    }
  }, [clearTimer, t.conversion.copyFailed, t.conversion.failed]);
  const convert = useCallback(() => execute({ markdown, format, action: 'convert' }), [execute, markdown, format]);
  const copyHtml = useCallback(() => execute({ markdown, format, action: 'copy' }), [execute, markdown, format]);
  const retry = useCallback(() => {
    const request = failed.current;
    if (request && request.markdown === current.current.markdown && request.format === current.current.format) return execute(request);
  }, [execute]);
  return { status, lastAction, errorMessage, convert, copyHtml, retry,
    canConvert: !!markdown.trim() && status !== 'loading' };
}
