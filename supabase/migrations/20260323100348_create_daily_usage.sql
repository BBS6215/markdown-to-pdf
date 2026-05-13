-- ============================================================
-- daily_usage: per-user daily PDF+Word counter.
-- Source: docs/06-数据库设计说明.md §2.2
--
-- HTML is unlimited and not tracked here. The UNIQUE(user_id, usage_date)
-- constraint backs the atomic UPSERT used by the consume_quota RPC added
-- in 20260513065047_server_authoritative_quota.sql.
--
-- NOTE: the original docs/06 design granted INSERT and UPDATE to end users.
-- That was tightened in 20260513065047 to server-side only — the browser
-- cannot write this table anymore. SELECT remains so the Dashboard can
-- display today's count.
-- ============================================================

CREATE TABLE public.daily_usage (
  id              UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID          NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  usage_date      DATE          NOT NULL DEFAULT CURRENT_DATE,
  pdf_word_count  INTEGER       NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ   NOT NULL DEFAULT now(),

  UNIQUE(user_id, usage_date)
);

ALTER TABLE public.daily_usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own usage"
  ON public.daily_usage FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own usage"
  ON public.daily_usage FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own usage"
  ON public.daily_usage FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
-- No DELETE policy: prevents users from resetting their own quota.
