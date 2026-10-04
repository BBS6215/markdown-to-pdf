import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import localFont from 'next/font/local';

// Self-hosted fonts keep builds independent of Google Fonts/network access.
const inter = localFont({
  src: '../../app/fonts/inter-variable.woff2', variable: '--font-inter', display: 'swap', weight: '100 900',
});
const jetbrainsMono = localFont({
  src: '../../app/fonts/jetbrains-mono-variable.woff2', variable: '--font-jetbrains-mono', display: 'swap', weight: '100 800',
});
export const siteMetadata: Metadata = {
  title: 'Markdown to PDF',
  description: 'Convert Markdown to PDF, Word, and HTML — free online tool',
  icons: { icon: '/icon.svg' },
  other: { 'google-adsense-account': 'ca-pub-6542625868833135' },
};
export function DocumentShell({ children, lang = 'en' }: { children: ReactNode; lang?: string }) {
  return <html lang={lang} className={`${inter.variable} ${jetbrainsMono.variable}`}>
    <body className="font-sans antialiased bg-white text-gray-900">{children}</body>
  </html>;
}
