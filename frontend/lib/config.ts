/**
 * Frontend global configuration.
 * Source: 05-技术方案 附录 C
 */

export const config = {
  /** Supabase project URL */
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,

  /** Supabase anonymous key */
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,

  /** Backend API URL (Render) */
  backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000',

  /** Site URL */
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL || 'https://markdown-to-pdf.app',
} as const;
