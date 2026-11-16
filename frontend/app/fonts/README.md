# Self-hosted Fonts

Two variable-font woff2 files used by `lib/layout/document-shell.tsx` via `next/font/local`:

| File | Source | License | Latin axis range |
|---|---|---|---|
| `inter-variable.woff2` | [rsms/inter](https://github.com/rsms/inter) via `@fontsource-variable/inter` | SIL OFL 1.1 | `wght 100..900` |
| `jetbrains-mono-variable.woff2` | [JetBrains/JetBrainsMono](https://github.com/JetBrains/JetBrainsMono) via `@fontsource-variable/jetbrains-mono` | SIL OFL 1.1 | `wght 100..800` |

Both are variable fonts, so a single file covers every weight we use (400/500/600/700 for Inter, 400/700 for Mono).

## Why self-hosted

`next/font/google` fetches `fonts.gstatic.com` at build time. The build breaks on any machine that can't reach Google Fonts (local Windows, restricted CI, offline boxes). Self-hosting keeps the build reproducible.

## CJK / Chinese

Not bundled. Chinese pages fall back to the OS font stack (PingFang on macOS, Microsoft YaHei on Windows, Noto Sans CJK on Linux/Android). Bundling Noto Sans SC would add 15+ MB to the repo for the four weights we use — disproportionate to the i18n surface area.

## Refreshing

```bash
pnpm --filter @mdpdf/frontend add -D @fontsource-variable/inter @fontsource-variable/jetbrains-mono
cp frontend/node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2 frontend/app/fonts/inter-variable.woff2
cp frontend/node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2 frontend/app/fonts/jetbrains-mono-variable.woff2
pnpm --filter @mdpdf/frontend remove @fontsource-variable/inter @fontsource-variable/jetbrains-mono
```

The packages themselves are not kept as dependencies — only the two woff2 files are.

## Included licenses

The complete SIL OFL 1.1 texts are included as [Inter-OFL.txt](./Inter-OFL.txt) and [JetBrainsMono-OFL.txt](./JetBrainsMono-OFL.txt). Preserve them when redistributing the font files.
