import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { delimiter, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectDir = fileURLToPath(new URL('../', import.meta.url));
const require = createRequire(new URL('../package.json', import.meta.url));
const nextPackage = require.resolve('next/package.json');
const nextRequire = createRequire(nextPackage);
const { loadEnvConfig } = nextRequire('@next/env');

// Match Next build's production dotenv precedence before checking public vars.
process.env.NODE_ENV ??= 'production';
loadEnvConfig(projectDir, false);
const required = ['NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY'];
const missing = required.filter(name => !process.env[name]?.trim());

if (missing.length) {
  console.error('Missing build-time environment variables: ' + missing.join(', '));
  console.error('Configure frontend/.env.local or inject both variables into CI before pnpm build.');
  console.error('See docs/DEPLOY.md section C. Offline build placeholders do not validate authentication.');
  process.exitCode = 1;
} else {
  const nextBin = join(dirname(nextPackage), 'dist/bin/next');
  // Next build also invokes ESLint programmatically. Give that embedded check
  // the same explicit dependency paths as the standalone lint entrypoint.
  const nodePath = [
    join(projectDir, 'node_modules'),
    dirname(dirname(require.resolve('eslint-config-next'))),
  ].join(delimiter);
  const result = spawnSync(process.execPath, [nextBin, 'build', ...process.argv.slice(2)], {
    cwd: projectDir,
    stdio: 'inherit',
    env: { ...process.env, NODE_PATH: nodePath },
  });
  if (result.error) console.error('Unable to start Next build:', result.error.message);
  process.exitCode = result.status ?? 1;
}
