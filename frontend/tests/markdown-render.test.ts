import { describe, it, expect } from 'vitest';
import { renderMarkdownCore } from '../lib/markdown/render-core';
import { truncateUtf8 } from '../lib/editor/text-stats';

describe('safe rendering and text extraction', () => {
  it('strips executable markup and URL attributes before collecting text', async () => {
    const result = await renderMarkdownCore('# Hello **世界**\n\n<script>alert(1)</script>\n\n<img src=x onerror=alert(1)>\n\n[Label](javascript:alert(1))', { collectText: true });
    expect(result.html).not.toMatch(/<script|onerror=|href="javascript:/);
    expect(result.plainText).toContain('Hello 世界');
    expect(result.plainText).toContain('Label');
    expect(result.plainText).not.toContain('javascript');
    expect(result.plainText).not.toContain('alert');
  });
  it('keeps boundaries between table cells and blocks, without including hrefs', async () => {
    const result = await renderMarkdownCore('| Name | Value |\n| --- | --- |\n| One | Two |\n\n[Visible](https://example.com/secret)\n\n<details><summary>Tip</summary>Body</details>', { collectText: true });
    expect(result.plainText).toMatch(/Name\s+Value/);
    expect(result.plainText).toMatch(/One\s+Two/);
    expect(result.plainText).toContain('Visible');
    expect(result.plainText).not.toContain('/secret');
    expect(result.html).toContain('<details>');
  });
  it('highlights specified languages only; unknown languages preserve code', async () => {
    const result = await renderMarkdownCore('```js\nconst a = 1;\n```\n\n```unknown-language\nkeep me\n```\n\n```\nconst plain = 2;\n```');
    expect(result.html).toContain('hljs-keyword');
    expect(result.html).toContain('keep me');
    expect(result.html).toContain('<pre><code>const plain = 2;');
  });
  it('decodes named entities without needing a DOM', async () => {
    const result = await renderMarkdownCore('A &copy; &amp; B', { collectText: true });
    expect(result.plainText).toBe('A © & B');
  });
  it('full rendering retains content beyond the preview threshold', async () => {
    const md = 'Plain text. '.repeat(45000) + '\n\nEND_OF_DOCUMENT';
    expect(truncateUtf8(md, 200 * 1024).text).not.toContain('END_OF_DOCUMENT');
    expect((await renderMarkdownCore(md)).html).toContain('END_OF_DOCUMENT');
  });
});
