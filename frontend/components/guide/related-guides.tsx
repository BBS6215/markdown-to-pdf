/**
 * Related guides card list for guide page bottom.
 */

import Link from 'next/link';
import { Clock } from 'lucide-react';
import { guideHref, type GuideData } from '@/lib/guides/content';

export function RelatedGuides({ guides, lang = 'en' }: { guides: GuideData[]; lang?: string }) {
  if (guides.length === 0) return null;

  const heading = lang === 'zh' ? '相关指南' : 'Related Guides';
  const readTime = (minutes: number) => lang === 'zh' ? `${minutes} 分钟阅读` : `${minutes} min read`;

  return (
    <div className="mt-12">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">{heading}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={guideHref(lang, guide.slug)}
            className="bg-white border border-gray-200 rounded-xl p-6 hover:border-gray-300 hover:shadow-sm transition-all duration-150"
          >
            <h3 className="text-lg font-medium text-gray-900 mb-1">{guide.title}</h3>
            <p className="text-sm text-gray-500 mb-2 line-clamp-2">{guide.description}</p>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Clock size={12} />
              {readTime(guide.readTime)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
