'use client';

import { useState, useCallback, useEffect } from 'react';
import { loadEditorContent, saveEditorContent } from '@/lib/editor/session-storage';

/**
 * Hook managing editor content with sessionStorage sync.
 *
 * Priority:
 * 1. sessionStorage content → use it (format switch / from guide page)
 * 2. no saved content → empty editor + placeholder
 */
export function useEditorContent() {
  const [content, setContent] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize content on mount (client-side only)
  useEffect(() => {
    setContent(loadEditorContent() ?? '');
    setIsInitialized(true);
  }, []);

  // Update content and sync to sessionStorage
  const updateContent = useCallback((newContent: string) => {
    setContent(newContent);
    saveEditorContent(newContent);
  }, []);

  // Get current content (for format switcher to save before navigation)
  const getContent = useCallback(() => content, [content]);

  return { content, updateContent, getContent, isInitialized };
}
