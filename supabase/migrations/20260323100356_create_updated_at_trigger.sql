-- ============================================================
-- handle_updated_at function + daily_usage BEFORE UPDATE trigger.
-- Source: docs/06-数据库设计说明.md §2.3
--
-- Without this trigger the updated_at column would stay frozen at the
-- INSERT time across UPSERT increments. The search_path is pinned in
-- 20260513002113_security_hardening.sql to address a Supabase Advisor lint.
-- ============================================================

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_daily_usage_updated
  BEFORE UPDATE ON public.daily_usage
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
