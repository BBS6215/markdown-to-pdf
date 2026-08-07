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
      subheading: 'Paste Markdown, preview it live, and export a PDF in your browser — no signup or upload.',
      convertButton: 'Convert to PDF',
    },
    word: {
      h1: 'Convert Markdown (.md) to Word — Free Online Tool',
      subheading: 'Paste Markdown, preview it live, and download a Word (.docx) file — no signup or upload.',
      convertButton: 'Convert to Word',
    },
    html: {
      h1: 'Convert Markdown (.md) to HTML — Free Online Tool',
      subheading: 'Paste Markdown, preview it live, and copy clean HTML — no signup or upload.',
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
    previewError: 'Preview failed to update — the content below may be outdated.',
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
    htmlFree: 'All conversions are free to use and run in your browser, subject to your device memory and browser limits.',
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
        'PDF conversion with no account needed',
        'Word (.docx) conversion',
        'HTML conversion',
        'Runs 100% in your browser — your content never leaves your device',
        'Real-time preview',
        'File upload support',
        'Conversion history (with free account)',
      ],
    },
  },

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
