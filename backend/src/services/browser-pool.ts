/**
 * Puppeteer browser pool — single instance, reused across requests.
 * Source: 05-技术方案 附录 A + §11 风险 1
 *
 * Key constraints (Render Starter 512MB):
 * - Maximum 1 Browser instance
 * - Reuse Page, not Browser
 * - Launch args minimize memory usage
 */

import puppeteer, { type Browser } from 'puppeteer';
import { config } from '../config.js';

let browser: Browser | null = null;

// Production args (Linux/Docker): aggressive memory saving
const PRODUCTION_ARGS = [
  '--no-sandbox',
  '--disable-setuid-sandbox',
  '--disable-dev-shm-usage',
  '--single-process',
  '--disable-gpu',
  '--no-zygote',
];

// Dev args (Windows/Mac): --single-process and --no-zygote cause crashes
const DEV_ARGS = [
  '--no-sandbox',
  '--disable-setuid-sandbox',
  '--disable-dev-shm-usage',
  '--disable-gpu',
];

export async function getBrowser(): Promise<Browser> {
  if (!browser || !browser.connected) {
    const isProduction = config.nodeEnv === 'production';
    const launchOptions: Parameters<typeof puppeteer.launch>[0] = {
      headless: true,
      args: isProduction ? PRODUCTION_ARGS : DEV_ARGS,
    };
    // In production (Docker), use system Chromium; in dev, use Puppeteer's bundled Chrome
    if (config.puppeteerExecutablePath) {
      launchOptions.executablePath = config.puppeteerExecutablePath;
    }
    browser = await puppeteer.launch(launchOptions);
  }
  return browser;
}

export async function closeBrowser(): Promise<void> {
  if (browser) {
    await browser.close();
    browser = null;
  }
}

// Clean up on process exit
process.on('SIGTERM', closeBrowser);
process.on('SIGINT', closeBrowser);
