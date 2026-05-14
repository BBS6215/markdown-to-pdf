'use client';

/**
 * Shared tool page layout — used by PDF, Word, and HTML pages.
 * Source: 03-产品结构 §4.3 (工具页模块), 04-UI规范 §2.1 (工具页层级)
 */

import { useState, useRef } from 'react';
import type { ConvertFormat } from '@/lib/types';
import { FORMAT_CONFIG } from '@/lib/types';
import { FormatSwitcher } from '@/components/layout/format-switcher';
import { MarkdownEditor } from '@/components/editor/markdown-editor';
import { MarkdownPreview } from '@/components/editor/markdown-preview';
import { FileDropzone } from '@/components/editor/file-dropzone';
import { EditorToolbar } from '@/components/editor/editor-toolbar';
import { SeoContentSection } from '@/components/seo/seo-content-section';
import { useEditorContent } from '@/hooks/use-editor-content';
import { useConversion } from '@/hooks/use-conversion';
import { useMobileDetect } from '@/hooks/use-mobile-detect';
import { usePathname } from 'next/navigation';
import en from '@/lib/i18n/locales/en';
import zh from '@/lib/i18n/locales/zh';
import type { Translations } from '@/lib/i18n/locales/en';

const TRANSLATIONS: Record<string, Translations> = { en, zh };

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

  const pathname = usePathname();
  const lang = pathname.startsWith('/zh') ? 'zh' : 'en';
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const config = FORMAT_CONFIG[format];
  const toolText = t.tool[format];
  const seoContent = t.seo[format];

  const handleConvert = () => {
    // No quota gate — all formats run in the browser, conversions are free
    // and unlimited. See docs/03 §4.6.
    convert(content);
  };

  const handleCopyHtml = format === 'html' ? () => copyHtml(content) : undefined;
  const handleUpload = () => fileInputRef.current?.click();
  const handleFileContent = (fileContent: string) => updateContent(fileContent);

  return (
    <div className="max-w-7xl mx-auto">
      {/* H1 + Sub-heading (02-SEO 附录 C: Title 必须包含 "Markdown (.md)") */}
      <div className="px-4 pt-4 pb-2">
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

      {/* Editor area — wait for sessionStorage initialization */}
      {!isInitialized ? (
        <div className="flex items-center justify-center h-96">
          <div className="text-gray-400 text-sm">Loading editor...</div>
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
                Edit
              </button>
              <button
                onClick={() => setMobileTab('preview')}
                className={`py-2 px-4 text-sm border-b-2 ${
                  mobileTab === 'preview'
                    ? 'text-gray-900 font-medium border-gray-900'
                    : 'text-gray-500 border-transparent'
                }`}
              >
                Preview
              </button>
            </div>
          )}

          {/* Editor + Preview */}
          <FileDropzone onFileContent={handleFileContent}>
            <div className={`${isMobile ? '' : 'grid grid-cols-[minmax(460px,1fr)_minmax(0,2fr)]'} border-b border-gray-200`}>
              <div
                className={`${!isMobile ? 'border-r border-gray-200' : ''} ${
                  isMobile && mobileTab !== 'edit' ? 'hidden' : ''
                }`}
              >
                <MarkdownEditor value={content} onChange={updateContent} />
              </div>
              <div className={`${isMobile && mobileTab !== 'preview' ? 'hidden' : ''}`}>
                <MarkdownPreview markdown={content} />
              </div>
            </div>
          </FileDropzone>

          {/* Toolbar — no quota props: conversion is unlimited in the
              frontend-only pipeline, so EditorToolbar's defaults apply. */}
          <EditorToolbar
            format={format}
            status={status}
            lastAction={lastAction}
            errorMessage={errorMessage}
            onConvert={handleConvert}
            onCopyHtml={handleCopyHtml}
            onUpload={handleUpload}
            onRetry={retry}
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

      {/* SEO Content Section — below-the-fold, always SSR rendered (01 §6.4, 07 任务 4.13-4.19) */}
      <SeoContentSection format={format} lang={lang} content={seoContent} />
    </div>
  );
}
