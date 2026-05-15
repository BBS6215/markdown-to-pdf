/**
 * Privacy Policy page.
 * Source: 01-主线 §6.6, 07 §4 任务 4.30
 *
 * Updated 2026-05-15: added §5 Advertising for Google AdSense integration.
 * Updated 2026-05-14: frontend-only pipeline. PDF/Word/HTML all convert in
 * the browser; Markdown content never reaches our servers.
 */

import { getPageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return getPageMetadata(lang, 'privacy');
}

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">Privacy Policy</h1>
      <div className="prose prose-gray max-w-none text-sm text-gray-600 space-y-4 leading-7">
        <p><strong>Last updated:</strong> May 15, 2026</p>

        <h2 className="text-lg font-medium text-gray-900 mt-8">1. What We Collect</h2>
        <p>All Markdown-to-PDF, -Word, and -HTML conversion happens inside your browser. Your Markdown content is never sent to our server and we cannot read it.</p>
        <p>When you create an account, we store your email address and a record of past conversions (file names, formats, sizes, and timestamps only — never the file content itself).</p>

        <h2 className="text-lg font-medium text-gray-900 mt-8">2. How Conversion Works</h2>
        <p>HTML is rendered locally with the unified/remark pipeline. Word (.docx) is generated in the browser via the docx package. PDF uses your browser&apos;s native print engine (the same engine that &quot;Save as PDF&quot; uses) inside a hidden iframe. In every case, the generated file is created on your device and downloaded directly — no upload, no server round-trip.</p>

        <h2 className="text-lg font-medium text-gray-900 mt-8">3. Data Storage</h2>
        <p>We use Supabase to host the optional accounts table and the conversion-history log. The only data stored there is what you see on the Dashboard — email and history metadata. Markdown content and generated files are not stored anywhere by us.</p>

        <h2 className="text-lg font-medium text-gray-900 mt-8">4. Cookies</h2>
        <p>We use two categories of cookies:</p>
        <ul className="list-disc pl-6">
          <li><strong>Essential cookies</strong> — set by Supabase to keep you signed in if you choose to create an account. The site works without an account; in that case no essential cookies are set.</li>
          <li><strong>Advertising cookies</strong> — set by Google AdSense and its third-party advertising partners (see §5). These cookies are used to serve and measure ads.</li>
        </ul>
        <p>We do not use any first-party analytics product (Google Analytics, Plausible, etc.).</p>

        <h2 className="text-lg font-medium text-gray-900 mt-8">5. Advertising</h2>
        <p>This site is supported by advertising delivered by <strong>Google AdSense</strong>. Google and its third-party vendors use cookies to serve ads based on a user&apos;s prior visits to this site or other websites.</p>
        <p>Google&apos;s use of advertising cookies (including the DoubleClick cookie) enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet. Ads may be <strong>personalized</strong> (targeted using your interests) or <strong>non-personalized</strong> (contextual only), depending on your consent and your Google account settings.</p>
        <p>You can opt out of personalized advertising at any time by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Google Ads Settings</a>. You can also opt out of third-party vendors&apos; use of cookies for personalized ads at <a href="https://www.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">aboutads.info</a>.</p>
        <p><strong>Users in the EEA, UK and Switzerland:</strong> we and our advertising partners obtain your consent before placing non-essential cookies or showing personalized ads, as required by GDPR and the ePrivacy Directive. You can withdraw consent at any time via the cookie controls offered through Google&apos;s consent management.</p>
        <p>For more information on how Google uses data when you use our site, see the <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Google Partner Sites policy</a>.</p>

        <h2 className="text-lg font-medium text-gray-900 mt-8">6. Third-Party Services</h2>
        <p>We use the following third-party services:</p>
        <ul className="list-disc pl-6">
          <li><strong>Supabase</strong> — authentication and history database (optional, only if you create an account)</li>
          <li><strong>Vercel</strong> — frontend hosting</li>
          <li><strong>Google</strong> — OAuth authentication (optional) and AdSense advertising (see §5)</li>
        </ul>

        <h2 className="text-lg font-medium text-gray-900 mt-8">7. Contact</h2>
        <p>For privacy questions, contact us at privacy@markdown-to-pdf.app.</p>
      </div>
    </div>
  );
}
