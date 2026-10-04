import { renderMarkdownCore, type RenderOptions, type MarkdownRenderResult } from './render-core';

export interface RenderRequest { id: number; markdown: string; options: RenderOptions }
export interface RenderResponse { id: number; result?: MarkdownRenderResult; error?: string }
const scope = self as unknown as {
  onmessage: (event: MessageEvent<RenderRequest>) => void;
  postMessage: (message: RenderResponse) => void;
};
scope.onmessage = event => {
  const { id, markdown, options } = event.data;
  void renderMarkdownCore(markdown, options).then(
    result => scope.postMessage({ id, result }),
    error => scope.postMessage({ id, error: error instanceof Error ? error.message : 'Markdown rendering failed' }),
  );
};
