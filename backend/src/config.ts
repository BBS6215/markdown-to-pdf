/**
 * Backend environment configuration.
 * Source: 05-技术方案文档 附录 C
 */

export const config = {
  /** Server port (Render default: 10000) */
  port: parseInt(process.env.PORT || '4000', 10),

  /** Allowed CORS origin */
  allowedOrigin: process.env.ALLOWED_ORIGIN || 'http://localhost:3000',

  /** Node environment */
  nodeEnv: process.env.NODE_ENV || 'development',

  /** Puppeteer executable path (set in Dockerfile for production; undefined = use bundled Chrome in dev) */
  puppeteerExecutablePath:
    process.env.PUPPETEER_EXECUTABLE_PATH || undefined,

  /** Supabase URL (required for logged-in flows) */
  supabaseUrl: process.env.SUPABASE_URL,
  /** Service role key — used for quota RPCs and history writes (bypasses RLS) */
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  /** Anon key — used to verify user JWTs via auth.getUser(token) */
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
} as const;
