/**
 * Server-side quota and history service.
 * Calls the SECURITY DEFINER RPCs created in migration server_authoritative_quota.
 *
 * Source: docs/09-服务端权威用量补丁.md
 */

import { getAdminClient } from './supabase.js';

const LOGGED_IN_DAILY_LIMIT = 5;

export interface ConsumeResult {
  allowed: boolean;
  count: number;
  limit: number | null;
}

export async function consumeQuota(
  userId: string,
  format: 'pdf' | 'word' | 'html'
): Promise<ConsumeResult> {
  const { data, error } = await getAdminClient().rpc('consume_quota', {
    p_user_id: userId,
    p_format: format,
    p_limit: LOGGED_IN_DAILY_LIMIT,
  });
  if (error) throw new Error(`consume_quota failed: ${error.message}`);
  return data as ConsumeResult;
}

export async function refundQuota(
  userId: string,
  format: 'pdf' | 'word' | 'html'
): Promise<void> {
  const { error } = await getAdminClient().rpc('refund_quota', {
    p_user_id: userId,
    p_format: format,
  });
  if (error) {
    // Refund failures must not block the user response; log loudly.
    console.error('[quota] refund failed:', error.message);
  }
}

export async function recordConversion(params: {
  userId: string;
  format: 'pdf' | 'word' | 'html';
  filename: string;
  fileSizeBytes: number | null;
  sourceSizeBytes: number;
  status: 'success' | 'failed';
}): Promise<void> {
  const { error } = await getAdminClient().rpc('record_conversion', {
    p_user_id: params.userId,
    p_format: params.format,
    p_filename: params.filename,
    p_file_size_bytes: params.fileSizeBytes,
    p_source_size_bytes: params.sourceSizeBytes,
    p_status: params.status,
  });
  if (error) {
    // History write is "nice to have" — never fail the request because of it.
    console.error('[quota] record_conversion failed:', error.message);
  }
}
