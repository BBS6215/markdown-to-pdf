# Backend Dockerfile for Render deployment.
# Source: 05-技术方案文档 §8.3
#
# Includes Chromium (for Puppeteer PDF generation) and CJK fonts
# (for Chinese/Japanese/Korean text rendering in PDFs).

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

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile --prod

COPY dist/ ./dist/
COPY src/styles/ ./dist/styles/

EXPOSE 10000
CMD ["node", "dist/index.js"]
