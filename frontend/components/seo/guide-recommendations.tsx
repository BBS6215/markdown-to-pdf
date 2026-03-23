/**
 * Guide recommendation cards for tool page bottom.
 * Source: 02-SEO策略 约束 4 (内链网络)
 */

import Link from 'next/link';

const GUIDES = [
  { slug: 'markdown-new-line', title: 'Markdown New Line', desc: 'Learn how to create line breaks in Markdown.' },
  { slug: 'markdown-quote', title: 'Markdown Quote', desc: 'Learn how to create block quotes in Markdown.' },
  { slug: 'markdown-cheat-sheet', title: 'Markdown Cheat Sheet', desc: 'Complete Markdown syntax reference.' },
];

export function GuideRecommendations({ lang }: { lang: string }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Markdown Guides</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {GUIDES.map((guide) => (
          <Link
            key={guide.slug}
            href={`/${lang}/guides/${guide.slug}`}
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
