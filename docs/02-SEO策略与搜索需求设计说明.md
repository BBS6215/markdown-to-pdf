# SEO 策略与搜索需求设计说明

> **文档性质**: SEO 设计依据文档，作为《产品结构文档》、UI 设计、技术设计的前置输入
> **依据**: 01-项目主线文档.md + SEO 调研数据（Ahrefs/Semrush/Google Trends，2026-03-17）+ 补充调研（2026-03-23）
> **版本**: v1.0
> **创建日期**: 2026-03-23

---

## 1. SEO 目标简述

### 核心 SEO 目标
通过搜索引擎自然流量获取用户，将 markdown-to-pdf.app 建设为 Markdown 格式转换领域的垂直权威工具站。

### 量化目标（12个月）
| 阶段 | 时间 | 目标 |
|------|------|------|
| 收录期 | 上线后 1-4 周 | Google 收录全部工具页+指南页（10+ 页面） |
| 破局期 | 第 1-3 个月 | 低 KD 词（md to word, markdown new line）进入 Google 前 50 |
| 起量期 | 第 4-6 个月 | md to word 进入前 10，指南页矩阵开始持续带来日均 50+ 访客 |
| 攻坚期 | 第 7-12 个月 | md to html 进入前 10，md to pdf 进入前 30 |

### SEO 在项目中的定位
- SEO 是获取免费流量的主要渠道，但**不是唯一渠道**
- SEO 策略必须服务于产品主线目标（提供转换工具），不能反过来绑架产品
- 每个 SEO 页面必须有真实的用户价值，不为 SEO 造无用页面

---

## 2. 目标关键词方向

基于 Ahrefs/Semrush 数据和补充调研，确定以下关键词方向：

### 方向 A：格式转换工具词（Transactional Intent）
用户搜索这些词时，直接想找一个在线转换工具来用。

| 关键词 | 月搜索量 | KD | 搜索意图 | 与项目匹配度 |
|--------|---------|-----|---------|------------|
| markdown to pdf | 6,600 | 61 | 工具使用 | ★★★★★ 核心词 |
| md to pdf | 6,600 | 69 | 工具使用 | ★★★★★ 核心词 |
| convert md to pdf | 1,300 | 46 | 工具使用 | ★★★★★ |
| markdown to word | 1,300 | 38 | 工具使用 | ★★★★★ |
| md to word | 2,400 | 12 | 工具使用 | ★★★★★ 突破口 |
| md to docx | ~500 | ~15 | 工具使用 | ★★★★★ |
| markdown to html | 2,400 | 33 | 工具使用 | ★★★★★ |
| md to html | 1,900 | 27 | 工具使用 | ★★★★★ |
| convert markdown to pdf online | ~300 | ~40 | 工具使用 | ★★★★★ |
| markdown to pdf converter | ~800 | ~55 | 工具使用 | ★★★★★ |

### 方向 B：Markdown 语法教程词（Informational Intent）
用户搜索这些词时，在学习/查阅 Markdown 语法。可通过指南内容引流到工具。

| 关键词 | 月搜索量 | KD | 搜索意图 | 与项目匹配度 |
|--------|---------|-----|---------|------------|
| markdown new line | 4,400 | 22 | 语法学习 | ★★★★ 高匹配引流 |
| markdown line break | 2,900 | 18 | 语法学习 | ★★★★ |
| line break in markdown | 2,900 | 26 | 语法学习 | ★★★★ |
| markdown horizontal line | 3,600 | 26 | 语法学习 | ★★★★ |
| markdown quote | 4,400 | 22 | 语法学习 | ★★★★ |
| markdown block quote | 880 | 15 | 语法学习 | ★★★★ |
| markdown italics | 2,400 | 28 | 语法学习 | ★★★ |
| markdown superscript | 880 | 16 | 语法学习 | ★★★ |
| markdown cheat sheet | 9,900 | 43 | 语法学习 | ★★★ 高搜索但难 |
| markdown table | 9,900 | 56 | 语法学习 | ★★ 太难+弱相关 |

### 方向 C：AI 内容转换词 —— V1.0 不承接

补充调研发现 "chatgpt output to pdf"、"ai generated markdown to pdf" 等新兴词竞争度极低。但 V1.0 决策为**不在 SEO 层面融入 AI 角度**，原因：
- 搜索量尚小，投入产出比不确定
- 尚未想清楚 AI 如何与转换工具结合
- 先专注做好纯工具的 SEO，不分散精力

> 此方向保留为后续版本的备选机会。

---

## 3. 搜索意图分析

### 3.1 搜索意图分类

| 意图类型 | 说明 | 对应关键词 | 页面承接方式 |
|---------|------|-----------|------------|
| **Transactional（交易型）** | 用户想立即使用工具完成转换 | md to pdf, markdown to word, convert md to html | **工具页**：首屏即工具，用完即走 |
| **Informational（信息型）** | 用户想学习 Markdown 语法或了解转换方法 | markdown new line, markdown quote, how to convert md to pdf | **指南页**：教程内容+引导使用工具 |
| **Commercial Investigation（商业调查）** | 用户在比较不同转换工具 | best markdown to pdf converter, markdown to pdf converter free | **首页/工具页**：SEO 内容区+功能对比 |
| **Navigational（导航型）** | 用户搜索特定品牌/产品 | markdowntopdf, cloudconvert markdown | 暂不适用（品牌尚未建立） |

### 3.2 核心意图洞察

**"md to pdf" 的搜索者到底想要什么？**
- 90% 是工具使用意图：想找一个在线工具，把 .md 文件或 Markdown 文本转成 PDF
- 他们期望：打开网页 → 粘贴/上传 → 点击转换 → 下载。**整个过程不超过 30 秒**
- Google SERP 验证：排名前 5 全是在线工具页面，不是教程或文章

**"markdown new line" 的搜索者到底想要什么？**
- 100% 信息查询意图：想知道 Markdown 中怎么换行
- 他们期望：看到语法说明 + 代码示例 + 渲染效果对比
- Google SERP 验证：排名前位是 markdownguide.org、dev.to、supernotes.app 的教程页

### 3.3 "MD" 歧义陷阱（关键风险）

从 Semrush 数据中清晰看到：搜索 "md to ..." 的结果中 **90% 以上与 Markdown 无关**：
- "things to do in ocean city md" → Maryland 马里兰州
- "where to watch house md" → 美剧《豪斯医生》
- "how long does it take to be a md doctor" → Medical Doctor

**SEO 应对策略**：
1. 页面 Title/H1/Description 中必须同时出现 "Markdown" 和 "(.md)"，帮助 Google 识别实体
2. 不能只写 "MD to PDF Converter"，必须写 "Markdown (.md) to PDF Converter"
3. 页面正文中 "Markdown" 全称出现频率必须远高于缩写 "md"
4. JSON-LD 结构化数据中明确标注 applicationCategory 为 "DeveloperApplication" 或 "Utility"

---

## 4. 关键词分层建议

### 第一层：核心词（Core Keywords）
网站的终极 SEO 目标词，直接代表产品核心功能。

| 关键词 | 承接页面 | 预期排名时间 | 策略 |
|--------|---------|------------|------|
| markdown to pdf | 首页 `/en/` | 6-12 个月 | 长期攻坚，靠全站权重积累 |
| md to pdf | 首页 `/en/` | 6-12 个月 | 与上同义，同页承接 |
| markdown to pdf converter | 首页 `/en/` | 6-12 个月 | 长尾变体，自然覆盖 |

### 第二层：次级词（Secondary Keywords）
搜索量适中、KD 较低，是建站初期的流量突破口。

| 关键词 | 承接页面 | 预期排名时间 | 策略 |
|--------|---------|------------|------|
| md to word | `/en/to-word/` | 1-3 个月 | **V1.0 首要突破目标** |
| markdown to word | `/en/to-word/` | 2-4 个月 | 同页承接 |
| md to html | `/en/to-html/` | 2-4 个月 | 中等难度 |
| markdown to html | `/en/to-html/` | 3-5 个月 | 同页承接 |
| convert md to pdf | 首页 `/en/` | 4-6 个月 | 首页长尾覆盖 |

### 第三层：长尾词（Long-tail Keywords）
低 KD、信息型意图，通过内容页面承接，为工具页引流。

| 关键词 | 承接页面 | 预期排名时间 | 策略 |
|--------|---------|------------|------|
| markdown new line | `/en/guides/markdown-new-line` | 1-3 个月 | 高搜索低KD，必做 |
| markdown line break | `/en/guides/markdown-new-line` | 1-3 个月 | 同页覆盖 |
| line break in markdown | `/en/guides/markdown-new-line` | 1-3 个月 | 同页覆盖 |
| markdown quote | `/en/guides/markdown-quote` | 1-3 个月 | 高搜索低KD，必做 |
| markdown block quote | `/en/guides/markdown-quote` | 1-2 个月 | 同页覆盖 |
| markdown horizontal line | `/en/guides/markdown-new-line` | 1-3 个月 | 可归入换行指南 |
| how to convert markdown to pdf | 首页 SEO 区 | 3-6 个月 | 首页下方内容覆盖 |
| how to convert md to word | `/en/to-word/` SEO 区 | 2-4 个月 | 工具页下方内容覆盖 |

### 第四层：占位词（Placeholder Keywords）
V1.0 内容中自然提及但不单独发力的词，留给后续版本。

| 关键词 | 月搜索量 | KD | 不发力原因 |
|--------|---------|-----|----------|
| markdown cheat sheet | 9,900 | 43 | KD 偏高，需要大量外链支撑 |
| markdown table | 9,900 | 56 | KD 太高，且与转换工具关系较弱 |
| markdown link | 6,600 | 55 | KD 太高 |
| pdf to markdown | 1,600 | 29 | V1.0 不做反向转换功能 |

---

## 5. 关键词与页面承接关系

### 5.1 承接矩阵

```
关键词集群              →  承接页面           →  页面类型      →  优先级
─────────────────────────────────────────────────────────────────────
markdown to pdf 集群    →  /en/              →  工具页(首页)  →  ★★★★★
  ├ markdown to pdf
  ├ md to pdf
  ├ convert markdown to pdf
  ├ markdown to pdf converter
  └ markdown to pdf online free

md to word 集群         →  /en/to-word/      →  工具页        →  ★★★★★
  ├ md to word
  ├ markdown to word
  ├ convert md to word
  └ md to docx

md to html 集群         →  /en/to-html/      →  工具页        →  ★★★★
  ├ md to html
  ├ markdown to html
  └ convert markdown to html

markdown 换行集群       →  /en/guides/markdown-new-line  →  指南页  →  ★★★★
  ├ markdown new line
  ├ markdown line break
  ├ line break in markdown
  ├ markdown newline
  └ markdown horizontal line

markdown 引用集群       →  /en/guides/markdown-quote     →  指南页  →  ★★★★
  ├ markdown quote
  ├ markdown block quote
  ├ quotation markdown
  └ quote markdown

markdown 速查集群       →  /en/guides/markdown-cheat-sheet  →  指南页  →  ★★★
  ├ markdown cheat sheet
  ├ markdown syntax
  └ markdown basics
```

### 5.2 承接原则

1. **一个关键词集群对应且仅对应一个页面**——避免站内多个页面争抢同一关键词（Keyword Cannibalization）
2. **工具页承接交易型意图**——首屏是工具，下方才是 SEO 内容
3. **指南页承接信息型意图**——内容为主，底部引导到工具页
4. **每个指南页至少包含一个 CTA（引导到工具页）**——"Try it yourself → Convert Markdown to PDF"
5. **不为 SEO 单独创建没有用户价值的页面**

---

## 6. 建议的网站结构方向

### 6.1 整体结构：扁平化 + 主题集群（Topic Cluster）

```
首页 /en/ (Pillar Page - "Markdown to PDF")
  │
  ├── /en/to-word/     (工具页 - 独立 SEO 入口)
  ├── /en/to-html/     (工具页 - 独立 SEO 入口)
  │
  ├── /en/guides/      (指南列表 - Hub Page)
  │   ├── /en/guides/markdown-new-line     (内容页)
  │   ├── /en/guides/markdown-quote        (内容页)
  │   └── /en/guides/markdown-cheat-sheet  (内容页)
  │
  ├── /en/pricing      (辅助页 - noindex 可选)
  ├── /en/privacy      (辅助页 - 不参与 SEO)
  └── /en/terms        (辅助页 - 不参与 SEO)
```

### 6.2 层级说明

| 层级 | 页面类型 | 数量 | SEO 职责 |
|------|---------|------|---------|
| L0 | 首页 | 1 | 承接核心词（markdown to pdf），全站权重中枢 |
| L1 | 工具页 | 2 | 承接次级词（to-word, to-html），独立 SEO 入口 |
| L1 | 指南列表 | 1 | Hub 页面，分发权重给指南子页面 |
| L2 | 指南详情 | 3 | 承接长尾词，引流到工具页 |
| L1 | 辅助页 | 3-4 | 不参与 SEO 竞争，提供信任信号 |

**总页面数（V1.0 英文版）：10 页左右**——精而不滥，每页都有明确的 SEO 职责。

---

## 7. 栏目/分类/专题页建议

### V1.0 栏目设计

| 栏目 | URL 前缀 | 内容 | SEO 作用 |
|------|---------|------|---------|
| 转换工具 | `/en/`, `/en/to-word/`, `/en/to-html/` | 在线工具 + 下方 SEO 内容 | 承接交易型关键词 |
| 指南中心 | `/en/guides/` | Markdown 语法指南 | 承接信息型关键词，为工具页导流 |

### V1.0 不建议设置的栏目
- **博客（/blog/）**：兼职精力有限，无法持续产出；指南页已覆盖内容需求
- **对比页（/compare/）**：V1.0 品牌知名度不够，做对比页意义不大
- **API 文档（/docs/）**：V1.0 不开放 API

### 后续版本可考虑的栏目
- `/en/blog/` — 当有能力持续产出时（如 "How ChatGPT Users Convert Markdown to PDF"）
- `/en/api/` — 开放 API 后
- `/en/templates/` — 提供 PDF 模板时

---

## 8. 域名与 URL 结构建议

### 8.1 域名评估：markdown-to-pdf.app

| 维度 | 评估 | 说明 |
|------|------|------|
| 关键词匹配 | ★★★★ | 包含完整 "markdown-to-pdf"，精确匹配核心词 |
| 品牌辨识 | ★★★ | 连字符降低了可记忆性，但对 Google 切词有利 |
| .app 后缀 | ★★★★ | 强制 HTTPS、暗示"应用"属性、Google 不歧视非 .com |
| 避免 MD 歧义 | ★★★★★ | 使用 "markdown" 全拼而非 "md"，完美避开 Maryland/Medical Doctor 混淆 |
| 竞品对比 | ★★★ | markdowntopdf.com（#1 竞品，无连字符 .com）有先天优势，但差距可通过内容弥补 |

**结论**：域名可用，但需要意识到在 "markdown to pdf" 这个主词上，markdowntopdf.com 的域名优势（无连字符 .com EMD）短期内难以正面超越。这再次印证了"先从低 KD 次级词突围"的策略正确性。

### 8.2 URL 结构规范

**原则**：
- 所有 URL 使用英文小写 + 连字符
- 语言前缀作为第一级路径：`/en/`, `/zh/`
- URL 尽量包含目标关键词
- 层级不超过 3 级（`/en/guides/markdown-new-line` 是极限）

**具体 URL 映射**：

| 页面 | URL | 目标关键词 | 说明 |
|------|-----|-----------|------|
| 首页 | `/en/` | markdown to pdf, md to pdf | 域名本身包含关键词 |
| Word 转换 | `/en/to-word/` | md to word, markdown to word | 短路径，保留关键词 |
| HTML 转换 | `/en/to-html/` | md to html, markdown to html | 短路径，保留关键词 |
| 指南列表 | `/en/guides/` | markdown guides | Hub 页面 |
| 换行指南 | `/en/guides/markdown-new-line` | markdown new line | slug 包含完整关键词 |
| 引用指南 | `/en/guides/markdown-quote` | markdown quote | slug 包含完整关键词 |
| 速查表 | `/en/guides/markdown-cheat-sheet` | markdown cheat sheet | slug 包含完整关键词 |

**URL 设计中的 SEO 细节**：
- `/en/to-word/` 而非 `/en/markdown-to-word/` → 域名已包含 "markdown"，路径不需重复
- `/en/guides/markdown-new-line` 而非 `/en/guides/how-to-add-new-line-in-markdown` → 精准匹配搜索词

### 8.3 Canonical 和 hreflang 策略

- 每个页面设置 `<link rel="canonical" href="..." />`，避免重复内容
- 英文和中文页面互设 hreflang：
  ```html
  <link rel="alternate" hreflang="en" href="https://markdown-to-pdf.app/en/" />
  <link rel="alternate" hreflang="zh" href="https://markdown-to-pdf.app/zh/" />
  <link rel="alternate" hreflang="x-default" href="https://markdown-to-pdf.app/en/" />
  ```
- `x-default` 指向英文版（英文为 SEO 主力语言）

---

## 9. 各页面类型的 SEO 职责

### 9.1 首页 (`/en/`)

| 维度 | 要求 |
|------|------|
| **承接关键词** | markdown to pdf, md to pdf, markdown to pdf converter, convert markdown to pdf online |
| **Title** | `Markdown to PDF Converter — Convert .md Files to PDF Free Online` |
| **H1** | `Convert Markdown (.md) to PDF — Free Online Tool` |
| **Description** | `Free online Markdown to PDF converter. Paste your markdown or upload .md files. Convert to professional PDF, Word, or HTML in seconds. No registration required.` |
| **首屏** | 转换工具（编辑器+预览+转换按钮），不是营销文案 |
| **SEO 内容区** | 位于工具下方：How to步骤、Why 使用场景、Features 特性、FAQ（5+ 问题） |
| **结构化数据** | SoftwareApplication + FAQPage JSON-LD |
| **内链** | 链向 to-word、to-html（"Also convert to Word/HTML"）+ 指南页（"Markdown Guides"） |
| **文案聚焦** | 专注工具功能本身，V1.0 不在 SEO 内容中融入 AI 场景描述 |

### 9.2 工具页 (`/en/to-word/`, `/en/to-html/`)

| 维度 | /en/to-word/ | /en/to-html/ |
|------|-------------|-------------|
| **承接关键词** | md to word, markdown to word, convert md to docx | md to html, markdown to html, convert markdown to html |
| **Title** | `Markdown to Word Converter — Convert .md to .docx Free Online` | `Markdown to HTML Converter — Convert .md to HTML Free Online` |
| **H1** | `Convert Markdown (.md) to Word (.docx) — Free Online` | `Convert Markdown (.md) to HTML — Free Online` |
| **Description** | 包含: free, online, convert, markdown, .md, word/docx 或 html | 同左逻辑 |
| **首屏** | 共用转换器布局，默认高亮对应的转换按钮 | 同左，但强调"纯前端处理，数据不离开浏览器" |
| **SEO 内容区** | 针对 Word 格式的 How to + Why + FAQ | 针对 HTML 的 How to + Why + FAQ |
| **结构化数据** | SoftwareApplication + FAQPage | 同左 |
| **内链** | 链向首页（"Also convert to PDF"）+ to-html + 指南页 | 链向首页 + to-word + 指南页 |
| **差异化卖点** | "No formatting loss when converting to .docx" | "100% client-side. Your data never leaves your browser." |

### 9.3 指南页 (`/en/guides/[slug]`)

| 维度 | 要求 |
|------|------|
| **承接关键词** | 各指南对应的长尾关键词集群 |
| **Title 模式** | `[关键词] — Complete Guide with Examples \| Markdown to PDF` |
| **H1 模式** | `How to [动作] in Markdown` 或 `Markdown [语法名] Guide` |
| **内容结构** | 语法说明 → 代码示例（可复制）→ 渲染效果对比 → 常见错误 → FAQ |
| **CTA** | 文章中部和底部各一个引导框："Try it yourself → [打开 Markdown 编辑器]" |
| **内链** | 链向其他指南（"Related Guides"）+ 工具页（"Convert your Markdown"） |
| **结构化数据** | Article + FAQPage + HowTo（如适用） |
| **字数建议** | 800-1500 词（英文），确保比竞品内容更详尽 |

### 9.4 指南列表页 (`/en/guides/`)

| 维度 | 要求 |
|------|------|
| **承接关键词** | markdown guide, markdown tutorial（低优先级，不主攻） |
| **Title** | `Markdown Guides — Syntax, Tips & Examples \| Markdown to PDF` |
| **作用** | Hub 页面，将权重分发给各指南子页面 |
| **内容** | 指南卡片列表 + 简短描述，不需要长文 |

### 9.5 辅助页面

| 页面 | SEO 处理 |
|------|---------|
| `/en/auth/login` | `noindex`，不参与 SEO |
| `/en/dashboard` | `noindex`，不参与 SEO |
| `/en/pricing` | 可 index，但不主动优化关键词 |
| `/en/privacy` | 可 index，提供信任信号 |
| `/en/terms` | 可 index，提供信任信号 |

---

## 10. 当前版本优先承接的关键词范围

### 第一优先级（上线立即冲刺）

| 关键词 | KD | 月搜索量 | 承接页面 | 理由 |
|--------|-----|---------|---------|------|
| md to word | 12 | 2,400 | /en/to-word/ | KD 最低，SERP 中 DR 28-30 的小站已排前3，我们有机会 |
| markdown new line | 22 | 4,400 | /en/guides/markdown-new-line | 高搜索+低 KD，流量入口 |
| markdown line break | 18 | 2,900 | /en/guides/markdown-new-line | 同页覆盖 |
| markdown quote | 22 | 4,400 | /en/guides/markdown-quote | 高搜索+低 KD |
| markdown block quote | 15 | 880 | /en/guides/markdown-quote | 同页覆盖，KD 极低 |

**预估：以上关键词如果排入前 10，月自然流量可达 3,000-5,000。**

### 第二优先级（上线后 3 个月开始发力）

| 关键词 | KD | 月搜索量 | 承接页面 | 理由 |
|--------|-----|---------|---------|------|
| md to html | 27 | 1,900 | /en/to-html/ | 中等难度，纯前端差异化 |
| markdown to html | 33 | 2,400 | /en/to-html/ | 同页 |
| markdown to word | 38 | 1,300 | /en/to-word/ | 同页，靠 md to word 带动 |
| markdown cheat sheet | 43 | 9,900 | /en/guides/markdown-cheat-sheet | 搜索量大但 KD 偏高，作为防御性内容 |

### 第三优先级（网站权重提升后）

| 关键词 | KD | 月搜索量 | 承接页面 | 理由 |
|--------|-----|---------|---------|------|
| markdown to pdf | 61 | 6,600 | /en/ | 核心词但 KD 高，需要全站权重支撑 |
| md to pdf | 69 | 6,600 | /en/ | 最难的词，长期目标 |
| convert md to pdf | 46 | 1,300 | /en/ | 首页长尾 |

---

## 11. 当前版本不建议承接的关键词范围

| 关键词 | 月搜索量 | KD | 不承接原因 |
|--------|---------|-----|----------|
| markdown table | 9,900 | 56 | KD 太高；教表格语法与转换工具的关联度偏弱 |
| markdown link | 6,600 | 55 | KD 太高 |
| markdown bold | 6,600 | 50+ | KD 太高 |
| markdown image | 9,900 | ~40 | KD 偏高，且与转换工具弱相关 |
| pdf to markdown | 1,600 | 29 | V1.0 不做反向转换功能，无对应页面承接 |
| markdown editor | 5,400 | ~45 | 我们是转换工具不是编辑器，定位冲突 |
| markdown viewer | ~2,000 | ~30 | 定位不符 |
| hsn clearance new markdowns | ~1,000 | - | 零售降价含义，与技术无关 |
| things to do in ocean city md | ~5,000 | - | Maryland 地理含义，完全无关 |
| where to watch house md | ~9,900 | - | 美剧含义，完全无关 |
| how to write fraction in r markdown | 1,000 | 2 | 虽然 KD 极低，但 R Markdown 是独立生态，用户不会用我们的工具 |
| slack markdown | 1,000 | 21 | Slack 有自己的 Markdown 变体，与文件转换无关 |

**核心原则**：不为搜索量诱惑而偏离产品定位。每个关键词必须能被现有功能真实承接。

---

## 12. 与《项目主线文档》的一致性说明

### 完全一致的部分
| 主线文档内容 | SEO 策略对应 |
|-------------|-------------|
| "md to word KD 12 是突破口" | SEO 第一优先级关键词 ✅ |
| "首页即入口，粘贴即转换" | SEO 要求首屏是工具，不是营销文案 ✅ |
| "2-3 篇低 KD 指南" | 策略确认 3 篇（new-line, quote, cheat-sheet） ✅ |
| "Title 必须包含 Markdown (.md)" | MD 歧义避坑策略完全一致 ✅ |
| "英文为默认/SEO 主力语言" | hreflang x-default 指向英文 ✅ |
| "V1.0 不做反向转换" | 不承接 "pdf to markdown" 关键词 ✅ |

### 需要补充/修正的部分

**1. 主线文档第 6.6 节页面清单需要更新**

当前主线文档的页面清单缺少 `markdown-cheat-sheet` 指南页。SEO 策略建议 V1.0 包含 3 篇指南：
- `/en/guides/markdown-new-line` ← 已在主线文档中
- `/en/guides/markdown-quote` ← 已在主线文档中
- `/en/guides/markdown-cheat-sheet` ← **建议新增**（KD 43 虽偏高，但作为 Markdown 工具站的"基建页面"，它是用户和 Google 判断网站权威性的标配内容）

**2. 主线文档第 6.4 节 SEO 基础设施建议补充**

建议增加：
- "每个工具页下方 SEO 内容区至少包含 How to 步骤 + Features + FAQ（5+ 问题）"
- "指南页文章内容不低于 800 词（英文）"
- "所有页面设置 canonical URL 和 hreflang 标签"

**3. 关于 AI 用户定位的 SEO 融入**

主线文档明确了"AI 工具使用者是最大用户群体"。V1.0 决策：**不在 SEO 层面融入 AI 角度**，专注做好纯工具的搜索承接。AI 场景作为后续版本的 SEO 扩展方向保留。

---

## 13. 对《产品结构文档》的前置约束

本 SEO 策略对后续产品结构设计提出以下约束：

### 约束 1：页面结构必须遵循 SEO 承接关系
- 首页必须承接 "markdown to pdf" 关键词集群，**不能做成纯品牌介绍页**
- `/en/to-word/` 和 `/en/to-html/` 必须是独立页面，**不能做成首页的 Tab 切换**（Tab 内容不被 Google 独立索引）
- 每个工具页必须有独立的 URL、独立的 Title/H1、独立的 SEO 内容区

### 约束 2：首屏必须是工具，SEO 内容在下方
- Google 对工具型搜索意图的页面，期望首屏就是工具本身
- SEO 文字内容（How to、Features、FAQ）必须放在工具下方（Below the Fold）
- 这不意味着 SEO 内容不重要——它是 Google 判断页面质量的关键

### 约束 3：指南页必须有 CTA 引导到工具页
- 每篇指南必须在文中和文末包含引导链接/按钮，导向对应的工具页
- 这是将信息型流量转化为工具使用的核心路径

### 约束 4：内链网络设计
产品结构文档在设计页面布局时，必须为以下内链预留位置：
- 工具页 → 其他工具页（"Also convert to Word/HTML"）
- 工具页 → 指南页（"Markdown Guides" 区域）
- 指南页 → 工具页（CTA 按钮/横幅）
- 指南页 → 其他指南页（"Related Guides"）
- 所有页面 → 首页（Logo 链接 + 面包屑）

### 约束 5：URL 路径不可更改
一旦上线，URL 路径不能随意修改（会导致 404 和权重丢失）。产品结构文档中确定的 URL 即为最终 URL。

### 约束 6：noindex 页面清单
以下页面必须设置 `<meta name="robots" content="noindex">`：
- `/en/auth/login`
- `/en/dashboard`
- 任何仅登录用户可见的页面

### 约束 7：中文版的 SEO 优先级
- V1.0 中文版不是 SEO 发力点（目标市场是海外英文用户）
- 中文版页面通过 hreflang 正确标注即可
- 中文版的 SEO 内容可以简化（不需要和英文版一样详尽的 FAQ 和指南）

---

## 14. 待补充项或待确认问题

| 序号 | 问题 | 影响范围 | 建议 |
|------|------|---------|------|
| 1 | ~~markdown-cheat-sheet 指南是否纳入 V1.0？~~ | ~~页面清单~~ | ✅ 已确认纳入，V1.0 共 3 篇指南 |
| 2 | ~~是否在 SEO 内容中融入 AI 角度？~~ | ~~TDK 文案~~ | ✅ 已确认不做，V1.0 专注纯工具 SEO |
| 3 | Google Search Console 和 Bing Webmaster Tools 何时提交？ | 收录时间 | 建议上线当天提交 sitemap |
| 4 | 是否需要在 V1.0 建设基础外链？（如提交到工具导航站） | 网站权重 | 建议上线后手动提交到 5-10 个工具导航站/目录 |
| 5 | ~~产品结构文档需要回溯修正？~~ | ~~文档一致性~~ | ✅ 已确认删除重写，基于本 SEO 策略重新产出 |

---

## 附录 A：markdownguide.org 竞品分析与指南差异化策略

### A.1 markdownguide.org 概况

markdownguide.org 是 Markdown 语法领域的绝对权威（月访问量 41.6 万，权威分数 54）。几乎所有 Markdown 语法关键词的 Google 第一名都指向该站。

**它的内容模式**：
- `/basic-syntax/` — 一个约 5000 字的大页面，覆盖 12 个基础语法主题（标题、加粗、链接、图片、换行等）
- `/extended-syntax/` — 一个约 2500 字的大页面，覆盖 14 个扩展语法（表格、代码块、脚注等）
- `/cheat-sheet/` — 极简速查表
- `/hacks/` — 14 个原生不支持的需求解法（如高亮、上标、居中等）

**核心洞察**："markdown new line" 这个关键词排到 markdownguide.org 的 `/basic-syntax/` 页面，但换行内容只是该页面的一小节（约 200-300 字）。**它不是一个专门的换行指南页面**。

### A.2 markdownguide.org 的 5 个弱点

| 弱点 | 说明 | 我们的机会 |
|------|------|----------|
| **零交互性** | 纯文本+表格，没有"试一试"功能 | 指南页嵌入实时编辑器，用户可输入 Markdown 立即看到渲染效果 |
| **不涉及转换** | 只教语法，完全不提 Markdown → PDF/HTML | 转换类关键词（md to pdf 等）是 markdownguide.org 根本不竞争的领域 |
| **大页面模式** | "markdown new line" 只是 /basic-syntax/ 的一小节 | 我们为高搜索量语法主题建独立专页，内容更深入（800-1500 词） |
| **仅英文** | 没有多语言版本 | 我们有中英双语，未来可扩展 |
| **无转化路径** | 是纯教育站，不引导用户做任何事 | 每篇指南底部有 CTA："Try it → Convert to PDF" |

### A.3 指南页差异化策略（关键决策）

**我们的指南页不是 markdownguide.org 的翻版，而是"交互式学习+转换引导"的混合页面。**

每篇指南的核心结构：
1. **语法说明**（文字+代码示例）— 参考 markdownguide.org 的内容，但更详尽、更多示例
2. **交互试验区**（嵌入式迷你编辑器）— 用户可直接输入 Markdown 并看到渲染结果。这是 markdownguide.org 完全没有的
3. **常见错误**（markdownguide.org 涉及但不深入的部分）
4. **CTA 引导**："需要把 Markdown 转成 PDF 吗？→ [使用转换工具]"
5. **FAQ**（覆盖长尾变体关键词）

**关于 markdown-cheat-sheet**：
- markdownguide.org 的 /cheat-sheet/ 是极简格式，排名第 1 且 KD 43
- 我们的 cheat-sheet 页面定位不是正面抢排名，而是**网站权威性标配内容**
- 差异化方向：增加交互示例 + 每个语法点链接到对应的独立指南页

### A.4 对产品结构文档的补充约束

基于以上分析，对产品结构文档增加以下约束：
- **指南页必须包含一个嵌入式迷你 Markdown 编辑器/预览组件**（可复用工具页的编辑器组件，精简版）
- **指南页的代码示例必须支持一键复制**
- **指南页内容深度必须超过 markdownguide.org 对应段落**（markdownguide.org 每个语法点约 200-300 字，我们的独立页面目标 800-1500 字）

---

## 附录 B：内链架构图（同前）

```
                    ┌─────────┐
                    │  首页    │ ← 全站权重中枢
                    │ /en/    │
                    └────┬────┘
                         │
          ┌──────────────┼──────────────┐
          │              │              │
    ┌─────▼─────┐  ┌────▼────┐  ┌─────▼─────┐
    │ to-word   │  │ to-html │  │  guides/  │ ← Hub
    │ /to-word/ │  │/to-html/│  │ /guides/  │
    └─────┬─────┘  └────┬────┘  └─────┬─────┘
          │              │              │
          │←────────────→│       ┌──────┼──────┐
          │   互相链接    │       │      │      │
          │              │    ┌──▼──┐┌──▼──┐┌──▼──┐
          │              │    │new  ││quote││cheat│
          │              │    │line ││     ││sheet│
          └──────────────┘    └──┬──┘└──┬──┘└──┬──┘
                                 │      │      │
                                 └──────┼──────┘
                                   互相链接
                                 + CTA → 工具页
```

**内链规则**：
- 首页 ← 所有页面（Logo + 面包屑）
- 工具页 ↔ 工具页（相互推荐）
- 工具页 ← 指南页（CTA 按钮）
- 指南页 ↔ 指南页（Related Guides）
- guides/ Hub → 所有指南详情页

---

## 附录 C：TDK 完整清单

| 页面 | Title（60 字符内） | Description（155 字符内） |
|------|------|------|
| 首页 | Markdown to PDF Converter — Convert .md Files Free Online | Free online Markdown to PDF converter. Paste your markdown or upload .md files. Convert to PDF, Word (.docx), or HTML in seconds. No registration required. |
| to-word | Markdown to Word Converter — Convert .md to .docx Free | Free online tool to convert Markdown (.md) files to Word (.docx). Preserves tables, code blocks, and formatting. No signup needed. |
| to-html | Markdown to HTML Converter — Convert .md to HTML Free | Convert Markdown to clean HTML instantly in your browser. 100% client-side processing — your data never leaves your device. |
| 换行指南 | Markdown New Line — How to Add Line Breaks (with Examples) | Learn how to add new lines and line breaks in Markdown. Includes code examples, common mistakes, and a live converter to test your markdown. |
| 引用指南 | Markdown Quote — Blockquote Syntax Guide (with Examples) | Complete guide to using blockquotes in Markdown. Single quotes, nested quotes, and multi-paragraph quotes with live examples. |
| 速查表 | Markdown Cheat Sheet — Quick Reference Guide 2026 | The essential Markdown syntax cheat sheet. Headers, bold, italic, links, images, tables, code blocks, and more — all in one page. |
| 指南列表 | Markdown Guides — Syntax, Tips & Examples | Browse our collection of Markdown guides. Learn syntax, formatting tips, and best practices with clear examples. |
