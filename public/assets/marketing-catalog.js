const marketingCategoryLabels = {
  all: 'Все направления',
  strategy: 'Стратегия и бренд',
  traffic: 'Трафик',
  social: 'Соцсети',
  content: 'Контент',
  retention: 'Удержание',
  reputation: 'Репутация и PR',
  commerce: 'Продажи',
  analytics: 'Аналитика'
};

const marketingCategoryLabelsEn = {
  all: 'All directions',
  strategy: 'Strategy & brand',
  traffic: 'Traffic',
  social: 'Social media',
  content: 'Content',
  retention: 'Retention',
  reputation: 'Reputation & PR',
  commerce: 'Sales',
  analytics: 'Analytics'
};

function renderMarketingCatalog() {
  const grid = document.querySelector('[data-marketing-grid]');
  const filters = document.querySelector('[data-marketing-filters]');
  if (!grid || !window.marketingDirections) return;

  if (!grid.querySelector('.service-card')) {
    grid.innerHTML = window.marketingDirections.map((item) => `
      <a class="service-card marketing-card reveal" href="${item.slug}.html" data-marketing-category="${item.category}">
        <div class="service-number"><span>${item.number}</span><span class="service-icon">${item.icon}</span></div>
        <p class="marketing-card-category">${marketingCategoryLabels[item.category]}</p>
        <h3>${item.title}</h3>
        <p>${item.short}</p>
        <span class="service-link">Подробнее</span>
      </a>`).join('');
  }

  if (!filters) return;
  const categories = ['all', ...new Set(window.marketingDirections.map((item) => item.category))];
  const labels = document.documentElement.lang.toLowerCase().startsWith('en') ? marketingCategoryLabelsEn : marketingCategoryLabels;
  filters.innerHTML = categories.map((category) => `<button class="filter-btn${category === 'all' ? ' active' : ''}" type="button" data-marketing-filter="${category}">${labels[category]}</button>`).join('');
  filters.addEventListener('click', (event) => {
    const button = event.target.closest('[data-marketing-filter]');
    if (!button) return;
    filters.querySelectorAll('.filter-btn').forEach((item) => item.classList.toggle('active', item === button));
    const category = button.dataset.marketingFilter;
    grid.querySelectorAll('[data-marketing-category]').forEach((card) => {
      card.hidden = category !== 'all' && card.dataset.marketingCategory !== category;
    });
  });
}

renderMarketingCatalog();
