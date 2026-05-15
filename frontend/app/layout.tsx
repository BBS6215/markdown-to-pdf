import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

/**
 * Root layout — font loading + globals.css.
 * Source: 04-UI规范 §3.1 (Inter 400/500/600/700, JetBrains Mono 400/700)
 *
 * Fonts are loaded from `./fonts/` so the build is reproducible offline
 * (no fonts.gstatic.com fetch at build time). Both files are variable
 * fonts: a single woff2 covers every weight via the `wght` axis. Source
 * files come from @fontsource-variable/{inter,jetbrains-mono} — see
 * `app/fonts/README.md` for how to refresh them.
 *
 * Chinese / CJK pages fall back to the OS font stack (PingFang, Microsoft
 * YaHei, Noto Sans CJK). Including a full CJK web font would add 15+ MB
 * to the repo, which is not worth it for the i18n surface area.
 */

const inter = localFont({
  src: './fonts/inter-variable.woff2',
  variable: '--font-inter',
  display: 'swap',
  weight: '100 900',
});

const jetbrainsMono = localFont({
  src: './fonts/jetbrains-mono-variable.woff2',
  variable: '--font-jetbrains-mono',
  display: 'swap',
  weight: '100 800',
});

export const metadata: Metadata = {
  title: 'Markdown to PDF',
  description: 'Convert Markdown to PDF, Word, and HTML — free online tool',
  icons: {
    icon: '/icon.svg',
  },
  // Google AdSense site verification (meta-tag method). The AdSense
  // script itself is not loaded during the review phase — see
  // docs/10-前端化架构补丁.md for the audit roadmap.
  other: {
    'google-adsense-account': 'ca-pub-6542625868833135',
  },
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
