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

function imageDataUrl(path) {
  const type = mime[extname(path).toLowerCase()];
  if (!type) throw new Error(`Unsupported image: ${path}`);
  return `data:${type};base64,${readFileSync(new URL(path, root)).toString('base64')}`;
}

const englishHtml = read('en.html');
const englishBase64 = Buffer.from(englishHtml, 'utf8').toString('base64');
const englishDiagram = imageDataUrl('assets/market-connections-en.svg');

const bilingualScript = `
(() => {
  const englishHtml = new TextDecoder().decode(Uint8Array.from(atob('${englishBase64}'), character => character.charCodeAt(0)));
  const englishDocument = new DOMParser().parseFromString(englishHtml, 'text/html');
  const rootSelectors = ['header.site-header', 'main#main-content', 'footer.footer'];
  const japaneseRoots = rootSelectors.map(selector => document.querySelector(selector).cloneNode(true));
  const japaneseTitle = document.title;
  const japaneseDescription = document.querySelector('meta[name="description"]').content;
  const japaneseDiagram = document.querySelector('.hero-connections img').src;
  const englishDiagram = '${englishDiagram}';

  function translateNode(current, translation) {
    if (!translation || current.nodeType !== translation.nodeType) throw new Error('Language templates do not match');
    if (current.nodeType === Node.TEXT_NODE) {
      current.nodeValue = translation.nodeValue;
      return;
    }
    if (current.nodeType !== Node.ELEMENT_NODE) return;
    for (const name of ['alt', 'aria-label', 'data-gallery-alt']) {
      if (translation.hasAttribute(name)) current.setAttribute(name, translation.getAttribute(name));
    }
    const currentChildren = [...current.childNodes];
    const translatedChildren = [...translation.childNodes];
    if (currentChildren.length !== translatedChildren.length) throw new Error('Language templates have different structures');
    currentChildren.forEach((child, index) => translateNode(child, translatedChildren[index]));
  }

  function setLanguage(language) {
    const english = language === 'en';
    const templates = english ? rootSelectors.map(selector => englishDocument.querySelector(selector)) : japaneseRoots;
    rootSelectors.forEach((selector, index) => translateNode(document.querySelector(selector), templates[index]));
    document.documentElement.lang = language;
    document.title = english ? englishDocument.title : japaneseTitle;
    document.querySelector('meta[name="description"]').content = english
      ? englishDocument.querySelector('meta[name="description"]').content
      : japaneseDescription;
    document.querySelector('.hero-connections img').src = english ? englishDiagram : japaneseDiagram;
    document.querySelectorAll('.language-switch a').forEach(link => {
      if (link.lang === language) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    closeMenu();
  }

  document.querySelectorAll('.language-switch a').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      if (link.lang !== document.documentElement.lang) setLanguage(link.lang);
    });
  });
})();
`;

let html = read('index.html');
html = html.replace('<html lang="ja">', '<html lang="ja" data-standalone-bilingual>');
html = html.replace('<link rel="stylesheet" href="styles.css">', `<style>\n${read('styles.css')}\n</style>`);
html = html.replace('<script src="app.js" defer></script>', '');
html = html.replace(/(src|href|data-gallery-image)="(assets\/[^\"]+|favicon\.svg)"/g,
  (_, attribute, path) => `${attribute}="${imageDataUrl(path)}"`);
html = html.replace(/href="(?:index|en)\.html"/g, 'href="#"');
html = html.replace('</body>', `<script>\n${read('app.js')}\n</script>\n<script>\n${bilingualScript}\n</script>\n</body>`);

if (/(?:src|href|data-gallery-image)="assets\//.test(html) || /(?:styles\.css|app\.js|href="en\.html")/.test(html)) {
  throw new Error('Standalone HTML still contains a local dependency');
}

const output = new URL('JP-ENv1.html', root);
writeFileSync(output, html);
console.log(`Created ${output.pathname} (${(statSync(output).size / 1024 / 1024).toFixed(1)} MB)`);
