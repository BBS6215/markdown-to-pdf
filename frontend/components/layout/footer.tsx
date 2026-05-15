import Link from 'next/link';

export function Footer({ lang = 'en' }: { lang?: string }) {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
          {/* Tools */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Tools</h4>
            <ul className="space-y-2 text-gray-500">
              <li><Link href={`/${lang}`} className="hover:text-gray-700">Markdown to PDF</Link></li>
              <li><Link href={`/${lang}/to-word`} className="hover:text-gray-700">Markdown to Word</Link></li>
              <li><Link href={`/${lang}/to-html`} className="hover:text-gray-700">Markdown to HTML</Link></li>
            </ul>
          </div>
          {/* Guides */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Guides</h4>
            <ul className="space-y-2 text-gray-500">
              <li><Link href={`/${lang}/guides/markdown-cheat-sheet`} className="hover:text-gray-700">Cheat Sheet</Link></li>
              <li><Link href={`/${lang}/guides/markdown-table`} className="hover:text-gray-700">Markdown Table</Link></li>
              <li><Link href={`/${lang}/guides/markdown-image`} className="hover:text-gray-700">Markdown Image</Link></li>
              <li><Link href={`/${lang}/guides/markdown-code-block`} className="hover:text-gray-700">Markdown Code Block</Link></li>
              <li><Link href={`/${lang}/guides/markdown-link`} className="hover:text-gray-700">Markdown Link</Link></li>
              <li><Link href={`/${lang}/guides/markdown-list`} className="hover:text-gray-700">Markdown List</Link></li>
              <li><Link href={`/${lang}/guides/markdown-new-line`} className="hover:text-gray-700">Markdown New Line</Link></li>
              <li><Link href={`/${lang}/guides/markdown-quote`} className="hover:text-gray-700">Markdown Quote</Link></li>
            </ul>
          </div>
          {/* Legal */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Legal</h4>
            <ul className="space-y-2 text-gray-500">
              <li><Link href={`/${lang}/privacy`} className="hover:text-gray-700">Privacy Policy</Link></li>
              <li><Link href={`/${lang}/terms`} className="hover:text-gray-700">Terms of Service</Link></li>
              <li><Link href={`/${lang}/pricing`} className="hover:text-gray-700">Pricing</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Markdown to PDF. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
