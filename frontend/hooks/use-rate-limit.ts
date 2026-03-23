'use client';

/**
 * Rate limit state hook — tracks remaining conversions.
 * Source: 07 §4 Phase 3 任务 3.12
 */

import { useState, useEffect, useCallback } from 'react';
import type { ConvertFormat } from '@/lib/types';
import { checkUsage, type UsageStatus } from '@/lib/rate-limit/usage-checker';

const DEFAULT_STATUS: UsageStatus = {
  canConvert: true,
  remaining: 2,
  limit: 2,
  isLoggedIn: false,
  isHtml: false,
};

export function useRateLimit(format: ConvertFormat) {
  const [usage, setUsage] = useState<UsageStatus>(DEFAULT_STATUS);

  const refresh = useCallback(async () => {
    const status = await checkUsage(format);
    setUsage(status);
  }, [format]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { ...usage, refresh };
}
