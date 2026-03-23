/**
 * Backend constants (mirroring shared/types.ts values for backend use).
 * Avoids cross-workspace import issues during development.
 */

export const CONTENT_LIMITS = {
  MAX_REQUEST_BODY: 500 * 1024, // 500KB
} as const;

export const USAGE_LIMITS = {
  IP_DAILY: 10,
} as const;
