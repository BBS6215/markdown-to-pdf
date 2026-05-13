# Backend Dockerfile for Render deployment.
# Source: 05-技术方案文档 §8.3
#
# Multi-stage build for pnpm monorepo.
# Docker context must be the monorepo root: docker build -f backend/Dockerfile .
#
# Includes Chromium (for Puppeteer PDF generation) and CJK fonts
# (for Chinese/Japanese/Korean text rendering in PDFs).

# ── Stage 1: Build ──────────────────────────────────────────
FROM node:22-slim AS builder

WORKDIR /app

# Copy monorepo root files needed for pnpm install
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY backend/package.json ./backend/
COPY shared/ ./shared/

# Install dependencies (backend only)
RUN corepack enable && pnpm install --filter @mdpdf/backend... --frozen-lockfile

# Copy backend source and build
COPY backend/ ./backend/
RUN pnpm --filter @mdpdf/backend build

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

# Copy built output and production dependencies
COPY --from=builder /app/backend/dist ./dist/
COPY --from=builder /app/backend/node_modules ./node_modules/
COPY --from=builder /app/backend/package.json ./

EXPOSE 10000
CMD ["node", "dist/index.js"]
