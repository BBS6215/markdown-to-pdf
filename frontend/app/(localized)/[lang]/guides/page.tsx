/**
 * Guides index page — card grid.
 * Source: 03-产品结构 §4.4 (指南列表页), 07 §4 Phase 4 任务 4.26
 */

import { GUIDES } from '@/lib/guides/content';
import { GuideCard } from '@/components/guide/guide-card';
import { getPageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return getPageMetadata(lang, 'guides');
}

export default async function GuidesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-gray-900 mb-2">Markdown Guides</h1>
      <p className="text-base text-gray-500 mb-8">
        Learn Markdown syntax with interactive examples.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {GUIDES.map((guide) => (
          <GuideCard key={guide.slug} guide={guide} lang={lang} />
        ))}
      </div>
    </div>
  );
}
