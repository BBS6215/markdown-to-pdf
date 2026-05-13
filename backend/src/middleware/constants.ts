/**
 * Backend constants — mirrors shared/types.ts values.
 * Kept separate to avoid cross-workspace import issues with pnpm.
 * IMPORTANT: If you change these, also update shared/types.ts and frontend/lib/types.ts.
 */

export const CONTENT_LIMITS = {
  MAX_REQUEST_BODY: 500 * 1024, // 500KB
} as const;

export const USAGE_LIMITS = {
  IP_DAILY: 50,
} as const;
