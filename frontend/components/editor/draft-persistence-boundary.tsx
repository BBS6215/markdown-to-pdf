'use client';

import { useEffect, type ReactNode } from 'react';
import { flushEditorContent, getEditorSnapshot, initializeEditorContent } from '@/lib/editor/session-storage';
import { getTranslations } from '@/lib/i18n/get-translations';

/** Checkpoint before navigation, including Header and Footer language links. */
export function DraftPersistenceBoundary({ children }: { children: ReactNode }) {
  useEffect(() => {
    initializeEditorContent();
    const checkpoint = () => { flushEditorContent(); };
    const visibility = () => { if (document.visibilityState === 'hidden') checkpoint(); };
    const beforeUnload = (event: BeforeUnloadEvent) => {
      if (!flushEditorContent() && getEditorSnapshot().content) {
        event.preventDefault();
        event.returnValue = '';
      }
    };
    const navigation = (event: MouseEvent) => {
      if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest<HTMLAnchorElement>('a[href]');
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return;
      const url = new URL(anchor.href, location.href);
      if (url.origin !== location.origin) return;
      const saved = flushEditorContent();
      const from = location.pathname.match(/^\/(en|zh)(?:\/|$)/)?.[1];
      const to = url.pathname.match(/^\/(en|zh)(?:\/|$)/)?.[1];
      // Locale/root transitions may reload the document. Never discard an
      // unsaved draft silently; same-locale client navigation can use memory.
      if (!saved && getEditorSnapshot().content && from !== to) {
        event.preventDefault();
        event.stopPropagation();
        alert(getTranslations(from ?? 'en').editor.storageWarning);
      }
    };
    window.addEventListener('pagehide', checkpoint);
    window.addEventListener('beforeunload', beforeUnload);
    document.addEventListener('visibilitychange', visibility);
    document.addEventListener('click', navigation, true);
    return () => {
      checkpoint();
      window.removeEventListener('pagehide', checkpoint);
      window.removeEventListener('beforeunload', beforeUnload);
      document.removeEventListener('visibilitychange', visibility);
      document.removeEventListener('click', navigation, true);
    };
  }, []);
  return children;
}
