'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { getTranslations } from '@/lib/i18n/get-translations';
import { FileReadError } from '@/lib/editor/encoding-detector';

export function useFileUpload(onContent: (content: string) => void, lang: string) {
  const [reading, setReading] = useState(false);
  const [error, setError] = useState<string>();
  const sequence = useRef(0);
  const t = getTranslations(lang);
  useEffect(() => () => { sequence.current++; }, []);
  const upload = useCallback(async (file: File) => {
    const id = ++sequence.current;
    setReading(true);
    setError(undefined);
    try {
      const { readMarkdownFile } = await import('@/lib/editor/encoding-detector');
      const content = await readMarkdownFile(file);
      if (id === sequence.current) onContent(content);
    } catch (err) {
      if (id !== sequence.current) return;
      const code = err instanceof FileReadError ? err.code : 'read';
      setError(t.editor.fileErrors[code]);
    } finally {
      if (id === sequence.current) setReading(false);
    }
  }, [onContent, t.editor.fileErrors]);
  const cancel = useCallback(() => {
    sequence.current++;
    setReading(false);
    setError(undefined);
  }, []);
  return { upload, reading, error, cancel };
}
