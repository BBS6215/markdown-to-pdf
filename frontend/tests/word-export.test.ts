import { describe, it, expect } from 'vitest';
import { Packer } from 'docx';
import { unzipSync, strFromU8 } from 'fflate';
import { createWordDocument } from '../lib/converter/word-export';

async function documentXml(markdown: string) {
  const zip = unzipSync(new Uint8Array(await Packer.toBuffer(createWordDocument(markdown))));
  return strFromU8(zip['word/document.xml']);
}
function paragraphs(xml: string) {
  return [...xml.matchAll(/<w:p(?:\s[^>]*)?>[\s\S]*?<\/w:p>/g)].map(match => ({
    xml: match[0],
    text: [...match[0].matchAll(/<w:t(?:\s[^>]*)?>([\s\S]*?)<\/w:t>/g)].map(m => m[1]).join(''),
  }));
}
describe('Word block traversal', () => {
  it('retains nested lists, continuation paragraphs, task states and list code in source order', async () => {
    const xml = await documentXml('- Parent\n\n  Continuation\n\n  - Child\n    - Grandchild\n\n  ```\n  line one\n  line two\n  ```\n\n- [ ] Open\n- [x] Done');
    const items = paragraphs(xml);
    const texts = items.map(item => item.text).join('|');
    expect(texts).toMatch(/Parent.*Continuation.*Child.*Grandchild.*line one.*line two.*☐ Open.*☑ Done/);
    expect(items.find(p => p.text === 'Continuation')!.xml).not.toContain('<w:numPr>');
    expect(items.find(p => p.text === 'Child')!.xml).toContain('<w:ilvl w:val="1"');
    expect(items.find(p => p.text === 'Grandchild')!.xml).toContain('<w:ilvl w:val="2"');
    expect(items.find(p => p.text === 'line oneline two')!.xml).toContain('<w:br/>');
  });
  it('honors ordered starts and resets independent nested lists', async () => {
    const texts = paragraphs(await documentXml('3. First\n\n   7. Nested\n   8. Nested next\n4. Second\n\nSeparator\n\n1. Restart')).map(p => p.text);
    expect(texts).toEqual(['3. First', '7. Nested', '8. Nested next', '4. Second', 'Separator', '1. Restart']);
  });
  it('retains code, lists and tables inside blockquotes with additive indentation', async () => {
    const xml = await documentXml('> Intro\n>\n> - Item\n>   - Nested\n>\n> ```\n> CodeA\n> CodeB\n> ```\n>\n> | Head |\n> | --- |\n> | Cell |');
    const items = paragraphs(xml);
    for (const text of ['Intro', 'Item', 'Nested', 'CodeACodeB', 'Head', 'Cell']) expect(items.some(p => p.text === text)).toBe(true);
    expect(items.find(p => p.text === 'Nested')!.xml).toContain('w:left="1440"');
    expect(xml).toMatch(/<w:tblInd\b[^>]*\bw:w="720"/);
    expect(xml).toMatch(/<w:tblW\b[^>]*\bw:w="9026"/);
    expect(xml.slice(xml.indexOf('<w:tbl>'))).toMatch(/<w:shd\b[^>]*\bw:val="clear"/);
  });
  it('preserves inline formatting, hard breaks, image alt and the raw HTML boundary', async () => {
    const xml = await documentXml('中文 **bold** and *italic*<br>Next ![Alt](https://example.com/a.png)\n\n<div>Ignored raw block</div>');
    expect(xml).toContain('中文 ');
    expect(xml).toContain('<w:b/>');
    expect(xml).toContain('<w:i/>');
    expect(xml).toContain('<w:br/>');
    expect(xml).toContain('Alt');
    expect(xml).not.toContain('Ignored raw block');
  });
});
