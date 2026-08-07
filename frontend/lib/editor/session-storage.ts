/**
 * sessionStorage utilities for editor content persistence.
 * Source: 03-产品结构 §6.3, 03-1-交互与体验补充 §1.2
 *
 * Key: "md-editor-content" — must be consistent across all read/write points.
 */

const EDITOR_CONTENT_KEY = 'md-editor-content';

export function saveEditorContent(content: string): void {
  try {
    sessionStorage.setItem(EDITOR_CONTENT_KEY, content);
  } catch {
    // Storage can be unavailable or full; conversion still works in memory.
  }
}

export function loadEditorContent(): string | null {
  try {
    return sessionStorage.getItem(EDITOR_CONTENT_KEY);
  } catch {
    return null;
  }
}
