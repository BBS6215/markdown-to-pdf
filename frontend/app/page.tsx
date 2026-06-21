import { permanentRedirect } from 'next/navigation';

/**
 * Root page — redirects to default language (/en/).
 * Source: 05-技术方案 §4.1, i18n routing
 *
 * Uses a 308 permanent redirect (not 307) so Google consolidates ranking
 * signals onto /en (the home canonical) and stops re-checking / on every
 * crawl. SEO: GSC flagged / (highest-impression URL) as a temporary redirect.
 */
export default function RootPage() {
  permanentRedirect('/en');
}
