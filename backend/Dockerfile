# Backend Dockerfile for monorepo deployment.
# Source: 05-技术方案 §8.3
#
# Multi-stage build for pnpm monorepo.
# Build context must be the monorepo root: docker build -f backend/Dockerfile .
#
# Includes Chromium (for Puppeteer PDF generation) and CJK fonts
# (for Chinese/Japanese/Korean text rendering in PDFs).

# ── Stage 1: Build ──────────────────────────────────────────
FROM node:22-slim AS builder

WORKDIR /app

# Copy monorepo manifest files first for cacheable pnpm install
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY backend/package.json ./backend/
COPY shared/ ./shared/

# Install workspace deps (including dev) needed for the build step.
# PUPPETEER_SKIP_DOWNLOAD avoids downloading a second Chromium — the runtime
# stage uses the system Chromium installed via apt-get.
ENV PUPPETEER_SKIP_DOWNLOAD=true
RUN corepack enable && pnpm install --filter @mdpdf/backend... --frozen-lockfile

# Compile TypeScript and copy styles into dist/
COPY backend/ ./backend/
RUN pnpm --filter @mdpdf/backend build

# Produce a self-contained deploy directory:
#   * node_modules with real files (pnpm dereferences symlinks)
#   * production-only dependencies
#   * the workspace's own files (dist/, package.json, ...)
# Replaces the previous "COPY backend/node_modules" approach, which broke
# at runtime because the symlinks pointed at the missing root .pnpm store.
RUN pnpm --filter @mdpdf/backend deploy --prod /app/deploy

# ── Stage 2: Production ────────────────────────────────────
FROM node:22-slim

# Install Chromium and CJK fonts
RUN apt-get update && apt-get install -y \
    chromium \
    fonts-noto-cjk \
    fonts-noto-color-emoji \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
ENV PUPPETEER_SKIP_DOWNLOAD=true
ENV NODE_ENV=production

WORKDIR /app

# Copy the self-contained deploy directory produced in the builder stage.
COPY --from=builder /app/deploy /app

EXPOSE 10000
CMD ["node", "dist/index.js"]
