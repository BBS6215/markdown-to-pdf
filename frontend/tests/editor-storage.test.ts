// @vitest-environment jsdom
import { beforeEach, afterEach, it, expect, vi } from 'vitest';
beforeEach(() => { vi.resetModules(); vi.useFakeTimers(); sessionStorage.clear(); });
afterEach(() => { vi.clearAllTimers(); vi.useRealTimers(); });
it('debounces writes but checkpoints immediately before navigation', async () => {
  const store = await import('../lib/editor/session-storage');
  store.initializeEditorContent();
  const write = vi.spyOn(Storage.prototype, 'setItem');
  store.updateEditorContent('a');
  store.updateEditorContent('ab');
  expect(write).not.toHaveBeenCalled();
  vi.advanceTimersByTime(300);
  expect(write).toHaveBeenCalledTimes(1);
  store.updateEditorContent('abc');
  expect(store.flushEditorContent()).toBe(true);
  expect(sessionStorage.getItem('md-editor-content')).toBe('abc');
  vi.advanceTimersByTime(300);
  expect(write).toHaveBeenCalledTimes(2);
});
it('keeps in-memory edits and guide checkpoints when storage is unavailable', async () => {
  const store = await import('../lib/editor/session-storage');
  store.initializeEditorContent();
  vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw Error('quota'); });
  expect(store.saveEditorContent('draft')).toBe(false);
  expect(store.loadEditorContent()).toBe('draft');
  expect(store.getEditorSnapshot().storageFailed).toBe(true);
  store.updateEditorContent('');
  expect(store.getEditorSnapshot().content).toBe('');
});
