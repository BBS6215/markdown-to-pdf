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
import { SeoContentSection } from '@/components/seo/seo-content-section';
import { useEditorContent } from '@/hooks/use-editor-content';
import { useConversion } from '@/hooks/use-conversion';
import { useMobileDetect } from '@/hooks/use-mobile-detect';
import { usePathname } from 'next/navigation';
import { getTranslations } from '@/lib/i18n/get-translations';

interface ToolPageProps {
  format: ConvertFormat;
}

type MobileTab = 'edit' | 'preview';

export function ToolPage({ format }: ToolPageProps) {
  const { content, updateContent, getContent, isInitialized } = useEditorContent();
  const { status, lastAction, errorMessage, convert, copyHtml, retry } = useConversion(format);
  const isMobile = useMobileDetect();
  const [mobileTab, setMobileTab] = useState<MobileTab>('edit');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<MarkdownEditorHandle>(null);

  // Clear-with-undo: clearing is destructive and irreversible, so instead of a
  // confirm dialog (which interrupts the rapid edit→convert→clear loop users
  // asked for) we clear immediately and offer a few-second Undo toast.
  const [clearedSnapshot, setClearedSnapshot] = useState<string | null>(null);
  const undoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pathname = usePathname();
  const lang = pathname.startsWith('/zh') ? 'zh' : 'en';
  const t = getTranslations(lang);
  const toolText = t.tool[format];
  const seoContent = t.seo[format];

  const handleConvert = () => {
    // No quota gate: conversion runs in the frontend-only browser pipeline.
    convert(content);
  };

  const handleCopyHtml = format === 'html' ? () => copyHtml(content) : undefined;
  const handleUpload = () => fileInputRef.current?.click();
  const handleFileContent = (fileContent: string) => updateContent(fileContent);

  const handleClear = () => {
    if (!content) return;
    if (undoTimerRef.current) clearTimeout(undoTimerRef.current);
    setClearedSnapshot(content);
    updateContent('');
    // Reported UX issue: after clearing a long document the page collapses and
    // the browser clamps scroll to the (now short) page bottom, leaving the
    // editor off-screen. Move focus back into the editor so the user can type
    // immediately; focusing also scrolls it into view. On mobile, make sure the
    // edit tab is active first. Wait one frame for the collapse to settle.
    if (isMobile) setMobileTab('edit');
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

  const clearedLabel = lang === 'zh' ? '已清空' : 'Cleared';
  const undoLabel = lang === 'zh' ? '撤销' : 'Undo';

  return (
    <div className="max-w-7xl mx-auto">
      {/* H1 + Sub-heading + SSR intro paragraph
          02-SEO 附录 C: Title 必须包含 "Markdown (.md)"
          intro 段是 SSR 文本（200+ 字），让爬虫在编辑器加载前看到真实内容
          —— AdSense 审核对工具页"thin content"判定的关键缓解。 */}
      <div className="px-4 pt-4 pb-2 max-w-4xl">
        <h1 className="text-2xl font-semibold text-gray-800">
          {toolText.h1}
        </h1>
        <p className="mt-1 text-base text-gray-500">
          {toolText.subheading}
        </p>
        <p className="mt-3 text-sm text-gray-600 leading-7">
          {toolText.intro}
        </p>
      </div>

      {/* Format Switcher */}
      <div className="px-4">
        <FormatSwitcher currentFormat={format} getContent={getContent} />
      </div>

      {/* Editor area — wait for sessionStorage initialization */}
      {!isInitialized ? (
        <div className="flex items-center justify-center h-96">
          <div className="text-gray-400 text-sm">{t.editor.loading}</div>
        </div>
      ) : (
        <>
          {/* Mobile: edit/preview tab selector */}
          {isMobile && (
            <div className="flex border-b border-gray-200 px-4">
              <button
                onClick={() => setMobileTab('edit')}
                className={`py-2 px-4 text-sm border-b-2 ${
                  mobileTab === 'edit'
                    ? 'text-gray-900 font-medium border-gray-900'
                    : 'text-gray-500 border-transparent'
                }`}
              >
                {t.editor.editTab}
              </button>
              <button
                onClick={() => setMobileTab('preview')}
                className={`py-2 px-4 text-sm border-b-2 ${
                  mobileTab === 'preview'
                    ? 'text-gray-900 font-medium border-gray-900'
                    : 'text-gray-500 border-transparent'
                }`}
              >
                {t.editor.previewTab}
              </button>
            </div>
          )}

          {/* Editor + Preview */}
          <FileDropzone onFileContent={handleFileContent} lang={lang}>
            <div className={`${isMobile ? '' : 'grid grid-cols-[minmax(460px,1fr)_minmax(0,2fr)]'} border-b border-gray-200`}>
              <div
                className={`${!isMobile ? 'border-r border-gray-200' : ''} ${
                  isMobile && mobileTab !== 'edit' ? 'hidden' : ''
                }`}
              >
                <MarkdownEditor ref={editorRef} value={content} onChange={updateContent} lang={lang} />
              </div>
              <div className={`${isMobile && mobileTab !== 'preview' ? 'hidden' : ''}`}>
                <MarkdownPreview markdown={content} lang={lang} />
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
            onRetry={retry}
            lang={lang}
          />

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".md,.markdown,.txt"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                file.arrayBuffer().then(async (buffer) => {
                  const { decodeFileBuffer } = await import('@/lib/editor/encoding-detector');
                  const text = await decodeFileBuffer(buffer);
                  handleFileContent(text);
                });
              }
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
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-2.5 bg-gray-900 text-white text-sm rounded-lg shadow-lg">
          <span>{clearedLabel}</span>
          <button
            onClick={handleUndoClear}
            className="font-medium text-blue-300 hover:text-blue-200 transition-colors"
          >
            {undoLabel}
          </button>
        </div>
      )}

      {/* SEO Content Section — below-the-fold, always SSR rendered (01 §6.4, 07 任务 4.13-4.19) */}
      <SeoContentSection lang={lang} content={seoContent} />
    </div>
  );
}
