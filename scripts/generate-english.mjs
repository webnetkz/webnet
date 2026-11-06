import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');
const englishDir = path.join(publicDir, 'en');
const cacheFile = path.join(root, 'scripts', 'i18n-en-cache.json');
const allowNetwork = process.argv.includes('--translate-missing');

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(entryPath) : [entryPath];
  });
}

function isLocalizedRelative(relative) {
  return relative === 'index.html'
    || relative === 'privacy.html'
    || relative === 'contacts/index.html'
    || relative === 'programs/index.html'
    || /^services\/(?:index|[a-z0-9-]+)\.html$/.test(relative)
    || /^marketing\/(?:index|[a-z0-9-]+)\.html$/.test(relative);
}

function containsRussian(value) {
  return /[А-Яа-яЁё]/.test(value);
}

const fixed = new Map(Object.entries({
  'Главная': 'Home',
  'Услуги': 'Services',
  'Маркетинг': 'Marketing',
  'Программы для бизнеса': 'Business software',
  'О компании': 'About us',
  'Контакты': 'Contacts',
  'Обсудить проект': 'Discuss your project',
  'Обсудить задачу': 'Discuss your project',
  'Конфиденциальность': 'Privacy',
  'Все услуги': 'All services',
  'Разработка': 'Development',
  'Дизайн': 'Design',
  'Автоматизация и данные': 'Automation & data',
  'Стратегия': 'Strategy',
  'Бизнес-системы': 'Business systems',
  'Инфраструктура': 'Infrastructure',
  'Соцсети': 'Social media',
  'Удержание': 'Retention',
  'Репутация и PR': 'Reputation & PR',
  'Продажи': 'Sales',
  'Аналитика': 'Analytics',
  'Подробнее об услуге': 'Explore the service',
  'Подробнее': 'Learn more',
  'Следующий шаг': 'Next step',
  'Оставить заявку': 'Send a request',
  'Отправить заявку': 'Send request',
  'Ваше имя': 'Your name',
  'Телефон': 'Phone',
  'Задача': 'Project brief',
  'Я согласен с политикой конфиденциальности': 'I agree to the Privacy Policy',
  'Зарегистрирован в 2018 году.': 'Established in 2018.',
  'Логотип WebNet': 'WebNet logo',
  'Основная навигация': 'Main navigation',
  'Открыть меню': 'Open menu',
  'Частые вопросы': 'Frequently asked questions',
  'Что важно знать до старта': 'What to know before we start',
  'Программы для Windows': 'Windows software',
  'Для macOS': 'For macOS',
  'Для Windows': 'For Windows',
  'Для Android': 'For Android',
  'Для iPhone и iPad': 'For iPhone and iPad',
  'Открыть в Mac App Store': 'Open in the Mac App Store',
  'Открыть в Microsoft Store': 'Open in Microsoft Store',
  'Открыть в App Store': 'Open in the App Store',
  'Открыть в Google Play': 'Open in Google Play',
  'Развиваем бизнес через технологии': 'We help businesses grow through technology',
  'Сначала смысл. Затем система': 'Purpose first. System second',
  'Сначала смысл. Потом система': 'Purpose first. System second',
  'Не начинаем с функций. Сначала понимаем контекст, цель и ограничения — затем выбираем решение.': 'We do not start with features. First we understand the context, goal, and constraints—then we choose the right solution.',
  'Технологии под задачу, а не наоборот': 'Technology built around your goals',
  'От стратегии и дизайна до запуска и развития': 'From strategy and design to launch and continuous improvement',
  'год регистрации WebNet': 'year WebNet was established',
  'Интернет-маркетинг': 'Digital marketing',
  'Разработка ПО': 'Custom software development',
  'Мобильные приложения': 'Mobile app development',
  'Решения с ИИ': 'AI solutions',
  'CRM-системы': 'CRM systems',
  'Данные и аналитика': 'Data & analytics',
  'Стратегия и исследования': 'Marketing strategy & research',
  'SEO-продвижение': 'SEO services',
  'Контекстная реклама': 'PPC advertising',
  'Таргетированная реклама': 'Paid social advertising',
  'SMM и социальные сети': 'Social media marketing',
  'SMM и ведение соцсетей': 'Social media marketing',
  'Контент-маркетинг': 'Content marketing',
  'Email-маркетинг': 'Email marketing',
  'Брендинг и креатив': 'Branding & creative',
  'Продвижение на маркетплейсах': 'Marketplace marketing',
  'Продвижение приложений': 'Mobile app marketing',
  'PR и медиаразмещения': 'PR & media relations',
  'Партнёрский маркетинг': 'Partnership marketing',
  'Что решаем': 'What we solve',
  'Фокус на бизнес-результате': 'Focused on business outcomes',
  'Результат работы': 'Deliverables',
  'Что вы получите': 'What you receive',
  'Состав работы': 'Scope of work',
  'Что мы делаем': 'What we do',
  'Каналы и инструменты': 'Channels & tools',
  'Подбираем под задачу': 'Selected for your goals',
  'Результат': 'Deliverables',
  'Как работаем': 'How we work',
  'От данных к росту': 'From data to growth',
  'Смежные направления': 'Related services',
  'Соберите систему': 'Build a complete system',
  'Смежная экспертиза': 'Related expertise',
  'Можно усилить проект': 'Extend the project',
  '01 / ПОГРУЖЕНИЕ': '01 / DISCOVERY',
  '02 / РЕШЕНИЕ': '02 / SOLUTION',
  '03 / СОЗДАНИЕ': '03 / DELIVERY',
  '04 / ЭФФЕКТ': '04 / IMPACT',
  '01 / ДИАГНОСТИКА': '01 / DISCOVERY',
  '02 / СТРАТЕГИЯ': '02 / STRATEGY',
  '03 / ЗАПУСК': '03 / LAUNCH',
  '04 / РАЗВИТИЕ': '04 / GROWTH',
  'Диагностика': 'Discovery',
  'Развитие': 'Growth',
  'От чего зависят сроки и стоимость?': 'What affects the timeline and cost?',
  'От количества пользовательских сценариев, интеграций, требований к безопасности, текущего состояния системы и состава команды. Оценку фиксируем после уточнения объёма и рисков.': 'It depends on the number of user journeys, integrations, security requirements, the current state of the system, and the team setup. We provide an estimate after clarifying the scope and risks.',
  'Работаете с существующими системами?': 'Do you work with existing systems?',
  'Рост': 'Growth',
  'Стратегия площадок': 'Channel strategy',
  'Стратегия, рубрики, контент-план, тексты, дизайн, публикации, модерация, работа с аудиторией и регулярная аналитика.': 'Strategy, content themes, editorial calendar, copy, design, publishing, moderation, community management, and regular analytics.',
  'Охват целевой аудитории, вовлечение, переходы, обращения, рост качественной аудитории и вклад контента в бизнес-цели.': 'Target audience reach, engagement, website visits, enquiries, growth of a relevant audience, and content contribution to business goals.',
  'Позвоните или напишите напрямую. Если удобнее — оставьте заявку, и мы ответим по указанному номеру.': 'Call or message us directly. If you prefer, leave a request and we will contact you at the number provided.',
  'Заявка поступит напрямую в Telegram WebNet. Если отправка недоступна, предложим связаться через WhatsApp.': 'Your request will be sent directly to WebNet on Telegram. If the form is unavailable, we will offer a WhatsApp contact option.',
  'Табличный редактор': 'Spreadsheet editor',
  'Тренажёр для печати': 'Typing tutor',
  'Тренажёр печати с тестами на время, измеримой скоростью, статистикой и поддержкой собственных текстов и книг.': 'A typing tutor with timed tests, speed tracking, statistics, and support for your own texts and books.',
  'Проверяет выбранные файлы и папки сигнатурным и эвристическим анализом. Может загружать базы ClamAV, а найденные угрозы помещать в локальный зашифрованный карантин. Ручной сканер, не постоянная защита системы.': 'Scans selected files and folders using signature and heuristic analysis. It can download ClamAV databases and move detected threats to a local encrypted quarantine. It is an on-demand scanner, not real-time system protection.'
}));

const cache = fs.existsSync(cacheFile)
  ? JSON.parse(fs.readFileSync(cacheFile, 'utf8'))
  : {};

function protectBlocks(html) {
  const blocks = [];
  const protectedHtml = html.replace(/<(script|style|svg)\b[\s\S]*?<\/\1>/gi, (value) => {
    const token = `___WEBNET_PROTECTED_${blocks.length}___`;
    blocks.push(value);
    return token;
  });
  return { protectedHtml, blocks };
}

function restoreBlocks(html, blocks) {
  return html.replace(/___WEBNET_PROTECTED_(\d+)___/g, (_, index) => blocks[Number(index)]);
}

function collectStrings(html) {
  const { protectedHtml } = protectBlocks(html);
  const strings = new Set();
  protectedHtml.replace(/>([^<]+)</g, (_, value) => {
    const text = value.trim();
    if (containsRussian(text)) strings.add(text);
    return _;
  });
  protectedHtml.replace(/\b(?:alt|aria-label|placeholder|title|content)=(['"])([\s\S]*?)\1/gi, (_, quote, value) => {
    if (containsRussian(value)) strings.add(value.trim());
    return _;
  });
  return strings;
}

async function translateWithGoogle(text) {
  const url = new URL('https://translate.googleapis.com/translate_a/single');
  url.searchParams.set('client', 'gtx');
  url.searchParams.set('sl', 'ru');
  url.searchParams.set('tl', 'en');
  url.searchParams.set('dt', 't');
  url.searchParams.set('q', text);
  let lastError;
  for (let attempt = 0; attempt < 4; attempt += 1) {
    try {
      const response = await fetch(url, { headers: { 'user-agent': 'WebNet site localization' } });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      const result = data[0].map((part) => part[0]).join('').trim();
      if (!result) throw new Error('empty translation');
      return result;
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 400 * (attempt + 1)));
    }
  }
  throw new Error(`Failed to translate ${JSON.stringify(text)}: ${lastError}`);
}

async function mapLimit(values, limit, worker) {
  const results = new Array(values.length);
  let next = 0;
  async function run() {
    while (next < values.length) {
      const index = next;
      next += 1;
      results[index] = await worker(values[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, values.length) }, run));
  return results;
}

function translated(value) {
  const text = value.trim();
  const result = fixed.get(text) || cache[text];
  if (!result && containsRussian(text)) throw new Error(`Missing English translation: ${text}`);
  return result || text;
}

function replaceText(value) {
  const leading = value.match(/^\s*/)?.[0] || '';
  const trailing = value.match(/\s*$/)?.[0] || '';
  return `${leading}${translated(value)}${trailing}`;
}

function isLocalizedPathname(pathname) {
  return pathname === '/'
    || pathname === '/privacy.html'
    || pathname === '/contacts/'
    || pathname === '/programs/'
    || pathname === '/services/'
    || pathname === '/marketing/'
    || /^\/(?:services|marketing)\/[a-z0-9-]+\.html$/.test(pathname);
}

function localizeLinks(html) {
  let result = html.replace(/\b(href|src)=(['"])([^'"]+)\2/gi, (match, attribute, quote, value) => {
    if (value.startsWith('/')) {
      const target = new URL(value, 'https://webnet.kz');
      if (isLocalizedPathname(target.pathname)) return `${attribute}=${quote}/en${target.pathname}${target.search}${target.hash}${quote}`;
      return match;
    }
    if (/^(?:https?:|mailto:|tel:|#|\/\/)/i.test(value)) return match;
    if (/^(?:\.\.\/)*assets\//.test(value)) {
      return `${attribute}=${quote}/${value.replace(/^(?:\.\.\/)+/, '')}${quote}`;
    }
    return match;
  });
  const whatsappGreeting = encodeURIComponent('Hello! I would like to discuss a project with WebNet.');
  result = result.replace(/https:\/\/wa\.me\/77078453424\?text=[^'"\s<]+/g, `https://wa.me/77078453424?text=${whatsappGreeting}`);
  return result;
}

function translateHtml(html) {
  const { protectedHtml, blocks } = protectBlocks(html);
  let result = protectedHtml.replace(/>([^<]+)</g, (match, value) => containsRussian(value) ? `>${replaceText(value)}<` : match);
  result = result.replace(/\b(alt|aria-label|placeholder|title|content)=(['"])([\s\S]*?)\2/gi, (match, attribute, quote, value) => {
    if (!containsRussian(value)) return match;
    return `${attribute}=${quote}${translated(value)}${quote}`;
  });
  result = restoreBlocks(result, blocks);
  result = result.replace(/<html\b([^>]*)\blang=(['"])[^'"]+\2([^>]*)>/i, '<html$1lang="en"$3>');
  return localizeLinks(result);
}

const sourceFiles = walk(publicDir)
  .filter((file) => file.endsWith('.html'))
  .filter((file) => !file.startsWith(`${englishDir}${path.sep}`))
  .filter((file) => isLocalizedRelative(path.relative(publicDir, file).split(path.sep).join('/')));

const strings = new Set();
for (const file of sourceFiles) {
  for (const value of collectStrings(fs.readFileSync(file, 'utf8'))) {
    if (!fixed.has(value) && !cache[value]) strings.add(value);
  }
}

if (strings.size && !allowNetwork) {
  throw new Error(`${strings.size} English translations are missing. Run: node scripts/generate-english.mjs --translate-missing`);
}

if (strings.size) {
  const values = [...strings];
  console.log(`Translating ${values.length} strings into English...`);
  await mapLimit(values, 6, async (value, index) => {
    cache[value] = await translateWithGoogle(value);
    if ((index + 1) % 25 === 0) console.log(`Translated ${index + 1}/${values.length}`);
  });
  const sorted = Object.fromEntries(Object.entries(cache).sort(([a], [b]) => a.localeCompare(b, 'ru')));
  fs.writeFileSync(cacheFile, `${JSON.stringify(sorted, null, 2)}\n`);
}

fs.rmSync(englishDir, { recursive: true, force: true });
for (const source of sourceFiles) {
  const relative = path.relative(publicDir, source);
  const destination = path.join(englishDir, relative);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, translateHtml(fs.readFileSync(source, 'utf8')));
}

console.log(`English: generated ${sourceFiles.length} pages in /en/.`);
