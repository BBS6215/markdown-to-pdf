import { it, expect, vi } from 'vitest';
const state = vi.hoisted(() => ({ fail: true }));
vi.mock('unified', async importOriginal => {
  const actual = await importOriginal<typeof import('unified')>();
  return { ...actual, unified: () => {
    if (state.fail) { state.fail = false; throw Error('temporary initialization failure'); }
    return actual.unified();
  } };
});
import { renderMarkdownCore } from '../lib/markdown/render-core';
it('retries processor initialization after a failure instead of caching a rejected promise', async () => {
  await expect(renderMarkdownCore('# Title')).rejects.toThrow('temporary');
  expect((await renderMarkdownCore('# Title')).html).toContain('<h1>Title</h1>');
});
