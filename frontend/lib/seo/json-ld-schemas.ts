/**
 * JSON-LD structured data schemas.
 * Source: 02-SEO策略 §9, 03-产品结构 §4.8
 */

import type { ConvertFormat, SupportedLang } from '@/lib/types';

const SITE_URL = 'https://markdown-to-pdf.app';

const SOFTWARE_APPLICATION = {
  pdf: {
    path: '',
    en: 'Markdown to PDF Converter',
    zh: 'Markdown 转 PDF 工具',
  },
  word: {
    path: '/to-word',
    en: 'Markdown to Word Converter',
    zh: 'Markdown 转 Word 工具',
  },
  html: {
    path: '/to-html',
    en: 'Markdown to HTML Converter',
    zh: 'Markdown 转 HTML 工具',
  },
} as const satisfies Record<ConvertFormat, { path: string; en: string; zh: string }>;

export function softwareApplicationSchema(format: ConvertFormat, lang: SupportedLang) {
  const application = SOFTWARE_APPLICATION[format];

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: application[lang],
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    url: `${SITE_URL}/${lang}${application.path}`,
  };
}

export function faqSchema(items: ReadonlyArray<{ q: string; a: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

export function articleSchema(title: string, description: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    publisher: {
      '@type': 'Organization',
      name: 'Markdown to PDF',
      url: 'https://markdown-to-pdf.app',
    },
  };
}
