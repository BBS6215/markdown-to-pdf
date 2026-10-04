// @vitest-environment jsdom
import { afterEach, it, expect, vi } from 'vitest';
import { Blob as NodeBlob } from 'node:buffer';
const mocks = vi.hoisted(() => ({ render: vi.fn() }));
vi.mock('@/lib/markdown/render', () => ({ renderMarkdownToSafeHtml: mocks.render }));
import { copyHtmlToClipboard } from '../lib/converter/html-export';
afterEach(() => { vi.unstubAllGlobals(); mocks.render.mockReset(); });
it('starts clipboard write before asynchronous rendering finishes, preserving user activation', async () => {
  let finish!: (html: string) => void;
  mocks.render.mockReturnValueOnce(new Promise<string>(resolve => { finish = resolve; }));
  class Item { constructor(public data: Record<string, Promise<Blob>>) {} }
  vi.stubGlobal('ClipboardItem', Item);
  vi.stubGlobal('Blob', NodeBlob);
  const write = vi.fn().mockResolvedValue(undefined);
  Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { write } });
  const pending = copyHtmlToClipboard('text');
  expect(write).toHaveBeenCalledOnce();
  const item = write.mock.calls[0][0][0] as Item;
  finish('<p>text</p>');
  expect(await pending).toBe('<p>text</p>');
  const blob = await item.data['text/plain'];
  expect(blob.type).toBe('text/plain');
  expect(await blob.text()).toBe('<p>text</p>');
});
it('falls back to writeText when promise-backed ClipboardItem is unavailable', async () => {
  vi.stubGlobal('ClipboardItem', undefined);
  mocks.render.mockResolvedValueOnce('<p>safe</p>');
  const writeText = vi.fn().mockResolvedValue(undefined);
  Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });
  expect(await copyHtmlToClipboard('text')).toBe('<p>safe</p>');
  expect(writeText).toHaveBeenCalledWith('<p>safe</p>');
});
