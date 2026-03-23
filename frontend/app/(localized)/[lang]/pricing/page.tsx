/**
 * Pricing placeholder page.
 * Source: 01-主线 §6.6 (/en/pricing), 07 §4 任务 4.29
 */

import { getPageMetadata } from '@/lib/seo/metadata';
import { Check } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return getPageMetadata(lang, 'pricing');
}

const FEATURES = [
  '2 PDF/Word conversions per day (no account)',
  '5 PDF/Word conversions per day (with free account)',
  'Unlimited HTML conversions',
  'Real-time Markdown preview',
  'File upload support (.md files)',
  'Conversion history (with account)',
  'GitHub Flavored Markdown support',
  'CJK language support in PDFs',
];

export default async function PricingPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12 text-center">
      <h1 className="text-3xl font-semibold text-gray-900 mb-2">Pricing</h1>
      <p className="text-base text-gray-500 mb-8">
        Markdown to PDF is free to use.
      </p>

      <div className="bg-white border border-gray-200 rounded-xl p-8 text-left">
        <div className="text-center mb-6">
          <span className="text-4xl font-bold text-gray-900">$0</span>
          <span className="text-gray-500 ml-1">/ forever</span>
        </div>

        <ul className="space-y-3">
          {FEATURES.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <Check size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
