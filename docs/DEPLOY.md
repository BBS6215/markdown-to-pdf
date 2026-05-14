# 部署 Runbook

> **目标读者**: 项目维护者
> **目标环境**: Vercel + Supabase + 自有域名 `markdown-to-pdf.app`
> **架构依据**: [10-前端化架构补丁.md](./10-前端化架构补丁.md)（前端化方案，无 backend 部署）
> **首次部署日期**: 2026-05-14
> **预估耗时**: 全程 30-60 分钟，DNS 生效另算 10 分钟到 24 小时

---

## A. 前置准备 Checklist

部署前确认全部完成：

- [ ] **Vercel 账号** 已用 GitHub OAuth 登录
- [ ] GitHub 仓库 `markdown-to-pdf-app` 已推送至 `origin/main`（commit `2dba4d7` 或更新）
- [ ] **Supabase 项目** 已创建，记录下：
  - `Project URL`（形如 `https://xxxx.supabase.co`）
  - `anon public key`（Settings → API → Project API keys → `anon` `public`）
- [ ] **Supabase 迁移** 已全部应用（7 个 migration 文件，最新为 `20260513150315`）
- [ ] **域名 `markdown-to-pdf.app`** 注册商控制台可访问，能编辑 DNS 记录
- [ ] 本地 `pnpm run build` 通过（Vercel build 大概率也会通过）
- [ ] 本地 `pnpm run typecheck` 和 `pnpm run lint` 无 error

---

## B. Vercel 项目创建

1. Vercel Dashboard → **Add New** → **Project**
2. **Import Git Repository** → 选择 `markdown-to-pdf-app`
3. 项目配置：

   | 字段 | 值 |
   |---|---|
   | Project Name | `markdown-to-pdf` |
   | Framework Preset | **Next.js** |
   | **Root Directory** | **`frontend`** ⚠️ 必须改，默认是仓库根 |
   | Build Command | `next build`（默认，不改） |
   | Output Directory | `.next`（默认，不改） |
   | Install Command | `pnpm install`（Vercel 自动检测 pnpm-lock.yaml） |
   | Node.js Version | **22.x**（根 `package.json` 的 `engines.node` 要求） |

4. **暂不点 Deploy**——先配 C 节环境变量。

---

## C. 环境变量

在 Vercel 项目 → Settings → Environment Variables 添加：

| 变量名 | 值来源 | Environments |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Dashboard → Settings → API → Project URL | Production + Preview + Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Dashboard → Settings → API → `anon` `public` key | Production + Preview + Development |

⚠️ 两个变量都是 `NEXT_PUBLIC_` 前缀，**会暴露到浏览器**。这是 Supabase 的正确用法——`anon` key 配合 RLS 才能保证安全，不是密钥。

不需要 `SUPABASE_SERVICE_ROLE_KEY`：前端化方案没有 backend 路径会用到。

设置完成后回 Deployments 页 → **Redeploy**。

---

## D. Supabase Auth URL Configuration

⚠️ **不配这一步，OAuth 登录会失败**（Google 回调到错误的 URL）。

Supabase Dashboard → Authentication → URL Configuration：

| 字段 | 值 |
|---|---|
| **Site URL** | `https://markdown-to-pdf.app` |
| **Additional Redirect URLs** | （逐行添加） |
| | `https://markdown-to-pdf.app/**` |
| | `https://www.markdown-to-pdf.app/**` |
| | `https://markdown-to-pdf-*.vercel.app/**`（Vercel 预览域名通配） |
| | `http://localhost:3000/**`（本地开发） |

Site URL 是 Supabase 在 magic link / OAuth flow 里默认重定向的位置；Additional Redirect URLs 是允许的回调白名单。两者都必须配。

---

## E. 域名绑定 + DNS

### E.1 在 Vercel 添加域名

Vercel 项目 → Settings → Domains → Add Domain：
1. 输入 `markdown-to-pdf.app`（apex 主域名）→ Add
2. 输入 `www.markdown-to-pdf.app`（强制 301 跳转到 apex，Vercel 自动配）→ Add

### E.2 在域名注册商配置 DNS

apex 域名（无子域）：

| 类型 | 名称 | 值 | TTL |
|---|---|---|---|
| **A** | `@`（或留空） | `76.76.21.21` | 3600 |

子域名 `www`：

| 类型 | 名称 | 值 | TTL |
|---|---|---|---|
| **CNAME** | `www` | `cname.vercel-dns.com` | 3600 |

⚠️ 如果注册商支持 ALIAS / ANAME（如 Cloudflare、DNSimple），apex 也可改用 `ALIAS @ → cname.vercel-dns.com`，比 A 记录更稳。

### E.3 等待 DNS 生效

- 验证：`nslookup markdown-to-pdf.app 8.8.8.8` 返回 `76.76.21.21`
- 一般 10-30 分钟，少数情况 24 小时
- Vercel 域名状态变绿后才算完成

### E.4 SSL 证书

Vercel 自动通过 Let's Encrypt 签发，无需操作。域名 DNS 验证通过后 1-2 分钟内 HTTPS 可用。

---

## F. 上线烟雾测试 Checklist

9 项必过（任一不过都属于阻塞问题）：

- [ ] **F1** `https://markdown-to-pdf.app` 首屏 200 OK，H1 文案正确
- [ ] **F2** `https://www.markdown-to-pdf.app` 301 → apex
- [ ] **F3** `/zh` 路径切换中文，`/en` 切换英文，header LanguageSwitcher 工作
- [ ] **F4** 工具页 `/pdf` 输入简单 Markdown → 点击 "Convert to PDF" → 浏览器打印对话框弹出 → 选 "Save as PDF" → 文件名形如 `[首行标题].pdf`
- [ ] **F5** 工具页 `/word` 输入含中文 + 加粗 + 有序列表的 Markdown → 下载 `.docx` → 用 Word / WPS 打开，确认中文不是 Calibri 字体、有序列表 `1. 2. 3.` 正确（不是 bullet）、加粗保留
- [ ] **F6** 工具页 `/html` 输入 Markdown → 点击 "Copy HTML" → 粘贴到 Notion / 飞书文档，HTML 渲染正确
- [ ] **F7** Supabase Auth：用 Google OAuth 登录 → 跳转回首页，cookie 写入正确
- [ ] **F8** 登录后 Dashboard `/dashboard` 看到刚才的转换记录（HTML / Word，PDF 不写历史是正常）
- [ ] **F9** F12 → Network 面板没有 4xx/5xx 异常请求；Console 没有红色 error

---

## G. 常见问题排查

### G.1 Vercel build 失败：`Module not found: Can't resolve '@mdpdf/shared'`

原因：Root Directory 设错了。检查 B 节是否设为 `frontend`。

### G.2 Vercel build 失败：pnpm workspace 解析问题

原因：pnpm 找不到 workspace 根。在 Vercel 项目 Settings → General → Build & Development Settings → Install Command 改为 `cd .. && pnpm install --frozen-lockfile`。

### G.3 部署成功但访问 404

原因：Next.js i18n 路由问题。确认 `frontend/middleware.ts` 在仓库里，确认 `/` 会重定向到 `/en` 或 `/zh`。

### G.4 Google OAuth 登录后跳到 `localhost:3000`

原因：D 节 Supabase Auth Site URL 没改。回 D 节重配。

### G.5 DNS 长时间不生效

- 用 `dig markdown-to-pdf.app @1.1.1.1` 看是否真的解析失败
- 检查注册商的 nameservers 是否被改过
- 某些注册商（Namecheap）需要 2-4 小时
- Cloudflare 在前面做代理时：必须**关闭橙色云**（DNS only 灰云），否则 Vercel 拒绝 SSL 签发

### G.6 PDF 打印对话框样式不对（缺字体）

原因：`PRINT_STYLES` 引用了 web font 但隐藏 iframe 没加载。当前实现已经全部内联，应该不会出现。如出现，检查 `pdf-print.ts` 中 `PRINT_STYLES` 字符串。

---

## H. Rollback 流程

如发现严重问题需立即回退：

### H.1 Vercel Rollback（5 秒生效）

Vercel Dashboard → Deployments → 找到上一个绿色 Production deployment → 右上角 ⋯ → **Promote to Production**。

### H.2 代码层 Rollback

```bash
git revert <bad-commit-sha>
git push origin main
```

Vercel 自动重新 build。

### H.3 Supabase migration 回滚

migration 已应用的话不能简单回滚，必须写补偿 migration。但前端化方案下 migration 都是冷备性质，几乎不会需要回滚。

---

## I. 部署后续维护

- **监控**：Vercel Analytics 已默认开启，Dashboard 看流量曲线
- **错误监控**：暂无 Sentry。如流量上来后开始有用户反馈 bug，再接入
- **每日检查**：上线第一周每天看一次 Vercel Deployments 和 Supabase Logs
- **下一阶段决策依据**：见 10 号补丁 §5.2 "重启 backend 触发条件"

---

## J. 引用

- 架构总览：[10-前端化架构补丁.md](./10-前端化架构补丁.md)
- 原始技术方案：[05-技术方案文档.md](./05-技术方案文档.md)
- 环境变量模板：`frontend/.env.example`
