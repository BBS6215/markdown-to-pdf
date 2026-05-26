/**
 * About page — brand-voice narrative of what this tool is, why it exists,
 * how it works, and the principles behind it.
 *
 * Written to satisfy AdSense "site information" expectations: a clear,
 * non-anonymous account of the project. No author byline (brand voice
 * only), so credibility is carried by (a) transparent architecture
 * disclosure, (b) named tech stack, (c) a real contact channel.
 */

import Link from 'next/link';
import { getPageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return getPageMetadata(lang, 'about');
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  if (lang === 'zh') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-semibold text-gray-900 mb-6">关于 Markdown 转 PDF</h1>
        <div className="prose prose-gray max-w-none text-sm text-gray-600 space-y-4 leading-7">
          <p>Markdown 转 PDF 是一个完全在浏览器中运行的免费转换工具。粘贴 Markdown，预览效果，导出 PDF、Word 或 HTML —— 不需要注册、不需要付费、不需要把内容上传到任何服务器。</p>

          <h2 className="text-lg font-medium text-gray-900 mt-8">为什么做这个工具</h2>
          <p>过去两年，越来越多的人开始把 ChatGPT、Claude、Gemini 的输出复制到工作文档里。但这些 AI 工具默认输出的就是 Markdown，复制粘贴到 Word 或邮件里之后，格式立刻散架：标题变成 <code>#</code>、列表前面带 <code>-</code>、代码块没了等宽字体。</p>
          <p>市面上的 Markdown 转换工具大多有以下三个问题之一：要么强制注册收费，要么有页数/字数限制，要么把你的内容上传到服务器去处理 —— 对很多包含未公开信息的 AI 对话来说，这是不能接受的。</p>
          <p>所以这个站想做一件简单的事：把 Markdown 转换完全做成浏览器内的客户端操作，不收费、不上传，转换上限仅取决于你浏览器和设备的能力。</p>

          <h2 className="text-lg font-medium text-gray-900 mt-8">工作原理</h2>
          <p>转换发生在你的设备上，不在我们的服务器上。具体来说：</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>PDF 导出</strong>：通过浏览器原生的打印引擎（和&ldquo;另存为 PDF&rdquo;用的是同一个引擎）在一个隐藏 iframe 里生成，与离线打印完全等价。</li>
            <li><strong>Word 导出</strong>：通过开源 <code>docx</code> 库在浏览器中拼装 .docx 二进制文件，针对中英文混排做了字体调优。</li>
            <li><strong>HTML 导出</strong>：通过 <code>unified</code> + <code>remark</code> + <code>rehype-sanitize</code> 管道在本地渲染，清理后复制到剪贴板。</li>
          </ul>
          <p>整个过程，你的 Markdown 内容从未离开你的浏览器。我们没有&ldquo;上传 → 转换 → 下载&rdquo;这一步 —— 因为根本没有服务器端的转换器。</p>

          <h2 className="text-lg font-medium text-gray-900 mt-8">技术栈</h2>
          <p>本站基于以下开源技术构建：</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Next.js</strong>（应用框架）+ <strong>React</strong>（UI 层）+ <strong>TypeScript</strong>（类型安全）</li>
            <li><strong>Tailwind CSS</strong>（样式）+ <strong>CodeMirror 6</strong>（编辑器）</li>
            <li><strong>unified / remark / rehype</strong>（Markdown 解析与渲染）</li>
            <li><strong>docx</strong>（Word 文档生成）</li>
            <li><strong>Supabase</strong>（可选账号体系，仅用于保存转换历史元数据）</li>
            <li><strong>Vercel</strong>（前端托管）</li>
          </ul>

          <h2 className="text-lg font-medium text-gray-900 mt-8">我们的原则</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>免费</strong> —— 转换不收费、无需注册；服务端不设配额，唯一的实际上限是你浏览器能处理的内容量。</li>
            <li><strong>隐私优先</strong> —— 不用 Google Analytics 之类的第一方分析工具，不读取你的 Markdown 内容。</li>
            <li><strong>透明</strong> —— 每一项第三方依赖都在 <Link href={`/${lang}/privacy`} className="text-blue-600 underline">隐私政策</Link>中明确列出。</li>
            <li><strong>可持续</strong> —— 计划通过 Google AdSense 广告而非订阅维持运营；只要广告收入能覆盖成本，工具就保持免费。</li>
          </ul>

          <h2 className="text-lg font-medium text-gray-900 mt-8">联系方式</h2>
          <p>有 Bug 报告、功能建议、隐私问题或商务合作，请通过 <Link href={`/${lang}/contact`} className="text-blue-600 underline">联系页</Link>找到我们，或直接发邮件到 <a href="mailto:support@markdown-to-pdf.app" className="text-blue-600 underline">support@markdown-to-pdf.app</a>。</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">About Markdown to PDF</h1>
      <div className="prose prose-gray max-w-none text-sm text-gray-600 space-y-4 leading-7">
        <p>Markdown to PDF is a free conversion tool that runs entirely in your browser. Paste Markdown, preview the result, and export to PDF, Word, or HTML — no signup, no payment, no uploading content to any server.</p>

        <h2 className="text-lg font-medium text-gray-900 mt-8">Why this tool exists</h2>
        <p>Over the last couple of years, more and more people have been pasting output from ChatGPT, Claude, and Gemini into real work documents. The problem: these AI tools speak Markdown by default. Copy that output into Word or an email and the formatting falls apart instantly — headings become <code>#</code> signs, lists become <code>-</code> dashes, code blocks lose their monospace font.</p>
        <p>Most existing Markdown converters have one of three problems: they force you to sign up and pay; they impose page or word limits; or they upload your content to a server to process it — which is a non-starter for the many AI conversations that contain unreleased work.</p>
        <p>So this site sets out to do one simple thing: make Markdown conversion fully client-side in the browser. Free to use. Browser-limited. Never uploaded.</p>

        <h2 className="text-lg font-medium text-gray-900 mt-8">How it works</h2>
        <p>Conversion happens on your device, not on our server. Specifically:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>PDF export</strong> uses the browser&apos;s native print engine (the same one behind <em>Save as PDF</em>) inside a hidden iframe, so the final layout is governed by your browser&apos;s print settings.</li>
          <li><strong>Word export</strong> uses the open-source <code>docx</code> package to assemble a .docx binary in the browser, with font tuning that handles mixed Latin and CJK text cleanly.</li>
          <li><strong>HTML export</strong> uses a <code>unified</code> + <code>remark</code> + <code>rehype-sanitize</code> pipeline to render locally, then sanitizes and copies the result to your clipboard.</li>
        </ul>
        <p>In every case, your Markdown never leaves your browser. There is no upload-convert-download round trip — because there is no server-side converter to upload to.</p>

        <h2 className="text-lg font-medium text-gray-900 mt-8">Built with</h2>
        <p>This site stands on the following open-source stack:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Next.js</strong> (app framework) + <strong>React</strong> (UI) + <strong>TypeScript</strong> (type safety)</li>
          <li><strong>Tailwind CSS</strong> (styling) + <strong>CodeMirror 6</strong> (editor)</li>
          <li><strong>unified / remark / rehype</strong> (Markdown parsing and rendering)</li>
          <li><strong>docx</strong> (Word document generation)</li>
          <li><strong>Supabase</strong> (optional account system, used only to store conversion-history metadata)</li>
          <li><strong>Vercel</strong> (frontend hosting)</li>
        </ul>

        <h2 className="text-lg font-medium text-gray-900 mt-8">Our principles</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Free</strong> — no charge, no signup, no server-side quota; the only practical limit is what your browser can hold in memory.</li>
          <li><strong>Privacy first</strong> — no first-party analytics (no Google Analytics, no Plausible), no reading your Markdown.</li>
          <li><strong>Transparent</strong> — every third-party dependency is listed explicitly in the <Link href={`/${lang}/privacy`} className="text-blue-600 underline">Privacy Policy</Link>.</li>
          <li><strong>Sustainable</strong> — intended to be supported by Google AdSense advertising rather than subscriptions; as long as ad revenue covers the running costs, the tool stays free.</li>
        </ul>

        <h2 className="text-lg font-medium text-gray-900 mt-8">Contact</h2>
        <p>For bug reports, feature requests, privacy questions, or partnerships, reach us through the <Link href={`/${lang}/contact`} className="text-blue-600 underline">Contact page</Link>, or email <a href="mailto:support@markdown-to-pdf.app" className="text-blue-600 underline">support@markdown-to-pdf.app</a> directly.</p>
      </div>
    </div>
  );
}
