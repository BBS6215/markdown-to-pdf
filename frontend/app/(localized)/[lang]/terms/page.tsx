/**
 * Terms of Service page.
 * Source: 01-主线 §6.6, 07 §4 任务 4.31
 */

import { getPageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return getPageMetadata(lang, 'terms');
}

export default async function TermsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  if (lang === 'zh') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-semibold text-gray-900 mb-6">服务条款</h1>
        <div className="prose prose-gray max-w-none text-sm text-gray-600 space-y-4 leading-7">
          <p><strong>最后更新：</strong>2026 年 5 月</p>

          <h2 className="text-lg font-medium text-gray-900 mt-8">1. 服务说明</h2>
          <p>Markdown to PDF 是一个免费的在线工具，用于将 Markdown 文本转换为 PDF、Word 和 HTML 格式。</p>

          <h2 className="text-lg font-medium text-gray-900 mt-8">2. 使用限制</h2>
          <p>转换目前不设额度限制，并且完全在您的浏览器中运行，因此普通使用没有按用户或 IP 计算的限制。我们保留对自动化滥用行为进行限流或封禁的权利；如果未来重新启用服务端渲染，也可能引入使用限制。</p>

          <h2 className="text-lg font-medium text-gray-900 mt-8">3. 内容责任</h2>
          <p>您对自己转换的内容负责。请勿将本服务用于非法、有害或侵犯他人权利的内容。</p>

          <h2 className="text-lg font-medium text-gray-900 mt-8">4. 无保证</h2>
          <p>本服务按“现状”提供，不作任何形式的保证。我们不保证转换结果的准确性，也不保证服务始终可用。</p>

          <h2 className="text-lg font-medium text-gray-900 mt-8">5. 责任限制</h2>
          <p>对于因使用本服务产生的任何损失，包括数据丢失或转换错误，我们不承担责任。</p>

          <h2 className="text-lg font-medium text-gray-900 mt-8">6. 条款变更</h2>
          <p>我们可能随时更新这些条款。继续使用本服务即表示您接受更新后的条款。</p>

          <h2 className="text-lg font-medium text-gray-900 mt-8">7. 联系方式</h2>
          <p>如对这些条款有疑问，请联系 legal@markdown-to-pdf.app。</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">Terms of Service</h1>
      <div className="prose prose-gray max-w-none text-sm text-gray-600 space-y-4 leading-7">
        <p><strong>Last updated:</strong> May 2026</p>

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
