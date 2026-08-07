/**
 * Word converter tool page.
 * Source: 03-产品结构 §5, 02-SEO策略 §9.2 (/en/to-word/)
 */

import { getPageMetadata } from '@/lib/seo/metadata';
import { ToolPage } from '@/components/editor/tool-page';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return getPageMetadata(lang, 'toWord');
}

export default async function ToWordPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <ToolPage format="word" lang={lang} />;
}
