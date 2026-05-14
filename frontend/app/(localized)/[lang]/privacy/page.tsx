/**
 * Privacy Policy page.
 * Source: 01-主线 §6.6, 07 §4 任务 4.30
 *
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
        <p><strong>Last updated:</strong> May 2026</p>

        <h2 className="text-lg font-medium text-gray-900 mt-8">1. What We Collect</h2>
        <p>All Markdown-to-PDF, -Word, and -HTML conversion happens inside your browser. Your Markdown content is never sent to our server and we cannot read it.</p>
        <p>When you create an account, we store your email address and a record of past conversions (file names, formats, sizes, and timestamps only — never the file content itself).</p>

        <h2 className="text-lg font-medium text-gray-900 mt-8">2. How Conversion Works</h2>
        <p>HTML is rendered locally with the unified/remark pipeline. Word (.docx) is generated in the browser via the docx package. PDF uses your browser&apos;s native print engine (the same engine that &quot;Save as PDF&quot; uses) inside a hidden iframe. In every case, the generated file is created on your device and downloaded directly — no upload, no server round-trip.</p>

        <h2 className="text-lg font-medium text-gray-900 mt-8">3. Data Storage</h2>
        <p>We use Supabase to host the optional accounts table and the conversion-history log. The only data stored there is what you see on the Dashboard — email and history metadata. Markdown content and generated files are not stored anywhere by us.</p>

        <h2 className="text-lg font-medium text-gray-900 mt-8">4. Cookies</h2>
        <p>We use essential cookies for authentication. We do not use tracking cookies or third-party analytics.</p>

        <h2 className="text-lg font-medium text-gray-900 mt-8">5. Third-Party Services</h2>
        <p>We use the following third-party services:</p>
        <ul className="list-disc pl-6">
          <li>Supabase — authentication and history database</li>
          <li>Vercel — frontend hosting</li>
          <li>Google — OAuth authentication (optional)</li>
        </ul>

        <h2 className="text-lg font-medium text-gray-900 mt-8">6. Contact</h2>
        <p>For privacy questions, contact us at privacy@markdown-to-pdf.app.</p>
      </div>
    </div>
  );
}
