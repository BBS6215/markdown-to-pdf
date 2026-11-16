# Hosted-service retirement / 线上服务退出

**Date / 日期:** 2026-11-16

The original hosted website at `markdown-to-pdf.app` has been retired. Source code, complete Git history, schema migrations, documentation, and pre-shutdown screenshots are preserved. This repository remains open to feedback and contributions; it is not archived.

原站已停止运营。保留源码、完整 Git 历史、数据库迁移、文档和停服前截图；仓库继续接收 Issues 和 PR，不设为归档。账号、转换历史和其他业务数据随云项目删除，不另作备份。源码中仍保留登录和历史功能，供自行部署者配置自己的资源。

## Publication before shutdown / 下线前发布

- Real English PDF and Chinese Word screenshots are stored in `docs/images/` and embedded in both READMEs.
- The original MIT license is retained; bundled font license texts are included.
- Original conversion code and SQL migrations remain available for self-hosting.
- The retired domain and original cloud/login credentials must not be reused in a fork.

## Operational status / 处置状态

Verified on November 16, 2026 / 2026-11-16 已核实：

- The repository is public, with English and Chinese READMEs and both original-site screenshots. Anonymous reads of all four files returned HTTP 200. / 仓库已公开，双语 README 和两张截图均可匿名访问。
- The original Vercel frontend project and its deployments have been removed. The original domain and default deployment no longer serve the app. / 原 Vercel 前端项目及部署已删除，原站停止提供服务。
- The original Supabase database and its Vercel Marketplace resource have been deleted. No account or conversion-history backup was created. SQL schema migrations are retained in source. / 原 Supabase 及其 Marketplace 资源已删除；未备份账号或转换历史，保留建表与迁移源码。
- The original Google OAuth client has been deleted. Its dedicated Google Cloud project has been shut down and is pending platform deletion after December 16, 2026. The project had no linked billing account. / 原 Google 登录客户端已删除；专属 Cloud 项目已关停，平台显示将在 2026-12-16 后删除，该项目没有关联结算账号。
- Other products' hosting, databases, Google login clients and shared subscription plans are retained. / 保留其他产品和共用套餐，不卸载共用集成。

Reproducibility checks passed on an isolated clone with Node.js 24.19.0 and pnpm 10.28.1: frozen-lockfile frontend install without hoisting, typecheck, lint, all 34 tests, and production build with explicit offline Supabase placeholders. These checks do not test a new deployment's real OAuth or RLS configuration. / 隔离副本通过锁定依赖安装、类型、lint、34 项测试及占位配置构建；不将其冒充新部署的真实登录或数据库权限验收。

## Alternative / 离线工具

[Lighter · MD to Word](https://github.com/BBS6215/lighter-md-to-word) provides offline Markdown-to-Word conversion. It does not replace PDF or HTML export. / Lighter 提供离线 Markdown 转 Word，不提供本项目的 PDF 或 HTML 导出功能。
