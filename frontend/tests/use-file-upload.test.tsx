// @vitest-environment jsdom
import { afterEach, it, expect, vi } from 'vitest';
import { renderHook, act, cleanup } from '@testing-library/react';
const mocks = vi.hoisted(() => ({ read: vi.fn() }));
vi.mock('@/lib/editor/encoding-detector', async importOriginal => ({
  ...await importOriginal<typeof import('../lib/editor/encoding-detector')>(), readMarkdownFile: mocks.read,
}));
import { useFileUpload } from '../hooks/use-file-upload';
afterEach(() => { cleanup(); mocks.read.mockReset(); });
it('only the most recently selected file can replace the editor', async () => {
  let first!: (value: string) => void, second!: (value: string) => void;
  mocks.read.mockImplementationOnce(() => new Promise<string>(resolve => { first = resolve; }))
    .mockImplementationOnce(() => new Promise<string>(resolve => { second = resolve; }));
  const onContent = vi.fn();
  const { result } = renderHook(() => useFileUpload(onContent, 'en'));
  let p1!: Promise<void>, p2!: Promise<void>;
  await act(async () => { p1 = result.current.upload(new File([], 'first.md')); });
  await act(async () => { p2 = result.current.upload(new File([], 'second.md')); });
  await act(async () => { second('new'); await p2; first('old'); await p1; });
  expect(onContent.mock.calls).toEqual([['new']]);
  expect(result.current.reading).toBe(false);
});
it('cancel and unmount invalidate pending file reads', async () => {
  let finish!: (value: string) => void;
  mocks.read.mockImplementation(() => new Promise<string>(resolve => { finish = resolve; }));
  const onContent = vi.fn();
  const { result, unmount } = renderHook(() => useFileUpload(onContent, 'en'));
  let pending!: Promise<void>;
  await act(async () => { pending = result.current.upload(new File([], 'first.md')); });
  act(() => { result.current.cancel(); });
  await act(async () => { finish('old'); await pending; });
  expect(onContent).not.toHaveBeenCalled();
  await act(async () => { pending = result.current.upload(new File([], 'second.md')); });
  unmount(); finish('new'); await pending;
  expect(onContent).not.toHaveBeenCalled();
});
