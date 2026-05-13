/**
 * Backend API client for PDF and Word conversion.
 * Source: 05-技术方案 §5.1-5.2 (数据流)
 */

import { config } from '@/lib/config';

interface ConvertResult {
  blob: Blob;
  filename: string;
}

/**
 * Convert Markdown to PDF via backend API.
 * @param accessToken Supabase access_token for logged-in users; null for anonymous.
 */
export async function convertToPdf(
  markdown: string,
  accessToken: string | null
): Promise<ConvertResult> {
  return callConvertApi('/api/convert/pdf', markdown, accessToken);
}

/**
 * Convert Markdown to Word via backend API.
 */
export async function convertToWord(
  markdown: string,
  accessToken: string | null
): Promise<ConvertResult> {
  return callConvertApi('/api/convert/word', markdown, accessToken);
}

async function callConvertApi(
  path: string,
  markdown: string,
  accessToken: string | null
): Promise<ConvertResult> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  const response = await fetch(`${config.backendUrl}${path}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ markdown }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Conversion failed' }));
    throw new ConvertError(response.status, error.error || 'UNKNOWN', error.message);
  }

  const blob = await response.blob();

  // Extract filename from Content-Disposition header
  const disposition = response.headers.get('Content-Disposition') || '';
  const filenameMatch = disposition.match(/filename="?([^";\s]+)"?/);
  const filename = filenameMatch?.[1] || 'download';

  return { blob, filename };
}

export class ConvertError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string
  ) {
    super(message);
    this.name = 'ConvertError';
  }

  get isTimeout() { return this.status === 504; }
  get isRateLimited() { return this.status === 429; }
  get isPayloadTooLarge() { return this.status === 413; }
}
