-- ============================================================
-- Security hardening — addresses Supabase Advisor lints
-- See docs/08-安全设计补丁.md (kept short here; design rationale lives there).
--
-- 1. Pin search_path on handle_updated_at (function_search_path_mutable).
-- 2. Revoke public RPC execute on rls_auto_enable. The function stays
--    attached to the ensure_rls event trigger and still runs on DDL events;
--    we just remove the ability for anon/authenticated to call it via
--    PostgREST.
-- ============================================================

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public, pg_temp
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- rls_auto_enable() is not part of this project's source code — it was
-- installed by some external tooling on the production database. On a
-- fresh project the function may not exist, so guard the REVOKEs
-- behind an existence check to keep the migration idempotent.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_proc p
    JOIN pg_namespace n ON n.oid = p.pronamespace
    WHERE n.nspname = 'public' AND p.proname = 'rls_auto_enable'
  ) THEN
    EXECUTE 'REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM PUBLIC';
    EXECUTE 'REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM anon';
    EXECUTE 'REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM authenticated';
  END IF;
END $$;
