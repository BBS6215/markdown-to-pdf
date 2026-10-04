import type { NextConfig } from 'next';
import { createRequire } from 'node:module';
import { relative, resolve } from 'node:path';

// This package's browser entry creates a DOM element. Workers need its
// equivalent table-based default entry. Pin the same entry in both bundlers.
const decoderPath = createRequire(resolve(process.cwd(), 'package.json')).resolve(
  'decode-named-character-reference', { paths: [process.cwd(), resolve(process.cwd(), 'frontend')] },
);
const workspaceRoot = resolve(process.cwd(), '..');

const nextConfig: NextConfig = {
  // Strict mode for catching potential issues early
  reactStrictMode: true,
  // Required for global 404s with multiple/dynamic root layouts in Next 15.
  experimental: { globalNotFound: true },
  turbopack: {
    root: workspaceRoot,
    resolveAlias: { 'decode-named-character-reference': './' + relative(process.cwd(), decoderPath).replace(/\\/g, '/') },
  },
  webpack(config) {
    config.resolve.alias = { ...config.resolve.alias, 'decode-named-character-reference$': decoderPath };
    return config;
  },
};

export default nextConfig;
