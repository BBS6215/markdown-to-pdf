/**
 * Guide content data.
 * Source: 01-主线 §6.4, 02-SEO策略 §4
 *
 * Original 3 guides target low-KD SEO traffic (markdown-new-line KD22,
 * markdown-quote KD22, cheat-sheet KD43).
 *
 * Added 2026-05-15: 5 deeper guides (table / image / code-block / link /
 * list). These target higher-KD keywords (50+) that the SEO plan deemed
 * "not worth chasing for ranking", so the primary goal here is AdSense
 * audit readiness — sufficient original content with a clear angle that
 * connects each topic to the converter's actual PDF / Word output
 * behavior, not generic Markdown reference material.
 */

import { ZH_GUIDES } from './content-zh';

export interface GuideData {
  slug: string;
  title: string;
  description: string;
  readTime: number; // minutes
  content: string; // Markdown content
  faq: Array<{ q: string; a: string }>;
  relatedSlugs: string[];
}

export const GUIDES: GuideData[] = [
  {
    slug: 'markdown-new-line',
    title: 'Markdown New Line — How to Add Line Breaks (with Examples)',
    description: 'Learn how to create new lines and line breaks in Markdown with interactive examples.',
    readTime: 4,
    content: `## The Problem

In Markdown, pressing Enter once does **not** create a new line. This is one of the most common sources of confusion, especially for people pasting content from AI tools like ChatGPT or Claude.

If you write:

\`\`\`
Line one
Line two
\`\`\`

You'll get: Line one Line two (on the same line!)

## Method 1: Two Spaces + Enter (Soft Break)

Add **two spaces** at the end of a line, then press Enter:

\`\`\`
Line one··
Line two
\`\`\`

(The ·· represents two spaces)

This creates a \`<br>\` tag — a soft line break within the same paragraph.

## Method 2: Blank Line (New Paragraph)

Leave a **blank line** between two lines:

\`\`\`
Line one

Line two
\`\`\`

This creates separate \`<p>\` paragraphs with more spacing between them.

## Method 3: HTML Break Tag

Use the HTML \`<br>\` tag directly:

\`\`\`
Line one<br>
Line two
\`\`\`

This is the most reliable method and works in all Markdown renderers.

## Which Method Should You Use?

| Method | When to Use | Compatibility |
|--------|------------|---------------|
| Two spaces | Quick line breaks in paragraphs | Most renderers |
| Blank line | Separate paragraphs (recommended) | All renderers |
| \`<br>\` tag | When you need guaranteed line breaks | All renderers |

**Recommendation**: Use blank lines for paragraph separation (most common), and \`<br>\` when you need a line break within a paragraph.

## Common Mistakes

### Mistake 1: Single Enter
\`\`\`
Wrong:
First line
Second line
(These appear on the same line!)
\`\`\`

### Mistake 2: Forgetting Trailing Spaces
The two-space method is invisible and easy to forget. Your editor might strip trailing spaces. Prefer \`<br>\` or blank lines instead.

### Mistake 3: Pressing Shift+Enter in a Rich-Text Editor First
If you drafted text in Notion or Google Docs and then converted to Markdown, soft line breaks inserted with Shift+Enter may not survive the export. Always check the live preview before exporting.

## Why Markdown Works This Way

The behavior is deliberate, not a bug. When John Gruber wrote the original Markdown spec in 2004, the goal was a syntax that read well as plain text in an email or a text file. People naturally hard-wrap long paragraphs at 80 columns for readability — those wrapped lines should stay one paragraph when rendered, not become broken-up shards. So Markdown treats a single newline as a space, and requires an explicit signal (a blank line, two trailing spaces, or a \`<br>\`) when you actually want a break. Every modern flavor — CommonMark, GFM, MDX — keeps the same rule for compatibility.

## Line Breaks in AI-Generated Output

If you got your Markdown from ChatGPT, Claude, Gemini, or another LLM, you'll usually see one of two patterns:

- **Blank-line paragraphs (most common).** Modern chat models almost always separate ideas with a fully blank line. This is the safest pattern and renders cleanly in every Markdown tool — no fix needed.
- **Hard-wrapped lines without blanks.** Older models, or output piped through certain code editors, sometimes wrap at 80 columns without blank lines in between. Pasted into a strict Markdown renderer, those wrapped lines collapse into one long paragraph. The fix is to delete the in-line newlines or insert blank lines between paragraphs before exporting.

When you paste into the converter on the home page, the live preview shows how each line break is interpreted. If a paragraph looks too long or too short, fix it in the editor on the left and the preview updates instantly.

## Editor Quirks to Watch For

The two-trailing-spaces method is fragile because most editors fight it:

- **VS Code** trims trailing whitespace on save by default (\`files.trimTrailingWhitespace: true\`). You need to either turn that setting off, or add a \`.editorconfig\` exception for \`.md\` files.
- **Obsidian** keeps trailing spaces in source view, but the live preview may not show the resulting break depending on your theme.
- **Notion** does not export trailing spaces when you copy as Markdown — the line break is lost in transit.
- **GitHub's web editor** preserves trailing spaces, which is why the two-space trick is more reliable on GitHub than locally.

For any document that has to survive copy-paste between tools, prefer blank lines or \`<br>\` over the trailing-space method.

## PDF and Word Export Behavior

The converter behind this site renders each method the way the underlying engine intends:

- **PDF export.** Blank-line paragraphs become real paragraph breaks with full spacing. Two trailing spaces and \`<br>\` both become a \`<br>\` in the HTML, which the browser print engine renders as a single soft break — about half the spacing of a paragraph break.
- **Word export.** Blank-line paragraphs become separate paragraph elements in the .docx file, so Word users can adjust spacing globally through paragraph styles. Inline \`<br>\` becomes a Word line break, which keeps the next line in the same paragraph — useful for addresses, signatures, and poetry-style stanzas.
- **HTML export.** All three methods produce semantic HTML: \`<p>\` for paragraphs and \`<br>\` for soft breaks. Safe to paste into Notion, Google Docs, or any email client.

## Try It Yourself

Use the editor below to experiment with different line break methods:`,
    faq: [
      { q: 'Why doesn\'t pressing Enter work in Markdown?', a: 'Markdown treats single line breaks as spaces. This is by design — it allows you to wrap long lines in your source without affecting the output. Use a blank line or two trailing spaces for actual line breaks.' },
      { q: 'What\'s the difference between a line break and a new paragraph?', a: 'A line break (<br>) keeps text in the same paragraph with minimal spacing. A new paragraph (blank line) creates a larger gap between blocks of text.' },
      { q: 'Do AI tools like ChatGPT use proper Markdown line breaks?', a: 'Usually yes — ChatGPT and Claude typically use blank lines between paragraphs. But if you copy from the chat interface, formatting may be lost. Just paste into our converter and it will handle it.' },
      { q: 'My PDF shows everything on one line — what went wrong?', a: 'Almost always missing blank lines between paragraphs. Paste your Markdown into the editor on the home page; if the preview looks the same wrong way, add blank lines between paragraphs and re-export.' },
      { q: 'How do I keep a line break inside a Markdown table cell?', a: 'Pure Markdown table syntax does not allow real newlines inside a cell. Use a literal <br> tag — our renderer accepts <br> inside table cells in PDF, Word, and HTML output.' },
      { q: 'Will my editor break the two-trailing-spaces trick?', a: 'Probably yes. VS Code, Notion, and many "smart" editors automatically trim trailing whitespace. Prefer blank lines or <br> if your document moves between tools.' },
    ],
    relatedSlugs: ['markdown-quote', 'markdown-cheat-sheet'],
  },
  {
    slug: 'markdown-quote',
    title: 'Markdown Quote — How to Create Block Quotes',
    description: 'Learn how to create block quotes, nested quotes, and cited text in Markdown.',
    readTime: 6,
    content: `## Basic Block Quote

Use the \`>\` character at the beginning of a line:

\`\`\`markdown
> This is a block quote.
> It can span multiple lines.
\`\`\`

**Result:**
> This is a block quote.
> It can span multiple lines.

## Multi-Paragraph Quotes

Add \`>\` on blank lines between paragraphs:

\`\`\`markdown
> First paragraph of the quote.
>
> Second paragraph of the quote.
\`\`\`

## Nested Quotes

Use multiple \`>\` characters for nesting:

\`\`\`markdown
> Level 1 quote
>> Level 2 nested quote
>>> Level 3 deep nested
\`\`\`

**Result:**
> Level 1 quote
>> Level 2 nested quote
>>> Level 3 deep nested

## Quotes with Other Elements

You can include other Markdown inside quotes:

\`\`\`markdown
> ### Quoted Heading
>
> This quote contains **bold**, *italic*, and \`code\`.
>
> - List item 1
> - List item 2
\`\`\`

## Common Use Cases

| Use Case | Example |
|----------|---------|
| Citing someone | > "The only way to do great work is to love what you do." — Steve Jobs |
| Highlighting important info | > **Note:** This feature requires a free account. |
| Email-style replies | > Original message here |
| Documentation callouts | > ⚠️ **Warning:** This action cannot be undone. |

## Styling Tips

Block quotes are commonly styled with a left border. Most Markdown renderers (including ours) display them with:
- A gray left border
- Slightly indented text
- Lighter text color

## Quotes vs Callouts

Markdown itself only has one quote syntax: \`>\`. Many documentation systems build richer "callout" components on top of it — notes, tips, warnings, and alerts — but those are platform-specific extensions. If you are writing for a portable Markdown document, keep the callout label inside the quote:

\`\`\`markdown
> **Note:** This converter runs in your browser, so private drafts do not need to be uploaded.

> **Warning:** Browser print settings can change margins, headers, and footers in the final PDF.
\`\`\`

This pattern works in GitHub, static-site generators, PDF exports, and Word exports because the label is plain Markdown text. Avoid relying on syntax such as \`:::warning\` unless you know the destination renderer supports it.

## Quotes in AI-Generated Notes

ChatGPT, Claude, and other AI tools often use block quotes for two different things: quoted source material and highlighted advice. Before exporting to PDF, decide which one the quote is meant to be. If it is a real citation, add the source on the next quoted line. If it is a note or warning, label it explicitly so the reader does not mistake generated advice for an external quotation.

AI output can also lose the \`>\` marker on wrapped lines. A quote should prefix every visual line in the source, including blank lines between paragraphs. If only the first line starts with \`>\`, the rest may render as regular body text.

## PDF & Word Rendering Notes

- **PDF output** uses the same quote styling as the HTML preview: a left border, muted text color, and extra padding. Long quotes wrap naturally inside the page width.
- **Word output** converts quotes into indented paragraphs. Simple quotes, nested quotes, and quotes containing lists all survive, but very deep nesting can look crowded after Word applies its own paragraph spacing.
- **Quoted code blocks** are valid Markdown, but they are easier to maintain if every line is consistently prefixed. When in doubt, paste the quote into the editor and check the preview before exporting.

## Cleanup Checklist

Before converting a document with many quotes, scan for four things:

1. Every quoted paragraph starts with \`>\`.
2. Blank lines inside multi-paragraph quotes also contain \`>\`.
3. Attribution is included where the quote is an actual citation.
4. Callouts are labeled as \`Note\`, \`Tip\`, or \`Warning\` instead of relying on visual style alone.

## Try It Yourself

Experiment with block quotes in the editor below:`,
    faq: [
      { q: 'Can I nest quotes inside quotes?', a: 'Yes! Use >> for level 2 nesting, >>> for level 3, and so on. Most renderers support at least 3 levels of nesting.' },
      { q: 'Can I put code blocks inside quotes?', a: 'Yes, you can put any Markdown element inside a quote, including code blocks, lists, and headings. Just prefix each line with >.' },
      { q: 'How do I attribute a quote to someone?', a: 'Markdown doesn\'t have a built-in citation syntax. The common convention is to add a dash and the author name: > "Quote text" — Author Name' },
      { q: 'Can I make note or warning boxes with block quotes?', a: 'Yes. The portable pattern is to write a label inside the quote, such as > **Note:** or > **Warning:**. Custom callout syntaxes are not supported by every Markdown renderer.' },
      { q: 'Why did only the first line render as a quote?', a: 'Every quoted source line needs its own > marker. If wrapped lines or blank lines are missing it, the renderer treats those lines as normal text.' },
    ],
    relatedSlugs: ['markdown-new-line', 'markdown-cheat-sheet'],
  },
  {
    slug: 'markdown-cheat-sheet',
    title: 'Markdown Cheat Sheet — Complete Syntax Reference 2026',
    description: 'Complete Markdown syntax reference with examples for headings, links, images, tables, code, and more.',
    readTime: 8,
    content: `## Headings

\`\`\`markdown
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
\`\`\`

## Text Formatting

| Syntax | Result |
|--------|--------|
| \`**bold**\` | **bold** |
| \`*italic*\` | *italic* |
| \`~~strikethrough~~\` | ~~strikethrough~~ |
| \`\\\`inline code\\\`\` | \`inline code\` |
| \`**_bold italic_**\` | **_bold italic_** |

## Links and Images

\`\`\`markdown
[Link text](https://example.com)
[Link with title](https://example.com "Title")
![Alt text](image-url.png)
\`\`\`

## Lists

### Unordered List
\`\`\`markdown
- Item 1
- Item 2
  - Nested item
  - Another nested
- Item 3
\`\`\`

### Ordered List
\`\`\`markdown
1. First
2. Second
3. Third
\`\`\`

### Task List
\`\`\`markdown
- [x] Completed task
- [ ] Incomplete task
\`\`\`

## Code Blocks

Use triple backticks with an optional language:

\`\`\`\`markdown
\`\`\`javascript
function hello() {
  console.log("Hello, world!");
}
\`\`\`
\`\`\`\`

## Tables

\`\`\`markdown
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
\`\`\`

### Table Alignment

\`\`\`markdown
| Left | Center | Right |
|:-----|:------:|------:|
| L    |   C    |     R |
\`\`\`

## Block Quotes

\`\`\`markdown
> This is a quote.
> It can have **formatting** inside.
\`\`\`

## Horizontal Rule

\`\`\`markdown
---
\`\`\`

## Escaping Characters

Use a backslash to display literal characters:

\`\`\`markdown
\\* Not italic \\*
\\# Not a heading
\`\`\`

## GitHub Flavored Markdown (GFM)

Our converter supports GFM extensions:
- ~~Strikethrough~~ with \`~~text~~\`
- Task lists with \`- [x]\` and \`- [ ]\`
- Tables (as shown above)
- Auto-linked URLs

## Export-Ready Document Structure

A syntax cheat sheet is useful, but clean export depends on structure as much as syntax. For PDF or Word output, this pattern is the safest:

\`\`\`markdown
# One document title

Short introduction.

## Main section

Normal paragraphs separated by blank lines.

### Subsection

- Lists for scan-friendly points
- Tables only where tabular data is clearer than prose

## Appendix

\`\`\`

Use one \`#\` heading for the document title, then \`##\` and \`###\` for sections. Do not jump from \`##\` directly to \`####\` unless the intermediate level really exists. This keeps the document readable, improves accessibility, and gives future tooling a clean outline.

## Copy-Paste Checklist for AI Output

When pasting Markdown from ChatGPT, Claude, Gemini, or another AI tool, check these items before exporting:

- **Headings:** Make sure the first heading is the actual document title, not a chat response label.
- **Lists:** Nested items should be indented consistently. If a sub-item looks like a normal paragraph in the preview, fix the spaces.
- **Tables:** Count the pipes in each row if a table looks broken. Every row needs the same number of cells as the header.
- **Code blocks:** Every opening triple backtick needs a closing triple backtick. One missing fence can turn the rest of the document into code.
- **Links and images:** Private chat attachments or local file paths will not load for other readers. Use reachable HTTPS URLs for shareable documents.

## What This Converter Supports

The converter uses a GitHub Flavored Markdown pipeline, so the common writing features above are supported. It also accepts a limited amount of inline HTML, which is useful for practical Markdown tasks such as \`<br>\` inside table cells. For security and predictable exports, avoid complex raw HTML blocks, scripts, iframes, and interactive widgets. Markdown should describe the document; PDF and Word exports are static formats.

## PDF vs Word Quick Choice

- Choose **PDF** when the document is finished, needs to look consistent for readers, or contains images that must be visible.
- Choose **Word** when the recipient needs to edit the content, comment on it, or reuse tables and lists.
- Choose **HTML** when you want to paste rendered Markdown into a CMS, email, or another web-based editor.

## Try It Yourself

Use the editor below to test any Markdown syntax:`,
    faq: [
      { q: 'What is GitHub Flavored Markdown (GFM)?', a: 'GFM is an extension of standard Markdown used by GitHub. It adds support for tables, task lists, strikethrough, and auto-linked URLs. Our converter fully supports GFM.' },
      { q: 'Can I use HTML in Markdown?', a: 'Yes, most Markdown renderers support inline HTML. For example, you can use <br> for line breaks or <details> for collapsible sections.' },
      { q: 'How do I create a table of contents?', a: 'Markdown doesn\'t have built-in TOC support, but many tools generate one automatically from headings. In our converter, headings are rendered with proper hierarchy for easy navigation.' },
      { q: 'What\'s the maximum heading level?', a: 'Markdown supports 6 heading levels (# through ######), corresponding to HTML h1 through h6.' },
      { q: 'Can I embed images from URLs?', a: 'Yes, use the syntax ![alt text](image-url). The image will be embedded in PDF output if accessible.' },
      { q: 'Should I use one # heading or many?', a: 'Use one # heading for the document title, then ## and ### for sections. Multiple H1s are valid Markdown, but they make exported documents harder to scan.' },
      { q: 'Why did my AI-generated Markdown export poorly?', a: 'Usually because of a missing blank line, mismatched table pipes, or an unclosed code fence. The live preview is the fastest way to catch these issues before exporting.' },
    ],
    relatedSlugs: ['markdown-new-line', 'markdown-quote'],
  },
  {
    slug: 'markdown-table',
    title: 'Markdown Table — Syntax, Alignment, and PDF/Word Rendering',
    description: 'Learn Markdown table syntax with column alignment, multi-line content, and tips for clean PDF and Word export.',
    readTime: 6,
    content: `## The Basic Syntax

A Markdown table has three parts: a **header row**, a **divider row** of dashes, and one or more **body rows**. Cells are separated by pipes (\`|\`).

\`\`\`markdown
| Name    | Role        | Joined |
| ------- | ----------- | ------ |
| Alice   | Engineer    | 2024   |
| Bob     | Designer    | 2025   |
| Charlie | Researcher  | 2025   |
\`\`\`

**Result:**

| Name    | Role        | Joined |
| ------- | ----------- | ------ |
| Alice   | Engineer    | 2024   |
| Bob     | Designer    | 2025   |
| Charlie | Researcher  | 2025   |

The leading and trailing pipes are optional — the table works without them — but including them keeps the source readable.

## Column Alignment

The divider row controls how each column aligns. Place a colon on the left, right, or both sides of the dashes:

\`\`\`markdown
| Left   | Center | Right |
| :----- | :----: | ----: |
| apple  |  red   |  $1.20 |
| banana | yellow |  $0.40 |
\`\`\`

| Left   | Center | Right |
| :----- | :----: | ----: |
| apple  |  red   |  $1.20 |
| banana | yellow |  $0.40 |

A common pattern: left-align text columns, right-align numeric columns so prices and counts line up visually.

## What Goes Inside a Cell

A cell is a single inline-content slot. You can use **bold**, *italic*, \`code\`, links, and even images — but **not block-level elements** like headings, code blocks, or sub-lists. If you need richer content inside a cell, the usual workaround is to embed HTML \`<br>\` tags for line breaks:

\`\`\`markdown
| Topic | Notes                                  |
| ----- | -------------------------------------- |
| Auth  | Email + Google OAuth<br>Cookies opt-in |
\`\`\`

## Escaping Pipes

If your cell content needs a literal \`|\` character (for example, regex alternation), escape it as \`\\|\`:

\`\`\`markdown
| Pattern    | Matches              |
| ---------- | -------------------- |
| \`a\\|b\`     | "a" OR "b"           |
\`\`\`

## Common Mistakes

**1. Missing the divider row.** Without the \`| --- |\` line right after the header, the renderer treats every line as a paragraph and you get raw pipes in the output.

**2. Different column counts per row.** Most renderers tolerate this and pad missing cells, but the result looks ragged. Always count your pipes — the header, divider, and every body row must have the same number of columns.

**3. Multi-line cells.** Plain Markdown table syntax cannot span multiple visual lines inside one cell. Either use \`<br>\` (above), shorten the content, or split the data across multiple rows.

## PDF & Word Rendering Notes

This is where the markdown-to-pdf.app converter's behavior diverges from a generic reference:

- **PDF output** uses the browser's native print engine. Tables render with the default \`github-markdown-css\` styling — light gray borders, a subtle header background, and proportional column widths that auto-fit the page. If your table is wider than the printable area, columns shrink to fit; very long cell text wraps within the cell.
- **Word output** uses the \`docx\` package. Each Markdown table becomes a real Word table with explicit \`width: 100%\` so it spans the page, the first row gets a light gray fill, and every cell is its own paragraph for clean editing in Word or WPS. Column widths are evenly distributed by default — Word users can drag column borders to adjust after opening the file.
- **No formulas, no merged cells.** Markdown tables are intentionally simple. If you need cell merging, formulas, or banded styling, paste the converted output into Word or Excel and add those features there.

## Tables in AI-Generated Output

Most LLMs are unusually good at Markdown tables, but each has quirks worth knowing about when you paste their output into a converter:

- **ChatGPT** tends to produce well-aligned tables with leading and trailing pipes, evenly spaced columns, and exactly three dashes per column in the divider row. Almost always renders without manual cleanup.
- **Claude** does the same, but is more likely to use longer cells with embedded \`<br>\` tags when describing options or comparisons. Our renderer handles this cleanly in PDF and Word.
- **Gemini** sometimes drops the trailing pipe on body rows and occasionally produces tables wider than the source text suggests. If a Gemini-generated table looks ragged, paste it into the editor on the home page and watch the live preview — most rendering issues fix themselves once the content reaches a strict Markdown parser.

If a table from any AI tool contains stray characters between the divider row and the body (a common artifact of streaming output), delete those lines and the table will render correctly.

## Converting From Excel or Google Sheets

The fastest way to turn a spreadsheet selection into a Markdown table:

1. Select the cells you want, copy to the clipboard.
2. Paste into an online tool like \`tableconvert.com\` or a VS Code extension like \`Excel to Markdown table\`.
3. Paste the resulting Markdown into the editor on the home page.

Native Markdown does not support cell merging, so any merged cells in your spreadsheet will collapse — usually the merged value lands in the top-left cell and the rest become empty. If preserving merged cells matters, export to Word instead and the converter will produce a real Word table you can re-merge by hand.

## PDF Pagination for Long Tables

The PDF export uses the browser's print engine, so very long tables behave the same way they would when you print any web page:

- Tables that fit on one page render normally with no internal page breaks.
- Tables that overflow break across pages, but the header row does **not** repeat on the new page by default — a known limitation of CSS-based PDF rendering.
- If you need a repeated header on each page, the Word export is the better choice: open the .docx file, right-click the header row, and turn on *Repeat as header row at the top of each page*.

For best results with long tables, keep cell text short, prefer right-alignment for numbers, and split very wide tables into two narrower ones.

## CJK and Mixed-Language Tables

If your table mixes Chinese, Japanese, or Korean text with Latin text, the visual width of the source code rarely matches the rendered width — a CJK character is roughly twice as wide as a Latin letter in monospace, but the Markdown parser counts both as a single cell unit. This means your raw source may look ragged in the editor while rendering perfectly in the preview. Trust the live preview, not the editor alignment.

## Try It Yourself

Use the editor on the home page to paste a real table from your notes — the live preview closely matches what the PDF or Word export will look like, and catches most layout issues before you ever click Convert.`,
    faq: [
      { q: 'Why does my table look broken in the preview?', a: 'The most common cause is a missing or malformed divider row. Make sure the second line of the table is dashes separated by pipes, with at least three dashes per column.' },
      { q: 'Can I have multi-line content in a single cell?', a: 'Pure Markdown table syntax does not support it. The standard workaround is an inline <br> HTML tag where you need the line break. Our renderer accepts <br> inside cells in both PDF and Word output.' },
      { q: 'How wide can a table be in PDF output?', a: 'Tables auto-fit the printable page width. If you have many columns or long content, cells wrap and the text becomes smaller. For very wide tables, consider exporting to Word instead and adjusting column widths there.' },
      { q: 'Are tables sortable in the PDF?', a: 'No — PDFs are static documents, not interactive spreadsheets. If you need sortable data, the HTML export or a real spreadsheet is a better fit.' },
      { q: 'Does the table header repeat on every PDF page?', a: 'Not by default. The PDF export uses the browser print engine and CSS-based table rendering, which does not repeat header rows across page breaks. Word export does support repeating headers — open the .docx, right-click the header row, and enable "Repeat as header row at the top of each page".' },
      { q: 'Can I merge cells in a Markdown table?', a: 'No, Markdown table syntax intentionally does not support cell merging. If you need merged cells, export to Word and merge cells manually, or write the table in raw HTML and the converter will render the HTML through to PDF.' },
      { q: 'My table from Gemini or ChatGPT has uneven columns — how do I fix it?', a: 'Paste it into the editor on the home page and check the live preview. Most rendering issues fix themselves once the source hits a strict parser. If columns are still off, count the pipes per row — every row must have the same number of pipes as the header.' },
    ],
    relatedSlugs: ['markdown-list', 'markdown-cheat-sheet'],
  },
  {
    slug: 'markdown-image',
    title: 'Markdown Image — Syntax, Alt Text, and PDF/Word Output',
    description: 'Embed images in Markdown with alt text, titles, and reference syntax — plus how they behave when exported to PDF or Word.',
    readTime: 7,
    content: `## The Basic Syntax

Embedding an image in Markdown looks almost identical to a link, except for the leading exclamation mark:

\`\`\`markdown
![alt text](https://example.com/image.png)
\`\`\`

There are three parts:

- \`![\` — the image marker
- \`alt text\` — what assistive technology and search engines read instead of the image
- \`(url)\` — where the image lives

You can use a relative path (\`./diagrams/architecture.png\`), an absolute path (\`/static/logo.svg\`), or a full URL (\`https://...\`). Most Markdown renderers will load the image regardless of source — but PDF exporters can only embed it if the source is reachable at render time.

## Adding a Title (Tooltip)

A second argument inside the parentheses, in double quotes, becomes a hover tooltip in HTML and is preserved in the PDF:

\`\`\`markdown
![Project diagram](./architecture.png "v2 architecture, May 2026")
\`\`\`

## Reference-Style Images

If the same image appears multiple times, or the URL is long enough to make your source hard to scan, use reference syntax:

\`\`\`markdown
Hero shot at the top:

![Hero image][hero]

Mentioned again later:

![Hero image][hero]

[hero]: https://example.com/very/long/url/hero@2x.png "Hero image"
\`\`\`

The label inside the second pair of brackets (\`hero\`) is case-insensitive and can appear anywhere in the document.

## Image as a Link

Wrap the image syntax in a regular link to make a clickable image:

\`\`\`markdown
[![Open the demo](./demo-thumbnail.png)](https://example.com/demo)
\`\`\`

Clicking the image in HTML or PDF output opens the linked URL.

## Alt Text Is Not Optional

It might be tempting to write \`![](image.png)\` and skip the alt text, but doing so hurts:

- **Accessibility** — screen readers either announce the filename or skip the image entirely.
- **SEO** — search engines use alt text to understand what the image depicts.
- **PDF/Word fallback** — when an image fails to load, alt text is what the reader sees.

A good alt text is one short sentence describing the image's content or purpose, not "image" or the filename.

## Common Mistakes

**1. Spaces in the URL.** URLs cannot contain raw spaces. Either rename the file or use percent-encoding: \`my%20file.png\`.

**2. Markdown inside alt text.** Alt text is plain text. \`![**bold caption**](img.png)\` will not render bold — the bold markers appear verbatim.

**3. Loading from a local file path in a public document.** \`./screenshot.png\` works in the editor and preview, but if you share the rendered HTML or paste it somewhere else, the image breaks because the relative path no longer resolves. Use a public URL for anything you plan to distribute.

## PDF & Word Rendering Notes

- **PDF output** preserves images natively. The browser's print engine fetches the image when the iframe loads, so an external URL must be reachable at the moment you click "Convert to PDF". Images are scaled to fit the page width; very tall images may flow onto a second page automatically.
- **Word output** has an important limitation worth knowing about: the current frontend pipeline does not embed image binaries into the \`.docx\` file. Markdown image syntax is rendered as the **alt text** wrapped in a paragraph (the same fallback you would see if the image failed to load). This is the trade-off for keeping conversions 100% in the browser without uploading your assets to a server. If image embedding in Word is critical, export to PDF instead or use the HTML output and paste it into Word.
- **Broken images** in the PDF show as a tiny placeholder icon — verify your URLs before exporting.

## Remote Images, Local Files, and Privacy

A Markdown image is just a reference. The converter does not upload your local files, crawl your disk, or copy private assets into a server. That means local paths such as \`C:\\Users\\you\\diagram.png\` or \`./assets/chart.png\` only work if the browser can resolve them in the current context. For a document you plan to share, use a public HTTPS URL or host the image in the same site where the Markdown will be published.

Private images from Slack, Notion, Google Docs, or a chat attachment often look fine for you because your browser is logged in. They may fail in a PDF export or for another reader. The simplest test is to open the image URL in a private window. If it asks for login, do not expect a portable PDF.

## Image Size Strategy

Standard Markdown has no built-in image width syntax. If an image is too large, the most reliable fix is to resize the source image before linking it. For HTML/PDF output, an inline \`<img width="480">\` tag can work, but it is less portable than Markdown image syntax and may not carry over cleanly into Word workflows.

For screenshots in documentation, crop aggressively. A 1600px-wide full-screen screenshot usually becomes unreadable on a PDF page; a focused crop of the relevant panel is easier to read and produces a smaller file.

## AI-Generated Image References

AI tools sometimes invent placeholder image paths such as \`![chart](chart.png)\` or \`![diagram](attachment:image)\`. Those are not real, reachable assets. Before exporting, replace them with a real URL or delete the image line and write a short caption instead.

## Try It Yourself

Drop a Markdown file that references images and convert it on the home page. The live preview shows what the PDF will look like; if you only see alt text in the preview, the image URL is not reachable from the browser.`,
    faq: [
      { q: 'Can I resize an image in Markdown?', a: 'Standard Markdown has no width or height syntax. The common workaround is to use an HTML <img> tag with width/height attributes — most renderers, including ours, accept inline HTML in Markdown source.' },
      { q: 'Are SVG images supported?', a: 'Yes for HTML and PDF output, as long as the URL serves the SVG with the correct content-type. SVG support in Word export is limited by the .docx format itself.' },
      { q: 'Why does my image show up in the preview but not the PDF?', a: 'The most common cause is that the image URL requires authentication or has a Referer-Policy header that blocks cross-origin loads. Try the URL in a private browser window — if it does not load there, the PDF will not load it either.' },
      { q: 'Should I use absolute or relative image URLs?', a: 'For shareable Markdown, use absolute URLs (https://...). Relative paths only resolve correctly inside the directory where the source lives, which the converter and any downstream tool cannot reproduce.' },
    ],
    relatedSlugs: ['markdown-link', 'markdown-cheat-sheet'],
  },
  {
    slug: 'markdown-code-block',
    title: 'Markdown Code Block — Fenced, Indented, and Inline Code',
    description: 'Master Markdown code blocks: fenced blocks with language hints, indented blocks, inline code, and PDF rendering tips.',
    readTime: 7,
    content: `## Inline Code

Wrap a short snippet in single backticks to render it as monospaced code inside a paragraph:

\`\`\`markdown
Run \\\`npm install\\\` before starting the dev server.
\`\`\`

**Result:** Run \`npm install\` before starting the dev server.

If the snippet itself contains a backtick — for example you want to show \`\\\`useState\\\`\` — wrap it in **two** backticks instead, with a space between the delimiter and the content:

\`\`\`markdown
Use \\\`\\\` \\\`useState\\\` hook \\\`\\\` for state.
\`\`\`

## Fenced Code Blocks

For multi-line code, surround the block with three backticks (\\\`\\\`\\\`) on lines of their own:

    \`\`\`
    function greet(name) {
      return \\\`Hello, \\\${name}!\\\`;
    }
    \`\`\`

The block above renders as a code block in our preview, PDF, and Word output:

\`\`\`
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

You can use \\\`~~~\\\` (three tildes) instead of three backticks — both forms work and are interchangeable. Tildes are handy when the code itself contains triple backticks.

## Language Hints

Add a language identifier immediately after the opening fence to get syntax-aware behavior in renderers that support highlighting:

    \`\`\`js
    const sum = (a, b) => a + b;
    \`\`\`

    \`\`\`python
    def sum(a, b):
        return a + b
    \`\`\`

    \`\`\`bash
    grep -R "TODO" ./src
    \`\`\`

Common identifiers: \`js\`, \`ts\`, \`jsx\`, \`tsx\`, \`python\`, \`bash\`, \`sh\`, \`json\`, \`yaml\`, \`html\`, \`css\`, \`sql\`, \`go\`, \`rust\`, \`java\`, \`c\`, \`cpp\`. Most renderers fall back gracefully if the identifier is unknown.

## Indented Code Blocks (Legacy)

The original Markdown spec also recognizes any line indented by four spaces or one tab as code:

\`\`\`
Regular paragraph.

    let answer = 42;
    console.log(answer);

Back to regular paragraph.
\`\`\`

Indented blocks have no language hint and silently swallow the indentation. They are still valid, but in nearly every modern workflow fenced blocks with language hints are preferred — they are easier to copy, harder to break by accident, and give the renderer information for highlighting.

## What Goes Inside

A code block is rendered **verbatim**: Markdown syntax inside it does not get parsed. \`**bold**\`, \`# heading\`, and image syntax all appear as literal text. This is exactly what you want when documenting Markdown itself (which is why this guide is full of nested fences).

## Common Mistakes

**1. Mixing tabs and spaces in indented blocks.** Some renderers strip leading tabs aggressively. Stick to four spaces or, better, use fenced blocks.

**2. Forgetting to close the fence.** An unterminated triple-backtick swallows the rest of your document into a single code block. If your output suddenly becomes one giant monospaced wall of text, search for an opening fence that has no matching close.

**3. Tab width drift.** Inside a fenced block, tab characters are usually rendered as 4 or 8 spaces depending on the renderer. If you care about exact column alignment (ASCII tables, banner art), convert tabs to spaces before pasting.

## PDF & Word Rendering Notes

- **PDF output** styles every code block with the JetBrains Mono variable font, a small font size, and a light gray background (\`#F6F8FA\`, matching GitHub). Long lines wrap inside the block rather than spilling off the page. Syntax highlighting in the PDF is currently single-color — the colored highlight you see in the live preview comes from \`rehype-highlight\` running in the browser; the print stylesheet uses a monochrome palette for predictable output. Colorful highlighting is a planned refinement.
- **Word output** renders each fenced block as a Word paragraph with Courier New, size 9pt, on a \`#F6F8FA\` shading background. Each paragraph is one logical block — that means line wrapping in Word follows Word's own rules and may differ slightly from the live preview.
- **Inline code** in Word switches mid-paragraph to Courier New without changing the paragraph's background, matching the look in the HTML preview.

## Choosing Language Identifiers

Use short, common identifiers rather than marketing names. Write \`ts\` or \`typescript\`, not \`TypeScript React app\`; write \`bash\`, not \`terminal\`; write \`yaml\`, not \`yml config file\`. The language hint is metadata for the renderer, not a caption. If you need a caption, put it in the paragraph before the code block.

For framework-specific files, choose the closest syntax family: \`tsx\` for React TypeScript, \`jsx\` for React JavaScript, \`json\` for package files, and \`bash\` for shell commands. Unknown identifiers still render as code, but they do not help syntax highlighting.

## Long Code Blocks in PDF

PDF pages are narrow compared with code editors. Long lines wrap, which keeps the content visible but can make copy-paste harder to read. For export-friendly code:

- Break long commands with backslashes where the shell allows it.
- Prefer concise examples over full production files.
- Put important comments above the relevant line instead of far to the right.
- Split unrelated snippets into separate code blocks with headings in between.

## Copying Code From AI Tools

AI responses sometimes include prose inside the same fenced block as the code, especially when the answer streams and the closing fence is missing. If the preview shows your explanation in monospace, close the fence before the prose. Also check that generated Markdown examples use four backticks for the outer fence when they demonstrate triple-backtick syntax inside.

## Try It Yourself

Paste a code snippet on the home page and watch the live preview. Switch between the PDF and Word converters to see the same code rendered for each target — the difference in how line wrapping and fonts behave is most visible on snippets that have long lines.`,
    faq: [
      { q: 'How do I include triple backticks inside a code block?', a: 'Use four or more backticks for the outer fence. The renderer treats the fence as "n or more backticks" where n is whatever you used to open it. Tildes (~~~) also work as an alternative fence.' },
      { q: 'Which languages does syntax highlighting support?', a: 'The live preview uses rehype-highlight, which supports about 190 languages out of the box including all common ones (js, ts, python, go, rust, sql, bash, json, yaml, html, css). Unknown identifiers fall back to plain monospace.' },
      { q: 'Why is the highlight color missing in my PDF?', a: 'The current print stylesheet uses a single color for code to keep PDF output predictable across browsers. Colored syntax highlighting in the PDF is on the roadmap; for now, if you need full color, export to HTML and print from there.' },
      { q: 'Can I copy code from the PDF?', a: 'Yes — PDFs preserve the text layer, so selecting and copying a code block from the exported file gives you the original characters. Line breaks are preserved.' },
    ],
    relatedSlugs: ['markdown-cheat-sheet', 'markdown-new-line'],
  },
  {
    slug: 'markdown-link',
    title: 'Markdown Link — Inline, Reference, and Autolink Syntax',
    description: 'Every way to write links in Markdown: inline, reference, autolink, anchor, and email — plus how they render in PDF.',
    readTime: 7,
    content: `## Inline Links

The most common form: square brackets around the visible text, parentheses around the URL.

\`\`\`markdown
Read the [Next.js documentation](https://nextjs.org/docs) for more details.
\`\`\`

The URL inside the parentheses can be absolute (\`https://...\`), relative (\`../guides/markdown-quote\`), or an anchor (\`#installation\`). Anything that produces a valid URL works.

## Adding a Title (Tooltip)

Add a string in double quotes after the URL, separated by a space:

\`\`\`markdown
[Next.js docs](https://nextjs.org/docs "Latest stable release notes")
\`\`\`

The title becomes a hover tooltip in HTML output and is preserved as a tooltip in PDF.

## Reference Links

If you reuse the same URL multiple times — or the URL is so long it disrupts the flow of the prose — use reference syntax:

\`\`\`markdown
Both [Vercel][v] and [Netlify][n] support deploys from Git.

Later we benchmark [Vercel][v] against alternatives.

[v]: https://vercel.com "Vercel platform"
[n]: https://netlify.com
\`\`\`

The label between the second pair of brackets (\`v\` or \`n\`) is case-insensitive. Definitions can appear anywhere in the document, but conventionally live at the bottom.

A shortcut form lets you reuse the visible text as the label:

\`\`\`markdown
See the [Markdown Cheat Sheet] for a complete reference.

[Markdown Cheat Sheet]: /guides/markdown-cheat-sheet
\`\`\`

## Autolinks

Wrap a URL in angle brackets to turn it into a clickable link without changing its display text:

\`\`\`markdown
The website is <https://markdown-to-pdf.app>.
\`\`\`

GitHub Flavored Markdown (which our converter implements) also recognizes bare URLs without the angle brackets and auto-links them. This is convenient but produces noisier source — explicit linking is usually clearer for documents you plan to maintain.

## Email Links

Either of these works:

\`\`\`markdown
Reach us at <support@example.com>
Reach us at [support@example.com](mailto:support@example.com)
\`\`\`

The first form is shorter; the second lets you customize the visible text or pre-fill subject lines via \`mailto:?subject=...\`.

## Anchor Links

Headings in Markdown become anchors automatically. Most renderers slugify the heading text by lowercasing it and replacing spaces with hyphens:

\`\`\`markdown
## Getting Started
... content ...

Jump to [Getting Started](#getting-started).
\`\`\`

If a heading appears more than once on the page, renderers usually disambiguate by suffixing \`-1\`, \`-2\`, etc.

## Linking Images

Combine link and image syntax to make a clickable image:

\`\`\`markdown
[![Live demo screenshot](./screenshot.png)](https://demo.example.com)
\`\`\`

## Common Mistakes

**1. Spaces in the URL.** Use percent-encoding: \`https://example.com/path%20with%20space\`. The renderer will not encode them for you.

**2. Markdown inside link text.** Bold and italic inside link text are usually parsed correctly, but nested links (a link inside a link) are not allowed — they will render incorrectly or strip the inner link.

**3. Forgetting the closing parenthesis when the URL itself contains parentheses.** Wikipedia URLs are a classic offender: \`https://en.wikipedia.org/wiki/Wiki_(disambiguation)\`. Use angle brackets to wrap such URLs:

\`\`\`markdown
[Wiki disambiguation page](<https://en.wikipedia.org/wiki/Wiki_(disambiguation)>)
\`\`\`

## PDF & Word Rendering Notes

- **PDF output** keeps every link clickable. The text is colored blue (\`#2563EB\` in our stylesheet) and underlined on hover. Tooltips from the title attribute are preserved if your PDF reader supports them — Acrobat and most modern browsers do, some lightweight viewers do not.
- **Word output** writes each Markdown link as a real Word hyperlink: the visible text is preserved, and the URL is stored as the hyperlink target so Ctrl-clicking in Word opens it. Visited-link color and underline follow Word's default style.
- **Anchor links** (\`#heading\`) work in HTML but **not** in PDF: PDFs do not preserve the original document's anchor names, only their physical positions. For cross-references inside a PDF, use page numbers or a static table of contents.

## Links From AI and Chat Exports

AI tools often summarize sources as plain text instead of real Markdown links, for example \`OpenAI docs: https://example.com\`. GitHub Flavored Markdown will usually auto-link the bare URL, but explicit Markdown links are cleaner in exported documents:

\`\`\`markdown
Read the [OpenAI docs](https://example.com) for the API reference.
\`\`\`

When you ask an AI model to produce a report, add a follow-up instruction such as "write every source as a Markdown link with descriptive link text." That reduces cleanup before PDF or Word export.

## Print-Friendly Link Text

Avoid vague labels such as "click here" or "this page." In a PDF, readers may print the document or read it without hovering, so the visible text should explain the destination:

- Good: \`[Google Search Console sitemap report](https://search.google.com/search-console)\`
- Weak: \`[click here](https://search.google.com/search-console)\`

If the URL itself is important, write it in the text after the link: \`Google Search Console (https://search.google.com/search-console)\`.

## Link Validation Checklist

Before exporting a long document, check:

1. Important external links open in a private browser window.
2. Mail links start with \`mailto:\` if the visible text is not already an email address.
3. URLs with parentheses are wrapped in angle brackets inside the Markdown link.
4. Internal anchor links are tested in HTML; for PDF, use section names or page numbers instead.

## Try It Yourself

Paste any document with links into the editor on the home page. The live preview shows the clickable result; export to PDF or Word to verify your links survived the round trip.`,
    faq: [
      { q: 'How do I open a link in a new tab?', a: 'Pure Markdown has no target attribute. The standard workaround is to inline an HTML <a target="_blank" rel="noopener"> tag — our renderer accepts that inside Markdown source.' },
      { q: 'Are anchor links case-sensitive?', a: 'The anchor slug generated from a heading is lowercase. Anchor references (#some-heading) are case-insensitive in most renderers but lowercasing them is safest.' },
      { q: 'Do links in the PDF show the actual URL?', a: 'By default the visible text is what you wrote, not the URL. If you want the URL printed, write it explicitly: e.g. "Vercel (https://vercel.com)". Many print-friendly templates do this automatically — ours does not, to keep the output clean for non-print use cases.' },
      { q: 'Why does my link text contain literal brackets in the output?', a: 'Usually because the renderer did not see a valid URL right after the closing bracket. Check for a missing opening parenthesis or a space between the bracket and the parenthesis.' },
    ],
    relatedSlugs: ['markdown-image', 'markdown-cheat-sheet'],
  },
  {
    slug: 'markdown-list',
    title: 'Markdown List — Ordered, Unordered, Nested, and Task Lists',
    description: 'Write Markdown lists: bullets, numbered lists, nested lists, and task lists — with notes on how each renders in PDF and Word.',
    readTime: 7,
    content: `## Unordered Lists

Any of \`-\`, \`*\`, or \`+\` at the start of a line creates a bullet item. Pick one and stick with it for consistency:

\`\`\`markdown
- First item
- Second item
- Third item
\`\`\`

**Result:**

- First item
- Second item
- Third item

Mixing markers in the same list is valid Markdown but visually noisy in the source — choose a marker per project and keep it consistent.

## Ordered Lists

A digit followed by a period (\`1.\`, \`2.\`) at the start of a line creates a numbered item:

\`\`\`markdown
1. First step
2. Second step
3. Third step
\`\`\`

Surprisingly, the **actual numbers in your source do not matter for rendering**. This is valid:

\`\`\`markdown
1. First step
1. Second step
1. Third step
\`\`\`

The renderer auto-numbers them as 1, 2, 3. Many writers use \`1.\` for every item so they can reorder lines without renumbering. The number of the **first** item, however, **is** respected — start with \`5.\` and the rendered list begins at 5.

## Nested Lists

Indent a sub-item by two spaces (or, in some flavors, four) to nest it. You can mix ordered and unordered:

\`\`\`markdown
1. Pre-flight checks
   - Build passes
   - Tests pass
2. Deploy
   - Push to main
   - Verify on staging
3. Smoke test
\`\`\`

**Result:**

1. Pre-flight checks
   - Build passes
   - Tests pass
2. Deploy
   - Push to main
   - Verify on staging
3. Smoke test

Keep indentation consistent across the whole list. Mismatched spacing is the single most common reason lists "look weird" in the output.

## Task Lists (GFM)

GitHub Flavored Markdown adds a checkbox syntax. Use \`- [ ]\` for an unchecked item and \`- [x]\` for a completed one:

\`\`\`markdown
- [x] Draft the privacy policy
- [x] Add ads.txt
- [ ] Submit for AdSense review
- [ ] Wire up actual ad units after approval
\`\`\`

**Result:**

- [x] Draft the privacy policy
- [x] Add ads.txt
- [ ] Submit for AdSense review
- [ ] Wire up actual ad units after approval

Our converter supports task lists in both PDF and Word output. The checkboxes are static (not interactive) in the exported files.

## Continuation Paragraphs

To attach a follow-on paragraph to a list item without ending the list, indent the paragraph by the same amount as the item content (usually four spaces or one tab):

\`\`\`markdown
1. First step.

   A second paragraph explaining the first step. Notice the four-space
   indentation that aligns this paragraph with the item text.

2. Second step.
\`\`\`

A blank line between the list item and the continuation is required.

## Common Mistakes

**1. No blank line before the list.** Some renderers require a blank line between a regular paragraph and the start of a list. If your list "becomes" part of the previous paragraph, add a blank line above it.

**2. Forgetting the space after the marker.** \`-Item\` does not start a list; \`- Item\` does.

**3. Inconsistent nesting.** Indenting some items by two spaces and others by four breaks the hierarchy. Pick one and apply it consistently inside the same list.

**4. Auto-numbering surprises.** If you start a list with \`5.\` you might mean to begin at 5, but if the previous list ended at item 4 some flavors treat the new list as a continuation. Insert a non-list line between them to be explicit.

## PDF & Word Rendering Notes

- **PDF output** uses the default \`github-markdown-css\` list styling: bullets for unordered lists, decimal numbering for ordered lists, hierarchical indentation for nested lists. Task list checkboxes render as native HTML checkboxes (filled for \`[x]\`, empty for \`[ ]\`).
- **Word output** has a specific quirk worth understanding. Earlier versions of the converter used \`docx\`'s built-in numbering feature, which has a subtle problem: every Markdown list shared the same numbering reference, so the second ordered list in a document continued from where the first one left off (\`5, 6, 7\` instead of \`1, 2, 3\`). The current converter writes ordered list numbers as **literal text** — \`1. \`, \`2. \`, \`3. \` are inserted directly into the paragraph — so every Markdown list restarts at 1 (or at whatever \`start\` value you used) and behaves as you would expect in Word and WPS.
- **Unordered list bullets** in Word use \`docx\`'s bullet style at level 0. Nested unordered lists currently flatten to the same level — full nested bullet hierarchy in Word is a known limitation; nested ordered lists work as expected because the explicit-number approach extends naturally to nested numbering.

## Lists in AI-Generated Drafts

AI tools love lists, but they often mix purposes: a paragraph starts as a bullet list, then becomes a numbered procedure, then ends with task-list checkboxes. Before export, normalize the list type:

- Use **ordered lists** for steps that must happen in sequence.
- Use **unordered lists** for options, features, or non-sequential points.
- Use **task lists** only when completion state matters.

This makes the exported PDF easier to scan and makes the Word document easier to edit later.

## Spacing for Readable PDFs

Dense lists save space, but a PDF with ten nested levels is hard to read. If a list item needs more than two sentences, consider turning it into a subsection with a heading. If a nested list goes deeper than three levels, split it into multiple smaller lists.

For checklists, keep each item action-oriented: "Configure support email" is better than "Email." The checkbox then communicates status and the text communicates the task.

## When a Table Is Better Than a List

Lists are ideal for sequence and hierarchy. Tables are better when every item has the same fields, such as feature, status, owner, and due date. If each bullet starts repeating the same labels, convert the list into a Markdown table before exporting.

## Try It Yourself

Try converting a real task list or step-by-step guide on the home page. Compare the PDF and Word outputs side by side — both faithfully preserve the structure, with the small caveats noted above.`,
    faq: [
      { q: 'Can I start an ordered list at a number other than 1?', a: 'Yes — the number of the first item is respected by the renderer. Writing 5. as the first item starts numbering at 5.' },
      { q: 'How deeply can I nest lists?', a: 'There is no hard limit in the Markdown spec, but past 3-4 levels readability suffers. Most renderers handle 5-6 levels gracefully.' },
      { q: 'Why are my task list checkboxes not rendering?', a: 'Task lists are a GitHub Flavored Markdown extension. Make sure your renderer enables GFM — ours does by default. Also note that the syntax requires a space inside the brackets: - [ ] and - [x] (with a lowercase x).' },
      { q: 'Do nested ordered lists number correctly in Word?', a: 'Yes. The converter writes the number as literal text (1. 1.1. 1.1.1.) so nesting is preserved and each list still restarts cleanly. Earlier versions had a bug where lists shared numbering state — that has been fixed.' },
    ],
    relatedSlugs: ['markdown-table', 'markdown-cheat-sheet'],
  },
  {
    slug: 'markdown-to-pdf-best-practices',
    title: 'Markdown to PDF Best Practices — Clean Exports from AI Text',
    description: 'Practical rules for exporting Markdown to PDF: structure, headings, tables, code blocks, images, page breaks, and final checks.',
    readTime: 7,
    content: `## Start With a Document Outline

The cleanest PDF exports start with clean Markdown. Before worrying about fonts or margins, make sure the document has a simple outline:

\`\`\`markdown
# Document title

Short summary or introduction.

## Section one

Body text.

## Section two

- Key point
- Key point

## Appendix
\`\`\`

Use one \`#\` heading for the document title, then \`##\` and \`###\` for structure. This gives the browser print engine predictable blocks to lay out and makes the exported PDF easier to scan.

## Keep Paragraphs and Lists Separate

Markdown needs blank lines between paragraphs, headings, lists, tables, and code blocks. If a list sticks to the paragraph above it, or a table renders as plain text, the missing blank line is usually the cause.

For AI-generated text, scan for long paragraphs that were hard-wrapped at 80 columns. A single newline is not a paragraph break in Markdown; use a blank line between real paragraphs.

## Tables: Prefer Narrow and Focused

Tables are often the first thing to break in a PDF because pages are narrower than screens. Use Markdown tables for compact, structured data:

- 3-5 columns is comfortable.
- Long explanations should move below the table.
- Use right alignment for numeric columns.
- Use \`<br>\` inside a cell only when a short two-line label is clearer than one long line.

If a table has eight columns, merged cells, formulas, or filtering, it probably belongs in a spreadsheet or a Word document rather than a PDF-first Markdown export.

## Images: Use Reachable URLs

PDF export can only include images that the browser can load. Public HTTPS URLs work best. Private chat attachments, local file paths, and login-protected document images often fail once the export iframe tries to load them.

Before exporting a document that depends on images, open each image URL in a private browser window. If it does not load there, replace it or write a caption instead.

## Code Blocks: Add Language Hints

For code-heavy documents, always use fenced blocks and a language hint:

\`\`\`\`markdown
\`\`\`ts
const ok = true;
\`\`\`
\`\`\`\`

Language hints make the preview easier to read and keep the source self-documenting. Long lines wrap in PDF output, so trim examples to the important part instead of pasting entire production files.

## Page Break Reality

Browser-based PDF export does not give you the same page-control features as InDesign or Microsoft Word. You should expect automatic page breaks based on content height. Keep sections short, avoid huge images, and split long tables if you want predictable pagination.

If exact page breaks, repeated table headers, or formal corporate templates are required, export to Word first and finish pagination there.

## Final Export Checklist

Before you open the print dialog:

1. Check the live preview for broken tables, unclosed code fences, and missing images.
2. Remove YAML frontmatter or metadata blocks that should not appear in the PDF.
3. Verify important links by opening them in a private browser window.
4. Pick "Save as PDF" in the browser print dialog and review the preview pane before saving.

## Privacy Note

The converter runs in your browser. Your Markdown text does not need to be uploaded to a server for PDF, Word, or HTML export. That is useful for drafts, client notes, internal specs, and AI-generated reports that should stay on your device.`,
    faq: [
      { q: 'Why does my PDF look different from the live preview?', a: 'The preview is HTML and the PDF is produced by the browser print engine. They should be close, but browser print settings, margins, headers, footers, and page breaks can change the final result.' },
      { q: 'Can I force a page break in Markdown?', a: 'Standard Markdown has no page-break syntax. Some HTML/CSS tricks work in specific renderers, but for reliable manual pagination use Word after export.' },
      { q: 'What is the best Markdown structure for PDF?', a: 'Use one H1 title, H2 section headings, short paragraphs, focused lists, narrow tables, and fenced code blocks with language hints.' },
      { q: 'Should I export AI text to PDF or Word?', a: 'Use PDF when the text is ready to share. Use Word if someone still needs to edit, comment, or apply a formal template.' },
    ],
    relatedSlugs: ['export-chatgpt-markdown-to-pdf', 'markdown-table', 'markdown-code-block'],
  },
  {
    slug: 'export-chatgpt-markdown-to-pdf',
    title: 'Export ChatGPT Markdown to PDF — Copy, Clean, and Save',
    description: 'Turn ChatGPT Markdown into a clean PDF. Learn what to copy, what to clean, and how tables, links, code blocks, and images behave.',
    readTime: 6,
    content: `## Why ChatGPT Output Works Well as Markdown

ChatGPT often writes answers using headings, bullet lists, tables, code fences, and links. That is already close to Markdown, which makes it easy to turn a response into a PDF for sharing, archiving, or sending to a client.

The best workflow is simple: copy the response, paste it into the converter, inspect the live preview, then open the browser print dialog and choose "Save as PDF".

## Step-by-Step Workflow

1. Ask ChatGPT for the answer in Markdown format.
2. Copy only the final response, not the surrounding chat UI.
3. Paste the text into the editor.
4. Fix headings, tables, code fences, or placeholder links if the preview shows problems.
5. Click the PDF conversion button, review the print preview, and save as PDF.

For reports, ask ChatGPT to start with a single \`#\` title and use \`##\` for sections. That produces a cleaner exported document than a loose list of bullets.

## Prompt That Produces Cleaner Markdown

Try adding this instruction to your prompt:

\`\`\`text
Write the answer in clean GitHub Flavored Markdown.
Use one H1 title, H2 section headings, short paragraphs, and Markdown tables only when tabular data is useful.
Use fenced code blocks with language identifiers.
Do not include placeholder image links.
\`\`\`

This reduces the cleanup you need to do before exporting.

## Common Cleanup Tasks

**Remove chat artifacts.** Chat responses sometimes include labels such as "Sure — here is the report:" or a closing offer to continue. Delete those if they do not belong in the PDF.

**Fix tables.** If a table looks broken, count the pipe characters in each row. Every row needs the same number of cells as the header.

**Close code fences.** A missing closing triple backtick can turn the rest of the document into one large code block.

**Replace fake links.** ChatGPT may output examples such as \`https://example.com\` or invented source links. Verify real URLs before exporting a public document.

## Tables, Code, and Images

Markdown tables from ChatGPT usually export well when they are narrow. If the table is wide, split it into smaller tables or export to Word for final layout.

Code blocks should include a language hint such as \`js\`, \`python\`, \`bash\`, or \`json\`. This keeps the source clear and improves the preview.

Image references in ChatGPT output are often placeholders. If the image URL is not real and reachable, the PDF cannot include it. Use public HTTPS images or remove the image line.

## Privacy and Local Conversion

Pasting ChatGPT output into the converter does not send that Markdown to a server for conversion. The preview and export run in your browser. That matters when the response contains internal notes, drafts, or client-facing work that you do not want to upload again.

## When to Choose Word Instead

PDF is best for a finished response. Choose Word when the ChatGPT output still needs track changes, manual page breaks, a corporate template, or table editing. You can also export to Word first, clean the document there, and then save the final version as PDF from Word.`,
    faq: [
      { q: 'Can I export a ChatGPT answer directly to PDF?', a: 'Yes. Copy the Markdown-style answer, paste it into the converter, check the preview, then use the PDF conversion flow and save from the browser print dialog.' },
      { q: 'Why did my ChatGPT table break?', a: 'The usual cause is a row with too many or too few pipe characters. Every body row must match the header column count.' },
      { q: 'Is pasted ChatGPT content uploaded?', a: 'No. The conversion runs in your browser, so the Markdown text does not need to leave your device.' },
      { q: 'What should I ask ChatGPT for before exporting?', a: 'Ask for clean GitHub Flavored Markdown with one H1, H2 sections, fenced code blocks, and no placeholder image links.' },
    ],
    relatedSlugs: ['markdown-to-pdf-best-practices', 'markdown-new-line', 'markdown-table'],
  },
  {
    slug: 'markdown-vs-word',
    title: 'Markdown vs Word — When to Use Each Writing Format',
    description: 'Compare Markdown and Microsoft Word for drafting, editing, sharing, PDF export, tables, images, and collaboration.',
    readTime: 6,
    content: `## The Short Version

Markdown is best for fast drafting, structured plain text, developer documentation, AI-generated reports, and content that needs to move between tools. Word is best for formal editing, comments, tracked changes, precise pagination, corporate templates, and final documents that require manual layout.

You do not have to choose one forever. A practical workflow is: write in Markdown, export to Word when collaboration or final formatting begins, and save the final version as PDF when the content is locked.

## Where Markdown Wins

Markdown is plain text. That gives it several advantages:

- It is easy to copy from ChatGPT, Claude, GitHub, notes apps, and code editors.
- It keeps headings, lists, links, code blocks, and tables readable even before rendering.
- It works well with version control because diffs are text-based.
- It avoids hidden formatting that can accumulate in rich-text editors.
- It is fast for structured drafts where content matters more than visual design.

For technical writing, product specs, release notes, knowledge-base articles, and AI-generated summaries, Markdown is often the better starting point.

## Where Word Wins

Word is a layout and review tool. It is stronger when you need:

- Comments and tracked changes.
- Manual page breaks and section breaks.
- Headers, footers, page numbers, and repeated table headers.
- Corporate templates and legal formatting.
- Advanced tables with merged cells, formulas, or precise column widths.
- Offline review by non-technical stakeholders.

If the final deliverable must match a formal template, do the drafting in Markdown if it helps, but finish in Word.

## PDF Export Differences

Markdown-to-PDF export uses the browser print engine. It is fast and good for clean documents, but page breaks are automatic and depend on the browser print settings.

Word-to-PDF export gives more manual layout control. You can force page breaks, repeat table headers, tune margins, and review pagination before saving.

Use Markdown-to-PDF for speed. Use Word-to-PDF for documents where pagination itself is part of the deliverable.

## Tables, Images, and Code

Markdown tables are excellent for compact comparisons and simple data. Word tables are better for merged cells, multi-page tables, and manually tuned widths.

Markdown image syntax is clean, but PDF export requires the image URL to be reachable. Word is better if you need to embed and resize local images manually.

Markdown is clearly better for code blocks. Fenced blocks with language hints are readable in source and render predictably. Word can display code, but it is more work to maintain.

## Recommended Workflow

1. Draft in Markdown for speed and clean structure.
2. Use the live preview to catch syntax issues.
3. Export to PDF for immediate sharing, or export to Word if review and final formatting are still needed.
4. If the document becomes layout-heavy, stop editing the Markdown source and finish in Word.

That boundary is important. Markdown is a writing format, not a full desktop publishing system.`,
    faq: [
      { q: 'Is Markdown better than Word?', a: 'Markdown is better for structured plain-text drafting and technical content. Word is better for final formatting, comments, tracked changes, and precise layout.' },
      { q: 'Can I convert Markdown to Word and keep editing?', a: 'Yes. The Word export is useful when the Markdown draft is ready for review, comments, or template formatting.' },
      { q: 'Which format is better for PDF export?', a: 'Markdown-to-PDF is faster for clean documents. Word-to-PDF is better when you need exact page breaks, headers, footers, or formal templates.' },
      { q: 'Should AI-generated reports start in Markdown?', a: 'Usually yes. AI tools produce headings, lists, tables, and code blocks naturally, which makes Markdown a good intermediate format.' },
    ],
    relatedSlugs: ['markdown-to-pdf-best-practices', 'markdown-list', 'markdown-table'],
  },
  {
    slug: 'markdown-frontmatter',
    title: 'Markdown Frontmatter — YAML Metadata Explained',
    description: 'Learn what Markdown frontmatter is, where YAML metadata is used, and what to do with it before exporting Markdown to PDF or Word.',
    readTime: 5,
    content: `## What Is Frontmatter?

Frontmatter is a metadata block placed at the very top of a Markdown file. It is most often written in YAML and surrounded by triple dashes:

\`\`\`markdown
---
title: Markdown to PDF Best Practices
description: Export clean PDFs from Markdown
date: 2026-05-26
tags:
  - markdown
  - pdf
---

# Markdown to PDF Best Practices

Document body starts here.
\`\`\`

The metadata is not usually meant to be visible content. Static-site generators, documentation tools, and blog engines read it to set titles, descriptions, dates, tags, authors, layouts, and canonical URLs.

## Common Frontmatter Fields

You will often see fields like:

- \`title\` — page title used by the site or CMS.
- \`description\` — SEO or summary text.
- \`date\` or \`updated\` — publish and update timestamps.
- \`author\` — author name or profile reference.
- \`tags\` or \`categories\` — grouping fields.
- \`draft\` — whether a page should be published.
- \`slug\` — the public URL path.

There is no universal required set. Each tool defines its own schema.

## YAML Rules That Matter

YAML is whitespace-sensitive. Use spaces, not tabs. Keep indentation consistent. Quote values when they contain colons, leading special characters, or ambiguous dates.

\`\`\`yaml
title: "Markdown: PDF Export Notes"
draft: false
tags:
  - markdown
  - export
\`\`\`

If a frontmatter block fails to parse in a static-site generator, the page may not build. For plain PDF export, the main issue is simpler: metadata may appear as visible text if your renderer does not treat it specially.

## Frontmatter and PDF/Word Export

This converter is designed for visible document content. If you paste a Markdown file that starts with frontmatter, remove the metadata block before exporting unless you actually want those lines in the output.

For a polished PDF, convert useful metadata into visible content:

\`\`\`markdown
# Markdown to PDF Best Practices

Updated: May 26, 2026
Author: Markdown to PDF
\`\`\`

That reads naturally in a PDF or Word document and avoids leaking internal CMS fields such as \`draft\`, \`slug\`, or private tags.

## When to Keep Frontmatter

Keep frontmatter when the Markdown file is going back into a blog, docs site, static-site generator, or CMS. Remove or rewrite it when the file is becoming a standalone PDF, Word document, email, or handout.

If you are not sure, ask: "Will the reader need to see this line?" If the answer is no, it probably belongs in frontmatter for a website, not in an exported document.`,
    faq: [
      { q: 'Is frontmatter part of standard Markdown?', a: 'No. It is a common convention used by static-site generators and CMS tools, but it is not part of the original Markdown syntax.' },
      { q: 'Should I keep frontmatter when exporting to PDF?', a: 'Usually no. Remove it or convert important fields into visible document text such as title, author, and updated date.' },
      { q: 'Why does my frontmatter show up in the PDF?', a: 'Because the renderer treated it as ordinary Markdown instead of metadata. Delete the frontmatter block before exporting if it should not be visible.' },
      { q: 'Can frontmatter include arrays?', a: 'Yes. YAML supports arrays, usually written as indented dash items under a field such as tags.' },
    ],
    relatedSlugs: ['markdown-cheat-sheet', 'markdown-to-pdf-best-practices', 'markdown-code-block'],
  },
];

export const GUIDE_TRANSLATED_LANGS = new Set(['en', 'zh']);

function normalizeGuideLang(lang: string): 'en' | 'zh' {
  return GUIDE_TRANSLATED_LANGS.has(lang) && lang === 'zh' ? 'zh' : 'en';
}

export function getGuides(lang = 'en'): GuideData[] {
  return normalizeGuideLang(lang) === 'zh' ? ZH_GUIDES : GUIDES;
}

export function getGuideBySlug(slug: string, lang = 'en'): GuideData | undefined {
  return getGuides(lang).find((g) => g.slug === slug) || GUIDES.find((g) => g.slug === slug);
}

export function guideHref(lang: string, slug: string): string {
  const targetLang = normalizeGuideLang(lang);
  return `/${targetLang}/guides/${slug}`;
}

export function guidesIndexHref(lang: string): string {
  const targetLang = normalizeGuideLang(lang);
  return `/${targetLang}/guides`;
}

export function getRelatedGuides(currentSlug: string, lang = 'en'): GuideData[] {
  const current = getGuideBySlug(currentSlug, lang);
  if (!current) return [];
  return current.relatedSlugs
    .map((s) => getGuideBySlug(s, lang))
    .filter((g): g is GuideData => !!g);
}
