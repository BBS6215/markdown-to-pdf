/**
 * Guide detail page.
 * Source: 03-产品结构 §4.4, 07 §4 Phase 4 任务 4.21
 */

import { notFound } from 'next/navigation';
import { getGuideBySlug, getRelatedGuides, GUIDES } from '@/lib/guides/content';
import { getPageMetadata } from '@/lib/seo/metadata';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { MiniEditor } from '@/components/editor/mini-editor';
import { CtaBanner } from '@/components/guide/cta-banner';
import { RelatedGuides } from '@/components/guide/related-guides';
import { FaqAccordion } from '@/components/seo/faq-accordion';
import { JsonLd } from '@/components/seo/json-ld';
import { articleSchema, faqSchema } from '@/lib/seo/json-ld-schemas';
import { MarkdownPreview } from '@/components/editor/markdown-preview';

const SLUG_TO_PAGE_KEY: Record<
  string,
  | 'guideNewLine'
  | 'guideQuote'
  | 'guideCheatSheet'
  | 'guideTable'
  | 'guideImage'
  | 'guideCodeBlock'
  | 'guideLink'
  | 'guideList'
> = {
  'markdown-new-line': 'guideNewLine',
  'markdown-quote': 'guideQuote',
  'markdown-cheat-sheet': 'guideCheatSheet',
  'markdown-table': 'guideTable',
  'markdown-image': 'guideImage',
  'markdown-code-block': 'guideCodeBlock',
  'markdown-link': 'guideLink',
  'markdown-list': 'guideList',
};

export function generateStaticParams() {
  return GUIDES.flatMap((g) => [
    { lang: 'en', slug: g.slug },
    { lang: 'zh', slug: g.slug },
  ]);
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const pageKey = SLUG_TO_PAGE_KEY[slug];
  if (!pageKey) return {};
  return getPageMetadata(lang, pageKey);
}

export default async function GuidePage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const related = getRelatedGuides(slug);

  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      <Breadcrumbs
        lang={lang}
        items={[
          { label: 'Guides', href: `/${lang}/guides` },
          { label: guide.title.split(' — ')[0] },
        ]}
      />

      <h1 className="text-3xl font-semibold text-gray-900 mb-4">{guide.title}</h1>
      <p className="text-base text-gray-500 mb-8">{guide.description}</p>

      {/* Guide content rendered as Markdown */}
      <div className="prose-custom">
        <MarkdownPreview markdown={guide.content} />
      </div>

      {/* CTA — mid-article */}
      <CtaBanner lang={lang} />

      {/* Mini editor — interactive playground */}
      <MiniEditor
        defaultContent={`# Try it here\n\nEdit this text to see the preview update in real-time.\n\n- Item 1\n- Item 2\n\n> A sample quote`}
        lang={lang}
      />

      {/* FAQ */}
      {guide.faq.length > 0 && (
        <div className="mt-12">
          <FaqAccordion items={guide.faq} />
        </div>
      )}

      {/* CTA — end of article */}
      <CtaBanner lang={lang} label="Convert your Markdown to PDF, Word, or HTML →" />

      {/* Related guides */}
      <RelatedGuides guides={related} lang={lang} />

      {/* JSON-LD */}
      <JsonLd data={articleSchema(guide.title, guide.description, `https://markdown-to-pdf.app/${lang}/guides/${slug}`)} />
      {guide.faq.length > 0 && <JsonLd data={faqSchema(guide.faq)} />}
    </article>
  );
}
