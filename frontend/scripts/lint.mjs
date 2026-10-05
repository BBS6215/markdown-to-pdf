import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { delimiter, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectDir = fileURLToPath(new URL('../', import.meta.url));
const require = createRequire(new URL('../package.json', import.meta.url));
const eslintBin = join(dirname(require.resolve('eslint/package.json')), 'bin/eslint.js');
const nextDependencies = dirname(dirname(require.resolve('eslint-config-next')));

// Next 15's legacy presets resolve plugins and their Babel parser through CJS.
// Resolve from the project and the preset's own declared dependency graph,
// without relying on pnpm hoisting or an ambient NODE_PATH. Rules stay unchanged.
const args = process.argv.slice(2);
const eslintArgs = args.includes('--print-config') ? args : ['.', ...args];
const result = spawnSync(process.execPath, [eslintBin, ...eslintArgs], {
  cwd: projectDir,
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_PATH: [join(projectDir, 'node_modules'), nextDependencies].join(delimiter),
  },
});
if (result.error) console.error('Unable to start ESLint:', result.error.message);
process.exitCode = result.status ?? 1;
