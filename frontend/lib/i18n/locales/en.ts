/**
 * English translations — type source for all other locales.
 * Source: 03-1-交互补充 §1.2 (文案), 02-SEO策略 附录 C (TDK)
 */

const en = {
  // ─── Common ─────────────────────────────────────────
  common: {
    siteName: 'Markdown to PDF',
    login: 'Login',
    signup: 'Sign up',
    logout: 'Log out',
    dashboard: 'Dashboard',
    guides: 'Guides',
    loading: 'Loading...',
  },

  // ─── Tool Pages ─────────────────────────────────────
  tool: {
    pdf: {
      h1: 'Convert Markdown (.md) to PDF — Free Online Tool',
      subheading: 'Convert your Markdown or AI-generated text into a professional PDF in seconds.',
      convertButton: 'Convert to PDF',
    },
    word: {
      h1: 'Convert Markdown (.md) to Word — Free Online Tool',
      subheading: 'Convert your Markdown or AI-generated text into a Word document in seconds.',
      convertButton: 'Convert to Word',
    },
    html: {
      h1: 'Convert Markdown (.md) to HTML — Free Online Tool',
      subheading: 'Convert your Markdown to clean HTML — 100% in your browser, data never leaves your device.',
      convertButton: 'Convert to HTML',
      copyHtml: 'Copy HTML',
    },
  },

  // ─── Editor ─────────────────────────────────────────
  editor: {
    inputTitle: 'Markdown Input',
    inputSubtitle: 'Paste from ChatGPT, Claude, or any text editor',
    previewTitle: 'Live Preview',
    previewSubtitle: 'Renders as your file will look',
    placeholder: 'Paste your Markdown or AI text here — supports text from ChatGPT, Claude, Notion, or any .md file',
    uploadButton: 'Upload .md',
    dropHint: 'Drop .md file here',
    editTab: 'Edit',
    previewTab: 'Preview',
    loading: 'Loading editor...',
  },

  // ─── Conversion ─────────────────────────────────────
  conversion: {
    generating: 'Generating your {format}...',
    downloaded: 'Downloaded!',
    copied: 'Copied!',
    printOpened: 'Print dialog opened. Choose "Save as PDF".',
    failed: 'Failed to generate {format}.',
    retry: 'Retry',
    timeout: 'Conversion timed out. Try shorter content.',
    remaining: '',
    signUpPrompt: 'Sign up to save your conversion history — no credit card needed.',
    signUpButton: 'Sign up',
    limitReached: '',
    htmlFree: 'All conversions are free and unlimited — and happen entirely in your browser.',
  },

  // ─── Auth ───────────────────────────────────────────
  auth: {
    welcome: 'Welcome',
    signUpSubtitle: 'Sign up to save your conversion history — no credit card needed.',
    email: 'Email',
    password: 'Password',
    loginButton: 'Log in',
    signupButton: 'Sign up',
    noAccount: "Don't have an account?",
    hasAccount: 'Already have an account?',
    checkEmail: 'Check your email to confirm your account.',
    googleButton: 'Continue with Google',
    redirecting: 'Redirecting...',
    passwordLoginPlaceholder: 'Your password',
    passwordSignupPlaceholder: 'At least 6 characters',
    authFailed: 'Authentication failed. Please try again.',
    or: 'or',
  },

  // ─── Dashboard ──────────────────────────────────────
  dashboard: {
    title: 'Dashboard',
    todayUsage: '',
    remaining: '',
    resetNote: '',
    historyTitle: 'Conversion History',
    historyEmpty: 'No conversions yet. Try converting some Markdown!',
    privacyNote: 'Only file names and timestamps are kept — your actual content never reaches our servers.',
  },

  // ─── SEO Content (tool page below-fold) ─────────────
  seo: {
    pdf: {
      howToTitle: 'How to Convert Markdown to PDF',
      howToSteps: [
        'Open markdown-to-pdf.app in your browser',
        'Paste your Markdown or AI-generated text into the editor',
        'Preview the formatted result in the right panel',
        'Click "Convert to PDF" to download your file',
      ],
      whyTitle: 'Why Convert Markdown to PDF?',
      whyContent: 'PDF is the universal format for sharing documents. Whether you need to submit an AI-generated report, share meeting notes, or archive your documentation, converting Markdown to PDF ensures your content looks professional and consistent across all devices and platforms.',
      features: [
        { title: 'Instant Conversion', desc: 'Convert Markdown to PDF in seconds — no signup, no upload, no waiting.' },
        { title: 'AI-Friendly', desc: 'Paste output from ChatGPT, Claude, Gemini, or any AI tool directly.' },
        { title: 'Professional Layout', desc: 'Clean GitHub-style formatting with proper headings, tables, code blocks, and images.' },
        { title: 'Free & Unlimited', desc: 'No daily caps. No paywall. Conversion runs entirely in your browser.' },
      ],
      faq: [
        { q: 'Is this tool free?', a: 'Yes — completely free and unlimited. No account is required. An optional free account just saves your conversion history.' },
        { q: 'What is Markdown? Do I need to learn it?', a: 'Markdown is a simple text formatting language — those #, **, and - symbols you see in ChatGPT or Claude output. You don\'t need to learn it. Just paste your text and we\'ll convert it into a clean PDF.' },
        { q: 'Is my data safe?', a: 'Yes. PDF generation happens entirely in your browser via the native print engine — your Markdown content never reaches our server. Your file stays on your device.' },
        { q: 'What Markdown features are supported?', a: 'We support GitHub Flavored Markdown (GFM) including headings, bold, italic, links, images, code blocks with syntax highlighting, tables, task lists, and blockquotes.' },
        { q: 'Can I convert long documents?', a: 'Yes, you can convert documents up to 500KB in size. For very long documents, the PDF may take a few extra seconds to generate.' },
      ],
    },
    word: {
      howToTitle: 'How to Convert Markdown to Word',
      howToSteps: [
        'Open the Word converter page',
        'Paste your Markdown text or upload a .md file',
        'Preview the formatted output',
        'Click "Convert to Word" to download as .docx',
      ],
      whyTitle: 'Why Convert Markdown to Word?',
      whyContent: 'Word documents are the standard for business communication. Convert your Markdown notes, AI outputs, or technical documentation to .docx format for easy editing in Microsoft Word, Google Docs, or LibreOffice.',
      features: [
        { title: 'Real .docx Format', desc: 'Generate genuine Word documents that open perfectly in Microsoft Word, Google Docs, and LibreOffice.' },
        { title: 'Preserve Formatting', desc: 'Headings, lists, tables, bold, italic, and code blocks are all preserved.' },
        { title: 'AI Output Ready', desc: 'Perfect for converting ChatGPT or Claude responses into editable Word documents.' },
        { title: 'Free & Unlimited', desc: 'No daily caps. Conversion runs entirely in your browser — your content stays on your device.' },
      ],
      faq: [
        { q: 'Is the Word output editable?', a: 'Yes! The generated .docx file is fully editable in Microsoft Word, Google Docs, or any application that supports the Word format.' },
        { q: 'Does it support tables?', a: 'Yes, Markdown tables are converted to native Word tables with proper formatting.' },
        { q: 'What about code blocks?', a: 'Code blocks are rendered in monospace font with a light gray background. Syntax highlighting in Word is limited compared to PDF.' },
        { q: 'Can I convert AI-generated content?', a: 'Absolutely! Just paste the output from ChatGPT, Claude, or any AI tool and convert it to a Word document.' },
        { q: 'Is there a size limit?', a: 'Content up to 500KB is supported. Most documents are well within this limit.' },
      ],
    },
    html: {
      howToTitle: 'How to Convert Markdown to HTML',
      howToSteps: [
        'Open the HTML converter page',
        'Paste your Markdown text or upload a .md file',
        'Preview the rendered HTML output',
        'Click "Convert to HTML" to download or "Copy HTML" for the source code',
      ],
      whyTitle: 'Why Convert Markdown to HTML?',
      whyContent: 'HTML is the language of the web. Convert your Markdown to HTML for use in websites, blogs, emails, or any web-based platform. Our converter runs entirely in your browser — your data never leaves your device.',
      features: [
        { title: '100% Client-Side', desc: 'Your data never leaves your browser. No server, no uploads, complete privacy.' },
        { title: 'Always Free', desc: 'HTML conversion has no daily limit. Convert as many times as you need.' },
        { title: 'Copy or Download', desc: 'Download as an .html file or copy the HTML source code to your clipboard.' },
        { title: 'Clean Output', desc: 'Semantic HTML with proper heading hierarchy, lists, tables, and code blocks.' },
      ],
      faq: [
        { q: 'Is my data sent to a server?', a: 'No! Like PDF and Word, HTML conversion happens entirely in your browser. Your content never leaves your device.' },
        { q: 'Is there a conversion limit?', a: 'No! HTML conversion is completely unlimited, even without an account.' },
        { q: 'What is the "Copy HTML" button for?', a: 'It copies the HTML source code to your clipboard. You can paste it into a website editor, email template, or any tool that accepts HTML.' },
        { q: 'Does it include CSS styling?', a: 'The downloaded .html file includes basic inline CSS for a clean, readable layout. The copied HTML source code is unstyled — you can add your own CSS.' },
        { q: 'Can I use this for my blog?', a: 'Yes! Convert your Markdown posts to HTML and paste them into your blog\'s editor.' },
      ],
    },
  },

  // ─── Guide pages ────────────────────────────────────
  guidesIndex: {
    title: 'Markdown Guides',
    subtitle: 'Learn Markdown syntax with interactive examples.',
  },

  // ─── Footer ─────────────────────────────────────────
  footer: {
    tools: 'Tools',
    guides: 'Guides',
    legal: 'Legal',
    language: 'Language',
    copyright: '© {year} Markdown to PDF. All rights reserved.',
  },

  // ─── Pricing ────────────────────────────────────────
  pricing: {
    title: 'Pricing',
    subtitle: 'Markdown to PDF is free to use — and runs entirely in your browser.',
    free: {
      title: 'Free',
      price: '$0',
      features: [
        'Unlimited PDF conversions (no account needed)',
        'Unlimited Word (.docx) conversions',
        'Unlimited HTML conversions',
        'Runs 100% in your browser — your content never leaves your device',
        'Real-time preview',
        'File upload support',
        'Conversion history (with free account)',
      ],
    },
  },

  // ─── Prefill example ───────────────────────────────
  prefill: `# Welcome to Markdown to PDF

This is **Markdown** — the same format used by ChatGPT, Claude, and other AI tools.

## How to use
1. Select all text here (Ctrl+A / Cmd+A)
2. Paste your own Markdown or AI-generated text
3. Preview the formatted result on the right →
4. Click **Convert to PDF** below

## Markdown basics
- \`#\` creates headings
- \`**bold**\` makes text **bold**
- \`-\` creates bullet lists like this one

> Tip: You don't need to know Markdown — just paste and convert!
`,
} as const;

/** Recursively widen literal types to string/number/boolean for locale compatibility */
type Widen<T> = T extends string
  ? string
  : T extends number
  ? number
  : T extends boolean
  ? boolean
  : T extends readonly (infer U)[]
  ? readonly Widen<U>[]
  : T extends object
  ? { [K in keyof T]: Widen<T[K]> }
  : T;

export type Translations = Widen<typeof en>;
export default en;
