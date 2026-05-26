/**
 * Contact page — single, real support inbox. Deliberately not a contact
 * form: AdSense review tests email entries by sending a probe, and a
 * mailto link to a working address is the cleanest signal that the
 * channel actually exists. A form that posts to nowhere would be worse
 * than no form at all.
 */

import { Mail } from 'lucide-react';
import { getPageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return getPageMetadata(lang, 'contact');
}

const SUPPORT_EMAIL = 'support@markdown-to-pdf.app';

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  if (lang === 'zh') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">联系我们</h1>
        <p className="text-base text-gray-600 leading-7 mb-8">
          有任何问题、建议或反馈，欢迎发邮件给我们。所有事务都走同一个邮箱 —— 这样回复更快，也不会有邮件漏接。
        </p>

        <div className="border border-gray-200 rounded-lg p-6 bg-gray-50 mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Mail size={20} className="text-red-600" />
            <span className="text-sm text-gray-500">邮箱</span>
          </div>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="text-lg font-medium text-gray-900 hover:text-red-600 transition-colors"
          >
            {SUPPORT_EMAIL}
          </a>
          <p className="text-xs text-gray-500 mt-3">
            通常会在 2 个工作日内回复。
          </p>
        </div>

        <h2 className="text-lg font-medium text-gray-900 mb-3">这个邮箱处理什么</h2>
        <ul className="text-sm text-gray-600 leading-7 space-y-2 list-disc pl-6 mb-8">
          <li><strong>Bug 报告</strong> —— 告诉我们你的浏览器、操作系统，以及触发问题的 Markdown 片段。能复现的 bug 通常一两天就能修。</li>
          <li><strong>功能建议</strong> —— 想要支持的格式、想看到的导出选项、想加入的样式预设。我们会优先做使用频次最高的。</li>
          <li><strong>隐私问题</strong> —— GDPR / CCPA 数据请求、Cookie 问题、数据删除诉求。请在邮件标题写 <em>Privacy Request</em>。</li>
          <li><strong>商务合作</strong> —— 广告合作、API 授权、企业部署。请在邮件标题写 <em>Business</em>。</li>
        </ul>

        <h2 className="text-lg font-medium text-gray-900 mb-3">写邮件时的小建议</h2>
        <p className="text-sm text-gray-600 leading-7">
          一封信息齐全的邮件能省去几轮来回 —— 帮助我们更快帮你。如果是 Bug 报告，附上能复现的 Markdown 内容、你做了什么操作、期望结果和实际结果。如果是功能建议，说一下你想用它解决什么具体场景。
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold text-gray-900 mb-4">Contact</h1>
      <p className="text-base text-gray-600 leading-7 mb-8">
        Questions, suggestions, or feedback — we read every email. Everything goes to the same inbox so replies are faster and nothing slips through.
      </p>

      <div className="border border-gray-200 rounded-lg p-6 bg-gray-50 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <Mail size={20} className="text-red-600" />
          <span className="text-sm text-gray-500">Email</span>
        </div>
        <a
          href={`mailto:${SUPPORT_EMAIL}`}
          className="text-lg font-medium text-gray-900 hover:text-red-600 transition-colors"
        >
          {SUPPORT_EMAIL}
        </a>
        <p className="text-xs text-gray-500 mt-3">
          We typically reply within 2 business days.
        </p>
      </div>

      <h2 className="text-lg font-medium text-gray-900 mb-3">What this inbox handles</h2>
      <ul className="text-sm text-gray-600 leading-7 space-y-2 list-disc pl-6 mb-8">
        <li><strong>Bug reports</strong> — please include your browser, operating system, and the Markdown snippet that triggers the issue. Reproducible bugs usually ship a fix within a day or two.</li>
        <li><strong>Feature requests</strong> — formats you wish were supported, export options you&apos;d like to see, style presets you want. We prioritize the most-asked.</li>
        <li><strong>Privacy questions</strong> — GDPR / CCPA data requests, cookie questions, data-deletion requests. Please put <em>Privacy Request</em> in the subject line.</li>
        <li><strong>Partnerships</strong> — advertising, API licensing, enterprise deployments. Please put <em>Business</em> in the subject line.</li>
      </ul>

      <h2 className="text-lg font-medium text-gray-900 mb-3">A few tips for writing in</h2>
      <p className="text-sm text-gray-600 leading-7">
        A complete email saves a round-trip and helps us help you faster. For bug reports, include the Markdown that reproduces the issue, what you did, what you expected, and what you got instead. For feature requests, describe the concrete use case you&apos;re trying to solve.
      </p>
    </div>
  );
}
