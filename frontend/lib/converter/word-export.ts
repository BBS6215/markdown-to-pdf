/**
 * Pure-frontend Markdown → Word (.docx) export.
 *
 * The renderer runs entirely in the browser via the `docx` package
 * (`Packer.toBlob`). It mirrors the styling that ABeiTools_V2 uses in its
 * own md2word tool — a flavor of Word output that has been tuned over many
 * iterations for Chinese-language documents and now works well for both
 * CJK and Latin content.
 *
 * Key choices borrowed from that reference:
 *   - A central `paragraphStyles` definition with 微软雅黑 (Microsoft YaHei)
 *     as the base font, so Chinese text renders cleanly in Word/WPS without
 *     falling back to Calibri.
 *   - Numbered lists go through a `numbering.config` reference so 1. 2. 3.
 *     actually renders as ordered numbers (the previous implementation
 *     erroneously rendered every list as a bullet list).
 *
 * The inline-style accumulator (collectInlineRuns -> toTextRun) preserves
 * bold / italics / strike / code across nested spans.
 */

import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
  LevelFormat,
} from 'docx';
import type { Root, Content, PhrasingContent, List as MdList } from 'mdast';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import { generateFilename } from './filename-generator';

const HEADING_LEVELS: Record<number, (typeof HeadingLevel)[keyof typeof HeadingLevel]> = {
  1: HeadingLevel.HEADING_1,
  2: HeadingLevel.HEADING_2,
  3: HeadingLevel.HEADING_3,
  4: HeadingLevel.HEADING_4,
  5: HeadingLevel.HEADING_5,
  6: HeadingLevel.HEADING_6,
};

/**
 * Central paragraph styles. The `id` values are referenced by docx's
 * built-in heading levels (`HeadingLevel.HEADING_1` resolves to style id
 * "Heading1", etc.), so defining them here overrides the default English
 * Calibri styling and locks in the Chinese-friendly base font.
 *
 * Sizes are in half-points (docx convention): 24 = 12pt, 28 = 14pt, etc.
 */
function createDocumentStyles() {
  return {
    paragraphStyles: [
      {
        id: 'Normal',
        name: 'Normal',
        run: { font: '微软雅黑', size: 24 },
        paragraph: { spacing: { line: 360 } },
      },
      {
        id: 'Heading1',
        name: 'Heading 1',
        basedOn: 'Normal',
        run: { font: '微软雅黑', size: 32, bold: true },
        paragraph: { spacing: { before: 240, after: 120 } },
      },
      {
        id: 'Heading2',
        name: 'Heading 2',
        basedOn: 'Normal',
        run: { font: '微软雅黑', size: 28, bold: true },
        paragraph: { spacing: { before: 180, after: 90 } },
      },
      {
        id: 'Heading3',
        name: 'Heading 3',
        basedOn: 'Normal',
        run: { font: '微软雅黑', size: 26, bold: true },
        paragraph: { spacing: { before: 120, after: 60 } },
      },
      {
        id: 'Heading4',
        name: 'Heading 4',
        basedOn: 'Normal',
        run: { font: '微软雅黑', size: 24, bold: true },
        paragraph: { spacing: { before: 120, after: 60 } },
      },
      {
        id: 'Heading5',
        name: 'Heading 5',
        basedOn: 'Normal',
        run: { font: '微软雅黑', size: 24, bold: true },
        paragraph: { spacing: { before: 90, after: 60 } },
      },
      {
        id: 'Heading6',
        name: 'Heading 6',
        basedOn: 'Normal',
        run: { font: '微软雅黑', size: 24, bold: true },
        paragraph: { spacing: { before: 90, after: 60 } },
      },
    ],
  };
}

interface InlineRun {
  text: string;
  bold?: boolean;
  italics?: boolean;
  strike?: boolean;
  code?: boolean;
  linkUrl?: boolean;
}

function collectInlineRuns(
  node: PhrasingContent,
  style: Omit<InlineRun, 'text'> = {}
): InlineRun[] {
  switch (node.type) {
    case 'text':
      return [{ text: node.value, ...style }];
    case 'strong':
      return (node.children as PhrasingContent[]).flatMap((c) =>
        collectInlineRuns(c, { ...style, bold: true })
      );
    case 'emphasis':
      return (node.children as PhrasingContent[]).flatMap((c) =>
        collectInlineRuns(c, { ...style, italics: true })
      );
    case 'delete':
      return (node.children as PhrasingContent[]).flatMap((c) =>
        collectInlineRuns(c, { ...style, strike: true })
      );
    case 'inlineCode':
      return [{ text: node.value, ...style, code: true }];
    case 'link':
      return [
        ...(node.children as PhrasingContent[]).flatMap((c) =>
          collectInlineRuns(c, style)
        ),
        { text: ` (${node.url})`, linkUrl: true },
      ];
    case 'break':
      return [{ text: '\n', ...style }];
    case 'image':
      return [{ text: node.alt || '[image]', ...style }];
    default:
      if ('value' in node && typeof (node as { value: unknown }).value === 'string') {
        return [{ text: (node as { value: string }).value, ...style }];
      }
      if ('children' in node && Array.isArray((node as { children: unknown }).children)) {
        return ((node as { children: PhrasingContent[] }).children).flatMap((c) =>
          collectInlineRuns(c, style)
        );
      }
      return [];
  }
}

function toTextRun(run: InlineRun): TextRun {
  return new TextRun({
    text: run.text,
    ...(run.bold && { bold: true }),
    ...(run.italics && { italics: true }),
    ...(run.strike && { strike: true }),
    ...(run.code && { font: { name: 'Courier New' }, size: 20 }),
    ...(run.linkUrl && { color: '2563EB', size: 18 }),
  });
}

function extractText(node: PhrasingContent): TextRun[] {
  return collectInlineRuns(node).map(toTextRun);
}

function convertNode(node: Content): (Paragraph | Table)[] {
  switch (node.type) {
    case 'heading':
      return [
        new Paragraph({
          heading: HEADING_LEVELS[node.depth] || HeadingLevel.HEADING_1,
          children: (node.children as PhrasingContent[]).flatMap(extractText),
        }),
      ];

    case 'paragraph':
      return [
        new Paragraph({
          children: (node.children as PhrasingContent[]).flatMap(extractText),
          spacing: { after: 200 },
        }),
      ];

    case 'list':
      return convertList(node as MdList);

    case 'code':
      return [
        new Paragraph({
          children: [
            new TextRun({
              text: node.value,
              font: { name: 'Courier New' },
              size: 18,
            }),
          ],
          spacing: { before: 200, after: 200 },
          shading: { type: 'clear', color: 'auto', fill: 'F6F8FA' },
        }),
      ];

    case 'blockquote': {
      const children: Paragraph[] = [];
      for (const child of node.children) {
        if (child.type === 'paragraph') {
          children.push(
            new Paragraph({
              children: (child.children as PhrasingContent[]).flatMap(extractText),
              indent: { left: 720 },
              spacing: { after: 120 },
              border: {
                left: { style: BorderStyle.SINGLE, size: 6, color: 'CCCCCC', space: 10 },
              },
            })
          );
        }
      }
      return children;
    }

    case 'table': {
      if (!node.children || node.children.length === 0) return [];
      const rows = node.children.map((row: Content, rowIndex: number) => {
        const rowChildren = (row as unknown as { children: { children: PhrasingContent[] }[] }).children;
        const cells = rowChildren.map(
          (cell) =>
            new TableCell({
              children: [
                new Paragraph({
                  children: cell.children.flatMap(extractText),
                  alignment: AlignmentType.LEFT,
                }),
              ],
              width: { size: 100 / rowChildren.length, type: WidthType.PERCENTAGE },
              shading: rowIndex === 0 ? { fill: 'F0F0F0' } : undefined,
            })
        );
        return new TableRow({ children: cells });
      });
      return [
        new Table({
          rows,
          width: { size: 100, type: WidthType.PERCENTAGE },
        }),
      ];
    }

    case 'thematicBreak':
      return [
        new Paragraph({
          children: [new TextRun({ text: '─'.repeat(50), color: 'CCCCCC' })],
          spacing: { before: 200, after: 200 },
        }),
      ];

    default:
      if ('value' in node && typeof (node as { value: unknown }).value === 'string') {
        return [new Paragraph({ children: [new TextRun({ text: (node as { value: string }).value })] })];
      }
      return [];
  }
}

/**
 * Convert a Markdown list (ordered or unordered) into docx paragraphs.
 *
 * Ordered lists must use the `numbering.config` reference declared on the
 * Document below, otherwise Word renders them as bullet points (the bug the
 * previous implementation shipped). Unordered lists use docx's built-in
 * bullet style.
 */
function convertList(node: MdList): Paragraph[] {
  const isOrdered = node.ordered === true;
  const items: Paragraph[] = [];
  for (const item of node.children) {
    if (item.type !== 'listItem') continue;
    for (const child of item.children) {
      if (child.type !== 'paragraph') continue;
      items.push(
        new Paragraph({
          children: (child.children as PhrasingContent[]).flatMap(extractText),
          ...(isOrdered
            ? { numbering: { reference: 'ordered-list', level: 0 } }
            : { bullet: { level: 0 } }),
          spacing: { after: 80 },
        })
      );
    }
  }
  return items;
}

function parseMarkdown(markdown: string): Root {
  return unified().use(remarkParse).use(remarkGfm).parse(markdown) as Root;
}

/**
 * Convert Markdown to a .docx Blob plus a suggested filename.
 * Runs entirely in the browser.
 */
export async function exportWord(markdown: string): Promise<{ blob: Blob; filename: string }> {
  const ast = parseMarkdown(markdown);

  const docElements: (Paragraph | Table)[] = [];
  for (const node of ast.children) {
    docElements.push(...convertNode(node));
  }
  if (docElements.length === 0) {
    docElements.push(new Paragraph({ children: [new TextRun({ text: '' })] }));
  }

  const doc = new Document({
    styles: createDocumentStyles(),
    numbering: {
      config: [
        {
          reference: 'ordered-list',
          levels: [
            {
              level: 0,
              format: LevelFormat.DECIMAL,
              text: '%1.',
              alignment: AlignmentType.LEFT,
            },
          ],
        },
      ],
    },
    sections: [
      {
        children: docElements,
        properties: {
          page: {
            margin: { top: 1440, right: 1080, bottom: 1440, left: 1080 },
          },
        },
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const filename = generateFilename(markdown, 'word');
  return { blob, filename };
}
