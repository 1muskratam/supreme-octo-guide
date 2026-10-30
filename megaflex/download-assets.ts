import { readFileSync, mkdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
const assets = JSON.parse(readFileSync('design/assets.json', 'utf8'));
mkdirSync('dist/assets', { recursive: true });
for (const asset of assets) {
  const result = spawnSync('curl.exe', ['-f', '-L', '--retry', '2', '--silent', '--show-error', asset.url, '-o', 'dist/assets/' + asset.file], { stdio: 'inherit' });
  if (result.status !== 0) throw new Error('Download failed: ' + asset.file);
}
console.log('Downloaded ' + assets.length + ' Figma assets');
