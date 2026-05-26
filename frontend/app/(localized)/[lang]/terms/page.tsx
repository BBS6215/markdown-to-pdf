/**
 * Terms of Service page.
 * Source: 01-主线 §6.6, 07 §4 任务 4.31
 *
 * Updated 2026-05-26: added §4 IP, §7 Third-party services, §8 Governing
 * law sections; unified contact email to support@.
 */

import Link from 'next/link';
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
          <p><strong>最后更新：</strong>2026 年 5 月 26 日</p>

          <h2 className="text-lg font-medium text-gray-900 mt-8">1. 服务说明</h2>
          <p>Markdown to PDF（&ldquo;本服务&rdquo;）是一个免费的在线工具，用于将 Markdown 文本转换为 PDF、Word 和 HTML 格式。所有格式转换均在您的浏览器中完成，本服务不会上传或存储您的 Markdown 内容。</p>

          <h2 className="text-lg font-medium text-gray-900 mt-8">2. 使用限制</h2>
          <p>转换目前不设额度限制，并且完全在您的浏览器中运行，因此普通使用没有按用户或 IP 计算的限制。我们保留对自动化滥用行为进行限流或封禁的权利；如果未来重新启用服务端渲染，也可能引入使用限制。</p>

          <h2 className="text-lg font-medium text-gray-900 mt-8">3. 内容责任</h2>
          <p>您对自己转换的内容负责。请勿将本服务用于非法、有害或侵犯他人权利的内容。我们没有能力审查您转换的 Markdown 内容（因为它从未到达我们的服务器），但如果发现本服务被用于明显违法行为，我们保留终止帐号或采取其他必要措施的权利。</p>

          <h2 className="text-lg font-medium text-gray-900 mt-8">4. 知识产权</h2>
          <p><strong>您的内容：</strong>您完全保留您转换的 Markdown 内容及其生成结果（PDF / Word / HTML）的全部权利。我们不会主张对这些内容的任何所有权，也不会将其用于训练模型或任何其他用途。</p>
          <p><strong>本网站：</strong>&ldquo;Markdown to PDF&rdquo;网站本身、其品牌、视觉设计、用户界面以及未明示开源的代码归运营方所有。第三方开源依赖（如 unified、docx 等）的版权归各自作者，本服务在其授权范围内使用。</p>

          <h2 className="text-lg font-medium text-gray-900 mt-8">5. 无保证</h2>
          <p>本服务按&ldquo;现状&rdquo;提供，不作任何形式的明示或默示保证，包括但不限于适销性、特定用途适用性、不侵权等。我们不保证转换结果的准确性、不保证服务始终可用、不保证不会出现错误或中断。</p>

          <h2 className="text-lg font-medium text-gray-900 mt-8">6. 责任限制</h2>
          <p>在适用法律允许的最大范围内，对于因使用或无法使用本服务产生的任何直接、间接、偶然、特殊或后果性损失（包括但不限于数据丢失、转换错误、商业利润损失），我们不承担责任。</p>

          <h2 className="text-lg font-medium text-gray-900 mt-8">7. 第三方服务</h2>
          <p>本服务依赖以下第三方提供商运行；这些提供商各自有独立的服务条款和隐私政策，您使用本服务即视为同时接受其相关条款：</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Vercel</strong>：前端托管（仅提供页面访问，不接触您的 Markdown 内容）</li>
            <li><strong>Supabase</strong>：可选账号体系与转换历史记录（仅在您创建账号时启用）</li>
            <li><strong>Google AdSense</strong>：网站广告（审核通过并启用后）；广告 Cookie 详见<Link href="/zh/privacy" className="text-blue-600 underline">隐私政策</Link>第 5 节</li>
          </ul>
          <p>本服务可能在指南、文章或界面中包含跳转到第三方网站的链接。我们不对这些第三方网站的内容、政策或安全性负责。</p>

          <h2 className="text-lg font-medium text-gray-900 mt-8">8. 适用法律与争议解决</h2>
          <p>本条款的解释、效力及争议处理适用相关运营方所在地的法律。任何因本服务产生的争议，双方应首先通过友好协商解决；协商不成的，提交有管辖权的人民法院解决。</p>

          <h2 className="text-lg font-medium text-gray-900 mt-8">9. 条款变更</h2>
          <p>我们可能随时更新这些条款。重大变更会在本页顶部更新&ldquo;最后更新&rdquo;日期。继续使用本服务即表示您接受更新后的条款。如果您不同意更新后的条款，请停止使用本服务。</p>

          <h2 className="text-lg font-medium text-gray-900 mt-8">10. 联系方式</h2>
          <p>如对这些条款有疑问，请发邮件到 <a href="mailto:support@markdown-to-pdf.app" className="text-blue-600 underline">support@markdown-to-pdf.app</a>。</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">Terms of Service</h1>
      <div className="prose prose-gray max-w-none text-sm text-gray-600 space-y-4 leading-7">
        <p><strong>Last updated:</strong> May 26, 2026</p>

        <h2 className="text-lg font-medium text-gray-900 mt-8">1. Service Description</h2>
        <p>Markdown to PDF (the &quot;Service&quot;) is a free online tool that converts Markdown text to PDF, Word, and HTML formats. All conversion happens in your browser; the Service does not upload or store the Markdown content you convert.</p>

        <h2 className="text-lg font-medium text-gray-900 mt-8">2. Usage Limits</h2>
        <p>Conversion runs entirely in your browser, so there is no server-side quota for ordinary use. Very large documents are still limited by your browser memory and performance. We reserve the right to throttle or block automated abuse, and to introduce limits in the future if we re-enable any server-side rendering.</p>

        <h2 className="text-lg font-medium text-gray-900 mt-8">3. Content Responsibility</h2>
        <p>You are responsible for the content you convert. Do not use this Service for illegal, harmful, or infringing content. We cannot review the Markdown you convert (because it never reaches our server), but if the Service is found to be used for clearly unlawful activity, we reserve the right to terminate accounts or take other necessary action.</p>

        <h2 className="text-lg font-medium text-gray-900 mt-8">4. Intellectual Property</h2>
        <p><strong>Your content:</strong> You retain all rights to the Markdown you convert and to the resulting PDF, Word, or HTML output. We make no claim of ownership over your content and do not use it to train any model or for any other purpose.</p>
        <p><strong>The Service:</strong> The &quot;Markdown to PDF&quot; site itself — its brand, visual design, user interface, and non-open-sourced code — belongs to the operator. Third-party open-source dependencies (such as <code>unified</code> and <code>docx</code>) remain the copyright of their respective authors and are used by the Service under their licenses.</p>

        <h2 className="text-lg font-medium text-gray-900 mt-8">5. No Warranty</h2>
        <p>This Service is provided &quot;as is&quot; without warranties of any kind, express or implied, including but not limited to merchantability, fitness for a particular purpose, or non-infringement. We do not guarantee the accuracy of conversion output, do not guarantee continuous availability, and do not guarantee that the Service is free from errors or interruptions.</p>

        <h2 className="text-lg font-medium text-gray-900 mt-8">6. Limitation of Liability</h2>
        <p>To the maximum extent permitted by applicable law, we are not liable for any direct, indirect, incidental, special, or consequential damages arising from your use of, or inability to use, this Service — including but not limited to data loss, conversion errors, or lost business profits.</p>

        <h2 className="text-lg font-medium text-gray-900 mt-8">7. Third-Party Services</h2>
        <p>The Service relies on the following third-party providers, each governed by its own terms of service and privacy policy. By using this Service you also accept the relevant terms of these providers:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Vercel</strong> — frontend hosting (serves pages only; never sees your Markdown)</li>
          <li><strong>Supabase</strong> — optional account system and conversion-history log (only enabled if you create an account)</li>
          <li><strong>Google AdSense</strong> — site advertising (once approved and enabled); advertising cookies are described in §5 of the <Link href="/en/privacy" className="text-blue-600 underline">Privacy Policy</Link></li>
        </ul>
        <p>The Service may include links to third-party websites in guides, articles, or the interface. We are not responsible for the content, policies, or security practices of those third-party sites.</p>

        <h2 className="text-lg font-medium text-gray-900 mt-8">8. Governing Law and Dispute Resolution</h2>
        <p>These Terms are interpreted under, and any disputes arising from your use of the Service are governed by, the laws of the operator&apos;s jurisdiction. The parties will first attempt to resolve any dispute through good-faith negotiation; if negotiation fails, the dispute will be submitted to a court of competent jurisdiction.</p>

        <h2 className="text-lg font-medium text-gray-900 mt-8">9. Changes</h2>
        <p>We may update these Terms at any time. Material changes will be reflected by an updated &quot;Last updated&quot; date at the top of this page. Continued use of the Service constitutes acceptance of the updated Terms. If you do not agree to the updated Terms, please stop using the Service.</p>

        <h2 className="text-lg font-medium text-gray-900 mt-8">10. Contact</h2>
        <p>For questions about these Terms, email <a href="mailto:support@markdown-to-pdf.app" className="text-blue-600 underline">support@markdown-to-pdf.app</a>.</p>
      </div>
    </div>
  );
}
