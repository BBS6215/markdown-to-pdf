/**
 * Rendering and text segmentation run off the browser's main thread.
 * Unsupported/blocked Workers fall back to the same sanitized core.
 */
export { getMarkdownProcessor } from './render-core';
import { renderMarkdownCore, type MarkdownRenderResult, type RenderOptions } from './render-core';
import type { RenderResponse } from './render.worker';
export type { MarkdownRenderResult, RenderOptions } from './render-core';

class WorkerUnavailableError extends Error {}
let worker: Worker | null = null;
let unavailable = false;
let sequence = 0;
const pending = new Map<number, {
  resolve: (result: MarkdownRenderResult) => void;
  reject: (error: Error) => void;
}>();
function failWorker() {
  unavailable = true;
  worker?.terminate();
  worker = null;
  for (const request of pending.values()) request.reject(new WorkerUnavailableError('Worker unavailable'));
  pending.clear();
}
function getWorker(): Worker | null {
  if (unavailable || typeof window === 'undefined' || typeof Worker === 'undefined') return null;
  if (!worker) {
    try {
      worker = new Worker(new URL('./render.worker.ts', import.meta.url), { type: 'module' });
      worker.onmessage = (event: MessageEvent<RenderResponse>) => {
        const request = pending.get(event.data.id);
        if (!request) return;
        pending.delete(event.data.id);
        if (event.data.result) request.resolve(event.data.result);
        else request.reject(new Error(event.data.error ?? 'Markdown rendering failed'));
      };
      worker.onerror = failWorker;
      worker.onmessageerror = failWorker;
    } catch {
      unavailable = true;
      worker = null;
    }
  }
  return worker;
}
export async function renderMarkdown(markdown: string, options: RenderOptions = {}): Promise<MarkdownRenderResult> {
  const currentWorker = getWorker();
  if (!currentWorker) return renderMarkdownCore(markdown, options);
  try {
    return await new Promise<MarkdownRenderResult>((resolve, reject) => {
      const id = ++sequence;
      pending.set(id, { resolve, reject });
      try { currentWorker.postMessage({ id, markdown, options }); }
      catch { failWorker(); }
    });
  } catch (error) {
    if (error instanceof WorkerUnavailableError) return renderMarkdownCore(markdown, options);
    throw error;
  }
}
export async function renderMarkdownToSafeHtml(markdown: string): Promise<string> {
  return (await renderMarkdown(markdown)).html;
}
