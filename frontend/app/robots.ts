/**
 * Dynamic robots.txt.
 * Source: 05-技术方案 §9.4
 */

import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/auth/', '/dashboard', '/api/'],
      },
    ],
    sitemap: 'https://markdown-to-pdf.app/sitemap.xml',
  };
}
