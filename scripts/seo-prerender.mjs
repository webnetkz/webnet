import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');
const origin = 'https://webnet.kz';
const socialProfiles = [
  'https://t.me/WebNetKZ',
  'https://www.instagram.com/webnetkz/',
  'https://www.tiktok.com/tiktokstudio',
  'https://www.youtube.com/@WebNetKZ',
  'https://www.threads.com/@webnetkz'
];

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(entryPath) : [entryPath];
  });
}

function extractArray(source, pattern, label) {
  const match = source.match(pattern);
  if (!match) throw new Error(`Не найден массив данных: ${label}`);
  return vm.runInNewContext(`(${match[1]})`);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function escapedData(value, key = '') {
  if (Array.isArray(value)) return value.map((item) => escapedData(item));
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([childKey, childValue]) => [
      childKey,
      escapedData(childValue, childKey)
    ]));
  }
  if (typeof value !== 'string' || key === 'slug' || key === 'category') return value;
  return escapeHtml(value);
}

function getCanonical(file) {
  const relative = path.relative(publicDir, file).split(path.sep).join('/');
  if (relative === 'index.html') return `${origin}/`;
  if (relative.endsWith('/index.html')) return `${origin}/${relative.slice(0, -'index.html'.length)}`;
  return `${origin}/${relative}`;
}

function normalizeInternalAnchors(html, pageUrl) {
  return html.replace(/<a\b[^>]*>/gi, (tag) => tag.replace(/(\bhref=["'])([^"']+)(["'])/i, (match, prefix, href, suffix) => {
    if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(href)) return match;
    const target = new URL(href, pageUrl);
    if (target.origin !== origin) return match;
    if (target.pathname.endsWith('/index.html')) {
      target.pathname = target.pathname === '/index.html' ? '/' : target.pathname.slice(0, -'index.html'.length);
    }
    return `${prefix}${target.pathname}${target.search}${target.hash}${suffix}`;
  }));
}

function textFromTitle(html) {
  return html
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();
}

function replaceElement(html, attribute, content) {
  const pattern = new RegExp(`(<[a-z][a-z0-9]*\\b[^>]*\\b${attribute}\\b[^>]*>)[\\s\\S]*?(<\\/[a-z][a-z0-9]*>)`, 'gi');
  return html.replace(pattern, (_, opening, closing) => `${opening}${content}${closing}`);
}

function replaceGridContent(html, attribute, markerName, cards) {
  const startMarker = `<!-- seo-static-${markerName}:start -->`;
  const endMarker = `<!-- seo-static-${markerName}:end -->`;
  const existingStart = html.indexOf(startMarker);
  const existingEnd = html.indexOf(endMarker, existingStart + startMarker.length);
  const managedContent = `${startMarker}\n${cards}\n          ${endMarker}`;

  if (existingStart >= 0 && existingEnd >= 0) {
    return `${html.slice(0, existingStart)}${managedContent}${html.slice(existingEnd + endMarker.length)}`;
  }

  const openPattern = new RegExp(`<div\\b(?=[^>]*\\b${attribute}\\b)[^>]*>`, 'i');
  const opening = openPattern.exec(html);
  if (!opening) return html;
  const contentStart = opening.index + opening[0].length;
  const divToken = /<\/?div\b[^>]*>/gi;
  divToken.lastIndex = contentStart;
  let depth = 1;
  let closing;
  let token;
  while ((token = divToken.exec(html))) {
    if (token[0].startsWith('</')) depth -= 1;
    else if (!token[0].endsWith('/>')) depth += 1;
    if (depth === 0) {
      closing = token;
      break;
    }
  }
  if (!closing) throw new Error(`Не найден закрывающий div для ${attribute}`);
  return `${html.slice(0, contentStart)}\n          ${managedContent}\n        ${html.slice(closing.index)}`;
}

function serviceCard(service, index, hrefPrefix) {
  return `<a class="service-card reveal" href="${hrefPrefix}${service.slug}.html" data-category="${service.category}">
      <div class="service-number"><span>${String(index + 1).padStart(2, '0')}</span><span class="service-icon" aria-hidden="true">${service.icon}</span></div>
      <h3>${service.title}</h3>
      <p>${service.short}</p>
      <span class="service-link">Подробнее об услуге</span>
    </a>`;
}

function marketingCard(item) {
  const categories = {
    strategy: 'Стратегия и бренд', traffic: 'Трафик', social: 'Соцсети',
    content: 'Контент', retention: 'Удержание', reputation: 'Репутация и PR',
    commerce: 'Продажи', analytics: 'Аналитика'
  };
  return `<a class="service-card marketing-card reveal" href="${item.slug}.html" data-marketing-category="${item.category}">
      <div class="service-number"><span>${item.number}</span><span class="service-icon" aria-hidden="true">${item.icon}</span></div>
      <p class="marketing-card-category">${categories[item.category]}</p>
      <h3>${item.title}</h3>
      <p>${item.short}</p>
      <span class="service-link">Подробнее</span>
    </a>`;
}

function renderServiceBody(layout, service, services) {
  let body = '';
  const document = {
    body: {
      dataset: { service: service.slug },
      set innerHTML(value) { body = value; }
    }
  };
  vm.runInNewContext(layout, { document });
  body = replaceElement(body, 'data-service-kicker', service.kicker);
  body = replaceElement(body, 'data-service-title', service.title);
  body = replaceElement(body, 'data-service-lead', service.lead);
  body = replaceElement(body, 'data-service-description', service.description);

  const tags = service.tags.map((tag) => `<span class="tag">${tag}</span>`).join('');
  body = body.replace('<div class="tag-list" data-service-tags></div>', `<div class="tag-list">${tags}</div>`);
  const solutions = service.solutions.map(([title, text], index) => `
    <article class="solution-item reveal"><span>${String(index + 1).padStart(2, '0')}</span><div><h3>${title}</h3><p>${text}</p></div></article>`).join('');
  body = body.replace('<div class="solution-list" data-service-solutions></div>', `<div class="solution-list">${solutions}</div>`);
  const deliverables = service.deliverables.map(([title, text]) => `
    <article class="deliverable reveal"><h3>${title}</h3><p>${text}</p></article>`).join('');
  body = body.replace('<div class="deliverables" data-service-deliverables></div>', `<div class="deliverables">${deliverables}</div>`);
  const related = services
    .filter((item) => item.slug !== service.slug)
    .sort((a, b) => Number(b.category === service.category) - Number(a.category === service.category))
    .slice(0, 3)
    .map((item, index) => serviceCard(item, index, ''))
    .join('');
  body = body.replace('<div class="next-services" data-related-services></div>', `<div class="next-services">${related}</div>`);
  return body;
}

function renderMarketingBody(layout, item, marketingDirections) {
  let body = '';
  const document = {
    body: {
      dataset: { marketing: item.slug },
      set innerHTML(value) { body = value; }
    }
  };
  const window = { marketingDirections };
  vm.runInNewContext(layout, { document, window });
  return body;
}

function breadcrumbItems(url, title) {
  const pathname = new URL(url).pathname;
  if (pathname === '/') return [{ name: 'Главная', item: `${origin}/` }];
  const segments = pathname.split('/').filter(Boolean);
  const items = [{ name: 'Главная', item: `${origin}/` }];
  if (segments[0] === 'services') items.push({ name: 'Услуги', item: `${origin}/services/` });
  if (segments[0] === 'marketing') items.push({ name: 'Маркетинг', item: `${origin}/marketing/` });
  if (segments[0] === 'programs') items.push({ name: 'Программы для бизнеса', item: `${origin}/programs/` });
  if (segments[0] === 'contacts') items.push({ name: 'Контакты', item: `${origin}/contacts/` });
  const isIndex = pathname.endsWith('/');
  const isRootPolicy = segments.length === 1 && segments[0] === 'privacy.html';
  if (!isIndex && !isRootPolicy) {
    items.push({ name: title.replace(/\s+[—-]\s+WebNet$/i, ''), item: url });
  } else if (isRootPolicy) {
    items.push({ name: title.replace(/\s+[—-]\s+WebNet$/i, ''), item: url });
  }
  return items;
}

function addSeoMetadata(html, canonical) {
  const headMatch = html.match(/<head>([\s\S]*?)<\/head>/i);
  if (!headMatch) throw new Error(`Не найден <head> в HTML`);
  let head = headMatch[1];
  const title = textFromTitle((head.match(/<title>([\s\S]*?)<\/title>/i) || [])[1] || 'WebNet');
  const descriptionTag = (head.match(/<meta\s+name=["']description["'][^>]*>/i) || [])[0];
  if (!descriptionTag) throw new Error(`Нет meta description в странице ${canonical}`);
  const descriptionValue = (descriptionTag.match(/content=["']([^"']*)["']/i) || [])[1] || '';
  const description = textFromTitle(descriptionValue);
  const lang = (html.match(/<html\b[^>]*\blang=["']([^"']+)["']/i) || [])[1] || 'ru';
  const locale = lang.toLowerCase().startsWith('en') ? 'en_US' : 'ru_KZ';
  const cleanCanonical = escapeHtml(canonical);
  const cleanTitle = escapeHtml(title);
  const cleanDescription = escapeHtml(description);
  const managed = [
    '<meta name="robots" content="index,follow,max-image-preview:large">',
    `<link rel="canonical" href="${cleanCanonical}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="WebNet">`,
    `<meta property="og:locale" content="${locale}">`,
    `<meta property="og:url" content="${cleanCanonical}">`,
    `<meta property="og:title" content="${cleanTitle}">`,
    `<meta property="og:description" content="${cleanDescription}">`,
    `<meta property="og:image" content="${origin}/assets/logo.png">`,
    '<meta property="og:image:alt" content="Логотип WebNet">',
    '<meta name="twitter:card" content="summary">',
    `<meta name="twitter:title" content="${cleanTitle}">`,
    `<meta name="twitter:description" content="${cleanDescription}">`,
    `<meta name="twitter:image" content="${origin}/assets/logo.png">`
  ].join('\n  ');

  head = head.replace(/\s*<meta\s+name=["']robots["'][^>]*>/gi, '');
  head = head.replace(/\s*<link\s+rel=["']canonical["'][^>]*>/gi, '');
  head = head.replace(/\s*<meta\s+property=["']og:[^"']+["'][^>]*>/gi, '');
  head = head.replace(/\s*<meta\s+name=["']twitter:[^"']+["'][^>]*>/gi, '');
  head = head.replace(/\s*<script\s+type=["']application\/ld\+json["']\s+data-seo-structured[^>]*>[\s\S]*?<\/script>/gi, '');

  const url = canonical;
  const graph = [];
  if (url === `${origin}/`) {
    graph.push({
      '@type': 'Organization',
      '@id': `${origin}/#organization`,
      name: 'WebNet',
      url: `${origin}/`,
      logo: `${origin}/assets/logo.png`,
      telephone: '+77078453424',
      areaServed: { '@type': 'Country', name: 'Kazakhstan' },
      sameAs: socialProfiles
    });
    graph.push({
      '@type': 'WebSite',
      '@id': `${origin}/#website`,
      url: `${origin}/`,
      name: 'WebNet',
      inLanguage: lang,
      publisher: { '@id': `${origin}/#organization` }
    });
  }
  graph.push({
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: lang,
    isPartOf: { '@id': `${origin}/#website` },
    publisher: { '@id': `${origin}/#organization` }
  });
  const crumbs = breadcrumbItems(url, title);
  if (crumbs.length > 1) {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.item
      }))
    });
  }
  const structuredData = `<script type="application/ld+json" data-seo-structured>${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}</script>`;
  const insertion = `\n  ${managed}\n  ${structuredData}`;
  head = head.replace(descriptionTag, `${descriptionTag}${insertion}`);
  return html.replace(headMatch[0], `<head>${head}</head>`);
}

const siteSource = fs.readFileSync(path.join(publicDir, 'assets/site.js'), 'utf8');
const marketingSource = fs.readFileSync(path.join(publicDir, 'assets/marketing-data.js'), 'utf8');
const services = extractArray(siteSource, /const services\s*=\s*(\[[\s\S]*?\n\]);/, 'services');
const marketingDirections = extractArray(marketingSource, /window\.marketingDirections\s*=\s*(\[[\s\S]*?\n\]);/, 'marketing');
const safeServices = services.map((service) => escapedData(service));
const safeMarketingDirections = marketingDirections.map((item) => escapedData(item));
const serviceLayout = fs.readFileSync(path.join(publicDir, 'assets/service-layout.js'), 'utf8');
const marketingLayout = fs.readFileSync(path.join(publicDir, 'assets/marketing-layout.js'), 'utf8');
const htmlFiles = walk(publicDir).filter((file) => file.endsWith('.html'));

for (const file of htmlFiles) {
  let html = fs.readFileSync(file, 'utf8');
  const canonical = getCanonical(file);
  const relative = path.relative(publicDir, file).split(path.sep).join('/');

  if (relative === 'index.html' || relative === 'services/index.html') {
    const hrefPrefix = relative === 'index.html' ? 'services/' : '';
    const limit = relative === 'index.html' ? 6 : safeServices.length;
    const cards = safeServices.slice(0, limit).map((service, index) => serviceCard(service, index, hrefPrefix)).join('\n');
    html = replaceGridContent(html, 'data-services-grid', 'services', cards);
  }

  if (relative === 'marketing/index.html') {
    const cards = safeMarketingDirections.map(marketingCard).join('\n');
    html = replaceGridContent(html, 'data-marketing-grid', 'marketing', cards);
  }

  const serviceSlug = html.match(/<body\b[^>]*data-service=["']([^"']+)["']/i)?.[1];
  if (serviceSlug) {
    const service = safeServices.find((item) => item.slug === serviceSlug);
    if (!service) throw new Error(`Нет данных для услуги ${serviceSlug}`);
    const body = renderServiceBody(serviceLayout, service, safeServices);
    html = html.replace(/<body\b([^>]*)>[\s\S]*?<\/body>/i, `<body$1>\n${body}\n</body>`);
    html = html.replace(/\s*<script\s+src=["'][^"']*service-layout\.js[^"']*["']\s+defer><\/script>/i, '');
  }

  const marketingSlug = html.match(/<body\b[^>]*data-marketing=["']([^"']+)["']/i)?.[1];
  if (marketingSlug) {
    const item = safeMarketingDirections.find((entry) => entry.slug === marketingSlug);
    if (!item) throw new Error(`Нет данных для маркетингового направления ${marketingSlug}`);
    const body = renderMarketingBody(marketingLayout, item, safeMarketingDirections);
    html = html.replace(/<body\b([^>]*)>[\s\S]*?<\/body>/i, `<body$1>\n${body}\n</body>`);
    html = html.replace(/\s*<script\s+src=["'][^"']*marketing-data\.js[^"']*["']\s+defer><\/script>/i, '');
    html = html.replace(/\s*<script\s+src=["'][^"']*marketing-layout\.js[^"']*"\s+defer><\/script>/i, '');
  }

  html = html.replace(/((?:\.\.\/)*assets\/site\.js\?v=)[^"']+/g, (_, prefix) => `${prefix}20261020-seo`);
  html = html.replace(/((?:\.\.\/)*assets\/marketing-catalog\.js\?v=)[^"']+/g, (_, prefix) => `${prefix}20261020-seo`);
  html = normalizeInternalAnchors(html, canonical);
  html = addSeoMetadata(html, canonical);
  fs.writeFileSync(file, html);
}

const sitemapUrls = htmlFiles.map(getCanonical).sort();
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls.map((url) => `  <url><loc>${url}</loc></url>`).join('\n')}\n</urlset>\n`;
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(publicDir, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${origin}/sitemap.xml\n`);

console.log(`SEO: обработано ${htmlFiles.length} HTML-страниц, создан sitemap на ${sitemapUrls.length} URL.`);
