'use client';

/**
 * CodeMirror 6 Markdown editor — CM6 really is loaded via dynamic import.
 * Source: 05-技术方案 §2.1, 07 §11.4 T1
 *
 * Renders the textarea fallback first (SSR + instantly interactive), then
 * swaps in CM6 once its chunk arrives. No CM6 module is statically imported
 * here (`import type` only): the tool pages' First Load JS stays small and
 * the ~440 kB editor bundle becomes an on-mount async chunk.
 */

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import type { EditorView } from '@codemirror/view';
import { PanelHeader } from '@/components/editor/panel-header';
import { getTranslations } from '@/lib/i18n/get-translations';
import { SourceStatistics } from './text-statistics';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  lang?: string;
}

/** Imperative handle so callers (e.g. Clear) can move focus into the editor. */
export interface MarkdownEditorHandle {
  focus: () => void;
}

export const MarkdownEditor = forwardRef<MarkdownEditorHandle, MarkdownEditorProps>(function MarkdownEditor(
  { value, onChange, className = '', lang = 'en' },
  ref,
) {
  const rootRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  // Mirrors the latest value prop. CM6 initializes from THIS (not the value
  // at mount time): the user can type into the fallback textarea while the
  // CM6 chunk is still downloading, and that input must not be lost on swap.
  const latestValueRef = useRef(value);
  const [cmLoaded, setCmLoaded] = useState(false);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const t = getTranslations(lang);

  useImperativeHandle(ref, () => ({
    focus: () => {
      const view = viewRef.current;
      if (view) {
        // Put the cursor at line 1, then focus WITHOUT letting the browser
        // auto-scroll the caret into view — that auto-scroll fights our own
        // page scroll below and makes the final position non-deterministic.
        view.dispatch({ selection: { anchor: 0 } });
        view.contentDOM.focus({ preventScroll: true });
      } else {
        // CM6 chunk still downloading — focus the fallback textarea so the
        // user can type immediately (same preventScroll rationale).
        textareaRef.current?.focus({ preventScroll: true });
      }
      // Our scroll runs last, so it alone decides where the page lands: the
      // editor panel pinned to the top of the viewport, ready to type. focus()
      // alone does NOT reliably scroll the page when CM already holds focus,
      // which previously left users stranded at the page bottom after Clear.
      rootRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
  }), []);

  // Keep the latest-value mirror in sync with every external value change
  // (typing, upload, Clear, format-switch restore).
  useEffect(() => {
    latestValueRef.current = value;
  }, [value]);

  // Initialize CodeMirror — dynamically imported so it stays out of the
  // First Load JS. The cancelled flag covers React StrictMode's double
  // effect invocation and unmount-before-import-resolve: in both cases we
  // must not create an editor or setState.
  useEffect(() => {
    if (!containerRef.current) return;
    let cancelled = false;
    let view: EditorView | null = null;

    async function init() {
      try {
        const [{ EditorView }, { EditorState }, { createExtensions }] = await Promise.all([
          import('@codemirror/view'),
          import('@codemirror/state'),
          import('@/lib/editor/cm6-extensions'),
        ]);
        if (cancelled || !containerRef.current) return;

        const extensions = createExtensions({ placeholder: t.editor.placeholder });

        const state = EditorState.create({
          doc: latestValueRef.current,
          extensions: [
            ...extensions,
            EditorView.contentAttributes.of({ 'aria-label': t.editor.inputTitle }),
            EditorView.updateListener.of((update) => {
              if (update.docChanged) {
                onChangeRef.current(update.state.doc.toString());
              }
            }),
          ],
        });

        view = new EditorView({
          state,
          parent: containerRef.current,
        });

        // Capture BEFORE setCmLoaded unmounts the fallback: if the user was
        // actively typing there when the chunk arrived, hand focus and the
        // selection over to CM6 — otherwise their next keystrokes go nowhere.
        // Only when the fallback holds focus; never steal it otherwise.
        const hadFocus = document.activeElement === textareaRef.current;
        const selStart = textareaRef.current?.selectionStart ?? 0;
        const selEnd = textareaRef.current?.selectionEnd ?? 0;
        const selDirection = textareaRef.current?.selectionDirection ?? 'forward';

        viewRef.current = view;
        setCmLoaded(true);

        if (hadFocus) {
          const docLen = view.state.doc.length;
          const start = Math.min(selStart, docLen);
          const end = Math.min(selEnd, docLen);
          // Preserve the full range (not just a collapsed caret) so a
          // select-then-type replacement behaves identically after the swap.
          // Backward selections keep anchor/head orientation.
          const selection = selDirection === 'backward'
            ? { anchor: end, head: start }
            : { anchor: start, head: end };
          view.dispatch({ selection });
          view.contentDOM.focus({ preventScroll: true });
        }
      } catch (err) {
        // ChunkLoadError (offline, deploy rollover): swallow it and keep the
        // textarea fallback — basic editing still works, so this is not
        // worth an error UI. Logged for diagnostics only.
        if (!cancelled) {
          console.error('[editor] CodeMirror failed to load, keeping textarea fallback:', err);
        }
      }
    }

    init();

    return () => {
      cancelled = true;
      view?.destroy();
      viewRef.current = null;
    };
  }, [t.editor.placeholder, t.editor.inputTitle]);

  // Sync external value changes into CM (e.g., file upload, sessionStorage restore)
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const currentDoc = view.state.doc.toString();
    if (currentDoc !== value) {
      view.dispatch({
        changes: { from: 0, to: currentDoc.length, insert: value },
      });
    }
  }, [value]);

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      {/* Panel header */}
      <PanelHeader title={t.editor.inputTitle} subtitle={t.editor.inputSubtitle} stats={<SourceStatistics content={value} lang={lang} />} />

      {/* Textarea fallback (shown until CM6 loads) */}
      {!cmLoaded && (
        <textarea
          ref={textareaRef}
          aria-label={t.editor.inputTitle}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t.editor.placeholder}
          className="w-full min-h-[400px] p-4 bg-gray-50 text-gray-900 text-sm font-mono resize-none outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500"
        />
      )}

      {/* CodeMirror container — height is capped inside the CM theme
          (.cm-editor maxHeight + .cm-scroller overflow), so CodeMirror's own
          scroller owns the scroll. The wrapper just hosts it; no outer scroll. */}
      <div
        ref={containerRef}
        className={cmLoaded ? '' : 'h-0 overflow-hidden'}
      />
    </div>
  );
});
