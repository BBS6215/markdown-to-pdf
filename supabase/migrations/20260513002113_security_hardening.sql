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

REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM anon;
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM authenticated;
