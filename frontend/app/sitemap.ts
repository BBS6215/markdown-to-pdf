/**
 * Dynamic sitemap.
 * Source: 05-技术方案 §9.3
 *
 * Added 2026-05-15: 5 deeper guide pages (table / image / code-block /
 * link / list) for AdSense audit content depth.
 *
 * Added 2026-05-26: about / contact pages for AdSense site-information
 * coverage (footer + sitemap both updated).
 *
 * Added 2026-05-26: 4 deeper guides for AdSense content depth and
 * search-intent coverage around PDF export workflows.
 *
 * The guide tree is now translated in both EN and ZH, so sitemap
 * includes every public page for both languages.
 *
 * Effective count: 24 pages × 2 languages = 48 URLs.
 *
 * lastModified policy: each page carries a STABLE real date (not new Date()).
 * Google ignores <lastmod> when it changes on every crawl (which new Date()
 * did). MAINTENANCE: when you materially change a page's body, structured
 * data, or important links, bump that page's `lastModified` below — otherwise
 * the date drifts out of truth again and Google stops trusting it.
 */

import type { MetadataRoute } from 'next';

const BASE_URL = 'https://markdown-to-pdf.app';

const PAGES = [
  { path: '', changeFrequency: 'weekly' as const, priority: 1.0, lastModified: '2026-05-13' },
  { path: '/to-word', changeFrequency: 'weekly' as const, priority: 0.9, lastModified: '2026-05-13' },
  { path: '/to-html', changeFrequency: 'weekly' as const, priority: 0.9, lastModified: '2026-05-13' },
  { path: '/guides', changeFrequency: 'weekly' as const, priority: 0.8, lastModified: '2026-05-13' },
  { path: '/guides/markdown-new-line', changeFrequency: 'monthly' as const, priority: 0.7, lastModified: '2026-05-13' },
  { path: '/guides/markdown-quote', changeFrequency: 'monthly' as const, priority: 0.7, lastModified: '2026-05-13' },
  { path: '/guides/markdown-cheat-sheet', changeFrequency: 'monthly' as const, priority: 0.7, lastModified: '2026-05-13' },
  { path: '/guides/markdown-table', changeFrequency: 'monthly' as const, priority: 0.7, lastModified: '2026-05-15' },
  { path: '/guides/markdown-image', changeFrequency: 'monthly' as const, priority: 0.7, lastModified: '2026-05-15' },
  { path: '/guides/markdown-code-block', changeFrequency: 'monthly' as const, priority: 0.7, lastModified: '2026-05-15' },
  { path: '/guides/markdown-link', changeFrequency: 'monthly' as const, priority: 0.7, lastModified: '2026-05-15' },
  { path: '/guides/markdown-list', changeFrequency: 'monthly' as const, priority: 0.7, lastModified: '2026-05-15' },
  { path: '/guides/markdown-to-pdf-best-practices', changeFrequency: 'monthly' as const, priority: 0.7, lastModified: '2026-05-26' },
  { path: '/guides/export-chatgpt-markdown-to-pdf', changeFrequency: 'monthly' as const, priority: 0.7, lastModified: '2026-05-26' },
  { path: '/guides/markdown-vs-word', changeFrequency: 'monthly' as const, priority: 0.7, lastModified: '2026-05-26' },
  { path: '/guides/markdown-frontmatter', changeFrequency: 'monthly' as const, priority: 0.7, lastModified: '2026-05-26' },
  { path: '/guides/markdown-resume-template', changeFrequency: 'monthly' as const, priority: 0.7, lastModified: '2026-07-05' },
  { path: '/guides/readme-template', changeFrequency: 'monthly' as const, priority: 0.7, lastModified: '2026-07-05' },
  { path: '/guides/meeting-notes-template', changeFrequency: 'monthly' as const, priority: 0.7, lastModified: '2026-07-05' },
  { path: '/about', changeFrequency: 'monthly' as const, priority: 0.5, lastModified: '2026-05-26' },
  { path: '/contact', changeFrequency: 'monthly' as const, priority: 0.4, lastModified: '2026-05-26' },
  { path: '/pricing', changeFrequency: 'monthly' as const, priority: 0.3, lastModified: '2026-05-13' },
  { path: '/privacy', changeFrequency: 'yearly' as const, priority: 0.1, lastModified: '2026-05-13' },
  { path: '/terms', changeFrequency: 'yearly' as const, priority: 0.1, lastModified: '2026-05-13' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of PAGES) {
    for (const lang of ['en', 'zh']) {
      const alternates: Record<string, string> = {
        en: `${BASE_URL}/en${page.path}`,
        zh: `${BASE_URL}/zh${page.path}`,
      };

      entries.push({
        url: `${BASE_URL}/${lang}${page.path}`,
        lastModified: page.lastModified,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: { languages: alternates },
      });
    }
  }

  return entries;
}
