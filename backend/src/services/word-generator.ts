/**
 * Word (.docx) generation service.
 * Source: 05-技术方案 §5.2 (数据流场景 2)
 *
 * Flow: Markdown → remark AST → traverse nodes → docx Document → Buffer
 *
 * The docx package has limited support for complex formats.
 * Unsupported elements degrade gracefully to plain text (no crash/garbled).
 * Source: 05 §11 风险 5, 07 §7 R3
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
import { parseMarkdownToAst } from './markdown-renderer.js';

// Heading level mapping
const HEADING_LEVELS: Record<number, (typeof HeadingLevel)[keyof typeof HeadingLevel]> = {
  1: HeadingLevel.HEADING_1,
  2: HeadingLevel.HEADING_2,
  3: HeadingLevel.HEADING_3,
  4: HeadingLevel.HEADING_4,
  5: HeadingLevel.HEADING_5,
  6: HeadingLevel.HEADING_6,
};

/**
 * Inline style accumulator. We collect runs as plain objects first so styles
 * can compose across nested nodes (e.g. **_mixed_** keeps both bold + italics),
 * then convert to docx TextRun at the end. The previous implementation tried
 * to re-read text out of an already-constructed TextRun via `(r as any).options.text`,
 * which is undefined in current docx versions and erased the content of any
 * bold/italics/strike span.
 */
interface InlineRun {
  text: string;
  bold?: boolean;
  italics?: boolean;
  strike?: boolean;
  code?: boolean;
  linkUrl?: boolean; // marks the trailing "(url)" segment of a link
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
      // docx package does not support inline images; surface the alt text.
      return [{ text: node.alt || '[image]', ...style }];
    default:
      if ('value' in node && typeof (node as any).value === 'string') {
        return [{ text: (node as any).value, ...style }];
      }
      if ('children' in node && Array.isArray((node as any).children)) {
        return ((node as any).children as PhrasingContent[]).flatMap((c) =>
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
    ...(run.code && { font: { name: 'Courier New' }, size: 20 }), // 10pt mono
    ...(run.linkUrl && { color: '2563EB', size: 18 }),
  });
}

/**
 * Extract inline content from phrasing nodes recursively, preserving
 * bold/italics/strike/code styling.
 */
function extractText(node: PhrasingContent): TextRun[] {
  return collectInlineRuns(node).map(toTextRun);
}

/**
 * Convert a single block-level AST node to docx elements.
 */
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
              size: 18, // 9pt
            }),
          ],
          spacing: { before: 200, after: 200 },
          shading: { type: 'clear' as any, color: 'auto', fill: 'F6F8FA' },
        }),
      ];

    case 'blockquote': {
      const children: Paragraph[] = [];
      for (const child of node.children) {
        if (child.type === 'paragraph') {
          children.push(
            new Paragraph({
              children: (child.children as PhrasingContent[]).flatMap(extractText),
              indent: { left: 720 }, // 0.5 inch
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
        const cells = (row as any).children.map(
          (cell: any) =>
            new TableCell({
              children: [
                new Paragraph({
                  children: (cell.children as PhrasingContent[]).flatMap(extractText),
                  alignment: AlignmentType.LEFT,
                }),
              ],
              width: { size: 100 / (row as any).children.length, type: WidthType.PERCENTAGE },
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
      // Graceful degradation: render as plain text if possible
      if ('value' in node && typeof node.value === 'string') {
        return [new Paragraph({ children: [new TextRun({ text: node.value })] })];
      }
      return [];
  }
}

/**
 * Generate Word (.docx) buffer from Markdown string.
 */
export async function generateWord(markdown: string): Promise<Buffer> {
  const ast = parseMarkdownToAst(markdown) as Root;

  const docElements: (Paragraph | Table)[] = [];
  for (const node of ast.children) {
    docElements.push(...convertNode(node));
  }

  // Ensure at least one paragraph (empty doc crashes docx)
  if (docElements.length === 0) {
    docElements.push(new Paragraph({ children: [new TextRun({ text: '' })] }));
  }

  const doc = new Document({
    sections: [
      {
        children: docElements,
        properties: {
          page: {
            margin: {
              top: 1440, // 1 inch = 1440 twips
              right: 1080,
              bottom: 1440,
              left: 1080,
            },
          },
        },
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  return Buffer.from(buffer);
}
