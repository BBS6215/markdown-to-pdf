/**
 * SEO metadata configuration for all pages.
 * Source: 02-SEO策略 附录 C (TDK), 05-技术方案 §9.1
 * Rule: Title MUST contain "Markdown (.md)" to avoid MD disambiguation (07 §11.2 S1)
 */

import type { Metadata } from 'next';

const SITE_URL = 'https://markdown-to-pdf.app';

type PageKey =
  | 'home'
  | 'toWord'
  | 'toHtml'
  | 'guides'
  | 'guideNewLine'
  | 'guideQuote'
  | 'guideCheatSheet'
  | 'guideTable'
  | 'guideImage'
  | 'guideCodeBlock'
  | 'guideLink'
  | 'guideList'
  | 'guidePdfBestPractices'
  | 'guideChatgptExport'
  | 'guideMarkdownVsWord'
  | 'guideFrontmatter'
  | 'pricing'
  | 'privacy'
  | 'terms'
  | 'about'
  | 'contact'
  | 'login'
  | 'dashboard';

interface PageMeta {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}

const META: Record<string, Record<PageKey, PageMeta>> = {
  en: {
    home: { title: 'Markdown (.md) to PDF Converter — Free Online Tool', description: 'Free online Markdown to PDF converter. Paste from ChatGPT, Claude, or any AI tool and download instantly — no signup required.', path: '/en' },
    toWord: { title: 'Markdown (.md) to Word Converter — Free Online Tool', description: 'Convert Markdown to Word (.docx) documents for free. Perfect for AI outputs from ChatGPT and Claude.', path: '/en/to-word' },
    toHtml: { title: 'Markdown (.md) to HTML Converter — Free Online Tool', description: 'Convert Markdown to clean HTML in your browser. 100% client-side, your data never leaves your device.', path: '/en/to-html' },
    guides: { title: 'Markdown Guides — Learn Markdown Syntax', description: 'Interactive Markdown guides with live editors. Learn newlines, quotes, and all Markdown syntax.', path: '/en/guides' },
    guideNewLine: { title: 'Markdown New Line — How to Add Line Breaks (with Examples)', description: 'Learn how to create new lines and line breaks in Markdown. Interactive examples and common mistakes.', path: '/en/guides/markdown-new-line' },
    guideQuote: { title: 'Markdown Quote — How to Create Block Quotes in Markdown', description: 'Learn how to create block quotes and nested quotes in Markdown with interactive examples.', path: '/en/guides/markdown-quote' },
    guideCheatSheet: { title: 'Markdown Cheat Sheet — Complete Syntax Reference 2026', description: 'Complete Markdown syntax reference with examples. Headings, links, images, tables, code blocks, and more.', path: '/en/guides/markdown-cheat-sheet' },
    guideTable: { title: 'Markdown Table — Syntax, Alignment, and PDF/Word Rendering', description: 'Learn Markdown table syntax with column alignment, multi-line content, and tips for clean PDF and Word export.', path: '/en/guides/markdown-table' },
    guideImage: { title: 'Markdown Image — Syntax, Alt Text, and PDF/Word Output', description: 'Embed images in Markdown with alt text, titles, and reference syntax — plus how they render when exported to PDF or Word.', path: '/en/guides/markdown-image' },
    guideCodeBlock: { title: 'Markdown Code Block — Fenced, Indented, and Inline Code', description: 'Master Markdown code blocks: fenced blocks with language hints, indented blocks, inline code, and PDF rendering tips.', path: '/en/guides/markdown-code-block' },
    guideLink: { title: 'Markdown Link — Inline, Reference, and Autolink Syntax', description: 'Every way to write links in Markdown: inline, reference, autolink, anchor, and email — plus how they render in PDF.', path: '/en/guides/markdown-link' },
    guideList: { title: 'Markdown List — Ordered, Unordered, Nested, and Task Lists', description: 'Write Markdown lists: bullets, numbered lists, nested lists, and task lists — with notes on how each renders in PDF and Word.', path: '/en/guides/markdown-list' },
    guidePdfBestPractices: { title: 'Markdown to PDF Best Practices — Clean PDF Export Guide', description: 'Export cleaner PDFs from Markdown with practical rules for headings, tables, code blocks, images, page breaks, and final checks.', path: '/en/guides/markdown-to-pdf-best-practices' },
    guideChatgptExport: { title: 'Export ChatGPT Markdown to PDF — Copy, Clean, and Save', description: 'Turn ChatGPT Markdown into a clean PDF. Learn what to copy, what to fix, and how tables, links, code blocks, and images behave.', path: '/en/guides/export-chatgpt-markdown-to-pdf' },
    guideMarkdownVsWord: { title: 'Markdown vs Word — When to Use Each Writing Format', description: 'Compare Markdown and Microsoft Word for drafting, editing, sharing, PDF export, tables, images, and collaboration.', path: '/en/guides/markdown-vs-word' },
    guideFrontmatter: { title: 'Markdown Frontmatter — YAML Metadata Explained', description: 'Learn what Markdown frontmatter is, where YAML metadata is used, and what to do with it before exporting to PDF or Word.', path: '/en/guides/markdown-frontmatter' },
    pricing: { title: 'Pricing — Markdown to PDF', description: 'Markdown to PDF is free to use. PDF, Word, and HTML conversion run in your browser, subject to your device memory and browser limits.', path: '/en/pricing' },
    privacy: { title: 'Privacy Policy — Markdown to PDF', description: 'Privacy policy for markdown-to-pdf.app.', path: '/en/privacy' },
    terms: { title: 'Terms of Service — Markdown to PDF', description: 'Terms of service for markdown-to-pdf.app.', path: '/en/terms' },
    about: { title: 'About — Markdown to PDF', description: 'A free browser-based Markdown converter built for people pasting Markdown out of ChatGPT, Claude, and other AI tools. No content upload required.', path: '/en/about' },
    contact: { title: 'Contact — Markdown to PDF', description: 'Reach the team behind Markdown to PDF. Bug reports, feature requests, privacy, partnerships — one inbox.', path: '/en/contact' },
    login: { title: 'Login — Markdown to PDF', description: 'Log in or sign up for Markdown to PDF.', path: '/en/auth/login', noindex: true },
    dashboard: { title: 'Dashboard — Markdown to PDF', description: 'View your conversion history.', path: '/en/dashboard', noindex: true },
  },
  zh: {
    home: { title: '在线 Markdown (.md) 转 PDF — 免费工具', description: '免费将 Markdown 或 AI 生成文本转换为专业 PDF。支持 ChatGPT、Claude 等 AI 工具输出。', path: '/zh' },
    toWord: { title: '在线 Markdown (.md) 转 Word — 免费工具', description: '免费将 Markdown 转为 Word (.docx) 文档。', path: '/zh/to-word' },
    toHtml: { title: '在线 Markdown (.md) 转 HTML — 免费工具', description: '在浏览器中将 Markdown 转为 HTML，数据不离开设备。', path: '/zh/to-html' },
    guides: { title: 'Markdown 指南 — 学习 Markdown 语法', description: '交互式 Markdown 指南，含实时编辑器。', path: '/zh/guides' },
    guideNewLine: { title: 'Markdown 换行 — 如何添加换行（附示例）', description: '学习如何在 Markdown 中创建换行。', path: '/zh/guides/markdown-new-line' },
    guideQuote: { title: 'Markdown 引用 — 如何创建引用块', description: '学习如何在 Markdown 中创建引用。', path: '/zh/guides/markdown-quote' },
    guideCheatSheet: { title: 'Markdown 速查表 — 完整语法参考 2026', description: '完整的 Markdown 语法参考。', path: '/zh/guides/markdown-cheat-sheet' },
    guideTable: { title: 'Markdown 表格 — 语法、对齐与 PDF/Word 渲染', description: 'Markdown 表格语法、列对齐方式，以及导出 PDF 和 Word 时的渲染说明。', path: '/zh/guides/markdown-table' },
    guideImage: { title: 'Markdown 图片 — 语法、alt 文本与 PDF/Word 输出', description: 'Markdown 图片插入方式：alt 文本、标题、引用式语法，以及在 PDF / Word 输出中的表现。', path: '/zh/guides/markdown-image' },
    guideCodeBlock: { title: 'Markdown 代码块 — 围栏式、缩进式与行内代码', description: 'Markdown 代码块的全部语法：围栏式、语言提示、缩进式、行内代码，以及 PDF 渲染细节。', path: '/zh/guides/markdown-code-block' },
    guideLink: { title: 'Markdown 链接 — 行内、引用与 autolink 语法', description: 'Markdown 中所有写链接的方式：行内、引用、autolink、锚点和邮箱，以及在 PDF 中的渲染表现。', path: '/zh/guides/markdown-link' },
    guideList: { title: 'Markdown 列表 — 有序、无序、嵌套与任务列表', description: 'Markdown 列表写法：项目符号、有序编号、嵌套、任务列表，以及在 PDF 和 Word 中的渲染说明。', path: '/zh/guides/markdown-list' },
    guidePdfBestPractices: { title: 'Markdown 转 PDF 最佳实践 — 干净导出指南', description: 'Markdown 导出 PDF 的实用规则：标题、表格、代码块、图片、分页和导出前检查。', path: '/zh/guides/markdown-to-pdf-best-practices' },
    guideChatgptExport: { title: '将 ChatGPT Markdown 导出为 PDF — 复制、清理与保存', description: '把 ChatGPT 输出的 Markdown 转为干净 PDF：复制什么、清理什么，以及表格、链接、代码块和图片处理。', path: '/zh/guides/export-chatgpt-markdown-to-pdf' },
    guideMarkdownVsWord: { title: 'Markdown vs Word — 什么时候用哪种写作格式', description: '比较 Markdown 和 Word 在起草、编辑、分享、PDF 导出、表格、图片和协作方面的差异。', path: '/zh/guides/markdown-vs-word' },
    guideFrontmatter: { title: 'Markdown Frontmatter — YAML 元数据说明', description: '了解 Markdown frontmatter 是什么、YAML 元数据在哪里使用，以及导出 PDF 或 Word 前如何处理。', path: '/zh/guides/markdown-frontmatter' },
    pricing: { title: '定价 — Markdown 转 PDF', description: 'Markdown 转 PDF 可免费使用。PDF、Word 和 HTML 转换在浏览器内运行，受设备内存和浏览器能力限制。', path: '/zh/pricing' },
    privacy: { title: '隐私政策 — Markdown 转 PDF', description: 'markdown-to-pdf.app 隐私政策。', path: '/zh/privacy' },
    terms: { title: '服务条款 — Markdown 转 PDF', description: 'markdown-to-pdf.app 服务条款。', path: '/zh/terms' },
    about: { title: '关于我们 — Markdown 转 PDF', description: '一个在浏览器中运行的免费 Markdown 转换工具，为粘贴 ChatGPT、Claude 等 AI 输出的用户而生，不需要上传内容。', path: '/zh/about' },
    contact: { title: '联系我们 — Markdown 转 PDF', description: '联系 Markdown 转 PDF 团队。Bug 反馈、功能建议、隐私问题、商务合作 —— 同一个邮箱。', path: '/zh/contact' },
    login: { title: '登录 — Markdown 转 PDF', description: '登录或注册。', path: '/zh/auth/login', noindex: true },
    dashboard: { title: '控制台 — Markdown 转 PDF', description: '查看转换历史。', path: '/zh/dashboard', noindex: true },
  },
};

export function getPageMetadata(lang: string, page: PageKey): Metadata {
  const m = META[lang]?.[page] || META.en[page];

  // hreflang must only point at variants that the search engine is
  // actually allowed to index. A variant that is itself noindex should
  // not be advertised here — otherwise we tell Google "the alternate
  // lives at <url>" while that <url> tells Google "do not index me",
  // which is a contradictory signal.
  const languages: Record<string, string> = {};
  if (!META.en[page].noindex) {
    languages.en = `${SITE_URL}${META.en[page].path}`;
    languages['x-default'] = `${SITE_URL}${META.en[page].path}`;
  }
  if (!META.zh[page].noindex) {
    languages.zh = `${SITE_URL}${META.zh[page].path}`;
  }

  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `${SITE_URL}${m.path}`,
      languages,
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url: `${SITE_URL}${m.path}`,
      siteName: 'Markdown to PDF',
      locale: lang === 'zh' ? 'zh_CN' : 'en_US',
      type: 'website',
    },
    robots: m.noindex ? { index: false, follow: false } : { index: true, follow: true },
  };
}
