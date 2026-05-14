'use client';

/**
 * Usage status helper.
 *
 * The frontend-only pipeline (HTML/PDF/Word all run in the browser) has no
 * server-side quota to enforce, so this function now always reports that
 * the user can convert. The interface is kept intact so that re-enabling a
 * backend renderer later only requires changing this file.
 *
 * Source: docs/03 §4.6 (post frontend-only refactor)
 */

import type { ConvertFormat } from '@/lib/types';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

export interface UsageStatus {
  canConvert: boolean;
  remaining: number;
  limit: number;
  isLoggedIn: boolean;
  isHtml: boolean;
}

export async function checkUsage(format: ConvertFormat): Promise<UsageStatus> {
  const isHtml = format === 'html';

  // Auth lookup is best-effort: a Supabase outage must not block conversions.
  let isLoggedIn = false;
  try {
    const supabase = getSupabaseBrowserClient();
    const { data } = await supabase.auth.getUser();
    isLoggedIn = !!data?.user;
  } catch {
    // Treat as anonymous; UI keeps working.
  }

  return {
    canConvert: true,
    remaining: Infinity,
    limit: Infinity,
    isLoggedIn,
    isHtml,
  };
}
