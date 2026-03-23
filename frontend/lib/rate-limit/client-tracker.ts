'use client';

/**
 * Anonymous user rate limit tracking via localStorage.
 * Source: 06-数据库设计 §5.4, 07 §11.4 T4
 *
 * Key format: "md-usage-{YYYY-MM-DD}" = { count: N }
 */

function getTodayKey(): string {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  return `md-usage-${today}`;
}

export function getAnonymousUsageCount(): number {
  try {
    const data = localStorage.getItem(getTodayKey());
    if (!data) return 0;
    const parsed = JSON.parse(data);
    return parsed.count || 0;
  } catch {
    return 0;
  }
}

export function incrementAnonymousUsage(): void {
  try {
    const key = getTodayKey();
    const current = getAnonymousUsageCount();
    localStorage.setItem(key, JSON.stringify({ count: current + 1 }));
  } catch {
    // ignore
  }
}
