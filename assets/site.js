const services = [
  {
    slug: 'software-development', category: 'development', icon: '⌘',
    title: 'Разработка ПО', short: 'Создаём надёжные цифровые продукты под задачи бизнеса — от идеи до поддержки.',
    kicker: 'Инженерия цифровых продуктов',
    lead: 'Проектируем и разрабатываем программные решения, которые учитывают процессы, пользователей и планы роста компании.',
    description: 'Берём на себя весь цикл: исследование, архитектуру, интерфейсы, разработку, тестирование, запуск и развитие продукта.',
    tags: ['MVP', 'SaaS', 'Корпоративные системы', 'Интеграции'],
    solutions: [
      ['Корпоративные системы', 'CRM, ERP, личные кабинеты, внутренние порталы и отраслевые решения.'],
      ['SaaS и платформы', 'Масштабируемые сервисы с ролями, платежами, аналитикой и интеграциями.'],
      ['MVP продукта', 'Проверяем гипотезу работающим продуктом с понятным планом развития.'],
      ['Модернизация', 'Обновляем архитектуру, интерфейс и технологическую базу существующих систем.']
    ],
    deliverables: [
      ['Архитектура решения', 'Техническая схема, роли, интеграции и требования к безопасности.'],
      ['Работающий продукт', 'Готовая к использованию система с ключевыми сценариями.'],
      ['Документация', 'Описание продукта, кода, API и процессов развёртывания.'],
      ['План развития', 'Приоритеты следующих релизов и измеримые продуктовые цели.']
    ]
  },
  {
    slug: 'web-development', category: 'development', icon: '◫',
    title: 'Веб-разработка', short: 'Сайты, сервисы и порталы с высокой скоростью, ясным UX и сильной подачей.',
    kicker: 'Веб-продукты для роста',
    lead: 'Создаём быстрые сайты и веб-сервисы, которые помогают продавать, обслуживать клиентов и автоматизировать операции.',
    description: 'От промосайта до сложного личного кабинета — проектируем понятный путь пользователя и устойчивую техническую основу.',
    tags: ['Корпоративные сайты', 'E-commerce', 'Порталы', 'Web apps'],
    solutions: [
      ['Корпоративные сайты', 'Современная презентация компании, услуг и преимуществ с удобным управлением контентом.'],
      ['Интернет-магазины', 'Каталог, поиск, корзина, оплата, доставка и интеграция с учётными системами.'],
      ['Личные кабинеты', 'Безопасный доступ к данным, документам, платежам и сервисным операциям.'],
      ['Веб-приложения', 'Интерактивные продукты для клиентов, партнёров и сотрудников.']
    ],
    deliverables: [
      ['Прототип и дизайн', 'Проработанные сценарии и адаптивные интерфейсы.'],
      ['Frontend и backend', 'Работающая система с API и интеграциями.'],
      ['Оптимизация', 'Скорость загрузки, базовое SEO и доступность.'],
      ['Запуск', 'Развёртывание, аналитика и инструкции для команды.']
    ]
  },
  {
    slug: 'mobile-development', category: 'development', icon: '▣',
    title: 'Мобильные приложения', short: 'Приложения для iOS и Android, которые удобно использовать и легко развивать.',
    kicker: 'Продукт всегда под рукой',
    lead: 'Разрабатываем мобильные приложения для клиентов и сотрудников — нативные или кроссплатформенные.',
    description: 'Фокусируемся на ключевых сценариях, скорости интерфейса и технологической основе, готовой к новым релизам.',
    tags: ['iOS', 'Android', 'Cross-platform', 'App design'],
    solutions: [
      ['Клиентские приложения', 'Каталоги, заказы, подписки, лояльность и персональные предложения.'],
      ['Внутренние приложения', 'Мобильные инструменты для продаж, логистики, производства и выездных команд.'],
      ['MVP', 'Первая версия для проверки спроса и сбора обратной связи.'],
      ['Развитие продукта', 'Аудит, редизайн, новые функции и повышение стабильности.']
    ],
    deliverables: [
      ['UX-сценарии', 'Карта путей пользователя и интерактивный прототип.'],
      ['Приложение', 'Сборки для целевых платформ и связанный backend.'],
      ['Публикация', 'Подготовка материалов и сопровождение релиза.'],
      ['Аналитика', 'События, воронки и показатели качества продукта.']
    ]
  },
  {
    slug: 'ui-ux-design', category: 'design', icon: '✦',
    title: 'UI/UX-дизайн', short: 'Интерфейсы, в которых бизнес-логика превращается в простой пользовательский путь.',
    kicker: 'Дизайн, который решает задачу',
    lead: 'Исследуем контекст, проектируем сценарии и создаём визуальную систему, понятную пользователям и разработчикам.',
    description: 'Соединяем продуктовую логику, визуальную выразительность и требования к доступности в единую дизайн-систему.',
    tags: ['UX research', 'Прототипы', 'UI design', 'Design system'],
    solutions: [
      ['Исследование', 'Интервью, анализ сценариев, конкурентов и проблем в текущем опыте.'],
      ['UX-проектирование', 'Информационная архитектура, карты пути и интерактивные прототипы.'],
      ['UI-дизайн', 'Адаптивные экраны, визуальный язык и состояния интерфейса.'],
      ['Дизайн-система', 'Компоненты, правила и документация для системного развития продукта.']
    ],
    deliverables: [
      ['Карта сценариев', 'Структура продукта и логика переходов.'],
      ['Прототип', 'Кликабельная модель ключевых процессов.'],
      ['Макеты', 'Полный набор адаптивных экранов и состояний.'],
      ['UI-kit', 'Библиотека компонентов для команды разработки.']
    ]
  },
  {
    slug: 'automation', category: 'automation', icon: '↻',
    title: 'Автоматизация', short: 'Убираем ручные операции, связываем системы и сокращаем путь от запроса до результата.',
    kicker: 'Меньше рутины — больше скорости',
    lead: 'Находим повторяющиеся операции и превращаем их в управляемые цифровые процессы с понятными метриками.',
    description: 'Автоматизируем согласования, документооборот, продажи, поддержку, отчётность и обмен данными между системами.',
    tags: ['Workflow', 'CRM', 'RPA', 'Интеграции'],
    solutions: [
      ['Автоматизация процессов', 'Маршруты заявок, согласований, задач и документов.'],
      ['Интеграции систем', 'Обмен данными между CRM, ERP, сайтом, телефонией и внешними сервисами.'],
      ['RPA и боты', 'Автоматизация повторяемых действий в существующих программах.'],
      ['Управленческая отчётность', 'Автоматический сбор показателей и актуальные дашборды.']
    ],
    deliverables: [
      ['Карта процесса', 'Состояние «как есть» и целевая схема.'],
      ['Автоматизированный поток', 'Настроенные правила, роли и уведомления.'],
      ['Интеграции', 'Надёжный обмен данными и обработка ошибок.'],
      ['Метрики', 'Контроль времени, качества и узких мест процесса.']
    ]
  },
  {
    slug: 'ai-solutions', category: 'automation', icon: '✺',
    title: 'Решения с ИИ', short: 'Встраиваем искусственный интеллект в продукты и процессы там, где он даёт измеримую пользу.',
    kicker: 'ИИ как рабочий инструмент',
    lead: 'Создаём ассистентов, поиск по знаниям, интеллектуальную обработку данных и генеративные сценарии для бизнеса.',
    description: 'Начинаем с бизнес-задачи, проверяем качество на реальных данных и проектируем безопасный контур использования ИИ.',
    tags: ['AI-ассистенты', 'RAG', 'LLM', 'Computer vision'],
    solutions: [
      ['AI-ассистенты', 'Помощники для сотрудников, поддержки, продаж и работы с документами.'],
      ['Поиск по знаниям', 'Ответы на основе внутренней базы с указанием источников.'],
      ['Обработка документов', 'Извлечение, классификация, проверка и структурирование информации.'],
      ['AI-функции продукта', 'Генерация, рекомендации, анализ и новые интеллектуальные сценарии.']
    ],
    deliverables: [
      ['AI-прототип', 'Проверка применимости на реальных сценариях и данных.'],
      ['Контур качества', 'Метрики, тестовые наборы и правила проверки результата.'],
      ['Интеграция', 'Встроенный в рабочий процесс или продукт инструмент.'],
      ['Регламент', 'Правила безопасности, ролей и ответственного использования.']
    ]
  },
  {
    slug: 'business-processes', category: 'strategy', icon: '⌁',
    title: 'Бизнес-процессы', short: 'Проектируем прозрачную систему работы: роли, этапы, данные, контроль и улучшения.',
    kicker: 'Система вместо хаоса',
    lead: 'Разбираем, как компания работает сегодня, устраняем узкие места и проектируем процессы, готовые к росту.',
    description: 'Соединяем бизнес-анализ, операционный дизайн и цифровые инструменты, чтобы изменения работали на практике.',
    tags: ['BPM', 'Регламенты', 'Операционная модель', 'KPI'],
    solutions: [
      ['Диагностика процессов', 'Интервью, наблюдение, карта потока и поиск потерь.'],
      ['Целевая модель', 'Роли, зоны ответственности, правила и точки контроля.'],
      ['Регламенты', 'Понятные инструкции и стандарты выполнения процессов.'],
      ['Внедрение изменений', 'Пилот, обучение команды и настройка обратной связи.']
    ],
    deliverables: [
      ['Карта AS IS', 'Визуальное описание текущей работы и проблем.'],
      ['Модель TO BE', 'Целевой процесс с ролями, сроками и системами.'],
      ['Пакет регламентов', 'Практичные документы для ежедневной работы.'],
      ['План внедрения', 'Очередность изменений, риски и критерии успеха.']
    ]
  },
  {
    slug: 'product-management', category: 'strategy', icon: '◎',
    title: 'Продуктовый менеджмент', short: 'Помогаем выбрать правильный продукт, проверить гипотезы и выстроить развитие по данным.',
    kicker: 'От идеи к устойчивому продукту',
    lead: 'Берём роль продуктового партнёра: исследуем рынок, формируем стратегию, управляем бэклогом и результатом команды.',
    description: 'Выстраиваем продуктовую работу вокруг ценности для клиента и бизнес-метрик, а не вокруг количества функций.',
    tags: ['Product strategy', 'Discovery', 'Roadmap', 'Analytics'],
    solutions: [
      ['Продуктовая стратегия', 'Целевая аудитория, ценностное предложение, позиционирование и цели.'],
      ['Discovery', 'Исследования, гипотезы, прототипы и проверка спроса.'],
      ['Управление delivery', 'Бэклог, приоритеты, постановка задач и синхронизация команды.'],
      ['Продуктовая аналитика', 'Метрики, воронки, когортный анализ и эксперименты.']
    ],
    deliverables: [
      ['Product vision', 'Образ продукта, аудитория и ценность.'],
      ['Roadmap', 'Приоритетный план развития, связанный с целями.'],
      ['Бэклог', 'Проработанные инициативы и критерии готовности.'],
      ['Система метрик', 'Показатели продукта и ритм принятия решений.']
    ]
  },
  {
    slug: 'crm-systems', category: 'business', icon: '◉',
    title: 'CRM-системы', short: 'Внедряем CRM, которая помогает управлять продажами, клиентами и ежедневной работой команды.',
    kicker: 'Продажи и сервис в единой системе',
    lead: 'Подбираем, внедряем и развиваем CRM под реальные процессы компании — от первого обращения до повторных продаж.',
    description: 'Настраиваем воронки, роли, автоматизацию, аналитику и интеграции, чтобы CRM стала рабочим инструментом, а не формальной базой контактов.',
    tags: ['CRM', 'Продажи', 'Клиентский сервис', 'Интеграции'],
    solutions: [
      ['Выбор и аудит CRM', 'Сравниваем варианты, оцениваем текущую систему и формируем план внедрения или модернизации.'],
      ['Настройка процессов', 'Проектируем воронки, статусы, карточки, права доступа, задачи и автоматические сценарии.'],
      ['Интеграции', 'Связываем CRM с сайтом, телефонией, почтой, мессенджерами, 1С и аналитикой.'],
      ['Развитие и поддержка', 'Обучаем команду, контролируем качество данных и улучшаем систему по мере роста бизнеса.']
    ],
    deliverables: [
      ['Рабочая CRM', 'Настроенная система с ролями, воронками и ключевыми сценариями.'],
      ['Автоматизация продаж', 'Правила, уведомления и задачи, которые сокращают ручную работу.'],
      ['Интеграционный контур', 'Надёжный обмен данными с используемыми сервисами.'],
      ['Регламент и обучение', 'Инструкции, обучение пользователей и план дальнейшего развития.']
    ]
  },
  {
    slug: 'cloud-telephony', category: 'business', icon: '☎',
    title: 'Облачная телефония', short: 'Объединяем звонки, сотрудников и клиентские данные в управляемый сервис связи.',
    kicker: 'Телефония для продаж и поддержки',
    lead: 'Настраиваем облачную АТС, номера, маршрутизацию и аналитику звонков с интеграцией в CRM и рабочие процессы.',
    description: 'Помогаем не терять обращения, быстрее соединять клиентов с нужными специалистами и контролировать качество коммуникаций.',
    tags: ['Виртуальная АТС', 'SIP', 'CRM-телефония', 'Аналитика звонков'],
    solutions: [
      ['Облачная АТС', 'Подключаем номера, сотрудников, очереди, расписания и сценарии обработки звонков.'],
      ['Голосовое меню и маршрутизация', 'Настраиваем IVR, переадресацию, группы и правила для рабочего и нерабочего времени.'],
      ['Интеграция с CRM', 'Создаём карточки и сделки по звонкам, сохраняем историю и запись разговоров.'],
      ['Контроль качества', 'Настраиваем отчёты, пропущенные звонки, показатели операторов и уведомления.']
    ],
    deliverables: [
      ['Настроенная телефония', 'Рабочие номера, пользователи, очереди и сценарии маршрутизации.'],
      ['Интеграция с CRM', 'Автоматическая фиксация звонков и привязка к клиентам и сделкам.'],
      ['Аналитика', 'Отчёты по нагрузке, пропущенным обращениям и эффективности команды.'],
      ['Инструкции и сопровождение', 'Документация, обучение и поддержка после запуска.']
    ]
  },
  {
    slug: '1c-development-support', category: 'business', icon: '1С',
    title: '1С: разработка и сопровождение', short: 'Дорабатываем, интегрируем и поддерживаем решения 1С под процессы компании.',
    kicker: 'Учётные системы без лишней рутины',
    lead: 'Развиваем конфигурации 1С, автоматизируем учёт и обмен данными, обеспечиваем стабильную работу пользователей.',
    description: 'Работаем с типовыми и доработанными решениями: от диагностики и отдельных задач до постоянного сопровождения и развития системы.',
    tags: ['1С', 'Доработка', 'Интеграции', 'Сопровождение'],
    solutions: [
      ['Доработка конфигураций', 'Добавляем документы, отчёты, обработки, печатные формы и рабочие места пользователей.'],
      ['Интеграции и обмены', 'Связываем 1С с CRM, сайтом, маркетплейсами, банками и внешними сервисами.'],
      ['Оптимизация и обновление', 'Ускоряем работу, устраняем ошибки и сохраняем совместимость с обновлениями.'],
      ['Регулярное сопровождение', 'Поддерживаем пользователей, консультируем и выпускаем согласованные улучшения.']
    ],
    deliverables: [
      ['Доработанная система', 'Реализованные функции с учётом ролей и требований учёта.'],
      ['Надёжные обмены', 'Контролируемая синхронизация данных и обработка ошибок.'],
      ['Документация', 'Описание изменений, настройки и инструкции для пользователей.'],
      ['Поддержка', 'Понятный процесс обращений, приоритетов и дальнейшего развития.']
    ]
  },
  {
    slug: 'data-analytics', category: 'automation', icon: '▥',
    title: 'Данные и аналитика', short: 'Собираем данные в единую картину, чтобы решения принимались быстрее и точнее.',
    kicker: 'Данные, которыми можно управлять',
    lead: 'Строим отчётность, аналитические витрины и модели данных для операционных и стратегических решений.',
    description: 'Определяем ключевые показатели, настраиваем сбор и качество данных, создаём понятные дашборды.',
    tags: ['BI', 'Dashboards', 'Data pipelines', 'Metrics'],
    solutions: [
      ['BI-дашборды', 'Продажи, маркетинг, финансы и операции в одном понятном интерфейсе.'],
      ['Интеграция данных', 'Сбор информации из разных систем и источников.'],
      ['Модель показателей', 'Единые определения метрик и правила их расчёта.'],
      ['Аналитические продукты', 'Внутренние инструменты для исследования данных и принятия решений.']
    ],
    deliverables: [
      ['Карта данных', 'Источники, владельцы и требования к качеству.'],
      ['Пайплайны', 'Автоматический сбор и обновление информации.'],
      ['Дашборды', 'Наглядные отчёты для разных ролей.'],
      ['Словарь метрик', 'Согласованные показатели и формулы расчёта.']
    ]
  },
  {
    slug: 'cloud-devops', category: 'infrastructure', icon: '☁',
    title: 'Cloud & DevOps', short: 'Надёжная инфраструктура, предсказуемые релизы и контроль состояния систем.',
    kicker: 'Стабильная основа цифрового бизнеса',
    lead: 'Проектируем облачную инфраструктуру и автоматизируем путь изменений от кода до рабочего сервиса.',
    description: 'Повышаем стабильность, скорость релизов и прозрачность эксплуатации без лишней сложности.',
    tags: ['Cloud', 'CI/CD', 'Monitoring', 'Containers'],
    solutions: [
      ['Облачная архитектура', 'Проектирование окружений, сетей, хранения и резервирования.'],
      ['CI/CD', 'Автоматическая сборка, проверка и безопасный выпуск изменений.'],
      ['Мониторинг', 'Метрики, журналы, оповещения и контроль уровня сервиса.'],
      ['Оптимизация инфраструктуры', 'Аудит производительности, надёжности и затрат.']
    ],
    deliverables: [
      ['Infrastructure as Code', 'Воспроизводимая конфигурация инфраструктуры.'],
      ['Pipeline релизов', 'Автоматизированный и контролируемый выпуск.'],
      ['Наблюдаемость', 'Дашборды, логи и правила оповещений.'],
      ['Runbook', 'Инструкции для типовых событий и аварий.']
    ]
  },
  {
    slug: 'qa-testing', category: 'infrastructure', icon: '✓',
    title: 'QA и тестирование', short: 'Снижаем риск ошибок и выстраиваем качество как непрерывный процесс.',
    kicker: 'Качество до релиза',
    lead: 'Проверяем продукт глазами пользователя и инженера: функциональность, удобство, нагрузку и устойчивость.',
    description: 'Встраиваем контроль качества в разработку, автоматизируем критические сценарии и делаем риски прозрачными.',
    tags: ['Manual QA', 'Autotests', 'Load testing', 'QA audit'],
    solutions: [
      ['Функциональное тестирование', 'Проверка сценариев, ролей, интеграций и граничных случаев.'],
      ['Автоматизация тестов', 'Регрессионные проверки для частых и безопасных релизов.'],
      ['Нагрузочное тестирование', 'Проверка производительности и поведения системы под нагрузкой.'],
      ['Аудит QA', 'Оценка процессов, покрытия и причин повторяющихся дефектов.']
    ],
    deliverables: [
      ['Стратегия тестирования', 'Уровни проверок, риски и критерии выпуска.'],
      ['Тестовая модель', 'Сценарии, наборы данных и чек-листы.'],
      ['Автотесты', 'Поддерживаемый набор критических проверок.'],
      ['Отчёт о качестве', 'Проблемы, приоритеты и рекомендации.']
    ]
  },
  {
    slug: 'cybersecurity', category: 'infrastructure', icon: '◇',
    title: 'Кибербезопасность', short: 'Защищаем продукты, данные и доступы через разумные технические и организационные меры.',
    kicker: 'Безопасность как часть продукта',
    lead: 'Оцениваем риски, проверяем системы и внедряем практики защиты, которые не мешают бизнесу работать.',
    description: 'Фокусируемся на реальных угрозах: доступах, данных, уязвимостях, резервировании и готовности к инцидентам.',
    tags: ['Security audit', 'AppSec', 'Access', 'Risk management'],
    solutions: [
      ['Аудит безопасности', 'Анализ архитектуры, конфигураций, доступов и критических рисков.'],
      ['Безопасная разработка', 'Проверки кода и зависимостей в жизненном цикле продукта.'],
      ['Управление доступом', 'Роли, принципы минимальных прав и контроль учётных записей.'],
      ['Готовность к инцидентам', 'Сценарии реагирования, резервирование и восстановление.']
    ],
    deliverables: [
      ['Карта рисков', 'Приоритеты по вероятности и влиянию.'],
      ['План защиты', 'Конкретные технические и процессные меры.'],
      ['Исправления', 'Устранение согласованных уязвимостей и настроек.'],
      ['Регламенты', 'Правила доступа, реагирования и контроля.']
    ]
  }
];

const categoryLabels = {
  all: 'Все услуги', development: 'Разработка', design: 'Дизайн',
  automation: 'Автоматизация и данные', strategy: 'Стратегия', business: 'Бизнес-системы', infrastructure: 'Инфраструктура'
};

function serviceHref(slug) {
  return location.pathname.includes('/services/') ? `${slug}.html` : `services/${slug}.html`;
}

function createServiceCard(service, index) {
  return `
    <a class="service-card reveal" href="${serviceHref(service.slug)}" data-category="${service.category}">
      <div class="service-number"><span>${String(index + 1).padStart(2, '0')}</span><span class="service-icon" aria-hidden="true">${service.icon}</span></div>
      <h3>${service.title}</h3>
      <p>${service.short}</p>
      <span class="service-link">Подробнее об услуге</span>
    </a>`;
}

function renderServices() {
  document.querySelectorAll('[data-services-grid]').forEach((grid) => {
    if (grid.querySelector('.service-card')) return;
    const limit = Number(grid.dataset.limit || services.length);
    grid.innerHTML = services.slice(0, limit).map(createServiceCard).join('');
  });
}

function renderFilters() {
  const bar = document.querySelector('[data-filters]');
  if (!bar) return;
  bar.innerHTML = Object.entries(categoryLabels).map(([key, label]) =>
    `<button class="filter-btn${key === 'all' ? ' active' : ''}" type="button" data-filter="${key}">${label}</button>`
  ).join('');
  bar.addEventListener('click', (event) => {
    const button = event.target.closest('[data-filter]');
    if (!button) return;
    bar.querySelectorAll('.filter-btn').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    document.querySelectorAll('.catalog-grid .service-card').forEach((card) => {
      card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
    });
  });
}

function renderServicePage() {
  const slug = document.body.dataset.service;
  if (!slug) return;
  const service = services.find((item) => item.slug === slug);
  if (!service) return;
  const set = (selector, value) => {
    document.querySelectorAll(selector).forEach((node) => { node.innerHTML = value; });
  };
  set('[data-service-kicker]', service.kicker);
  set('[data-service-title]', service.title);
  set('[data-service-lead]', service.lead);
  set('[data-service-description]', service.description);
  set('[data-service-tags]', service.tags.map((tag) => `<span class="tag">${tag}</span>`).join(''));
  set('[data-service-solutions]', service.solutions.map(([title, text], index) => `
    <article class="solution-item reveal"><span>${String(index + 1).padStart(2, '0')}</span><div><h3>${title}</h3><p>${text}</p></div></article>`).join(''));
  set('[data-service-deliverables]', service.deliverables.map(([title, text]) => `
    <article class="deliverable reveal"><h3>${title}</h3><p>${text}</p></article>`).join(''));
  const related = services.filter((item) => item.slug !== slug).sort((a, b) => Number(b.category === service.category) - Number(a.category === service.category)).slice(0, 3);
  set('[data-related-services]', related.map(createServiceCard).join(''));
  document.title = `${service.title} — WebNet`;
}

function initMenu() {
  const toggle = document.querySelector('.menu-toggle');
  if (!toggle) return;
  toggle.addEventListener('click', () => {
    const open = document.body.classList.toggle('menu-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? '×' : '☰';
  });
  document.querySelectorAll('.nav-links a').forEach((link) => link.addEventListener('click', () => {
    document.body.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = '☰';
  }));
}

function initFaq() {
  document.querySelectorAll('.faq-question').forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const open = item.classList.toggle('open');
      button.setAttribute('aria-expanded', String(open));
      answer.style.maxHeight = open ? `${answer.scrollHeight}px` : '0px';
    });
  });
}

function initContactForm() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;
  const contactInput = form.querySelector('input[name="contact"]');
  contactInput?.addEventListener('input', () => {
    contactInput.value = contactInput.value.replace(/\D/g, '').slice(0, 15);
  });
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const status = form.querySelector('.form-status');
    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    button.textContent = 'Отправляем…';
    status.className = 'form-status visible';
    status.textContent = 'Отправляем заявку в WebNet…';

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          contact: data.get('contact'),
          service: data.get('service'),
          message: data.get('message'),
          consent: data.get('consent') === 'on',
          website: data.get('website'),
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok) throw new Error(result.message || 'Ошибка отправки');

      status.className = 'form-status visible';
      status.textContent = result.message || 'Заявка отправлена. Мы свяжемся с вами.';
      form.reset();
    } catch (error) {
      status.className = 'form-status visible error';
      status.textContent = `${error instanceof Error ? error.message : 'Не удалось отправить заявку.'} `;
      const fallback = document.createElement('a');
      const message = encodeURIComponent(`Заявка с сайта: ${data.get('service') || 'новый проект'}\nИмя: ${data.get('name')}\nТелефон: ${data.get('contact')}\n\nЗадача:\n${data.get('message')}`);
      fallback.href = `https://wa.me/77078453424?text=${message}`;
      fallback.textContent = 'Связаться через WhatsApp →';
      status.append(fallback);
    } finally {
      button.disabled = false;
      button.textContent = 'Отправить заявку';
    }
  });
}

function initReveal() {
  document.querySelectorAll('.section-head, .proof-grid, .about-panel, .contact-panel, .faq-item, .legal-block').forEach((item) => item.classList.add('reveal'));
  document.querySelectorAll('.services-grid, .value-cards, .process-grid, .solution-list, .deliverables, .service-steps').forEach((group) => {
    [...group.children].forEach((item, index) => item.style.setProperty('--reveal-delay', `${Math.min(index * 70, 350)}ms`));
  });
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .08 });
  items.forEach((item) => observer.observe(item));
}

function initMotion() {
  if (!document.querySelector('.scroll-progress')) {
    const progress = document.createElement('div');
    progress.className = 'scroll-progress';
    progress.setAttribute('aria-hidden', 'true');
    document.body.append(progress);
  }
  const progress = document.querySelector('.scroll-progress');
  const update = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    const ratio = max > 0 ? Math.min(scrollY / max, 1) : 0;
    progress.style.width = `${ratio * 100}%`;
    document.body.classList.toggle('scrolled', scrollY > 24);
    document.documentElement.style.setProperty('--hero-scroll', `${Math.min(scrollY * .12, 72)}px`);
  };
  document.body.classList.add('motion-ready');
  addEventListener('scroll', update, { passive: true });
  update();
}

function initWhatsApp() {
  if (document.querySelector('.whatsapp-float')) return;
  const link = document.createElement('a');
  link.className = 'whatsapp-float';
  const greeting = encodeURIComponent('Здравствуйте! Хочу обсудить проект с WebNet.');
  link.href = `https://wa.me/77078453424?text=${greeting}`;
  link.target = '_blank';
  link.rel = 'noopener';
  link.setAttribute('aria-label', 'Открыть WhatsApp и написать WebNet');
  link.innerHTML = `
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M16.04 3C9.42 3 4.03 8.36 4.03 14.95c0 2.32.67 4.58 1.94 6.52L4 28.7l7.43-1.94a12 12 0 0 0 4.6.9h.01c6.62 0 12.01-5.36 12.01-11.95C28.05 9.12 22.66 3 16.04 3Zm0 22.64c-1.4 0-2.78-.38-3.98-1.09l-.29-.17-4.41 1.15 1.18-4.29-.19-.3a9.87 9.87 0 0 1-1.51-5.24c0-5.46 4.46-9.89 9.94-9.89 5.48 0 9.94 4.43 9.94 9.89s-4.46 9.94-9.94 9.94Zm5.45-7.42c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.09 4.49.71.31 1.27.49 1.7.63.71.23 1.36.19 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35Z"/>
    </svg>`;
  document.body.append(link);
}

function initProgramPlatforms() {
  const picker = document.querySelector('[data-platform-picker]');
  if (!picker) return;
  const buttons = [...picker.querySelectorAll('[data-platform]')];
  const panels = [...document.querySelectorAll('[data-platform-panel]')];

  const activate = (platform) => {
    buttons.forEach((button) => {
      const active = button.dataset.platform === platform;
      button.classList.toggle('active', active);
      button.setAttribute('aria-selected', String(active));
      button.tabIndex = active ? 0 : -1;
    });
    panels.forEach((panel) => { panel.hidden = panel.dataset.platformPanel !== platform; });
  };

  buttons.forEach((button, index) => {
    button.addEventListener('click', () => activate(button.dataset.platform));
    button.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'ArrowRight' ? (index + 1) % buttons.length : (index - 1 + buttons.length) % buttons.length;
      buttons[next].focus();
      activate(buttons[next].dataset.platform);
    });
  });
}

function setYear() {
  document.querySelectorAll('[data-year]').forEach((node) => { node.textContent = new Date().getFullYear(); });
}

renderServices();
renderFilters();
renderServicePage();
initMenu();
initFaq();
initContactForm();
setYear();
initMotion();
initWhatsApp();
initProgramPlatforms();
requestAnimationFrame(initReveal);
