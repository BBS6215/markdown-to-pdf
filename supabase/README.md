# Supabase Schema

Source of truth for the project's PostgreSQL schema. Each `.sql` file in
`migrations/` has a `YYYYMMDDHHMMSS_<name>.sql` filename matching the
versioned entry recorded in `supabase_migrations.schema_migrations` on the
remote project.

## Layout

| File | Purpose |
|---|---|
| `migrations/20260323100338_create_conversion_history.sql` | Initial: `conversion_history` table + RLS + index. _(not yet captured locally — see TODO below)_ |
| `migrations/20260323100348_create_daily_usage.sql` | Initial: `daily_usage` table + RLS + UNIQUE constraint. _(not yet captured locally)_ |
| `migrations/20260323100356_create_updated_at_trigger.sql` | Initial: `handle_updated_at` function + `daily_usage` trigger. _(not yet captured locally)_ |
| `migrations/20260513002113_security_hardening.sql` | Pin `search_path` on `handle_updated_at`; revoke public EXECUTE on `rls_auto_enable`. See `docs/08-安全设计补丁.md`. |
| `migrations/20260513065047_server_authoritative_quota.sql` | Server-authoritative quota: drop `daily_usage` write RLS, add `consume_quota` / `refund_quota` / `record_conversion` RPCs. See `docs/09-服务端权威用量补丁.md`. |

## Apply order

These files match the ordering returned by Supabase MCP `list_migrations`.
Apply them in filename order on a fresh project to reproduce the schema.

```bash
# Option A — Supabase CLI
supabase db push

# Option B — Supabase MCP from this repo (per file)
# Use the mcp__supabase__apply_migration tool with name = filename stem.
```

## TODO

The three original-bootstrap migrations (`create_conversion_history`,
`create_daily_usage`, `create_updated_at_trigger`) were applied via the
Supabase Studio UI before this repo started tracking SQL. The SQL bodies
live in `docs/06-数据库设计说明.md` §2 — they should be transcribed into
the corresponding `.sql` files here so the schema is fully reproducible
from this repo alone.
