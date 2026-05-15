/**
 * CTA banner for guide pages — soft blue background.
 * Source: 04-UI规范 §5.1 (bg-blue-50 border-blue-100)
 */

import Link from 'next/link';

export function CtaBanner({ lang = 'en', label }: { lang?: string; label?: string }) {
  const copy = lang === 'zh'
    ? {
        title: '格式调好了？',
        label: '导出为干净的 PDF →',
      }
    : {
        title: 'Got your formatting right?',
        label: 'Download it as a clean PDF →',
      };

  return (
    <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 my-8">
      <p className="text-lg font-medium text-gray-800 mb-2">
        {copy.title}
      </p>
      <Link
        href={`/${lang}`}
        className="text-blue-600 font-medium hover:underline"
      >
        {label || copy.label}
      </Link>
    </div>
  );
}
