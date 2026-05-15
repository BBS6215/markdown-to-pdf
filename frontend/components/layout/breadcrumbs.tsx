/**
 * Breadcrumb navigation for guide pages.
 * Source: 03-产品结构 §4.10 (面包屑: Home > Guides > [标题])
 */

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbsProps {
  lang: string;
  items: Array<{ label: string; href?: string }>;
}

export function Breadcrumbs({ lang, items }: BreadcrumbsProps) {
  const homeLabel = lang === 'zh' ? '首页' : 'Home';

  return (
    <nav className="flex items-center gap-1 text-sm text-gray-500 mb-4">
      <Link href={`/${lang}`} className="hover:text-gray-700">{homeLabel}</Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRight size={14} className="text-gray-400" />
          {item.href ? (
            <Link href={item.href} className="hover:text-gray-700">{item.label}</Link>
          ) : (
            <span className="text-gray-700">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
