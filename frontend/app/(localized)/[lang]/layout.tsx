/**
 * Localized layout — wraps all [lang]/ pages with Header + Footer.
 * Source: 05-技术方案 §4.1
 */

import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { LOCALES, isValidLocale } from '@/lib/i18n/config';
import '../../globals.css';
import { DocumentShell, siteMetadata } from '@/lib/layout/document-shell';
import { DraftPersistenceBoundary } from '@/components/editor/draft-persistence-boundary';

export const metadata = siteMetadata;

// Reject any lang segment not generated below — without this, arbitrary paths
// like /dashboard or /foobar render a 200 English-homepage clone (soft 404).
export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function LocalizedLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();

  return (
    <DocumentShell lang={lang}><DraftPersistenceBoundary><div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer lang={lang} />
    </div></DraftPersistenceBoundary></DocumentShell>
  );
}
