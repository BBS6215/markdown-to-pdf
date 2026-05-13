-- ============================================================
-- conversion_history: per-user conversion log (PDF/Word/HTML).
-- Source: docs/06-数据库设计说明.md §2.1
--
-- File contents are NEVER stored — only metadata. The Dashboard reads the
-- 50 most recent rows per user. Records are append-only by design: no
-- UPDATE / DELETE policies, history is immutable.
-- ============================================================

CREATE TABLE public.conversion_history (
  id                UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           UUID          NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  format            TEXT          NOT NULL CHECK (format IN ('pdf', 'word', 'html')),
  filename          TEXT          NOT NULL,
  file_size_bytes   INTEGER,
  source_size_bytes INTEGER,
  status            TEXT          NOT NULL DEFAULT 'success' CHECK (status IN ('success', 'failed')),
  created_at        TIMESTAMPTZ   NOT NULL DEFAULT now()
);

-- Dashboard query path: ORDER BY created_at DESC scoped to the user.
CREATE INDEX idx_history_user_created
  ON public.conversion_history(user_id, created_at DESC);

ALTER TABLE public.conversion_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own history"
  ON public.conversion_history FOR SELECT
  USING (auth.uid() = user_id);

-- HTML conversions are pure-frontend and the browser writes the row.
-- PDF/Word are written from the backend via the record_conversion RPC
-- (added in 20260513065047_server_authoritative_quota.sql) using
-- service_role, which bypasses RLS — so this INSERT policy only covers
-- the HTML case.
CREATE POLICY "Users can insert own history"
  ON public.conversion_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);
