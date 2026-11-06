import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(entryPath) : [entryPath];
  });
}

function fileForPathname(pathname) {
  const decoded = decodeURIComponent(pathname);
  if (decoded === '/') return path.join(publicDir, 'index.html');
  if (decoded.endsWith('/')) return path.join(publicDir, decoded.slice(1), 'index.html');
  return path.join(publicDir, decoded.slice(1));
}

function pageUrl(file) {
  const relative = path.relative(publicDir, file).split(path.sep).join('/');
  if (relative === 'index.html') return 'https://webnet.kz/';
  if (relative.endsWith('/index.html')) return `https://webnet.kz/${relative.slice(0, -'index.html'.length)}`;
  return `https://webnet.kz/${relative}`;
}

function isLocalizedRelative(relative) {
  return relative === 'index.html'
    || relative === 'privacy.html'
    || relative === 'contacts/index.html'
    || relative === 'programs/index.html'
    || /^services\/(?:index|[a-z0-9-]+)\.html$/.test(relative)
    || /^marketing\/(?:index|[a-z0-9-]+)\.html$/.test(relative)
    || relative === 'en/index.html'
    || relative === 'en/privacy.html'
    || relative === 'en/contacts/index.html'
    || relative === 'en/programs/index.html'
    || /^en\/(?:services|marketing)\/(?:index|[a-z0-9-]+)\.html$/.test(relative);
}

const htmlFiles = walk(publicDir).filter((file) => file.endsWith('.html'));
const errors = [];
const titles = new Map();
const descriptions = new Map();

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const relative = path.relative(publicDir, file).split(path.sep).join('/');
  const url = pageUrl(file);
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim();
  const description = html.match(/<meta\s+name=["']description["'][^>]*content=["']([^"']*)["']/i)?.[1]?.trim();
  const canonical = html.match(/<link\s+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)?.[1];
  if (!title) errors.push(`${relative}: missing title`);
  if (!description) errors.push(`${relative}: missing description`);
  if (canonical !== url) errors.push(`${relative}: canonical is ${canonical || 'missing'}, expected ${url}`);
  if ((html.match(/<h1\b/gi) || []).length !== 1) errors.push(`${relative}: expected one h1`);
  if (title) {
    if (titles.has(title)) errors.push(`${relative}: duplicate title with ${titles.get(title)}`);
    titles.set(title, relative);
  }
  if (description) {
    if (descriptions.has(description)) errors.push(`${relative}: duplicate description with ${descriptions.get(description)}`);
    descriptions.set(description, relative);
  }

  for (const match of html.matchAll(/<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try { JSON.parse(match[1]); } catch (error) { errors.push(`${relative}: invalid JSON-LD: ${error.message}`); }
  }

  for (const match of html.matchAll(/\b(?:href|src)=["']([^"']+)["']/gi)) {
    const value = match[1];
    if (/^(?:https?:|mailto:|tel:|#|\/\/|data:|javascript:)/i.test(value)) continue;
    const target = new URL(value, url);
    if (target.origin !== 'https://webnet.kz') continue;
    if (!fs.existsSync(fileForPathname(target.pathname))) errors.push(`${relative}: broken internal reference ${value}`);
  }

  if (isLocalizedRelative(relative)) {
    if ((html.match(/rel=["']alternate["'][^>]*hreflang=/gi) || []).length !== 3) errors.push(`${relative}: incomplete hreflang set`);
    if (!/class=["'][^"']*\blang-switch\b/i.test(html)) errors.push(`${relative}: missing language switcher`);
  }

  if (relative.startsWith('en/')) {
    if (!/<html\b[^>]*lang=["']en["']/i.test(html)) errors.push(`${relative}: html lang is not en`);
    const withoutCode = html.replace(/<(script|style|svg)\b[\s\S]*?<\/\1>/gi, '');
    const visibleText = [...withoutCode.matchAll(/>([^<]+)</g)].map((match) => match[1]).join(' ');
    if (/[А-Яа-яЁё]/.test(visibleText)) errors.push(`${relative}: Russian text remains in visible content`);
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  const english = htmlFiles.filter((file) => path.relative(publicDir, file).startsWith(`en${path.sep}`)).length;
  console.log(`Validation passed: ${htmlFiles.length} pages, ${english} English pages, no broken internal links, valid JSON-LD.`);
}
