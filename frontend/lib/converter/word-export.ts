/**
 * Pure-frontend Markdown → Word (.docx) export.
 *
 * Ported from backend/src/services/word-generator.ts so the conversion runs
 * entirely in the browser — no API call, no Fly.io bill. The docx package is
 * pure JS and ships a browser-friendly Packer.toBlob() output.
 *
 * The inline-style accumulator (collectInlineRuns -> toTextRun) preserves
 * bold / italics / strike / code across nested spans. See the matching
 * backend file for the design notes on why we don't reach into TextRun.options.
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
} from 'docx';
import type { Root, Content, PhrasingContent } from 'mdast';
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
          spacing: { before: 240, after: 120 },
        }),
      ];

    case 'paragraph':
      return [
        new Paragraph({
          children: (node.children as PhrasingContent[]).flatMap(extractText),
          spacing: { after: 200 },
        }),
      ];

    case 'list': {
      const items: Paragraph[] = [];
      for (const item of node.children) {
        if (item.type === 'listItem') {
          for (const child of item.children) {
            if (child.type === 'paragraph') {
              items.push(
                new Paragraph({
                  children: (child.children as PhrasingContent[]).flatMap(extractText),
                  bullet: { level: 0 },
                  spacing: { after: 80 },
                })
              );
            }
          }
        }
      }
      return items;
    }

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
