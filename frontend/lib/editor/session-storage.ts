/**
 * Single browser-tab draft. Memory remains authoritative during client navigation;
 * sessionStorage is a best-effort checkpoint, not a cross-session database.
 */
const EDITOR_CONTENT_KEY = 'md-editor-content';
const EMPTY = { content: '', ready: false, storageFailed: false };
let snapshot = EMPTY;
let timer: ReturnType<typeof setTimeout> | null = null;
const listeners = new Set<() => void>();

function publish(next: typeof EMPTY) {
  snapshot = next;
  listeners.forEach(listener => listener());
}
export const getEditorSnapshot = () => snapshot;
export const getServerEditorSnapshot = () => EMPTY;
export function subscribeEditor(listener: () => void) {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}
export function initializeEditorContent() {
  if (snapshot.ready) return;
  try {
    publish({ content: sessionStorage.getItem(EDITOR_CONTENT_KEY) ?? '', ready: true, storageFailed: false });
  } catch { publish({ ...EMPTY, ready: true, storageFailed: true }); }
}
export function flushEditorContent(): boolean {
  if (timer) clearTimeout(timer);
  timer = null;
  if (!snapshot.ready) return true;
  let storageFailed = false;
  try { sessionStorage.setItem(EDITOR_CONTENT_KEY, snapshot.content); }
  catch { storageFailed = true; }
  if (snapshot.storageFailed !== storageFailed) publish({ ...snapshot, storageFailed });
  return !storageFailed;
}
export function updateEditorContent(content: string) {
  publish({ ...snapshot, content, ready: true });
  if (timer) clearTimeout(timer);
  timer = setTimeout(flushEditorContent, 300);
}
/** Guide CTA / navigation checkpoint: shared state and storage use the same key. */
export function saveEditorContent(content: string): boolean {
  publish({ ...snapshot, content, ready: true });
  return flushEditorContent();
}
export function loadEditorContent(): string | null {
  initializeEditorContent();
  return snapshot.content;
}
