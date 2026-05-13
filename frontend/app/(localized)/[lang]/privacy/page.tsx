/**
 * Privacy Policy page.
 * Source: 01-主线 §6.6, 07 §4 任务 4.30
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
        <p><strong>Last updated:</strong> March 2026</p>

        <h2 className="text-lg font-medium text-gray-900 mt-8">1. What We Collect</h2>
        <p>When you use Markdown to PDF without an account, we do not collect any personal information. Your Markdown content is sent to our server only for PDF/Word conversion and is immediately discarded after the file is generated.</p>
        <p>When you create an account, we store your email address and conversion history (file names, formats, and timestamps only — not your actual content or generated files).</p>

        <h2 className="text-lg font-medium text-gray-900 mt-8">2. HTML Conversion</h2>
        <p>HTML conversion is processed entirely in your browser. Your content never leaves your device for HTML conversions.</p>

        <h2 className="text-lg font-medium text-gray-900 mt-8">3. Data Storage</h2>
        <p>We use Supabase for authentication and database storage. Your data is stored in Supabase&apos;s infrastructure. We do not store your Markdown content or generated PDF/Word files.</p>

        <h2 className="text-lg font-medium text-gray-900 mt-8">4. Cookies</h2>
        <p>We use essential cookies for authentication. We do not use tracking cookies or third-party analytics.</p>

        <h2 className="text-lg font-medium text-gray-900 mt-8">5. Third-Party Services</h2>
        <p>We use the following third-party services:</p>
        <ul className="list-disc pl-6">
          <li>Supabase — authentication and database</li>
          <li>Vercel — frontend hosting</li>
          <li>Render — backend hosting</li>
          <li>Google — OAuth authentication (optional)</li>
        </ul>

        <h2 className="text-lg font-medium text-gray-900 mt-8">6. Contact</h2>
        <p>For privacy questions, contact us at privacy@markdown-to-pdf.app.</p>
      </div>
    </div>
  );
}
