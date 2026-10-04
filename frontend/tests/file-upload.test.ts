import { describe, it, expect } from 'vitest';
import { decodeFileBuffer, readMarkdownFile } from '../lib/editor/encoding-detector';

const buffer = (bytes: number[]) => Uint8Array.from(bytes).buffer;
describe('browser-native file decoding', () => {
  it('accepts valid UTF-8, including an intentional replacement character', async () => {
    expect(await decodeFileBuffer(new TextEncoder().encode('中文 😀 �').buffer)).toBe('中文 😀 �');
    expect(await decodeFileBuffer(buffer([0xef, 0xbb, 0xbf, 65]))).toBe('A');
  });
  it('decodes UTF-16 in both byte orders and rejects damaged BOM-marked files', async () => {
    expect(await decodeFileBuffer(buffer([0xff, 0xfe, 0x2d, 0x4e, 0x87, 0x65]))).toBe('中文');
    expect(await decodeFileBuffer(buffer([0xfe, 0xff, 0x4e, 0x2d, 0x65, 0x87]))).toBe('中文');
    await expect(decodeFileBuffer(buffer([0xff, 0xfe, 0x2d]))).rejects.toMatchObject({ code: 'encoding' });
  });
  it('decodes GBK using native TextDecoder, without Buffer', async () => {
    const phrase = [0xd6,0xd0,0xbb,0xaa,0xc8,0xcb,0xc3,0xf1,0xb9,0xb2,0xba,0xcd,0xb9,0xfa];
    expect(await decodeFileBuffer(buffer(Array.from({ length: 8 }, () => phrase).flat()))).toBe('中华人民共和国'.repeat(8));
  });
  it('uses case-insensitive validation and reports I/O errors', async () => {
    expect(await readMarkdownFile({ name: 'REPORT.MD', arrayBuffer: async () => buffer([65]) })).toBe('A');
    await expect(readMarkdownFile({ name: 'image.png', arrayBuffer: async () => buffer([]) })).rejects.toMatchObject({ code: 'unsupported' });
    await expect(readMarkdownFile({ name: 'report.md', arrayBuffer: async () => { throw Error('I/O'); } })).rejects.toMatchObject({ code: 'read' });
  });
});
