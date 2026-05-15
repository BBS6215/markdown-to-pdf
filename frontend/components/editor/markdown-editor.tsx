'use client';

/**
 * CodeMirror 6 Markdown editor — loaded via dynamic import.
 * Source: 05-技术方案 §2.1, 07 §11.4 T1
 *
 * Renders textarea fallback first, then replaces with CM6 once loaded
 * (progressive enhancement for mobile compatibility, 03-1 §3 P0-问题1).
 */

import { useEffect, useRef, useState } from 'react';
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

export function MarkdownEditor({ value, onChange, className = '', lang = 'en' }: MarkdownEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const initialValueRef = useRef(value);
  const [cmLoaded, setCmLoaded] = useState(false);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const t = getTranslations(lang);

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
    <div className={`relative ${className}`}>
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

      {/* CodeMirror container */}
      <div
        ref={containerRef}
        className={`overflow-auto ${cmLoaded ? '' : 'h-0 overflow-hidden'}`}
        style={{ minHeight: cmLoaded ? '400px' : undefined }}
      />
    </div>
  );
}
