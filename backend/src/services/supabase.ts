/**
 * Supabase clients for backend use.
 * - adminClient: service_role key, bypasses RLS, used for quota RPCs and history writes.
 * - authClient: anon key, used only to verify user JWTs via auth.getUser(token).
 *
 * Source: docs/09-服务端权威用量补丁.md
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { config } from '../config.js';

let adminClient: SupabaseClient | null = null;
let authClient: SupabaseClient | null = null;

export function getAdminClient(): SupabaseClient {
  if (!adminClient) {
    if (!config.supabaseUrl || !config.supabaseServiceRoleKey) {
      throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set');
    }
    adminClient = createClient(config.supabaseUrl, config.supabaseServiceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return adminClient;
}

export function getAuthClient(): SupabaseClient {
  if (!authClient) {
    if (!config.supabaseUrl || !config.supabaseAnonKey) {
      throw new Error('SUPABASE_URL and SUPABASE_ANON_KEY must be set');
    }
    authClient = createClient(config.supabaseUrl, config.supabaseAnonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return authClient;
}
