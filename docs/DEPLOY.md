# 部署 Runbook

> **2026-11-16 线上服务退出：** 原托管服务正在停止运营；源码、迁移和文档继续公开保留。本文件的历史运营目标、资源及上线记录供参考，实际处置状态以 [RETIREMENT.md](./RETIREMENT.md) 为准。自行部署需使用自己的资源和凭据。

> **目标读者**: 项目维护者
> **目标环境**: Vercel + Supabase + 自有域名 `markdown-to-pdf.app`
> **架构依据**: [10-前端化架构补丁.md](./10-前端化架构补丁.md)（前端化方案，无 backend 部署）
> **首次部署日期**: 2026-05-14
> **预估耗时**: 全程 30-60 分钟，DNS 生效另算 10 分钟到 24 小时

---

## A. 前置准备 Checklist

部署前确认全部完成：

- [ ] **Vercel 账号** 已用 GitHub OAuth 登录
- [ ] GitHub 仓库 `markdown-to-pdf-app` 已推送至 `origin/main`（以最新 `main` 为准）
- [ ] **Supabase 项目** 已创建，记录下：
  - `Project URL`（形如 `https://xxxx.supabase.co`）
  - `anon public key`（Settings → API → Project API keys → `anon` `public`）
- [ ] **Supabase 迁移** 已全部应用（7 个 migration 文件，最新为 `20260513150315`）
- [ ] **域名 `markdown-to-pdf.app`** 注册商控制台可访问，能编辑 DNS 记录
- [ ] 在构建开始前为本地/CI配置两个Supabase公开变量，参见C节；不能只在服务器启动时设置
- [ ] 本地 `pnpm run build` 在明确记录的环境变量配置下通过
- [ ] 本地 `pnpm run typecheck`、`pnpm run lint` 和 `pnpm test` 全部通过

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
   | Build Command | `pnpm build`（在 `frontend` 目录执行；也可直接使用 `frontend/vercel.json`） |
   | Output Directory | `.next`（默认，不改） |
   | Install Command | `cd .. && pnpm install --frozen-lockfile --filter @mdpdf/frontend...`（只安装前端及其依赖，避免下载 backend Puppeteer） |
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

### C.1 本地与 CI 的构建期要求

公共页静态预渲染期间Header会创建Supabase客户端，因此两个公开变量是**构建期必需输入**，不是仅供运行时登录使用。Next会将NEXT_PUBLIC值写入客户端产物；构建完后再注入不能替代构建时的配置。

本地从仓库根目录执行：

```powershell
if (-not (Test-Path -LiteralPath 'frontend/.env.local')) {
  Copy-Item -LiteralPath 'frontend/.env.example' -Destination 'frontend/.env.local'
}
# 填写本项目真实的URL及anon key，保留已有本地配置文件。
pnpm lint
pnpm test
pnpm typecheck
pnpm build
```

CI在命令执行前注入本项目公开配置。仅在**不发布的离线编译验证**中可使用以下显式占位值：

```powershell
$env:NEXT_PUBLIC_SUPABASE_URL='https://example.supabase.co'
$env:NEXT_PUBLIC_SUPABASE_ANON_KEY='offline-build-test-key'
pnpm build
```

这只验证编译/预渲染，不验证OAuth、历史写入和RLS；生产/Preview构建必须使用真实项目配置。不要使用service_role。占位值不写入仓库或持久化到生产设置。

build入口按Next的生产dotenv优先级读取文件，缺值时立即列出缺失变量名并退出，不打印key值。使用Node22.x和pnpm10.28.1，安装采用frozen-lockfile及前端filter。

### C.2 lint 可复现入口

统一运行 `pnpm lint`。入口仅为ESLint子进程设置项目依赖目录及eslint-config-next声明依赖的目录；Next构建的内嵌ESLint使用相同解析边界。不依赖pnpm的隐式提升目录，也不继承外部NODE_PATH；ESLint配置、插件/规则版本及Next构建内lint均未降级或关闭。

干净副本使用 `pnpm install --frozen-lockfile --filter @mdpdf/frontend... --config.hoist=false` 后同样必须通过lint。已有模块目录切换布局时，只在隔离验证副本中重新安装，不改全局pnpm设置。

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
- [ ] **F4** 工具页 `/en` 输入简单 Markdown → 点击 "Convert to PDF" → 浏览器打印对话框弹出 → 选 "Save as PDF"
- [ ] **F5** 工具页 `/en/to-word` 输入含中文 + 加粗 + 有序列表的 Markdown → 下载 `.docx` → 用 Word / WPS 打开，确认中文不是 Calibri 字体、有序列表 `1. 2. 3.` 正确（不是 bullet）、加粗保留
- [ ] **F6** 工具页 `/en/to-html` 输入Markdown → 点击“Copy HTML source” → 粘贴到纯文本编辑器，确认得到sanitize后的HTML源码；此功能不是富文本复制。
- [ ] **F7** Supabase Auth：用 Google OAuth 登录 → 跳转回首页，cookie 写入正确
- [ ] **F8** 登录后 Dashboard `/dashboard` 看到刚才的转换记录（HTML / Word，PDF 不写历史是正常）
- [ ] **F9** F12 → Network 面板没有 4xx/5xx 异常请求；Console 没有红色 error

---

## G. 常见问题排查

### G.1 Vercel build 失败：`Module not found: Can't resolve '@mdpdf/shared'`

原因：Root Directory 设错了。检查 B 节是否设为 `frontend`。

### G.1.1 Vercel build 跑到了 `@mdpdf/backend`

现象：日志里出现 `> @mdpdf/backend@... build /vercel/path0/backend` 或 Puppeteer/Express build 错误。

原因：Vercel Project 的 **Root Directory 被设成了 `backend`**，这与当前前端化架构不符。

修复：Vercel Dashboard → Project Settings → General → Root Directory 改为 **`frontend`**，然后 Redeploy。当前仓库的 `frontend/vercel.json` 已锁定前端安装和构建命令。

### G.2 Vercel build 失败：pnpm workspace 解析问题

原因：pnpm 找不到 workspace 根。确认 B 节的 Install Command 是 `cd .. && pnpm install --frozen-lockfile --filter @mdpdf/frontend...`，不要改回单纯的 `pnpm install`。

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


## K. 2026-10-04 增强版本发布检查

- 历史交付时此版本经用户授权作本地Git提交，尚未push或部署；用户于2026-10-05确认已push且Vercel绿灯，Git已核验两个提交在origin/main。以下发布检查保留，不能据Vercel绿灯推定OAuth、真机和系统保存测试已完成。
- 保持Root Directory=frontend、Node22、pnpm10以及原Supabase环境变量。不得把本地占位配置带入生产。
- 对/en、/zh及三种工具格式检查正确html lang、canonical/hreflang，公共响应可缓存且没有刷新会话Set-Cookie；Dashboard仍为私有/no-store，未登录跳转正确，登录后按当前用户读取历史。
- 根/保持308到/en；/fr、未知页面、未知指南返回404和noindex；robots/sitemap URL不变。Next15 globalNotFound为实验功能，升级框架时必须重新核对多根布局404行为。
- 验证手机320/390px英文HTML双按钮、复制失败/重试长提示、编辑/预览切换、软键盘和安全区；iOS Safari及Android Chrome真机粘贴/打印/下载仍为上线前必要验证。
- 验证上传.MD、GBK、UTF-16；存储不可用/满时不得静默丢稿。跨格式/语言和指南入口保持草稿。
- Word样例包含混合嵌套列表、多段列表项、☐/☑任务、引用内代码/表格；表格不得越页边，字体和换行正确。HTML复制是源码，PDF仅能确认打开打印对话框，仍不写PDF历史。
- 实际Google OAuth及登录后Word/HTML历史写入尚未用生产配置联调；发布时执行原F7/F8。没有新增schema或DB migration。
- 回退保留H节现有流程；Word修复与布局静态化应分别审查。回退root布局时同时回退middleware范围/globalNotFound配置，不能留下半套布局。

## L. 2026-10-05 SEO增强的发布与收录交接

### L.1 当前交付状态

- 本节初次交付时为本地未提交版本；用户随后明确授权由Agent commit、push，等2分钟后提交GSC/Bing。按该顺序执行，实际部署和收录状态必须经线上回读确认，不能从授权或等待时间推定成功。
- Node24.19.0/pnpm10.28.1下34项测试、lint、typecheck和带显式离线Supabase占位配置的build通过。生产继续使用Node22和真实公开配置；本地占位产物不能直接作为生产部署。
- 30篇指南生产HTML含完整正文，48个公共页面的OG/Twitter元数据正确；Dashboard无静态HTML。分享PNG1200×630、66,200字节已查看。
- UI浏览器验收尚未完成：启动本地Next服务被自动审批拒绝（仅返回blocked by policy），file协议被Browser明确拒绝。没有通过其他浏览器、直接CDP或替代命令绕过限制。

### L.2 发布后的验收（先验证，再提交）

1. 用户批准Git提交/推送后沿用现有Vercel发布流程，不修改域名、Supabase或环境变量设置。
2. 查看EN/ZH换行、表格、简历模板指南：禁用JavaScript或直接读取初始HTML，确认`data-guide-body`内含正文标题、段落、代码/表格，正文无需等待Worker。
3. 浏览器验证320/390/1280px：正文按页面自然滚动、无页面横向溢出，长代码/表格局部滚动；迷你编辑器输入与预览仍工作。Tab/Enter验证FAQ、CTA、相关指南。iOS/Safari仍需真机补验。
4. `/og-image.png`返回200和image/png，页面OG图片绝对URL、1200×630、Twitter summary_large_image正确；分享平台缓存可能延迟更新。
5. sitemap含48个200/canonical公共网址；指南lastmod为2026-10-05，目录为2026-07-05。再次核验登录noindex、未知路径404、Dashboard私有/no-store。

### L.3 已授权的搜索引擎提交对象

唯一产品为`markdown-to-pdf.app`，GSC property为`sc-domain:markdown-to-pdf.app`，Bing选择已有的`https://markdown-to-pdf.app/`站点；不要重新导入或创建站点。registry原bing_site为TODO，本轮已用当前Bing界面核实并回填为该URL，没有新建或导入站点。

地图：[https://markdown-to-pdf.app/sitemap.xml](https://markdown-to-pdf.app/sitemap.xml)。GSC和Bing各重提一次原地图，不删除重建、不拆分地图、不追加其他域名。

重点网址白名单（不是把全部sitemap加入提交批次）：

| 顺序 | 网址 | 选择依据 |
|---|---|---|
| 1 | `https://markdown-to-pdf.app/en/to-word` | GSC已抓取但未收录记录，核心工具入口 |
| 2 | `https://markdown-to-pdf.app/en/guides/markdown-table` | 近3个月GSC页面报告26次曝光，正文渲染已修复 |
| 3 | `https://markdown-to-pdf.app/en/guides/markdown-resume-template` | 近3个月GSC页面报告11次曝光，正文渲染已修复 |

每条先检查当前收录和抓取版本；已收录且已抓到新版本则跳过，否则请求一次。请求成功不保证收录或排名；遇配额、登录墙、验证码或未知状态停止，不能换property继续。

### L.4 当前执行入口限制与人工步骤

现有[search-console-ops技能](C:/Users/ADMIN/.agents/skills/search-console-ops/SKILL.md)要求GSC URL请求通过Codex私有包装器，并从真实ledger/summary汇报。本机`C:/Users/ADMIN/.codex/private/search-console-ops/Invoke-SearchConsoleOps.ps1`缺失，技能根目录`config.json`存在且本轮未修改；业务执行不自动安装runtime、借用其他profile或手拼ledger。

该技能引用的[浏览器证据合同](D:/07-AgentHub-AI资产/support/_shared/browser-evidence.md)第7节默认要求未启用自动提交时人工接管。用户在了解这一限制后明确要求由Agent完成本轮GSC/Bing提交，本轮按用户当前指令覆盖技能的默认人工流程，使用已登录的可见浏览器逐项执行和留证据；不安装缺失runtime，不复制profile，不修改共享技能源码。平台工具策略、登录/验证码、配额和实时状态核验仍必须遵守。

部署并通过L.2后：

1. 打开[GSC站点地图](https://search.google.com/search-console/sitemaps?resource_id=sc-domain%3Amarkdown-to-pdf.app)，输入上述完整地图URL，人工点击提交。
2. 成功弹窗只表示接受提交；继续查看同一地图的读取日期、状态、发现数。旧记录“成功/42”不能作为新版本已抓取证明。
3. 打开[Bing站点地图](https://www.bing.com/webmasters/sitemaps?siteUrl=https%3A%2F%2Fmarkdown-to-pdf.app%2F)，确认目标站点，选择原地图的Re-submit，人工点击，查看Last crawl/Status/URLs discovered。
4. 在GSC顶部网址检查框逐条输入L.3白名单，核对回显URL，人工执行需要的“请求编入索引”；Bing如需单条通知，仅提交同一白名单。
5. 每个动作单独保存成功/失败证据并回读，区分接受提交、实际抓取和实际收录。共享记录配置仍指向旧域，不直接执行；将现有事件记录脚本原样复制到本轮Staging任务目录，用任务配置指定当前registry和本轮证据/日志落点，再执行并回读summary。本輪记录写入`D:/99-Staging-整理暂存/markdown-to-pdf-seo-20261005`，不修改共享配置或写入旧域。

本轮不接入IndexNow、不改DNS、不修改第三方账号资料。本节是执行前交接，实际结果以本轮任务目录中的证据和summary为准；仅有“接受提交”时不得宣称已抓取或已收录。

### L.5 本轮实际执行结果（2026-10-05）

- 代码提交`0f90482`已push到origin/main；推送确认时间01:27:28 UTC，01:30:00 UTC开始线上核验，满足用户要求的至少2分钟等待。线上48个公共页面均200、canonical/分享元数据正确，30篇指南初始HTML含完整正文；分享图200/image/png/66,200字节。
- GSC原sitemap重提成功，提交日期更新为2026-10-05。最终回读仍为上次读取2026-06-21、发现42个网址，因此尚未确认新地图抓取。
- Bing原sitemap重提成功；最终回读上次提交/抓取均2026-10-05、Success、发现48个网址，确认新地图已抓取。
- GSC三个白名单网址均收到“已请求编入索引”弹窗。Word工具页与表格指南检查时未收录；简历模板已收录但上次抓取2026-07-05，本轮请求刷新其新正文。请求进入队列不等于已经完成收录或版本更新。
- Bing同三个网址均出现在Submitted Urls list，时间Today at 09:46；今日提交数0→3，可用配额100→97。逐条记录已回读，没有配额拦截、失败或未知项。
- 生产HTTP补验：根308至/en、未知页404、登录页noindex、Dashboard未登录307且private/no-store。Chrome1280px正文无固定高度/内部滚动，页面无横向溢出；迷你编辑器实时预览和FAQ Enter键展开通过。手机覆盖未完成：viewport请求390px后，指南实测DOM仍为1280px，未把该结果计作手机通过；iOS/Safari仍需真机验收。
- 提交证据与事件summary位于`D:/99-Staging-整理暂存/markdown-to-pdf-seo-20261005`，摘要为`ledgers/markdown-to-pdf/2026-10-05-ops.summary.json`；各写入单元已收口并解除锁。本次提交动作已完成，后续实际收录由搜索引擎异步处理，不重复提交来催促。
