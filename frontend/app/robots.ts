/**
 * Dynamic robots.txt.
 * Source: 05-技术方案 §9.4
 *
 * All app routes live under i18n prefixes (/en/* and /zh/*), so each
 * disallow path is enumerated per-locale — a bare /dashboard does not
 * match /en/dashboard for crawlers.
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
          '/en/auth/',
          '/zh/auth/',
          '/dashboard',
          '/en/dashboard',
          '/zh/dashboard',
        ],
      },
    ],
    sitemap: 'https://markdown-to-pdf.app/sitemap.xml',
  };
}
