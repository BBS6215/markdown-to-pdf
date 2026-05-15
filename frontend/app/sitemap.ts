/**
 * Dynamic sitemap.
 * Source: 05-技术方案 §9.3
 *
 * Added 2026-05-15: 5 deeper guide pages (table / image / code-block /
 * link / list) for AdSense audit content depth.
 *
 * Excluded from sitemap: the entire /zh/guides tree (both the index and
 * the 8 detail pages). Their body content is still 100% English while
 * the metadata is in Chinese — listing them as indexable would tell
 * Search Console and AdSense to crawl pages whose language declaration
 * mismatches the body. The zh routes still exist for direct navigation;
 * they just do not appear in the sitemap and are noindex (see
 * lib/seo/metadata.ts). Lift this exclusion once /zh/guides/* is
 * actually translated.
 *
 * Effective count: 15 EN entries + (15 - 9 excluded) ZH entries = 21 URLs.
 */

import type { MetadataRoute } from 'next';

const BASE_URL = 'https://markdown-to-pdf.app';

const PAGES = [
  { path: '', changeFrequency: 'weekly' as const, priority: 1.0 },
  { path: '/to-word', changeFrequency: 'weekly' as const, priority: 0.9 },
  { path: '/to-html', changeFrequency: 'weekly' as const, priority: 0.9 },
  { path: '/guides', changeFrequency: 'weekly' as const, priority: 0.8 },
  { path: '/guides/markdown-new-line', changeFrequency: 'monthly' as const, priority: 0.7 },
  { path: '/guides/markdown-quote', changeFrequency: 'monthly' as const, priority: 0.7 },
  { path: '/guides/markdown-cheat-sheet', changeFrequency: 'monthly' as const, priority: 0.7 },
  { path: '/guides/markdown-table', changeFrequency: 'monthly' as const, priority: 0.7 },
  { path: '/guides/markdown-image', changeFrequency: 'monthly' as const, priority: 0.7 },
  { path: '/guides/markdown-code-block', changeFrequency: 'monthly' as const, priority: 0.7 },
  { path: '/guides/markdown-link', changeFrequency: 'monthly' as const, priority: 0.7 },
  { path: '/guides/markdown-list', changeFrequency: 'monthly' as const, priority: 0.7 },
  { path: '/pricing', changeFrequency: 'monthly' as const, priority: 0.3 },
  { path: '/privacy', changeFrequency: 'yearly' as const, priority: 0.1 },
  { path: '/terms', changeFrequency: 'yearly' as const, priority: 0.1 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Helper: every page under /guides (index + details) is English-only
  // for now (see header comment for why). Centralised so the rule is
  // checked once and used both for the sitemap skip and for the
  // hreflang declaration on the corresponding EN entries.
  const isZhExcluded = (path: string) =>
    path === '/guides' || path.startsWith('/guides/');

  for (const page of PAGES) {
    for (const lang of ['en', 'zh']) {
      if (lang === 'zh' && isZhExcluded(page.path)) {
        continue;
      }

      const alternates: Record<string, string> = {
        en: `${BASE_URL}/en${page.path}`,
      };
      if (!isZhExcluded(page.path)) {
        alternates.zh = `${BASE_URL}/zh${page.path}`;
      }

      entries.push({
        url: `${BASE_URL}/${lang}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: { languages: alternates },
      });
    }
  }

  return entries;
}
