/**
 * Chinese translations.
 * Source: 01-主线 §6.5 (中文 + 英文), 02-SEO §7 (中文 SEO 低优先级，可简化)
 */

import type { Translations } from './en';

const zh: Translations = {
  common: {
    siteName: 'Markdown 转 PDF',
    login: '登录',
    signup: '注册',
    logout: '退出',
    dashboard: '控制台',
    guides: '指南',
    loading: '加载中...',
  },

  tool: {
    pdf: {
      h1: '在线 Markdown (.md) 转 PDF — 免费工具',
      subheading: '将 Markdown 或 AI 生成的文本快速转换为专业 PDF。',
      convertButton: '转换为 PDF',
    },
    word: {
      h1: '在线 Markdown (.md) 转 Word — 免费工具',
      subheading: '将 Markdown 或 AI 生成的文本转换为 Word 文档。',
      convertButton: '转换为 Word',
    },
    html: {
      h1: '在线 Markdown (.md) 转 HTML — 免费工具',
      subheading: '将 Markdown 转换为 HTML — 100% 浏览器端处理，数据不离开您的设备。',
      convertButton: '转换为 HTML',
      copyHtml: '复制 HTML',
    },
  },

  editor: {
    inputTitle: 'Markdown 输入',
    inputSubtitle: '粘贴来自 ChatGPT、Claude 或任何文本编辑器的内容',
    previewTitle: '实时预览',
    placeholder: '在此粘贴 Markdown 或 AI 生成的文本 — 支持 ChatGPT、Claude、Notion 或任何 .md 文件',
    uploadButton: '上传 .md',
    dropHint: '拖拽 .md 文件到此处',
    editTab: '编辑',
    previewTab: '预览',
  },

  conversion: {
    generating: '正在生成 {format}...',
    downloaded: '下载完成！',
    failed: '生成 {format} 失败。',
    retry: '重试',
    timeout: '转换超时，请尝试缩短内容。',
    remaining: '',
    signUpPrompt: '注册免费账号即可保存转换历史，无需信用卡。',
    signUpButton: '注册',
    limitReached: '',
    htmlFree: '所有转换均免费且无限制，全部在您的浏览器中完成。',
  },

  auth: {
    welcome: '欢迎',
    signUpSubtitle: '注册免费账号即可保存转换历史，无需信用卡。',
    email: '邮箱',
    password: '密码',
    loginButton: '登录',
    signupButton: '注册',
    noAccount: '没有账号？',
    hasAccount: '已有账号？',
    checkEmail: '请查看邮箱确认您的账号。',
    googleButton: '使用 Google 登录',
    authFailed: '认证失败，请重试。',
    or: '或',
  },

  dashboard: {
    title: '控制台',
    todayUsage: '',
    remaining: '',
    resetNote: '',
    historyTitle: '转换历史',
    historyEmpty: '暂无转换记录。试试转换一些 Markdown 吧！',
    privacyNote: '历史仅保存文件名和时间戳，您的实际内容不会到达我们的服务器。',
  },

  seo: {
    pdf: {
      howToTitle: '如何将 Markdown 转换为 PDF',
      howToSteps: [
        '在浏览器中打开 markdown-to-pdf.app',
        '将 Markdown 或 AI 生成的文本粘贴到编辑器中',
        '在右侧面板预览格式化效果',
        '点击"转换为 PDF"下载文件',
      ],
      whyTitle: '为什么要将 Markdown 转为 PDF？',
      whyContent: 'PDF 是通用的文档分享格式。无论是提交 AI 生成的报告、分享会议记录还是归档文档，将 Markdown 转为 PDF 可确保内容在所有设备和平台上呈现一致的专业外观。',
      features: [
        { title: '即时转换', desc: '几秒内将 Markdown 转为 PDF，无需注册、无需上传、无需等待。' },
        { title: 'AI 友好', desc: '直接粘贴 ChatGPT、Claude、Gemini 或任何 AI 工具的输出。' },
        { title: '专业排版', desc: '干净的 GitHub 风格，标题、表格、代码块和图片都正确显示。' },
        { title: '免费无限', desc: '无每日额度。无付费墙。转换完全在您的浏览器中完成。' },
      ],
      faq: [
        { q: '这个工具是免费的吗？', a: '是的，完全免费且无限制，无需注册账号。注册免费账号仅用于保存转换历史。' },
        { q: '什么是 Markdown？我需要学它吗？', a: 'Markdown 是一种简单的文本格式语言——就是你在 ChatGPT 或 Claude 输出中看到的那些 #、** 和 - 符号。你不需要学它，直接粘贴文本就能转换。' },
        { q: '我的数据安全吗？', a: '安全。PDF 生成完全在您的浏览器中通过原生打印引擎完成，您的 Markdown 内容从不发送到我们的服务器，文件始终留在您的设备上。' },
        { q: '支持哪些 Markdown 功能？', a: '支持 GitHub Flavored Markdown (GFM)，包括标题、加粗、斜体、链接、图片、代码高亮、表格、任务列表和引用。' },
        { q: '可以转换长文档吗？', a: '可以，支持最大 500KB 的文档。超长文档可能需要多几秒生成时间。' },
      ],
    },
    word: {
      howToTitle: '如何将 Markdown 转换为 Word',
      howToSteps: ['打开 Word 转换页面', '粘贴 Markdown 文本或上传 .md 文件', '预览格式化输出', '点击"转换为 Word"下载 .docx'],
      whyTitle: '为什么要将 Markdown 转为 Word？',
      whyContent: 'Word 文档是商务沟通的标准格式。将 Markdown 笔记、AI 输出或技术文档转为 .docx，方便在 Microsoft Word、Google Docs 或 LibreOffice 中编辑。',
      features: [
        { title: '真正的 .docx 格式', desc: '生成在 Microsoft Word、Google Docs 和 LibreOffice 中完美打开的 Word 文档。' },
        { title: '保留格式', desc: '标题、列表、表格、加粗、斜体和代码块都会保留。' },
        { title: 'AI 输出就绪', desc: '完美适合将 ChatGPT 或 Claude 的回复转为可编辑的 Word 文档。' },
        { title: '免费无限', desc: '无每日额度。转换完全在您的浏览器中完成，内容始终留在您的设备上。' },
      ],
      faq: [
        { q: 'Word 输出可以编辑吗？', a: '可以！生成的 .docx 文件可在 Microsoft Word、Google Docs 或任何支持 Word 格式的应用中完全编辑。' },
        { q: '支持表格吗？', a: '支持，Markdown 表格会转为原生 Word 表格。' },
        { q: '代码块怎么处理？', a: '代码块以等宽字体和浅灰色背景呈现。' },
        { q: '可以转换 AI 生成的内容吗？', a: '当然！直接粘贴 ChatGPT、Claude 或任何 AI 工具的输出即可。' },
        { q: '有大小限制吗？', a: '支持最大 500KB 的内容，大多数文档远在此范围内。' },
      ],
    },
    html: {
      howToTitle: '如何将 Markdown 转换为 HTML',
      howToSteps: ['打开 HTML 转换页面', '粘贴 Markdown 文本或上传 .md 文件', '预览渲染后的 HTML 输出', '点击"转换为 HTML"下载或"复制 HTML"获取源代码'],
      whyTitle: '为什么要将 Markdown 转为 HTML？',
      whyContent: 'HTML 是网页的语言。将 Markdown 转为 HTML 可用于网站、博客、邮件或任何网络平台。我们的转换器完全在浏览器中运行——数据不会离开您的设备。',
      features: [
        { title: '100% 浏览器端', desc: '数据不离开浏览器，无服务器、无上传，完全隐私。' },
        { title: '始终免费', desc: 'HTML 转换没有每日限制，无限次使用。' },
        { title: '复制或下载', desc: '下载 .html 文件或复制 HTML 源代码到剪贴板。' },
        { title: '干净输出', desc: '语义化 HTML，标题层级正确，列表、表格和代码块完整。' },
      ],
      faq: [
        { q: '数据会发送到服务器吗？', a: '不会！与 PDF 和 Word 一样，HTML 转换完全在浏览器中完成，内容不会离开您的设备。' },
        { q: '有转换限制吗？', a: '没有！HTML 转换完全无限制，即使没有账号也可以。' },
        { q: '"复制 HTML"按钮是做什么的？', a: '它会将 HTML 源代码复制到剪贴板，您可以粘贴到网站编辑器、邮件模板或任何接受 HTML 的工具中。' },
        { q: '包含 CSS 样式吗？', a: '下载的 .html 文件包含基础内联 CSS。复制的 HTML 源代码不含样式，您可以添加自己的 CSS。' },
        { q: '可以用来写博客吗？', a: '可以！将 Markdown 文章转为 HTML 并粘贴到博客编辑器中。' },
      ],
    },
  },

  guidesIndex: {
    title: 'Markdown 指南',
    subtitle: '通过交互式示例学习 Markdown 语法。',
  },

  footer: {
    tools: '工具',
    guides: '指南',
    legal: '法律',
    language: '语言',
    copyright: '© {year} Markdown to PDF. 保留所有权利。',
  },

  pricing: {
    title: '定价',
    subtitle: 'Markdown to PDF 完全免费，且完全在您的浏览器中运行。',
    free: {
      title: '免费',
      price: '$0',
      features: [
        '无限 PDF 转换（无需注册）',
        '无限 Word (.docx) 转换',
        '无限 HTML 转换',
        '100% 浏览器端运行——您的内容永不离开设备',
        '实时预览',
        '文件上传支持',
        '转换历史（需要免费账号）',
      ],
    },
  },

  prefill: `# 欢迎使用 Markdown 转 PDF

这是 **Markdown** 格式 — ChatGPT、Claude 等 AI 工具使用的相同格式。

## 使用方法
1. 全选此处文本 (Ctrl+A / Cmd+A)
2. 粘贴您的 Markdown 或 AI 生成的文本
3. 在右侧预览格式化效果 →
4. 点击下方 **转换为 PDF**

## Markdown 基础语法
- \`#\` 创建标题
- \`**加粗**\` 使文本 **加粗**
- \`-\` 创建像这样的列表

> 提示：您不需要学习 Markdown — 直接粘贴并转换！
`,
} as const;

export default zh;
