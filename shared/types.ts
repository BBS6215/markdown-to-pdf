/**
 * Shared types between frontend and backend.
 * Source of truth: 05-技术方案文档 §4.3 + 06-数据库设计说明 §3
 */

// ─── Convert API Types ───────────────────────────────────────

/** Supported output formats */
export type ConvertFormat = 'pdf' | 'word' | 'html';

/** Request body for POST /api/convert/pdf and /api/convert/word */
export interface ConvertRequest {
  markdown: string;
}

/** Error response body from backend (05 §5.6) */
export interface ConvertErrorResponse {
  error:
    | 'INVALID_INPUT'
    | 'PAYLOAD_TOO_LARGE'
    | 'RATE_LIMITED'
    | 'CONVERSION_FAILED'
    | 'TIMEOUT';
  message: string;
}

// ─── Database Types (mirrors Supabase schema) ────────────────

/** conversion_history row (06 §3.1) */
export interface ConversionHistory {
  id: string;
  user_id: string;
  format: ConvertFormat;
  filename: string;
  file_size_bytes: number | null;
  source_size_bytes: number | null;
  status: 'success' | 'failed';
  created_at: string;
}

/** daily_usage row (06 §3.2) */
export interface DailyUsage {
  id: string;
  user_id: string;
  usage_date: string;
  pdf_word_count: number;
  created_at: string;
  updated_at: string;
}

// ─── Rate Limit Constants ────────────────────────────────────

/** Usage limits (01 §6.3, 06 §5.4) */
export const USAGE_LIMITS = {
  /** Anonymous users: PDF/Word conversions per day */
  ANONYMOUS_DAILY: 2,
  /** Logged-in users: PDF/Word conversions per day */
  LOGGED_IN_DAILY: 5,
  /** IP-based rate limit per day (backend, 05 §6.2, docs/06 §1) */
  IP_DAILY: 10,
  /** HTML has no limit */
  HTML_UNLIMITED: true,
} as const;

// ─── Content Limits ──────────────────────────────────────────

/** Content size limits (05 §11) */
export const CONTENT_LIMITS = {
  /** Max request body size in bytes (500KB) */
  MAX_REQUEST_BODY: 500 * 1024,
  /** Preview truncation threshold in bytes (200KB) */
  PREVIEW_TRUNCATION: 200 * 1024,
} as const;

// ─── File Extension Mapping ──────────────────────────────────

/** Format to file extension mapping (06 §3.3) */
export const FORMAT_EXTENSIONS: Record<ConvertFormat, string> = {
  pdf: '.pdf',
  word: '.docx',
  html: '.html',
};

/** Format to MIME type mapping (05 §5.6) */
export const FORMAT_MIME_TYPES: Record<ConvertFormat, string> = {
  pdf: 'application/pdf',
  word: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  html: 'text/html',
};
