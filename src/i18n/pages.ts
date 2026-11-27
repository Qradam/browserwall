import type { Locale, PluralForms } from "./index";

export interface HomeCopy {
  metaTitle: (count: number, year: number) => string;
  metaDesc: (count: number) => string;
  pillBrowsers: (count: number) => string;
  pillUpdated: (updated: string) => string;
  welcomeBold: string;
  welcomeRest: string;
  welcomeSub: string;
  heroTitleTop: string;
  heroTitleBottom: string;
  heroCopy: (count: number) => string;
  heroDots: [string, string, string, string];
  startQuiz: string;
  searchLabel: string;
  searchPlaceholder: string;
  searchResultsAria: string;
  noSearchMatch: string;
  tryQuiz: string;
  wallTitle: string;
  wallCopy: string;
  openWall: string;
  scoreLabels: [string, string, string];
  guideTitle: (year: number) => string;
  guideCopy: string;
  guides: { h: string; p: string; links: [string, string][] }[];
  guideMore: {
    beforeAlt: string;
    otherBrowsers: string;
    between: string;
    compareLink: string;
    like: string;
    orBrowse: string;
    allGuides: string;
  };
  faqTitle: string;
  faqCopy: string;
  faq: (ctx: {
    year: number;
    count: number;
    topAll: string;
    topPrivacy: string;
    topMac: string;
    topWin: string;
    topLinux: string;
    topAi: string;
    chromePrivacy: number;
    chromeExp: number;
    chromeCustom: number;
    ffPrivacy: number;
    ffExp: number;
    ffCustom: number;
    bravePrivacy: number;
    braveMinimal: number;
  }) => { q: string; a: string }[];
  endTitle: string;
  endCopy: string;
}

export interface QuizPageCopy {
  metaTitle: (year: number) => string;
  metaDesc: (count: number) => string;
  ldName: string;
  ldDesc: string;
  kicker: string;
  h1: string;
  sub: string;
  formAria: string;
  stepsAria: string;
  steps: [string, string, string, string, string];
  tuneTitle: string;
  tuneSub: string;
  q0: string;
  q1: string;
  q1Help: string;
  q2: string;
  q2Help: string;
  q3: string;
  niceExplainTitle: string;
  niceExplainBody: string;
  mustExplainTitle: string;
  mustExplainBody: string;
  optDontCare: string;
  optNice: string;
  optMust: string;
  q4: string;
  q4Help: string;
  back: string;
  next: string;
  showMatches: string;
  restart: string;
  resultsTitle: string;
  shareOpenTitle: string;
  shareOpenSub: string;
  moreTitle: string;
  howTitle: string;
  howBody: string;
  aboutTitle: string;
  readyListTitle: string;
  categoryTitles: string[];
  faq: (count: number) => { q: string; a: string }[];
  js: {
    hints: [string, string, string, string, string];
    browsersWord: PluralForms;
    leftCount: string;
    leftAria: string;
    fitSuffix: string;
    mustHaveTitle: string;
    niceToHaveTitle: string;
    missingSuffix: string;
    cardAria: string;
    showDetails: string;
    leadPrefix: string;
    estimate: string;
    estimateTitle: string;
    matchWord: string;
    paidPrefix: string;
    filteredOut: string;
    noneHtml: string;
  };
}

export interface WallPageCopy {
  metaTitle: (count: number, year: number) => string;
  metaDesc: (count: number) => string;
  ldName: string;
  h1: string;
  heroSub: (count: number, alive: number) => string;
  controlsAria: string;
  searchPlaceholder: string;
  searchAria: string;
  filtersBtn: string;
  filtersTitle: string;
  closeFilters: string;
  osAria: string;
  engineAria: string;
  statusAria: string;
  aliveOnly: string;
  openSource: string;
  rip: string;
  featuresAria: string;
  showPrefix: string;
  showSuffix: PluralForms;
  reset: string;
  sortAria: string;
  mostUsed: string;
  mostUsedTitle: string;
  az: string;
  empty: string;
  guidesHeading: string;
  alternativesLink: string;
  orderNote: string;
  browsersWord: PluralForms;
  categoryTitles: string[];
}

export interface TiersPageCopy {
  metaTitle: string;
  metaDesc: string;
  h1: string;
  heroSubBefore: string;
  heroSubAfter: string;
  listTitleLabel: string;
  defaultTitle: string;
  copyLink: string;
  saveImg: string;
  reset: string;
  tierNameAria: (n: number) => string;
  tierAria: (n: number) => string;
  tapPlace: string;
  details: string;
  backToPool: string;
  cancelSel: string;
  poolAria: string;
  familyAria: string;
  allFam: string;
  includeAria: string;
  channels: string;
  discontinued: string;
  memes: string;
  findPlaceholder: string;
  findAria: string;
  onlyFiltered: string;
  onlyFilteredTitle: string;
  poolEmpty: string;
  aboutHeading: string;
  aboutP1: (count: number) => string;
  aboutP2Before: string;
  aboutP2Wall: string;
  aboutP2Mid: string;
  aboutP2Quiz: string;
  aboutP2After: string;
  faqHeading: string;
  faq: (count: number) => { q: string; a: string }[];
  js: {
    defaultTitle: string;
    unplacedSuffix: string;
    movedMsg: (n: number) => string;
    alreadyFiltered: string;
    confirmClear: string;
    linkCopied: string;
    copyPrompt: string;
    madeOn: string;
    loadedShared: string;
  };
}

export const HOME_COPY: Record<Locale, HomeCopy> = {
  en: {
    metaTitle: (n, y) => `Which browser should I use? ${n} compared (${y}) – browserwall`,
    metaDesc: (n) => `Find the right web browser in two minutes. A free quiz ranks ${n} desktop browsers – Chrome, Firefox, Safari, Edge, Brave, Zen, Arc, Comet and more – against your OS, extensions, priorities and must-haves.`,
    pillBrowsers: (n) => `${n} browsers`,
    pillUpdated: (u) => `updated ${u}`,
    welcomeBold: "Welcome",
    welcomeRest: "to browserwall",
    welcomeSub: "Honest scores, no sponsored picks",
    heroTitleTop: "Find your",
    heroTitleBottom: "browser.",
    heroCopy: (n) => `Answer five quick questions and get a ranked shortlist from ${n} desktop browsers – with honest scores, not sponsored picks.`,
    heroDots: ["Privacy", "AI", "Workflow", "Free"],
    startQuiz: "Start the quiz",
    searchLabel: "Search browsers",
    searchPlaceholder: "Search browsers…",
    searchResultsAria: "Matching browsers",
    noSearchMatch: "No browser called “{q}” –",
    tryQuiz: "try the quiz",
    wallTitle: "The wall",
    wallCopy: "Every desktop browser worth knowing – from the giants to the indie forks.",
    openWall: "Open the full wall",
    scoreLabels: ["Privacy", "Polish", "Minimal"],
    guideTitle: (y) => `How to choose a browser in ${y}`,
    guideCopy: "Four questions that matter more than any benchmark.",
    guides: [
      { h: "Start with what you can't change", p: "Your OS and the extensions you depend on narrow the field fastest. Most browsers run on Chromium and install Chrome Web Store extensions; Firefox forks use Firefox add-ons, including the full uBlock Origin.", links: [["Windows", "/best/browsers-for-windows"], ["Mac", "/best/browsers-for-mac"], ["Linux", "/best/browsers-for-linux"]] },
      { h: "Judge privacy by business model", p: "A browser funded by advertising has a reason to collect data, however it's branded. We score who makes money from you and what's blocked by default – not the marketing.", links: [["Most private browsers", "/best/privacy-browsers"], ["Open source", "/best/open-source-browsers"]] },
      { h: "Decide how much AI you want", p: "Chrome, Edge and a wave of AI-first browsers ship assistants, and some have agents that click and type for you. Many send page content to cloud models, so check the privacy score too.", links: [["AI browsers", "/best/ai-browsers"], ["AI agents", "/best/agentic-ai-browsers"]] },
      { h: "Pick workflow over benchmarks", p: "Vertical tabs, workspaces and split view change how a browser feels far more than speed tests, where mainstream browsers are within a few percent of each other.", links: [["Vertical tabs", "/best/browsers-with-vertical-tabs"], ["Lightweight", "/best/lightweight-browsers"], ["Minimal", "/best/minimal-browsers"]] },
    ],
    guideMore: {
      beforeAlt: "Leaving a browser? See alternatives to",
      otherBrowsers: "other browsers",
      between: "Torn between two?",
      compareLink: "Compare browsers side by side",
      like: "like",
      orBrowse: "or browse",
      allGuides: "all guides",
    },
    faqTitle: "Frequently asked questions",
    faqCopy: "Straight answers from our scores and research.",
    faq: (c) => [
      { q: `What is the best web browser in ${c.year}?`, a: `There's no single best browser – it depends on your OS, the extensions you need and how much you value privacy. With balanced priorities our top picks are ${c.topAll}. The free browserwall quiz ranks all ${c.count} browsers against your own answers in about two minutes.` },
      { q: "Which browser is the most private?", a: `Browsers that block tracking by default and don't make money from your data score highest: ${c.topPrivacy}. Tor Browser goes furthest but is slower and breaks more sites.` },
      { q: "Is Chrome bad for privacy?", a: `Chrome scores ${c.chromePrivacy}/5 for privacy on browserwall because Google's business is advertising and Chrome blocks little tracking by default. It's still very polished (${c.chromeExp}/5). To keep Chrome extensions with more privacy, look at Brave, Helium or ungoogled-chromium.` },
      { q: "Firefox or Chrome?", a: `Firefox scores ${c.ffPrivacy}/5 for privacy and ${c.ffCustom}/5 for customisation; Chrome scores ${c.chromePrivacy}/5 and ${c.chromeCustom}/5. Chrome is a little more polished out of the box (${c.chromeExp}/5 vs ${c.ffExp}/5). Firefox is the main browser not built on Google's Chromium engine.` },
      { q: "Is Brave a good browser?", a: `Brave scores ${c.bravePrivacy}/5 for privacy thanks to strong default blocking, but ${c.braveMinimal}/5 for minimalism because it bundles a crypto wallet, rewards, a VPN upsell and an AI assistant. Brave Origin is a stripped-down edition without them ($59.99 on Windows and macOS, free on Linux).` },
      { q: "What is the best browser for Mac, Windows and Linux?", a: `Mac: ${c.topMac}. Windows: ${c.topWin}. Linux: ${c.topLinux}. Each guide lists the full top 10.` },
      { q: "What is the best AI browser?", a: `Ranked by how capable the AI is and how good the browser is around it: ${c.topAi}. For an AI that browses for you, see the agentic AI browser guide.` },
      { q: "How does browserwall score browsers?", a: "Each browser gets editorial 1–5 scores for privacy, out-of-box experience, customisation, lightness and minimalism, re-checked against reviews, Reddit and Hacker News discussions, privacytests.org and RAM tests. Privacy is judged on business model and defaults, not marketing. There's deliberately no speed score, because mainstream browsers are within benchmark noise of each other." },
    ],
    endTitle: "Two minutes. One shortlist.",
    endCopy: "No account, nothing stored – your answers live in the page URL.",
  },

  ru: {
    metaTitle: (n, y) => `Какой браузер выбрать? Сравнение ${n} (${y}) – browserwall`,
    metaDesc: (n) => `Найдите подходящий браузер за две минуты. Бесплатный тест ранжирует ${n} десктопных браузеров — Chrome, Firefox, Safari, Edge, Brave, Zen, Arc, Comet и другие — под вашу ОС, расширения и приоритеты.`,
    pillBrowsers: (n) => `${n} браузеров`,
    pillUpdated: (u) => `обновлено ${u}`,
    welcomeBold: "Добро пожаловать",
    welcomeRest: "на browserwall",
    welcomeSub: "Честные оценки, без рекламы",
    heroTitleTop: "Найдите свой",
    heroTitleBottom: "браузер.",
    heroCopy: (n) => `Ответьте на пять быстрых вопросов и получите личный топ из ${n} десктопных браузеров — с честными оценками, а не проплаченными подборками.`,
    heroDots: ["Приватность", "ИИ", "Удобство", "Бесплатно"],
    startQuiz: "Пройти тест",
    searchLabel: "Поиск браузеров",
    searchPlaceholder: "Найти браузер…",
    searchResultsAria: "Подходящие браузеры",
    noSearchMatch: "Браузер «{q}» не найден —",
    tryQuiz: "пройдите тест",
    wallTitle: "Стена браузеров",
    wallCopy: "Все заметные десктопные браузеры — от гигантов до инди-форков.",
    openWall: "Открыть всю стену",
    scoreLabels: ["Приватность", "Из коробки", "Минимализм"],
    guideTitle: (y) => `Как выбрать браузер в ${y} году`,
    guideCopy: "Четыре вопроса, которые важнее любых бенчмарков.",
    guides: [
      { h: "Начните с того, что нельзя поменять", p: "Ваша ОС и нужные расширения сужают выбор быстрее всего. Большинство браузеров работают на Chromium (расширения Chrome Web Store), а форки Firefox — с полным uBlock Origin.", links: [["Windows", "/best/browsers-for-windows"], ["Mac", "/best/browsers-for-mac"], ["Linux", "/best/browsers-for-linux"]] },
      { h: "Оценивайте приватность по бизнес-модели", p: "Браузер, живущий за счёт рекламы, заинтересован в сборе данных, что бы ни обещал маркетинг. Мы смотрим, на чём зарабатывает создатель и что блокируется по умолчанию.", links: [["Самые приватные", "/best/privacy-browsers"], ["Открытый код", "/best/open-source-browsers"]] },
      { h: "Решите, сколько ИИ вам нужно", p: "Chrome, Edge и новая волна ИИ-браузеров встраивают ассистентов и агентов. Многие отправляют содержимое страниц в облако, поэтому проверяйте и оценку приватности.", links: [["ИИ-браузеры", "/best/ai-browsers"], ["ИИ-агенты", "/best/agentic-ai-browsers"]] },
      { h: "Выбирайте удобство, а не тесты скорости", p: "Вертикальные вкладки, пространства и разделение экрана влияют на комфорт куда сильнее, чем разница в пару процентов в синтетических бенчмарках.", links: [["Вертикальные вкладки", "/best/browsers-with-vertical-tabs"], ["Лёгкие", "/best/lightweight-browsers"], ["Минималистичные", "/best/minimal-browsers"]] },
    ],
    guideMore: {
      beforeAlt: "Ищете замену? Посмотрите альтернативы",
      otherBrowsers: "другим браузерам",
      between: "Выбираете из двух?",
      compareLink: "Сравните браузеры лицом к лицу",
      like: "например",
      orBrowse: "или откройте",
      allGuides: "все гиды",
    },
    faqTitle: "Частые вопросы",
    faqCopy: "Прямые ответы на основе наших оценок и обзоров.",
    faq: (c) => [
      { q: `Какой веб-браузер лучший в ${c.year} году?`, a: `Единого лучшего браузера нет — всё зависит от вашей ОС, нужных расширений и требований к приватности. При сбалансированных приоритетах лидируют ${c.topAll}. Бесплатный тест browserwall отранжирует все ${c.count} браузеров за пару минут.` },
      { q: "Какой браузер самый приватный?", a: `Выше всего оцениваются браузеры с жёсткой блокировкой трекеров по умолчанию и без рекламной модели: ${c.topPrivacy}. Tor Browser идёт ещё дальше, но медленнее и чаще ломает сайты.` },
      { q: "Плох ли Chrome для приватности?", a: `У Chrome ${c.chromePrivacy}/5 за приватность, потому что бизнес Google строится на рекламе, а защита от слежки по умолчанию слабая. При этом он очень отполирован (${c.chromeExp}/5). Для расширений Chrome с лучшей приватностью посмотрите Brave, Helium или ungoogled-chromium.` },
      { q: "Firefox или Chrome?", a: `У Firefox ${c.ffPrivacy}/5 за приватность и ${c.ffCustom}/5 за кастомизацию, у Chrome — ${c.chromePrivacy}/5 и ${c.chromeCustom}/5. Chrome чуть стабильнее из коробки (${c.chromeExp}/5 против ${c.ffExp}/5), зато Firefox — главный браузер не на движке Chromium.` },
      { q: "Хорош ли браузер Brave?", a: `У Brave ${c.bravePrivacy}/5 за приватность благодаря мощной встроенной защите, но ${c.braveMinimal}/5 за минимализм из-за криптокошелька, наград, рекламы VPN и ИИ. Brave Origin — версия без лишнего ($59.99 для Windows/macOS, бесплатно на Linux).` },
      { q: "Какой браузер лучше для Mac, Windows и Linux?", a: `Mac: ${c.topMac}. Windows: ${c.topWin}. Linux: ${c.topLinux}. В каждом гиде приведён полный топ-10.` },
      { q: "Какой ИИ-браузер лучший?", a: `По возможностям ИИ и качеству самого браузера лидируют: ${c.topAi}. Если нужен ИИ-агент, который действует на сайтах за вас, смотрите гид по агентным ИИ-браузерам.` },
      { q: "Как browserwall выставляет оценки?", a: "Каждый браузер получает редакционные оценки 1–5 за приватность, удобство из коробки, кастомизацию, лёгкость и минимализм на основе тестов, обсуждений на Reddit и Hacker News, privacytests.org и замеров ОЗУ. Оценки скорости нет специально: современные браузеры в пределах погрешности равны." },
    ],
    endTitle: "Две минуты. Один топ.",
    endCopy: "Без регистрации и слежки — ваши ответы хранятся только в URL страницы.",
  },

  fr: {
    metaTitle: (n, y) => `Quel navigateur choisir ? ${n} comparés (${y}) – browserwall`,
    metaDesc: (n) => `Trouvez le bon navigateur en deux minutes. Un quiz gratuit classe ${n} navigateurs de bureau – Chrome, Firefox, Safari, Edge, Brave, Zen, Arc, Comet… – selon votre OS, vos extensions et vos priorités.`,
    pillBrowsers: (n) => `${n} navigateurs`,
    pillUpdated: (u) => `mis à jour ${u}`,
    welcomeBold: "Bienvenue",
    welcomeRest: "sur browserwall",
    welcomeSub: "Notes honnêtes, aucun choix sponsorisé",
    heroTitleTop: "Trouvez votre",
    heroTitleBottom: "navigateur.",
    heroCopy: (n) => `Répondez à cinq questions rapides et obtenez un classement personnalisé parmi ${n} navigateurs de bureau – avec des notes honnêtes, sans placement sponsorisé.`,
    heroDots: ["Vie privée", "IA", "Ergonomie", "Gratuit"],
    startQuiz: "Lancer le quiz",
    searchLabel: "Rechercher un navigateur",
    searchPlaceholder: "Rechercher un navigateur…",
    searchResultsAria: "Navigateurs correspondants",
    noSearchMatch: "Aucun navigateur nommé « {q} » –",
    tryQuiz: "essayez le quiz",
    wallTitle: "Le mur",
    wallCopy: "Tous les navigateurs de bureau qui comptent – des géants aux forks indépendants.",
    openWall: "Ouvrir le mur complet",
    scoreLabels: ["Vie privée", "Finition", "Épuré"],
    guideTitle: (y) => `Comment choisir un navigateur en ${y}`,
    guideCopy: "Quatre questions plus utiles que n'importe quel benchmark.",
    guides: [
      { h: "Partez de ce qui ne change pas", p: "Votre système et vos extensions indispensables filtrent le plus vite. La majorité utilise Chromium (Chrome Web Store) ; les forks Firefox acceptent le uBlock Origin complet.", links: [["Windows", "/best/browsers-for-windows"], ["Mac", "/best/browsers-for-mac"], ["Linux", "/best/browsers-for-linux"]] },
      { h: "Jugez la vie privée au modèle économique", p: "Un navigateur financé par la pub a intérêt à collecter vos données, quel que soit son slogan. Nous notons qui gagne de l'argent sur vous et ce qui est bloqué par défaut.", links: [["Les plus privés", "/best/privacy-browsers"], ["Open source", "/best/open-source-browsers"]] },
      { h: "Choisissez la place de l'IA", p: "Chrome, Edge et de nouveaux navigateurs IA intègrent des assistants ou agents. Beaucoup envoient le contenu des pages dans le cloud : vérifiez aussi la note de vie privée.", links: [["Navigateurs IA", "/best/ai-browsers"], ["Agents IA", "/best/agentic-ai-browsers"]] },
      { h: "Privilégiez le flux de travail aux benchmarks", p: "Onglets verticaux, espaces de travail et vue scindée changent bien plus le quotidien que 2 % d'écart dans un test de vitesse.", links: [["Onglets verticaux", "/best/browsers-with-vertical-tabs"], ["Légers", "/best/lightweight-browsers"], ["Minimalistes", "/best/minimal-browsers"]] },
    ],
    guideMore: {
      beforeAlt: "Envie de changer ? Voir les alternatives à",
      otherBrowsers: "d'autres navigateurs",
      between: "Vous hésitez entre deux ?",
      compareLink: "Comparez les navigateurs côte à côte",
      like: "comme",
      orBrowse: "ou parcourez",
      allGuides: "tous les guides",
    },
    faqTitle: "Questions fréquentes",
    faqCopy: "Des réponses directes issues de nos notes et recherches.",
    faq: (c) => [
      { q: `Quel est le meilleur navigateur web en ${c.year} ?`, a: `Il n'y a pas de vainqueur unique : tout dépend de votre OS, de vos extensions et de vos attentes en vie privée. Avec des priorités équilibrées, nos premiers choix sont ${c.topAll}. Le quiz gratuit browserwall classe les ${c.count} navigateurs selon vos réponses en deux minutes.` },
      { q: "Quel navigateur protège le mieux la vie privée ?", a: `Les navigateurs qui bloquent le pistage par défaut sans modèle économique basé sur vos données obtiennent les meilleures notes : ${c.topPrivacy}. Tor Browser va encore plus loin, au prix d'une navigation plus lente.` },
      { q: "Chrome est-il mauvais pour la vie privée ?", a: `Chrome obtient ${c.chromePrivacy}/5 en vie privée car le modèle de Google repose sur la publicité et Chrome bloque peu de pisteurs par défaut. Il reste très soigné (${c.chromeExp}/5). Pour garder les extensions Chrome avec plus de confidentialité, regardez Brave, Helium ou ungoogled-chromium.` },
      { q: "Firefox ou Chrome ?", a: `Firefox obtient ${c.ffPrivacy}/5 en vie privée et ${c.ffCustom}/5 en personnalisation ; Chrome obtient ${c.chromePrivacy}/5 et ${c.chromeCustom}/5. Chrome est un peu plus fluide dès l'installation (${c.chromeExp}/5 contre ${c.ffExp}/5). Firefox reste le grand navigateur hors moteur Chromium.` },
      { q: "Brave est-il un bon navigateur ?", a: `Brave obtient ${c.bravePrivacy}/5 en vie privée grâce à un blocage par défaut efficace, mais ${c.braveMinimal}/5 en minimalisme à cause du portefeuille crypto, des récompenses, du VPN et de l'assistant IA intégrés. Brave Origin propose une édition épurée sans ces ajouts (59,99 $ sur Windows/macOS, gratuit sur Linux).` },
      { q: "Quel est le meilleur navigateur sur Mac, Windows et Linux ?", a: `Mac : ${c.topMac}. Windows : ${c.topWin}. Linux : ${c.topLinux}. Chaque guide détaille le top 10 complet.` },
      { q: "Quel est le meilleur navigateur IA ?", a: `Classés selon la qualité de l'IA et du navigateur autour : ${c.topAi}. Pour une IA capable d'agir pour vous sur les pages, consultez le guide des navigateurs agentiques.` },
      { q: "Comment browserwall note-t-il les navigateurs ?", a: "Chaque navigateur reçoit des notes éditoriales de 1 à 5 pour la vie privée, la finition, la personnalisation, la légèreté et le minimalisme, recoupées avec des tests, Reddit, Hacker News, privacytests.org et des mesures de RAM. Pas de note de vitesse : les navigateurs courants se tiennent dans la marge d'erreur." },
    ],
    endTitle: "Deux minutes. Un palmarès.",
    endCopy: "Sans compte, rien n'est stocké – vos réponses restent dans l'URL de la page.",
  },

  pt: {
    metaTitle: (n, y) => `Qual navegador usar? ${n} comparados (${y}) – browserwall`,
    metaDesc: (n) => `Encontre o navegador ideal em dois minutos. Um quiz gratuito ranqueia ${n} navegadores de desktop – Chrome, Firefox, Safari, Edge, Brave, Zen, Arc, Comet e mais – conforme seu sistema, extensões e prioridades.`,
    pillBrowsers: (n) => `${n} navegadores`,
    pillUpdated: (u) => `atualizado em ${u}`,
    welcomeBold: "Boas-vindas",
    welcomeRest: "ao browserwall",
    welcomeSub: "Notas honestas, sem recomendações pagas",
    heroTitleTop: "Encontre seu",
    heroTitleBottom: "navegador.",
    heroCopy: (n) => `Responda a cinco perguntas rápidas e receba um ranking personalizado entre ${n} navegadores de desktop – com notas honestas, sem patrocínio.`,
    heroDots: ["Privacidade", "IA", "Produtividade", "Grátis"],
    startQuiz: "Fazer o quiz",
    searchLabel: "Buscar navegadores",
    searchPlaceholder: "Buscar navegadores…",
    searchResultsAria: "Navegadores encontrados",
    noSearchMatch: "Nenhum navegador chamado “{q}” –",
    tryQuiz: "faça o quiz",
    wallTitle: "O mural",
    wallCopy: "Todo navegador de desktop que vale conhecer – dos gigantes aos forks independentes.",
    openWall: "Abrir o mural completo",
    scoreLabels: ["Privacidade", "Acabamento", "Minimalismo"],
    guideTitle: (y) => `Como escolher um navegador em ${y}`,
    guideCopy: "Quatro critérios que importam mais do que qualquer benchmark.",
    guides: [
      { h: "Comece pelo que não dá para mudar", p: "Seu sistema operacional e as extensões que você usa filtram mais rápido. A maioria usa Chromium (Chrome Web Store); forks do Firefox rodam extensões Firefox, incluindo o uBlock Origin completo.", links: [["Windows", "/best/browsers-for-windows"], ["Mac", "/best/browsers-for-mac"], ["Linux", "/best/browsers-for-linux"]] },
      { h: "Julgue a privacidade pelo modelo de negócio", p: "Um navegador mantido por anúncios tem incentivo para coletar dados, não importa o discurso. Avaliamos quem lucra com você e o que é bloqueado por padrão.", links: [["Mais privados", "/best/privacy-browsers"], ["Código aberto", "/best/open-source-browsers"]] },
      { h: "Decida quanta IA você quer", p: "Chrome, Edge e uma nova onda de navegadores trazem assistentes e agentes. Muitos enviam conteúdo das páginas à nuvem, então olhe também a nota de privacidade.", links: [["Navegadores IA", "/best/ai-browsers"], ["Agentes IA", "/best/agentic-ai-browsers"]] },
      { h: "Priorize fluxo de trabalho em vez de velocidade", p: "Abas verticais, espaços e tela dividida mudam muito mais o uso diário do que testes sintéticos em que todos empatam.", links: [["Abas verticais", "/best/browsers-with-vertical-tabs"], ["Leves", "/best/lightweight-browsers"], ["Minimalistas", "/best/minimal-browsers"]] },
    ],
    guideMore: {
      beforeAlt: "Quer trocar? Veja alternativas para",
      otherBrowsers: "outros navegadores",
      between: "Em dúvida entre dois?",
      compareLink: "Compare navegadores lado a lado",
      like: "como",
      orBrowse: "ou veja",
      allGuides: "todos os guias",
    },
    faqTitle: "Perguntas frequentes",
    faqCopy: "Respostas diretas baseadas nas nossas notas e pesquisas.",
    faq: (c) => [
      { q: `Qual é o melhor navegador em ${c.year}?`, a: `Não existe um único melhor navegador – depende do sistema, das extensões e de quanto você valoriza privacidade. Com prioridades equilibradas, nossos destaques são ${c.topAll}. O quiz gratuito do browserwall ranqueia todos os ${c.count} navegadores em cerca de dois minutos.` },
      { q: "Qual navegador é mais privado?", a: `Os que bloqueiam rastreadores por padrão e não ganham dinheiro com seus dados lideram: ${c.topPrivacy}. O Tor Browser vai mais longe, mas é mais lento e quebra mais sites.` },
      { q: "O Chrome é ruim para privacidade?", a: `O Chrome tira ${c.chromePrivacy}/5 em privacidade porque o negócio do Google é publicidade e ele bloqueia pouco rastreamento por padrão. Ainda assim, é muito polido (${c.chromeExp}/5). Para manter extensões do Chrome com mais privacidade, veja Brave, Helium ou ungoogled-chromium.` },
      { q: "Firefox ou Chrome?", a: `O Firefox marca ${c.ffPrivacy}/5 em privacidade e ${c.ffCustom}/5 em personalização; o Chrome marca ${c.chromePrivacy}/5 e ${c.chromeCustom}/5. O Chrome vem um pouco mais polido de fábrica (${c.chromeExp}/5 vs ${c.ffExp}/5), enquanto o Firefox é o principal fora do motor Chromium.` },
      { q: "O Brave é um bom navegador?", a: `O Brave tira ${c.bravePrivacy}/5 em privacidade graças ao forte bloqueio padrão, mas ${c.braveMinimal}/5 em minimalismo por incluir carteira cripto, recompensas, anúncio de VPN e assistente de IA. O Brave Origin é a edição enxuta sem esses extras (US$ 59,99 no Windows/macOS, grátis no Linux).` },
      { q: "Qual o melhor navegador para Mac, Windows e Linux?", a: `Mac: ${c.topMac}. Windows: ${c.topWin}. Linux: ${c.topLinux}. Cada guia traz o top 10 completo.` },
      { q: "Qual é o melhor navegador com IA?", a: `Ranqueados pela capacidade da IA e qualidade geral: ${c.topAi}. Para um agente que navega por você, confira o guia de navegadores com agentes de IA.` },
      { q: "Como o browserwall dá as notas?", a: "Cada navegador recebe notas editoriais de 1 a 5 em privacidade, experiência pronta, personalização, leveza e minimalismo, conferidas com análises, Reddit, Hacker News, privacytests.org e testes de RAM. Não há nota de velocidade de propósito, pois navegadores modernos empatam dentro da margem de erro." },
    ],
    endTitle: "Dois minutos. Uma lista certeira.",
    endCopy: "Sem conta, nada é salvo no servidor – suas respostas ficam na própria URL.",
  },

  cs: {
    metaTitle: (n, y) => `Jaký prohlížeč vybrat? ${n} srovnáno (${y}) – browserwall`,
    metaDesc: (n) => `Najděte správný webový prohlížeč za dvě minuty. Bezplatný kvíz seřadí ${n} desktopových prohlížečů – Chrome, Firefox, Safari, Edge, Brave, Zen, Arc, Comet a další – podle vašeho OS, doplňků a priorit.`,
    pillBrowsers: (n) => `${n} prohlížečů`,
    pillUpdated: (u) => `aktualizováno ${u}`,
    welcomeBold: "Vítejte",
    welcomeRest: "na browserwall",
    welcomeSub: "Upřímné známky, žádná placená doporučení",
    heroTitleTop: "Najděte svůj",
    heroTitleBottom: "prohlížeč.",
    heroCopy: (n) => `Odpovězte na pět rychlých otázek a získejte žebříček na míru z ${n} desktopových prohlížečů – s poctivým hodnocením bez sponzorovaných tipů.`,
    heroDots: ["Soukromí", "AI", "Workflow", "Zdarma"],
    startQuiz: "Spustit kvíz",
    searchLabel: "Hledat prohlížeče",
    searchPlaceholder: "Hledat prohlížeče…",
    searchResultsAria: "Nalezené prohlížeče",
    noSearchMatch: "Žádný prohlížeč „{q}“ –",
    tryQuiz: "zkuste kvíz",
    wallTitle: "Zeď prohlížečů",
    wallCopy: "Všechny desktopové prohlížeče, které stojí za pozornost – od obrů po indie forky.",
    openWall: "Otevřít celou zeď",
    scoreLabels: ["Soukromí", "Vyladění", "Minimal."],
    guideTitle: (y) => `Jak vybrat prohlížeč v roce ${y}`,
    guideCopy: "Čtyři otázky, na kterých záleží víc než na benchmarcích.",
    guides: [
      { h: "Začněte tím, co nezměníte", p: "Váš operační systém a doplňky, bez kterých se neobejdete, zúží výběr nejrychleji. Většina jede na Chromiu (Chrome Web Store); forky Firefoxu podporují plný uBlock Origin.", links: [["Windows", "/best/browsers-for-windows"], ["Mac", "/best/browsers-for-mac"], ["Linux", "/best/browsers-for-linux"]] },
      { h: "Hodnoťte soukromí podle byznysu", p: "Prohlížeč placený reklamou má důvod sbírat data, ať už slibuje cokoli. Hodnotíme, na čem vydělává autor a co blokuje v základu – ne marketing.", links: [["Nejsoukromější", "/best/privacy-browsers"], ["Open source", "/best/open-source-browsers"]] },
      { h: "Rozhodněte se, kolik AI chcete", p: "Chrome, Edge i nová vlna AI prohlížečů přidávají asistenty a agenty. Řada z nich posílá obsah stránek do cloudu, proto hlídejte i známku za soukromí.", links: [["AI prohlížeče", "/best/ai-browsers"], ["AI agenti", "/best/agentic-ai-browsers"]] },
      { h: "Dejte přednost pohodlí před testy rychlosti", p: "Svislé karty, pracovní plochy a rozdělený pohled ovlivní každodenní práci mnohem víc než pár procent v testech rychlosti.", links: [["Svislé karty", "/best/browsers-with-vertical-tabs"], ["Lehké", "/best/lightweight-browsers"], ["Minimalistické", "/best/minimal-browsers"]] },
    ],
    guideMore: {
      beforeAlt: "Odcházíte od prohlížeče? Podívejte se na alternativy k",
      otherBrowsers: "dalším prohlížečům",
      between: "Váháte mezi dvěma?",
      compareLink: "Porovnejte prohlížeče vedle sebe",
      like: "třeba",
      orBrowse: "nebo projděte",
      allGuides: "všechny průvodce",
    },
    faqTitle: "Časté otázky",
    faqCopy: "Přímé odpovědi z našich známek a rešerší.",
    faq: (c) => [
      { q: `Jaký je nejlepší webový prohlížeč v roce ${c.year}?`, a: `Jediný nejlepší prohlížeč neexistuje – záleží na vašem systému, doplňcích a nárocích na soukromí. Při vyvážených prioritách vedou ${c.topAll}. Bezplatný kvíz na browserwall seřadí všech ${c.count} prohlížečů asi za dvě minuty.` },
      { q: "Který prohlížeč nejvíc chrání soukromí?", a: `Nejvyšší známky mají prohlížeče, které v základu blokují sledování a nevydělávají na vašich datech: ${c.topPrivacy}. Tor Browser jde ještě dál, ale je pomalejší a na více webech dělá potíže.` },
      { q: "Je Chrome špatný pro soukromí?", a: `Chrome má na browserwall za soukromí ${c.chromePrivacy}/5, protože byznys Googlu stojí na reklamě a v základu blokuje minimum sledování. Pořád je ale skvěle vyladěný (${c.chromeExp}/5). Chcete-li doplňky z Chrome s lepším soukromím, mrkněte na Brave, Helium nebo ungoogled-chromium.` },
      { q: "Firefox nebo Chrome?", a: `Firefox má ${c.ffPrivacy}/5 za soukromí a ${c.ffCustom}/5 za přizpůsobení; Chrome má ${c.chromePrivacy}/5 a ${c.chromeCustom}/5. Chrome je po vybalení o chlup uhlazenější (${c.chromeExp}/5 vs ${c.ffExp}/5), Firefox je ale hlavní prohlížeč mimo jádro Chromium.` },
      { q: "Je Brave dobrý prohlížeč?", a: `Brave má za soukromí ${c.bravePrivacy}/5 díky silnému výchozímu blokování, ale jen ${c.braveMinimal}/5 za minimalismus, protože přibaluje krypto peněženku, odměny, nabídku VPN a AI asistenta. Brave Origin je ořezaná verze bez nich ($59.99 na Windows/macOS, na Linuxu zdarma).` },
      { q: "Jaký je nejlepší prohlížeč pro Mac, Windows a Linux?", a: `Mac: ${c.topMac}. Windows: ${c.topWin}. Linux: ${c.topLinux}. Každý průvodce obsahuje celou top 10.` },
      { q: "Jaký je nejlepší AI prohlížeč?", a: `Podle schopností AI a kvality prohlížeče kolem ní vedou: ${c.topAi}. Pro AI, která za vás na webech sama kliká, se podívejte na průvodce agentními AI prohlížeči.` },
      { q: "Jak browserwall prohlížeče hodnotí?", a: "Každý prohlížeč dostává redakční známky 1–5 za soukromí, vyladění po vybalení, přizpůsobení, lehkost a minimalismus, ověřené proti recenzím, diskusím na Redditu a Hacker News, privacytests.org a testům RAM. Známka za rychlost chybí záměrně, protože běžné prohlížeče jsou v rámci odchylky měření vyrovnané." },
    ],
    endTitle: "Dvě minuty. Jasný výběr.",
    endCopy: "Bez účtu, nic neukládáme – vaše odpovědi žijí jen v URL stránky.",
  },
};

export const QUIZ_PAGE_COPY: Record<Locale, QuizPageCopy> = {
  en: {
    metaTitle: (y) => `Browser quiz ${y}: which browser should I use? – browserwall`,
    metaDesc: (n) => `Find the best web browser for you in two minutes: pick your OS and extensions, set what matters (privacy, speed of setup, customisation, AI) and get a ranked shortlist from ${n} desktop browsers. Free, no sign-up.`,
    ldName: "browserwall browser quiz",
    ldDesc: "Interactive quiz that recommends a desktop web browser based on OS, extensions, priorities, must-have features and dealbreakers.",
    kicker: "Browser quiz",
    h1: "Find your browser",
    sub: "Five quick steps. Answers stay on your device, and you can keep tuning the results afterwards.",
    formAria: "Quiz",
    stepsAria: "Steps",
    steps: ["Computer", "Extensions", "Priorities", "Features", "Dealbreakers"],
    tuneTitle: "Tune your answers",
    tuneSub: "– results update live",
    q0: "Which computer is this for?",
    q1: "Which extension store do you need?",
    q1Help: "Most extensions exist in both. This matters if one specific extension is a must for you.",
    q2: "How much does each of these matter?",
    q2Help: "Sliders only change the order of the results – they never remove a browser. To rule things out, use must-haves and dealbreakers in the next steps.",
    q3: "Which features matter to you?",
    niceExplainTitle: "Nice to have",
    niceExplainBody: "Browsers that have it go to the top (after the best picks for any \"Top priority\" slider). Nobody is removed.",
    mustExplainTitle: "Must have",
    mustExplainBody: "Every browser without it is removed.",
    optDontCare: "Don't care",
    optNice: "Nice to have",
    optMust: "Must have",
    q4: "Any dealbreakers?",
    q4Help: "Browsers with any of these are removed completely. Skip this if nothing bothers you.",
    back: "Back",
    next: "Next",
    showMatches: "Show my matches",
    restart: "Start over",
    resultsTitle: "Your best matches",
    shareOpenTitle: "Get your browser personality card",
    shareOpenSub: "Wrapped-style, 5 designs incl. your full shortlist – share it on X, Bluesky, Reddit, Discord, Instagram…",
    moreTitle: "Also worth a look",
    howTitle: "How this works",
    howBody: "Your OS, extension store, must-haves and dealbreakers are filters: a browser that fails any of them is removed. Everything else only changes the order. Each slider sets how much one of our 1–5 scores counts (privacy, out-of-box experience, customisation, lightness, minimalism, plus how well-known a browser is), from \"Don't care\" to \"Top priority\". If you set a slider to \"Top priority\", 1st and 2nd place go to the two browsers that score best on it. After that, nice-to-haves come first: a browser with more of the ones you picked ranks above one with fewer, and the sliders decide the order among browsers that have the same. AI features are graded by how capable the AI is, so a stronger assistant ranks above a basic one. \"Match\" compares a browser's total with the best possible total for your answers. Discontinued, beta/nightly, developer-only, experimental and meme browsers are never suggested, and neither are browsers with a history of selling user data or ones built mainly for old versions of Windows (Supermium, r3dfox, Pale Moon). Browsers whose scores are estimates are marked and count a little less.",
    aboutTitle: "About the browser quiz",
    readyListTitle: "Prefer a ready-made list?",
    categoryTitles: [
      "The best web browsers in {year}",
      "The most private web browsers in {year}",
      "The best browsers for Windows in {year}",
      "The best browsers for Mac in {year}",
      "The best browsers for Linux in {year}",
      "The best lightweight browsers in {year}",
      "The best AI browsers in {year}",
      "The best agentic AI browsers in {year}",
    ],
    faq: (n) => [
      { q: "Which browser should I use?", a: `It depends on your OS, the extensions you rely on and what you care about most. Most people do well with a privacy-respecting mainstream browser such as Firefox or Brave; Mac users often prefer Safari for battery life. This quiz compares ${n} desktop browsers against your answers and gives you a ranked shortlist with reasons.` },
      { q: "How does the browser quiz work?", a: "Five steps: your operating system, the extension store you need (Chrome Web Store or Firefox add-ons), how much privacy, polish, customisation, lightness, minimalism and familiarity matter to you, which features are nice-to-have or must-have, and your dealbreakers. Must-haves and dealbreakers filter browsers out; sliders and nice-to-haves decide the order." },
      { q: "Is the quiz free and private?", a: "Yes. It's free, needs no account and runs entirely in your browser – your answers are only kept in the page URL so you can share or bookmark the result." },
      { q: "Where do the scores come from?", a: "Every browser has editorial 1–5 scores for privacy, out-of-box experience, customisation, lightness and minimalism, re-checked in November 2026 against reviews, Reddit and Hacker News discussions, privacytests.org and RAM tests. Each browser page lists its sources." },
      { q: "Which browsers can it recommend?", a: "Actively developed, stable desktop browsers for Windows, macOS, Linux and BSD. It skips discontinued browsers, beta and nightly builds, developer-only tools, experiments, memes, browsers built for old Windows versions and browsers with a history of selling user data." },
      { q: "Can it find an AI browser?", a: "Yes. Mark \"AI assistant\" or \"AI agent that browses for you\" as nice-to-have or must-have. AI features are graded by how capable the AI is, so a strong assistant ranks above a basic chat sidebar. You can also exclude AI you can't switch off as a dealbreaker." },
    ],
    js: {
      hints: ["Press 1–4 to pick", "Press 1–3 to pick", "Enter to continue", "Enter to continue", "Enter to see your matches"],
      browsersWord: ["browser", "browsers"],
      leftCount: "{n} left",
      leftAria: "{n} browsers would remain",
      fitSuffix: "fit",
      mustHaveTitle: "Must have",
      niceToHaveTitle: "Nice to have",
      missingSuffix: " – missing",
      cardAria: "{name}, {match}% match. Show details",
      showDetails: "Show details",
      leadPrefix: "Best for your top priority: {lead}",
      estimate: "estimate",
      estimateTitle: "Scores are a rough estimate",
      matchWord: "{match}% match",
      paidPrefix: "Paid: {paid}",
      filteredOut: "Filtered out: {list}.",
      noneHtml: "<p>Nothing fits everything. The biggest filter is <b>{why}</b>. Try loosening it on the left.</p>",
    },
  },

  ru: {
    metaTitle: (y) => `Тест браузеров ${y}: какой браузер выбрать? – browserwall`,
    metaDesc: (n) => `Найдите лучший браузер за две минуты: выберите ОС и расширения, задайте приоритеты (приватность, удобство, кастомизация, ИИ) и получите рейтинг из ${n} браузеров. Бесплатно, без регистрации.`,
    ldName: "Тест подбора браузера browserwall",
    ldDesc: "Интерактивный тест, который подбирает десктопный браузер по ОС, расширениям, приоритетам, обязательным функциям и стоп-факторам.",
    kicker: "Тест браузеров",
    h1: "Найдите свой браузер",
    sub: "Пять быстрых шагов. Ответы остаются на вашем устройстве, а результат можно подкручивать в реальном времени.",
    formAria: "Тест",
    stepsAria: "Шаги",
    steps: ["Система", "Расширения", "Приоритеты", "Функции", "Стоп-факторы"],
    tuneTitle: "Настройте ответы",
    tuneSub: "– список обновляется сразу",
    q0: "Для какого компьютера вы ищете браузер?",
    q1: "Какой магазин расширений вам нужен?",
    q1Help: "Большинство расширений есть в обоих. Это важно, если вам нужно конкретное дополнение.",
    q2: "Насколько важно каждое из этих качеств?",
    q2Help: "Ползунки меняют только порядок в списке и никого не удаляют. Чтобы отсеять лишнее, используйте обязательные функции и стоп-факторы дальше.",
    q3: "Какие функции вам нужны?",
    niceExplainTitle: "Желательно",
    niceExplainBody: "Браузеры с этой функцией поднимаются наверх (после лидеров по «Главным» ползункам). Никто не исключается.",
    mustExplainTitle: "Обязательно",
    mustExplainBody: "Все браузеры без этой функции убираются из выдачи.",
    optDontCare: "Не важно",
    optNice: "Желательно",
    optMust: "Обязательно",
    q4: "Что для вас неприемлемо?",
    q4Help: "Браузеры с любым из выбранных пунктов полностью исключаются. Пропустите, если ничего не мешает.",
    back: "Назад",
    next: "Далее",
    showMatches: "Показать подборку",
    restart: "Начать заново",
    resultsTitle: "Лучшие совпадения",
    shareOpenTitle: "Создать карточку браузерного архетипа",
    shareOpenSub: "В стиле Wrapped, 5 дизайнов со списком — для X, Bluesky, Reddit, Discord, Instagram…",
    moreTitle: "Также стоит взглянуть",
    howTitle: "Как работает подбор",
    howBody: "ОС, магазин расширений, обязательные функции и стоп-факторы работают как жёсткие фильтры. Всё остальное влияет только на порядок. Каждый ползунок задаёт вес одной из оценок от 1 до 5 (приватность, удобство из коробки, кастомизация, лёгкость, минимализм и известность). Если выставить «Главное», 1-е и 2-е места занимают два лучших браузера по этому критерию. Далее в приоритете «Желательно», а ИИ оценивается по реальным возможностям ассистента. Закрытые, бета/ночные, чисто разработческие, мемные браузеры и сборки для старых Windows в рекомендации не попадают.",
    aboutTitle: "О тесте браузеров",
    readyListTitle: "Нужен готовый список?",
    categoryTitles: [
      "Лучшие браузеры в {year} году",
      "Самые приватные браузеры в {year} году",
      "Лучшие браузеры для Windows в {year}",
      "Лучшие браузеры для Mac в {year}",
      "Лучшие браузеры для Linux в {year}",
      "Лучшие лёгкие браузеры в {year}",
      "Лучшие ИИ-браузеры в {year}",
      "Лучшие браузеры с ИИ-агентами в {year}",
    ],
    faq: (n) => [
      { q: "Какой браузер мне выбрать?", a: `Зависит от вашей ОС, расширений и приоритетов. Многим хорошо подходят приватные массовые браузеры вроде Firefox или Brave, а на Mac ради автономности часто выбирают Safari. Тест сравнивает ${n} десктопных браузеров по вашим ответам и объясняет выбор.` },
      { q: "Как устроен тест?", a: "Пять шагов: ваша ОС, магазин расширений (Chrome Web Store или дополнения Firefox), ползунки приоритетов, желательные/обязательные функции и стоп-факторы. Жёсткие фильтры отсеивают неподходящее, а ползунки определяют порядок." },
      { q: "Тест бесплатный и приватный?", a: "Да. Он бесплатный, без регистрации и работает полностью локально в браузере — ваши ответы сохраняются только в URL страницы." },
      { q: "Откуда берутся оценки?", a: "Каждый браузер имеет редакционные оценки 1–5 за приватность, удобство из коробки, кастомизацию, лёгкость и минимализм, проверенные в ноябре 2026 по обзорам, обсуждениям на Reddit и Hacker News, privacytests.org и замерам ОЗУ." },
      { q: "Какие браузеры участвуют в подборе?", a: "Активно развиваемые стабильные десктопные браузеры для Windows, macOS, Linux и BSD. Закрытые, бета/ночные, мемные, устаревшие и замеченные в продаже данных пользователей исключены." },
      { q: "Можно ли подобрать ИИ-браузер?", a: "Да. Отметьте «ИИ-ассистент» или «ИИ-агент, который действует сам» как желательное или обязательное, либо наоборот исключите неотключаемый ИИ в стоп-факторах." },
    ],
    js: {
      hints: ["Нажмите 1–4 для выбора", "Нажмите 1–3 для выбора", "Enter для продолжения", "Enter для продолжения", "Enter — показать результаты"],
      browsersWord: ["браузер", "браузера", "браузеров"],
      leftCount: "осталось {n}",
      leftAria: "Останется {n} браузеров",
      fitSuffix: "подходят",
      mustHaveTitle: "Обязательно",
      niceToHaveTitle: "Желательно",
      missingSuffix: " – нет",
      cardAria: "{name}, совпадение {match}%. Подробнее",
      showDetails: "Подробнее",
      leadPrefix: "Лидер по главному приоритету: {lead}",
      estimate: "оценка",
      estimateTitle: "Оценки приблизительные",
      matchWord: "совпадение {match}%",
      paidPrefix: "Платно: {paid}",
      filteredOut: "Исключено: {list}.",
      noneHtml: "<p>Ни один браузер не прошёл все условия. Самый жёсткий фильтр: <b>{why}</b>. Попробуйте ослабить его слева.</p>",
    },
  },

  fr: {
    metaTitle: (y) => `Quiz navigateur ${y} : quel navigateur choisir ? – browserwall`,
    metaDesc: (n) => `Trouvez le meilleur navigateur en deux minutes : choisissez votre OS, vos extensions et vos priorités (vie privée, simplicité, personnalisation, IA) parmi ${n} navigateurs de bureau. Gratuit, sans inscription.`,
    ldName: "Quiz navigateur browserwall",
    ldDesc: "Quiz interactif qui recommande un navigateur de bureau selon votre OS, vos extensions, vos priorités et vos critères éliminatoires.",
    kicker: "Quiz navigateur",
    h1: "Trouvez votre navigateur",
    sub: "Cinq étapes rapides. Vos réponses restent sur votre appareil et vous pouvez ajuster le résultat ensuite.",
    formAria: "Quiz",
    stepsAria: "Étapes",
    steps: ["Système", "Extensions", "Priorités", "Fonctions", "Exclusions"],
    tuneTitle: "Ajuster vos réponses",
    tuneSub: "– mise à jour en direct",
    q0: "Pour quel ordinateur ?",
    q1: "De quelle boutique d'extensions avez-vous besoin ?",
    q1Help: "La plupart existent dans les deux. Utile si une extension précise est indispensable pour vous.",
    q2: "Quelle importance accordez-vous à chaque critère ?",
    q2Help: "Les curseurs changent uniquement l'ordre des résultats – ils ne suppriment aucun navigateur. Utilisez les étapes suivantes pour filtrer.",
    q3: "Quelles fonctionnalités comptent pour vous ?",
    niceExplainTitle: "Apprécié",
    niceExplainBody: "Les navigateurs compatibles remontent en tête (après les choix « Priorité absolue »). Aucun n'est retiré.",
    mustExplainTitle: "Indispensable",
    mustExplainBody: "Tout navigateur qui ne l'a pas est retiré de la liste.",
    optDontCare: "Sans avis",
    optNice: "Apprécié",
    optMust: "Indispensable",
    q4: "Des critères éliminatoires ?",
    q4Help: "Tout navigateur concerné est exclu d'office. Passez cette étape si rien ne vous gêne.",
    back: "Retour",
    next: "Suivant",
    showMatches: "Voir mes résultats",
    restart: "Recommencer",
    resultsTitle: "Vos meilleurs choix",
    shareOpenTitle: "Obtenir votre carte de personnalité navigateur",
    shareOpenSub: "Style Wrapped, 5 designs avec votre sélection complète – partagez sur X, Bluesky, Reddit, Discord, Instagram…",
    moreTitle: "Également à envisager",
    howTitle: "Comment ça marche",
    howBody: "Votre OS, votre boutique d'extensions, vos indispensables et vos exclusions filtrent les navigateurs. Tout le reste modifie seulement le classement. Chaque curseur règle le poids d'une note de 1 à 5 (vie privée, prêt à l'emploi, personnalisation, légèreté, minimalisme et notoriété). Avec « Priorité absolue », les 1re et 2e places reviennent aux deux meilleurs sur ce critère. Les navigateurs abandonnés, bêta/nightly, purement dev, expérimentaux ou mèmes ne sont jamais proposés.",
    aboutTitle: "À propos du quiz",
    readyListTitle: "Vous préférez un guide tout prêt ?",
    categoryTitles: [
      "Meilleurs navigateurs web en {year}",
      "Navigateurs les plus privés en {year}",
      "Meilleurs navigateurs pour Windows en {year}",
      "Meilleurs navigateurs pour Mac en {year}",
      "Meilleurs navigateurs pour Linux en {year}",
      "Meilleurs navigateurs légers en {year}",
      "Meilleurs navigateurs IA en {year}",
      "Meilleurs navigateurs agentiques en {year}",
    ],
    faq: (n) => [
      { q: "Quel navigateur utiliser ?", a: `Tout dépend de votre OS, de vos extensions et de vos priorités. Firefox ou Brave conviennent très bien à la majorité ; sur Mac, Safari excelle sur l'autonomie. Ce quiz compare ${n} navigateurs de bureau à vos réponses et justifie chaque choix.` },
      { q: "Comment fonctionne le quiz ?", a: "Cinq étapes : système d'exploitation, boutique d'extensions (Chrome Web Store ou modules Firefox), priorités par curseurs, fonctionnalités souhaitées/requises et exclusions. Les filtres éliminent, les curseurs ordonnent." },
      { q: "Le quiz est-il gratuit et privé ?", a: "Oui. Sans compte et entièrement exécuté dans votre navigateur – vos réponses ne sont enregistrées que dans l'URL de la page." },
      { q: "D'où viennent les notes ?", a: "Chaque navigateur a des notes éditoriales de 1 à 5 (vie privée, finition, personnalisation, légèreté, minimalisme), vérifiées en novembre 2026 via des tests, Reddit, Hacker News, privacytests.org et des mesures de RAM." },
      { q: "Quels navigateurs peuvent être recommandés ?", a: "Uniquement des navigateurs stables et activement maintenus sur Windows, macOS, Linux et BSD – sans bêtas, logiciels abandonnés, mèmes ni éditeurs vendant des données." },
      { q: "Peut-il trouver un navigateur IA ?", a: "Oui. Cochez « Assistant IA » ou « Agent IA » en souhaité ou indispensable, ou excluez à l'inverse les IA impossibles à désactiver." },
    ],
    js: {
      hints: ["Tapez 1–4 pour choisir", "Tapez 1–3 pour choisir", "Entrée pour continuer", "Entrée pour continuer", "Entrée pour voir les résultats"],
      browsersWord: ["navigateur", "navigateurs"],
      leftCount: "{n} restant(s)",
      leftAria: "{n} navigateurs resteraient",
      fitSuffix: "correspond(ent)",
      mustHaveTitle: "Indispensable",
      niceToHaveTitle: "Apprécié",
      missingSuffix: " – absent",
      cardAria: "{name}, {match}% d'affinité. Voir les détails",
      showDetails: "Voir les détails",
      leadPrefix: "Meilleur sur votre priorité : {lead}",
      estimate: "estimation",
      estimateTitle: "Notes estimées approximativement",
      matchWord: "{match}% d'affinité",
      paidPrefix: "Payant : {paid}",
      filteredOut: "Exclus : {list}.",
      noneHtml: "<p>Rien ne coche tout. Le filtre le plus strict est <b>{why}</b>. Essayez de l'assouplir à gauche.</p>",
    },
  },

  pt: {
    metaTitle: (y) => `Quiz de navegadores ${y}: qual navegador usar? – browserwall`,
    metaDesc: (n) => `Descubra o melhor navegador para você em dois minutos: escolha sistema, extensões e prioridades (privacidade, praticidade, personalização, IA) entre ${n} navegadores de desktop. Grátis, sem cadastro.`,
    ldName: "Quiz de navegadores browserwall",
    ldDesc: "Quiz interativo que recomenda um navegador de desktop conforme sistema, extensões, prioridades e critérios eliminatórios.",
    kicker: "Quiz de navegadores",
    h1: "Encontre seu navegador",
    sub: "Cinco passos rápidos. As respostas ficam no seu aparelho e você pode ajustar o resultado depois.",
    formAria: "Quiz",
    stepsAria: "Etapas",
    steps: ["Sistema", "Extensões", "Prioridades", "Recursos", "Eliminatórios"],
    tuneTitle: "Ajuste suas respostas",
    tuneSub: "– resultados atualizam na hora",
    q0: "Para qual computador é?",
    q1: "Qual loja de extensões você precisa?",
    q1Help: "A maioria das extensões existe nas duas. Isso importa se alguma extensão específica for indispensável.",
    q2: "Quanto cada qualidade importa?",
    q2Help: "Os controles só mudam a ordem da lista – nunca removem um navegador. Para filtrar, use as próximas etapas.",
    q3: "Quais recursos importam para você?",
    niceExplainTitle: "Seria bom",
    niceExplainBody: "Navegadores com esse recurso sobem para o topo (após os líderes de \"Prioridade\"). Nenhum é removido.",
    mustExplainTitle: "Obrigatório",
    mustExplainBody: "Qualquer navegador sem esse recurso é removido.",
    optDontCare: "Tanto faz",
    optNice: "Seria bom",
    optMust: "Obrigatório",
    q4: "Algum fator eliminatório?",
    q4Help: "Navegadores com qualquer um destes itens são removidos. Pule se nada incomodar.",
    back: "Voltar",
    next: "Próximo",
    showMatches: "Ver recomendações",
    restart: "Recomeçar",
    resultsTitle: "Melhores combinações",
    shareOpenTitle: "Gerar seu cartão de personalidade",
    shareOpenSub: "Estilo Wrapped, 5 layouts com seu ranking completo – compartilhe no X, Bluesky, Reddit, Discord, Instagram…",
    moreTitle: "Também vale olhar",
    howTitle: "Como funciona",
    howBody: "Sistema, loja de extensões, itens obrigatórios e eliminatórios funcionam como filtros. Todo o resto muda apenas a ordem. Cada controle define o peso de uma nota de 1 a 5 (privacidade, experiência pronta, personalização, leveza, minimalismo e popularidade). Quando um item fica em \"Prioridade\", o 1º e o 2º lugares vão para os dois melhores nele. Navegadores descontinuados, beta/nightly, só para devs, experimentais e memes nunca são recomendados.",
    aboutTitle: "Sobre o quiz",
    readyListTitle: "Prefere uma lista pronta?",
    categoryTitles: [
      "Melhores navegadores em {year}",
      "Navegadores mais privados em {year}",
      "Melhores navegadores para Windows em {year}",
      "Melhores navegadores para Mac em {year}",
      "Melhores navegadores para Linux em {year}",
      "Melhores navegadores leves em {year}",
      "Melhores navegadores com IA em {year}",
      "Melhores navegadores com agentes de IA em {year}",
    ],
    faq: (n) => [
      { q: "Qual navegador devo usar?", a: `Depende do sistema, das extensões e do que você prioriza. Muita gente se dá bem com Firefox ou Brave; no Mac, o Safari rende mais bateria. O quiz compara ${n} navegadores com suas respostas e mostra os motivos.` },
      { q: "Como o quiz funciona?", a: "Cinco passos: sistema operacional, loja de extensões (Chrome Web Store ou Firefox), controles de prioridade, recursos desejados/obrigatórios e eliminatórios." },
      { q: "É grátis e privado?", a: "Sim. Grátis, sem conta e roda 100% no seu navegador – as respostas ficam apenas na URL para compartilhar ou salvar." },
      { q: "De onde vêm as notas?", a: "Notas editoriais de 1 a 5 em privacidade, praticidade, personalização, leveza e minimalismo, revisadas em novembro de 2026 com base em análises, Reddit, Hacker News, privacytests.org e testes de RAM." },
      { q: "Quais navegadores podem aparecer?", a: "Navegadores de desktop ativos e estáveis para Windows, macOS, Linux e BSD. Versões beta, descontinuadas, memes e focadas em sistemas muito antigos ficam de fora." },
      { q: "Ele encontra navegadores com IA?", a: "Sim. Marque \"Assistente de IA\" ou \"Agente de IA\" como desejado ou obrigatório – ou elimine IA que não pode ser desligada." },
    ],
    js: {
      hints: ["Tecle 1–4 para escolher", "Tecle 1–3 para escolher", "Enter para continuar", "Enter para continuar", "Enter para ver resultados"],
      browsersWord: ["navegador", "navegadores"],
      leftCount: "restam {n}",
      leftAria: "Restariam {n} navegadores",
      fitSuffix: "combinam",
      mustHaveTitle: "Obrigatório",
      niceToHaveTitle: "Desejável",
      missingSuffix: " – ausente",
      cardAria: "{name}, {match}% compatível. Ver detalhes",
      showDetails: "Ver detalhes",
      leadPrefix: "Melhor na sua prioridade: {lead}",
      estimate: "estimativa",
      estimateTitle: "Notas estimadas",
      matchWord: "{match}% compatível",
      paidPrefix: "Pago: {paid}",
      filteredOut: "Filtrados: {list}.",
      noneHtml: "<p>Nada atende a tudo. O maior filtro é <b>{why}</b>. Tente relaxá-lo à esquerda.</p>",
    },
  },

  cs: {
    metaTitle: (y) => `Kvíz prohlížečů ${y}: jaký prohlížeč si vybrat? – browserwall`,
    metaDesc: (n) => `Najděte nejlepší prohlížeč za dvě minuty: vyberte OS a doplňky, nastavte priority (soukromí, vyladění, úpravy, AI) a získejte žebříček z ${n} desktopových prohlížečů. Zdarma, bez registrace.`,
    ldName: "Kvíz prohlížečů browserwall",
    ldDesc: "Interaktivní kvíz doporučující desktopový prohlížeč podle OS, doplňků, priorit, povinných funkcí a stopek.",
    kicker: "Kvíz prohlížečů",
    h1: "Najděte svůj prohlížeč",
    sub: "Pět rychlých kroků. Odpovědi zůstávají ve vašem zařízení a výsledek můžete kdykoli doladit.",
    formAria: "Kvíz",
    stepsAria: "Kroky",
    steps: ["Počítač", "Doplňky", "Priority", "Funkce", "Stopky"],
    tuneTitle: "Upravit odpovědi",
    tuneSub: "– výsledky se mění živě",
    q0: "Pro jaký počítač prohlížeč hledáte?",
    q1: "Jaký obchod s doplňky potřebujete?",
    q1Help: "Většina doplňků je v obou. Záleží na tom, jestli bez konkrétního rozšíření nemůžete být.",
    q2: "Jak moc vám záleží na těchto vlastnostech?",
    q2Help: "Posuvníky mění jen pořadí výsledků – žádný prohlížeč nevyřazují. K vyřazení slouží povinné funkce a stopky v dalších krocích.",
    q3: "Které funkce jsou pro vás důležité?",
    niceExplainTitle: "Hodí se",
    niceExplainBody: "Prohlížeče s touto funkcí jdou nahoru (hned za špičku podle „Prioritních“ posuvníků). Nikdo nevypadává.",
    mustExplainTitle: "Musí mít",
    mustExplainBody: "Každý prohlížeč bez této funkce je vyřazen.",
    optDontCare: "Nezáleží",
    optNice: "Hodí se",
    optMust: "Musí mít",
    q4: "Nějaké stopky?",
    q4Help: "Prohlížeče s kteroukoli z těchto věcí se úplně vyřadí. Přeskočte, pokud vám nic nevadí.",
    back: "Zpět",
    next: "Další",
    showMatches: "Ukázat shody",
    restart: "Začít znovu",
    resultsTitle: "Nejlepší shody pro vás",
    shareOpenTitle: "Získat kartu prohlížečové osobnosti",
    shareOpenSub: "Styl Wrapped, 5 motivů včetně celého žebříčku – sdílejte na X, Bluesky, Reddit, Discord, Instagram…",
    moreTitle: "Stojí také za zvážení",
    howTitle: "Jak to funguje",
    howBody: "OS, obchod s doplňky, povinné funkce a stopky fungují jako tvrdé filtry. Vše ostatní mění jen pořadí. Posuvníky určují váhu redakčních známek 1–5 (soukromí, vyladění po vybalení, přizpůsobení, lehkost, minimalismus a známost). Pokud posuvník nastavíte na „Priorita“, 1. a 2. místo obsadí dva nejlepší prohlížeče v dané oblasti. Ukončené, beta/nightly, čistě vývojářské, experimentální a meme prohlížeče se nikdy nedoporučují.",
    aboutTitle: "O kvízu prohlížečů",
    readyListTitle: "Raději hotový žebříček?",
    categoryTitles: [
      "Nejlepší webové prohlížeče v roce {year}",
      "Nejsoukromější prohlížeče v roce {year}",
      "Nejlepší prohlížeče pro Windows v roce {year}",
      "Nejlepší prohlížeče pro Mac v roce {year}",
      "Nejlepší prohlížeče pro Linux v roce {year}",
      "Nejlepší lehké prohlížeče v roce {year}",
      "Nejlepší AI prohlížeče v roce {year}",
      "Nejlepší agentní AI prohlížeče v roce {year}",
    ],
    faq: (n) => [
      { q: "Který prohlížeč si mám vybrat?", a: `Záleží na systému, doplňcích a prioritách. Většině lidí dobře poslouží Firefox nebo Brave; na Macu vede výdrží Safari. Kvíz porovná ${n} prohlížečů s vašimi odpověďmi a ukáže důvody.` },
      { q: "Jak kvíz funguje?", a: "Pět kroků: operační systém, obchod s doplňky (Chrome Web Store nebo doplňky Firefoxu), posuvníky priorit, chtěné/povinné funkce a stopky." },
      { q: "Je kvíz zdarma a soukromý?", a: "Ano. Zdarma, bez účtu a běží celý v prohlížeči – odpovědi se drží jen v URL stránky." },
      { q: "Odkud pocházejí známky?", a: "Redakční hodnocení 1–5 za soukromí, vyladění, přizpůsobení, lehkost a minimalismus, ověřené v listopadu 2026 podle recenzí, Redditu, Hacker News, privacytests.org a testů RAM." },
      { q: "Které prohlížeče doporučuje?", a: "Aktivně vyvíjené stabilní prohlížeče pro Windows, macOS, Linux a BSD. Vynechává ukončené, beta verze, memy a prohlížeče pro stará Windows." },
      { q: "Najde i AI prohlížeč?", a: "Ano. Označte „AI asistent“ nebo „AI agent“ jako chtěné či povinné – nebo naopak ve stopkách vyřaďte AI, která nejde vypnout." },
    ],
    js: {
      hints: ["Stiskněte 1–4 pro výběr", "Stiskněte 1–3 pro výběr", "Enter pro pokračování", "Enter pro pokračování", "Enter zobrazí shody"],
      browsersWord: ["prohlížeč", "prohlížeče", "prohlížečů"],
      leftCount: "zbývá {n}",
      leftAria: "Zůstalo by {n} prohlížečů",
      fitSuffix: "sedí",
      mustHaveTitle: "Musí mít",
      niceToHaveTitle: "Hodí se",
      missingSuffix: " – chybí",
      cardAria: "{name}, {match}% shoda. Zobrazit detail",
      showDetails: "Zobrazit detail",
      leadPrefix: "Nejlepší pro vaši prioritu: {lead}",
      estimate: "odhad",
      estimateTitle: "Známky jsou hrubý odhad",
      matchWord: "{match}% shoda",
      paidPrefix: "Placené: {paid}",
      filteredOut: "Vyřazeno: {list}.",
      noneHtml: "<p>Všem podmínkám nevyhovuje nic. Nejsilnější filtr je <b>{why}</b>. Zkuste ho vlevo uvolnit.</p>",
    },
  },
};

export const WALL_PAGE_COPY: Record<Locale, WallPageCopy> = {
  en: {
    metaTitle: (n, y) => `All ${n} desktop browsers, scored (${y}) – browserwall`,
    metaDesc: (n) => `A curated wall of ${n} desktop browsers – Chrome, Firefox, Safari, Edge, Brave, Arc, Zen, Comet and the rest – with honest privacy and feature scores, filters, a tier list maker and a 2-minute quiz to find yours.`,
    ldName: "Desktop web browsers",
    h1: "Every browser worth knowing.",
    heroSub: (n, alive) => `${n} desktop browsers – the giants, the forks, the terminal dwellers, the dead and a couple of memes. ${alive} still alive. Click any card for details.`,
    controlsAria: "Filter browsers",
    searchPlaceholder: "Search name, engine, feature…",
    searchAria: "Search browsers",
    filtersBtn: "Filters",
    filtersTitle: "Filters",
    closeFilters: "Close filters",
    osAria: "Operating system",
    engineAria: "Engine",
    statusAria: "Status",
    aliveOnly: "Alive only",
    openSource: "Open source",
    rip: "RIP",
    featuresAria: "Features",
    showPrefix: "Show",
    showSuffix: ["browser", "browsers"],
    reset: "Clear filters",
    sortAria: "Sort order",
    mostUsed: "Most used",
    mostUsedTitle: "Roughly by how many people use them – not a quality ranking",
    az: "A–Z",
    empty: "No browser matches that. Maybe build one?",
    guidesHeading: "Guides",
    alternativesLink: "Browser alternatives",
    orderNote: "Default order is roughly how widely used each browser is, then A–Z – it is not a ranking. Click any card for details and scores.",
    browsersWord: ["browser", "browsers"],
    categoryTitles: [],
  },
  ru: {
    metaTitle: (n, y) => `Все ${n} десктопных браузеров с оценками (${y}) – browserwall`,
    metaDesc: (n) => `Стена из ${n} десктопных браузеров — Chrome, Firefox, Safari, Edge, Brave, Arc, Zen, Comet и другие — с честными оценками, фильтрами, тир-листом и тестом на 2 минуты.`,
    ldName: "Десктопные веб-браузеры",
    h1: "Все браузеры, о которых стоит знать.",
    heroSub: (n, alive) => `${n} десктопных браузеров — гиганты, форки, терминальные, закрытые и пара мемов. ${alive} ещё живы. Нажмите на любую карточку для деталей.`,
    controlsAria: "Фильтры браузеров",
    searchPlaceholder: "Поиск по названию, движку, функции…",
    searchAria: "Поиск браузеров",
    filtersBtn: "Фильтры",
    filtersTitle: "Фильтры",
    closeFilters: "Закрыть фильтры",
    osAria: "Операционная система",
    engineAria: "Движок",
    statusAria: "Статус",
    aliveOnly: "Только живые",
    openSource: "Открытый код",
    rip: "RIP",
    featuresAria: "Функции",
    showPrefix: "Показать",
    showSuffix: ["браузер", "браузера", "браузеров"],
    reset: "Сбросить фильтры",
    sortAria: "Сортировка",
    mostUsed: "Популярные",
    mostUsedTitle: "Примерно по числу пользователей — не рейтинг качества",
    az: "А–Я / A–Z",
    empty: "Ничего не нашлось. Может, написать свой?",
    guidesHeading: "Гиды",
    alternativesLink: "Альтернативы браузерам",
    orderNote: "Порядок по умолчанию — примерно по распространённости, затем по алфавиту, это не рейтинг. Нажмите на карточку для подробностей.",
    browsersWord: ["браузер", "браузера", "браузеров"],
    categoryTitles: [],
  },
  fr: {
    metaTitle: (n, y) => `Tous les ${n} navigateurs de bureau notés (${y}) – browserwall`,
    metaDesc: (n) => `Un mur de ${n} navigateurs de bureau – Chrome, Firefox, Safari, Edge, Brave, Arc, Zen, Comet et les autres – avec notes honnêtes, filtres, tier list et quiz de 2 minutes.`,
    ldName: "Navigateurs web de bureau",
    h1: "Tous les navigateurs à connaître.",
    heroSub: (n, alive) => `${n} navigateurs de bureau – les géants, les forks, les adeptes du terminal, les disparus et deux ou trois mèmes. ${alive} encore actifs. Cliquez sur une carte pour les détails.`,
    controlsAria: "Filtrer les navigateurs",
    searchPlaceholder: "Nom, moteur, fonction…",
    searchAria: "Rechercher un navigateur",
    filtersBtn: "Filtres",
    filtersTitle: "Filtres",
    closeFilters: "Fermer les filtres",
    osAria: "Système d'exploitation",
    engineAria: "Moteur",
    statusAria: "Statut",
    aliveOnly: "Actifs seuls",
    openSource: "Open source",
    rip: "RIP",
    featuresAria: "Fonctionnalités",
    showPrefix: "Afficher",
    showSuffix: ["navigateur", "navigateurs"],
    reset: "Réinitialiser",
    sortAria: "Ordre de tri",
    mostUsed: "Les plus utilisés",
    mostUsedTitle: "Approximativement par popularité – pas un classement qualité",
    az: "A–Z",
    empty: "Aucun navigateur ne correspond. Peut-être en créer un ?",
    guidesHeading: "Guides",
    alternativesLink: "Alternatives aux navigateurs",
    orderNote: "L'ordre par défaut suit grossièrement l'usage, puis A–Z – ce n'est pas un classement. Cliquez sur une carte pour voir les notes.",
    browsersWord: ["navigateur", "navigateurs"],
    categoryTitles: [],
  },
  pt: {
    metaTitle: (n, y) => `Todos os ${n} navegadores de desktop avaliados (${y}) – browserwall`,
    metaDesc: (n) => `Um mural com ${n} navegadores de desktop – Chrome, Firefox, Safari, Edge, Brave, Arc, Zen, Comet e outros – com notas honestas, filtros, criador de tier list e quiz de 2 minutos.`,
    ldName: "Navegadores web de desktop",
    h1: "Todo navegador que vale conhecer.",
    heroSub: (n, alive) => `${n} navegadores de desktop – gigantes, forks, navegadores de terminal, descontinuados e alguns memes. ${alive} ainda ativos. Clique em qualquer cartão para ver detalhes.`,
    controlsAria: "Filtrar navegadores",
    searchPlaceholder: "Buscar nome, motor, recurso…",
    searchAria: "Buscar navegadores",
    filtersBtn: "Filtros",
    filtersTitle: "Filtros",
    closeFilters: "Fechar filtros",
    osAria: "Sistema operacional",
    engineAria: "Motor",
    statusAria: "Status",
    aliveOnly: "Só ativos",
    openSource: "Código aberto",
    rip: "RIP",
    featuresAria: "Recursos",
    showPrefix: "Mostrar",
    showSuffix: ["navegador", "navegadores"],
    reset: "Limpar filtros",
    sortAria: "Ordenação",
    mostUsed: "Mais usados",
    mostUsedTitle: "Aproximadamente por número de usuários – não é ranking de qualidade",
    az: "A–Z",
    empty: "Nenhum navegador corresponde. Que tal criar um?",
    guidesHeading: "Guias",
    alternativesLink: "Alternativas de navegadores",
    orderNote: "A ordem padrão segue aproximadamente a popularidade e depois A–Z – não é um ranking. Clique em qualquer cartão para ver notas e detalhes.",
    browsersWord: ["navegador", "navegadores"],
    categoryTitles: [],
  },
  cs: {
    metaTitle: (n, y) => `Všech ${n} desktopových prohlížečů s hodnocením (${y}) – browserwall`,
    metaDesc: (n) => `Přehled ${n} desktopových prohlížečů – Chrome, Firefox, Safari, Edge, Brave, Arc, Zen, Comet a další – s poctivými známkami, filtry, tier listem a 2minutovým kvízem.`,
    ldName: "Desktopové webové prohlížeče",
    h1: "Každý prohlížeč, který stojí za řeč.",
    heroSub: (n, alive) => `${n} desktopových prohlížečů – obři, forky, termináloví vytrvalci, mrtvé legendy i pár memů. ${alive} stále živých. Kliknutím na kartu zobrazíte podrobnosti.`,
    controlsAria: "Filtrovat prohlížeče",
    searchPlaceholder: "Hledat název, jádro, funkci…",
    searchAria: "Hledat prohlížeče",
    filtersBtn: "Filtry",
    filtersTitle: "Filtry",
    closeFilters: "Zavřít filtry",
    osAria: "Operační systém",
    engineAria: "Jádro",
    statusAria: "Stav",
    aliveOnly: "Jen živé",
    openSource: "Open source",
    rip: "RIP",
    featuresAria: "Funkce",
    showPrefix: "Zobrazit",
    showSuffix: ["prohlížeč", "prohlížeče", "prohlížečů"],
    reset: "Vymazat filtry",
    sortAria: "Řazení",
    mostUsed: "Nejpoužívanější",
    mostUsedTitle: "Zhruba podle rozšíření mezi lidmi – ne žebříček kvality",
    az: "A–Z",
    empty: "Tomu žádný prohlížeč neodpovídá. Co si napsat vlastní?",
    guidesHeading: "Průvodci",
    alternativesLink: "Alternativy prohlížečů",
    orderNote: "Výchozí pořadí zhruba odráží rozšíření a pak abecedu – nejde o žebříček. Kliknutím na libovolnou kartu otevřete detaily.",
    browsersWord: ["prohlížeč", "prohlížeče", "prohlížečů"],
    categoryTitles: [],
  },
};

export const TIERS_PAGE_COPY: Record<Locale, TiersPageCopy> = {
  en: {
    metaTitle: "Browser tier list maker: rank 80+ browsers – browserwall",
    metaDesc: "Make your own browser tier list: drag 80+ desktop browsers into S–D tiers, filter by Chromium, Firefox or WebKit, then share a link or save it as an image. Free, no sign-up.",
    h1: "Tier maker",
    heroSubBefore: "Rank browsers your way. Drag them into tiers, or tap one and then tap a tier. With the keyboard, focus a browser and press",
    heroSubAfter: "sends it back). It saves in this browser automatically.",
    listTitleLabel: "List title",
    defaultTitle: "My browser tier list",
    copyLink: "Copy link",
    saveImg: "Save image",
    reset: "Reset",
    tierNameAria: (n) => `Name of tier ${n}`,
    tierAria: (n) => `Tier ${n}`,
    tapPlace: "→ tap a tier to place it",
    details: "Details",
    backToPool: "Back to pool",
    cancelSel: "Cancel selection",
    poolAria: "Unplaced browsers",
    familyAria: "Browser family",
    allFam: "All",
    includeAria: "Include",
    channels: "Beta & nightly",
    discontinued: "Discontinued",
    memes: "Memes",
    findPlaceholder: "Find…",
    findAria: "Search unplaced browsers",
    onlyFiltered: "Tiers: only filtered",
    onlyFilteredTitle: "Send browsers that don't match the current filters back to the pool",
    poolEmpty: "Everything matching these filters is placed.",
    aboutHeading: "Rank every desktop browser",
    aboutP1: (n) => `The tier maker has every browser on browserwall – ${n} in total, from Chrome and Safari to Zen, Helium, Ladybird and long-dead classics like Netscape. Filter by family to make a Chromium-only or Firefox-fork tier list, hide beta channels and meme browsers, or use "Tiers: only filtered" to clear out everything that doesn't match.`,
    aboutP2Before: "Not sure where a browser belongs? Every one has a ",
    aboutP2Wall: "profile on the wall",
    aboutP2Mid: " with scores for privacy, out-of-box experience, customisation, lightness and minimalism. To find the S-tier browser for you rather than for the internet, take the ",
    aboutP2Quiz: "2-minute browser quiz",
    aboutP2After: ".",
    faqHeading: "FAQ",
    faq: (n) => [
      { q: "How do I make a browser tier list?", a: "Drag each browser from the pool into a tier from S (best) to D, or tap a browser and then tap a tier. On a keyboard, focus a browser and press 1–5; 0 sends it back. Rename the tiers and the list title by clicking them." },
      { q: "Can I share my tier list?", a: "Yes. Copy link puts your whole list into the URL, so anyone who opens it sees your tiers – nothing is uploaded. Save image downloads a PNG for Reddit, Discord or X." },
      { q: "Which browsers are included?", a: `All ${n} browsers on the wall: mainstream ones like Chrome, Edge, Safari and Firefox, privacy browsers like Brave, LibreWolf and Mullvad Browser, new ones like Zen, Arc, Dia and Comet, plus discontinued classics and meme browsers. Use the family filters to rank only Chromium, Firefox or WebKit browsers.` },
      { q: "Is my tier list saved?", a: "It saves automatically in this browser's local storage, so it's still there next time. Clearing site data or switching browsers starts a fresh list – copy the link first if you want to keep it." },
    ],
    js: {
      defaultTitle: "My browser tier list",
      unplacedSuffix: "unplaced",
      movedMsg: (n) => `Moved ${n} out-of-filter browser${n === 1 ? "" : "s"} back to the pool.`,
      alreadyFiltered: "Your tiers already only contain browsers matching the filters.",
      confirmClear: "Clear your tier list?",
      linkCopied: "Link copied.",
      copyPrompt: "Copy this link:",
      madeOn: "made on browserwall",
      loadedShared: "Loaded a shared tier list.",
    },
  },
  ru: {
    metaTitle: "Тир-лист браузеров: расставьте 80+ браузеров – browserwall",
    metaDesc: "Соберите свой тир-лист браузеров: перетащите 80+ десктопных браузеров по рангам S–D, отфильтруйте Chromium, Firefox или WebKit, поделитесь ссылкой или скачайте картинку.",
    h1: "Тир-лист",
    heroSubBefore: "Расставьте браузеры по-своему. Перетаскивайте их в тиры или нажмите на браузер, а затем на строку. С клавиатуры выберите браузер и нажмите",
    heroSubAfter: "вернёт обратно). Список сохраняется автоматически.",
    listTitleLabel: "Название списка",
    defaultTitle: "Мой тир-лист браузеров",
    copyLink: "Копировать ссылку",
    saveImg: "Сохранить PNG",
    reset: "Сброс",
    tierNameAria: (n) => `Название тира ${n}`,
    tierAria: (n) => `Тир ${n}`,
    tapPlace: "→ нажмите на тир, чтобы поместить",
    details: "Подробнее",
    backToPool: "Убрать назад",
    cancelSel: "Отменить выбор",
    poolAria: "Нераспределённые браузеры",
    familyAria: "Семейство браузера",
    allFam: "Все",
    includeAria: "Включить",
    channels: "Бета и nightly",
    discontinued: "Закрытые",
    memes: "Мемы",
    findPlaceholder: "Найти…",
    findAria: "Поиск нераспределённых браузеров",
    onlyFiltered: "В тирах: только по фильтру",
    onlyFilteredTitle: "Вернуть в пул браузеры, не подходящие под текущие фильтры",
    poolEmpty: "Все браузеры по этим фильтрам уже расставлены.",
    aboutHeading: "Оцените каждый десктопный браузер",
    aboutP1: (n) => `В конструкторе собраны все ${n} браузеров с browserwall — от Chrome и Safari до Zen, Helium, Ladybird и старой классики вроде Netscape. Фильтруйте по движку, скрывайте беты и мемы или очищайте лишнее одной кнопкой.`,
    aboutP2Before: "Не уверены, куда кого поставить? У каждого есть ",
    aboutP2Wall: "профиль на стене",
    aboutP2Mid: " с оценками за приватность, удобство, кастомизацию, лёгкость и минимализм. А чтобы подобрать S-тир лично под себя, пройдите ",
    aboutP2Quiz: "2-минутный тест браузеров",
    aboutP2After: ".",
    faqHeading: "Вопросы и ответы",
    faq: (n) => [
      { q: "Как составить тир-лист браузеров?", a: "Перетаскивайте браузеры в ранги от S (лучшие) до D или нажимайте по очереди на браузер и нужный ряд. С клавиатуры работают клавиши 1–5 и 0 для возврата. Названия тиров и заголовок можно редактировать по клику." },
      { q: "Можно ли поделиться тир-листом?", a: "Да. Кнопка «Копировать ссылку» зашивает весь список в URL без загрузки на сервер. «Сохранить PNG» скачивает готовую картинку для Reddit, Discord или Telegram." },
      { q: "Какие браузеры включены?", a: `Все ${n} браузеров со стены: популярные Chrome, Edge, Safari и Firefox, приватные Brave, LibreWolf и Mullvad, новые Zen, Arc, Dia и Comet, а также закрытая классика и мемы.` },
      { q: "Сохраняется ли мой список?", a: "Да, он автоматически хранится в localStorage вашего браузера. Перед очисткой данных сайта скопируйте ссылку." },
    ],
    js: {
      defaultTitle: "Мой тир-лист браузеров",
      unplacedSuffix: "в пуле",
      movedMsg: (n) => `Убрано из тиров обратно в пул: ${n}.`,
      alreadyFiltered: "В тирах и так только браузеры, подходящие под фильтры.",
      confirmClear: "Очистить весь тир-лист?",
      linkCopied: "Ссылка скопирована.",
      copyPrompt: "Скопируйте ссылку:",
      madeOn: "сделано на browserwall",
      loadedShared: "Загружен тир-лист по ссылке.",
    },
  },
  fr: {
    metaTitle: "Créateur de tier list navigateurs : classez 80+ navigateurs – browserwall",
    metaDesc: "Créez votre tier list de navigateurs : glissez 80+ navigateurs de bureau de S à D, filtrez par Chromium, Firefox ou WebKit, puis partagez un lien ou enregistrez l'image. Gratuit.",
    h1: "Tier maker",
    heroSubBefore: "Classez les navigateurs à votre façon. Glissez-les dans les rangs, ou touchez un navigateur puis une ligne. Au clavier, pressez",
    heroSubAfter: "le renvoie). Sauvegardé automatiquement dans ce navigateur.",
    listTitleLabel: "Titre de la liste",
    defaultTitle: "Ma tier list des navigateurs",
    copyLink: "Copier le lien",
    saveImg: "Enregistrer PNG",
    reset: "Réinitialiser",
    tierNameAria: (n) => `Nom du rang ${n}`,
    tierAria: (n) => `Rang ${n}`,
    tapPlace: "→ touchez un rang pour le placer",
    details: "Détails",
    backToPool: "Remettre en réserve",
    cancelSel: "Annuler la sélection",
    poolAria: "Navigateurs non classés",
    familyAria: "Famille de moteur",
    allFam: "Tous",
    includeAria: "Inclure",
    channels: "Bêta & nightly",
    discontinued: "Abandonnés",
    memes: "Mèmes",
    findPlaceholder: "Chercher…",
    findAria: "Rechercher dans la réserve",
    onlyFiltered: "Rangs : filtrés seuls",
    onlyFilteredTitle: "Renvoyer en réserve les navigateurs qui ne correspondent pas aux filtres actifs",
    poolEmpty: "Tous les navigateurs correspondant aux filtres sont placés.",
    aboutHeading: "Classez chaque navigateur de bureau",
    aboutP1: (n) => `Le tier maker rassemble tous les navigateurs de browserwall – ${n} au total, de Chrome et Safari à Zen, Helium, Ladybird et d'anciens classiques comme Netscape. Filtrez par famille pour ne classer que Chromium ou Firefox, ou masquez bêtas et mèmes.`,
    aboutP2Before: "Un doute sur un navigateur ? Chacun a sa ",
    aboutP2Wall: "fiche sur le mur",
    aboutP2Mid: " avec ses notes de vie privée, finition, personnalisation, légèreté et minimalisme. Et pour trouver votre propre rang S, passez le ",
    aboutP2Quiz: "quiz navigateur en 2 minutes",
    aboutP2After: ".",
    faqHeading: "FAQ",
    faq: (n) => [
      { q: "Comment faire une tier list ?", a: "Glissez chaque navigateur de la réserve vers un rang de S (meilleur) à D, ou cliquez sur un navigateur puis sur un rang. Au clavier : 1–5 pour placer, 0 pour retirer. Cliquez sur les titres pour les renommer." },
      { q: "Puis-je partager ma tier list ?", a: "Oui. « Copier le lien » encode toute la liste dans l'URL sans rien envoyer sur un serveur. « Enregistrer PNG » exporte une image prête pour Reddit, Discord ou X." },
      { q: "Quels navigateurs sont inclus ?", a: `Tous les ${n} navigateurs du mur : les grands noms, les spécialistes vie privée, les nouveautés IA et les anciens classiques.` },
      { q: "Ma liste est-elle sauvegardée ?", a: "Elle est enregistrée localement dans ce navigateur. Copiez le lien si vous changez d'appareil." },
    ],
    js: {
      defaultTitle: "Ma tier list des navigateurs",
      unplacedSuffix: "non classés",
      movedMsg: (n) => `${n} navigateur(s) hors filtre renvoyé(s) en réserve.`,
      alreadyFiltered: "Vos rangs ne contiennent déjà que des navigateurs filtrés.",
      confirmClear: "Effacer votre tier list ?",
      linkCopied: "Lien copié.",
      copyPrompt: "Copiez ce lien :",
      madeOn: "fait sur browserwall",
      loadedShared: "Tier list partagée chargée.",
    },
  },
  pt: {
    metaTitle: "Criador de tier list de navegadores: ranqueie 80+ – browserwall",
    metaDesc: "Monte sua tier list de navegadores: arraste 80+ navegadores de desktop para os níveis S–D, filtre por Chromium, Firefox ou WebKit e compartilhe o link ou baixe a imagem. Grátis.",
    h1: "Tier maker",
    heroSubBefore: "Ranqueie os navegadores do seu jeito. Arraste para os níveis ou toque em um navegador e depois em um nível. No teclado, foque e aperte",
    heroSubAfter: "devolve). Salvo automaticamente neste navegador.",
    listTitleLabel: "Título da lista",
    defaultTitle: "Minha tier list de navegadores",
    copyLink: "Copiar link",
    saveImg: "Salvar imagem",
    reset: "Limpar",
    tierNameAria: (n) => `Nome do nível ${n}`,
    tierAria: (n) => `Nível ${n}`,
    tapPlace: "→ toque em um nível para colocar",
    details: "Detalhes",
    backToPool: "Voltar à lista",
    cancelSel: "Cancelar seleção",
    poolAria: "Navegadores não posicionados",
    familyAria: "Família do navegador",
    allFam: "Todos",
    includeAria: "Incluir",
    channels: "Beta e nightly",
    discontinued: "Descontinuados",
    memes: "Memes",
    findPlaceholder: "Buscar…",
    findAria: "Buscar navegadores não posicionados",
    onlyFiltered: "Níveis: só filtrados",
    onlyFilteredTitle: "Devolver à lista navegadores que não batem com os filtros atuais",
    poolEmpty: "Tudo que bate com esses filtros já foi posicionado.",
    aboutHeading: "Ranqueie cada navegador de desktop",
    aboutP1: (n) => `O criador de tier list reúne todos os ${n} navegadores do browserwall – de Chrome e Safari a Zen, Helium, Ladybird e clássicos antigos como Netscape. Filtre por família para ranquear só Chromium ou forks do Firefox.`,
    aboutP2Before: "Em dúvida sobre algum? Cada um tem um ",
    aboutP2Wall: "perfil no mural",
    aboutP2Mid: " com notas de privacidade, experiência pronta, personalização, leveza e minimalismo. E para achar o navegador ideal para você, faça o ",
    aboutP2Quiz: "quiz de 2 minutos",
    aboutP2After: ".",
    faqHeading: "Perguntas frequentes",
    faq: (n) => [
      { q: "Como monto uma tier list?", a: "Arraste cada navegador para um nível de S (melhor) a D, ou toque no navegador e no nível. No teclado, use 1–5 e 0 para devolver. Clique nos nomes para renomear." },
      { q: "Posso compartilhar minha tier list?", a: "Sim. Copiar link coloca tudo na URL sem enviar nada ao servidor. Salvar imagem baixa um PNG para Reddit, Discord ou X." },
      { q: "Quais navegadores estão incluídos?", a: `Todos os ${n} navegadores do mural: populares, focados em privacidade, novos navegadores de IA, clássicos descontinuados e memes.` },
      { q: "Minha lista fica salva?", a: "Sim, automaticamente no armazenamento local deste navegador. Copie o link se quiser guardar em outro lugar." },
    ],
    js: {
      defaultTitle: "Minha tier list de navegadores",
      unplacedSuffix: "restantes",
      movedMsg: (n) => `${n} navegador(es) fora do filtro devolvido(s) à lista.`,
      alreadyFiltered: "Seus níveis já contêm apenas navegadores que batem com os filtros.",
      confirmClear: "Limpar sua tier list?",
      linkCopied: "Link copiado.",
      copyPrompt: "Copie este link:",
      madeOn: "feito no browserwall",
      loadedShared: "Tier list compartilhada carregada.",
    },
  },
  cs: {
    metaTitle: "Tvůrce tier listu prohlížečů: seřaďte 80+ prohlížečů – browserwall",
    metaDesc: "Vytvořte si vlastní tier list prohlížečů: přetáhněte 80+ desktopových prohlížečů do řad S–D, filtrujte Chromium, Firefox nebo WebKit a sdílejte odkaz či obrázek. Zdarma.",
    h1: "Tier maker",
    heroSubBefore: "Seřaďte si prohlížeče po svém. Přetáhněte je do řad, nebo klikněte na prohlížeč a pak na řadu. Klávesnicí stiskněte",
    heroSubAfter: "vrátí zpět). Ukládá se automaticky v tomto prohlížeči.",
    listTitleLabel: "Název seznamu",
    defaultTitle: "Můj tier list prohlížečů",
    copyLink: "Kopírovat odkaz",
    saveImg: "Uložit obrázek",
    reset: "Resetovat",
    tierNameAria: (n) => `Název řady ${n}`,
    tierAria: (n) => `Řada ${n}`,
    tapPlace: "→ klepněte na řadu pro umístění",
    details: "Detaily",
    backToPool: "Vrátit do výběru",
    cancelSel: "Zrušit výběr",
    poolAria: "Nezařazené prohlížeče",
    familyAria: "Rodina prohlížeče",
    allFam: "Vše",
    includeAria: "Zahrnout",
    channels: "Beta a nightly",
    discontinued: "Ukončené",
    memes: "Memy",
    findPlaceholder: "Najít…",
    findAria: "Hledat nezařazené prohlížeče",
    onlyFiltered: "V řadách: jen filtrované",
    onlyFilteredTitle: "Vrátit do výběru prohlížeče, které neodpovídají aktuálním filtrům",
    poolEmpty: "Vše podle těchto filtrů už je zařazeno.",
    aboutHeading: "Seřaďte každý desktopový prohlížeč",
    aboutP1: (n) => `Tvůrce tier listu obsahuje všech ${n} prohlížečů z browserwall – od Chrome a Safari po Zen, Helium, Ladybird i dávno ukončenou klasiku jako Netscape. Filtrujte podle jádra nebo skryjte bety a memy.`,
    aboutP2Before: "Nevíte, kam který patří? Každý má ",
    aboutP2Wall: "profil na zdi",
    aboutP2Mid: " se známkami za soukromí, vyladění, přizpůsobení, lehkost a minimalismus. A pokud chcete najít S-tier prohlížeč přímo pro sebe, zkuste ",
    aboutP2Quiz: "2minutový kvíz prohlížečů",
    aboutP2After: ".",
    faqHeading: "Časté otázky",
    faq: (n) => [
      { q: "Jak vytvořit tier list prohlížečů?", a: "Přetáhněte prohlížeče do řad S (nejlepší) až D, nebo klepněte na prohlížeč a pak na řadu. Na klávesnici fungují klávesy 1–5 a 0 pro vrácení. Názvy řad i seznam přejmenujete kliknutím." },
      { q: "Můžu svůj tier list sdílet?", a: "Ano. Kopírovat odkaz uloží celý seznam přímo do URL – nic se nikam nenahrává. Uložit obrázek stáhne PNG pro Reddit, Discord nebo X." },
      { q: "Které prohlížeče jsou v seznamu?", a: `Všech ${n} prohlížečů ze zdi: známé Chrome, Edge, Safari a Firefox, soukromé Brave, LibreWolf a Mullvad, nové Zen, Arc, Dia a Comet i ukončené klasiky a memy.` },
      { q: "Ukládá se můj tier list?", a: "Ukládá se automaticky do lokálního úložiště tohoto prohlížeče. Pokud chcete seznam uchovat natrvalo, zkopírujte si odkaz." },
    ],
    js: {
      defaultTitle: "Můj tier list prohlížečů",
      unplacedSuffix: "nezařazených",
      movedMsg: (n) => `Přesunuto mimo filtr zpět do výběru: ${n}.`,
      alreadyFiltered: "V řadách už jsou jen prohlížeče odpovídající filtrům.",
      confirmClear: "Vymazat váš tier list?",
      linkCopied: "Odkaz zkopírován.",
      copyPrompt: "Zkopírujte tento odkaz:",
      madeOn: "vytvořeno na browserwall",
      loadedShared: "Načten sdílený tier list.",
    },
  },
};
