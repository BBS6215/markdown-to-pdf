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

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  if (lang === 'zh') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-semibold text-gray-900 mb-6">隐私政策</h1>
        <div className="prose prose-gray max-w-none text-sm text-gray-600 space-y-4 leading-7">
          <p><strong>最后更新：</strong>2026 年 5 月 15 日</p>

          <h2 className="text-lg font-medium text-gray-900 mt-8">1. 我们收集什么</h2>
          <p>Markdown 转 PDF、Word 和 HTML 的转换都在您的浏览器中完成。您的 Markdown 内容不会发送到我们的服务器，我们也无法读取它。</p>
          <p>当您创建账号时，我们会保存您的邮箱地址和转换历史记录（仅包括文件名、格式、大小和时间戳，不保存文件内容本身）。</p>

          <h2 className="text-lg font-medium text-gray-900 mt-8">2. 转换如何工作</h2>
          <p>HTML 使用 unified/remark 管道在本地渲染。Word (.docx) 通过 docx 包在浏览器中生成。PDF 使用浏览器原生打印引擎（与“另存为 PDF”相同的引擎）在隐藏 iframe 中生成。所有情况下，生成的文件都在您的设备上创建并直接下载，不上传、不经过服务器。</p>

          <h2 className="text-lg font-medium text-gray-900 mt-8">3. 数据存储</h2>
          <p>我们使用 Supabase 托管可选账号和转换历史记录。那里只保存您在控制台看到的数据：邮箱和历史元数据。Markdown 内容和生成文件不会由我们存储。</p>

          <h2 className="text-lg font-medium text-gray-900 mt-8">4. Cookie</h2>
          <p>我们使用两类 Cookie：</p>
          <ul className="list-disc pl-6">
            <li><strong>必要 Cookie</strong>：由 Supabase 设置，用于在您创建账号后保持登录状态。网站不登录也能使用；不登录时不会设置这类账号 Cookie。</li>
            <li><strong>广告 Cookie</strong>：广告启用后（见第 5 节），Google AdSense 及其第三方广告合作伙伴可能会在您的浏览器中设置 Cookie，用于投放和衡量广告。网站仍处于 AdSense 审核阶段时，不加载广告脚本，也不会设置广告 Cookie。</li>
          </ul>
          <p>我们不使用任何第一方分析产品（如 Google Analytics、Plausible 等）。</p>

          <h2 className="text-lg font-medium text-gray-900 mt-8">5. 广告</h2>
          <p>本站计划通过 <strong>Google AdSense</strong> 广告支持运营。Google 及其第三方供应商可能会根据用户此前访问本站或其他网站的情况使用 Cookie 投放广告。</p>
          <p>Google 使用广告 Cookie（包括 DoubleClick Cookie）后，Google 及其合作伙伴可以根据用户访问本站和/或互联网其他网站的情况投放广告。广告可能是<strong>个性化广告</strong>，也可能是<strong>非个性化广告</strong>，具体取决于您的同意状态和 Google 账号设置。</p>
          <p>您可以随时访问 <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Google 广告设置</a> 来退出个性化广告。您也可以在 <a href="https://www.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">aboutads.info</a> 退出第三方供应商用于个性化广告的 Cookie。</p>
          <p><strong>当前状态：</strong>本站仍处于 AdSense 审核阶段。目前没有加载广告代码，也没有由我们或 Google 在您的浏览器中设置广告 Cookie。我们先更新本政策，是为了在广告开始展示前完成必要披露。</p>
          <p><strong>欧洲经济区、英国和瑞士用户：</strong>在 GDPR 和 ePrivacy Directive 要求的情况下，我们会通过同意管理平台（例如 Google Funding Choices）获取您的同意，然后才会放置非必要 Cookie 或展示个性化广告。广告投放和同意流程会一起启用；在您有机会做出同意选择前，不会向您展示广告。上线同意横幅后，您也可以随时撤回同意。</p>
          <p>关于您使用本站时 Google 如何使用数据，请参阅 <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Google 合作伙伴网站政策</a>。</p>

          <h2 className="text-lg font-medium text-gray-900 mt-8">6. 第三方服务</h2>
          <p>我们使用以下第三方服务：</p>
          <ul className="list-disc pl-6">
            <li><strong>Supabase</strong>：身份认证和历史数据库（可选，仅在您创建账号时使用）</li>
            <li><strong>Vercel</strong>：前端托管</li>
            <li><strong>Google</strong>：OAuth 登录（可选）和 AdSense 广告（见第 5 节）</li>
          </ul>

          <h2 className="text-lg font-medium text-gray-900 mt-8">7. 联系方式</h2>
          <p>如有隐私相关问题，请发邮件到 <a href="mailto:support@markdown-to-pdf.app" className="text-blue-600 underline">support@markdown-to-pdf.app</a>，邮件标题请注明 <em>Privacy Request</em> 以便我们优先处理。</p>
        </div>
      </div>
    );
  }

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
          <li><strong>Advertising cookies</strong> — once advertising is enabled (see §5), Google AdSense and its third-party advertising partners may set cookies in your browser to serve and measure ads. While the site is under AdSense review, no advertising scripts are loaded and no advertising cookies are set.</li>
        </ul>
        <p>We do not use any first-party analytics product (Google Analytics, Plausible, etc.).</p>

        <h2 className="text-lg font-medium text-gray-900 mt-8">5. Advertising</h2>
        <p>This site is intended to be supported by advertising delivered by <strong>Google AdSense</strong>. Google and its third-party vendors may use cookies to serve ads based on a user&apos;s prior visits to this site or other websites.</p>
        <p>Google&apos;s use of advertising cookies (including the DoubleClick cookie) enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet. Ads may be <strong>personalized</strong> (targeted using your interests) or <strong>non-personalized</strong> (contextual only), depending on your consent and your Google account settings.</p>
        <p>You can opt out of personalized advertising at any time by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Google Ads Settings</a>. You can also opt out of third-party vendors&apos; use of cookies for personalized ads at <a href="https://www.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">aboutads.info</a>.</p>
        <p><strong>Current status:</strong> the site is still in the AdSense review phase. No advertising code is loaded yet, and no advertising cookies are set in your browser by us or by Google at this time. This page is being kept up to date now so the disclosure is in place when ads do start serving.</p>
        <p><strong>Users in the EEA, UK and Switzerland:</strong> where required by GDPR and the ePrivacy Directive, we will obtain your consent through a consent management platform (such as Google&apos;s Funding Choices) before placing non-essential cookies or showing personalized ads. Ad serving and the consent flow will be enabled together — you will not be shown ads until you have had the opportunity to make a consent choice. You can withdraw consent at any time once the consent banner is live.</p>
        <p>For more information on how Google uses data when you use our site, see the <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Google Partner Sites policy</a>.</p>

        <h2 className="text-lg font-medium text-gray-900 mt-8">6. Third-Party Services</h2>
        <p>We use the following third-party services:</p>
        <ul className="list-disc pl-6">
          <li><strong>Supabase</strong> — authentication and history database (optional, only if you create an account)</li>
          <li><strong>Vercel</strong> — frontend hosting</li>
          <li><strong>Google</strong> — OAuth authentication (optional) and AdSense advertising (see §5)</li>
        </ul>

        <h2 className="text-lg font-medium text-gray-900 mt-8">7. Contact</h2>
        <p>For privacy questions, email <a href="mailto:support@markdown-to-pdf.app" className="text-blue-600 underline">support@markdown-to-pdf.app</a> with <em>Privacy Request</em> in the subject line so we can prioritize it.</p>
      </div>
    </div>
  );
}
