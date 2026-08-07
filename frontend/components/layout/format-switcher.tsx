'use client';

/**
 * Format switcher — Tab-style navigation between PDF/Word/HTML tools.
 * Source: 04-UI规范 §5.3, 03-产品结构 §6.3
 *
 * Implemented as Next.js <Link> for client-side navigation (no full page reload).
 * Saves editor content to sessionStorage before navigation (03 §6.3).
 */

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ConvertFormat } from '@/lib/types';
import { FORMAT_CONFIG } from '@/lib/types';
import { saveEditorContent } from '@/lib/editor/session-storage';

const TABS: { format: ConvertFormat; path: string }[] = [
  { format: 'pdf', path: '' },
  { format: 'word', path: '/to-word' },
  { format: 'html', path: '/to-html' },
];

interface FormatSwitcherProps {
  currentFormat: ConvertFormat;
  getContent?: () => string;
}

export function FormatSwitcher({ currentFormat, getContent }: FormatSwitcherProps) {
  const pathname = usePathname();
  const lang = pathname.startsWith('/zh') ? 'zh' : 'en';

  const handleClick = () => {
    // Save current editor content before navigating (03 §6.3)
    if (getContent) {
      saveEditorContent(getContent());
    }
  };

  return (
    <div className="border-b border-gray-200">
      <nav className="flex gap-0" aria-label="Format">
        {TABS.map(({ format, path }) => {
          const isActive = format === currentFormat;
          const config = FORMAT_CONFIG[format];

          return (
            <Link
              key={format}
              href={`/${lang}${path}`}
              onClick={handleClick}
              className={`
                py-2 px-4 text-sm border-b-2 transition-colors duration-150
                ${
                  isActive
                    ? `${config.textColor} font-medium ${config.color}`
                    : 'text-gray-500 border-transparent hover:text-gray-700'
                }
              `}
            >
              {config.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
