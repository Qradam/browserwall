import type { Locale } from "./index";
import type { AxisKey, Engine, Family, OS } from "../data/browsers";

export interface UiCopy {
  skip: string;
  homeAria: string;
  navAria: string;
  nav: { wall: string; tiers: string; compare: string; quiz: string; beta: string; news: string; contact: string };
  langLabel: string;
  siteDescription: string;
  footer: {
    guidesAria: string;
    find: string;
    quiz: string;
    allGuides: string;
    moreGuides: string;
    alternatives: string;
    allAlternatives: string;
    altSuffix: string;
    vs: string;
    wall: string;
    compare: string;
    tiers: string;
    news: string;
    contact: string;
    privacy: string;
    imageLicense: string;
    cookies: string;
    fineBefore: string;
    fineLink: string;
    languages: string;
  };
  consent: {
    aria: string;
    text: string;
    privacy: string;
    decline: string;
    accept: string;
  };
  card: {
    status: { active: string; maintenance: string; discontinued: string };
    ripShort: string;
    slowShort: string;
    engineTitle: string;
    basedOnTitle: string;
    tagsAria: string;
    runsOnAria: string;
    ossTitle: string;
    onReddit: string;
    onX: string;
    sourceCode: string;
    profileAria: string;
    profileTitle: string;
    websiteAria: string;
  };
  dialog: {
    basedOn: string;
    status: { active: string; maintenance: string; discontinued: string };
    close: string;
    scores: string;
    scoresScale: string;
    outOf5: string;
    lowConfidence: string;
    whyScores: string;
    sources: string;
    noSpeedNote: string;
    engine: string;
    familySuffix: string;
    runsOn: string;
    statusLabel: string;
    source: string;
    openSource: string;
    closedSource: string;
    price: string;
    free: string;
    stars: string;
    lastCommit: string;
    channelOf: string;
    tagsAria: string;
    linksAria: string;
    fullProfile: string;
    website: string;
    sourceLink: string;
    aiAria: string;
    aiLevel: { 1: string; 2: string; 3: string };
    aiOff: { fully: string; partly: string; no: string };
    aiQuality: string;
    aiAgentPaid: string;
    aiLocal: string;
  };
  axes: Record<AxisKey, { label: string; low: string; high: string }>;
  families: Record<Family, { label: string; hint: string }>;
  tags: Record<string, string>;
  engines: Partial<Record<Engine, string>>;
  oses: Partial<Record<OS, string>>;
}

export const UI: Record<Locale, UiCopy> = {
  en: {
    skip: "Skip to content",
    homeAria: "browserwall home",
    navAria: "Main",
    nav: { wall: "Wall", tiers: "Tier maker", compare: "Compare", quiz: "Quiz", beta: "beta", news: "News", contact: "Contact" },
    langLabel: "Language",
    siteDescription: "Curated directory of desktop web browsers with editorial scores, a tier list maker and a browser recommendation quiz.",
    footer: {
      guidesAria: "Guides",
      find: "Find a browser",
      quiz: "Browser quiz",
      allGuides: "All guides",
      moreGuides: "More guides",
      alternatives: "Alternatives",
      allAlternatives: "All alternatives",
      altSuffix: "alternatives",
      vs: "vs",
      wall: "Browser wall",
      compare: "Compare browsers",
      tiers: "Tier maker",
      news: "News",
      contact: "Contact",
      privacy: "Privacy",
      imageLicense: "Image licence",
      cookies: "Cookie settings",
      fineBefore: "Logos are trademarks of their respective owners. Data curated by hand – spotted a mistake?",
      fineLink: "Get in touch",
      languages: "Languages",
    },
    consent: {
      aria: "Analytics consent",
      text: "We use Google Tag Manager for anonymous visit statistics, only if you agree.",
      privacy: "Privacy",
      decline: "Decline",
      accept: "Accept",
    },
    card: {
      status: { active: "Active", maintenance: "Maintenance", discontinued: "Discontinued" },
      ripShort: "RIP",
      slowShort: "Slow",
      engineTitle: "Engine",
      basedOnTitle: "Based on",
      tagsAria: "Tags",
      runsOnAria: "Runs on",
      ossTitle: "Open source",
      onReddit: "on Reddit",
      onX: "on X",
      sourceCode: "source code",
      profileAria: "profile and alternatives",
      profileTitle: "Full profile",
      websiteAria: "website",
    },
    dialog: {
      basedOn: "based on",
      status: { active: "Active", maintenance: "Maintenance only", discontinued: "Discontinued" },
      close: "Close",
      scores: "Scores",
      scoresScale: "1–5, editorial",
      outOf5: "out of 5",
      lowConfidence: "Rough estimate: little is known about this one yet.",
      whyScores: "Why these scores:",
      sources: "Sources:",
      noSpeedNote: "There is no speed score on purpose: mainstream browsers are within benchmark noise of each other. Lightness is about RAM and old hardware.",
      engine: "Engine",
      familySuffix: "family",
      runsOn: "Runs on",
      statusLabel: "Status",
      source: "Source",
      openSource: "Open source",
      closedSource: "Closed source",
      price: "Price",
      free: "Free",
      stars: "GitHub stars",
      lastCommit: "Last commit",
      channelOf: "Channel of",
      tagsAria: "Tags",
      linksAria: "Links",
      fullProfile: "Full profile",
      website: "Website",
      sourceLink: "Source",
      aiAria: "Built-in AI",
      aiLevel: { 1: "Basic AI (chat, summaries)", 2: "Integrated AI assistant", 3: "AI agent – can browse for you" },
      aiOff: { fully: "can be fully switched off", partly: "can only partly be switched off", no: "can't be switched off" },
      aiQuality: "quality",
      aiAgentPaid: "agent needs a paid plan",
      aiLocal: "local model option",
    },
    axes: {
      privacy: { label: "Privacy", low: "Data-hungry owner", high: "No tracking, no telemetry" },
      experience: { label: "Out-of-box experience", low: "Rough, needs setup", high: "Polished, just works" },
      customisation: { label: "Customisation", low: "Little to change", high: "Deep UI & extensions" },
      lightness: { label: "Lightness", low: "Heavy on RAM/CPU", high: "Tiny footprint" },
      minimalism: { label: "Minimalism", low: "Bundled extras", high: "Clean, few built-ins" },
    },
    families: {
      chromium: { label: "Chromium", hint: "Blink engine: Chrome, Edge, Brave, Opera…" },
      firefox: { label: "Firefox", hint: "Gecko & Goanna: Firefox and its forks" },
      webkit: { label: "WebKit", hint: "Safari and other WebKit browsers" },
      other: { label: "Own engine", hint: "Ladybird, Servo and historic engines" },
      terminal: { label: "Terminal", hint: "Text-mode browsers" },
    },
    tags: {
      privacy: "Privacy", "de-googled": "De-Googled", "ad-blocking": "Ad blocking", "security-hardened": "Hardened",
      tor: "Tor", "vertical-tabs": "Vertical tabs", workspaces: "Workspaces", "split-view": "Split view",
      "keyboard-driven": "Keyboard-driven", "power-user": "Power user", customizable: "Customizable", minimal: "Minimal",
      lightweight: "Lightweight", "old-hardware": "Old hardware", gaming: "Gaming", ai: "AI", crypto: "Crypto",
      developer: "Developer", sync: "Sync", mainstream: "Mainstream", "chrome-extensions": "Chrome extensions",
      "firefox-addons": "Firefox add-ons", "independent-engine": "Own engine", "text-mode": "Terminal",
      retro: "Retro", portable: "Portable", regional: "Regional", enterprise: "Enterprise",
      experimental: "Experimental", meme: "Meme", rip: "RIP", vpn: "Built-in VPN",
    },
    engines: {},
    oses: {},
  },

  ru: {
    skip: "Перейти к содержимому",
    homeAria: "Главная browserwall",
    navAria: "Основная навигация",
    nav: { wall: "Стена", tiers: "Тиры", compare: "Сравнить", quiz: "Тест", beta: "бета", news: "Новости", contact: "Контакт" },
    langLabel: "Язык",
    siteDescription: "Кураторский каталог десктопных браузеров с честными оценками, тир-листом и тестом для подбора браузера.",
    footer: {
      guidesAria: "Гиды",
      find: "Подобрать браузер",
      quiz: "Тест браузеров",
      allGuides: "Все гиды",
      moreGuides: "Другие гиды",
      alternatives: "Альтернативы",
      allAlternatives: "Все альтернативы",
      altSuffix: "альтернативы",
      vs: "против",
      wall: "Стена браузеров",
      compare: "Сравнение браузеров",
      tiers: "Тир-лист",
      news: "Новости",
      contact: "Контакт",
      privacy: "Конфиденциальность",
      imageLicense: "Лицензия изображений",
      cookies: "Настройки cookie",
      fineBefore: "Логотипы являются товарными знаками их владельцев. Данные собраны вручную — нашли ошибку?",
      fineLink: "Напишите нам",
      languages: "Языки",
    },
    consent: {
      aria: "Согласие на аналитику",
      text: "Мы используем Google Tag Manager для анонимной статистики посещений, только с вашего согласия.",
      privacy: "Конфиденциальность",
      decline: "Отклонить",
      accept: "Принять",
    },
    card: {
      status: { active: "Активен", maintenance: "Поддержка", discontinued: "Закрыт" },
      ripShort: "RIP",
      slowShort: "Редко",
      engineTitle: "Движок",
      basedOnTitle: "На базе",
      tagsAria: "Теги",
      runsOnAria: "Работает на",
      ossTitle: "Открытый код",
      onReddit: "на Reddit",
      onX: "в X",
      sourceCode: "исходный код",
      profileAria: "профиль и альтернативы",
      profileTitle: "Полный профиль",
      websiteAria: "сайт",
    },
    dialog: {
      basedOn: "на базе",
      status: { active: "Активен", maintenance: "Только обновления безопасности", discontinued: "Закрыт" },
      close: "Закрыть",
      scores: "Оценки",
      scoresScale: "1–5, редакционные",
      outOf5: "из 5",
      lowConfidence: "Примерная оценка: об этом браузере пока мало данных.",
      whyScores: "Почему такие оценки:",
      sources: "Источники:",
      noSpeedNote: "Оценки скорости нет намеренно: современные браузеры в пределах погрешности бенчмарков. Лёгкость отражает расход ОЗУ и работу на старом ПК.",
      engine: "Движок",
      familySuffix: "семейство",
      runsOn: "Системы",
      statusLabel: "Статус",
      source: "Код",
      openSource: "Открытый код",
      closedSource: "Закрытый код",
      price: "Цена",
      free: "Бесплатно",
      stars: "Звёзды GitHub",
      lastCommit: "Последний коммит",
      channelOf: "Канал браузера",
      tagsAria: "Теги",
      linksAria: "Ссылки",
      fullProfile: "Полный профиль",
      website: "Сайт",
      sourceLink: "Исходники",
      aiAria: "Встроенный ИИ",
      aiLevel: { 1: "Базовый ИИ (чат, сводки)", 2: "Встроенный ИИ-ассистент", 3: "ИИ-агент — действует в браузере сам" },
      aiOff: { fully: "можно полностью отключить", partly: "отключается только частично", no: "нельзя отключить" },
      aiQuality: "качество",
      aiAgentPaid: "агент требует подписки",
      aiLocal: "есть локальная модель",
    },
    axes: {
      privacy: { label: "Приватность", low: "Сбор данных", high: "Без трекинга и телеметрии" },
      experience: { label: "Из коробки", low: "Сыроват, нужна настройка", high: "Отполирован, всё работает" },
      customisation: { label: "Кастомизация", low: "Мало настроек", high: "Гибкий UI и расширения" },
      lightness: { label: "Лёгкость", low: "Тяжёлый для ОЗУ/ЦП", high: "Минимальный расход" },
      minimalism: { label: "Минимализм", low: "Много лишнего", high: "Чистый, без довесков" },
    },
    families: {
      chromium: { label: "Chromium", hint: "Движок Blink: Chrome, Edge, Brave, Opera…" },
      firefox: { label: "Firefox", hint: "Gecko и Goanna: Firefox и его форки" },
      webkit: { label: "WebKit", hint: "Safari и другие браузеры на WebKit" },
      other: { label: "Свой движок", hint: "Ladybird, Servo и исторические движки" },
      terminal: { label: "Терминал", hint: "Текстовые браузеры" },
    },
    tags: {
      privacy: "Приватность", "de-googled": "Без Google", "ad-blocking": "Блокировка рекламы", "security-hardened": "Защищённый",
      tor: "Tor", "vertical-tabs": "Вертикальные вкладки", workspaces: "Пространства", "split-view": "Разделение экрана",
      "keyboard-driven": "С клавиатуры", "power-user": "Для профи", customizable: "Кастомизация", minimal: "Минимализм",
      lightweight: "Лёгкий", "old-hardware": "Старое железо", gaming: "Игровой", ai: "ИИ", crypto: "Крипта",
      developer: "Для разработчиков", sync: "Синхронизация", mainstream: "Массовый", "chrome-extensions": "Расширения Chrome",
      "firefox-addons": "Дополнения Firefox", "independent-engine": "Свой движок", "text-mode": "Терминал",
      retro: "Ретро", portable: "Портативный", regional: "Региональный", enterprise: "Корпоративный",
      experimental: "Эксперимент", meme: "Мем", rip: "RIP", vpn: "Встроенный VPN",
    },
    engines: { text: "Текст", other: "Другой" },
    oses: { other: "Другая" },
  },

  fr: {
    skip: "Aller au contenu",
    homeAria: "Accueil browserwall",
    navAria: "Navigation principale",
    nav: { wall: "Mur", tiers: "Tiers", compare: "Comparer", quiz: "Quiz", beta: "bêta", news: "Actus", contact: "Contact" },
    langLabel: "Langue",
    siteDescription: "Annuaire de navigateurs de bureau avec notes éditoriales, créateur de tier list et quiz de recommandation.",
    footer: {
      guidesAria: "Guides",
      find: "Trouver un navigateur",
      quiz: "Quiz navigateur",
      allGuides: "Tous les guides",
      moreGuides: "Plus de guides",
      alternatives: "Alternatives",
      allAlternatives: "Toutes les alternatives",
      altSuffix: "alternatives",
      vs: "vs",
      wall: "Mur des navigateurs",
      compare: "Comparer les navigateurs",
      tiers: "Tier maker",
      news: "Actualités",
      contact: "Contact",
      privacy: "Confidentialité",
      imageLicense: "Licence des images",
      cookies: "Paramètres des cookies",
      fineBefore: "Les logos sont des marques de leurs propriétaires respectifs. Données vérifiées à la main – une erreur ?",
      fineLink: "Contactez-nous",
      languages: "Langues",
    },
    consent: {
      aria: "Consentement analytique",
      text: "Nous utilisons Google Tag Manager pour des statistiques de visite anonymes, uniquement avec votre accord.",
      privacy: "Confidentialité",
      decline: "Refuser",
      accept: "Accepter",
    },
    card: {
      status: { active: "Actif", maintenance: "Maintenance", discontinued: "Abandonné" },
      ripShort: "RIP",
      slowShort: "Lent",
      engineTitle: "Moteur",
      basedOnTitle: "Basé sur",
      tagsAria: "Tags",
      runsOnAria: "Compatible",
      ossTitle: "Open source",
      onReddit: "sur Reddit",
      onX: "sur X",
      sourceCode: "code source",
      profileAria: "fiche et alternatives",
      profileTitle: "Fiche complète",
      websiteAria: "site web",
    },
    dialog: {
      basedOn: "basé sur",
      status: { active: "Actif", maintenance: "Maintenance uniquement", discontinued: "Abandonné" },
      close: "Fermer",
      scores: "Notes",
      scoresScale: "1–5, éditorial",
      outOf5: "sur 5",
      lowConfidence: "Estimation approximative : encore peu de retours sur celui-ci.",
      whyScores: "Pourquoi ces notes :",
      sources: "Sources :",
      noSpeedNote: "Il n'y a volontairement pas de note de vitesse : les navigateurs courants se tiennent dans la marge d'erreur des benchmarks. La légèreté mesure la RAM et les anciens PC.",
      engine: "Moteur",
      familySuffix: "famille",
      runsOn: "Systèmes",
      statusLabel: "Statut",
      source: "Code",
      openSource: "Open source",
      closedSource: "Propriétaire",
      price: "Prix",
      free: "Gratuit",
      stars: "Étoiles GitHub",
      lastCommit: "Dernier commit",
      channelOf: "Canal de",
      tagsAria: "Tags",
      linksAria: "Liens",
      fullProfile: "Fiche complète",
      website: "Site web",
      sourceLink: "Code source",
      aiAria: "IA intégrée",
      aiLevel: { 1: "IA basique (chat, résumés)", 2: "Assistant IA intégré", 3: "Agent IA – navigue pour vous" },
      aiOff: { fully: "désactivable entièrement", partly: "désactivable en partie", no: "non désactivable" },
      aiQuality: "qualité",
      aiAgentPaid: "l'agent exige un forfait payant",
      aiLocal: "option modèle local",
    },
    axes: {
      privacy: { label: "Vie privée", low: "Modèle axé données", high: "Sans pistage ni télémétrie" },
      experience: { label: "Prêt à l'emploi", low: "Brut, à configurer", high: "Soigné, fonctionne d'emblée" },
      customisation: { label: "Personnalisation", low: "Peu modulable", high: "UI profonde et extensions" },
      lightness: { label: "Légèreté", low: "Gourmand en RAM/CPU", high: "Empreinte minimale" },
      minimalism: { label: "Minimalisme", low: "Nombreux ajouts", high: "Épuré, peu d'options superflues" },
    },
    families: {
      chromium: { label: "Chromium", hint: "Moteur Blink : Chrome, Edge, Brave, Opera…" },
      firefox: { label: "Firefox", hint: "Gecko et Goanna : Firefox et ses forks" },
      webkit: { label: "WebKit", hint: "Safari et autres navigateurs WebKit" },
      other: { label: "Moteur propre", hint: "Ladybird, Servo et moteurs historiques" },
      terminal: { label: "Terminal", hint: "Navigateurs en mode texte" },
    },
    tags: {
      privacy: "Vie privée", "de-googled": "Dégooglisé", "ad-blocking": "Anti-pub", "security-hardened": "Renforcé",
      tor: "Tor", "vertical-tabs": "Onglets verticaux", workspaces: "Espaces", "split-view": "Vue scindée",
      "keyboard-driven": "Clavier / Vim", "power-user": "Avancé", customizable: "Personnalisable", minimal: "Minimal",
      lightweight: "Léger", "old-hardware": "Vieux matériel", gaming: "Gaming", ai: "IA", crypto: "Crypto",
      developer: "Développeur", sync: "Synchro", mainstream: "Grand public", "chrome-extensions": "Extensions Chrome",
      "firefox-addons": "Modules Firefox", "independent-engine": "Moteur propre", "text-mode": "Terminal",
      retro: "Rétro", portable: "Portable", regional: "Régional", enterprise: "Entreprise",
      experimental: "Expérimental", meme: "Mème", rip: "RIP", vpn: "VPN intégré",
    },
    engines: { text: "Texte", other: "Autre" },
    oses: { other: "Autre" },
  },

  pt: {
    skip: "Ir para o conteúdo",
    homeAria: "Início browserwall",
    navAria: "Navegação principal",
    nav: { wall: "Mural", tiers: "Tiers", compare: "Comparar", quiz: "Quiz", beta: "beta", news: "Notícias", contact: "Contato" },
    langLabel: "Idioma",
    siteDescription: "Diretório curado de navegadores de desktop com notas editoriais, criador de tier list e um quiz para achar o seu.",
    footer: {
      guidesAria: "Guias",
      find: "Encontrar navegador",
      quiz: "Quiz de navegadores",
      allGuides: "Todos os guias",
      moreGuides: "Mais guias",
      alternatives: "Alternativas",
      allAlternatives: "Todas as alternativas",
      altSuffix: "alternativas",
      vs: "vs",
      wall: "Mural de navegadores",
      compare: "Comparar navegadores",
      tiers: "Tier maker",
      news: "Notícias",
      contact: "Contato",
      privacy: "Privacidade",
      imageLicense: "Licença das imagens",
      cookies: "Configurações de cookies",
      fineBefore: "Logotipos são marcas registradas de seus respectivos donos. Dados curados à mão – achou um erro?",
      fineLink: "Fale conosco",
      languages: "Idiomas",
    },
    consent: {
      aria: "Consentimento de análise",
      text: "Usamos o Google Tag Manager para estatísticas anônimas de acesso, somente se você concordar.",
      privacy: "Privacidade",
      decline: "Recusar",
      accept: "Aceitar",
    },
    card: {
      status: { active: "Ativo", maintenance: "Manutenção", discontinued: "Descontinuado" },
      ripShort: "RIP",
      slowShort: "Lento",
      engineTitle: "Motor",
      basedOnTitle: "Baseado em",
      tagsAria: "Tags",
      runsOnAria: "Roda em",
      ossTitle: "Código aberto",
      onReddit: "no Reddit",
      onX: "no X",
      sourceCode: "código-fonte",
      profileAria: "perfil e alternativas",
      profileTitle: "Perfil completo",
      websiteAria: "site oficial",
    },
    dialog: {
      basedOn: "baseado em",
      status: { active: "Ativo", maintenance: "Só manutenção", discontinued: "Descontinuado" },
      close: "Fechar",
      scores: "Notas",
      scoresScale: "1–5, editorial",
      outOf5: "de 5",
      lowConfidence: "Estimativa aproximada: ainda há poucos dados sobre este navegador.",
      whyScores: "Por que essas notas:",
      sources: "Fontes:",
      noSpeedNote: "Não há nota de velocidade de propósito: navegadores comuns empatam dentro da margem de erro. Leveza mede RAM e hardware antigo.",
      engine: "Motor",
      familySuffix: "família",
      runsOn: "Sistemas",
      statusLabel: "Status",
      source: "Código",
      openSource: "Código aberto",
      closedSource: "Código fechado",
      price: "Preço",
      free: "Gratuito",
      stars: "Estrelas GitHub",
      lastCommit: "Último commit",
      channelOf: "Canal do",
      tagsAria: "Tags",
      linksAria: "Links",
      fullProfile: "Perfil completo",
      website: "Site",
      sourceLink: "Código",
      aiAria: "IA integrada",
      aiLevel: { 1: "IA básica (chat, resumos)", 2: "Assistente de IA integrado", 3: "Agente de IA – navega por você" },
      aiOff: { fully: "pode ser totalmente desativada", partly: "desativável só em parte", no: "não pode ser desativada" },
      aiQuality: "qualidade",
      aiAgentPaid: "agente exige plano pago",
      aiLocal: "opção de modelo local",
    },
    axes: {
      privacy: { label: "Privacidade", low: "Dono coleta dados", high: "Sem rastreio ou telemetria" },
      experience: { label: "Pronto para uso", low: "Cru, pede ajustes", high: "Polido, só usar" },
      customisation: { label: "Personalização", low: "Pouco ajustável", high: "Interface e extensões profundas" },
      lightness: { label: "Leveza", low: "Pesado em RAM/CPU", high: "Consumo mínimo" },
      minimalism: { label: "Minimalismo", low: "Cheio de extras", high: "Limpo, poucos recursos extras" },
    },
    families: {
      chromium: { label: "Chromium", hint: "Motor Blink: Chrome, Edge, Brave, Opera…" },
      firefox: { label: "Firefox", hint: "Gecko e Goanna: Firefox e seus forks" },
      webkit: { label: "WebKit", hint: "Safari e outros navegadores WebKit" },
      other: { label: "Motor próprio", hint: "Ladybird, Servo e motores históricos" },
      terminal: { label: "Terminal", hint: "Navegadores em modo texto" },
    },
    tags: {
      privacy: "Privacidade", "de-googled": "Sem Google", "ad-blocking": "Bloqueio de anúncios", "security-hardened": "Reforçado",
      tor: "Tor", "vertical-tabs": "Abas verticais", workspaces: "Espaços", "split-view": "Tela dividida",
      "keyboard-driven": "Pelo teclado", "power-user": "Avançado", customizable: "Personalizável", minimal: "Minimalista",
      lightweight: "Leve", "old-hardware": "Hardware antigo", gaming: "Gamer", ai: "IA", crypto: "Cripto",
      developer: "Desenvolvedor", sync: "Sincronização", mainstream: "Popular", "chrome-extensions": "Extensões Chrome",
      "firefox-addons": "Extensões Firefox", "independent-engine": "Motor próprio", "text-mode": "Terminal",
      retro: "Retrô", portable: "Portátil", regional: "Regional", enterprise: "Corporativo",
      experimental: "Experimental", meme: "Meme", rip: "RIP", vpn: "VPN integrada",
    },
    engines: { text: "Texto", other: "Outro" },
    oses: { other: "Outro" },
  },

  cs: {
    skip: "Přejít na obsah",
    homeAria: "Domů browserwall",
    navAria: "Hlavní navigace",
    nav: { wall: "Zeď", tiers: "Tiery", compare: "Srovnat", quiz: "Kvíz", beta: "beta", news: "Novinky", contact: "Kontakt" },
    langLabel: "Jazyk",
    siteDescription: "Ručně kurátorovaný přehled desktopových prohlížečů s hodnocením, tier listem a kvízem na výběr prohlížeče.",
    footer: {
      guidesAria: "Průvodci",
      find: "Najít prohlížeč",
      quiz: "Kvíz prohlížečů",
      allGuides: "Všichni průvodci",
      moreGuides: "Další průvodci",
      alternatives: "Alternativy",
      allAlternatives: "Všechny alternativy",
      altSuffix: "alternativy",
      vs: "vs",
      wall: "Zeď prohlížečů",
      compare: "Porovnat prohlížeče",
      tiers: "Tier maker",
      news: "Novinky",
      contact: "Kontakt",
      privacy: "Soukromí",
      imageLicense: "Licence obrázků",
      cookies: "Nastavení cookies",
      fineBefore: "Loga jsou ochranné známky jejich vlastníků. Data spravovaná ručně – našli jste chybu?",
      fineLink: "Napište nám",
      languages: "Jazyky",
    },
    consent: {
      aria: "Souhlas s analytikou",
      text: "Pro anonymní statistiky návštěvnosti používáme Google Tag Manager, pouze s vaším souhlasem.",
      privacy: "Soukromí",
      decline: "Odmítnout",
      accept: "Přijmout",
    },
    card: {
      status: { active: "Aktivní", maintenance: "Údržba", discontinued: "Ukončený" },
      ripShort: "RIP",
      slowShort: "Pomalu",
      engineTitle: "Jádro",
      basedOnTitle: "Založeno na",
      tagsAria: "Štítky",
      runsOnAria: "Běží na",
      ossTitle: "Open source",
      onReddit: "na Redditu",
      onX: "na X",
      sourceCode: "zdrojový kód",
      profileAria: "profil a alternativy",
      profileTitle: "Celý profil",
      websiteAria: "web",
    },
    dialog: {
      basedOn: "založeno na",
      status: { active: "Aktivní", maintenance: "Jen údržba", discontinued: "Ukončený" },
      close: "Zavřít",
      scores: "Hodnocení",
      scoresScale: "1–5, redakční",
      outOf5: "z 5",
      lowConfidence: "Hrubý odhad: o tomto prohlížeči je zatím málo informací.",
      whyScores: "Proč tato čísla:",
      sources: "Zdroje:",
      noSpeedNote: "Hodnocení rychlosti chybí záměrně: běžné prohlížeče jsou v rámci odchylky měření nastejno. Lehkost hodnotí RAM a starší hardware.",
      engine: "Jádro",
      familySuffix: "rodina",
      runsOn: "Systémy",
      statusLabel: "Stav",
      source: "Kód",
      openSource: "Open source",
      closedSource: "Uzavřený kód",
      price: "Cena",
      free: "Zdarma",
      stars: "GitHub hvězdy",
      lastCommit: "Poslední commit",
      channelOf: "Kanál prohlížeče",
      tagsAria: "Štítky",
      linksAria: "Odkazy",
      fullProfile: "Celý profil",
      website: "Web",
      sourceLink: "Zdroj",
      aiAria: "Vestavěná AI",
      aiLevel: { 1: "Základní AI (chat, shrnutí)", 2: "Integrovaný AI asistent", 3: "AI agent – prohlíží za vás" },
      aiOff: { fully: "lze zcela vypnout", partly: "lze vypnout jen částečně", no: "nelze vypnout" },
      aiQuality: "kvalita",
      aiAgentPaid: "agent vyžaduje placený tarif",
      aiLocal: "podpora lokálních modelů",
    },
    axes: {
      privacy: { label: "Soukromí", low: "Sběr dat pro byznys", high: "Bez sledování a telemetrie" },
      experience: { label: "Po vybalení", low: "Syrový, chce nastavení", high: "Vyladěný, hned funguje" },
      customisation: { label: "Přizpůsobení", low: "Málo možností", high: "Hluboké úpravy a doplňky" },
      lightness: { label: "Lehkost", low: "Náročný na RAM/CPU", high: "Minimální nároky" },
      minimalism: { label: "Minimalismus", low: "Spousta balastu", high: "Čistý, minimum funkcí navíc" },
    },
    families: {
      chromium: { label: "Chromium", hint: "Jádro Blink: Chrome, Edge, Brave, Opera…" },
      firefox: { label: "Firefox", hint: "Gecko a Goanna: Firefox a jeho forky" },
      webkit: { label: "WebKit", hint: "Safari a další WebKit prohlížeče" },
      other: { label: "Vlastní jádro", hint: "Ladybird, Servo a historická jádra" },
      terminal: { label: "Terminál", hint: "Textové prohlížeče" },
    },
    tags: {
      privacy: "Soukromí", "de-googled": "Bez Googlu", "ad-blocking": "Blokování reklam", "security-hardened": "Zabezpečený",
      tor: "Tor", "vertical-tabs": "Svislé karty", workspaces: "Pracovní plochy", "split-view": "Rozdělený pohled",
      "keyboard-driven": "Klávesnicí", "power-user": "Pro pokročilé", customizable: "Přizpůsobitelný", minimal: "Minimalistický",
      lightweight: "Lehký", "old-hardware": "Starší PC", gaming: "Herní", ai: "AI", crypto: "Krypto",
      developer: "Pro vývojáře", sync: "Synchronizace", mainstream: "Masový", "chrome-extensions": "Doplňky Chrome",
      "firefox-addons": "Doplňky Firefox", "independent-engine": "Vlastní jádro", "text-mode": "Terminál",
      retro: "Retro", portable: "Přenosný", regional: "Regionální", enterprise: "Firemní",
      experimental: "Experimentální", meme: "Meme", rip: "RIP", vpn: "Vestavěná VPN",
    },
    engines: { text: "Textový", other: "Jiné" },
    oses: { other: "Jiné" },
  },
};
