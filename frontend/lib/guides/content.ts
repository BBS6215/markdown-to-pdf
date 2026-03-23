/**
 * Guide content data — 3 guides (800-1500 words English).
 * Source: 01-主线 §6.4, 02-SEO策略 §4 (markdown-new-line KD22, markdown-quote KD22, cheat-sheet KD43)
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
    title: 'Markdown New Line — How to Add Line Breaks',
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
    title: 'Markdown Cheat Sheet — Complete Syntax Reference',
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
];

export function getGuideBySlug(slug: string): GuideData | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function getRelatedGuides(currentSlug: string): GuideData[] {
  const current = getGuideBySlug(currentSlug);
  if (!current) return [];
  return current.relatedSlugs
    .map((s) => getGuideBySlug(s))
    .filter((g): g is GuideData => !!g);
}
