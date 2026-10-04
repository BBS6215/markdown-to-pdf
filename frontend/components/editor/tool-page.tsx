'use client';

/**
 * Shared tool page layout — used by PDF, Word, and HTML pages.
 * Source: 03-产品结构 §4.3 (工具页模块), 04-UI规范 §2.1 (工具页层级)
 */

import { useState, useRef, useEffect } from 'react';
import type { ConvertFormat } from '@/lib/types';
import { FormatSwitcher } from '@/components/layout/format-switcher';
import { MarkdownEditor, type MarkdownEditorHandle } from '@/components/editor/markdown-editor';
import { MarkdownPreview } from '@/components/editor/markdown-preview';
import { FileDropzone } from '@/components/editor/file-dropzone';
import { EditorToolbar } from '@/components/editor/editor-toolbar';
import { JsonLd } from '@/components/seo/json-ld';
import { useEditorContent } from '@/hooks/use-editor-content';
import { useConversion } from '@/hooks/use-conversion';
import { useFileUpload } from '@/hooks/use-file-upload';
import { getTranslations } from '@/lib/i18n/get-translations';
import { softwareApplicationSchema } from '@/lib/seo/json-ld-schemas';

interface ToolPageProps {
  format: ConvertFormat;
  lang: string;
}

type MobileTab = 'edit' | 'preview';

export function ToolPage({ format, lang }: ToolPageProps) {
  const supportedLang = lang === 'zh' ? 'zh' : 'en';
  const { content, updateContent, getContent, isInitialized, storageFailed } = useEditorContent();
  const { status, lastAction, errorMessage, convert, copyHtml, retry, canConvert } =
    useConversion({ format, lang: supportedLang, markdown: content });
  const { upload, reading, error: uploadError, cancel: cancelUpload } = useFileUpload(updateContent, supportedLang);
  const [mobileTab, setMobileTab] = useState<MobileTab>('edit');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<MarkdownEditorHandle>(null);

  // Clear-with-undo: clearing is destructive and irreversible, so instead of a
  // confirm dialog (which interrupts the rapid edit→convert→clear loop users
  // asked for) we clear immediately and offer a few-second Undo toast.
  const [clearedSnapshot, setClearedSnapshot] = useState<string | null>(null);
  const undoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const t = getTranslations(supportedLang);
  const toolText = t.tool[format];

  const handleConvert = () => {
    // No quota gate: conversion runs in the frontend-only browser pipeline.
    void convert();
  };

  const handleCopyHtml = format === 'html' ? () => { void copyHtml(); } : undefined;
  const handleUpload = () => fileInputRef.current?.click();
  const handleEdit = (value: string) => { cancelUpload(); updateContent(value); };

  const handleClear = () => {
    cancelUpload();
    if (!content) return;
    if (undoTimerRef.current) clearTimeout(undoTimerRef.current);
    setClearedSnapshot(content);
    updateContent('');
    // Reported UX issue: after clearing a long document the page collapses and
    // the browser clamps scroll to the (now short) page bottom, leaving the
    // editor off-screen. Move focus back into the editor so the user can type
    // immediately; focusing also scrolls it into view. Make sure the edit tab
    // is active first (no-op on desktop, where both panes are always visible).
    // Wait one frame for the collapse to settle.
    setMobileTab('edit');
    requestAnimationFrame(() => editorRef.current?.focus());
    undoTimerRef.current = setTimeout(() => {
      setClearedSnapshot(null);
      undoTimerRef.current = null;
    }, 6000);
  };

  const handleUndoClear = () => {
    if (undoTimerRef.current) clearTimeout(undoTimerRef.current);
    undoTimerRef.current = null;
    if (clearedSnapshot !== null) updateContent(clearedSnapshot);
    setClearedSnapshot(null);
  };

  useEffect(() => {
    if (clearedSnapshot === null || !content) return;
    if (undoTimerRef.current) clearTimeout(undoTimerRef.current);
    undoTimerRef.current = null;
    setClearedSnapshot(null);
  }, [clearedSnapshot, content]);

  useEffect(() => {
    return () => {
      if (undoTimerRef.current) clearTimeout(undoTimerRef.current);
    };
  }, []);

  const clearedLabel = t.editor.cleared;
  const undoLabel = t.editor.undo;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Compact tool heading: one clear promise, then the converter. */}
      <div className="px-4 pt-4 pb-2 max-w-4xl">
        <h1 className="text-2xl font-semibold text-gray-800">
          {toolText.h1}
        </h1>
        <p className="mt-1 text-base text-gray-500">
          {toolText.subheading}
        </p>
      </div>

      {/* Format Switcher */}
      <div className="px-4">
        <FormatSwitcher currentFormat={format} getContent={getContent} />
      </div>
      <div role="status" aria-live="polite">
        {reading && <p className="px-4 py-2 text-sm text-gray-600">{t.editor.readingFile}</p>}
        {uploadError && <p role="alert" className="px-4 py-2 text-sm text-red-700">{uploadError}</p>}
        {storageFailed && <p className="px-4 py-2 text-sm text-yellow-800">{t.editor.storageWarning}</p>}
      </div>

      {/* Editor area — wait for sessionStorage initialization */}
      {!isInitialized ? (
        <div className="flex items-center justify-center h-96">
          <div className="text-gray-500 text-sm">{t.editor.loading}</div>
        </div>
      ) : (
        <>
          {/* Mobile-only edit/preview switcher. Plain group+toggle semantics
              rather than tab/tablist: on desktop BOTH panes are visible at
              once (the switcher is md:hidden), so a single aria-selected tab
              would contradict the visible state. aria-pressed toggles keep
              the visual and a11y states consistent at every breakpoint. */}
          <div role="group" aria-label={t.editor.editTab + ' / ' + t.editor.previewTab} className="flex border-b border-gray-200 px-4 md:hidden">
            <button
              type="button"
              onClick={() => setMobileTab('edit')}
              aria-pressed={mobileTab === 'edit'}
              aria-controls="editor-pane"
              className={`py-2 px-4 text-sm border-b-2 ${
                mobileTab === 'edit'
                  ? 'text-gray-900 font-medium border-gray-900'
                  : 'text-gray-500 border-transparent'
              }`}
            >
              {t.editor.editTab}
            </button>
            <button
              type="button"
              onClick={() => setMobileTab('preview')}
              aria-pressed={mobileTab === 'preview'}
              aria-controls="preview-pane"
              className={`py-2 px-4 text-sm border-b-2 ${
                mobileTab === 'preview'
                  ? 'text-gray-900 font-medium border-gray-900'
                  : 'text-gray-500 border-transparent'
              }`}
            >
              {t.editor.previewTab}
            </button>
          </div>

          {/* Editor + Preview — CSS breakpoints decide the layout (no JS
              mobile detection, so no SSR/hydration layout flash). Mobile:
              single pane toggled by the switcher above; desktop (md+): both
              panes side by side via md:block + the grid template. */}
          <FileDropzone onFile={(file) => { void upload(file); }} lang={supportedLang}>
            <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] border-b border-gray-200">
              <div
                id="editor-pane"
                className={`md:border-r md:border-gray-200 ${
                  mobileTab !== 'edit' ? 'hidden' : ''
                } md:block`}
              >
                <MarkdownEditor ref={editorRef} value={content} onChange={handleEdit} lang={supportedLang} />
              </div>
              <div
                id="preview-pane"
                className={`${mobileTab !== 'preview' ? 'hidden' : ''} md:block`}
              >
                <MarkdownPreview markdown={content} lang={supportedLang} showStats />
              </div>
            </div>
          </FileDropzone>

          {/* Toolbar — no quota props: conversion runs locally in the
              frontend-only pipeline, so EditorToolbar's defaults apply. */}
          <EditorToolbar
            format={format}
            status={status}
            lastAction={lastAction}
            errorMessage={errorMessage}
            onConvert={handleConvert}
            onCopyHtml={handleCopyHtml}
            onUpload={handleUpload}
            onClear={handleClear}
            clearDisabled={!content}
            convertDisabled={!canConvert || reading}
            onRetry={retry}
            lang={supportedLang}
          />

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".md,.markdown,.txt"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void upload(file);
              e.target.value = '';
            }}
          />
        </>
      )}

      {/* Undo toast — appears after Clear, lets the user restore the snapshot
          within a few seconds without breaking the continuous-use flow.
          Hidden the moment the editor is non-empty again: once the user has
          pasted/typed a new version, Undo must not clobber it with the old
          snapshot (the toast and snapshot still expire on the 6s timer). */}
      {clearedSnapshot !== null && !content && (
        <div role="status" aria-live="polite" className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-2.5 bg-gray-900 text-white text-sm rounded-lg shadow-lg">
          <span>{clearedLabel}</span>
          <button
            onClick={handleUndoClear}
            className="font-medium text-blue-300 hover:text-blue-200 transition-colors"
          >
            {undoLabel}
          </button>
        </div>
      )}

      <JsonLd data={softwareApplicationSchema(format, supportedLang)} />
    </div>
  );
}
