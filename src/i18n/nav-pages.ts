import type { Locale } from "./index";

export interface CompareI18n {
  metaTitle: (year: number) => string;
  metaDesc: (updated: string) => string;
  crumb: string;
  kicker: string;
  h1: string;
  lede: (updated: string) => string;
  pickHeading: string;
  trayAria: string;
  pickPlaceholder: string;
  optionalPlaceholder: string;
  removeAria: (name: string) => string;
  searchLabel: string;
  searchPlaceholder: string;
  hintDefault: (max: number) => string;
  showAll: (n: number) => string;
  showFewer: string;
  categoryCol: string;
  betterLabel: string;
  fullComparison: string;
  chooseIf: string;
  popularTitle: string;
  faqTitle: string;
  faq: { q: string; a: string }[];
  js: {
    maxReached: string;
    pickAtLeast2: string;
    removeAria: string;
    pickBrowser: string;
    optional: string;
    categoryCol: string;
    fullComparison: string;
    chooseIf: string;
    noClearLead: string;
    showFewer: string;
    showAll: string;
  };
  engine: {
    axes: Record<"privacy" | "experience" | "customisation" | "lightness" | "minimalism", { label: string; why: string }>;
    features: Record<
      "ad-blocking" | "vertical-tabs" | "workspaces" | "split-view" | "keyboard-driven" | "vpn" | "tor" | "de-googled" | "security-hardened" | "sync" | "portable",
      { label: string; want: string }
    >;
    aiLevel: { 1: string; 2: string; 3: string };
    aiDisable: { fully: string; partly: string; no: string };
    aiNone: string;
    extChrome: string;
    extFirefox: string;
    extLimited: string;
    runsOn: string;
    engineLabel: string;
    extensionsLabel: string;
    priceLabel: string;
    free: string;
    sourceLabel: string;
    openSource: string;
    closedSource: string;
    aiLabel: string;
    featuresLabel: string;
    statusLabel: string;
    status: { active: string; maintenance: string; discontinued: string };
    whyActive: string;
    whyStatusDiscontinued: string;
    whyStatusMaintenance: string;
    whyOs: string;
    orWord: string;
    andWord: string;
    whyChromeExt: string;
    whyFirefoxExt: string;
    whyFree: string;
    whyOss: string;
    whyHasAi: string;
    whyNoAi: string;
    whyStrongerAi: string;
    whyAiAgent: string;
    whyWant: string;
    whyKnown: string;
  };
}

export interface NewsIndexCopy {
  metaTitle: string;
  metaDesc: string;
  crumb: string;
  ldName: string;
  kicker: string;
  h1: string;
  ledeBefore: string;
  rssLink: string;
  kinds: { release: string; industry: string; site: string };
}

export interface ContactPageCopy {
  metaTitle: string;
  metaDesc: string;
  kicker: string;
  h1: string;
  sub: string;
  copy: string;
  copied: string;
  copyFailed: string;
  topics: { title: string; text: string }[];
  sections: { h: string; p: string }[];
}

export const COMPARE_I18N: Record<Locale, CompareI18n> = {
  en: {
    metaTitle: (y) => `Compare browsers side by side (${y})`,
    metaDesc: (u) => `Compare up to four desktop browsers side by side: privacy, polish, customisation, RAM use, extensions, AI and price. Plus head-to-heads like Chrome vs Firefox and Brave vs Chrome. Updated ${u}.`,
    crumb: "Compare",
    kicker: "Compare",
    h1: "Compare browsers side by side",
    lede: (u) => `Pick two to four browsers to see how they stack up on privacy, polish, customisation, RAM use, extensions, AI and price. Updated ${u}.`,
    pickHeading: "Pick browsers",
    trayAria: "Selected browsers",
    pickPlaceholder: "Pick a browser",
    optionalPlaceholder: "Optional",
    removeAria: (n) => `Remove ${n}`,
    searchLabel: "Search browsers",
    searchPlaceholder: "Search browsers",
    hintDefault: (max) => `Click up to ${max} browsers. Click again to remove.`,
    showAll: (n) => `Show all ${n} browsers`,
    showFewer: "Show fewer",
    categoryCol: "Category",
    betterLabel: "Better",
    fullComparison: "Read the full {pair} comparison →",
    chooseIf: "Choose {name} if…",
    popularTitle: "Popular comparisons",
    faqTitle: "FAQ",
    faq: [
      { q: "How are browsers compared?", a: "Every browser gets five hand-checked 1–5 scores – privacy, out-of-box experience, customisation, lightness and minimalism – plus facts like supported systems, engine, extension store, price, source code and built-in AI. The table marks the best value in each row; the \"choose if\" lists come from the biggest differences." },
      { q: "Why is there no speed score?", a: "Mainstream browsers are within benchmark noise of each other on speed, and results change with every release. Lightness (RAM and CPU footprint) matters more day to day, so that's what we score." },
      { q: "Which browser is the best overall?", a: "It depends on your OS, the extensions you need and how much you care about privacy versus polish. The browser quiz weighs all of that and gives you a ranked shortlist in about two minutes." },
    ],
    js: {
      maxReached: "You can compare up to {max} browsers. Remove one first.",
      pickAtLeast2: "Pick at least two browsers to compare.",
      removeAria: "Remove {name}",
      pickBrowser: "Pick a browser",
      optional: "Optional",
      categoryCol: "Category",
      fullComparison: "Read the full {pair} comparison →",
      chooseIf: "Choose {name} if…",
      noClearLead: "It doesn't clearly beat {other} on anything we score.",
      showFewer: "Show fewer",
      showAll: "Show all {n} browsers",
    },
    engine: {
      axes: {
        privacy: { label: "Privacy", why: "you want more privacy out of the box" },
        experience: { label: "Out-of-box experience", why: "you want something polished that just works" },
        customisation: { label: "Customisation", why: "you like to tweak layouts, themes and settings" },
        lightness: { label: "Lightness", why: "you want lower RAM and CPU use" },
        minimalism: { label: "Minimalism", why: "you want fewer bundled extras" },
      },
      features: {
        "ad-blocking": { label: "Ad blocker", want: "a built-in ad blocker" },
        "vertical-tabs": { label: "Vertical tabs", want: "vertical tabs without an extension" },
        workspaces: { label: "Workspaces", want: "workspaces to separate projects" },
        "split-view": { label: "Split view", want: "split view for two pages side by side" },
        "keyboard-driven": { label: "Keyboard / Vim control", want: "to drive the browser from the keyboard" },
        vpn: { label: "Built-in VPN", want: "a built-in VPN" },
        tor: { label: "Tor", want: "Tor built in" },
        "de-googled": { label: "No Google services", want: "no Google services at all" },
        "security-hardened": { label: "Hardened", want: "hardened security settings" },
        sync: { label: "Sync", want: "built-in sync across devices" },
        portable: { label: "Portable", want: "a portable build" },
      },
      aiLevel: { 1: "Basic chat / summaries", 2: "Integrated assistant", 3: "AI agent" },
      aiDisable: { fully: "can be switched off", partly: "partly switchable", no: "can't be switched off" },
      aiNone: "None",
      extChrome: "Chrome Web Store",
      extFirefox: "Firefox add-ons",
      extLimited: "Limited or none",
      runsOn: "Runs on",
      engineLabel: "Engine",
      extensionsLabel: "Extensions",
      priceLabel: "Price",
      free: "Free",
      sourceLabel: "Source code",
      openSource: "Open source",
      closedSource: "Closed source",
      aiLabel: "Built-in AI",
      featuresLabel: "Built-in features",
      statusLabel: "Status",
      status: { active: "Actively developed", maintenance: "Maintenance mode", discontinued: "Discontinued" },
      whyActive: "you want a browser that's still actively developed ({other} is {status})",
      whyStatusDiscontinued: "discontinued",
      whyStatusMaintenance: "in maintenance mode",
      whyOs: "you're on {os} – {other} doesn't run there",
      orWord: " or ",
      andWord: " and ",
      whyChromeExt: "you rely on Chrome Web Store extensions",
      whyFirefoxExt: "you want Firefox add-ons, including the full uBlock Origin",
      whyFree: "you don't want to pay ({other}: {price})",
      whyOss: "you want open-source code anyone can audit",
      whyHasAi: "you want a built-in AI assistant",
      whyNoAi: "you'd rather have no built-in AI at all",
      whyStrongerAi: "you want a stronger AI assistant ({a}/5 vs {b}/5)",
      whyAiAgent: "you want an AI agent that can click through sites for you",
      whyWant: "you want {list}",
      whyKnown: "you prefer a well-known browser with a big user base",
    },
  },

  ru: {
    metaTitle: (y) => `Сравнение браузеров лицом к лицу (${y})`,
    metaDesc: (u) => `Сравните до четырёх десктопных браузеров рядом: приватность, удобство, кастомизация, расход ОЗУ, расширения, ИИ и цена. Плюс разборы Chrome vs Firefox и Brave vs Chrome. Обновлено: ${u}.`,
    crumb: "Сравнение",
    kicker: "Сравнение",
    h1: "Сравните браузеры лицом к лицу",
    lede: (u) => `Выберите от двух до четырёх браузеров, чтобы сравнить приватность, удобство, кастомизацию, расход ОЗУ, расширения, ИИ и цену. Обновлено: ${u}.`,
    pickHeading: "Выбор браузеров",
    trayAria: "Выбранные браузеры",
    pickPlaceholder: "Выберите браузер",
    optionalPlaceholder: "Необязательно",
    removeAria: (n) => `Убрать ${n}`,
    searchLabel: "Поиск браузеров",
    searchPlaceholder: "Поиск браузеров",
    hintDefault: (max) => `Нажмите на 2–${max} браузера. Повторный клик убирает из сравнения.`,
    showAll: (n) => `Показать все ${n} браузеров`,
    showFewer: "Скрыть лишние",
    categoryCol: "Категория",
    betterLabel: "Лучше",
    fullComparison: "Подробное сравнение {pair} →",
    chooseIf: "Выберите {name}, если…",
    popularTitle: "Популярные сравнения",
    faqTitle: "Вопросы и ответы",
    faq: [
      { q: "Как сравниваются браузеры?", a: "У каждого браузера есть пять проверенных вручную оценок 1–5 (приватность, удобство из коробки, кастомизация, лёгкость и минимализм), а также факты: поддерживаемые ОС, движок, магазин расширений, цена, открытость кода и встроенный ИИ. В таблице выделен лучший показатель в строке." },
      { q: "Почему нет оценки скорости?", a: "Современные браузеры идут в пределах погрешности бенчмарков, а цифры меняются с каждым релизом. На практике куда важнее лёгкость — расход ОЗУ и нагрузки на ЦП." },
      { q: "Какой браузер лучше в целом?", a: "Зависит от вашей ОС, нужных расширений и баланса между приватностью и удобством. Тест браузеров учтёт всё это и выдаст личный топ за пару минут." },
    ],
    js: {
      maxReached: "Можно сравнить до {max} браузеров. Сначала уберите один.",
      pickAtLeast2: "Выберите хотя бы два браузера для сравнения.",
      removeAria: "Убрать {name}",
      pickBrowser: "Выберите браузер",
      optional: "Необязательно",
      categoryCol: "Категория",
      fullComparison: "Подробное сравнение {pair} →",
      chooseIf: "Выберите {name}, если…",
      noClearLead: "По нашим оценкам у него нет явного перевеса над {other}.",
      showFewer: "Скрыть лишние",
      showAll: "Показать все {n} браузеров",
    },
    engine: {
      axes: {
        privacy: { label: "Приватность", why: "вам нужна лучшая приватность по умолчанию" },
        experience: { label: "Из коробки", why: "нужен отполированный браузер, который просто работает" },
        customisation: { label: "Кастомизация", why: "любите настраивать интерфейс, темы и параметры" },
        lightness: { label: "Лёгкость", why: "важен меньший расход ОЗУ и ЦП" },
        minimalism: { label: "Минимализм", why: "хочется меньше встроенного лишнего" },
      },
      features: {
        "ad-blocking": { label: "Блокировка рекламы", want: "встроенный блокировщик рекламы" },
        "vertical-tabs": { label: "Вертикальные вкладки", want: "вертикальные вкладки без расширений" },
        workspaces: { label: "Пространства", want: "рабочие пространства для разделения задач" },
        "split-view": { label: "Разделение экрана", want: "разделение экрана для двух страниц" },
        "keyboard-driven": { label: "С клавиатуры / Vim", want: "управление браузером с клавиатуры" },
        vpn: { label: "Встроенный VPN", want: "встроенный VPN" },
        tor: { label: "Tor", want: "встроенная сеть Tor" },
        "de-googled": { label: "Без Google", want: "полное отсутствие сервисов Google" },
        "security-hardened": { label: "Защищённый", want: "усиленные настройки безопасности" },
        sync: { label: "Синхронизация", want: "встроенная синхронизация между устройствами" },
        portable: { label: "Портативный", want: "портативная сборка" },
      },
      aiLevel: { 1: "Базовый чат / сводки", 2: "Встроенный ассистент", 3: "ИИ-агент" },
      aiDisable: { fully: "можно отключить", partly: "отключается частично", no: "нельзя отключить" },
      aiNone: "Нет",
      extChrome: "Chrome Web Store",
      extFirefox: "Дополнения Firefox",
      extLimited: "Ограничено или нет",
      runsOn: "Системы",
      engineLabel: "Движок",
      extensionsLabel: "Расширения",
      priceLabel: "Цена",
      free: "Бесплатно",
      sourceLabel: "Исходный код",
      openSource: "Открытый код",
      closedSource: "Закрытый код",
      aiLabel: "Встроенный ИИ",
      featuresLabel: "Встроенные функции",
      statusLabel: "Статус",
      status: { active: "Активно развивается", maintenance: "Режим поддержки", discontinued: "Закрыт" },
      whyActive: "нужен активно развиваемый браузер ({other} — {status})",
      whyStatusDiscontinued: "закрыт",
      whyStatusMaintenance: "только на поддержке",
      whyOs: "у вас {os} — {other} там не работает",
      orWord: " или ",
      andWord: " и ",
      whyChromeExt: "вы полагаетесь на расширения Chrome Web Store",
      whyFirefoxExt: "нужны дополнения Firefox, включая полный uBlock Origin",
      whyFree: "не хотите платить ({other}: {price})",
      whyOss: "нужен открытый код, доступный для аудита",
      whyHasAi: "нужен встроенный ИИ-ассистент",
      whyNoAi: "предпочитаете браузер совсем без встроенного ИИ",
      whyStrongerAi: "нужен более сильный ИИ-ассистент ({a}/5 против {b}/5)",
      whyAiAgent: "нужен ИИ-агент, способный кликать по сайтам за вас",
      whyWant: "вам нужны: {list}",
      whyKnown: "предпочитаете известный браузер с большой аудиторией",
    },
  },

  fr: {
    metaTitle: (y) => `Comparer les navigateurs côte à côte (${y})`,
    metaDesc: (u) => `Comparez jusqu'à quatre navigateurs de bureau côte à côte : vie privée, finition, personnalisation, RAM, extensions, IA et prix. Mis à jour en ${u}.`,
    crumb: "Comparer",
    kicker: "Comparateur",
    h1: "Comparer les navigateurs côte à côte",
    lede: (u) => `Choisissez deux à quatre navigateurs pour comparer vie privée, finition, personnalisation, RAM, extensions, IA et prix. Mis à jour : ${u}.`,
    pickHeading: "Choisir les navigateurs",
    trayAria: "Navigateurs sélectionnés",
    pickPlaceholder: "Choisir",
    optionalPlaceholder: "Optionnel",
    removeAria: (n) => `Retirer ${n}`,
    searchLabel: "Rechercher des navigateurs",
    searchPlaceholder: "Rechercher un navigateur",
    hintDefault: (max) => `Cliquez jusqu'à ${max} navigateurs. Cliquez à nouveau pour retirer.`,
    showAll: (n) => `Afficher les ${n} navigateurs`,
    showFewer: "Afficher moins",
    categoryCol: "Catégorie",
    betterLabel: "Meilleur",
    fullComparison: "Lire le duel complet {pair} →",
    chooseIf: "Choisissez {name} si…",
    popularTitle: "Comparaisons populaires",
    faqTitle: "FAQ",
    faq: [
      { q: "Comment les navigateurs sont-ils comparés ?", a: "Chaque navigateur reçoit cinq notes de 1 à 5 vérifiées à la main (vie privée, prêt à l'emploi, personnalisation, légèreté, minimalisme) ainsi que des faits techniques : systèmes, moteur, extensions, prix, code source et IA intégrée." },
      { q: "Pourquoi n'y a-t-il pas de note de vitesse ?", a: "Les navigateurs courants se tiennent dans la marge d'erreur des benchmarks et cela varie à chaque version. La légèreté (RAM et CPU) compte bien davantage au quotidien." },
      { q: "Quel est le meilleur navigateur ?", a: "Cela dépend de votre système, de vos extensions et de votre priorité entre vie privée et confort. Le quiz vous donne un classement sur mesure en deux minutes." },
    ],
    js: {
      maxReached: "Vous pouvez comparer jusqu'à {max} navigateurs. Retirez-en un d'abord.",
      pickAtLeast2: "Choisissez au moins deux navigateurs à comparer.",
      removeAria: "Retirer {name}",
      pickBrowser: "Choisir",
      optional: "Optionnel",
      categoryCol: "Catégorie",
      fullComparison: "Lire le duel complet {pair} →",
      chooseIf: "Choisissez {name} si…",
      noClearLead: "Il ne devance pas nettement {other} sur nos critères notés.",
      showFewer: "Afficher moins",
      showAll: "Afficher les {n} navigateurs",
    },
    engine: {
      axes: {
        privacy: { label: "Vie privée", why: "vous voulez plus de confidentialité par défaut" },
        experience: { label: "Prêt à l'emploi", why: "vous voulez un navigateur soigné qui fonctionne d'emblée" },
        customisation: { label: "Personnalisation", why: "vous aimez ajuster l'interface, les thèmes et les réglages" },
        lightness: { label: "Légèreté", why: "vous voulez consommer moins de RAM et de CPU" },
        minimalism: { label: "Minimalisme", why: "vous voulez moins d'ajouts superflus" },
      },
      features: {
        "ad-blocking": { label: "Anti-pub", want: "un bloqueur de pubs intégré" },
        "vertical-tabs": { label: "Onglets verticaux", want: "des onglets verticaux sans extension" },
        workspaces: { label: "Espaces", want: "des espaces de travail séparés" },
        "split-view": { label: "Vue scindée", want: "la vue scindée côte à côte" },
        "keyboard-driven": { label: "Clavier / Vim", want: "piloter le navigateur au clavier" },
        vpn: { label: "VPN intégré", want: "un VPN intégré" },
        tor: { label: "Tor", want: "Tor intégré" },
        "de-googled": { label: "Sans Google", want: "aucun service Google" },
        "security-hardened": { label: "Renforcé", want: "des réglages de sécurité durcis" },
        sync: { label: "Synchro", want: "une synchronisation intégrée" },
        portable: { label: "Portable", want: "une version portable" },
      },
      aiLevel: { 1: "Chat / résumés basiques", 2: "Assistant intégré", 3: "Agent IA" },
      aiDisable: { fully: "désactivable", partly: "partiellement désactivable", no: "non désactivable" },
      aiNone: "Aucune",
      extChrome: "Chrome Web Store",
      extFirefox: "Modules Firefox",
      extLimited: "Limité ou aucun",
      runsOn: "Systèmes",
      engineLabel: "Moteur",
      extensionsLabel: "Extensions",
      priceLabel: "Prix",
      free: "Gratuit",
      sourceLabel: "Code source",
      openSource: "Open source",
      closedSource: "Propriétaire",
      aiLabel: "IA intégrée",
      featuresLabel: "Fonctions intégrées",
      statusLabel: "Statut",
      status: { active: "Développement actif", maintenance: "Mode maintenance", discontinued: "Abandonné" },
      whyActive: "vous voulez un navigateur activement maintenu ({other} est {status})",
      whyStatusDiscontinued: "abandonné",
      whyStatusMaintenance: "en maintenance seule",
      whyOs: "vous êtes sous {os} – {other} n'y tourne pas",
      orWord: " ou ",
      andWord: " et ",
      whyChromeExt: "vous dépendez des extensions du Chrome Web Store",
      whyFirefoxExt: "vous voulez les modules Firefox, dont uBlock Origin complet",
      whyFree: "vous ne voulez pas payer ({other} : {price})",
      whyOss: "vous voulez un code open source auditable",
      whyHasAi: "vous voulez un assistant IA intégré",
      whyNoAi: "vous préférez aucune IA intégrée",
      whyStrongerAi: "vous voulez une IA plus capable ({a}/5 contre {b}/5)",
      whyAiAgent: "vous voulez un agent IA capable d'agir sur les sites",
      whyWant: "vous cherchez {list}",
      whyKnown: "vous préférez un navigateur établi avec une large base d'utilisateurs",
    },
  },

  pt: {
    metaTitle: (y) => `Comparar navegadores lado a lado (${y})`,
    metaDesc: (u) => `Compare até quatro navegadores de desktop lado a lado: privacidade, acabamento, personalização, uso de RAM, extensões, IA e preço. Atualizado em ${u}.`,
    crumb: "Comparar",
    kicker: "Comparador",
    h1: "Compare navegadores lado a lado",
    lede: (u) => `Escolha de dois a quatro navegadores para ver como se saem em privacidade, experiência pronta, personalização, RAM, extensões, IA e preço. Atualizado: ${u}.`,
    pickHeading: "Escolher navegadores",
    trayAria: "Navegadores selecionados",
    pickPlaceholder: "Escolher",
    optionalPlaceholder: "Opcional",
    removeAria: (n) => `Remover ${n}`,
    searchLabel: "Buscar navegadores",
    searchPlaceholder: "Buscar navegadores",
    hintDefault: (max) => `Clique em até ${max} navegadores. Clique de novo para remover.`,
    showAll: (n) => `Mostrar todos os ${n} navegadores`,
    showFewer: "Mostrar menos",
    categoryCol: "Categoria",
    betterLabel: "Melhor",
    fullComparison: "Ler comparação completa {pair} →",
    chooseIf: "Escolha {name} se…",
    popularTitle: "Comparações populares",
    faqTitle: "Perguntas frequentes",
    faq: [
      { q: "Como os navegadores são comparados?", a: "Cada navegador recebe cinco notas de 1 a 5 conferidas manualmente (privacidade, pronto para uso, personalização, leveza e minimalismo), além de sistema, motor, loja de extensões, preço, código aberto e IA integrada." },
      { q: "Por que não há nota de velocidade?", a: "Navegadores modernos empatam dentro da margem de erro dos benchmarks e isso muda a cada versão. O consumo de RAM e CPU (leveza) faz mais diferença no dia a dia." },
      { q: "Qual é o melhor navegador no geral?", a: "Depende do seu sistema, das extensões necessárias e do equilíbrio entre privacidade e praticidade. O quiz calcula isso para você em dois minutos." },
    ],
    js: {
      maxReached: "Você pode comparar até {max} navegadores. Remova um primeiro.",
      pickAtLeast2: "Escolha pelo menos dois navegadores para comparar.",
      removeAria: "Remover {name}",
      pickBrowser: "Escolher",
      optional: "Opcional",
      categoryCol: "Categoria",
      fullComparison: "Ler comparação completa {pair} →",
      chooseIf: "Escolha {name} se…",
      noClearLead: "Ele não supera claramente o {other} nos critérios que pontuamos.",
      showFewer: "Mostrar menos",
      showAll: "Mostrar todos os {n} navegadores",
    },
    engine: {
      axes: {
        privacy: { label: "Privacidade", why: "você quer mais privacidade por padrão" },
        experience: { label: "Pronto para uso", why: "quer algo polido que só funcione" },
        customisation: { label: "Personalização", why: "gosta de ajustar layout, temas e opções" },
        lightness: { label: "Leveza", why: "quer menor uso de RAM e CPU" },
        minimalism: { label: "Minimalismo", why: "quer menos extras embutidos" },
      },
      features: {
        "ad-blocking": { label: "Bloqueador de anúncios", want: "bloqueador de anúncios integrado" },
        "vertical-tabs": { label: "Abas verticais", want: "abas verticais sem extensão" },
        workspaces: { label: "Espaços", want: "espaços para separar projetos" },
        "split-view": { label: "Tela dividida", want: "tela dividida lado a lado" },
        "keyboard-driven": { label: "Teclado / Vim", want: "controlar o navegador pelo teclado" },
        vpn: { label: "VPN integrada", want: "VPN integrada" },
        tor: { label: "Tor", want: "Tor integrado" },
        "de-googled": { label: "Sem Google", want: "nenhum serviço do Google" },
        "security-hardened": { label: "Reforçado", want: "configurações reforçadas de segurança" },
        sync: { label: "Sincronização", want: "sincronização integrada" },
        portable: { label: "Portátil", want: "versão portátil" },
      },
      aiLevel: { 1: "Chat / resumos básicos", 2: "Assistente integrado", 3: "Agente de IA" },
      aiDisable: { fully: "pode ser desligada", partly: "desligável em parte", no: "não pode ser desligada" },
      aiNone: "Nenhuma",
      extChrome: "Chrome Web Store",
      extFirefox: "Extensões Firefox",
      extLimited: "Limitado ou nenhum",
      runsOn: "Roda em",
      engineLabel: "Motor",
      extensionsLabel: "Extensões",
      priceLabel: "Preço",
      free: "Gratuito",
      sourceLabel: "Código-fonte",
      openSource: "Código aberto",
      closedSource: "Código fechado",
      aiLabel: "IA integrada",
      featuresLabel: "Recursos integrados",
      statusLabel: "Status",
      status: { active: "Desenvolvimento ativo", maintenance: "Modo manutenção", discontinued: "Descontinuado" },
      whyActive: "você quer um navegador em desenvolvimento ativo ({other} está {status})",
      whyStatusDiscontinued: "descontinuado",
      whyStatusMaintenance: "em manutenção",
      whyOs: "você usa {os} – o {other} não roda nele",
      orWord: " ou ",
      andWord: " e ",
      whyChromeExt: "você depende das extensões da Chrome Web Store",
      whyFirefoxExt: "você quer extensões do Firefox, incluindo o uBlock Origin completo",
      whyFree: "você não quer pagar ({other}: {price})",
      whyOss: "você quer código aberto que qualquer um possa auditar",
      whyHasAi: "você quer um assistente de IA integrado",
      whyNoAi: "você prefere não ter nenhuma IA embutida",
      whyStrongerAi: "você quer uma IA mais capaz ({a}/5 vs {b}/5)",
      whyAiAgent: "você quer um agente de IA que navegue pelos sites",
      whyWant: "você quer {list}",
      whyKnown: "você prefere um navegador conhecido e com grande base de usuários",
    },
  },

  cs: {
    metaTitle: (y) => `Porovnat prohlížeče vedle sebe (${y})`,
    metaDesc: (u) => `Porovnejte až čtyři desktopové prohlížeče vedle sebe: soukromí, vyladění, přizpůsobení, spotřeba RAM, doplňky, AI a cena. Aktualizováno: ${u}.`,
    crumb: "Srovnat",
    kicker: "Porovnání",
    h1: "Porovnejte prohlížeče vedle sebe",
    lede: (u) => `Vyberte dva až čtyři prohlížeče a podívejte se, jak si stojí v soukromí, vyladění, úpravách, spotřebě RAM, doplňcích, AI a ceně. Aktualizováno: ${u}.`,
    pickHeading: "Vybrat prohlížeče",
    trayAria: "Vybrané prohlížeče",
    pickPlaceholder: "Vybrat prohlížeč",
    optionalPlaceholder: "Volitelně",
    removeAria: (n) => `Odebrat ${n}`,
    searchLabel: "Hledat prohlížeče",
    searchPlaceholder: "Hledat prohlížeče",
    hintDefault: (max) => `Klikněte až na ${max} prohlížeče. Dalším kliknutím odeberete.`,
    showAll: (n) => `Zobrazit všech ${n} prohlížečů`,
    showFewer: "Zobrazit méně",
    categoryCol: "Kategorie",
    betterLabel: "Lepší",
    fullComparison: "Přečíst celé srovnání {pair} →",
    chooseIf: "Zvolte {name}, pokud…",
    popularTitle: "Oblíbená srovnání",
    faqTitle: "Časté otázky",
    faq: [
      { q: "Jak prohlížeče porovnáváme?", a: "Každý prohlížeč má pět ručně ověřených známek 1–5 (soukromí, vyladění po vybalení, přizpůsobení, lehkost a minimalismus) plus fakta: podporované systémy, jádro, doplňky, cena, zdrojový kód a vestavěná AI." },
      { q: "Proč chybí známka za rychlost?", a: "Běžné prohlížeče jsou v testech rychlosti v rámci odchylky měření a výsledky se mění s každou verzí. V praxi rozhoduje spíš lehkost (spotřeba RAM a CPU)." },
      { q: "Který prohlížeč je nejlepší celkově?", a: "Záleží na systému, doplňcích a na tom, jestli dáte přednost soukromí nebo pohodlí. Kvíz to všechno zváží během dvou minut." },
    ],
    js: {
      maxReached: "Můžete porovnat nejvýše {max} prohlížeče. Nejprve jeden odeberte.",
      pickAtLeast2: "Pro srovnání vyberte alespoň dva prohlížeče.",
      removeAria: "Odebrat {name}",
      pickBrowser: "Vybrat prohlížeč",
      optional: "Volitelně",
      categoryCol: "Kategorie",
      fullComparison: "Přečíst celé srovnání {pair} →",
      chooseIf: "Zvolte {name}, pokud…",
      noClearLead: "V našich hodnoceních nad prohlížečem {other} nijak výrazně nevyhrává.",
      showFewer: "Zobrazit méně",
      showAll: "Zobrazit všech {n} prohlížečů",
    },
    engine: {
      axes: {
        privacy: { label: "Soukromí", why: "chcete lepší soukromí už v základu" },
        experience: { label: "Po vybalení", why: "chcete vyladěný prohlížeč, který hned funguje" },
        customisation: { label: "Přizpůsobení", why: "rádi si upravujete rozvržení, motivy a nastavení" },
        lightness: { label: "Lehkost", why: "chcete nižší spotřebu RAM a CPU" },
        minimalism: { label: "Minimalismus", why: "chcete méně přibalených funkcí navíc" },
      },
      features: {
        "ad-blocking": { label: "Blokování reklam", want: "vestavěný blokátor reklam" },
        "vertical-tabs": { label: "Svislé karty", want: "svislé karty bez doplňku" },
        workspaces: { label: "Pracovní plochy", want: "pracovní plochy na oddělení projektů" },
        "split-view": { label: "Rozdělený pohled", want: "rozdělený pohled pro dvě stránky vedle sebe" },
        "keyboard-driven": { label: "Klávesnice / Vim", want: "ovládat prohlížeč z klávesnice" },
        vpn: { label: "Vestavěná VPN", want: "vestavěnou VPN" },
        tor: { label: "Tor", want: "vestavěnou síť Tor" },
        "de-googled": { label: "Bez Googlu", want: "žádné služby Googlu" },
        "security-hardened": { label: "Zabezpečený", want: "tvrzená bezpečnostní nastavení" },
        sync: { label: "Synchronizace", want: "vestavěnou synchronizaci napříč zařízeními" },
        portable: { label: "Přenosný", want: "přenosnou (portable) verzi" },
      },
      aiLevel: { 1: "Základní chat / shrnutí", 2: "Integrovaný asistent", 3: "AI agent" },
      aiDisable: { fully: "lze vypnout", partly: "lze vypnout částečně", no: "nelze vypnout" },
      aiNone: "Žádná",
      extChrome: "Chrome Web Store",
      extFirefox: "Doplňky Firefoxu",
      extLimited: "Omezené nebo žádné",
      runsOn: "Běží na",
      engineLabel: "Jádro",
      extensionsLabel: "Doplňky",
      priceLabel: "Cena",
      free: "Zdarma",
      sourceLabel: "Zdrojový kód",
      openSource: "Open source",
      closedSource: "Uzavřený kód",
      aiLabel: "Vestavěná AI",
      featuresLabel: "Vestavěné funkce",
      statusLabel: "Stav",
      status: { active: "Aktivně vyvíjený", maintenance: "Jen údržba", discontinued: "Ukončený" },
      whyActive: "chcete prohlížeč, který se stále aktivně vyvíjí ({other} je {status})",
      whyStatusDiscontinued: "ukončený",
      whyStatusMaintenance: "jen v udržovacím režimu",
      whyOs: "používáte {os} – {other} tam neběží",
      orWord: " nebo ",
      andWord: " a ",
      whyChromeExt: "spoléháte na doplňky z Chrome Web Store",
      whyFirefoxExt: "chcete doplňky Firefoxu včetně plného uBlock Origin",
      whyFree: "nechcete platit ({other}: {price})",
      whyOss: "chcete open-source kód, který jde zkontrolovat",
      whyHasAi: "chcete vestavěného AI asistenta",
      whyNoAi: "dáváte přednost prohlížeči úplně bez vestavěné AI",
      whyStrongerAi: "chcete schopnějšího AI asistenta ({a}/5 vs {b}/5)",
      whyAiAgent: "chcete AI agenta, který za vás dokáže klikat na webech",
      whyWant: "chcete {list}",
      whyKnown: "preferujete známý prohlížeč s velkou základnou uživatelů",
    },
  },
};

export const NEWS_INDEX_COPY: Record<Locale, NewsIndexCopy> = {
  en: {
    metaTitle: "Browser news: releases and site updates – browserwall",
    metaDesc: "Browser releases worth knowing about and what changed on browserwall: new browsers, score changes and features, written by hand.",
    crumb: "News",
    ldName: "browserwall news",
    kicker: "News",
    h1: "Browser news",
    ledeBefore: "Browser releases worth knowing about, and what we changed on browserwall because of them.",
    rssLink: "Follow via RSS",
    kinds: { release: "Release", industry: "Industry", site: "Site update" },
  },
  ru: {
    metaTitle: "Новости браузеров: релизы и обновления сайта – browserwall",
    metaDesc: "Важные релизы браузеров и обновления на browserwall: новые браузеры, пересмотр оценок и функции — всё написано вручную.",
    crumb: "Новости",
    ldName: "Новости browserwall",
    kicker: "Новости",
    h1: "Новости браузеров",
    ledeBefore: "Заметные релизы браузеров и то, что из-за них изменилось на browserwall.",
    rssLink: "Подписаться по RSS",
    kinds: { release: "Релиз", industry: "Индустрия", site: "Обновление сайта" },
  },
  fr: {
    metaTitle: "Actualités navigateurs : sorties et mises à jour – browserwall",
    metaDesc: "Les sorties de navigateurs à retenir et ce qui évolue sur browserwall : nouveaux navigateurs, révisions de notes et fonctionnalités.",
    crumb: "Actus",
    ldName: "Actualités browserwall",
    kicker: "Actualités",
    h1: "Actualités des navigateurs",
    ledeBefore: "Les sorties de navigateurs qui comptent, et ce que nous avons mis à jour sur browserwall.",
    rssLink: "Suivre via RSS",
    kinds: { release: "Sortie", industry: "Secteur", site: "Mise à jour" },
  },
  pt: {
    metaTitle: "Notícias de navegadores: lançamentos e novidades – browserwall",
    metaDesc: "Lançamentos de navegadores que valem atenção e o que mudou no browserwall: novos navegadores, ajustes de notas e recursos.",
    crumb: "Notícias",
    ldName: "Notícias do browserwall",
    kicker: "Notícias",
    h1: "Notícias de navegadores",
    ledeBefore: "Lançamentos de navegadores que merecem destaque e o que mudamos no browserwall por causa deles.",
    rssLink: "Seguir via RSS",
    kinds: { release: "Lançamento", industry: "Indústria", site: "Atualização do site" },
  },
  cs: {
    metaTitle: "Novinky ze světa prohlížečů a webu – browserwall",
    metaDesc: "Vydání prohlížečů, o kterých stojí za to vědět, a změny na browserwall: nové prohlížeče, úpravy známek a funkce.",
    crumb: "Novinky",
    ldName: "Novinky browserwall",
    kicker: "Novinky",
    h1: "Novinky prohlížečů",
    ledeBefore: "Důležitá vydání prohlížečů a změny, které jsme kvůli nim udělali na browserwall.",
    rssLink: "Sledovat přes RSS",
    kinds: { release: "Vydání", industry: "Z trhu", site: "Novinky webu" },
  },
};

export const CONTACT_PAGE_COPY: Record<Locale, ContactPageCopy> = {
  en: {
    metaTitle: "Contact: corrections & missing browsers – browserwall",
    metaDesc: "Get in touch about browserwall: corrections, missing browsers, ideas.",
    kicker: "Contact",
    h1: "Say hi",
    sub: "browserwall is a one-person project. Corrections and suggestions are very welcome.",
    copy: "Copy",
    copied: "Copied",
    copyFailed: "Copy failed",
    topics: [
      { title: "A mistake in the data", text: "Wrong score, outdated logo, a dead browser marked as alive – tell me which browser and what's off. A link helps." },
      { title: "A missing browser", text: "Name, website and why people use it. It needs to be a usable desktop browser that's actively maintained." },
      { title: "Anything else", text: "Ideas for the quiz or tier maker, bugs, or just hello." },
    ],
    sections: [
      { h: "How corrections work", p: "Every score on browserwall is an editorial 1–5 rating for privacy, out-of-box experience, customisation, lightness and minimalism. Scores are re-checked against reviews, community opinion and tests, and each browser page lists the sources behind them. If you think a score is wrong, the most useful thing you can send is a link – a changelog, a privacy policy, a benchmark or a review – that shows what changed." },
      { h: "Suggesting a browser", p: "The wall covers desktop browsers you can download today, with a release in roughly the last 12 months, that people actually use or talk about: a major vendor, 1,000+ GitHub stars, or coverage in several current roundups. Household names that shut down stay on the wall as discontinued. Region-specific browsers, OS-specific ports and tiny forks of forks are left out, and browsers with a history of selling user data never appear in the quiz or rankings." },
      { h: "What to expect", p: "browserwall has no ads, no sponsored placements and no affiliate links, so nobody can pay for a better score. Every message gets read, and corrections go live with the next data update." },
    ],
  },
  ru: {
    metaTitle: "Контакты: правки и новые браузеры – browserwall",
    metaDesc: "Свяжитесь с автором browserwall: исправления ошибок, пропущенные браузеры, идеи.",
    kicker: "Контакт",
    h1: "Напишите нам",
    sub: "browserwall — проект одного человека. Исправления и предложения всегда приветствуются.",
    copy: "Копировать",
    copied: "Скопировано",
    copyFailed: "Не удалось",
    topics: [
      { title: "Ошибка в данных", text: "Неверная оценка, старый логотип или закрытый браузер отмечен как живой — напишите, что именно не так. Ссылка очень поможет." },
      { title: "Нет нужного браузера", text: "Пришлите название, сайт и чем он интересен. Это должен быть рабочий десктопный браузер, который активно поддерживается." },
      { title: "Всё остальное", text: "Идеи для теста или тир-листа, баги или просто слова поддержки." },
    ],
    sections: [
      { h: "Как работают правки", p: "Каждая оценка на browserwall — редакционный балл от 1 до 5 за приватность, удобство из коробки, кастомизацию, лёгкость и минимализм. Оценки сверяются с обзорами, отзывами сообщества и тестами, а на странице каждого браузера указаны источники. Если оценка устарела, лучше всего прислать ссылку на чейнджлог, политику приватности или обзор." },
      { h: "Как предложить браузер", p: "На стену попадают десктопные браузеры, которые можно скачать сейчас, с обновлениями примерно за последние 12 месяцев и реальной аудиторией: крупный вендор, 1000+ звёзд на GitHub или упоминания в свежих подборках. Известные закрытые проекты остаются с пометкой RIP, а браузеры, замеченные в продаже данных пользователей, не попадают в тест." },
      { h: "Чего ожидать", p: "На browserwall нет рекламы, проплаченных мест и партнёрских ссылок — более высокую оценку нельзя купить. Все письма читаются, а правки выходят со следующим обновлением данных." },
    ],
  },
  fr: {
    metaTitle: "Contact : corrections et suggestions – browserwall",
    metaDesc: "Contacter browserwall : corrections de fiches, navigateurs manquants, suggestions.",
    kicker: "Contact",
    h1: "Dites bonjour",
    sub: "browserwall est un projet indépendant mené par une seule personne. Corrections et idées sont les bienvenues.",
    copy: "Copier",
    copied: "Copié",
    copyFailed: "Échec",
    topics: [
      { title: "Une erreur dans les données", text: "Note inexacte, logo obsolète, navigateur arrêté indiqué comme actif – dites-moi lequel et ce qui cloche. Un lien aide beaucoup." },
      { title: "Un navigateur manquant", text: "Nom, site officiel et intérêt pour les utilisateurs. Il doit s'agir d'un navigateur de bureau utilisable et activement maintenu." },
      { title: "Autre chose", text: "Idées pour le quiz ou la tier list, bugs ou simple message." },
    ],
    sections: [
      { h: "Comment fonctionnent les corrections", p: "Chaque note de 1 à 5 (vie privée, prêt à l'emploi, personnalisation, légèreté, minimalisme) est vérifiée par rapport aux tests, retours communautaires et audits. Si quelque chose a changé, le plus utile est d'envoyer un lien (notes de version, politique de confidentialité ou test)." },
      { h: "Suggérer un navigateur", p: "Le mur recense des navigateurs de bureau téléchargeables aujourd'hui, mis à jour au cours des 12 derniers mois environ et dotés d'une vraie audience : grand éditeur, 1 000+ étoiles GitHub ou presse spécialisée. Les navigateurs ayant vendu les données d'utilisateurs n'apparaissent jamais dans le quiz." },
      { h: "À quoi s'attendre", p: "browserwall n'a ni publicité, ni placement sponsorisé, ni lien affilié : personne ne peut acheter une meilleure note. Chaque message est lu et les corrections sont intégrées à la mise à jour suivante." },
    ],
  },
  pt: {
    metaTitle: "Contato: correções e navegadores faltando – browserwall",
    metaDesc: "Entre em contato com o browserwall: correções, sugestões de navegadores e ideias.",
    kicker: "Contato",
    h1: "Mande um oi",
    sub: "O browserwall é um projeto independente de uma pessoa só. Correções e sugestões são muito bem-vindas.",
    copy: "Copiar",
    copied: "Copiado",
    copyFailed: "Falhou",
    topics: [
      { title: "Um erro nos dados", text: "Nota errada, logotipo antigo ou navegador encerrado marcado como ativo – conte qual é e o que está errado. Um link ajuda bastante." },
      { title: "Um navegador faltando", text: "Nome, site e por que as pessoas usam. Precisa ser um navegador de desktop utilizável e mantido ativamente." },
      { title: "Qualquer outra coisa", text: "Ideias para o quiz ou tier maker, bugs ou só um alô." },
    ],
    sections: [
      { h: "Como funcionam as correções", p: "Cada nota no browserwall é editorial (1 a 5) para privacidade, experiência pronta, personalização, leveza e minimalismo, conferida com análises, opiniões da comunidade e testes. Se algo mudou, o mais útil é enviar um link (changelog, política de privacidade ou análise)." },
      { h: "Sugerir um navegador", p: "O mural inclui navegadores de desktop disponíveis para download, com lançamento nos últimos ~12 meses e uso real: grande fabricante, 1.000+ estrelas no GitHub ou destaque em comparativos. Navegadores com histórico de venda de dados nunca entram no quiz." },
      { h: "O que esperar", p: "O browserwall não tem anúncios, patrocínios nem links de afiliados – ninguém pode pagar por uma nota melhor. Toda mensagem é lida e as correções entram na próxima atualização." },
    ],
  },
  cs: {
    metaTitle: "Kontakt: opravy a chybějící prohlížeče – browserwall",
    metaDesc: "Napište ohledně browserwall: opravy údajů, chybějící prohlížeče, nápady.",
    kicker: "Kontakt",
    h1: "Napište nám",
    sub: "browserwall je projekt jednoho člověka. Opravy a tipy jsou vždy vítány.",
    copy: "Kopírovat",
    copied: "Zkopírováno",
    copyFailed: "Chyba",
    topics: [
      { title: "Chyba v datech", text: "Špatná známka, staré logo nebo mrtvý prohlížeč vedený jako živý – napište který a co nesedí. Odkaz pomůže." },
      { title: "Chybějící prohlížeč", text: "Název, web a proč ho lidé používají. Musí jít o použitelný desktopový prohlížeč s aktivním vývojem." },
      { title: "Cokoliv dalšího", text: "Nápady pro kvíz nebo tier maker, chyby, nebo jen pozdrav." },
    ],
    sections: [
      { h: "Jak fungují opravy", p: "Každé hodnocení na browserwall je redakční známka 1–5 za soukromí, vyladění po vybalení, přizpůsobení, lehkost a minimalismus, ověřená podle recenzí, komunity a testů. Pokud se něco změnilo, nejvíc pomůže odkaz na changelog, zásady soukromí nebo test." },
      { h: "Návrh prohlížeče", p: "Zeď pokrývá desktopové prohlížeče ke stažení s aktualizací zhruba za posledních 12 měsíců a reálným používáním: velký výrobce, 1 000+ hvězd na GitHubu nebo zmínky v recenzích. Prohlížeče s historií prodeje uživatelských dat se v kvízu ani žebříčcích nikdy neobjevují." },
      { h: "Co čekat", p: "browserwall nemá žádné reklamy, placená umístění ani affiliate odkazy, takže lepší známku si nelze koupit. Každá zpráva se čte a opravy jdou ven s další aktualizací dat." },
    ],
  },
};
