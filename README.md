# Markdown to PDF

> Online tool that converts Markdown to PDF / Word / HTML — entirely in the browser.
> Production: [markdown-to-pdf.app](https://markdown-to-pdf.app)
>
> [简体中文 README](./README.zh.md)

## What it does

Paste Markdown (or upload a `.md` file) → preview live → export as:

- **PDF** — via the browser's native print engine (`window.print()` against a hidden iframe)
- **Word** — via [`docx`](https://www.npmjs.com/package/docx) `Packer.toBlob()` with a Microsoft YaHei base font, tuned for both CJK and Latin content
- **HTML** — sanitized, copy-to-clipboard for pasting into Notion / Google Docs / email

Built for English-speaking AI tool users who get Markdown from ChatGPT / Claude / Gemini and need a clean, distributable document.

## Architecture (TL;DR)

**Pure-frontend pipeline.** No backend. Conversions run entirely in the user's browser.

```
Next.js (Vercel)  ──►  unified (remark + rehype-sanitize)  ──►  PDF / Word / HTML
                                       │
                                       └──►  Supabase  (Auth + conversion_history log)
```

- **$0/month** running cost (apart from the domain)
- No quota, no rate limit
- See [`docs/10-前端化架构补丁.md`](./docs/10-前端化架构补丁.md) for the architecture pivot rationale (this project initially designed a Render-backed Puppeteer service; that path is preserved in `backend/` but not deployed)

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router, React 19) |
| Language | TypeScript 5.7+ |
| Styling | Tailwind CSS 4 |
| Editor | CodeMirror 6 |
| Markdown | `unified` + `remark-gfm` + `rehype-sanitize` |
| Word | `docx` 9.x |
| Auth + DB | Supabase |
| Hosting | Vercel |
| Package manager | pnpm 10 (workspaces) |
| Node | 22.x |

## Quick start

```bash
# 1. Install
pnpm install

# 2. Copy env template
cp frontend/.env.example frontend/.env.local
#    Fill in NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
#    (see frontend/.env.example for where to find them)

# 3. Dev (frontend only)
pnpm dev
# → http://localhost:3000

# 4. Typecheck + lint
pnpm typecheck
pnpm lint

# 5. Production build
pnpm build
```

## Repository layout

```
markdown-to-pdf-app/
├── frontend/            # Next.js app (deployed to Vercel)
│   ├── app/             # App Router pages (i18n: /en, /zh)
│   ├── components/      # UI components
│   ├── lib/
│   │   ├── converter/   # PDF / Word / HTML browser-side exporters
│   │   ├── markdown/    # unified render pipeline
│   │   └── seo/         # metadata, sitemap helpers
│   └── ...
├── backend/             # Express + Puppeteer — NOT DEPLOYED (cold storage)
├── shared/              # Cross-package types
├── supabase/            # SQL migrations
└── docs/                # Design + architecture docs (Chinese, see index below)
```

## Documentation index (Chinese)

The original design docs are in Chinese. Architecture summary in English is above.

| # | Doc | Status |
|---|---|---|
| **00** | **[Document index & Definition of Done](./docs/00-文档索引与完成定义.md)** | ✅ **Governance and delivery gates** |
| 01 | [项目主线文档](./docs/01-项目主线文档.md) | ✅ Active |
| 02 | [SEO 策略与搜索需求](./docs/02-SEO策略与搜索需求设计说明.md) | ✅ Active |
| 03 | [产品结构文档](./docs/03-产品结构文档.md) | ✅ Active |
| 03-1 | [交互与体验补充](./docs/03-1-交互与体验补充说明.md) | ✅ Active |
| 04 | [UI 设计与视觉规范](./docs/04-UI设计与视觉规范建议.md) | ✅ Active |
| 05 | [技术方案文档](./docs/05-技术方案文档.md) | 🗄 Historical baseline; architecture superseded by 10 |
| 06 | [数据库设计说明](./docs/06-数据库设计说明.md) | ⚠️ Quota flow superseded by 10 |
| 07 | [开发方案与实施步骤](./docs/07-开发方案与实施步骤说明.md) | 🗄 Historical implementation baseline |
| 08 | [安全设计补丁](./docs/08-安全设计补丁.md) | ⚠️ §3 active, §4-5 obsolete |
| 09 | [服务端权威用量补丁](./docs/09-服务端权威用量补丁.md) | ❌ Entirely obsolete |
| **10** | **[前端化架构补丁](./docs/10-前端化架构补丁.md)** | ✅ **Current architecture** |
| ★ | **[DEPLOY.md](./docs/DEPLOY.md)** | ✅ **Production deployment runbook** |

## Deployment

See [`docs/DEPLOY.md`](./docs/DEPLOY.md) — covers Vercel project setup, Supabase Auth URL configuration, DNS records, and a 9-item smoke test.

## License

MIT — see [LICENSE](./LICENSE).
