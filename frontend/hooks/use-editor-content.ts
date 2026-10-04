'use client';

import { useCallback, useEffect, useSyncExternalStore } from 'react';
import { flushEditorContent, getEditorSnapshot, getServerEditorSnapshot,
  initializeEditorContent, subscribeEditor, updateEditorContent } from '@/lib/editor/session-storage';

export function useEditorContent() {
  const state = useSyncExternalStore(subscribeEditor, getEditorSnapshot, getServerEditorSnapshot);
  useEffect(() => { initializeEditorContent(); }, []);
  const getContent = useCallback(() => getEditorSnapshot().content, []);
  return { content: state.content, updateContent: updateEditorContent, getContent,
    isInitialized: state.ready, storageFailed: state.storageFailed, flush: flushEditorContent };
}
