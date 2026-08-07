import Link from 'next/link';
import { getGuideBySlug, guideHref } from '@/lib/guides/content';

const GUIDE_SLUGS = [
  'markdown-resume-template',
  'readme-template',
  'meeting-notes-template',
  'markdown-to-pdf-best-practices',
  'export-chatgpt-markdown-to-pdf',
  'markdown-vs-word',
  'markdown-frontmatter',
  'markdown-cheat-sheet',
  'markdown-table',
  'markdown-image',
  'markdown-code-block',
  'markdown-link',
  'markdown-list',
  'markdown-new-line',
  'markdown-quote',
];

export function Footer({ lang = 'en' }: { lang?: string }) {
  const copy = lang === 'zh'
    ? {
        tools: '工具',
        guides: '指南',
        company: '公司',
        legal: '法律',
        pdf: 'Markdown 转 PDF',
        word: 'Markdown 转 Word',
        html: 'Markdown 转 HTML',
        about: '关于我们',
        contact: '联系我们',
        privacy: '隐私政策',
        terms: '服务条款',
        pricing: '定价',
        rights: '保留所有权利。',
      }
    : {
        tools: 'Tools',
        guides: 'Guides',
        company: 'Company',
        legal: 'Legal',
        pdf: 'Markdown to PDF',
        word: 'Markdown to Word',
        html: 'Markdown to HTML',
        about: 'About',
        contact: 'Contact',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
        pricing: 'Pricing',
        rights: 'All rights reserved.',
      };

  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          {/* Tools */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">{copy.tools}</h4>
            <ul className="space-y-2 text-gray-500">
              <li><Link href={`/${lang}`} className="hover:text-gray-700">{copy.pdf}</Link></li>
              <li><Link href={`/${lang}/to-word`} className="hover:text-gray-700">{copy.word}</Link></li>
              <li><Link href={`/${lang}/to-html`} className="hover:text-gray-700">{copy.html}</Link></li>
            </ul>
          </div>
          {/* Guides */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">{copy.guides}</h4>
            <ul className="space-y-2 text-gray-500">
              {GUIDE_SLUGS.map((slug) => {
                const guide = getGuideBySlug(slug, lang);
                return (
                  <li key={slug}>
                    <Link href={guideHref(lang, slug)} className="hover:text-gray-700">
                      {guide?.title.split(' — ')[0] ?? slug}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          {/* Company */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">{copy.company}</h4>
            <ul className="space-y-2 text-gray-500">
              <li><Link href={`/${lang}/about`} className="hover:text-gray-700">{copy.about}</Link></li>
              <li><Link href={`/${lang}/contact`} className="hover:text-gray-700">{copy.contact}</Link></li>
              <li><Link href={`/${lang}/pricing`} className="hover:text-gray-700">{copy.pricing}</Link></li>
            </ul>
          </div>
          {/* Legal */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">{copy.legal}</h4>
            <ul className="space-y-2 text-gray-500">
              <li><Link href={`/${lang}/privacy`} className="hover:text-gray-700">{copy.privacy}</Link></li>
              <li><Link href={`/${lang}/terms`} className="hover:text-gray-700">{copy.terms}</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Markdown to PDF. {copy.rights}
        </div>
      </div>
    </footer>
  );
}
