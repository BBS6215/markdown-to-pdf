'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { href: '', label: 'Convert to PDF' },
  { href: '/to-word', label: 'Convert to Word' },
  { href: '/to-html', label: 'Convert to HTML' },
  { href: '/guides', label: 'Guides' },
  { href: '/auth/login', label: 'Login' },
];

export function MobileNav({ lang }: { lang: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button onClick={() => setOpen(!open)} className="p-2 text-gray-600 hover:text-gray-900">
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {open && (
        <div className="absolute top-14 left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50">
          <nav className="flex flex-col p-4 gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={`/${lang}${item.href}`}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
