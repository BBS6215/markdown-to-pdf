'use client';

/**
 * File upload dropzone — drag & drop + click to upload .md files.
 * Source: 03-产品结构 §4.1 (编辑器模块), 04-UI规范 §4.5 (拖拽高亮态)
 */

import { useState, useRef, useCallback } from 'react';
import { Upload } from 'lucide-react';
import { decodeFileBuffer } from '@/lib/editor/encoding-detector';

interface FileDropzoneProps {
  onFileContent: (content: string) => void;
  children: React.ReactNode;
}

export function FileDropzone({ onFileContent, children }: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
            <p className="text-sm font-medium text-blue-600">Drop .md file here</p>
          </div>
        </div>
      )}

      {/* Hidden file input for click upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".md,.markdown,.txt"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = ''; // Reset for re-upload same file
        }}
      />
    </div>
  );
}

/**
 * Upload button to trigger file input.
 */
export function UploadButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
    >
      <Upload size={16} />
      <span className="hidden sm:inline">Upload .md</span>
    </button>
  );
}
