import { describe, it, expect, vi } from 'vitest';
import { getSourceStats, getBodyStats, truncateUtf8 } from '../lib/editor/text-stats';

describe('Unicode statistics and UTF-8 preview boundaries', () => {
  it('distinguishes Markdown source from body, without double counting surrogate pairs', () => {
    expect(getSourceStats('# Hello **世界**')).toEqual({ characters: 14, sizeBytes: 18 });
    expect(getBodyStats('Hello 世界')).toEqual({ characters: 7, words: 2 });
    expect(getSourceStats('😀\n')).toEqual({ characters: 2, sizeBytes: 5 });
  });
  it('never splits a code point and uses bytes rather than UTF-16 units', () => {
    expect(truncateUtf8('a中😀z', 7)).toEqual({ text: 'a中', truncated: true });
    expect(truncateUtf8('a中😀z', 8)).toEqual({ text: 'a中😀', truncated: true });
    expect(truncateUtf8('a中😀z', 9)).toEqual({ text: 'a中😀z', truncated: false });
    const cap = 200 * 1024;
    const preview = truncateUtf8('中'.repeat(cap), cap);
    expect(new TextEncoder().encode(preview.text).length).toBeLessThanOrEqual(cap);
    expect(preview.text.length).toBe(Math.floor(cap / 3));
  });
  it('keeps characters available without Intl.Segmenter', () => {
    vi.stubGlobal('Intl', Object.assign(Object.create(Intl), { Segmenter: undefined }));
    try { expect(getBodyStats('世界 😀')).toEqual({ characters: 3, words: null }); }
    finally { vi.unstubAllGlobals(); }
  });
});
