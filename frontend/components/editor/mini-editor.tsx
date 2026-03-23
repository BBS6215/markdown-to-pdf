'use client';

/**
 * Mini editor for guide pages — simplified CM6, 200px height.
 * Source: 03-产品结构 §4.4, 04-UI规范 §2.1 B类
 */

import { useState } from 'react';
import { MarkdownPreview } from './markdown-preview';

interface MiniEditorProps {
  defaultContent?: string;
  lang?: string;
}

export function MiniEditor({ defaultContent = '', lang = 'en' }: MiniEditorProps) {
  const [content, setContent] = useState(defaultContent);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden my-6">
      <div className="bg-gray-50 border-b border-gray-200 px-4 py-2">
        <span className="text-sm font-medium text-gray-700">Try it yourself</span>
      </div>
      <div className="grid grid-cols-2 divide-x divide-gray-200" style={{ height: '200px' }}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-full p-3 bg-gray-50 text-sm font-mono text-gray-900 resize-none outline-none"
          placeholder="Type Markdown here..."
        />
        <div className="overflow-auto">
          <div className="bg-gray-50 border-b border-gray-200 px-3 py-1">
            <span className="text-xs text-gray-500">Preview</span>
          </div>
          <MarkdownPreview markdown={content} className="text-sm" />
        </div>
      </div>
    </div>
  );
}
