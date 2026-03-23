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
    color: 'border-red-600',
    hoverColor: 'hover:text-red-600',
    bgColor: 'bg-red-600 hover:bg-red-700',
    textColor: 'text-red-600',
    ext: '.pdf',
  },
  word: {
    label: 'Word',
    color: 'border-blue-600',
    hoverColor: 'hover:text-blue-600',
    bgColor: 'bg-blue-600 hover:bg-blue-700',
    textColor: 'text-blue-600',
    ext: '.docx',
  },
  html: {
    label: 'HTML',
    color: 'border-orange-500',
    hoverColor: 'hover:text-orange-500',
    bgColor: 'bg-orange-500 hover:bg-orange-600',
    textColor: 'text-orange-500',
    ext: '.html',
  },
};

/** Conversion state */
export type ConversionStatus = 'idle' | 'loading' | 'success' | 'error';

/** Usage limits (mirrored from shared) */
export const USAGE_LIMITS = {
  ANONYMOUS_DAILY: 2,
  LOGGED_IN_DAILY: 5,
} as const;

/** Content limits */
export const CONTENT_LIMITS = {
  MAX_REQUEST_BODY: 500 * 1024,
  PREVIEW_TRUNCATION: 200 * 1024,
} as const;
