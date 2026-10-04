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
 *   - Numbered lists are rendered with explicit "1. " prefixes, matching
 *     ABeiTools. This is less semantic than Word numbering, but it reliably
 *     restarts each independent Markdown list in Word/WPS and avoids shared
 *     numbering state across separate lists.
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
  type IParagraphOptions,
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
  /**
   * A docx <w:br/> (line break inside the current paragraph). The host
   * Word application renders this as a soft line break; sibling text on
   * either side remains in the same paragraph. `text` is ignored when
   * lineBreak is true.
   */
  lineBreak?: boolean;
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
      return [{ text: '', lineBreak: true }];
    case 'image':
      return [{ text: node.alt || '[image]', ...style }];
    case 'html': {
      // remark parses raw inline HTML (typically <br> inside a paragraph
      // or a table cell) as an `html` node whose .value is the literal
      // tag. Translate <br>/<br/>/<br /> to a docx line break; drop any
      // other inline HTML rather than leaking it as a literal string
      // into the generated Word document.
      const value = (node as unknown as { value?: unknown }).value;
      if (typeof value === 'string' && /^<br\s*\/?>$/i.test(value)) {
        return [{ text: '', lineBreak: true }];
      }
      return [];
    }
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
  if (run.lineBreak) {
    // `break: 1` emits a single <w:br/> with no text; this is the docx
    // equivalent of HTML <br>. Use this instead of putting "\n" in the
    // text field, which Word renders as a space, not a line break.
    return new TextRun({ break: 1 });
  }
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

interface BlockContext {
  listDepth: number;
  quoteDepth: number;
  prefix?: string;
  bulletLevel?: number;
}
const ROOT_CONTEXT: BlockContext = { listDepth: 0, quoteDepth: 0 };
function withoutMarker(context: BlockContext): BlockContext {
  return { listDepth: context.listDepth, quoteDepth: context.quoteDepth };
}
function paragraph(children: TextRun[], context: BlockContext, options: IParagraphOptions = {}): Paragraph {
  const left = context.listDepth * 360 + context.quoteDepth * 720;
  const marked = context.prefix !== undefined || context.bulletLevel !== undefined;
  return new Paragraph({
    children: context.prefix ? [new TextRun({ text: context.prefix }), ...children] : children,
    spacing: { after: 200 },
    ...options,
    ...(left > 0 && { indent: { left, ...(marked && { hanging: 240 }) } }),
    ...(context.bulletLevel !== undefined && { bullet: { level: context.bulletLevel } }),
    ...(context.quoteDepth > 0 && { border: { left: { style: BorderStyle.SINGLE, size: 6, color: 'CCCCCC', space: 10 } } }),
  });
}
function convertNode(node: Content, context: BlockContext = ROOT_CONTEXT): (Paragraph | Table)[] {
  switch (node.type) {
    case 'heading':
      return [paragraph(node.children.flatMap(extractText), context, {
        heading: HEADING_LEVELS[node.depth] || HeadingLevel.HEADING_1,
      })];
    case 'paragraph':
      return [paragraph(node.children.flatMap(extractText), context)];
    case 'list':
      return convertList(node, context);
    case 'code': {
      const runs: TextRun[] = [];
      node.value.split(/\r?\n/).forEach((line, index) => {
        if (index) runs.push(new TextRun({ break: 1 }));
        runs.push(new TextRun({ text: line, font: { name: 'Courier New' }, size: 18 }));
      });
      return [paragraph(runs, context, {
        spacing: { before: 200, after: 200 },
        shading: { type: 'clear', color: 'auto', fill: 'F6F8FA' },
      })];
    }
    case 'blockquote': {
      const result: (Paragraph | Table)[] = [];
      let first = true;
      for (const child of node.children) {
        const childContext = { ...(first ? context : withoutMarker(context)), quoteDepth: context.quoteDepth + 1 };
        const converted = convertNode(child, childContext);
        if (converted.length) first = false;
        result.push(...converted);
      }
      return result;
    }
    case 'table': {
      if (!node.children.length) return [];
      // A quoted/nested table must fit the remaining A4 text area; 100%
      // plus indentation would overflow the right page margin.
      const left = Math.min(context.listDepth * 360 + context.quoteDepth * 720, 9746 - 1440);
      const width = 9746 - left;
      const columnCount = node.children[0].children.length;
      const columnWidths = Array.from({ length: columnCount }, (_, column) =>
        Math.floor(width / columnCount) + (column < width % columnCount ? 1 : 0));
      const rows = node.children.map((row, rowIndex) => new TableRow({
        children: columnWidths.map((cellWidth, column) => new TableCell({
          children: [new Paragraph({
            children: row.children[column]?.children.flatMap(extractText) ?? [],
            alignment: node.align?.[column] === 'right' ? AlignmentType.RIGHT :
              node.align?.[column] === 'center' ? AlignmentType.CENTER : AlignmentType.LEFT,
          })],
          width: { size: cellWidth, type: WidthType.DXA },
          shading: rowIndex === 0 ? { type: 'clear', fill: 'F0F0F0' } : undefined,
        })),
        tableHeader: rowIndex === 0,
      }));
      const table = new Table({ rows, columnWidths, width: { size: width, type: WidthType.DXA },
        ...(left > 0 && { indent: { size: left, type: WidthType.DXA } }) });
      return context.prefix !== undefined || context.bulletLevel !== undefined ? [paragraph([], context), table] : [table];
    }
    case 'thematicBreak':
      return [paragraph([new TextRun({ text: '─'.repeat(50), color: 'CCCCCC' })], context)];
    case 'html':
      return /^<br\s*\/?>$/i.test(node.value.trim()) ? [paragraph([new TextRun({ break: 1 })], context)] : [];
    default:
      return [];
  }
}

/** Every item has one marker; following blocks keep indentation, never a second marker. */
function convertList(node: MdList, context: BlockContext): (Paragraph | Table)[] {
  const result: (Paragraph | Table)[] = [];
  // A parent item starting with a nested list still needs its own marker.
  if (context.prefix !== undefined || context.bulletLevel !== undefined) result.push(paragraph([], context));
  const depth = context.listDepth + 1;
  let index = node.start ?? 1;
  for (const item of node.children) {
    const itemContext: BlockContext = { listDepth: depth, quoteDepth: context.quoteDepth };
    if (typeof item.checked === 'boolean') {
      itemContext.prefix = (node.ordered ? `${index}. ` : '') + (item.checked ? '☑ ' : '☐ ');
    } else if (node.ordered) {
      itemContext.prefix = `${index}. `;
    } else if (depth <= 9) {
      itemContext.bulletLevel = depth - 1;
    } else {
      itemContext.prefix = '• ';
    }
    let first = true;
    for (const child of item.children) {
      const converted = convertNode(child, first ? itemContext : withoutMarker(itemContext));
      if (converted.length) first = false;
      result.push(...converted);
    }
    if (first) result.push(paragraph([], itemContext));
    index++;
  }
  return result;
}

function parseMarkdown(markdown: string): Root {
  return unified().use(remarkParse).use(remarkGfm).parse(markdown) as Root;
}

/**
 * Convert Markdown to a .docx Blob plus a suggested filename.
 * Runs entirely in the browser.
 */
export function createWordDocument(markdown: string): Document {
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

  return doc;
}

export async function exportWord(markdown: string): Promise<{ blob: Blob; filename: string }> {
  const blob = await Packer.toBlob(createWordDocument(markdown));
  const filename = generateFilename(markdown, 'word');
  return { blob, filename };
}
