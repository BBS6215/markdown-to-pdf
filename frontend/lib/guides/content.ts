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

## Try It Yourself

Use the editor below to experiment with different line break methods:`,
    faq: [
      { q: 'Why doesn\'t pressing Enter work in Markdown?', a: 'Markdown treats single line breaks as spaces. This is by design — it allows you to wrap long lines in your source without affecting the output. Use a blank line or two trailing spaces for actual line breaks.' },
      { q: 'What\'s the difference between a line break and a new paragraph?', a: 'A line break (<br>) keeps text in the same paragraph with minimal spacing. A new paragraph (blank line) creates a larger gap between blocks of text.' },
      { q: 'Do AI tools like ChatGPT use proper Markdown line breaks?', a: 'Usually yes — ChatGPT and Claude typically use blank lines between paragraphs. But if you copy from the chat interface, formatting may be lost. Just paste into our converter and it will handle it.' },
    ],
    relatedSlugs: ['markdown-quote', 'markdown-cheat-sheet'],
  },
  {
    slug: 'markdown-quote',
    title: 'Markdown Quote — How to Create Block Quotes',
    description: 'Learn how to create block quotes, nested quotes, and cited text in Markdown.',
    readTime: 4,
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

## Try It Yourself

Experiment with block quotes in the editor below:`,
    faq: [
      { q: 'Can I nest quotes inside quotes?', a: 'Yes! Use >> for level 2 nesting, >>> for level 3, and so on. Most renderers support at least 3 levels of nesting.' },
      { q: 'Can I put code blocks inside quotes?', a: 'Yes, you can put any Markdown element inside a quote, including code blocks, lists, and headings. Just prefix each line with >.' },
      { q: 'How do I attribute a quote to someone?', a: 'Markdown doesn\'t have a built-in citation syntax. The common convention is to add a dash and the author name: > "Quote text" — Author Name' },
    ],
    relatedSlugs: ['markdown-new-line', 'markdown-cheat-sheet'],
  },
  {
    slug: 'markdown-cheat-sheet',
    title: 'Markdown Cheat Sheet — Complete Syntax Reference 2026',
    description: 'Complete Markdown syntax reference with examples for headings, links, images, tables, code, and more.',
    readTime: 6,
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

## Try It Yourself

Use the editor below to test any Markdown syntax:`,
    faq: [
      { q: 'What is GitHub Flavored Markdown (GFM)?', a: 'GFM is an extension of standard Markdown used by GitHub. It adds support for tables, task lists, strikethrough, and auto-linked URLs. Our converter fully supports GFM.' },
      { q: 'Can I use HTML in Markdown?', a: 'Yes, most Markdown renderers support inline HTML. For example, you can use <br> for line breaks or <details> for collapsible sections.' },
      { q: 'How do I create a table of contents?', a: 'Markdown doesn\'t have built-in TOC support, but many tools generate one automatically from headings. In our converter, headings are rendered with proper hierarchy for easy navigation.' },
      { q: 'What\'s the maximum heading level?', a: 'Markdown supports 6 heading levels (# through ######), corresponding to HTML h1 through h6.' },
      { q: 'Can I embed images from URLs?', a: 'Yes, use the syntax ![alt text](image-url). The image will be embedded in PDF output if accessible.' },
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

## Try It Yourself

Use the editor on the home page to paste a real table from your notes — the live preview shows exactly how it will look in the PDF or Word export.`,
    faq: [
      { q: 'Why does my table look broken in the preview?', a: 'The most common cause is a missing or malformed divider row. Make sure the second line of the table is dashes separated by pipes, with at least three dashes per column.' },
      { q: 'Can I have multi-line content in a single cell?', a: 'Pure Markdown table syntax does not support it. The standard workaround is an inline <br> HTML tag where you need the line break. Our renderer accepts <br> inside cells in both PDF and Word output.' },
      { q: 'How wide can a table be in PDF output?', a: 'Tables auto-fit the printable page width. If you have many columns or long content, cells wrap and the text becomes smaller. For very wide tables, consider exporting to Word instead and adjusting column widths there.' },
      { q: 'Are tables sortable in the PDF?', a: 'No — PDFs are static documents, not interactive spreadsheets. If you need sortable data, the HTML export or a real spreadsheet is a better fit.' },
    ],
    relatedSlugs: ['markdown-list', 'markdown-cheat-sheet'],
  },
  {
    slug: 'markdown-image',
    title: 'Markdown Image — Syntax, Alt Text, and PDF/Word Output',
    description: 'Embed images in Markdown with alt text, titles, and reference syntax — plus how they behave when exported to PDF or Word.',
    readTime: 6,
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
    readTime: 6,
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
    readTime: 6,
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
    readTime: 6,
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
];

export function getGuideBySlug(slug: string): GuideData | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

/**
 * Languages whose guide content has been translated. When a UI surface
 * (footer, recommendation cards, guide index) wants to link to a guide,
 * it should call guideHref(lang, slug) instead of constructing the URL
 * directly — that way visitors on `/zh/*` never get pushed into a
 * noindex `/zh/guides/<slug>` page whose body is still in English.
 *
 * Add 'zh' to this set when /zh/guides/* is properly translated; the
 * noindex flag in lib/seo/metadata.ts also needs to be lifted at the
 * same time so search engines can pick the pages back up.
 */
export const GUIDE_TRANSLATED_LANGS = new Set(['en']);

export function guideHref(lang: string, slug: string): string {
  const targetLang = GUIDE_TRANSLATED_LANGS.has(lang) ? lang : 'en';
  return `/${targetLang}/guides/${slug}`;
}

export function guidesIndexHref(lang: string): string {
  const targetLang = GUIDE_TRANSLATED_LANGS.has(lang) ? lang : 'en';
  return `/${targetLang}/guides`;
}

export function getRelatedGuides(currentSlug: string): GuideData[] {
  const current = getGuideBySlug(currentSlug);
  if (!current) return [];
  return current.relatedSlugs
    .map((s) => getGuideBySlug(s))
    .filter((g): g is GuideData => !!g);
}
