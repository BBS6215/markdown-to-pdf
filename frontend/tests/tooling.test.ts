import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { describe, it, expect } from 'vitest';

const projectDir = fileURLToPath(new URL('../', import.meta.url));
const lintScript = fileURLToPath(new URL('../scripts/lint.mjs', import.meta.url));
const buildScript = fileURLToPath(new URL('../scripts/build.mjs', import.meta.url));

describe('project quality command entrypoints', () => {
  it('checks Hooks rules with no ambient NODE_PATH, instead of only loading plugins', () => {
    const result = spawnSync(process.execPath, [
      lintScript, '--stdin', '--stdin-filename', 'components/lint-probe.tsx', '--format', 'json',
    ], {
      cwd: projectDir,
      encoding: 'utf8',
      env: { ...process.env, NODE_PATH: '' },
      input: "import { useEffect } from 'react'; export function Probe({ flag }: { flag: boolean }) { if (flag) useEffect(() => {}, []); return null; }",
    });
    expect(result.status, result.stderr).toBe(1);
    const report = JSON.parse(result.stdout) as Array<{ messages: Array<{ ruleId: string }> }>;
    expect(report.flatMap(file => file.messages).some(message => message.ruleId === 'react-hooks/rules-of-hooks')).toBe(true);
  }, 15000);

  it('fails before compilation when either build-time variable is missing without printing key values', () => {
    const marker = 'offline-test-value-not-for-logging';
    const result = spawnSync(process.execPath, [buildScript], {
      cwd: projectDir,
      encoding: 'utf8',
      env: {
        ...process.env,
        NODE_ENV: 'production',
        NEXT_PUBLIC_SUPABASE_URL: '',
        NEXT_PUBLIC_SUPABASE_ANON_KEY: marker,
      },
    });
    expect(result.status).toBe(1);
    expect(result.stderr).toContain('NEXT_PUBLIC_SUPABASE_URL');
    expect(result.stderr).toContain('frontend/.env.local');
    expect(result.stderr).not.toContain(marker);
    expect(result.stdout).not.toContain('Creating an optimized production build');
  });
});
