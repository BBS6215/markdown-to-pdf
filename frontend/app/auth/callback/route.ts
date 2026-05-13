/**
 * OAuth callback route — handles Supabase Auth redirect.
 * Source: 05-技术方案 §8.1 (Redirect URLs), §4.1 (app/auth/callback/route.ts)
 */

import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { sanitizeRedirectPath } from '@/lib/auth/safe-redirect';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // Defense-in-depth: even though the redirect path was sanitized at the call
  // site, never trust query params on the way out. //evil.com or scheme URIs
  // get replaced with the locale root.
  const next = sanitizeRedirectPath(searchParams.get('next'));

  if (code) {
    const supabase = await getSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Auth error — redirect to login with error
  return NextResponse.redirect(`${origin}/en/auth/login?error=auth_callback_failed`);
}
