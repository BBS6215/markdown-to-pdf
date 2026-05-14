/**
 * Terms of Service page.
 * Source: 01-主线 §6.6, 07 §4 任务 4.31
 */

import { getPageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return getPageMetadata(lang, 'terms');
}

export default function TermsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">Terms of Service</h1>
      <div className="prose prose-gray max-w-none text-sm text-gray-600 space-y-4 leading-7">
        <p><strong>Last updated:</strong> March 2026</p>

        <h2 className="text-lg font-medium text-gray-900 mt-8">1. Service Description</h2>
        <p>Markdown to PDF is a free online tool that converts Markdown text to PDF, Word, and HTML formats.</p>

        <h2 className="text-lg font-medium text-gray-900 mt-8">2. Usage Limits</h2>
        <p>Conversion is unlimited and runs entirely in your browser, so there is no per-user or per-IP cap for ordinary use. We reserve the right to throttle or block automated abuse, and to introduce limits in the future if we re-enable any server-side rendering.</p>

        <h2 className="text-lg font-medium text-gray-900 mt-8">3. Content Responsibility</h2>
        <p>You are responsible for the content you convert. Do not use this service for illegal, harmful, or infringing content.</p>

        <h2 className="text-lg font-medium text-gray-900 mt-8">4. No Warranty</h2>
        <p>This service is provided &quot;as is&quot; without warranties of any kind. We do not guarantee the accuracy of the conversion output or the availability of the service.</p>

        <h2 className="text-lg font-medium text-gray-900 mt-8">5. Limitation of Liability</h2>
        <p>We are not liable for any damages arising from the use of this service, including data loss or conversion errors.</p>

        <h2 className="text-lg font-medium text-gray-900 mt-8">6. Changes</h2>
        <p>We may update these terms at any time. Continued use of the service constitutes acceptance of the updated terms.</p>

        <h2 className="text-lg font-medium text-gray-900 mt-8">7. Contact</h2>
        <p>For questions about these terms, contact us at legal@markdown-to-pdf.app.</p>
      </div>
    </div>
  );
}
