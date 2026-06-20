'use client';

/**
 * CodeMirror 6 Markdown editor — loaded via dynamic import.
 * Source: 05-技术方案 §2.1, 07 §11.4 T1
 *
 * Renders textarea fallback first, then replaces with CM6 once loaded
 * (progressive enhancement for mobile compatibility, 03-1 §3 P0-问题1).
 */

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { EditorView } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { createExtensions } from '@/lib/editor/cm6-extensions';
import { getTranslations } from '@/lib/i18n/get-translations';

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
  const viewRef = useRef<EditorView | null>(null);
  const initialValueRef = useRef(value);
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
      }
      // Our scroll runs last, so it alone decides where the page lands: the
      // editor panel pinned to the top of the viewport, ready to type. focus()
      // alone does NOT reliably scroll the page when CM already holds focus,
      // which previously left users stranded at the page bottom after Clear.
      rootRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
  }), []);

  // Initialize CodeMirror
  useEffect(() => {
    if (!containerRef.current) return;

    const extensions = createExtensions({ placeholder: t.editor.placeholder });

    const state = EditorState.create({
      doc: initialValueRef.current,
      extensions: [
        ...extensions,
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            onChangeRef.current(update.state.doc.toString());
          }
        }),
      ],
    });

    const view = new EditorView({
      state,
      parent: containerRef.current,
    });

    viewRef.current = view;
    setCmLoaded(true);

    return () => {
      view.destroy();
      viewRef.current = null;
    };
  }, [t.editor.placeholder]);

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
      <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 min-h-[72px] flex flex-col justify-center">
        <span className="text-sm font-medium text-gray-700">{t.editor.inputTitle}</span>
        <span className="block text-xs text-gray-400 mt-0.5">
          {t.editor.inputSubtitle}
        </span>
      </div>

      {/* Textarea fallback (shown until CM6 loads) */}
      {!cmLoaded && (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t.editor.placeholder}
          className="w-full min-h-[400px] p-4 bg-gray-50 text-gray-900 text-sm font-mono resize-none outline-none"
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
