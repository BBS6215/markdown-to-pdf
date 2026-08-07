/**
 * Frontend-specific types.
 * Shared types are in @mdpdf/shared (but we duplicate key ones here to avoid cross-workspace issues).
 */

export type SupportedLang = 'en' | 'zh';
export const SUPPORTED_LANGS: SupportedLang[] = ['en', 'zh'];
export const DEFAULT_LANG: SupportedLang = 'en';

/** Supported output formats */
export type ConvertFormat = 'pdf' | 'word' | 'html';

/** Format display config */
export const FORMAT_CONFIG: Record<
  ConvertFormat,
  { label: string; color: string; hoverColor: string; bgColor: string; textColor: string; ext: string }
> = {
  pdf: {
    label: 'PDF',
    color: 'border-format-pdf',
    hoverColor: 'hover:text-format-pdf',
    bgColor: 'bg-format-pdf hover:bg-format-pdf-hover',
    textColor: 'text-format-pdf',
    ext: '.pdf',
  },
  word: {
    label: 'Word',
    color: 'border-format-word',
    hoverColor: 'hover:text-format-word',
    bgColor: 'bg-format-word hover:bg-format-word-hover',
    textColor: 'text-format-word',
    ext: '.docx',
  },
  html: {
    label: 'HTML',
    color: 'border-format-html',
    hoverColor: 'hover:text-format-html',
    bgColor: 'bg-format-html hover:bg-format-html-hover',
    textColor: 'text-format-html',
    ext: '.html',
  },
};

/** Conversion state */
export type ConversionStatus = 'idle' | 'loading' | 'success' | 'error';

/**
 * What the user just triggered. Lets the success-state UI pick a message
 * that matches what actually happened (downloaded a file vs. copied to
 * clipboard vs. opened the print dialog).
 */
export type ConversionAction = 'download' | 'copy' | 'print' | null;

/** Content limits */
export const CONTENT_LIMITS = {
  MAX_REQUEST_BODY: 500 * 1024,
  PREVIEW_TRUNCATION: 200 * 1024,
} as const;
