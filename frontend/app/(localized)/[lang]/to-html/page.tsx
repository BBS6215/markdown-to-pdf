/**
 * HTML converter tool page.
 * Source: 05-技术方案 §4.1, §9.1, 01-主线 §6.6 (/en/to-html/)
 */

import { getPageMetadata } from '@/lib/seo/metadata';
import { ToolPage } from '@/components/editor/tool-page';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return getPageMetadata(lang, 'toHtml');
}

export default function ToHtmlPage() {
  return <ToolPage format="html" />;
}
