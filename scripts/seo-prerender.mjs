import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import {
  englishPageSeoOverrides,
  faqByPath,
  marketingSeoTitles,
  pageSeoOverrides,
  serviceSeoTitles
} from './seo-content.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');
const origin = 'https://webnet.kz';
const socialProfiles = [
  'https://t.me/WebNetKZ',
  'https://www.facebook.com/webnetkz/',
  'https://www.instagram.com/webnetkz/',
  'https://www.tiktok.com/@webnetkz',
  'https://www.youtube.com/@WebNetKZ',
  'https://www.threads.com/@webnetkz',
  'https://x.com/webnetkz'
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

function isLocalizedPathname(pathname) {
  return pathname === '/'
    || pathname === '/privacy.html'
    || pathname === '/contacts/'
    || pathname === '/programs/'
    || pathname === '/services/'
    || pathname === '/marketing/'
    || /^\/(?:services|marketing)\/[a-z0-9-]+\.html$/.test(pathname)
    || pathname === '/en/'
    || pathname === '/en/privacy.html'
    || pathname === '/en/contacts/'
    || pathname === '/en/programs/'
    || pathname === '/en/services/'
    || pathname === '/en/marketing/'
    || /^\/en\/(?:services|marketing)\/[a-z0-9-]+\.html$/.test(pathname);
}

function languageAlternates(canonical) {
  const url = new URL(canonical);
  if (!isLocalizedPathname(url.pathname)) return null;
  const english = url.pathname === '/en/' || url.pathname.startsWith('/en/');
  const basePath = english ? url.pathname.slice(3) || '/' : url.pathname;
  return {
    ru: `${origin}${basePath}`,
    en: `${origin}/en${basePath}`,
    default: `${origin}${basePath}`
  };
}

function addLanguageSwitcher(html, canonical) {
  const alternates = languageAlternates(canonical);
  if (!alternates) return html;
  const english = new URL(canonical).pathname.startsWith('/en/');
  let result = html.replace(/\s*<a\b[^>]*class=["'][^"']*\blang-switch\b[^"']*["'][^>]*>[\s\S]*?<\/a>/gi, '');
  const switcher = english
    ? `<a class="lang-switch" href="${alternates.ru}" hreflang="ru" lang="ru" aria-label="Русская версия">RU</a>`
    : `<a class="lang-switch" href="${alternates.en}" hreflang="en" lang="en" aria-label="English version">EN</a>`;
  return result.replace(/(<a\b[^>]*class=["'][^"']*\bnav-phone\b)/i, `${switcher}$1`);
}

function extractFaqFromHtml(html) {
  const faq = [];
  const pattern = /<button\b[^>]*class=["'][^"']*\bfaq-question\b[^"']*["'][^>]*>([\s\S]*?)<\/button>[\s\S]*?<div\b[^>]*class=["'][^"']*\bfaq-answer\b[^"']*["'][^>]*>[\s\S]*?<p>([\s\S]*?)<\/p>/gi;
  let match;
  while ((match = pattern.exec(html))) {
    const clean = (value) => textFromTitle(value.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
    faq.push([clean(match[1]), clean(match[2])]);
  }
  return faq.length ? faq : null;
}

function getLastModified(file) {
  try {
    return execFileSync('git', ['log', '-1', '--format=%cs', '--', path.relative(root, file)], {
      cwd: root,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore']
    }).trim() || null;
  } catch {
    return null;
  }
}

function applySeoOverride(html, override = {}) {
  let result = html;
  if (override.title) {
    result = result.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(override.title)}</title>`);
  }
  if (override.description) {
    result = result.replace(
      /<meta\s+name=["']description["'][^>]*>/i,
      `<meta name="description" content="${escapeHtml(override.description)}">`
    );
  }
  return result;
}

function renderFaqSection(faq) {
  const items = faq.map(([question, answer]) => `
          <div class="faq-item"><button class="faq-question" type="button" aria-expanded="false">${escapeHtml(question)}</button><div class="faq-answer"><p>${escapeHtml(answer)}</p></div></div>`).join('');
  return `<!-- seo-static-faq:start -->
    <section class="section seo-faq-section" aria-labelledby="seo-faq-title">
      <div class="container">
        <div class="section-head">
          <div><p class="eyebrow">Частые вопросы</p><h2 id="seo-faq-title">Что важно знать до старта</h2></div>
          <p>Ответы на вопросы, которые помогают определить формат первого этапа и подготовиться к обсуждению задачи.</p>
        </div>
        <div class="faq-list">${items}
        </div>
      </div>
    </section>
    <!-- seo-static-faq:end -->`;
}

function addManagedFaq(html, faq) {
  const startMarker = '<!-- seo-static-faq:start -->';
  const endMarker = '<!-- seo-static-faq:end -->';
  const start = html.indexOf(startMarker);
  const end = html.indexOf(endMarker, start + startMarker.length);
  if (!faq?.length) {
    if (start >= 0 && end >= 0) return `${html.slice(0, start)}${html.slice(end + endMarker.length)}`;
    return html;
  }
  const section = renderFaqSection(faq);
  if (start >= 0 && end >= 0) {
    return `${html.slice(0, start)}${section}${html.slice(end + endMarker.length)}`;
  }
  return html.replace(/<section class="section-compact">/i, `${section}\n    <section class="section-compact">`);
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
  const english = pathname === '/en/' || pathname.startsWith('/en/');
  if (pathname === '/' || pathname === '/en/') return [{ name: english ? 'Home' : 'Главная', item: `${origin}${english ? '/en/' : '/'}` }];
  const segments = pathname.split('/').filter(Boolean);
  const sectionIndex = english ? 1 : 0;
  const prefix = english ? '/en' : '';
  const items = [{ name: english ? 'Home' : 'Главная', item: `${origin}${prefix}/` }];
  if (segments[sectionIndex] === 'services') items.push({ name: english ? 'Services' : 'Услуги', item: `${origin}${prefix}/services/` });
  if (segments[sectionIndex] === 'marketing') items.push({ name: 'Marketing', item: `${origin}${prefix}/marketing/` });
  if (segments[sectionIndex] === 'programs') items.push({ name: english ? 'Business software' : 'Программы для бизнеса', item: `${origin}${prefix}/programs/` });
  if (segments[sectionIndex] === 'contacts') items.push({ name: english ? 'Contacts' : 'Контакты', item: `${origin}${prefix}/contacts/` });
  const isIndex = pathname.endsWith('/');
  const isRootPolicy = segments.length === (english ? 2 : 1) && segments[sectionIndex] === 'privacy.html';
  if (!isIndex && !isRootPolicy) {
    items.push({ name: title.replace(/\s+(?:[—-]|\|)\s+WebNet$/i, ''), item: url });
  } else if (isRootPolicy) {
    items.push({ name: title.replace(/\s+(?:[—-]|\|)\s+WebNet$/i, ''), item: url });
  }
  return items;
}

function addSeoMetadata(html, canonical, context = {}) {
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
  const english = locale === 'en_US';
  const alternates = languageAlternates(canonical);
  const cleanCanonical = escapeHtml(canonical);
  const cleanTitle = escapeHtml(title);
  const cleanDescription = escapeHtml(description);
  const managed = [
    '<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">',
    `<link rel="canonical" href="${cleanCanonical}">`,
    ...(alternates ? [
      `<link rel="alternate" hreflang="ru" href="${escapeHtml(alternates.ru)}">`,
      `<link rel="alternate" hreflang="en" href="${escapeHtml(alternates.en)}">`,
      `<link rel="alternate" hreflang="x-default" href="${escapeHtml(alternates.default)}">`
    ] : []),
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="WebNet">`,
    `<meta property="og:locale" content="${locale}">`,
    `<meta property="og:locale:alternate" content="${english ? 'ru_KZ' : 'en_US'}">`,
    `<meta property="og:url" content="${cleanCanonical}">`,
    `<meta property="og:title" content="${cleanTitle}">`,
    `<meta property="og:description" content="${cleanDescription}">`,
    `<meta property="og:image" content="${origin}/assets/logo.png">`,
    `<meta property="og:image:alt" content="${english ? 'WebNet logo' : 'Логотип WebNet'}">`,
    '<meta name="twitter:card" content="summary">',
    `<meta name="twitter:title" content="${cleanTitle}">`,
    `<meta name="twitter:description" content="${cleanDescription}">`,
    `<meta name="twitter:image" content="${origin}/assets/logo.png">`
  ].join('\n  ');

  head = head.replace(/\s*<meta\s+name=["']robots["'][^>]*>/gi, '');
  head = head.replace(/\s*<link\s+rel=["']canonical["'][^>]*>/gi, '');
  head = head.replace(/\s*<link\s+rel=["']alternate["'][^>]*hreflang=["'][^"']+["'][^>]*>/gi, '');
  head = head.replace(/\s*<meta\s+property=["']og:[^"']+["'][^>]*>/gi, '');
  head = head.replace(/\s*<meta\s+name=["']twitter:[^"']+["'][^>]*>/gi, '');
  head = head.replace(/\s*<script\s+type=["']application\/ld\+json["']\s+data-seo-structured[^>]*>[\s\S]*?<\/script>/gi, '');

  const url = canonical;
  const pathname = new URL(url).pathname;
  const graph = [{
    '@type': 'Organization',
    '@id': `${origin}/#organization`,
    name: 'WebNet',
    alternateName: 'webnet.kz',
    url: `${origin}/`,
    logo: `${origin}/assets/logo.png`,
    foundingDate: '2018',
    telephone: '+77078453424',
    areaServed: { '@type': 'Country', name: 'Kazakhstan' },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+77078453424',
      contactType: 'sales',
      availableLanguage: ['ru', 'en']
    },
    sameAs: socialProfiles
  }, {
    '@type': 'WebSite',
    '@id': `${origin}/#website`,
    url: `${origin}/`,
    name: 'WebNet',
    alternateName: 'webnet.kz',
    inLanguage: ['ru', 'en'],
    publisher: { '@id': `${origin}/#organization` }
  }];
  const pageType = ['/contacts/', '/en/contacts/'].includes(pathname)
    ? 'ContactPage'
    : ['/services/', '/marketing/', '/programs/', '/en/services/', '/en/marketing/', '/en/programs/'].includes(pathname)
      ? 'CollectionPage'
      : 'WebPage';
  const webPage = {
    '@type': pageType,
    '@id': `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: lang,
    isPartOf: { '@id': `${origin}/#website` },
    publisher: { '@id': `${origin}/#organization` }
  };

  const detail = context.service || context.marketingItem;
  if (detail) {
    const serviceId = `${url}#service`;
    webPage.mainEntity = { '@id': serviceId };
    graph.push({
      '@type': 'Service',
      '@id': serviceId,
      name: detail.title,
      serviceType: detail.title,
      url,
      description,
      provider: { '@id': `${origin}/#organization` },
      areaServed: { '@type': 'Country', name: 'Kazakhstan' },
      audience: { '@type': 'BusinessAudience', audienceType: english ? 'Business' : 'Бизнес' }
    });
  }

  if (context.catalogItems?.length) {
    const itemListId = `${url}#item-list`;
    webPage.mainEntity = { '@id': itemListId };
    graph.push({
      '@type': 'ItemList',
      '@id': itemListId,
      name: title,
      itemListElement: context.catalogItems.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.title,
        url: `${origin}${english ? '/en' : ''}/${context.catalogSection}/${item.slug}.html`
      }))
    });
  }

  if (context.faq?.length) {
    const faqId = `${url}#faq`;
    webPage.hasPart = { '@id': faqId };
    graph.push({
      '@type': 'FAQPage',
      '@id': faqId,
      mainEntity: context.faq.map(([question, answer]) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer }
      }))
    });
  }

  graph.push(webPage);
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

function pageHeading(html) {
  return textFromTitle((html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || '').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
}

function translatedCatalogItems(html, items) {
  const titles = [...html.matchAll(/<a\b[^>]*class=["'][^"']*\bservice-card\b[^"']*["'][^>]*>[\s\S]*?<h3>([\s\S]*?)<\/h3>/gi)]
    .map((match) => textFromTitle(match[1].replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim());
  return items.map((item, index) => ({ ...item, title: titles[index] || item.title }));
}

function processHtmlFile(file, english = false) {
  let html = fs.readFileSync(file, 'utf8');
  const canonical = getCanonical(file);
  const pathname = new URL(canonical).pathname;
  const relative = path.relative(publicDir, file).split(path.sep).join('/');
  let service = null;
  let marketingItem = null;

  if (!english && (relative === 'index.html' || relative === 'services/index.html')) {
    const hrefPrefix = relative === 'index.html' ? 'services/' : '';
    const limit = relative === 'index.html' ? 6 : safeServices.length;
    const cards = safeServices.slice(0, limit).map((service, index) => serviceCard(service, index, hrefPrefix)).join('\n');
    html = replaceGridContent(html, 'data-services-grid', 'services', cards);
  }

  if (!english && relative === 'marketing/index.html') {
    const cards = safeMarketingDirections.map(marketingCard).join('\n');
    html = replaceGridContent(html, 'data-marketing-grid', 'marketing', cards);
  }

  const serviceSlug = html.match(/<body\b[^>]*data-service=["']([^"']+)["']/i)?.[1];
  if (serviceSlug) {
    service = safeServices.find((item) => item.slug === serviceSlug);
    if (!service) throw new Error(`Нет данных для услуги ${serviceSlug}`);
    if (english) {
      service = { ...service, title: pageHeading(html) || service.title };
    } else {
      const body = renderServiceBody(serviceLayout, service, safeServices);
      html = html.replace(/<body\b([^>]*)>[\s\S]*?<\/body>/i, `<body$1>\n${body}\n</body>`);
      html = html.replace(/\s*<script\s+src=["'][^"']*service-layout\.js[^"']*["']\s+defer><\/script>/i, '');
    }
  }

  const marketingSlug = html.match(/<body\b[^>]*data-marketing=["']([^"']+)["']/i)?.[1];
  if (marketingSlug) {
    marketingItem = safeMarketingDirections.find((entry) => entry.slug === marketingSlug);
    if (!marketingItem) throw new Error(`Нет данных для маркетингового направления ${marketingSlug}`);
    if (english) {
      marketingItem = { ...marketingItem, title: pageHeading(html) || marketingItem.title };
    } else {
      const body = renderMarketingBody(marketingLayout, marketingItem, safeMarketingDirections);
      html = html.replace(/<body\b([^>]*)>[\s\S]*?<\/body>/i, `<body$1>\n${body}\n</body>`);
      html = html.replace(/\s*<script\s+src=["'][^"']*marketing-data\.js[^"']*["']\s+defer><\/script>/i, '');
      html = html.replace(/\s*<script\s+src=["'][^"']*marketing-layout\.js[^"']*"\s+defer><\/script>/i, '');
    }
  }

  html = html.replace(/((?:\.\.\/)*assets\/site\.js\?v=)[^"']+/g, (_, prefix) => `${prefix}20261106-i18n`);
  html = html.replace(/((?:\.\.\/)*assets\/marketing-catalog\.js\?v=)[^"']+/g, (_, prefix) => `${prefix}20261106-i18n`);
  html = html.replace(/((?:\.\.\/)*assets\/styles\.css\?v=)[^"']+/g, (_, prefix) => `${prefix}20261106-i18n`);
  const faq = english ? extractFaqFromHtml(html) : faqByPath[pathname] || null;
  if (!english) html = addManagedFaq(html, faq);
  const seoOverride = { ...((english ? englishPageSeoOverrides : pageSeoOverrides)[pathname] || {}) };
  if (!english && service && serviceSeoTitles[service.slug]) seoOverride.title ??= serviceSeoTitles[service.slug];
  if (!english && marketingItem && marketingSeoTitles[marketingItem.slug]) seoOverride.title ??= marketingSeoTitles[marketingItem.slug];
  html = applySeoOverride(html, seoOverride);
  html = normalizeInternalAnchors(html, canonical);
  html = addLanguageSwitcher(html, canonical);
  const isServiceCatalog = pathname === '/services/' || pathname === '/en/services/';
  const isMarketingCatalog = pathname === '/marketing/' || pathname === '/en/marketing/';
  const catalogItems = isServiceCatalog
    ? (english ? translatedCatalogItems(html, safeServices) : safeServices)
    : isMarketingCatalog
      ? (english ? translatedCatalogItems(html, safeMarketingDirections) : safeMarketingDirections)
      : null;
  html = addSeoMetadata(html, canonical, {
    service,
    marketingItem,
    faq,
    catalogItems,
    catalogSection: isServiceCatalog ? 'services' : isMarketingCatalog ? 'marketing' : null
  });
  fs.writeFileSync(file, html);
}

const russianHtmlFiles = walk(publicDir)
  .filter((file) => file.endsWith('.html'))
  .filter((file) => !file.startsWith(`${path.join(publicDir, 'en')}${path.sep}`));
for (const file of russianHtmlFiles) processHtmlFile(file, false);

execFileSync(process.execPath, [path.join(root, 'scripts/generate-english.mjs')], {
  cwd: root,
  stdio: ['ignore', 'inherit', 'inherit']
});

const englishHtmlFiles = walk(path.join(publicDir, 'en')).filter((file) => file.endsWith('.html'));
for (const file of englishHtmlFiles) processHtmlFile(file, true);

const htmlFiles = [...russianHtmlFiles, ...englishHtmlFiles];

const sitemapEntries = htmlFiles
  .map((file) => ({ url: getCanonical(file), lastmod: getLastModified(file) }))
  .sort((a, b) => a.url.localeCompare(b.url));
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${sitemapEntries.map(({ url, lastmod }) => {
  const alternates = languageAlternates(url);
  const links = alternates
    ? `<xhtml:link rel="alternate" hreflang="ru" href="${alternates.ru}"/><xhtml:link rel="alternate" hreflang="en" href="${alternates.en}"/><xhtml:link rel="alternate" hreflang="x-default" href="${alternates.default}"/>`
    : '';
  return `  <url><loc>${url}</loc>${links}${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`;
}).join('\n')}\n</urlset>\n`;
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(publicDir, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /api/\n\nHost: webnet.kz\nSitemap: ${origin}/sitemap.xml\n`);

console.log(`SEO: обработано ${htmlFiles.length} HTML-страниц, создан sitemap на ${sitemapEntries.length} URL.`);
