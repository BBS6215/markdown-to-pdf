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
 */
export async function convertToPdf(markdown: string): Promise<ConvertResult> {
  return callConvertApi('/api/convert/pdf', markdown);
}

/**
 * Convert Markdown to Word via backend API.
 */
export async function convertToWord(markdown: string): Promise<ConvertResult> {
  return callConvertApi('/api/convert/word', markdown);
}

async function callConvertApi(path: string, markdown: string): Promise<ConvertResult> {
  const response = await fetch(`${config.backendUrl}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
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
