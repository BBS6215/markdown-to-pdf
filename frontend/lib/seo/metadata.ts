/**
 * SEO metadata configuration for all pages.
 * Source: 02-SEO策略 附录 C (TDK), 05-技术方案 §9.1
 * Rule: Title MUST contain "Markdown (.md)" to avoid MD disambiguation (07 §11.2 S1)
 */

import type { Metadata } from 'next';

const SITE_URL = 'https://markdown-to-pdf.app';

type PageKey = 'home' | 'toWord' | 'toHtml' | 'guides' | 'guideNewLine' | 'guideQuote' | 'guideCheatSheet' | 'pricing' | 'privacy' | 'terms' | 'login' | 'dashboard';

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
    pricing: { title: 'Pricing — Markdown to PDF', description: 'Markdown to PDF is free and unlimited. PDF, Word, and HTML conversion all run entirely in your browser.', path: '/en/pricing' },
    privacy: { title: 'Privacy Policy — Markdown to PDF', description: 'Privacy policy for markdown-to-pdf.app.', path: '/en/privacy' },
    terms: { title: 'Terms of Service — Markdown to PDF', description: 'Terms of service for markdown-to-pdf.app.', path: '/en/terms' },
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
    pricing: { title: '定价 — Markdown 转 PDF', description: 'Markdown 转 PDF 免费使用。', path: '/zh/pricing' },
    privacy: { title: '隐私政策 — Markdown 转 PDF', description: 'markdown-to-pdf.app 隐私政策。', path: '/zh/privacy' },
    terms: { title: '服务条款 — Markdown 转 PDF', description: 'markdown-to-pdf.app 服务条款。', path: '/zh/terms' },
    login: { title: '登录 — Markdown 转 PDF', description: '登录或注册。', path: '/zh/auth/login', noindex: true },
    dashboard: { title: '控制台 — Markdown 转 PDF', description: '查看转换历史。', path: '/zh/dashboard', noindex: true },
  },
};

export function getPageMetadata(lang: string, page: PageKey): Metadata {
  const m = META[lang]?.[page] || META.en[page];
  const otherLang = lang === 'zh' ? 'en' : 'zh';
  const otherMeta = META[otherLang][page];

  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `${SITE_URL}${m.path}`,
      languages: {
        en: `${SITE_URL}${META.en[page].path}`,
        zh: `${SITE_URL}${META.zh[page].path}`,
        'x-default': `${SITE_URL}${META.en[page].path}`,
      },
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
