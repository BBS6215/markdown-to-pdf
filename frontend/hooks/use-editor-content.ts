'use client';

import { useState, useCallback, useEffect } from 'react';
import {
  loadEditorContent,
  saveEditorContent,
  hasVisitedBefore,
  markAsVisited,
} from '@/lib/editor/session-storage';

/**
 * Pre-fill example Markdown (English).
 * Source: 03-1-交互与体验补充说明 §1.2
 */
const PREFILL_EXAMPLE = `# Welcome to Markdown to PDF

This is **Markdown** — the same format used by ChatGPT, Claude, and other AI tools.

## How to use
1. Select all text here (Ctrl+A / Cmd+A)
2. Paste your own Markdown or AI-generated text
3. Preview the formatted result on the right →
4. Click **Convert to PDF** below

## Markdown basics
- \`#\` creates headings
- \`**bold**\` makes text **bold**
- \`-\` creates bullet lists like this one

> Tip: You don't need to know Markdown — just paste and convert!
`;

/**
 * Hook managing editor content with sessionStorage sync and pre-fill logic.
 * Source: 07 §11.4 预填示例逻辑
 *
 * Priority:
 * 1. sessionStorage content → use it (format switch / from guide page)
 * 2. localStorage hasVisited → empty editor + placeholder
 * 3. First visit → pre-fill example + mark as visited
 */
export function useEditorContent() {
  const [content, setContent] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize content on mount (client-side only)
  useEffect(() => {
    const saved = loadEditorContent();
    if (saved !== null) {
      // Case 1: sessionStorage has content (format switch or guide CTA)
      setContent(saved);
    } else if (hasVisitedBefore()) {
      // Case 2: Return visitor — empty editor
      setContent('');
    } else {
      // Case 3: First visit — show pre-fill example
      setContent(PREFILL_EXAMPLE);
      markAsVisited();
    }
    setIsInitialized(true);
  }, []);

  // Update content and sync to sessionStorage
  const updateContent = useCallback((newContent: string) => {
    setContent(newContent);
    saveEditorContent(newContent);
  }, []);

  // Get current content (for format switcher to save before navigation)
  const getContent = useCallback(() => content, [content]);

  return { content, updateContent, getContent, isInitialized };
}
