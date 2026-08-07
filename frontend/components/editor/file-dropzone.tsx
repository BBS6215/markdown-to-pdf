'use client';

/**
 * File upload dropzone — drag & drop .md files onto the editor area.
 * Source: 03-产品结构 §4.1 (编辑器模块), 04-UI规范 §4.5 (拖拽高亮态)
 *
 * Click-to-upload lives in tool-page.tsx (toolbar button → hidden input);
 * this component intentionally handles drop only, so there is exactly one
 * file input on the page.
 */

import { useState, useCallback } from 'react';
import { Upload } from 'lucide-react';
import { decodeFileBuffer } from '@/lib/editor/encoding-detector';
import { getTranslations } from '@/lib/i18n/get-translations';

interface FileDropzoneProps {
  onFileContent: (content: string) => void;
  children: React.ReactNode;
  lang?: string;
}

export function FileDropzone({ onFileContent, children, lang = 'en' }: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const t = getTranslations(lang);

  const handleFile = useCallback(
    async (file: File) => {
      if (!file.name.endsWith('.md') && !file.name.endsWith('.markdown') && !file.name.endsWith('.txt')) {
        return; // Only accept markdown/text files
      }
      const buffer = await file.arrayBuffer();
      const content = await decodeFileBuffer(buffer);
      onFileContent(content);
    },
    [onFileContent]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`relative ${
        isDragging ? 'ring-2 ring-blue-400 ring-inset bg-blue-50/50' : ''
      }`}
    >
      {children}

      {/* Drag overlay */}
      {isDragging && (
        <div className="absolute inset-0 flex items-center justify-center bg-blue-50/80 border-2 border-dashed border-blue-400 rounded-lg z-10 pointer-events-none">
          <div className="text-center">
            <Upload className="mx-auto text-blue-500 mb-2" size={32} />
            <p className="text-sm font-medium text-blue-600">{t.editor.dropHint}</p>
          </div>
        </div>
      )}
    </div>
  );
}
