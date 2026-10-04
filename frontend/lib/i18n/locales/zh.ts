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
      subheading: '粘贴 Markdown，实时预览并在浏览器中导出 PDF；无需注册，内容不会上传。',
      convertButton: '转换为 PDF',
    },
    word: {
      h1: '在线 Markdown (.md) 转 Word — 免费工具',
      subheading: '粘贴 Markdown，实时预览并下载 Word（.docx）；无需注册，内容不会上传。',
      convertButton: '转换为 Word',
    },
    html: {
      h1: '在线 Markdown (.md) 转 HTML — 免费工具',
      subheading: '粘贴 Markdown，实时预览并复制干净的 HTML；无需注册，内容不会上传。',
      convertButton: '转换为 HTML',
      copyHtml: '复制 HTML',
    },
  },

  editor: {
    inputTitle: 'Markdown 输入',
    inputSubtitle: '粘贴来自 ChatGPT、Claude 或任何文本编辑器的内容',
    previewTitle: '实时预览',
    previewSubtitle: 'Markdown 效果预览',
    placeholder: '在此粘贴 Markdown 或 AI 生成的文本 — 支持 ChatGPT、Claude、Notion 或任何 .md 文件',
    uploadButton: '上传 .md',
    dropHint: '拖拽 .md 文件到此处',
    editTab: '编辑',
    previewTab: '预览',
    loading: '正在加载编辑器...',
    previewError: '预览更新失败，以下内容可能已过期。',
    readingFile: '正在读取文件…',
    fileErrors: {
      unsupported: '请选择 .md、.markdown 或 .txt 文件。',
      encoding: '无法识别文件编码，请另存为 UTF-8 后重试。',
      read: '读取文件失败，已保留当前内容。',
    },
    sourceStats: '源码 {characters} 字符 · {size} KiB',
    bodyStats: '正文 {characters} 字符',
    wordStats: ' · {words} 词',
    fragmentStats: '预览片段 {characters} 字符',
    statsHint: '源码包含空白和 Markdown 符号，正文不含空白。字符按 Unicode 码点计算，词数为语言分词结果。',
    truncated: '长文仅预览部分内容，导出仍包含全文。',
    storageWarning: '浏览器暂时无法保存草稿，请先复制或下载内容，再刷新或切换语言。',
    clear: '清空',
    cleared: '已清空',
    undo: '撤销',
  },

  conversion: {
    generating: '正在生成 {format}...',
    downloaded: '下载完成！',
    copied: '已复制！',
    printOpened: '打印对话框已打开，请选择“另存为 PDF”。',
    failed: '生成 {format} 失败。',
    copyFailed: '复制 HTML 失败，请检查剪贴板权限或下载 HTML 文件。',
    downloadHtml: '下载 HTML',
    copySource: '复制 HTML 源码',
    retry: '重试',
    timeout: '转换超时，请尝试缩短内容。',
    remaining: '',
    signUpPrompt: '注册免费账号即可保存转换历史，无需信用卡。',
    signUpButton: '注册',
    limitReached: '',
    htmlFree: '所有转换均可免费使用，并在您的浏览器中完成，受设备内存和浏览器能力限制。',
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
    redirecting: '正在跳转...',
    passwordLoginPlaceholder: '请输入密码',
    passwordSignupPlaceholder: '至少 6 个字符',
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
    subtitle: 'Markdown to PDF 可免费使用，且完全在您的浏览器中运行。',
    free: {
      title: '免费',
      price: '$0',
      features: [
        'PDF 转换（无需注册）',
        'Word (.docx) 转换',
        'HTML 转换',
        '100% 浏览器端运行——您的内容永不离开设备',
        '实时预览',
        '文件上传支持',
        '转换历史（需要免费账号）',
      ],
    },
  },

} as const;

export default zh;
