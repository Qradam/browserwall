import type { Locale, PluralForms } from "./index";

export interface QuizI18n {
  osLabels: Record<"windows" | "macos" | "linux" | "bsd", string>;
  ext: Record<"chrome" | "firefox" | "any", { label: string; hint: string }>;
  importance: readonly [string, string, string, string, string];
  sliders: Record<"privacy" | "polish" | "custom" | "light" | "minimal" | "known", { title: string; help: string }>;
  featureGroups: { tabs: string; privacy: string; ai: string };
  features: Record<
    "vertical-tabs" | "workspaces" | "split-view" | "keyboard-driven" | "ad-blocking" | "de-googled" | "open-source" | "vpn" | "tor" | "ai" | "ai-agent",
    string
  >;
  avoid: Record<"ai" | "crypto" | "chromium" | "data" | "closed" | "slow" | "paid", string>;
  engine: {
    axisWhy: Record<"privacy" | "experience" | "customisation" | "lightness" | "minimalism", string>;
    notOn: string;
    noChrome: string;
    noFirefox: string;
    missingMust: string;
    dealbreaker: string;
    powerUser: string;
    wellKnown: string;
    aiAgentShort: string;
    paidTag: string;
  };
  personality: {
    archetypes: Record<
      "ghost" | "ai" | "ricer" | "hoarder" | "vim" | "monk" | "potato" | "refugee" | "purist" | "normie" | "balanced" | "impossible",
      { name: string; roast: string }
    >;
    rarity: { mythical: string; legendary: string; common: string; uncommon: string; rare: string };
    share: {
      myBrowser: string;
      match: string;
      on: string;
      then: string;
      and: string;
      noneSurvived: string;
      personalityPrefix: string;
      findYours: string;
      shortlistHead: string;
      shortlistItem: string;
      shortlistEmpty: string;
      shortlistFoot: string;
    };
  };
  shareCard: {
    canvasAria: string;
    kicker: string;
    close: string;
    design: string;
    designs: Record<"wrapped" | "receipt" | "terminal" | "trading" | "list", string>;
    format: string;
    post: string;
    story: string;
    osOnCard: string;
    showIt: string;
    versionDistro: string;
    share: string;
    nativeShare: string;
    tip: string;
    download: string;
    copyImage: string;
    copyLink: string;
    copyList: string;
    status: {
      popupBlocked: string;
      openTarget: string;
      shareFailed: string;
      storySaved: string;
      discordCopied: string;
      discordSaved: string;
      mastodonPrompt: string;
      mastodonInvalid: string;
      copiedPaste: string;
      openedNoCopy: string;
      saved: string;
      imageCopied: string;
      imageCopyFailed: string;
      linkCopied: string;
      linkCopyFailed: string;
      listCopied: string;
      listCopyFailed: string;
      ariaLabel: string;
    };
    canvas: {
      wrappedTitle: string;
      rising: string;
      myTop: string;
      myBrowser: string;
      nonePick: string;
      topMatch: string;
      survivedZero: string;
      matchPct: string;
      findYoursArrow: string;
      receiptSubtitle: string;
      orderPrefix: string;
      osKey: string;
      extKey: string;
      anyExt: string;
      mustVal: string;
      niceVal: string;
      nopeVal: string;
      moreItems: string;
      wallCount: string;
      survivedCount: string;
      youAre: string;
      totalKey: string;
      matchKey: string;
      thankYou: string;
      termPersonality: string;
      termRising: string;
      termBrowser: string;
      termNone: string;
      termRunnersUp: string;
      termEngine: string;
      termNa: string;
      termOs: string;
      termExt: string;
      termPriorities: string;
      termVibes: string;
      termMust: string;
      termAvoid: string;
      termEmpty: string;
      termSurvivors: string;
      browsersWord: PluralForms;
      basedOnInline: string;
      engineType: string;
      unknownEngineType: string;
      stats: [string, string, string, string, string];
      alsoInDeck: string;
      shortlistTitle: string;
      shortlistSub: string;
      nothingSurvived: string;
    };
  };
}

export const QUIZ_I18N: Record<Locale, QuizI18n> = {
  en: {
    osLabels: { windows: "Windows", macos: "macOS", linux: "Linux", bsd: "BSD" },
    ext: {
      chrome: { label: "Chrome Web Store", hint: "uBlock Origin Lite, password managers, most of everything" },
      firefox: { label: "Firefox add-ons", hint: "Full uBlock Origin, Tree Style Tab, Sidebery…" },
      any: { label: "Either is fine", hint: "Just the basics, or none at all" },
    },
    importance: ["Don't care", "A little", "Somewhat", "A lot", "Top priority"],
    sliders: {
      privacy: { title: "Privacy", help: "Blocks tracking by default, no telemetry, and an owner that doesn't make money from your data." },
      polish: { title: "Works out of the box", help: "Polished and stable, and sites just work without changing settings." },
      custom: { title: "Customisation", help: "Reshape the interface: themes, layout, deep settings and add-ons." },
      light: { title: "Light on resources", help: "Low RAM and CPU use. Turn this up on an older or low-memory computer." },
      minimal: { title: "Minimal, few extras", help: "No wallet, VPN upsell, news feed or AI sidebar you didn't ask for." },
      known: { title: "Well-known", help: "A big user base and a long track record, rather than a small or new project." },
    },
    featureGroups: { tabs: "Tabs & layout", privacy: "Privacy & openness", ai: "AI" },
    features: {
      "vertical-tabs": "Vertical tabs",
      workspaces: "Workspaces",
      "split-view": "Split view",
      "keyboard-driven": "Keyboard / Vim control",
      "ad-blocking": "Built-in ad blocker",
      "de-googled": "No Google services",
      "open-source": "Open source",
      vpn: "Built-in VPN",
      tor: "Tor network",
      ai: "AI assistant",
      "ai-agent": "AI agent that browses for you",
    },
    avoid: {
      ai: "AI you can't switch off",
      crypto: "Crypto / wallet",
      chromium: "Chromium-based",
      data: "Ad / data-business owner",
      closed: "Closed source",
      slow: "Maintenance-only updates",
      paid: "Costs money",
    },
    engine: {
      axisWhy: {
        privacy: "Privacy",
        experience: "Polished out of the box",
        customisation: "Customisation",
        lightness: "Light on resources",
        minimalism: "Clean, few extras",
      },
      notOn: "not on {os}",
      noChrome: "no Chrome Web Store",
      noFirefox: "no Firefox add-ons",
      missingMust: "missing must-have “{label}”",
      dealbreaker: "dealbreaker: {label}",
      powerUser: "Power-user features",
      wellKnown: "Well-known",
      aiAgentShort: "AI agent",
      paidTag: "paid",
    },
    personality: {
      archetypes: {
        ghost: { name: "The Ghost", roast: "Your threat model has a threat model. Cookies? Never heard of them." },
        ai: { name: "The AI Maximalist", roast: "You'd let a chatbot pick your browser. Oh wait, you basically just did." },
        ricer: { name: "The Ricer", roast: "Spent 4 hours on a theme. Browsed for 5 minutes. Worth it." },
        hoarder: { name: "The Tab Hoarder", roast: "347 tabs open. All of them “for later”. Later never comes." },
        vim: { name: "The Keyboard Goblin", roast: "Mice are for people with time to waste. :wq" },
        monk: { name: "The Monk", roast: "Your new tab page is a blank void and you've never felt more at peace." },
        potato: { name: "The Potato Whisperer", roast: "Your laptop sounds like a jet engine at idle. Every megabyte counts." },
        refugee: { name: "The Chrome Refugee", roast: "Breaking up with Google, one setting at a time. It's not you, it's the telemetry." },
        purist: { name: "The Source Code Purist", roast: "If you can't read the source, you don't trust it. You have read none of the source." },
        normie: { name: "The Just-Works Enjoyer", roast: "You don't want a hobby. You want a browser. Respect." },
        balanced: { name: "The Perfectly Balanced", roast: "No strong opinions, no dealbreakers. As all things should be." },
        impossible: { name: "The Impossible Standard", roast: "Not a single browser survived your requirements. You may need to build your own." },
      },
      rarity: { mythical: "Mythical", legendary: "Legendary", common: "Common", uncommon: "Uncommon", rare: "Rare" },
      share: {
        myBrowser: "My browser is {name} ({match}% match)",
        match: "{match}% match",
        on: " on {os}",
        then: ", then {list}",
        and: " and ",
        noneSurvived: "No browser could handle me.",
        personalityPrefix: "My browser personality: {name} {emoji} {pick} Find yours:",
        findYours: "Find yours:",
        shortlistHead: "My browser shortlist – {name} {emoji}{os}",
        shortlistItem: "{i}. {name} – {match}% match",
        shortlistEmpty: "No browser survived my requirements.",
        shortlistFoot: "{fit} of {total} browsers fit my answers. Find yours: {url}",
      },
    },
    shareCard: {
      canvasAria: "Your browser personality card",
      kicker: "Your browser personality",
      close: "Close",
      design: "Design",
      designs: { wrapped: "Wrapped", receipt: "Receipt", terminal: "Terminal", trading: "Trading", list: "Shortlist" },
      format: "Format",
      post: "Post",
      story: "Story",
      osOnCard: "Your OS on the card",
      showIt: "Show it",
      versionDistro: "Version or distro",
      share: "Share",
      nativeShare: "Share…",
      tip: "X, Bluesky, Reddit and Discord can't attach images from a link, so we copy the image first – just paste it into your post.",
      download: "Download PNG",
      copyImage: "Copy image",
      copyLink: "Copy link",
      copyList: "Copy list",
      status: {
        popupBlocked: "Your browser blocked the pop-up.",
        openTarget: "Open {name}",
        shareFailed: "Sharing didn't work here – try Download instead.",
        storySaved: "Saved a 9:16 story image. Instagram only takes posts from the app, so send it to your phone and add it to your story.",
        discordCopied: "Image copied. Paste it into any Discord channel (Ctrl/Cmd+V).",
        discordSaved: "Discord has no share link, so we saved the image. Drag it into any channel.",
        mastodonPrompt: "Your Mastodon server (e.g. mastodon.social, fosstodon.org):",
        mastodonInvalid: "That doesn't look like a server name.",
        copiedPaste: "Image copied – paste it into your {name} post (Ctrl/Cmd+V).",
        openedNoCopy: "Opened {name}. Your browser can't copy images, so use Download and attach the image.",
        saved: "Saved.",
        imageCopied: "Image copied.",
        imageCopyFailed: "Your browser can't copy images – use Download instead.",
        linkCopied: "Link to your results copied.",
        linkCopyFailed: "Couldn't copy the link.",
        listCopied: "Copied your shortlist of {n} browsers as text.",
        listCopyFailed: "Couldn't copy the list.",
        ariaLabel: "Share card: {name}{pick}. {roast}",
      },
      canvas: {
        wrappedTitle: "MY BROWSER PERSONALITY",
        rising: "Rising sign: {name}",
        myTop: "MY TOP {n}",
        myBrowser: "MY BROWSER",
        nonePick: "None. Literally none.",
        topMatch: "#1 · {match}% match",
        survivedZero: "0 of {total} browsers survived",
        matchPct: "{match}% match",
        findYoursArrow: "find yours →",
        receiptSubtitle: "PERSONALITY RECEIPT",
        orderPrefix: "ORDER #",
        osKey: "OS",
        extKey: "EXTENSIONS",
        anyExt: "ANY",
        mustVal: "MUST",
        niceVal: "NICE",
        nopeVal: "NOPE",
        moreItems: "+ {n} MORE ITEMS",
        wallCount: "BROWSERS ON THE WALL",
        survivedCount: "SURVIVED YOUR FILTERS",
        youAre: "YOU ARE",
        totalKey: "TOTAL",
        matchKey: "MATCH",
        thankYou: "THANK YOU FOR NOT USING INTERNET EXPLORER",
        termPersonality: "Personality",
        termRising: "Rising",
        termBrowser: "Browser",
        termNone: "none survived",
        termRunnersUp: "Runners-up",
        termEngine: "Engine",
        termNa: "n/a",
        termOs: "OS",
        termExt: "Extensions",
        termPriorities: "Priorities",
        termVibes: "vibes",
        termMust: "Must-haves",
        termAvoid: "Dealbreakers",
        termEmpty: "none",
        termSurvivors: "Survivors",
        browsersWord: ["browser", "browsers"],
        basedOnInline: " · based on ",
        engineType: "{engine} type",
        unknownEngineType: "??? type",
        stats: ["Privacy", "Polish", "Customisation", "Lightness", "Minimalism"],
        alsoInDeck: "ALSO IN YOUR DECK",
        shortlistTitle: "MY BROWSER SHORTLIST",
        shortlistSub: "{fit} of {total} browsers fit my answers",
        nothingSurvived: "Nothing survived.",
      },
    },
  },

  ru: {
    osLabels: { windows: "Windows", macos: "macOS", linux: "Linux", bsd: "BSD" },
    ext: {
      chrome: { label: "Chrome Web Store", hint: "uBlock Origin Lite, менеджеры паролей и почти всё остальное" },
      firefox: { label: "Дополнения Firefox", hint: "Полный uBlock Origin, Tree Style Tab, Sidebery…" },
      any: { label: "Подойдёт любой", hint: "Только базовые расширения или без них" },
    },
    importance: ["Не важно", "Немного", "Средне", "Важно", "Главное"],
    sliders: {
      privacy: { title: "Приватность", help: "Блокирует трекеры по умолчанию, без телеметрии, разработчик не зарабатывает на ваших данных." },
      polish: { title: "Работает из коробки", help: "Отполирован и стабилен, сайты открываются без долгой настройки." },
      custom: { title: "Кастомизация", help: "Гибкий интерфейс: темы, расположение вкладок, глубокие настройки и расширения." },
      light: { title: "Лёгкость для системы", help: "Низкий расход ОЗУ и ЦП. Повысьте, если у вас слабый или старый ПК." },
      minimal: { title: "Минимум лишнего", help: "Без криптокошелька, рекламы VPN, ленты новостей и навязанного ИИ." },
      known: { title: "Известность", help: "Большая аудитория и проверенная репутация, а не молодой нишевый проект." },
    },
    featureGroups: { tabs: "Вкладки и интерфейс", privacy: "Приватность и открытость", ai: "ИИ" },
    features: {
      "vertical-tabs": "Вертикальные вкладки",
      workspaces: "Рабочие пространства",
      "split-view": "Разделение экрана",
      "keyboard-driven": "Управление с клавиатуры / Vim",
      "ad-blocking": "Встроенный блокировщик рекламы",
      "de-googled": "Без сервисов Google",
      "open-source": "Открытый исходный код",
      vpn: "Встроенный VPN",
      tor: "Сеть Tor",
      ai: "ИИ-ассистент",
      "ai-agent": "ИИ-агент, который действует сам",
    },
    avoid: {
      ai: "Неотключаемый ИИ",
      crypto: "Крипта / кошелёк",
      chromium: "На базе Chromium",
      data: "Зарабатывает на данных/рекламе",
      closed: "Закрытый код",
      slow: "Редкие обновления",
      paid: "Платный",
    },
    engine: {
      axisWhy: {
        privacy: "Приватность",
        experience: "Отличная работа из коробки",
        customisation: "Кастомизация",
        lightness: "Лёгкий для системы",
        minimalism: "Чистый, без лишнего",
      },
      notOn: "нет на {os}",
      noChrome: "нет Chrome Web Store",
      noFirefox: "нет дополнений Firefox",
      missingMust: "нет обязательного: «{label}»",
      dealbreaker: "стоп-фактор: {label}",
      powerUser: "Фичи для профи",
      wellKnown: "Широко известен",
      aiAgentShort: "ИИ-агент",
      paidTag: "платно",
    },
    personality: {
      archetypes: {
        ghost: { name: "Призрак", roast: "У вашей модели угроз есть своя модель угроз. Cookies? Не слышали." },
        ai: { name: "ИИ-максималист", roast: "Вы бы доверили нейросети выбрать браузер. Погодите, вы только что это сделали." },
        ricer: { name: "Тюнер до мозга костей", roast: "4 часа настраивал тему. Посидел в сети 5 минут. Оно того стоило." },
        hoarder: { name: "Плюшкин вкладок", roast: "347 открытых вкладок. Все «на потом». Потом не наступит никогда." },
        vim: { name: "Гоблин клавиатуры", roast: "Мышка — для тех, у кого много лишнего времени. :wq" },
        monk: { name: "Цифровой монах", roast: "Новая вкладка — чистая пустота, и на душе ещё никогда не было так спокойно." },
        potato: { name: "Заклинатель картошки", roast: "Ноутбук гудит как реактивный самолёт в простое. На счету каждый мегабайт." },
        refugee: { name: "Беженец из Chrome", roast: "Расстаётесь с Google по одной настройке за раз. Дело не в тебе, дело в телеметрии." },
        purist: { name: "Адепт открытого кода", roast: "Если код нельзя прочитать, ему нельзя верить. Вы не прочитали ни строчки." },
        normie: { name: "Ценитель «просто работает»", roast: "Вам не нужно новое хобби. Вам нужен браузер. Уважаемо." },
        balanced: { name: "Само равновесие", roast: "Никаких крайностей и жёстких запретов. Идеальный баланс." },
        impossible: { name: "Невыполнимый стандарт", roast: "Ни один браузер не выдержал ваших требований. Пора писать свой." },
      },
      rarity: { mythical: "Мифический", legendary: "Легендарный", common: "Обычный", uncommon: "Необычный", rare: "Редкий" },
      share: {
        myBrowser: "Мой браузер — {name} (совпадение {match}%)",
        match: "{match}%",
        on: " на {os}",
        then: ", далее {list}",
        and: " и ",
        noneSurvived: "Ни один браузер не выдержал моих требований.",
        personalityPrefix: "Мой браузерный архетип: {name} {emoji} {pick} Узнай свой:",
        findYours: "Узнай свой:",
        shortlistHead: "Мой топ браузеров – {name} {emoji}{os}",
        shortlistItem: "{i}. {name} – {match}%",
        shortlistEmpty: "Ни один браузер не прошёл мои фильтры.",
        shortlistFoot: "{fit} из {total} браузеров подошли под ответы. Подбери свой: {url}",
      },
    },
    shareCard: {
      canvasAria: "Карточка вашего браузерного архетипа",
      kicker: "Ваш браузерный архетип",
      close: "Закрыть",
      design: "Дизайн",
      designs: { wrapped: "Итоги", receipt: "Чек", terminal: "Терминал", trading: "Карта", list: "Список" },
      format: "Формат",
      post: "Пост",
      story: "Сторис",
      osOnCard: "Ваша ОС на карточке",
      showIt: "Показывать",
      versionDistro: "Версия или дистрибутив",
      share: "Поделиться",
      nativeShare: "Поделиться…",
      tip: "X, Bluesky, Reddit и Discord не прикрепляют картинку по ссылке, поэтому мы сначала копируем её — просто вставьте в пост.",
      download: "Скачать PNG",
      copyImage: "Копировать фото",
      copyLink: "Копировать ссылку",
      copyList: "Копировать список",
      status: {
        popupBlocked: "Браузер заблокировал всплывающее окно.",
        openTarget: "Открыть {name}",
        shareFailed: "Не удалось поделиться — попробуйте скачать PNG.",
        storySaved: "Сохранена картинка 9:16 для сторис. Перешлите её на телефон и добавьте в историю Instagram.",
        discordCopied: "Картинка скопирована. Вставьте её в любой канал Discord (Ctrl/Cmd+V).",
        discordSaved: "У Discord нет ссылки для шаринга, поэтому картинка скачалась — перетащите её в чат.",
        mastodonPrompt: "Ваш сервер Mastodon (например, mastodon.social, fosstodon.org):",
        mastodonInvalid: "Не похоже на адрес сервера.",
        copiedPaste: "Картинка скопирована — вставьте её в пост {name} (Ctrl/Cmd+V).",
        openedNoCopy: "Открыли {name}. Ваш браузер не умеет копировать картинки — скачайте PNG и прикрепите вручную.",
        saved: "Сохранено.",
        imageCopied: "Картинка скопирована.",
        imageCopyFailed: "Браузер не даёт скопировать картинку — скачайте PNG.",
        linkCopied: "Ссылка на результаты скопирована.",
        linkCopyFailed: "Не удалось скопировать ссылку.",
        listCopied: "Список из {n} браузеров скопирован текстом.",
        listCopyFailed: "Не удалось скопировать список.",
        ariaLabel: "Карточка: {name}{pick}. {roast}",
      },
      canvas: {
        wrappedTitle: "МОЙ БРАУЗЕРНЫЙ АРХЕТИП",
        rising: "Запасной знак: {name}",
        myTop: "МОЙ ТОП-{n}",
        myBrowser: "МОЙ БРАУЗЕР",
        nonePick: "Ни одного. Буквально ноль.",
        topMatch: "#1 · совпадение {match}%",
        survivedZero: "0 из {total} браузеров выжили",
        matchPct: "{match}%",
        findYoursArrow: "найди свой →",
        receiptSubtitle: "ЧЕК АРХЕТИПА",
        orderPrefix: "ЗАКАЗ #",
        osKey: "ОС",
        extKey: "РАСШИРЕНИЯ",
        anyExt: "ЛЮБЫЕ",
        mustVal: "ОБЯЗ.",
        niceVal: "ПЛЮС",
        nopeVal: "СТОП",
        moreItems: "+ ЕЩЁ {n} ПУНКТ.",
        wallCount: "БРАУЗЕРОВ НА СТЕНЕ",
        survivedCount: "ПРОШЛИ ФИЛЬТРЫ",
        youAre: "ВЫ —",
        totalKey: "ИТОГО",
        matchKey: "СОВПАДЕНИЕ",
        thankYou: "СПАСИБО, ЧТО НЕ ИСПОЛЬЗУЕТЕ INTERNET EXPLORER",
        termPersonality: "Архетип",
        termRising: "Подтип",
        termBrowser: "Браузер",
        termNone: "никто не выжил",
        termRunnersUp: "Также",
        termEngine: "Движок",
        termNa: "н/д",
        termOs: "ОС",
        termExt: "Расширения",
        termPriorities: "Приоритеты",
        termVibes: "настроение",
        termMust: "Обязательно",
        termAvoid: "Исключено",
        termEmpty: "нет",
        termSurvivors: "Подошли",
        browsersWord: ["браузер", "браузера", "браузеров"],
        basedOnInline: " · на базе ",
        engineType: "тип {engine}",
        unknownEngineType: "тип ???",
        stats: ["Приватность", "Удобство", "Кастомизация", "Лёгкость", "Минимализм"],
        alsoInDeck: "ТАКЖЕ В КОЛОДЕ",
        shortlistTitle: "МОЙ ТОП БРАУЗЕРОВ",
        shortlistSub: "{fit} из {total} браузеров подходят",
        nothingSurvived: "Никто не выжил.",
      },
    },
  },

  fr: {
    osLabels: { windows: "Windows", macos: "macOS", linux: "Linux", bsd: "BSD" },
    ext: {
      chrome: { label: "Chrome Web Store", hint: "uBlock Origin Lite, gestionnaires de mots de passe, presque tout" },
      firefox: { label: "Modules Firefox", hint: "uBlock Origin complet, Tree Style Tab, Sidebery…" },
      any: { label: "Peu importe", hint: "Juste l'essentiel, ou aucune extension" },
    },
    importance: ["Sans avis", "Un peu", "Moyennement", "Beaucoup", "Priorité absolue"],
    sliders: {
      privacy: { title: "Vie privée", help: "Bloque les pisteurs par défaut, sans télémétrie ni modèle financé par vos données." },
      polish: { title: "Prêt à l'emploi", help: "Soigné et stable : les sites fonctionnent d'emblée sans tout configurer." },
      custom: { title: "Personnalisation", help: "Façonner l'interface : thèmes, disposition, réglages avancés et modules." },
      light: { title: "Léger en ressources", help: "Faible conso RAM et CPU. Utile sur un PC ancien ou modeste." },
      minimal: { title: "Épuré, sans superflu", help: "Pas de portefeuille crypto, pub VPN, flux d'actu ou barre IA imposée." },
      known: { title: "Bien établi", help: "Une large base d'utilisateurs et un long historique plutôt qu'un tout jeune projet." },
    },
    featureGroups: { tabs: "Onglets et interface", privacy: "Vie privée et ouverture", ai: "IA" },
    features: {
      "vertical-tabs": "Onglets verticaux",
      workspaces: "Espaces de travail",
      "split-view": "Vue scindée",
      "keyboard-driven": "Pilotage clavier / Vim",
      "ad-blocking": "Bloqueur de pubs intégré",
      "de-googled": "Sans services Google",
      "open-source": "Open source",
      vpn: "VPN intégré",
      tor: "Réseau Tor",
      ai: "Assistant IA",
      "ai-agent": "Agent IA qui navigue pour vous",
    },
    avoid: {
      ai: "IA impossible à désactiver",
      crypto: "Crypto / portefeuille",
      chromium: "Basé sur Chromium",
      data: "Modèle pub / collecte de données",
      closed: "Code propriétaire",
      slow: "Mises à jour de maintenance seules",
      paid: "Payant",
    },
    engine: {
      axisWhy: {
        privacy: "Vie privée",
        experience: "Prêt à l'emploi",
        customisation: "Personnalisation",
        lightness: "Léger en ressources",
        minimalism: "Épuré, peu d'ajouts",
      },
      notOn: "absent sur {os}",
      noChrome: "sans Chrome Web Store",
      noFirefox: "sans modules Firefox",
      missingMust: "critère manquant « {label} »",
      dealbreaker: "exclu : {label}",
      powerUser: "Fonctions avancées",
      wellKnown: "Bien établi",
      aiAgentShort: "Agent IA",
      paidTag: "payant",
    },
    personality: {
      archetypes: {
        ghost: { name: "Le Fantôme", roast: "Votre modèle de menace a son propre modèle de menace. Les cookies ? Connaît pas." },
        ai: { name: "Le Maximaliste IA", roast: "Vous laisseriez un chatbot choisir votre navigateur. Attendez, c'est presque ça." },
        ricer: { name: "Le Riceur", roast: "4 heures sur un thème. 5 minutes de navigation. Aucun regret." },
        hoarder: { name: "L'Accumulateur d'onglets", roast: "347 onglets ouverts. Tous « pour plus tard ». Plus tard n'arrive jamais." },
        vim: { name: "Le Gobelin du clavier", roast: "La souris, c'est pour ceux qui ont du temps à perdre. :wq" },
        monk: { name: "Le Moine", roast: "Votre page nouvel onglet est un vide absolu et vous n'avez jamais été aussi serein." },
        potato: { name: "Le Dompteur de grille-pain", roast: "Votre PC souffle comme un réacteur au repos. Chaque mégaoctet compte." },
        refugee: { name: "Le Réfugié de Chrome", roast: "Vous quittez Google réglage par réglage. Ce n'est pas vous, c'est la télémétrie." },
        purist: { name: "Le Puriste Open Source", roast: "Si vous ne pouvez pas lire le code, pas de confiance. Vous n'en avez lu aucune ligne." },
        normie: { name: "L'Adepte du « ça marche »", roast: "Vous ne voulez pas un passe-temps. Vous voulez un navigateur. Respect." },
        balanced: { name: "L'Équilibre Parfait", roast: "Aucun extrême, aucun veto. Parfaitement mesuré." },
        impossible: { name: "Le Standard Impossible", roast: "Pas un seul navigateur n'a survécu à vos critères. Il va falloir coder le vôtre." },
      },
      rarity: { mythical: "Mythique", legendary: "Légendaire", common: "Commun", uncommon: "Peu commun", rare: "Rare" },
      share: {
        myBrowser: "Mon navigateur est {name} ({match}% d'affinité)",
        match: "{match}%",
        on: " sous {os}",
        then: ", puis {list}",
        and: " et ",
        noneSurvived: "Aucun navigateur n'a survécu à mes critères.",
        personalityPrefix: "Ma personnalité navigateur : {name} {emoji} {pick} Trouvez la vôtre :",
        findYours: "Trouvez la vôtre :",
        shortlistHead: "Ma sélection de navigateurs – {name} {emoji}{os}",
        shortlistItem: "{i}. {name} – {match}%",
        shortlistEmpty: "Aucun navigateur n'a survécu à mes critères.",
        shortlistFoot: "{fit} sur {total} navigateurs correspondent. Faites le test : {url}",
      },
    },
    shareCard: {
      canvasAria: "Votre carte de personnalité navigateur",
      kicker: "Votre personnalité navigateur",
      close: "Fermer",
      design: "Style",
      designs: { wrapped: "Wrapped", receipt: "Ticket", terminal: "Terminal", trading: "Carte", list: "Sélection" },
      format: "Format",
      post: "Post",
      story: "Story",
      osOnCard: "Votre OS sur la carte",
      showIt: "Afficher",
      versionDistro: "Version ou distro",
      share: "Partager",
      nativeShare: "Partager…",
      tip: "X, Bluesky, Reddit et Discord ne joignent pas d'image via un lien : on copie d'abord l'image, collez-la simplement dans votre post.",
      download: "Télécharger PNG",
      copyImage: "Copier l'image",
      copyLink: "Copier le lien",
      copyList: "Copier la liste",
      status: {
        popupBlocked: "Votre navigateur a bloqué la fenêtre.",
        openTarget: "Ouvrir {name}",
        shareFailed: "Le partage a échoué – essayez Télécharger.",
        storySaved: "Image story 9:16 enregistrée. Envoyez-la sur votre téléphone pour l'ajouter à votre story Instagram.",
        discordCopied: "Image copiée. Collez-la dans n'importe quel salon Discord (Ctrl/Cmd+V).",
        discordSaved: "Discord n'a pas de lien de partage, l'image a donc été enregistrée. Glissez-la dans un salon.",
        mastodonPrompt: "Votre serveur Mastodon (ex. mastodon.social, fosstodon.org) :",
        mastodonInvalid: "Cela ne ressemble pas à un nom de serveur.",
        copiedPaste: "Image copiée – collez-la dans votre post {name} (Ctrl/Cmd+V).",
        openedNoCopy: "{name} ouvert. Votre navigateur ne peut pas copier d'image : téléchargez le PNG et joignez-le.",
        saved: "Enregistré.",
        imageCopied: "Image copiée.",
        imageCopyFailed: "Votre navigateur ne peut pas copier l'image – utilisez Télécharger.",
        linkCopied: "Lien vers vos résultats copié.",
        linkCopyFailed: "Impossible de copier le lien.",
        listCopied: "Votre sélection de {n} navigateurs copiée en texte.",
        listCopyFailed: "Impossible de copier la liste.",
        ariaLabel: "Carte : {name}{pick}. {roast}",
      },
      canvas: {
        wrappedTitle: "MA PERSONNALITÉ NAVIGATEUR",
        rising: "Ascendant : {name}",
        myTop: "MON TOP {n}",
        myBrowser: "MON NAVIGATEUR",
        nonePick: "Aucun. Littéralement aucun.",
        topMatch: "#1 · {match}% d'affinité",
        survivedZero: "0 sur {total} navigateurs ont survécu",
        matchPct: "{match}%",
        findYoursArrow: "trouvez le vôtre →",
        receiptSubtitle: "TICKET DE PERSONNALITÉ",
        orderPrefix: "COMMANDE #",
        osKey: "OS",
        extKey: "EXTENSIONS",
        anyExt: "TOUTES",
        mustVal: "REQUIS",
        niceVal: "BONUS",
        nopeVal: "NON",
        moreItems: "+ {n} AUTRES CRITÈRES",
        wallCount: "NAVIGATEURS SUR LE MUR",
        survivedCount: "ONT PASSÉ VOS FILTRES",
        youAre: "VOUS ÊTES",
        totalKey: "TOTAL",
        matchKey: "AFFINITÉ",
        thankYou: "MERCI DE NE PAS UTILISER INTERNET EXPLORER",
        termPersonality: "Profil",
        termRising: "Ascendant",
        termBrowser: "Navigateur",
        termNone: "aucun survivant",
        termRunnersUp: "Suivants",
        termEngine: "Moteur",
        termNa: "n/d",
        termOs: "OS",
        termExt: "Extensions",
        termPriorities: "Priorités",
        termVibes: "au feeling",
        termMust: "Requis",
        termAvoid: "Exclus",
        termEmpty: "aucun",
        termSurvivors: "Survivants",
        browsersWord: ["navigateur", "navigateurs"],
        basedOnInline: " · basé sur ",
        engineType: "type {engine}",
        unknownEngineType: "type ???",
        stats: ["Vie privée", "Finition", "Perso.", "Légèreté", "Minimal."],
        alsoInDeck: "AUSSI DANS VOTRE DECK",
        shortlistTitle: "MA SÉLECTION DE NAVIGATEURS",
        shortlistSub: "{fit} sur {total} navigateurs correspondent",
        nothingSurvived: "Aucun n'a survécu.",
      },
    },
  },

  pt: {
    osLabels: { windows: "Windows", macos: "macOS", linux: "Linux", bsd: "BSD" },
    ext: {
      chrome: { label: "Chrome Web Store", hint: "uBlock Origin Lite, gerenciadores de senhas, quase tudo" },
      firefox: { label: "Extensões Firefox", hint: "uBlock Origin completo, Tree Style Tab, Sidebery…" },
      any: { label: "Tanto faz", hint: "Só o básico ou nenhuma extensão" },
    },
    importance: ["Tanto faz", "Um pouco", "Razoável", "Muito", "Prioridade"],
    sliders: {
      privacy: { title: "Privacidade", help: "Bloqueia rastreadores por padrão, sem telemetria e sem dono que lucra com seus dados." },
      polish: { title: "Pronto para uso", help: "Polido e estável, os sites funcionam de primeira sem precisar mexer em ajustes." },
      custom: { title: "Personalização", help: "Mudar a interface: temas, layout, ajustes avançados e extensões." },
      light: { title: "Leve em recursos", help: "Baixo uso de RAM e CPU. Aumente em PCs mais antigos ou com pouca memória." },
      minimal: { title: "Minimalista, sem extras", help: "Sem carteira cripto, anúncio de VPN, feed de notícias ou barra de IA indesejada." },
      known: { title: "Bem conhecido", help: "Grande base de usuários e histórico sólido, em vez de projeto novo ou de nicho." },
    },
    featureGroups: { tabs: "Abas e visual", privacy: "Privacidade e abertura", ai: "IA" },
    features: {
      "vertical-tabs": "Abas verticais",
      workspaces: "Espaços de trabalho",
      "split-view": "Tela dividida",
      "keyboard-driven": "Controle por teclado / Vim",
      "ad-blocking": "Bloqueador de anúncios integrado",
      "de-googled": "Sem serviços Google",
      "open-source": "Código aberto",
      vpn: "VPN integrada",
      tor: "Rede Tor",
      ai: "Assistente de IA",
      "ai-agent": "Agente de IA que navega por você",
    },
    avoid: {
      ai: "IA impossível de desligar",
      crypto: "Cripto / carteira",
      chromium: "Baseado em Chromium",
      data: "Dono focado em anúncios/dados",
      closed: "Código fechado",
      slow: "Só manutenção lenta",
      paid: "Pago",
    },
    engine: {
      axisWhy: {
        privacy: "Privacidade",
        experience: "Pronto para uso",
        customisation: "Personalização",
        lightness: "Leve em recursos",
        minimalism: "Limpo, poucos extras",
      },
      notOn: "não roda no {os}",
      noChrome: "sem Chrome Web Store",
      noFirefox: "sem extensões do Firefox",
      missingMust: "falta o requisito “{label}”",
      dealbreaker: "eliminado por: {label}",
      powerUser: "Recursos avançados",
      wellKnown: "Bem conhecido",
      aiAgentShort: "Agente de IA",
      paidTag: "pago",
    },
    personality: {
      archetypes: {
        ghost: { name: "O Fantasma", roast: "Seu modelo de ameaças tem um modelo de ameaças. Cookies? Nunca ouviu falar." },
        ai: { name: "O Maximalista de IA", roast: "Você deixaria um chatbot escolher seu navegador. Espera, você acabou de fazer isso." },
        ricer: { name: "O Customizador", roast: "Passou 4 horas num tema. Navegou por 5 minutos. Valeu a pena." },
        hoarder: { name: "O Acumulador de Abas", roast: "347 abas abertas. Todas «para depois». O depois nunca chega." },
        vim: { name: "O Goblin do Teclado", roast: "Mouse é para quem tem tempo sobrando. :wq" },
        monk: { name: "O Monge", roast: "Sua nova aba é um vazio absoluto e você nunca esteve tão em paz." },
        potato: { name: "O Encantador de Batata", roast: "Seu notebook parece um jato parado. Cada megabyte conta." },
        refugee: { name: "O Refugiado do Chrome", roast: "Terminando com o Google, uma configuração por vez. Não é você, é a telemetria." },
        purist: { name: "O Purista de Código Aberto", roast: "Se não dá para ler o código, não confia. Você nunca leu o código." },
        normie: { name: "O Fã do «Só Funciona»", roast: "Você não quer um hobby. Você quer um navegador. Respeito." },
        balanced: { name: "O Equilíbrio Perfeito", roast: "Sem extremos nem vetos. Como tudo deveria ser." },
        impossible: { name: "O Padrão Impossível", roast: "Nenhum navegador sobreviveu às suas exigências. Vai ter que criar o seu." },
      },
      rarity: { mythical: "Mítico", legendary: "Lendário", common: "Comum", uncommon: "Incomum", rare: "Raro" },
      share: {
        myBrowser: "Meu navegador é {name} ({match}% de compatibilidade)",
        match: "{match}%",
        on: " no {os}",
        then: ", depois {list}",
        and: " e ",
        noneSurvived: "Nenhum navegador deu conta de mim.",
        personalityPrefix: "Minha personalidade de navegador: {name} {emoji} {pick} Descubra a sua:",
        findYours: "Descubra a sua:",
        shortlistHead: "Minha lista de navegadores – {name} {emoji}{os}",
        shortlistItem: "{i}. {name} – {match}%",
        shortlistEmpty: "Nenhum navegador sobreviveu aos meus requisitos.",
        shortlistFoot: "{fit} de {total} navegadores combinam comigo. Veja o seu: {url}",
      },
    },
    shareCard: {
      canvasAria: "Seu cartão de personalidade de navegador",
      kicker: "Sua personalidade de navegador",
      close: "Fechar",
      design: "Estilo",
      designs: { wrapped: "Wrapped", receipt: "Recibo", terminal: "Terminal", trading: "Carta", list: "Lista" },
      format: "Formato",
      post: "Post",
      story: "Story",
      osOnCard: "Seu sistema no cartão",
      showIt: "Mostrar",
      versionDistro: "Versão ou distro",
      share: "Compartilhar",
      nativeShare: "Compartilhar…",
      tip: "X, Bluesky, Reddit e Discord não anexam imagens por link, então copiamos a imagem antes – basta colar no post.",
      download: "Baixar PNG",
      copyImage: "Copiar imagem",
      copyLink: "Copiar link",
      copyList: "Copiar lista",
      status: {
        popupBlocked: "Seu navegador bloqueou o pop-up.",
        openTarget: "Abrir {name}",
        shareFailed: "Não deu para compartilhar aqui – tente Baixar PNG.",
        storySaved: "Imagem 9:16 para story salva. Envie para o celular e publique no Instagram.",
        discordCopied: "Imagem copiada. Cole em qualquer canal do Discord (Ctrl/Cmd+V).",
        discordSaved: "O Discord não tem link de compartilhamento, então salvamos a imagem. Arraste para um canal.",
        mastodonPrompt: "Seu servidor Mastodon (ex.: mastodon.social, fosstodon.org):",
        mastodonInvalid: "Isso não parece um nome de servidor.",
        copiedPaste: "Imagem copiada – cole no seu post do {name} (Ctrl/Cmd+V).",
        openedNoCopy: "{name} aberto. Seu navegador não copia imagens: baixe o PNG e anexe.",
        saved: "Salvo.",
        imageCopied: "Imagem copiada.",
        imageCopyFailed: "Seu navegador não copia imagens – use Baixar PNG.",
        linkCopied: "Link do resultado copiado.",
        linkCopyFailed: "Não foi possível copiar o link.",
        listCopied: "Lista com {n} navegadores copiada em texto.",
        listCopyFailed: "Não foi possível copiar a lista.",
        ariaLabel: "Cartão: {name}{pick}. {roast}",
      },
      canvas: {
        wrappedTitle: "MINHA PERSONALIDADE DE NAVEGADOR",
        rising: "Ascendente: {name}",
        myTop: "MEU TOP {n}",
        myBrowser: "MEU NAVEGADOR",
        nonePick: "Nenhum. Literalmente nenhum.",
        topMatch: "#1 · {match}% compatível",
        survivedZero: "0 de {total} navegadores sobreviveram",
        matchPct: "{match}%",
        findYoursArrow: "ache o seu →",
        receiptSubtitle: "RECIBO DE PERSONALIDADE",
        orderPrefix: "PEDIDO #",
        osKey: "SISTEMA",
        extKey: "EXTENSÕES",
        anyExt: "QUALQUER",
        mustVal: "OBRIG.",
        niceVal: "BOM",
        nopeVal: "NÃO",
        moreItems: "+ {n} ITENS",
        wallCount: "NAVEGADORES NO MURAL",
        survivedCount: "PASSARAM NOS FILTROS",
        youAre: "VOCÊ É",
        totalKey: "TOTAL",
        matchKey: "COMBINA",
        thankYou: "OBRIGADO POR NÃO USAR INTERNET EXPLORER",
        termPersonality: "Perfil",
        termRising: "Secundário",
        termBrowser: "Navegador",
        termNone: "nenhum sobreviveu",
        termRunnersUp: "Seguintes",
        termEngine: "Motor",
        termNa: "n/d",
        termOs: "Sistema",
        termExt: "Extensões",
        termPriorities: "Prioridades",
        termVibes: "no feeling",
        termMust: "Obrigatórios",
        termAvoid: "Eliminatórios",
        termEmpty: "nenhum",
        termSurvivors: "Aprovados",
        browsersWord: ["navegador", "navegadores"],
        basedOnInline: " · baseado em ",
        engineType: "tipo {engine}",
        unknownEngineType: "tipo ???",
        stats: ["Privacidade", "Acabamento", "Person.", "Leveza", "Minimal."],
        alsoInDeck: "TAMBÉM NO SEU DECK",
        shortlistTitle: "MEU TOP DE NAVEGADORES",
        shortlistSub: "{fit} de {total} navegadores combinam",
        nothingSurvived: "Nenhum sobreviveu.",
      },
    },
  },

  cs: {
    osLabels: { windows: "Windows", macos: "macOS", linux: "Linux", bsd: "BSD" },
    ext: {
      chrome: { label: "Chrome Web Store", hint: "uBlock Origin Lite, správci hesel a skoro všechno ostatní" },
      firefox: { label: "Doplňky Firefoxu", hint: "Plný uBlock Origin, Tree Style Tab, Sidebery…" },
      any: { label: "Je mi to jedno", hint: "Stačí základ nebo žádné doplňky" },
    },
    importance: ["Nezáleží", "Trochu", "Středně", "Hodně", "Priorita"],
    sliders: {
      privacy: { title: "Soukromí", help: "Blokuje sledování v základu, bez telemetrie a bez majitele, co vydělává na vašich datech." },
      polish: { title: "Funguje hned", help: "Vyladěný a stabilní – weby fungují na první dobrou bez ladění nastavení." },
      custom: { title: "Přizpůsobení", help: "Úpravy rozhraní: motivy, rozvržení, pokročilé volby a doplňky." },
      light: { title: "Nenáročný na systém", help: "Nízká spotřeba RAM a CPU. Zvyšte na starším nebo slabším počítači." },
      minimal: { title: "Minimalistický, bez balastu", help: "Žádná krypto peněženka, reklama na VPN, zprávy ani vnucená AI." },
      known: { title: "Osvědčený", help: "Velká uživatelská základna a dlouhá historie spíš než nový experiment." },
    },
    featureGroups: { tabs: "Karty a rozvržení", privacy: "Soukromí a otevřenost", ai: "AI" },
    features: {
      "vertical-tabs": "Svislé karty",
      workspaces: "Pracovní plochy",
      "split-view": "Rozdělený pohled",
      "keyboard-driven": "Ovládání klávesnicí / Vim",
      "ad-blocking": "Vestavěný blokátor reklam",
      "de-googled": "Bez služeb Googlu",
      "open-source": "Open source",
      vpn: "Vestavěná VPN",
      tor: "Síť Tor",
      ai: "AI asistent",
      "ai-agent": "AI agent, který prohlíží za vás",
    },
    avoid: {
      ai: "AI, kterou nejde vypnout",
      crypto: "Krypto / peněženka",
      chromium: "Založený na Chromiu",
      data: "Byznys z reklam / dat",
      closed: "Uzavřený kód",
      slow: "Jen udržovací aktualizace",
      paid: "Placený",
    },
    engine: {
      axisWhy: {
        privacy: "Soukromí",
        experience: "Skvělý po vybalení",
        customisation: "Přizpůsobení",
        lightness: "Nenáročný na výkon",
        minimalism: "Čistý, minimum balastu",
      },
      notOn: "není pro {os}",
      noChrome: "bez Chrome Web Store",
      noFirefox: "bez doplňků Firefoxu",
      missingMust: "chybí požadavek „{label}“",
      dealbreaker: "stopka: {label}",
      powerUser: "Funkce pro pokročilé",
      wellKnown: "Dobře známý",
      aiAgentShort: "AI agent",
      paidTag: "placené",
    },
    personality: {
      archetypes: {
        ghost: { name: "Duch", roast: "Váš model hrozeb má vlastní model hrozeb. Cookies? Nikdy jste o nich neslyšel." },
        ai: { name: "AI maximalista", roast: "Nechal byste chatbota vybrat si prohlížeč. Počkat, vy jste to vlastně právě udělal." },
        ricer: { name: "Ladič rozhraní", roast: "4 hodiny ladil motiv. 5 minut prohlížel web. Stálo to za to." },
        hoarder: { name: "Sběratel karet", roast: "347 otevřených karet. Všechny „na později“. Později nikdy nepřijde." },
        vim: { name: "Klávesnicový goblin", roast: "Myš je pro lidi, co mají moc volného času. :wq" },
        monk: { name: "Digitální mnich", roast: "Nová karta je prázdná nicota a vy jste nikdy nebyl klidnější." },
        potato: { name: "Zaříkávač brambory", roast: "Notebook hučí jako stíhačka i v klidu. Každý megabajt se počítá." },
        refugee: { name: "Uprchlík z Chromu", roast: "Rozcházíte se s Googlem, jedno nastavení po druhém. Není to vámi, je to telemetrií." },
        purist: { name: "Purista open source", roast: "Když nevidíte zdroják, nevěříte. Ze zdrojáku jste nečetl ani řádek." },
        normie: { name: "Požitkář „prostě funguje“", roast: "Nechcete nový koníček. Chcete prohlížeč. Respekt." },
        balanced: { name: "Dokonalá rovnováha", roast: "Žádné extrémy, žádná stopka. Přesně tak akorát." },
        impossible: { name: "Nesplnitelný standard", roast: "Ani jediný prohlížeč nepřežil vaše nároky. Budete si muset napsat vlastní." },
      },
      rarity: { mythical: "Mýtický", legendary: "Legendární", common: "Běžný", uncommon: "Neobvyklý", rare: "Vzácný" },
      share: {
        myBrowser: "Můj prohlížeč je {name} ({match}% shoda)",
        match: "{match}%",
        on: " na {os}",
        then: ", pak {list}",
        and: " a ",
        noneSurvived: "Žádný prohlížeč mě neustál.",
        personalityPrefix: "Moje prohlížečová osobnost: {name} {emoji} {pick} Zjisti svou:",
        findYours: "Zjisti svou:",
        shortlistHead: "Můj výběr prohlížečů – {name} {emoji}{os}",
        shortlistItem: "{i}. {name} – {match}%",
        shortlistEmpty: "Žádný prohlížeč nepřežil moje požadavky.",
        shortlistFoot: "{fit} z {total} prohlížečů sedí na moje odpovědi. Najdi svůj: {url}",
      },
    },
    shareCard: {
      canvasAria: "Vaše karta prohlížečové osobnosti",
      kicker: "Vaše prohlížečová osobnost",
      close: "Zavřít",
      design: "Vzhled",
      designs: { wrapped: "Wrapped", receipt: "Účtenka", terminal: "Terminál", trading: "Karta", list: "Výběr" },
      format: "Formát",
      post: "Příspěvek",
      story: "Story",
      osOnCard: "Váš systém na kartě",
      showIt: "Zobrazit",
      versionDistro: "Verze nebo distro",
      share: "Sdílet",
      nativeShare: "Sdílet…",
      tip: "X, Bluesky, Reddit a Discord neumí přiložit obrázek z odkazu, proto obrázek nejdřív zkopírujeme – stačí ho vložit do příspěvku.",
      download: "Stáhnout PNG",
      copyImage: "Kopírovat obrázek",
      copyLink: "Kopírovat odkaz",
      copyList: "Kopírovat seznam",
      status: {
        popupBlocked: "Prohlížeč zablokoval vyskakovací okno.",
        openTarget: "Otevřít {name}",
        shareFailed: "Sdílení tu nefunguje – zkuste Stáhnout PNG.",
        storySaved: "Uložen obrázek 9:16 pro story. Pošlete si ho do mobilu a přidejte do příběhu na Instagramu.",
        discordCopied: "Obrázek zkopírován. Vložte ho do libovolného kanálu na Discordu (Ctrl/Cmd+V).",
        discordSaved: "Discord nemá odkaz ke sdílení, tak jsme obrázek uložili. Přetáhněte ho do kanálu.",
        mastodonPrompt: "Váš server Mastodonu (např. mastodon.social, fosstodon.org):",
        mastodonInvalid: "To nevypadá jako adresa serveru.",
        copiedPaste: "Obrázek zkopírován – vložte ho do příspěvku na {name} (Ctrl/Cmd+V).",
        openedNoCopy: "Otevřeno: {name}. Váš prohlížeč neumí kopírovat obrázky – stáhněte PNG a přiložte ho.",
        saved: "Uloženo.",
        imageCopied: "Obrázek zkopírován.",
        imageCopyFailed: "Prohlížeč neumí kopírovat obrázky – použijte Stáhnout PNG.",
        linkCopied: "Odkaz na výsledky zkopírován.",
        linkCopyFailed: "Odkaz se nepodařilo zkopírovat.",
        listCopied: "Seznam {n} prohlížečů zkopírován jako text.",
        listCopyFailed: "Seznam se nepodařilo zkopírovat.",
        ariaLabel: "Karta: {name}{pick}. {roast}",
      },
      canvas: {
        wrappedTitle: "MOJE PROHLÍŽEČOVÁ OSOBNOST",
        rising: "Vedlejší znamení: {name}",
        myTop: "MŮJ TOP {n}",
        myBrowser: "MŮJ PROHLÍŽEČ",
        nonePick: "Žádný. Doslova nula.",
        topMatch: "#1 · {match}% shoda",
        survivedZero: "0 z {total} prohlížečů přežilo",
        matchPct: "{match}%",
        findYoursArrow: "najdi svůj →",
        receiptSubtitle: "ÚČTENKA OSOBNOSTI",
        orderPrefix: "OBJEDNÁVKA #",
        osKey: "SYSTÉM",
        extKey: "DOPLŇKY",
        anyExt: "JAKÉKOLI",
        mustVal: "NUTNÉ",
        niceVal: "PLUS",
        nopeVal: "NE",
        moreItems: "+ {n} DALŠÍCH POLOŽEK",
        wallCount: "PROHLÍŽEČŮ NA ZDI",
        survivedCount: "PROŠLO FILTRY",
        youAre: "JSTE",
        totalKey: "CELKEM",
        matchKey: "SHODA",
        thankYou: "DĚKUJEME, ŽE NEPOUŽÍVÁTE INTERNET EXPLORER",
        termPersonality: "Osobnost",
        termRising: "Vedlejší",
        termBrowser: "Prohlížeč",
        termNone: "nic nepřežilo",
        termRunnersUp: "Další",
        termEngine: "Jádro",
        termNa: "n/a",
        termOs: "Systém",
        termExt: "Doplňky",
        termPriorities: "Priority",
        termVibes: "pocitově",
        termMust: "Nutné",
        termAvoid: "Stopky",
        termEmpty: "žádné",
        termSurvivors: "Přežilo",
        browsersWord: ["prohlížeč", "prohlížeče", "prohlížečů"],
        basedOnInline: " · založeno na ",
        engineType: "typ {engine}",
        unknownEngineType: "typ ???",
        stats: ["Soukromí", "Vyladění", "Úpravy", "Lehkost", "Minimal."],
        alsoInDeck: "TAKÉ VE VAŠEM BALÍČKU",
        shortlistTitle: "MŮJ VÝBĚR PROHLÍŽEČŮ",
        shortlistSub: "{fit} z {total} prohlížečů sedí na odpovědi",
        nothingSurvived: "Nic nepřežilo.",
      },
    },
  },
};
