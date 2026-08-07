/**
 * Homepage — PDF converter tool page.
 * Source: 03-产品结构 §5, 02-SEO策略 §9.1 (首页 /en/)
 */

import { getPageMetadata } from '@/lib/seo/metadata';
import { ToolPage } from '@/components/editor/tool-page';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return getPageMetadata(lang, 'home');
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <ToolPage format="pdf" lang={lang} />;
}
