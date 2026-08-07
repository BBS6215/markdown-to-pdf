'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { LanguageSwitcher } from './language-switcher';
import { guidesIndexHref } from '@/lib/guides/content';

const NAV_ITEMS = [
  { href: '', label: 'Convert to PDF' },
  { href: '/to-word', label: 'Convert to Word' },
  { href: '/to-html', label: 'Convert to HTML' },
  { href: '/guides', label: 'Guides' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/auth/login', label: 'Login' },
];

const ZH_NAV_LABELS: Record<string, string> = {
  'Convert to PDF': '转 PDF',
  'Convert to Word': '转 Word',
  'Convert to HTML': '转 HTML',
  Guides: '指南',
  About: '关于',
  Contact: '联系',
  Login: '登录',
};

export function MobileNav({ lang }: { lang: string }) {
  const [open, setOpen] = useState(false);
  const openLabel = lang === 'zh' ? '打开导航菜单' : 'Open navigation menu';
  const closeLabel = lang === 'zh' ? '关闭导航菜单' : 'Close navigation menu';

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="mobile-nav-menu"
        aria-label={open ? closeLabel : openLabel}
        className="p-2 text-gray-600 hover:text-gray-900"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {open && (
        <div id="mobile-nav-menu" className="absolute top-14 left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50">
          <nav className="flex flex-col p-4 gap-1">
            <LanguageSwitcher variant="menu" onNavigate={() => setOpen(false)} />
            {NAV_ITEMS.map((item) => {
              const fullHref =
                item.href === '/guides' ? guidesIndexHref(lang) : `/${lang}${item.href}`;
              return (
                <Link
                  key={item.href}
                  href={fullHref}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  {lang === 'zh' ? ZH_NAV_LABELS[item.label] : item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
}
