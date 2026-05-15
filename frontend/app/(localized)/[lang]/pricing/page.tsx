/**
 * Pricing placeholder page.
 * Source: 01-主线 §6.6 (/en/pricing), 07 §4 任务 4.29
 */

import Link from 'next/link';
import { getPageMetadata } from '@/lib/seo/metadata';
import { Check } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return getPageMetadata(lang, 'pricing');
}

const FEATURES = [
  'Unlimited PDF conversions (no account needed)',
  'Unlimited Word (.docx) conversions',
  'Unlimited HTML conversions',
  'Runs 100% in your browser — your content never leaves your device',
  'Real-time Markdown preview',
  'File upload support (.md files)',
  'Conversion history (with free account)',
  'GitHub Flavored Markdown support',
  'CJK language support (uses your OS fonts)',
];

const ZH_FEATURES = [
  '无限 PDF 转换（无需账号）',
  '无限 Word (.docx) 转换',
  '无限 HTML 转换',
  '100% 在浏览器中运行，您的内容不会离开设备',
  '实时 Markdown 预览',
  '支持上传 .md 文件',
  '转换历史（免费账号可用）',
  '支持 GitHub Flavored Markdown',
  '支持中文等 CJK 语言（使用系统字体）',
];

export default async function PricingPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isZh = lang === 'zh';
  const copy = isZh
    ? {
        title: '定价',
        subtitle: '免费使用。通过广告支持，让工具可以长期开放。',
        plan: '免费',
        note: '无需账号',
        adNotice: '我们通过 Google AdSense 展示广告来维持工具免费。我们不会读取或上传您的 Markdown，所有转换都完全在浏览器中运行。您可以查看我们的',
        privacy: '隐私政策',
        afterPrivacy: '，了解广告 Cookie 以及如何选择退出。',
        features: ZH_FEATURES,
      }
    : {
        title: 'Pricing',
        subtitle: 'Free to use. Supported by ads so the tool can stay available.',
        plan: 'Free',
        note: 'No account required',
        adNotice: 'We serve advertising via Google AdSense to keep this tool free. We never read or upload your Markdown — every conversion runs entirely in your browser. See our',
        privacy: 'Privacy Policy',
        afterPrivacy: 'for details on advertising cookies and how to opt out.',
        features: FEATURES,
      };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 text-center">
      <h1 className="text-3xl font-semibold text-gray-900 mb-2">{copy.title}</h1>
      <p className="text-base text-gray-500 mb-8">
        {copy.subtitle}
      </p>

      <div className="bg-white border border-gray-200 rounded-xl p-8 text-left">
        <div className="text-center mb-6">
          <span className="text-4xl font-bold text-gray-900">{copy.plan}</span>
          <span className="block text-sm text-gray-500 mt-1">{copy.note}</span>
        </div>

        <ul className="space-y-3">
          {copy.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <Check size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-xs text-gray-500 leading-6">
          {copy.adNotice}{' '}
          <Link href={`/${lang}/privacy`} className="text-blue-600 underline">
            {copy.privacy}
          </Link>{' '}
          {copy.afterPrivacy}
        </p>
      </div>
    </div>
  );
}
