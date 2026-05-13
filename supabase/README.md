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

Apply order matches filename order, which also matches the ordering
returned by Supabase MCP `list_migrations` against the production project.

## Reproducing the schema on a fresh project

```bash
# Option A — Supabase CLI
supabase db push

# Option B — Supabase MCP (one apply_migration call per file, in order)
```

The 2026-03-23 trio establishes the tables and the trigger function. The
2026-05-13 pair hardens security and moves quota enforcement to the
backend. On a fresh project all five must be applied in order; the
security_hardening migration is idempotent (its rls_auto_enable REVOKEs
are guarded by IF EXISTS).
