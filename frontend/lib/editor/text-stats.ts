export interface SourceStats { characters: number; sizeBytes: number }
export interface BodyStats { characters: number; words: number | null }

function byteLength(code: number): number {
  return code <= 0x7f ? 1 : code <= 0x7ff ? 2 : code <= 0xffff ? 3 : 4;
}

/** One pass without allocating a full Array.from or Blob on every update. */
export function getSourceStats(text: string): SourceStats {
  let characters = 0, sizeBytes = 0;
  for (const point of text) {
    characters++;
    sizeBytes += byteLength(point.codePointAt(0)!);
  }
  return { characters, sizeBytes };
}

export function truncateUtf8(text: string, limit: number): { text: string; truncated: boolean } {
  let bytes = 0, end = 0;
  for (const point of text) {
    bytes += byteLength(point.codePointAt(0)!);
    if (bytes > limit) return { text: text.slice(0, end), truncated: true };
    end += point.length;
  }
  return { text, truncated: false };
}

let segmenter: Intl.Segmenter | undefined;
export function getBodyStats(text: string): BodyStats {
  let characters = 0;
  for (const point of text) if (!/\s/u.test(point)) characters++;
  if (typeof Intl.Segmenter !== 'function') return { characters, words: null };
  segmenter ??= new Intl.Segmenter('en', { granularity: 'word' });
  let words = 0;
  for (const segment of segmenter.segment(text)) if (segment.isWordLike) words++;
  return { characters, words };
}
