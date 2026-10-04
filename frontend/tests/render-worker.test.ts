// @vitest-environment jsdom
import { beforeEach, afterEach, it, expect, vi } from 'vitest';
const core = vi.hoisted(() => ({ render: vi.fn() }));
vi.mock('../lib/markdown/render-core', () => ({ renderMarkdownCore: core.render, getMarkdownProcessor: vi.fn() }));
class TestWorker {
  static instance: TestWorker;
  onmessage!: (event: { data: unknown }) => void;
  onerror!: () => void;
  onmessageerror!: () => void;
  messages: { id: number; markdown: string }[] = [];
  terminate = vi.fn();
  constructor() { TestWorker.instance = this; }
  postMessage(message: { id: number; markdown: string }) { this.messages.push(message); }
}
beforeEach(() => { vi.resetModules(); core.render.mockReset().mockResolvedValue({ html: 'fallback' }); vi.stubGlobal('Worker', TestWorker); });
afterEach(() => { vi.unstubAllGlobals(); });
it('pairs worker responses with request IDs even when results arrive out of order', async () => {
  const { renderMarkdown } = await import('../lib/markdown/render');
  const first = renderMarkdown('first'), second = renderMarkdown('second');
  const worker = TestWorker.instance;
  worker.onmessage({ data: { id: worker.messages[1].id, result: { html: 'second' } } });
  worker.onmessage({ data: { id: worker.messages[0].id, result: { html: 'first' } } });
  expect((await first).html).toBe('first');
  expect((await second).html).toBe('second');
  expect(core.render).not.toHaveBeenCalled();
});
it('falls back for all pending requests when a Worker cannot load', async () => {
  const { renderMarkdown } = await import('../lib/markdown/render');
  const first = renderMarkdown('first'), second = renderMarkdown('second');
  TestWorker.instance.onerror();
  expect((await first).html).toBe('fallback');
  expect((await second).html).toBe('fallback');
  expect(TestWorker.instance.terminate).toHaveBeenCalledOnce();
  await renderMarkdown('third');
  expect(core.render).toHaveBeenCalledTimes(3);
});
it('propagates render failures without discarding other requests or permanently disabling the Worker', async () => {
  const { renderMarkdown } = await import('../lib/markdown/render');
  const first = renderMarkdown('bad');
  const failed = expect(first).rejects.toThrow('bad markdown');
  TestWorker.instance.onmessage({ data: { id: TestWorker.instance.messages[0].id, error: 'bad markdown' } });
  await failed;
  const next = renderMarkdown('good');
  TestWorker.instance.onmessage({ data: { id: TestWorker.instance.messages[1].id, result: { html: 'good' } } });
  expect((await next).html).toBe('good');
  expect(core.render).not.toHaveBeenCalled();
});
