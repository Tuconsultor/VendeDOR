import test from 'node:test';
import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => entry.isDirectory() ? files(join(directory, entry.name)) : [join(directory, entry.name)]))).flat();
}
test('los materiales y la interfaz publicados no ofrecen ni usan otras monedas', async () => {
  const paths = [...await files('public/repo'), ...await files('src/components'), 'src/lib/assistant.ts', 'src/lib/workbook.ts', 'README.md'];
  const forbidden = /\b(?:EUR|USD|GBP|CAD|AUD|COP|ARS|CLP|PEN|BRL|UYU|GTQ|CRC|DOP|BOB|PYG|HNL|NIO|VES|CHF|JPY|CNY)\b|[€£¥₹]|\beuros?\b/i;
  for (const path of paths) {
    // The integration guard lists forbidden currencies in order to reject them.
    if (path.endsWith('.mjs')) continue;
    const content = (await readFile(path, 'utf8')).split('\n').filter(line => !line.startsWith('export const hasForeignCurrency =')).join('\n');
    assert.doesNotMatch(content, forbidden, path);
  }
});
