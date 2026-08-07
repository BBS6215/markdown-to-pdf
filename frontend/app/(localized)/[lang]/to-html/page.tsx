/**
 * HTML converter tool page.
 * Source: 03-产品结构 §5, 02-SEO策略 §9.2 (/en/to-html/)
 */

import { getPageMetadata } from '@/lib/seo/metadata';
import { ToolPage } from '@/components/editor/tool-page';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return getPageMetadata(lang, 'toHtml');
}

export default async function ToHtmlPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <ToolPage format="html" lang={lang} />;
}
