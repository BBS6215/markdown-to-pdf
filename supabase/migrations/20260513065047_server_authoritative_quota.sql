-- ============================================================
-- Server-Authoritative Quota Enforcement
-- See docs/09-服务端权威用量补丁.md
--
-- Background: docs/06 originally let the browser UPSERT daily_usage
-- and INSERT conversion_history directly. This can be bypassed
-- (browser refuses the write) and is racy under concurrency.
--
-- This migration:
--   1. Revokes daily_usage write policies from clients.
--   2. Adds 3 SECURITY DEFINER RPCs callable only by service_role:
--        consume_quota / refund_quota / record_conversion
--   3. Keeps SELECT policies and the HTML history INSERT policy
--      intact (HTML is still written from the browser per docs/06 §5.2).
-- ============================================================

-- 1. Remove daily_usage write policies (browser can no longer write)
DROP POLICY IF EXISTS "Users can insert own usage" ON public.daily_usage;
DROP POLICY IF EXISTS "Users can update own usage" ON public.daily_usage;
-- SELECT policy stays so the dashboard can read its own row.

-- 2. consume_quota: atomic increment guarded by daily limit.
--    Returns jsonb { allowed: bool, count: int, limit: int }.
CREATE OR REPLACE FUNCTION public.consume_quota(
  p_user_id uuid,
  p_format text,
  p_limit integer DEFAULT 5
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_count integer;
BEGIN
  -- HTML never consumes quota.
  IF p_format = 'html' THEN
    RETURN jsonb_build_object('allowed', true, 'count', 0, 'limit', null);
  END IF;
  IF p_format NOT IN ('pdf', 'word') THEN
    RAISE EXCEPTION 'invalid format: %', p_format;
  END IF;

  INSERT INTO public.daily_usage (user_id, usage_date, pdf_word_count)
  VALUES (p_user_id, CURRENT_DATE, 1)
  ON CONFLICT (user_id, usage_date) DO UPDATE
    SET pdf_word_count = daily_usage.pdf_word_count + 1
    WHERE daily_usage.pdf_word_count < p_limit
  RETURNING pdf_word_count INTO v_count;

  IF v_count IS NULL THEN
    -- ON CONFLICT WHERE filtered out → quota exhausted.
    SELECT pdf_word_count INTO v_count
    FROM public.daily_usage
    WHERE user_id = p_user_id AND usage_date = CURRENT_DATE;
    RETURN jsonb_build_object('allowed', false, 'count', v_count, 'limit', p_limit);
  END IF;

  RETURN jsonb_build_object('allowed', true, 'count', v_count, 'limit', p_limit);
END;
$$;

REVOKE EXECUTE ON FUNCTION public.consume_quota(uuid, text, integer) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.consume_quota(uuid, text, integer) FROM anon;
REVOKE EXECUTE ON FUNCTION public.consume_quota(uuid, text, integer) FROM authenticated;
GRANT  EXECUTE ON FUNCTION public.consume_quota(uuid, text, integer) TO service_role;

-- 3. refund_quota: rollback when conversion fails AFTER consume.
CREATE OR REPLACE FUNCTION public.refund_quota(
  p_user_id uuid,
  p_format text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  IF p_format NOT IN ('pdf', 'word') THEN
    RETURN;
  END IF;

  UPDATE public.daily_usage
  SET pdf_word_count = GREATEST(pdf_word_count - 1, 0)
  WHERE user_id = p_user_id AND usage_date = CURRENT_DATE;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.refund_quota(uuid, text) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.refund_quota(uuid, text) FROM anon;
REVOKE EXECUTE ON FUNCTION public.refund_quota(uuid, text) FROM authenticated;
GRANT  EXECUTE ON FUNCTION public.refund_quota(uuid, text) TO service_role;

-- 4. record_conversion: history insert from server side.
--    NOTE: conversion_history INSERT policy for end-users stays in place
--    so HTML conversions (pure-frontend) can still log themselves.
CREATE OR REPLACE FUNCTION public.record_conversion(
  p_user_id uuid,
  p_format text,
  p_filename text,
  p_file_size_bytes integer,
  p_source_size_bytes integer,
  p_status text DEFAULT 'success'
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_id uuid;
BEGIN
  IF p_status NOT IN ('success', 'failed') THEN
    RAISE EXCEPTION 'invalid status: %', p_status;
  END IF;

  INSERT INTO public.conversion_history
    (user_id, format, filename, file_size_bytes, source_size_bytes, status)
  VALUES
    (p_user_id, p_format, p_filename, p_file_size_bytes, p_source_size_bytes, p_status)
  RETURNING id INTO v_id;
  RETURN v_id;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.record_conversion(uuid, text, text, integer, integer, text) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.record_conversion(uuid, text, text, integer, integer, text) FROM anon;
REVOKE EXECUTE ON FUNCTION public.record_conversion(uuid, text, text, integer, integer, text) FROM authenticated;
GRANT  EXECUTE ON FUNCTION public.record_conversion(uuid, text, text, integer, integer, text) TO service_role;
