import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

/**
 * Root layout — font loading + globals.css.
 * Source: 04-UI规范 §3.1 (Inter 400/500/600/700, JetBrains Mono 400/700)
 *
 * Font loading via next/font ensures automatic optimization:
 * - woff2 format, ≤120KB total
 * - font-display: swap (avoid FOIT)
 */

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Markdown to PDF',
  description: 'Convert Markdown to PDF, Word, and HTML — free online tool',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
