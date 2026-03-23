/**
 * Guide card for the guides index page.
 * Source: 04-UI规范 §5.1 (卡片组件)
 */

import Link from 'next/link';
import { Clock } from 'lucide-react';
import type { GuideData } from '@/lib/guides/content';

export function GuideCard({ guide, lang = 'en' }: { guide: GuideData; lang?: string }) {
  return (
    <Link
      href={`/${lang}/guides/${guide.slug}`}
      className="bg-white border border-gray-200 rounded-xl p-6 hover:border-gray-300 hover:shadow-sm transition-all duration-150"
    >
      <h2 className="text-lg font-medium text-gray-900 mb-2">{guide.title}</h2>
      <p className="text-sm text-gray-500 mb-3 line-clamp-2">{guide.description}</p>
      <span className="flex items-center gap-1 text-xs text-gray-400">
        <Clock size={12} />
        {guide.readTime} min read
      </span>
    </Link>
  );
}
