/**
 * Localized layout — wraps all [lang]/ pages with Header + Footer.
 * Source: 05-技术方案 §4.1
 */

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

const SUPPORTED_LANGS = ['en', 'zh'] as const;

export function generateStaticParams() {
  return SUPPORTED_LANGS.map((lang) => ({ lang }));
}

export default async function LocalizedLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer lang={lang} />
    </div>
  );
}
