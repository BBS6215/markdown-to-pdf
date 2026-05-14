'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';

type Locale = 'en' | 'zh';
type LanguageSwitcherVariant = 'inline' | 'menu';

const LABELS: Record<Locale, string> = {
  en: 'EN',
  zh: '\u4e2d\u6587',
};

const MENU_LABELS: Record<Locale, string> = {
  en: 'Language',
  zh: '\u8bed\u8a00',
};

function getCurrentLocale(pathname: string): Locale {
  return pathname.startsWith('/zh') ? 'zh' : 'en';
}

function getLocalizedHref(pathname: string, targetLocale: Locale): string {
  const currentPath = pathname || '/';
  const localeMatch = currentPath.match(/^\/(en|zh)(?=\/|$)/);

  if (localeMatch) {
    const rest = currentPath.slice(localeMatch[0].length);
    return `/${targetLocale}${rest || ''}`;
  }

  return `/${targetLocale}${currentPath === '/' ? '' : currentPath}`;
}

export function LanguageSwitcher({
  variant = 'inline',
  className = '',
  onNavigate,
}: {
  variant?: LanguageSwitcherVariant;
  className?: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const currentLocale = getCurrentLocale(pathname);

  const links = (['en', 'zh'] as Locale[]).map((locale) => {
    const active = locale === currentLocale;

    return (
      <Link
        key={locale}
        href={getLocalizedHref(pathname, locale)}
        onClick={onNavigate}
        aria-current={active ? 'page' : undefined}
        className={`rounded px-2 py-1 transition-colors ${
          active
            ? 'bg-gray-900 text-white'
            : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
        }`}
      >
        {LABELS[locale]}
      </Link>
    );
  });

  if (variant === 'menu') {
    return (
      <div className={`flex items-center justify-between px-3 py-2.5 ${className}`}>
        <span className="flex items-center gap-2 text-sm text-gray-700">
          <Globe size={16} />
          {MENU_LABELS[currentLocale]}
        </span>
        <div className="flex items-center gap-1 text-sm">{links}</div>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-1 rounded-md border border-gray-200 bg-white px-1 py-1 text-xs ${className}`}
      aria-label="Language"
    >
      <Globe size={14} className="ml-1 text-gray-400" />
      {links}
    </div>
  );
}
