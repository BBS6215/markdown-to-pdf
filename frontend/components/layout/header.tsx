'use client';

/**
 * Global header with auth state.
 * Source: 05-技术方案 §4.1, 03-产品结构 §4.10
 */

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FileText, User, LogOut } from 'lucide-react';
import { MobileNav } from './mobile-nav';
import { LanguageSwitcher } from './language-switcher';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import { guidesIndexHref } from '@/lib/guides/content';
import type { AuthChangeEvent, Session, User as SupabaseUser } from '@supabase/supabase-js';

const NAV_ITEMS = [
  { href: '', label: 'PDF' },
  { href: '/to-word', label: 'Word' },
  { href: '/to-html', label: 'HTML' },
  { href: '/guides', label: 'Guides' },
];

export function Header() {
  const pathname = usePathname();
  const lang = pathname.startsWith('/zh') ? 'zh' : 'en';
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const supabase = getSupabaseBrowserClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }: { data: { user: SupabaseUser | null } }) => setUser(data.user));

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = `/${lang}`;
  };

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href={`/${lang}`} className="flex items-center gap-2 text-gray-900 font-semibold">
          <FileText size={20} className="text-red-600" />
          <span className="text-sm">Markdown to PDF</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            // /guides has no zh translation yet — link it to /en/guides
            // from zh pages too, otherwise the nav drops users into a
            // noindex "Chinese title, English body" mismatch page.
            const fullHref =
              item.href === '/guides' ? guidesIndexHref(lang) : `/${lang}${item.href}`;
            const isActive =
              item.href === ''
                ? pathname === `/${lang}` || pathname === `/${lang}/`
                : pathname.startsWith(fullHref);

            return (
              <Link
                key={item.href}
                href={fullHref}
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  isActive
                    ? 'text-gray-900 font-medium bg-gray-100'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          <LanguageSwitcher className="ml-2" />

          {user ? (
            <div className="flex items-center gap-1 ml-2">
              <Link
                href={`/${lang}/dashboard`}
                className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md flex items-center gap-1.5"
              >
                <User size={16} />
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="px-2 py-2 text-sm text-gray-400 hover:text-gray-600 rounded-md"
                title="Log out"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link
              href={`/${lang}/auth/login`}
              className="ml-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900"
            >
              Login
            </Link>
          )}
        </nav>

        <MobileNav lang={lang} />
      </div>
    </header>
  );
}
