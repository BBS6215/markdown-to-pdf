/**
 * Returns a path that is safe to redirect to.
 *
 * Accepts only same-origin absolute paths:
 *   - must start with exactly one '/'
 *   - second char cannot be '/' or '\' (protocol-relative / backslash trick)
 *   - cannot contain whitespace, newlines, or a URI scheme
 *
 * Anything else (https://evil.com, //evil.com, javascript:..., null, '')
 * is replaced with the safe fallback. The fallback is the locale root so the
 * user lands somewhere reasonable.
 */
export function sanitizeRedirectPath(
  input: string | null | undefined,
  fallback: string = '/en'
): string {
  if (typeof input !== 'string') return fallback;
  if (input.length === 0) return fallback;
  if (/[\s\r\n]/.test(input)) return fallback;
  if (input[0] !== '/') return fallback;
  if (input.length >= 2 && (input[1] === '/' || input[1] === '\\')) return fallback;
  // Reject anything that looks like a URI scheme (e.g. /javascript:alert is
  // already blocked by the leading-slash check, but defense-in-depth).
  if (/[a-z][a-z0-9+\-.]*:/i.test(input)) return fallback;
  return input;
}
