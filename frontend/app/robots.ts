/**
 * Dynamic robots.txt.
 * Source: 05-技术方案 §9.4
 *
 * All app routes live under i18n prefixes (/en/* and /zh/*), so each
 * disallow path is enumerated per-locale — a bare /dashboard does not
 * match /en/dashboard for crawlers.
 *
 * Login pages (/en/auth/login, /zh/auth/login) are intentionally NOT
 * disallowed: they render publicly with a `noindex` meta tag (see
 * lib/seo/metadata.ts). Blocking them in robots.txt prevented Google from
 * crawling them to SEE the noindex, so it indexed bare URLs from external
 * links anyway ("indexed though blocked by robots.txt" in GSC). Allowing the
 * crawl lets the noindex actually take effect.
 *
 * Dashboard stays disallowed: it server-redirects unauthenticated crawlers to
 * login before rendering, so its noindex meta is never seen — un-blocking it
 * would not help. Keep it blocked to save crawl budget.
 */

import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/auth/',
          '/dashboard',
          '/en/dashboard',
          '/zh/dashboard',
        ],
      },
    ],
    sitemap: 'https://markdown-to-pdf.app/sitemap.xml',
  };
}
