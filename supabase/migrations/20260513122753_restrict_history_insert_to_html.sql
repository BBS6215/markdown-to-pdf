-- ============================================================
-- Restrict conversion_history client INSERTs to format='html' only.
--
-- Background: the original "Users can insert own history" policy only
-- checked auth.uid() = user_id, so a logged-in user could insert
-- arbitrary PDF/Word history rows from the browser, polluting their
-- own Dashboard timeline (no quota impact, but a data integrity hole).
-- PDF/Word history is written by the backend via record_conversion(),
-- which uses service_role and bypasses RLS, so the client INSERT path
-- only needs to cover the pure-frontend HTML flow.
-- ============================================================

DROP POLICY IF EXISTS "Users can insert own history" ON public.conversion_history;

CREATE POLICY "Users can insert own html history"
  ON public.conversion_history FOR INSERT
  WITH CHECK (auth.uid() = user_id AND format = 'html');
