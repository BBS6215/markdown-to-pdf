-- ============================================================
-- Re-broaden conversion_history INSERT policy back to all formats.
--
-- Context: 20260513122753_restrict_history_insert_to_html.sql tightened
-- this policy to format='html' on the assumption that PDF/Word were
-- written from the backend via service_role (which bypasses RLS).
--
-- The frontend has since moved every conversion path into the browser:
--   - HTML: unified + rehype-sanitize -> Blob
--   - Word: docx package -> Blob (no backend call)
--   - PDF : window.print() against a styled iframe (no backend call)
--
-- Under this model the original "data integrity" concern doesn't apply
-- — the browser IS the writer for all three formats, and the previous
-- check (auth.uid() = user_id) is the strongest constraint we can
-- enforce. "Forging" a row only pollutes one's own Dashboard, no quota
-- bypass is possible because there is no quota path.
--
-- If we later re-enable the server-side PDF/Word renderer (Fly.io), we
-- can re-tighten by introducing a server-only path again.
-- ============================================================

DROP POLICY IF EXISTS "Users can insert own html history" ON public.conversion_history;
DROP POLICY IF EXISTS "Users can insert own history"      ON public.conversion_history;

CREATE POLICY "Users can insert own history"
  ON public.conversion_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);
