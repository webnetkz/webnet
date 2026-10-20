document.body.innerHTML = `
  <header class="site-header">
    <nav class="nav-shell" aria-label="Основная навигация">
      <a class="brand" href="../index.html"><img src="../assets/logo.png" alt="Логотип WebNet"><span>webnet.kz</span></a>
      <div class="nav-links"><a href="index.html">Услуги</a><a href="../marketing/index.html">Маркетинг</a><a href="../programs/index.html">Программы для бизнеса</a><a href="../index.html#approach">Подход</a><a href="../index.html#about">О компании</a><a href="../contacts/index.html">Контакты</a><a class="nav-phone" href="tel:+77078453424">+7 707 845 34 24</a><a class="btn btn-primary" href="../contacts/index.html">Обсудить проект</a></div>
      <button class="menu-toggle" type="button" aria-label="Открыть меню" aria-expanded="false">☰</button>
    </nav>
  </header>
  <main>
    <section class="service-hero">
      <div class="container">
        <div class="breadcrumbs"><a href="../index.html">Главная</a><span>/</span><a href="index.html">Услуги</a><span>/</span><span data-service-title></span></div>
        <div class="service-hero-grid">
          <div><p class="eyebrow" data-service-kicker></p><h1 data-service-title></h1><p class="lead" data-service-lead></p></div>
          <aside class="service-hero-aside"><p data-service-description></p><div class="tag-list" data-service-tags></div></aside>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container service-detail-grid">
        <div><p class="eyebrow">Что решаем</p><h2>Фокус на бизнес-результате</h2></div>
        <div class="solution-list" data-service-solutions></div>
      </div>
    </section>
    <section class="section" style="background:#eef6ff">
      <div class="container">
        <div class="section-head"><div><p class="eyebrow">Результат работы</p><h2>Что вы получите</h2></div><p>Состав результата уточняется под задачу, масштаб и текущую зрелость проекта.</p></div>
        <div class="deliverables" data-service-deliverables></div>
      </div>
    </section>
    <section class="section section-dark">
      <div class="container">
        <div class="section-head"><div><p class="eyebrow eyebrow-light">Процесс</p><h2>От контекста к внедрению</h2></div><p>Работаем короткими понятными этапами и показываем промежуточный результат.</p></div>
        <div class="service-steps">
          <article class="service-step"><strong>01 / ПОГРУЖЕНИЕ</strong><h3>Диагностика</h3><p>Уточняем цели, пользователей, процессы и ограничения.</p></article>
          <article class="service-step"><strong>02 / РЕШЕНИЕ</strong><h3>Концепция</h3><p>Формируем подход, объём, приоритеты и критерии успеха.</p></article>
          <article class="service-step"><strong>03 / СОЗДАНИЕ</strong><h3>Реализация</h3><p>Делаем итерациями, проверяем качество и показываем прогресс.</p></article>
          <article class="service-step"><strong>04 / ЭФФЕКТ</strong><h3>Запуск</h3><p>Внедряем, измеряем результат и планируем развитие.</p></article>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container"><div class="section-head"><div><p class="eyebrow">Смежная экспертиза</p><h2>Можно усилить проект</h2></div><p>Подключим нужных специалистов и сохраним единую ответственность за результат.</p></div><div class="next-services" data-related-services></div></div>
    </section>
    <section class="section-compact"><div class="container contact-panel"><div class="contact-grid"><div class="contact-copy"><p class="eyebrow eyebrow-light">Следующий шаг</p><h2>Обсудим вашу задачу</h2><p>Коротко опишите контекст — предложим формат первого этапа.</p><div class="contact-methods"><a class="contact-chip" href="tel:+77078453424">Телефон · +7 707 845 34 24</a><a class="contact-chip" href="https://wa.me/77078453424?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%21%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%BE%D0%B1%D1%81%D1%83%D0%B4%D0%B8%D1%82%D1%8C%20%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%20%D1%81%20WebNet." target="_blank" rel="noopener">WhatsApp ↗</a></div></div><div style="display:flex;align-items:center;justify-content:center"><a class="btn btn-light btn-arrow" href="../index.html#contact">Оставить заявку</a></div></div></div></section>
  </main>
  <footer class="site-footer"><div class="container"><div class="footer-bottom"><span>© <span data-year></span> WebNet. Зарегистрирован в 2018 году.</span><span><a href="tel:+77078453424">+7 707 845 34 24</a> · <a href="https://wa.me/77078453424?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%21%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%BE%D0%B1%D1%81%D1%83%D0%B4%D0%B8%D1%82%D1%8C%20%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%20%D1%81%20WebNet." target="_blank" rel="noopener">WhatsApp</a> · <a href="https://t.me/WebNetKZ" target="_blank" rel="noopener">Telegram · @WebNetKZ</a> · <a class="footer-instagram" href="https://www.instagram.com/webnetkz/" target="_blank" rel="noopener" aria-label="Instagram WebNet"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle class="instagram-dot" cx="18" cy="6" r="1"/></svg><span>Instagram</span></a> · <a href="../contacts/index.html">Контакты</a> · <a href="../privacy.html">Конфиденциальность</a></span></div></div></footer>`;
