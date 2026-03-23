'use client';

/**
 * Comprehensive usage check — determines if user can convert.
 * Source: 03-产品结构 §4.6, 06-数据库设计 §5
 *
 * Rules:
 * - HTML: always allowed (no limit)
 * - Anonymous PDF/Word: 2/day (localStorage)
 * - Logged-in PDF/Word: 5/day (DB daily_usage)
 */

import type { ConvertFormat } from '@/lib/types';
import { USAGE_LIMITS } from '@/lib/types';
import { getAnonymousUsageCount } from './client-tracker';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

export interface UsageStatus {
  canConvert: boolean;
  remaining: number;
  limit: number;
  isLoggedIn: boolean;
  isHtml: boolean;
}

export async function checkUsage(format: ConvertFormat): Promise<UsageStatus> {
  // HTML is always unlimited
  if (format === 'html') {
    return { canConvert: true, remaining: Infinity, limit: Infinity, isLoggedIn: false, isHtml: true };
  }

  const supabase = getSupabaseBrowserClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    // Anonymous user — check localStorage
    const used = getAnonymousUsageCount();
    const limit = USAGE_LIMITS.ANONYMOUS_DAILY;
    return {
      canConvert: used < limit,
      remaining: Math.max(0, limit - used),
      limit,
      isLoggedIn: false,
      isHtml: false,
    };
  }

  // Logged-in user — check DB
  const { data } = await supabase
    .from('daily_usage')
    .select('pdf_word_count')
    .eq('usage_date', new Date().toISOString().slice(0, 10))
    .single();

  const used = data?.pdf_word_count || 0;
  const limit = USAGE_LIMITS.LOGGED_IN_DAILY;

  return {
    canConvert: used < limit,
    remaining: Math.max(0, limit - used),
    limit,
    isLoggedIn: true,
    isHtml: false,
  };
}
