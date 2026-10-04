/**
 * Guide detail page.
 * Source: 03-产品结构 §4.4, 07 §4 Phase 4 任务 4.21
 */

import { notFound } from 'next/navigation';
import { getGuideBySlug, getRelatedGuides, guidesIndexHref, getGuides } from '@/lib/guides/content';
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
  | 'guidePdfBestPractices'
  | 'guideChatgptExport'
  | 'guideMarkdownVsWord'
  | 'guideFrontmatter'
  | 'guideResumeTemplate'
  | 'guideReadmeTemplate'
  | 'guideMeetingNotes'
> = {
  'markdown-new-line': 'guideNewLine',
  'markdown-quote': 'guideQuote',
  'markdown-cheat-sheet': 'guideCheatSheet',
  'markdown-table': 'guideTable',
  'markdown-image': 'guideImage',
  'markdown-code-block': 'guideCodeBlock',
  'markdown-link': 'guideLink',
  'markdown-list': 'guideList',
  'markdown-to-pdf-best-practices': 'guidePdfBestPractices',
  'export-chatgpt-markdown-to-pdf': 'guideChatgptExport',
  'markdown-vs-word': 'guideMarkdownVsWord',
  'markdown-frontmatter': 'guideFrontmatter',
  'markdown-resume-template': 'guideResumeTemplate',
  'readme-template': 'guideReadmeTemplate',
  'meeting-notes-template': 'guideMeetingNotes',
};

export const dynamicParams = false;
export function generateStaticParams({ params }: { params: { lang: string } }) {
  return getGuides(params.lang).map(g => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const pageKey = SLUG_TO_PAGE_KEY[slug];
  if (!pageKey) return {};
  return getPageMetadata(lang, pageKey);
}

export default async function GuidePage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const guide = getGuideBySlug(slug, lang);
  if (!guide) notFound();

  const related = getRelatedGuides(slug, lang);
  const copy = lang === 'zh'
    ? {
        guidesLabel: '指南',
        playground: '# 在这里试试\n\n修改这段文字，右侧预览会实时更新。\n\n- 第一项\n- 第二项\n\n> 示例引用',
        cta: '将你的 Markdown 转为 PDF、Word 或 HTML →',
      }
    : {
        guidesLabel: 'Guides',
        playground: '# Try it here\n\nEdit this text to see the preview update in real-time.\n\n- Item 1\n- Item 2\n\n> A sample quote',
        cta: 'Convert your Markdown to PDF, Word, or HTML →',
      };

  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      <Breadcrumbs
        lang={lang}
        items={[
          { label: copy.guidesLabel, href: guidesIndexHref(lang) },
          { label: guide.title.split(' — ')[0] },
        ]}
      />

      <h1 className="text-3xl font-semibold text-gray-900 mb-4">{guide.title}</h1>
      <p className="text-base text-gray-500 mb-8">{guide.description}</p>

      {/* Guide content rendered as Markdown */}
      <div>
        <MarkdownPreview markdown={guide.content} lang={lang} />
      </div>

      {/* CTA — mid-article */}
      <CtaBanner lang={lang} />

      {/* Mini editor — interactive playground */}
      <MiniEditor
        defaultContent={copy.playground}
        lang={lang}
      />

      {/* FAQ */}
      {guide.faq.length > 0 && (
        <div className="mt-12">
          <FaqAccordion items={guide.faq} lang={lang} />
        </div>
      )}

      {/* CTA — end of article */}
      <CtaBanner lang={lang} label={copy.cta} />

      {/* Related guides */}
      <RelatedGuides guides={related} lang={lang} />

      {/* JSON-LD */}
      <JsonLd data={articleSchema(guide.title, guide.description, `https://markdown-to-pdf.app/${lang}/guides/${slug}`)} />
      {guide.faq.length > 0 && <JsonLd data={faqSchema(guide.faq)} />}
    </article>
  );
}
