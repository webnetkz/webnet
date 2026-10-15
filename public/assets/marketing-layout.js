const marketingSlug = document.body.dataset.marketing;
const marketingItem = window.marketingDirections?.find((item) => item.slug === marketingSlug);

if (!marketingItem) {
  document.body.innerHTML = '<main class="section"><div class="container"><h1>Направление не найдено</h1><p><a href="index.html">Вернуться в каталог маркетинга</a></p></div></main>';
} else {
  const related = window.marketingDirections
    .filter((item) => item.slug !== marketingItem.slug)
    .sort((a, b) => Number(b.category === marketingItem.category) - Number(a.category === marketingItem.category))
    .slice(0, 3);

  document.body.innerHTML = `
    <header class="site-header">
      <nav class="nav-shell" aria-label="Основная навигация">
        <a class="brand" href="../index.html"><img src="../assets/logo.png" alt="Логотип WebNet"><span>webnet.kz</span></a>
        <div class="nav-links"><a href="../services/index.html">Услуги</a><a class="nav-current" href="index.html" aria-current="page">Маркетинг</a><a href="../programs/index.html">Программы для бизнеса</a><a href="../index.html#approach">Подход</a><a href="../index.html#about">О компании</a><a class="nav-phone" href="tel:+77078453424">+7 707 845 34 24</a><a class="btn btn-primary" href="../index.html#contact">Обсудить проект</a></div>
        <button class="menu-toggle" type="button" aria-label="Открыть меню" aria-expanded="false">☰</button>
      </nav>
    </header>
    <main>
      <section class="service-hero marketing-detail-hero">
        <div class="container">
          <div class="breadcrumbs"><a href="../index.html">Главная</a><span>/</span><a href="index.html">Маркетинг</a><span>/</span><span>${marketingItem.title}</span></div>
          <div class="service-hero-grid">
            <div><p class="eyebrow">${marketingItem.kicker}</p><h1>${marketingItem.title}</h1><p class="lead">${marketingItem.lead}</p></div>
            <aside class="service-hero-aside"><p>${marketingItem.description}</p><div class="tag-list">${marketingItem.channels.map((channel) => `<span class="tag">${channel}</span>`).join('')}</div></aside>
          </div>
        </div>
      </section>
      <section class="section">
        <div class="container service-detail-grid">
          <div><p class="eyebrow">Состав работы</p><h2>Что мы делаем.</h2></div>
          <div class="solution-list">${marketingItem.works.map((work, index) => `<article class="solution-item"><span>${String(index + 1).padStart(2, '0')}</span><div><h3>${work[0]}</h3><p>${work[1]}</p></div></article>`).join('')}</div>
        </div>
      </section>
      <section class="section marketing-channels-section">
        <div class="container">
          <div class="section-head"><div><p class="eyebrow">Каналы и инструменты</p><h2>Подбираем под задачу.</h2></div><p>Используем только те площадки и форматы, которые соответствуют аудитории, экономике и этапу воронки.</p></div>
          <div class="marketing-channel-grid">${marketingItem.channels.map((channel, index) => `<div class="marketing-channel"><span>${String(index + 1).padStart(2, '0')}</span><strong>${channel}</strong></div>`).join('')}</div>
        </div>
      </section>
      <section class="section" style="background:#eef6ff">
        <div class="container">
          <div class="section-head"><div><p class="eyebrow">Результат</p><h2>Что вы получите.</h2></div><p>Финальный состав зависит от исходных данных, выбранных каналов и масштаба задачи.</p></div>
          <div class="deliverables">${marketingItem.results.map((result) => `<article class="deliverable"><h3>${result[0]}</h3><p>${result[1]}</p></article>`).join('')}</div>
        </div>
      </section>
      <section class="section section-dark">
        <div class="container">
          <div class="section-head"><div><p class="eyebrow eyebrow-light">Как работаем</p><h2>От данных к росту.</h2></div><p>Фиксируем цель, запускаем управляемую систему и улучшаем её на основе фактического результата.</p></div>
          <div class="service-steps">
            <article class="service-step"><strong>01 / ДИАГНОСТИКА</strong><h3>Контекст</h3><p>Разбираем продукт, аудиторию, воронку, конкурентов и текущие данные.</p></article>
            <article class="service-step"><strong>02 / СТРАТЕГИЯ</strong><h3>План</h3><p>Определяем гипотезы, каналы, сообщения, бюджет и критерии успеха.</p></article>
            <article class="service-step"><strong>03 / ЗАПУСК</strong><h3>Реализация</h3><p>Готовим материалы, настраиваем инструменты и запускаем работу.</p></article>
            <article class="service-step"><strong>04 / РАЗВИТИЕ</strong><h3>Оптимизация</h3><p>Измеряем эффект, тестируем улучшения и масштабируем результат.</p></article>
          </div>
        </div>
      </section>
      <section class="section">
        <div class="container"><div class="section-head"><div><p class="eyebrow">Смежные направления</p><h2>Соберите систему.</h2></div><p>Объединим несколько направлений в единую программу продвижения.</p></div><div class="next-services">${related.map((item) => `<a class="service-card marketing-related" href="${item.slug}.html"><div class="service-number"><span>${item.number}</span><span class="service-icon">${item.icon}</span></div><h3>${item.title}</h3><p>${item.short}</p><span class="service-link">Подробнее</span></a>`).join('')}</div></div>
      </section>
      <section class="section-compact"><div class="container contact-panel"><div class="contact-grid"><div class="contact-copy"><p class="eyebrow eyebrow-light">Следующий шаг</p><h2>Обсудим продвижение.</h2><p>Расскажите о продукте и цели — предложим подход, каналы и формат первого этапа.</p><div class="contact-methods"><a class="contact-chip" href="tel:+77078453424">Телефон · +7 707 845 34 24</a><a class="contact-chip" href="https://wa.me/77078453424" target="_blank" rel="noopener">WhatsApp ↗</a></div></div><div class="programs-contact-action"><a class="btn btn-light btn-arrow" href="../index.html#contact">Обсудить задачу</a></div></div></div></section>
    </main>
    <footer class="site-footer"><div class="container"><div class="footer-bottom"><span>© <span data-year></span> WebNet. Зарегистрирован в 2018 году.</span><span><a href="index.html">Все направления маркетинга</a> · <a href="../privacy.html">Конфиденциальность</a></span></div></div></footer>`;
}
