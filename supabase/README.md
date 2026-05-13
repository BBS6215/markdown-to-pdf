# Supabase Schema

Source of truth for the project's PostgreSQL schema. Each `.sql` file in
`migrations/` has a `YYYYMMDDHHMMSS_<name>.sql` filename matching the
versioned entry recorded in `supabase_migrations.schema_migrations` on the
remote project.

## Layout

| File | Purpose |
|---|---|
| `migrations/20260323100338_create_conversion_history.sql` | Initial: `conversion_history` table + RLS + index. Transcribed from `docs/06-数据库设计说明.md` §2.1. |
| `migrations/20260323100348_create_daily_usage.sql` | Initial: `daily_usage` table + RLS + UNIQUE constraint. Transcribed from `docs/06` §2.2. |
| `migrations/20260323100356_create_updated_at_trigger.sql` | Initial: `handle_updated_at` function + `daily_usage` trigger. Transcribed from `docs/06` §2.3. |
| `migrations/20260513002113_security_hardening.sql` | Pin `search_path` on `handle_updated_at`; revoke public EXECUTE on `rls_auto_enable` (guarded by IF EXISTS). See `docs/08`. |
| `migrations/20260513065047_server_authoritative_quota.sql` | Server-authoritative quota: drop `daily_usage` write RLS, add `consume_quota` / `refund_quota` / `record_conversion` RPCs. See `docs/09`. |
| `migrations/20260513122753_restrict_history_insert_to_html.sql` | _Superseded by 20260513150315._ Tightened `conversion_history` INSERT policy to `format = 'html'` only, on the assumption that PDF/Word were written from the backend via `record_conversion()`. |
| `migrations/20260513150315_allow_all_format_history_insert_for_frontend_pipeline.sql` | Re-broaden the INSERT policy back to `auth.uid() = user_id` for all formats. The PDF and Word renderers are now pure-frontend (window.print() / docx package) so the browser legitimately writes all three formats; the previous tightening would silently drop PDF/Word history rows. |

Apply order matches filename order, which also matches the ordering
returned by Supabase MCP `list_migrations` against the production project.

## Reproducing the schema on a fresh project

```bash
# Option A — Supabase CLI
supabase db push

# Option B — Supabase MCP (one apply_migration call per file, in order)
```

The 2026-03-23 trio establishes the tables and the trigger function. The
four 2026-05-13 migrations harden security, set up server-authoritative
quota infrastructure (currently unused — see note below), and then walk
the conversion_history INSERT policy out and back as the frontend took
over PDF/Word rendering. On a fresh project apply all seven in order;
security_hardening is idempotent (its rls_auto_enable REVOKEs are guarded
by IF EXISTS).

**Note on quota infrastructure**: the `consume_quota`/`refund_quota`/
`record_conversion` RPCs created by `20260513065047` are intentionally
preserved on the database even though the current frontend-only pipeline
does not call them. They become live again when a backend renderer is
re-enabled (e.g. Fly.io). The functions are restricted to `service_role`
and harmless when unused.
