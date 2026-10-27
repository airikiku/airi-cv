import { readFileSync, writeFileSync, statSync } from 'node:fs';
import { extname } from 'node:path';

const root = new URL('../', import.meta.url);
const read = (name) => readFileSync(new URL(name, root), 'utf8');
const mime = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};

function imageDataUrl(relativePath) {
  const type = mime[extname(relativePath).toLowerCase()];
  if (!type) throw new Error(`Unsupported image: ${relativePath}`);
  const data = readFileSync(new URL(relativePath, root)).toString('base64');
  return `data:${type};base64,${data}`;
}

let html = read('index.html');
html = html.replace('<link rel="stylesheet" href="styles.css">', `<style>\n${read('styles.css')}\n</style>`);
html = html.replace('<script src="app.js" defer></script>', '');
html = html.replace('</body>', `<script>\n${read('app.js')}\n</script>\n</body>`);
html = html.replace(/(src|href)="(assets\/[^"]+|favicon\.svg)"/g, (_, attribute, path) => `${attribute}="${imageDataUrl(path)}"`);

if (/src="assets\//.test(html) || /href="styles\.css"/.test(html) || /src="app\.js"/.test(html)) {
  throw new Error('The download file still has local dependencies.');
}

const output = new URL('Airi-Kiku-CV-download.html', root);
writeFileSync(output, html);
console.log(`${output.pathname} (${(statSync(output).size / 1024 / 1024).toFixed(1)} MB)`);
