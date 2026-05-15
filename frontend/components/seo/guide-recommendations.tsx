/**
 * Guide recommendation cards for tool page bottom.
 * Source: 02-SEO策略 约束 4 (内链网络)
 *
 * The three slugs picked here are the most directly relevant to the
 * conversion flow itself — content pasted from ChatGPT / Claude almost
 * always contains tables, code blocks, and lists, and these are the
 * three areas where PDF / Word output behavior diverges the most from
 * the raw Markdown source. Promoting them on every tool page gives
 * crawlers stable internal links to the new guides and gives users a
 * relevant next read.
 */

import Link from 'next/link';
import { guideHref } from '@/lib/guides/content';

const GUIDES = [
  { slug: 'markdown-table', title: 'Markdown Table', desc: 'Tables, column alignment, and how they render in PDF and Word.' },
  { slug: 'markdown-code-block', title: 'Markdown Code Block', desc: 'Fenced and inline code, language hints, and PDF output tips.' },
  { slug: 'markdown-list', title: 'Markdown List', desc: 'Ordered, unordered, nested, and task lists — with Word/PDF notes.' },
];

export function GuideRecommendations({ lang }: { lang: string }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Markdown Guides</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {GUIDES.map((guide) => (
          <Link
            key={guide.slug}
            href={guideHref(lang, guide.slug)}
            className="bg-white border border-gray-200 rounded-xl p-4 hover:border-gray-300 hover:shadow-sm transition-all duration-150"
          >
            <h3 className="text-sm font-medium text-gray-900 mb-1">{guide.title}</h3>
            <p className="text-xs text-gray-500">{guide.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
