/**
 * CTA banner for guide pages — soft blue background.
 * Source: 04-UI规范 §5.1 (bg-blue-50 border-blue-100)
 */

import Link from 'next/link';

export function CtaBanner({ lang = 'en', label }: { lang?: string; label?: string }) {
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 my-8">
      <p className="text-lg font-medium text-gray-800 mb-2">
        Got your formatting right?
      </p>
      <Link
        href={`/${lang}`}
        className="text-blue-600 font-medium hover:underline"
      >
        {label || 'Download it as a clean PDF →'}
      </Link>
    </div>
  );
}
