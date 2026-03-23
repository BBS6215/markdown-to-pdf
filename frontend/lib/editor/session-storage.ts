/**
 * sessionStorage utilities for editor content persistence.
 * Source: 05-技术方案 §5.3 (场景 3: 格式切换), 07 §11.4 T3
 *
 * Key: "md-editor-content" — must be consistent across all read/write points.
 */

const EDITOR_CONTENT_KEY = 'md-editor-content';
const HAS_VISITED_KEY = 'hasVisited';

export function saveEditorContent(content: string): void {
  try {
    sessionStorage.setItem(EDITOR_CONTENT_KEY, content);
  } catch {
    // sessionStorage quota exceeded — silently ignore (05 §11 风险 8)
  }
}

export function loadEditorContent(): string | null {
  try {
    return sessionStorage.getItem(EDITOR_CONTENT_KEY);
  } catch {
    return null;
  }
}

export function clearEditorContent(): void {
  try {
    sessionStorage.removeItem(EDITOR_CONTENT_KEY);
  } catch {
    // ignore
  }
}

export function hasVisitedBefore(): boolean {
  try {
    return localStorage.getItem(HAS_VISITED_KEY) === 'true';
  } catch {
    return false;
  }
}

export function markAsVisited(): void {
  try {
    localStorage.setItem(HAS_VISITED_KEY, 'true');
  } catch {
    // ignore
  }
}
