const lessonText = document.getElementById("lessonText");
const lessonCard = document.querySelector(".lesson-card");
const lessonSentences = document.querySelectorAll(".lesson-sentence");
const playLessonButton = document.getElementById("playLessonButton");
const previousSentenceButton = document.getElementById("previousSentenceButton");
const nextSentenceButton = document.getElementById("nextSentenceButton");
const repeatFragmentButton = document.getElementById("repeatFragmentButton");
const stopLessonButton = document.getElementById("stopLessonButton");
const speedSelect = document.getElementById("speedSelect");
const textCards = document.querySelectorAll(".text-card");
const floatingLessonPlayer = document.getElementById("floatingLessonPlayer");
const floatingLessonTitle = document.getElementById("floatingLessonTitle");
const floatingLessonStatus = document.getElementById("floatingLessonStatus");
const floatingPlayLessonButton = document.getElementById("floatingPlayLessonButton");
const floatingStopLessonButton = document.getElementById("floatingStopLessonButton");
const floatingRepeatFragmentButton = document.getElementById("floatingRepeatFragmentButton");
const floatingSpeedSelect = document.getElementById("floatingSpeedSelect");
const explanationLanguageSelect = document.getElementById("explanationLanguageSelect");
const togglePinyinButton = document.getElementById("togglePinyinButton");
const toggleTranslationButton = document.getElementById("toggleTranslationButton");
const toggleBreakdownButton = document.getElementById("toggleBreakdownButton");
const translationBlock = document.getElementById("translationBlock");
const breakdownBlock = document.getElementById("breakdownBlock");
const breakdownContent = document.getElementById("breakdownContent");
const currentTranslation = document.getElementById("currentTranslation");
const lessonMessage = document.getElementById("lessonMessage");
const stratagemList = document.getElementById("stratagemList");
const stratagemMessage = document.getElementById("stratagemMessage");
const jokeList = document.getElementById("jokeList");
const jokeMessage = document.getElementById("jokeMessage");
const ichingQuestionInput = document.getElementById("ichingQuestionInput");
const ichingButton = document.getElementById("ichingButton");
const ichingResult = document.getElementById("ichingResult");
const wordSearchInput = document.getElementById("wordSearchInput");
const wordSearchStatus = document.getElementById("wordSearchStatus");
const frequencyWordList = document.getElementById("frequencyWordList");
let wordEntries = document.querySelectorAll(".word-entry");
const sentenceToggleButtons = document.querySelectorAll(".sentence-toggle-button");
const strokeCharacterInput = document.getElementById("strokeCharacterInput");
const showStrokeButton = document.getElementById("showStrokeButton");
const strokeMessage = document.getElementById("strokeMessage");
const strokeTarget = document.getElementById("strokeTarget");
const strokeTool = document.getElementById("strokeTool");

const themeButton = document.getElementById("themeButton");

let lessonSpeechRate = 0.85;
let lessonSpeechRunId = 0;
let currentLessonSentenceIndex = 0;
let lessonIsPlaying = false;
let lessonIsPaused = false;
let lessonRepeatCurrentFragment = false;
let activeTextCard = null;
let lessonExplanationLanguage = "cs";
let interfaceLanguage = "cs";
let stratagemRepeatIndex = null;
let stratagemRepeatRate = 0.1;
let stratagemRepeatSpeedLabel = "";
let stratagemRepeatMode = "slow";
let stratagemSpeechRunId = 0;
let jokeRepeatIndex = null;
let jokeRepeatRate = 0.55;
let jokeRepeatSpeedLabel = "";
let jokeSpeechRunId = 0;
let strokeWriter = null;
let strokeRequestId = 0;

const interfaceTexts = {
  ru: {
    documentTitle: "Čínština s Čendou",
    interfaceLabel: "Интерфейс",
    pageTitle: "Čínština s Čendou",
    pageIntro: "Čínština od základů — pinyin, znaky, slova a věty.",
    heroNote: "Učte se čínsky jednoduše, krok za krokem — od pinyinu a znaků až po věty z reálného života.",
    navHome: "Úvod",
    navTexts: "Учебные тексты",
    navStratagems: "Moudrost",
    navJokes: "Анекдоты",
    navDiary: "Дневник",
    firstLessonTitle: "Первый учебный текст",
    firstLessonHint: "Это основа будущего сайта: китайский текст, пиньинь, перевод и прослушивание.",
    lessonFullTranslation: "Сегодня утром я хочу спокойно начать учиться. Сначала послушать небольшой отрывок на китайском, потом прочитать его один раз, а в конце записать одно новое предложение. Мне не нужно выучить сразу очень много. Если каждый день продвигаться понемногу, это уже хорошо.",
    speedLabel: "Скорость",
    speedExtraSlow: "Pomaleji",
    speedSlow: "медленно",
    speedNormal: "обычно",
    speedFast: "быстро",
    explanationLanguageLabel: "Язык объяснений",
    breakdownTitle: "Разбор текущего фрагмента",
    translationTitle: "Перевод",
    showPinyin: "Показать пиньинь",
    hidePinyin: "Скрыть пиньинь",
    showTranslation: "Показать перевод",
    hideTranslation: "Скрыть перевод",
    showBreakdown: "Показать разбор",
    hideBreakdown: "Скрыть разбор",
    repeatOff: "Повтор выкл.",
    repeatOn: "Повтор вкл.",
    previousTitle: "Назад на фрагмент",
    playTitle: "Слушать / пауза",
    repeatTitle: "Повторять текущий фрагмент",
    stopTitle: "Стоп",
    nextTitle: "Вперёд на фрагмент",
    darkTheme: "Тёмная тема",
    lightTheme: "Светлая тема",
    finished: "Чтение завершено",
    fragmentSelected: "Фрагмент выбран",
    unsupportedSpeech: "В этом браузере озвучивание не поддерживается",
    pause: "Пауза",
    continues: "Чтение продолжается",
    playing: "Текст озвучивается",
    previousFragment: "Предыдущий фрагмент",
    nextFragment: "Следующий фрагмент",
    stopped: "Чтение остановлено",
    speedChanged: "Скорость изменена",
    explanationLanguageCs: "Язык объяснений: čeština",
    explanationLanguageRu: "Язык объяснений: русский",
    explanationLanguageEn: "Язык объяснений: English",
    repeatOnMessage: "Повтор текущего фрагмента включён",
    repeatOffMessage: "Повтор выключен",
    noBreakdown: "Для этого фрагмента разбор ещё не добавлен.",
    stratagemsTitle: "Moudrost z Číny",
    stratagemsHint: "Stratagémy, přísloví, staré věty a malé čínské nápady pro dnešní život.",
    listenSlowButton: "Pomaleji",
    listenNormalButton: "Нормально",
    repeatStratagemOff: "Повтор выкл.",
    repeatStratagemOn: "Повтор вкл.",
    detailsButton: "Подробнее",
    hideDetailsButton: "Скрыть подробности",
    literalLabel: "Перевод",
    explanationLabel: "Объяснение",
    charactersLabel: "Иероглифы",
    examplesLabel: "Жизненные примеры",
    workExampleLabel: "Работа",
    lifeExampleLabel: "Жизнь",
    stratagemPlaying: "Слушаем: {title} ({speed})",
    stratagemRepeatOnMessage: "Повтор стратагемы включён",
    stratagemRepeatOffMessage: "Повтор стратагемы выключен",
    jokesTitle: "10 популярных китайских анекдотов",
    jokesHint: "Короткие учебные шутки: китайский текст, pinyin, перевод, прослушивание и объяснение юмора.",
    jokeTranslationLabel: "Перевод",
    jokePlaying: "Слушаем анекдот {number} ({speed})",
    jokeRepeatOnMessage: "Повтор анекдота включён",
    jokeRepeatOffMessage: "Повтор анекдота выключен",
    footerText: "Čínština od základů — pinyin, znaky, slova a věty."
  },
  cs: {
    documentTitle: "Čínština s Čendou",
    interfaceLabel: "Rozhraní",
    pageTitle: "Čínština s Čendou",
    pageIntro: "Čínština od základů — pinyin, znaky, slova a věty.",
    heroNote: "Učte se čínsky jednoduše, krok za krokem — od pinyinu a znaků až po věty z reálného života.",
    heroPhraseButton: "Začít textem",
    heroFollowButton: "Sledovat Čendu",
    navTexts: "Texty",
    navStratagems: "Moudrost",
    navJokes: "Humor",
    navAbout: "Čenda",
    navSocials: "Sítě",
    navDiary: "Deník",
    firstLessonTitle: "Texty k poslechu a opakování",
    firstLessonHint: "Krátké čínské texty pro poslech, opakování a zapamatování slov v kontextu.",
    lessonFullTranslation: "Dnes ráno chci v klidu začít studovat. Nejdřív si poslechnout krátký úryvek v čínštině, potom si ho jednou přečíst a nakonec si zapsat jednu novou větu. Nemusím se hned naučit strašně moc věcí. Když se každý den posunu jen o kousek, je to už dobré.",
    speedLabel: "Rychlost",
    speedExtraSlow: "Pomaleji",
    speedSlow: "pomalu",
    speedNormal: "normálně",
    speedFast: "rychle",
    explanationLanguageLabel: "Jazyk vysvětlení",
    breakdownTitle: "Rozbor aktuálního úryvku",
    translationTitle: "Překlad",
    showPinyin: "Zobrazit pinyin",
    hidePinyin: "Skrýt pinyin",
    showTranslation: "Zobrazit překlad",
    hideTranslation: "Skrýt překlad",
    showBreakdown: "Zobrazit rozbor",
    hideBreakdown: "Skrýt rozbor",
    repeatOff: "Opakování vyp.",
    repeatOn: "Opakování zap.",
    previousTitle: "Zpět na úryvek",
    playTitle: "Poslech / pauza",
    repeatTitle: "Opakovat aktuální úryvek",
    stopTitle: "Stop",
    nextTitle: "Další úryvek",
    darkTheme: "Tmavý režim",
    lightTheme: "Světlý režim",
    finished: "Čtení dokončeno",
    fragmentSelected: "Úryvek vybrán",
    unsupportedSpeech: "V tomto prohlížeči není hlasové čtení podporováno",
    pause: "Pauza",
    continues: "Čtení pokračuje",
    playing: "Text se přehrává",
    previousFragment: "Předchozí úryvek",
    nextFragment: "Další úryvek",
    stopped: "Čtení zastaveno",
    speedChanged: "Rychlost změněna",
    explanationLanguageCs: "Jazyk vysvětlení: čeština",
    explanationLanguageRu: "Jazyk vysvětlení: ruština",
    explanationLanguageEn: "Jazyk vysvětlení: angličtina",
    repeatOnMessage: "Opakování aktuálního úryvku zapnuto",
    repeatOffMessage: "Opakování vypnuto",
    noBreakdown: "Rozbor pro tento úryvek zatím není přidaný.",
    stratagemsTitle: "Moudrost z Číny",
    stratagemsHint: "Stratagémy, přísloví, staré věty a malé čínské nápady pro dnešní život.",
    listenSlowButton: "Pomaleji",
    listenNormalButton: "Normálně",
    repeatStratagemOff: "Opakování vyp.",
    repeatStratagemOn: "Opakování zap.",
    detailsButton: "Podrobněji",
    hideDetailsButton: "Skrýt podrobnosti",
    literalLabel: "Překlad",
    explanationLabel: "Vysvětlení",
    charactersLabel: "Znaky",
    examplesLabel: "Příklady ze života",
    workExampleLabel: "Práce",
    lifeExampleLabel: "Život",
    stratagemPlaying: "Poslech: {title} ({speed})",
    stratagemRepeatOnMessage: "Opakování strategie zapnuto",
    stratagemRepeatOffMessage: "Opakování strategie vypnuto",
    jokesTitle: "Humor a mini dialogy",
    jokesHint: "Krátké čínské vtipy a situace s pinyinem, překladem, poslechem a vysvětlením.",
    jokeTranslationLabel: "Překlad",
    jokePlaying: "Poslech vtipu {number} ({speed})",
    jokeRepeatOnMessage: "Opakování vtipu zapnuto",
    jokeRepeatOffMessage: "Opakování vtipu vypnuto",
    aboutTitle: "Kdo je Čenda",
    aboutText: "Čenda Zheng je Číňan žijící v Česku a tvář Taiwan39 Food v Českých Budějovicích. Na webu pomáhá učit čínštinu od základů — pinyin, tóny, znaky, slova a jednoduché věty bez učebnicového stresu.",
    taiwanTitle: "Taiwan39 Food",
    taiwanText: "Taiwan39 Food je Čendovo zázemí v Českých Budějovicích — místo, kde vznikají některé texty, videa, situace i nápady pro tento web.",
    socialTitle: "Sledujte Čendu",
    socialText: "Sledujte Čendu na sociálních sítích a hledejte videa podle hashtagů.",
    hashtagLine: "#cinstinascendou #zhengjianguo #cendavari #taiwan39food",
    footerText: "Čínština od základů — pinyin, znaky, slova a věty."
  },
  en: {
    documentTitle: "Čínština s Čendou",
    interfaceLabel: "Interface",
    pageTitle: "Čínština s Čendou",
    pageIntro: "Chinese from the basics — pinyin, characters, words, and sentences.",
    heroNote: "Learn Chinese simply, step by step — from pinyin and characters to real-life sentences.",
    navTexts: "Study Texts",
    navStratagems: "Wisdom",
    navJokes: "Jokes",
    navDiary: "Diary",
    firstLessonTitle: "First Study Text",
    firstLessonHint: "This is the foundation of the future site: Chinese text, pinyin, translation, and listening.",
    lessonFullTranslation: "This morning I want to start studying calmly. First, listen to a short Chinese passage, then read it once, and finally write down one new sentence. I do not need to learn too many things all at once. If I make a little progress every day, that is already good.",
    speedLabel: "Speed",
    speedExtraSlow: "Slower",
    speedSlow: "slow",
    speedNormal: "normal",
    speedFast: "fast",
    explanationLanguageLabel: "Explanation language",
    breakdownTitle: "Current Fragment Breakdown",
    translationTitle: "Translation",
    showPinyin: "Show pinyin",
    hidePinyin: "Hide pinyin",
    showTranslation: "Show translation",
    hideTranslation: "Hide translation",
    showBreakdown: "Show breakdown",
    hideBreakdown: "Hide breakdown",
    repeatOff: "Repeat off",
    repeatOn: "Repeat on",
    previousTitle: "Back one fragment",
    playTitle: "Listen / pause",
    repeatTitle: "Repeat current fragment",
    stopTitle: "Stop",
    nextTitle: "Next fragment",
    darkTheme: "Dark theme",
    lightTheme: "Light theme",
    finished: "Reading finished",
    fragmentSelected: "Fragment selected",
    unsupportedSpeech: "Voice playback is not supported in this browser",
    pause: "Paused",
    continues: "Reading continues",
    playing: "Text is playing",
    previousFragment: "Previous fragment",
    nextFragment: "Next fragment",
    stopped: "Reading stopped",
    speedChanged: "Speed changed",
    explanationLanguageCs: "Explanation language: Czech",
    explanationLanguageRu: "Explanation language: Russian",
    explanationLanguageEn: "Explanation language: English",
    repeatOnMessage: "Repeat for the current fragment is on",
    repeatOffMessage: "Repeat is off",
    noBreakdown: "The breakdown for this fragment has not been added yet.",
    stratagemsTitle: "Wisdom from China",
    stratagemsHint: "Stratagems, proverbs, old sayings, and small Chinese ideas for life today.",
    listenSlowButton: "Slower",
    listenNormalButton: "Normal",
    repeatStratagemOff: "Repeat off",
    repeatStratagemOn: "Repeat on",
    detailsButton: "Details",
    hideDetailsButton: "Hide details",
    literalLabel: "Translation",
    explanationLabel: "Explanation",
    charactersLabel: "Characters",
    examplesLabel: "Real-life examples",
    workExampleLabel: "Work",
    lifeExampleLabel: "Life",
    stratagemPlaying: "Listening: {title} ({speed})",
    stratagemRepeatOnMessage: "Stratagem repeat is on",
    stratagemRepeatOffMessage: "Stratagem repeat is off",
    jokesTitle: "10 Popular Chinese Jokes",
    jokesHint: "Short study jokes: Chinese text, pinyin, translation, listening, and an explanation of the humor.",
    jokeTranslationLabel: "Translation",
    jokePlaying: "Listening to joke {number} ({speed})",
    jokeRepeatOnMessage: "Joke repeat is on",
    jokeRepeatOffMessage: "Joke repeat is off",
    footerText: "Chinese from the basics — pinyin, characters, words, and sentences."
  }
};

const lessonBreakdowns = [
  [
    { text: "今天", pinyin: "jīntiān", meaning: "сегодня", note: "Слово из двух иероглифов: 今 + 天." },
    { text: "今", pinyin: "jīn", meaning: "нынешний, текущий", note: "Само по себе редко нужно новичку, но помогает понять слово 今天." },
    { text: "天", pinyin: "tiān", meaning: "день; небо", note: "В слове 今天 значит 'день'." },
    { text: "早上", pinyin: "zǎoshang", meaning: "утро; утром", note: "Целиком это слово полезнее, чем разбирать 早 и 上 отдельно." },
    { text: "今天早上", pinyin: "jīntiān zǎoshang", meaning: "сегодня утром", note: "Готовое обстоятельство времени." }
  ],
  [
    { text: "我", pinyin: "wǒ", meaning: "я", note: "Личное местоимение." },
    { text: "想", pinyin: "xiǎng", meaning: "хотеть; думать", note: "Здесь значит 'хочу'." },
    { text: "慢慢地", pinyin: "mànmàn de", meaning: "медленно; спокойно; постепенно", note: "地 помогает сделать из описания образ действия." },
    { text: "开始", pinyin: "kāishǐ", meaning: "начинать", note: "Очень частый глагол." },
    { text: "学习", pinyin: "xuéxí", meaning: "учиться; изучать", note: "Состоит из 学 и 习, но обычно запоминается как слово целиком." }
  ],
  [
    { text: "先", pinyin: "xiān", meaning: "сначала", note: "Показывает первый шаг." },
    { text: "听", pinyin: "tīng", meaning: "слушать", note: "Глагол действия." },
    { text: "一小段", pinyin: "yì xiǎo duàn", meaning: "небольшой отрывок", note: "段 — кусок, отрывок текста или речи." },
    { text: "中文", pinyin: "Zhōngwén", meaning: "китайский язык", note: "中文 часто значит именно язык." }
  ],
  [
    { text: "然后", pinyin: "ránhòu", meaning: "потом; затем", note: "Связывает шаги." },
    { text: "读", pinyin: "dú", meaning: "читать", note: "Глагол." },
    { text: "一遍", pinyin: "yí biàn", meaning: "один раз; один проход", note: "遍 считает повторения действия от начала до конца." }
  ],
  [
    { text: "最后", pinyin: "zuìhòu", meaning: "в конце; наконец", note: "Последний шаг." },
    { text: "写下", pinyin: "xiě xià", meaning: "записать", note: "下 добавляет ощущение 'зафиксировать вниз/на бумагу'." },
    { text: "一个", pinyin: "yí ge", meaning: "один", note: "个 — самый общий счётный суффикс." },
    { text: "新的句子", pinyin: "xīn de jùzi", meaning: "новое предложение", note: "新 — новый, 句子 — предложение." }
  ],
  [
    { text: "我", pinyin: "wǒ", meaning: "я", note: "Говорящий говорит о себе." },
    { text: "不需要", pinyin: "bù xūyào", meaning: "не нужно; нет необходимости", note: "需要 — нуждаться, 不 делает отрицание." },
    { text: "一下子", pinyin: "yíxiàzi", meaning: "сразу; за один раз", note: "Очень разговорное слово для резкого/быстрого действия." },
    { text: "我不需要一下子", pinyin: "wǒ bù xūyào yíxiàzi", meaning: "мне не нужно сразу", note: "Начало спокойной, поддерживающей мысли." }
  ],
  [
    { text: "学会", pinyin: "xuéhuì", meaning: "выучить; научиться", note: "Результат: не просто учить, а уже освоить." },
    { text: "很多", pinyin: "hěn duō", meaning: "много", note: "Частое сочетание." },
    { text: "东西", pinyin: "dōngxi", meaning: "вещи; штуки; материал", note: "В разговорной речи может значить 'много всего'." },
    { text: "学会很多东西", pinyin: "xuéhuì hěn duō dōngxi", meaning: "выучить много всего", note: "Здесь говорится о слишком большой нагрузке." }
  ],
  [
    { text: "每天", pinyin: "měitiān", meaning: "каждый день", note: "每 — каждый, 天 — день." },
    { text: "进步", pinyin: "jìnbù", meaning: "прогрессировать; делать успехи", note: "Очень полезное слово для темы обучения." },
    { text: "一点点", pinyin: "yìdiǎndiǎn", meaning: "понемногу; чуть-чуть", note: "Мягкое, поддерживающее выражение." },
    { text: "每天进步一点点", pinyin: "měitiān jìnbù yìdiǎndiǎn", meaning: "каждый день продвигаться понемногу", note: "Хорошая фраза-мотивация." }
  ],
  [
    { text: "就", pinyin: "jiù", meaning: "уже; тогда; как раз", note: "Здесь усиливает ощущение 'этого уже достаточно'." },
    { text: "已经", pinyin: "yǐjīng", meaning: "уже", note: "Показывает, что результат уже достигнут." },
    { text: "很好了", pinyin: "hěn hǎo le", meaning: "уже хорошо", note: "了 добавляет ощущение изменившегося состояния." },
    { text: "就已经很好了", pinyin: "jiù yǐjīng hěn hǎo le", meaning: "это уже хорошо", note: "Фраза поддержки: не надо требовать от себя слишком много." }
  ]
];

const inlineSentenceBreakdowns = {
  "今天早上，": [
    "今天早上 = dnes ráno / this morning"
  ],
  "我想慢慢地开始学习。": [
    "我 = já / I",
    "想 = chtít / want",
    "慢慢地 = pomalu, v klidu / slowly, calmly",
    "开始学习 = začít studovat / start studying"
  ],
  "每天进步一点点，": [
    "每天 = každý den / every day",
    "进步 = dělat pokrok / make progress",
    "一点点 = maličko / a little bit"
  ],
  "就已经很好了。": [
    "就已经很好了 = to už je velmi dobré / that is already good"
  ],
  "今天我想学习四个词：依靠，相比，商量，应用。": [
    "今天 = dnes / today",
    "我 = já / I",
    "想 = chtít / want",
    "学习 = učit se / to study",
    "四个词 = čtyři slova / four words",
    "依靠，相比，商量，应用 = cílová slova textu / target words of the text"
  ],
  "人不能一直依靠别人。": [
    "人 = člověk / person",
    "不能 = nemůže / cannot",
    "一直 = pořád, stále / continuously",
    "依靠 = spoléhat se na / to rely on",
    "别人 = ostatní lidé / other people"
  ],
  "但是我也要依靠自己的努力。": [
    "我 = já / I",
    "也 = také / also",
    "要 = muset, chtít / need to, want to",
    "依靠 = spoléhat se na / rely on",
    "自己 = sám/sama / oneself",
    "的 = spojovací částice / possessive particle",
    "努力 = úsilí / effort"
  ],
  "和昨天相比，今天我进步了一点。": [
    "和...相比 = ve srovnání s... / compared with...",
    "昨天 = včera / yesterday",
    "今天 = dnes / today",
    "我 = já / I",
    "进步 = zlepšit se, udělat pokrok / to make progress",
    "了一点 = trochu se něco změnilo / a little bit"
  ],
  "和别人相比，我可能说得不快，": [
    "和别人相比 = ve srovnání s ostatními / compared with others",
    "我 = já / I",
    "可能 = možná / maybe",
    "说得不快 = nemluvím rychle / do not speak fast",
    "得 = částice pro popis způsobu děje / particle describing how an action is done"
  ],
  "如果我不懂一个问题，我可以和别人商量。": [
    "如果 = jestliže / if",
    "我 = já / I",
    "不懂 = nerozumím / do not understand",
    "一个问题 = jedna otázka, jeden problém / one question, one problem",
    "可以 = můžu / can",
    "和别人 = s někým jiným / with other people",
    "商量 = poradit se, probrat / discuss, consult"
  ],
  "商量不是丢脸。": [
    "商量 = poradit se / to consult",
    "不是 = není / is not",
    "丢脸 = ztratit tvář, ostuda / lose face, shame",
    "Význam celé věty: Poradit se není ostuda."
  ],
  "学习一个词，不只是看它。": [
    "学习 = učit se / study",
    "一个词 = jedno slovo / one word",
    "不只是 = není jen / not only",
    "看它 = dívat se na něj / look at it"
  ],
  "我要应用它。": [
    "我 = já / I",
    "要 = muset, chtít / need to, want to",
    "应用 = použít, aplikovat / apply, use",
    "它 = ono, to / it"
  ],
  "一个词，只有经常应用，才会真的变成自己的词。": [
    "一个词 = jedno slovo / one word",
    "只有...才... = teprve když..., tak... / only if..., then...",
    "经常 = často / often",
    "应用 = používat, aplikovat / use, apply",
    "真的 = opravdu / really",
    "变成 = stát se / become",
    "自己的词 = vlastní slovo / one’s own word"
  ]
};

const czechFragmentTranslations = [
  "Dnes ráno,",
  "chci v klidu začít studovat.",
  "Nejdřív si poslechnout krátký úryvek v čínštině,",
  "potom si ho jednou přečíst,",
  "a nakonec si zapsat jednu novou větu.",
  "Nemusím hned",
  "se naučit strašně moc věcí.",
  "Každý den se posunout jen o kousek,",
  "to už je dobré."
];

const englishFragmentTranslations = [
  "This morning,",
  "I want to start studying calmly.",
  "First, listen to a short Chinese passage,",
  "then read it once,",
  "and finally write down one new sentence.",
  "I do not need to",
  "learn too many things all at once.",
  "Make a little progress every day,",
  "that is already good."
];

const czechLessonBreakdowns = [
  [
    { meaning: "dnes", note: "Slovo ze dvou znaků: 今 + 天." },
    { meaning: "současný, nynější", note: "Samostatně ho začátečník moc nepotřebuje, ale pomáhá pochopit slovo 今天." },
    { meaning: "den; nebe", note: "Ve slově 今天 znamená 'den'." },
    { meaning: "ráno; ráno jako čas", note: "Celé slovo je užitečnější než rozebírat 早 a 上 zvlášť." },
    { meaning: "dnes ráno", note: "Hotové časové určení." }
  ],
  [
    { meaning: "já", note: "Osobní zájmeno." },
    { meaning: "chtít; myslet", note: "Tady znamená 'chci'." },
    { meaning: "pomalu; v klidu; postupně", note: "地 pomáhá udělat z popisu způsob děje." },
    { meaning: "začít", note: "Velmi časté sloveso." },
    { meaning: "učit se; studovat", note: "Skládá se z 学 a 习, ale běžně se učí jako celé slovo." }
  ],
  [
    { meaning: "nejdřív", note: "Ukazuje první krok." },
    { meaning: "poslouchat", note: "Sloveso děje." },
    { meaning: "krátký úryvek", note: "段 je kus nebo úryvek textu či řeči." },
    { meaning: "čínština", note: "中文 často znamená právě jazyk." }
  ],
  [
    { meaning: "potom; pak", note: "Spojuje kroky." },
    { meaning: "číst", note: "Sloveso." },
    { meaning: "jednou; jeden průchod", note: "遍 počítá opakování činnosti od začátku do konce." }
  ],
  [
    { meaning: "nakonec; na závěr", note: "Poslední krok." },
    { meaning: "zapsat", note: "下 přidává pocit 'zapsat dolů / na papír'." },
    { meaning: "jeden", note: "个 je nejobecnější měrové slovo." },
    { meaning: "nová věta", note: "新 je nový, 句子 je věta." }
  ],
  [
    { meaning: "já", note: "Mluvčí mluví o sobě." },
    { meaning: "není potřeba; nemusím", note: "需要 znamená potřebovat, 不 tvoří zápor." },
    { meaning: "hned; najednou", note: "Velmi hovorové slovo pro rychlý nebo náhlý děj." },
    { meaning: "nemusím hned", note: "Začátek klidné, podpůrné myšlenky." }
  ],
  [
    { meaning: "naučit se; osvojit si", note: "Výsledek: nejen se učit, ale už to umět." },
    { meaning: "hodně", note: "Časté spojení." },
    { meaning: "věci; materiál", note: "V hovorové řeči může znamenat 'spoustu věcí'." },
    { meaning: "naučit se spoustu věcí", note: "Tady jde o příliš velkou zátěž." }
  ],
  [
    { meaning: "každý den", note: "每 je každý, 天 je den." },
    { meaning: "dělat pokrok", note: "Velmi užitečné slovo pro téma učení." },
    { meaning: "trošičku; po malých krocích", note: "Jemné, podpůrné vyjádření." },
    { meaning: "každý den se posunout o kousek", note: "Dobrá motivační věta." }
  ],
  [
    { meaning: "už; právě; tedy", note: "Tady zesiluje pocit 'to už stačí'." },
    { meaning: "už", note: "Ukazuje, že výsledek už nastal." },
    { meaning: "už je to dobré", note: "了 přidává pocit změny stavu." },
    { meaning: "to už je dobré", note: "Podpůrná věta: není nutné po sobě chtít příliš mnoho." }
  ]
];

const englishLessonBreakdowns = [
  [
    { meaning: "today", note: "A word made of two characters: 今 + 天." },
    { meaning: "current, present", note: "By itself it is not very important for a beginner, but it helps you understand 今天." },
    { meaning: "day; sky", note: "In 今天 it means 'day'." },
    { meaning: "morning; in the morning", note: "It is more useful to learn this as one whole word than to split 早 and 上." },
    { meaning: "this morning", note: "A ready-made time phrase." }
  ],
  [
    { meaning: "I; me", note: "A personal pronoun." },
    { meaning: "to want; to think", note: "Here it means 'want'." },
    { meaning: "slowly; calmly; gradually", note: "地 helps turn a description into the manner of an action." },
    { meaning: "to start", note: "A very common verb." },
    { meaning: "to study; to learn", note: "It is made of 学 and 习, but usually you learn it as one word." }
  ],
  [
    { meaning: "first; first of all", note: "Shows the first step." },
    { meaning: "to listen", note: "An action verb." },
    { meaning: "a short passage", note: "段 means a piece or passage of text or speech." },
    { meaning: "Chinese language", note: "中文 often means the language itself." }
  ],
  [
    { meaning: "then; after that", note: "Connects steps together." },
    { meaning: "to read", note: "A verb." },
    { meaning: "once; one complete pass", note: "遍 counts doing an action from beginning to end." }
  ],
  [
    { meaning: "finally; in the end", note: "The last step." },
    { meaning: "to write down", note: "下 adds the feeling of putting something down on paper." },
    { meaning: "one", note: "个 is the most general measure word." },
    { meaning: "a new sentence", note: "新 means new, 句子 means sentence." }
  ],
  [
    { meaning: "I; me", note: "The speaker is talking about herself." },
    { meaning: "do not need; there is no need", note: "需要 means to need, and 不 makes it negative." },
    { meaning: "all at once; immediately", note: "A very conversational word for doing something suddenly or in one go." },
    { meaning: "I do not need to immediately", note: "The beginning of a calm, supportive thought." }
  ],
  [
    { meaning: "to learn; to master", note: "The result: not just studying, but actually learning it." },
    { meaning: "a lot; many", note: "A very common combination." },
    { meaning: "things; material", note: "In everyday speech it can mean 'a lot of stuff'." },
    { meaning: "learn many things", note: "Here it talks about taking on too much at once." }
  ],
  [
    { meaning: "every day", note: "每 means every, 天 means day." },
    { meaning: "to make progress", note: "A very useful word for learning." },
    { meaning: "a little bit; step by step", note: "A gentle, encouraging expression." },
    { meaning: "make a little progress every day", note: "A good motivational phrase." }
  ],
  [
    { meaning: "already; then; just", note: "Here it strengthens the feeling of 'that is already enough'." },
    { meaning: "already", note: "Shows that the result has already happened." },
    { meaning: "already good", note: "了 adds the feeling of a changed state." },
    { meaning: "that is already good", note: "A supportive phrase: you do not need to demand too much from yourself." }
  ]
];

const stratagems = [
  { zh: "瞒天过海", pinyin: "Mán tiān guò hǎi", ru: "Обмануть небо и переправиться через море", cs: "Oklamat nebe a přeplout moře", en: "Deceive the heavens to cross the sea", ruExplain: "Действовать открыто, но так привычно, чтобы настоящий замысел никто не заметил.", csExplain: "Jednat otevřeně, ale tak běžně, aby si nikdo nevšiml skutečného záměru.", enExplain: "Act openly, but so routinely that nobody notices the real intention." },
  { zh: "围魏救赵", pinyin: "Wéi Wèi jiù Zhào", ru: "Осадить Вэй, чтобы спасти Чжао", cs: "Obklíčit Wej, aby se zachránilo Čao", en: "Besiege Wei to rescue Zhao", ruExplain: "Не бить прямо в сильное место, а ударить туда, где противник вынужден отвлечься.", csExplain: "Neútočit přímo na silné místo, ale udeřit tam, kde se protivník musí odklonit.", enExplain: "Do not attack the strongest point directly; strike where the opponent must redirect attention." },
  { zh: "借刀杀人", pinyin: "Jiè dāo shā rén", ru: "Убить чужим ножом", cs: "Zabít vypůjčeným nožem", en: "Kill with a borrowed knife", ruExplain: "Добиться цели чужими руками, не показывая собственное участие.", csExplain: "Dosáhnout cíle rukama někoho jiného a neukazovat vlastní účast.", enExplain: "Achieve a goal through someone else's action while hiding your own involvement." },
  { zh: "以逸待劳", pinyin: "Yǐ yì dài láo", ru: "Отдыхая, ждать уставшего", cs: "Odpočatý čeká na unaveného", en: "Wait at ease for the exhausted enemy", ruExplain: "Сохранять силы и ждать момента, когда другая сторона устанет или ошибётся.", csExplain: "Šetřit síly a čekat, až se druhá strana unaví nebo udělá chybu.", enExplain: "Save energy and wait until the other side becomes tired or makes a mistake." },
  { zh: "趁火打劫", pinyin: "Chèn huǒ dǎ jié", ru: "Грабить во время пожара", cs: "Loupit během požáru", en: "Loot a burning house", ruExplain: "Использовать чужой хаос или слабость как момент для действия.", csExplain: "Využít cizí chaos nebo slabost jako příležitost k akci.", enExplain: "Use another side's chaos or weakness as the moment to act." },
  { zh: "声东击西", pinyin: "Shēng dōng jī xī", ru: "Шуметь на востоке, ударить на западе", cs: "Dělat hluk na východě, udeřit na západě", en: "Make noise in the east, strike in the west", ruExplain: "Создать ложное направление внимания, а действовать в другом месте.", csExplain: "Vytvořit falešný směr pozornosti a jednat jinde.", enExplain: "Create a false direction of attention, then act somewhere else." },
  { zh: "无中生有", pinyin: "Wú zhōng shēng yǒu", ru: "Создать нечто из ничего", cs: "Vytvořit něco z ničeho", en: "Create something from nothing", ruExplain: "Сначала создать впечатление или видимость, а потом использовать её как реальность.", csExplain: "Nejprve vytvořit dojem nebo zdání a potom ho využít jako realitu.", enExplain: "First create an impression or appearance, then use it as if it were real." },
  { zh: "暗度陈仓", pinyin: "Àn dù Chéncāng", ru: "Тайно пройти через Чэньцан", cs: "Tajně projít přes Čchencchang", en: "Secretly cross at Chencang", ruExplain: "Показывать один путь, а незаметно идти другим.", csExplain: "Ukazovat jednu cestu, ale nenápadně jít jinou.", enExplain: "Show one route while secretly taking another." },
  { zh: "隔岸观火", pinyin: "Gé àn guān huǒ", ru: "Смотреть на пожар с другого берега", cs: "Pozorovat požár z druhého břehu", en: "Watch the fire from across the river", ruExplain: "Не вмешиваться сразу, а дать конфликту другой стороны развиться самому.", csExplain: "Nezasahovat hned a nechat konflikt druhé strany, aby se rozvinul sám.", enExplain: "Do not intervene too early; let the other side's conflict develop by itself." },
  { zh: "笑里藏刀", pinyin: "Xiào lǐ cáng dāo", ru: "Спрятать нож в улыбке", cs: "Schovat nůž v úsměvu", en: "Hide a knife behind a smile", ruExplain: "Внешне быть мягким и дружелюбным, но внутри держать жёсткий план.", csExplain: "Navenek být milý a přátelský, ale uvnitř mít tvrdý plán.", enExplain: "Appear gentle and friendly while keeping a hard plan inside." },
  { zh: "李代桃僵", pinyin: "Lǐ dài táo jiāng", ru: "Слива гибнет вместо персика", cs: "Švestka nahradí broskev a uschne", en: "Sacrifice the plum tree for the peach tree", ruExplain: "Пожертвовать меньшим, чтобы сохранить более важное.", csExplain: "Obětovat menší věc, aby se zachovalo něco důležitějšího.", enExplain: "Sacrifice something smaller to protect what matters more." },
  { zh: "顺手牵羊", pinyin: "Shùn shǒu qiān yáng", ru: "Попутно увести овцу", cs: "Mimochodem odvést ovci", en: "Take the sheep in passing", ruExplain: "Заметить маленькую возможность и спокойно взять её по пути.", csExplain: "Všimnout si malé příležitosti a vzít ji cestou.", enExplain: "Notice a small opportunity and take it naturally along the way." },
  { zh: "打草惊蛇", pinyin: "Dǎ cǎo jīng shé", ru: "Бить по траве, чтобы спугнуть змею", cs: "Udeřit do trávy a vyplašit hada", en: "Beat the grass to startle the snake", ruExplain: "Проверочным действием заставить скрытую опасность проявиться.", csExplain: "Zkušebním krokem přimět skryté nebezpečí, aby se ukázalo.", enExplain: "Use a probing action to make a hidden danger reveal itself." },
  { zh: "借尸还魂", pinyin: "Jiè shī huán hún", ru: "Одолжить труп, чтобы вернуть душу", cs: "Půjčit si tělo a vrátit duši", en: "Borrow a corpse to return the soul", ruExplain: "Взять старую форму или забытый проект и наполнить его новой силой.", csExplain: "Vzít starou formu nebo zapomenutý projekt a dát mu novou sílu.", enExplain: "Use an old form or forgotten project and fill it with new life." },
  { zh: "调虎离山", pinyin: "Diào hǔ lí shān", ru: "Выманить тигра с горы", cs: "Vylákat tygra z hory", en: "Lure the tiger down from the mountain", ruExplain: "Вывести сильного противника из выгодной для него позиции.", csExplain: "Dostat silného protivníka z pozice, která mu dává výhodu.", enExplain: "Move a strong opponent away from the position that gives them advantage." },
  { zh: "欲擒故纵", pinyin: "Yù qín gù zòng", ru: "Чтобы поймать, сначала отпустить", cs: "Chceš-li chytit, nejdřív pusť", en: "Release in order to capture", ruExplain: "Дать свободу движения, чтобы другая сторона сама раскрыла намерения.", csExplain: "Dát volnost pohybu, aby druhá strana sama odhalila záměry.", enExplain: "Give freedom of movement so the other side reveals its intentions." },
  { zh: "抛砖引玉", pinyin: "Pāo zhuān yǐn yù", ru: "Бросить кирпич, чтобы получить нефрит", cs: "Hodit cihlu a přilákat nefrit", en: "Throw out a brick to attract jade", ruExplain: "Предложить что-то простое, чтобы получить ответ ценнее.", csExplain: "Nabídnout něco jednoduchého, aby přišla hodnotnější odpověď.", enExplain: "Offer something simple in order to draw out something more valuable." },
  { zh: "擒贼擒王", pinyin: "Qín zéi qín wáng", ru: "Ловя разбойников, поймай главаря", cs: "Chytáš-li zloděje, chyť krále", en: "To catch bandits, capture their leader", ruExplain: "Решать проблему через главный источник, а не через мелкие последствия.", csExplain: "Řešit problém přes hlavní zdroj, ne přes drobné následky.", enExplain: "Solve a problem by targeting its main source, not its small effects." },
  { zh: "釜底抽薪", pinyin: "Fǔ dǐ chōu xīn", ru: "Вытащить дрова из-под котла", cs: "Vytáhnout dříví zpod kotle", en: "Remove the firewood from under the pot", ruExplain: "Не спорить с огнём, а убрать то, что его питает.", csExplain: "Nebojuj s ohněm, ale odstraň to, co ho živí.", enExplain: "Do not fight the flames; remove what feeds them." },
  { zh: "混水摸鱼", pinyin: "Hún shuǐ mō yú", ru: "Ловить рыбу в мутной воде", cs: "Chytat ryby v kalné vodě", en: "Fish in troubled waters", ruExplain: "В хаосе и неопределённости легче незаметно получить своё.", csExplain: "V chaosu a nejistotě je snazší nenápadně získat, co chceš.", enExplain: "In chaos and uncertainty, it is easier to quietly get what you want." },
  { zh: "金蝉脱壳", pinyin: "Jīn chán tuō qiào", ru: "Золотая цикада сбрасывает оболочку", cs: "Zlatá cikáda opouští skořápku", en: "The golden cicada sheds its shell", ruExplain: "Оставить видимость присутствия, а самому незаметно уйти.", csExplain: "Nechat zdání přítomnosti a sám nenápadně odejít.", enExplain: "Leave the appearance of presence while quietly withdrawing." },
  { zh: "关门捉贼", pinyin: "Guān mén zhuō zéi", ru: "Закрыть дверь и поймать вора", cs: "Zavřít dveře a chytit zloděje", en: "Shut the door to catch the thief", ruExplain: "Когда противник внутри и слаб, не дать ему пути к отступлению.", csExplain: "Když je protivník uvnitř a slabý, nenechat mu cestu k úniku.", enExplain: "When the opponent is trapped and weak, deny an escape route." },
  { zh: "远交近攻", pinyin: "Yuǎn jiāo jìn gōng", ru: "Дружить с дальними, атаковать ближних", cs: "Spojit se s dalekými, útočit na blízké", en: "Befriend the distant, attack the near", ruExplain: "Создавать союзы далеко, чтобы решать ближайшие угрозы.", csExplain: "Vytvářet vzdálená spojenectví, aby se řešily blízké hrozby.", enExplain: "Build distant alliances in order to deal with nearby threats." },
  { zh: "假道伐虢", pinyin: "Jiǎ dào fá Guó", ru: "Попросить проход, чтобы напасть на Го", cs: "Vypůjčit si cestu k útoku na Kuo", en: "Borrow a road to attack Guo", ruExplain: "Получить разрешение на одно, а использовать путь для другой цели.", csExplain: "Získat povolení k jedné věci, ale využít cestu k jinému cíli.", enExplain: "Get permission for one purpose, then use the path for another." },
  { zh: "偷梁换柱", pinyin: "Tōu liáng huàn zhù", ru: "Украсть балку и заменить столб", cs: "Ukrást trám a vyměnit sloup", en: "Steal the beams and replace the pillars", ruExplain: "Незаметно заменить основу системы, чтобы всё внешне выглядело прежним.", csExplain: "Nenápadně vyměnit základ systému, aby vše navenek vypadalo stejně.", enExplain: "Quietly replace the foundation while everything still looks the same outside." },
  { zh: "指桑骂槐", pinyin: "Zhǐ sāng mà huái", ru: "Указывать на тутовник, ругать акацию", cs: "Ukázat na moruši a nadávat akátu", en: "Point at the mulberry, scold the locust tree", ruExplain: "Критиковать одного косвенно, обращаясь будто бы к другому.", csExplain: "Kritizovat někoho nepřímo, jako by šlo o někoho jiného.", enExplain: "Criticize someone indirectly while seeming to address another." },
  { zh: "假痴不癫", pinyin: "Jiǎ chī bù diān", ru: "Притвориться глупым, но не безумным", cs: "Předstírat hloupost, ale ne šílenství", en: "Feign foolishness without going mad", ruExplain: "Выглядеть слабее или проще, чем ты есть, сохраняя контроль.", csExplain: "Vypadat slabší nebo jednodušší, než jsi, ale zachovat kontrolu.", enExplain: "Appear weaker or simpler than you are while keeping control." },
  { zh: "上屋抽梯", pinyin: "Shàng wū chōu tī", ru: "Заманить на крышу и убрать лестницу", cs: "Dostat na střechu a odnést žebřík", en: "Remove the ladder after the climb", ruExplain: "Заставить сторону войти в ситуацию, из которой трудно выйти.", csExplain: "Dostat druhou stranu do situace, ze které se těžko odchází.", enExplain: "Draw someone into a situation that is difficult to leave." },
  { zh: "树上开花", pinyin: "Shù shàng kāi huā", ru: "Заставить дерево расцвести", cs: "Nechat strom rozkvést", en: "Make flowers bloom on a tree", ruExplain: "Создать видимость силы или богатства, усилив впечатление.", csExplain: "Vytvořit zdání síly nebo bohatství posílením dojmu.", enExplain: "Create an appearance of strength or abundance by amplifying the impression." },
  { zh: "反客为主", pinyin: "Fǎn kè wéi zhǔ", ru: "Гость становится хозяином", cs: "Host se stane pánem", en: "Turn from guest into host", ruExplain: "Постепенно перейти из слабой роли в главную управляющую позицию.", csExplain: "Postupně přejít ze slabší role do hlavní řídicí pozice.", enExplain: "Gradually move from a weaker role into the controlling position." },
  { zh: "美人计", pinyin: "Měi rén jì", ru: "Стратагема красавицы", cs: "Strategie krásky", en: "The beauty trap", ruExplain: "Использовать желание, симпатию или привязанность как способ влияния.", csExplain: "Využít touhu, sympatii nebo náklonnost jako způsob vlivu.", enExplain: "Use desire, affection, or attraction as a means of influence." },
  { zh: "空城计", pinyin: "Kōng chéng jì", ru: "Стратагема пустого города", cs: "Strategie prázdného města", en: "The empty city stratagem", ruExplain: "Показать спокойствие и уверенность там, где на самом деле есть слабость.", csExplain: "Ukázat klid a jistotu tam, kde je ve skutečnosti slabost.", enExplain: "Show calm confidence where there is actually weakness." },
  { zh: "反间计", pinyin: "Fǎn jiàn jì", ru: "Стратагема обратного шпиона", cs: "Strategie dvojitého agenta", en: "The counter-spy stratagem", ruExplain: "Использовать чужого информатора или слух против его же стороны.", csExplain: "Využít cizího informátora nebo fámu proti jeho vlastní straně.", enExplain: "Use an enemy informant or rumor against the enemy's own side." },
  { zh: "苦肉计", pinyin: "Kǔ ròu jì", ru: "Стратагема самоповреждения", cs: "Strategie bolestivé oběti", en: "The self-injury stratagem", ruExplain: "Пойти на видимую жертву, чтобы вызвать доверие или обмануть наблюдателя.", csExplain: "Podstoupit viditelnou oběť, aby vznikla důvěra nebo byl pozorovatel oklamán.", enExplain: "Accept visible sacrifice to gain trust or deceive the observer." },
  { zh: "连环计", pinyin: "Lián huán jì", ru: "Цепная стратагема", cs: "Řetězová strategie", en: "The chain stratagem", ruExplain: "Связать несколько ходов так, чтобы один усиливал следующий.", csExplain: "Propojit několik tahů tak, aby jeden posiloval další.", enExplain: "Link several moves so each one strengthens the next." },
  { zh: "走为上计", pinyin: "Zǒu wéi shàng jì", ru: "Уйти — лучшая стратегия", cs: "Odejít je nejlepší strategie", en: "Retreat is the best stratagem", ruExplain: "Когда ситуация проигрышная, сохранить силы важнее, чем красиво проиграть.", csExplain: "Když je situace ztracená, je důležitější zachovat síly než prohrát hrdinsky.", enExplain: "When the situation is losing, preserving strength matters more than losing proudly." }
];

const jokes = [
  {
    zh: "老师问：“小明，什么东西越洗越脏？”\n小明说：“水。”",
    pinyin: "Lǎoshī wèn: “Xiǎomíng, shénme dōngxi yuè xǐ yuè zāng?”\nXiǎomíng shuō: “Shuǐ.”",
    ru: "Учитель спрашивает: «Сяомин, что становится грязнее, чем больше его моешь?»\nСяомин отвечает: «Вода».",
    cs: "Učitel se ptá: „Siao-mingu, co je tím špinavější, čím víc to myješ?“\nSiao-ming říká: „Voda.“",
    en: "The teacher asks, “Xiaoming, what gets dirtier the more you wash it?”\nXiaoming says, “Water.”",
    ruExplain: "Ожидается ответ про предмет, но ребёнок смотрит буквально: при мытье грязь переходит в воду.",
    csExplain: "Čeká se odpověď o předmětu, ale dítě to vezme doslova: při mytí se špína přesune do vody.",
    enExplain: "The expected answer is an object, but the child takes it literally: washing moves dirt into the water."
  },
  {
    zh: "妈妈问：“你为什么把零分的试卷藏起来？”\n孩子说：“我怕它让你也伤心。”",
    pinyin: "Māma wèn: “Nǐ wèishénme bǎ líng fēn de shìjuàn cáng qǐlái?”\nHáizi shuō: “Wǒ pà tā ràng nǐ yě shāngxīn.”",
    ru: "Мама спрашивает: «Почему ты спрятал контрольную с нулём баллов?»\nРебёнок отвечает: «Я боялся, что она и тебя расстроит».",
    cs: "Maminka se ptá: „Proč jsi schoval test s nulou bodů?“\nDítě říká: „Bál jsem se, že rozesmutní i tebe.“",
    en: "Mom asks, “Why did you hide the test with zero points?”\nThe child says, “I was afraid it would make you sad too.”",
    ruExplain: "Ребёнок превращает свою ошибку в заботу о маме. Комизм в милом оправдании.",
    csExplain: "Dítě promění svou chybu v péči o maminku. Humor je v roztomilé výmluvě.",
    enExplain: "The child turns a mistake into concern for Mom. The humor is in the sweet excuse."
  },
  {
    zh: "朋友问：“你为什么每天跑步？”\n他说：“因为钱包追不上我花钱的速度。”",
    pinyin: "Péngyou wèn: “Nǐ wèishénme měitiān pǎobù?”\nTā shuō: “Yīnwèi qiánbāo zhuī bù shàng wǒ huā qián de sùdù.”",
    ru: "Друг спрашивает: «Почему ты каждый день бегаешь?»\nОн отвечает: «Потому что мой кошелёк не успевает за скоростью, с которой я трачу деньги».",
    cs: "Kamarád se ptá: „Proč běháš každý den?“\nOn říká: „Protože peněženka nestíhá rychlost, jakou utrácím.“",
    en: "A friend asks, “Why do you run every day?”\nHe says, “Because my wallet cannot keep up with how fast I spend money.”",
    ruExplain: "Обычный вопрос о спорте неожиданно превращается в шутку про расходы.",
    csExplain: "Běžná otázka o sportu se nečekaně změní ve vtip o utrácení.",
    enExplain: "A normal question about exercise unexpectedly turns into a joke about spending."
  },
  {
    zh: "老师说：“请用‘果然’造句。”\n小明说：“我先吃水果，然后喝水。”",
    pinyin: "Lǎoshī shuō: “Qǐng yòng ‘guǒrán’ zàojù.”\nXiǎomíng shuō: “Wǒ xiān chī shuǐguǒ, ránhòu hē shuǐ.”",
    ru: "Учитель говорит: «Составь предложение со словом “果然”».\nСяомин отвечает: «Сначала я ем фрукты, потом пью воду».",
    cs: "Učitel říká: „Vytvoř větu se slovem ‚guǒrán‘.“\nSiao-ming říká: „Nejdřív jím ovoce, potom piju vodu.“",
    en: "The teacher says, “Make a sentence with ‘guǒrán.’”\nXiaoming says, “First I eat fruit, then I drink water.”",
    ruExplain: "果然 значит «действительно», но ребёнок делит звук на 果 «фрукты» и 然后 «потом». Это игра на звучании.",
    csExplain: "果然 znamená „opravdu“, ale dítě slyší 果 jako „ovoce“ a 然后 jako „potom“. Je to slovní hříčka.",
    enExplain: "果然 means “indeed,” but the child hears 果 as “fruit” and 然后 as “then.” It is a sound-based pun."
  },
  {
    zh: "医生说：“你需要多喝水。”\n病人说：“我已经很努力了，刚才吃了一个西瓜。”",
    pinyin: "Yīshēng shuō: “Nǐ xūyào duō hē shuǐ.”\nBìngrén shuō: “Wǒ yǐjīng hěn nǔlì le, gāngcái chī le yí ge xīguā.”",
    ru: "Врач говорит: «Вам нужно пить больше воды».\nПациент отвечает: «Я уже очень стараюсь, только что съел арбуз».",
    cs: "Lékař říká: „Musíte pít víc vody.“\nPacient říká: „Už se hodně snažím, právě jsem snědl meloun.“",
    en: "The doctor says, “You need to drink more water.”\nThe patient says, “I am already trying hard. I just ate a watermelon.”",
    ruExplain: "Арбуз содержит много воды, но совет врача был именно пить. Смешно из-за слишком буквального обходного решения.",
    csExplain: "Meloun obsahuje hodně vody, ale lékař radil pít. Je to směšné kvůli doslovné náhradě.",
    enExplain: "Watermelon contains a lot of water, but the doctor meant drinking. The joke is the overly literal workaround."
  },
  {
    zh: "朋友说：“你手机怎么这么安静？”\n他说：“它没电了，正在反省。”",
    pinyin: "Péngyou shuō: “Nǐ shǒujī zěnme zhème ānjìng?”\nTā shuō: “Tā méi diàn le, zhèngzài fǎnxǐng.”",
    ru: "Друг говорит: «Почему твой телефон такой тихий?»\nОн отвечает: «У него села батарея, он сейчас размышляет над своим поведением».",
    cs: "Kamarád říká: „Proč je tvůj mobil tak tichý?“\nOn říká: „Vybil se a teď přemýšlí o svém chování.“",
    en: "A friend says, “Why is your phone so quiet?”\nHe says, “It ran out of battery and is reflecting on its behavior.”",
    ruExplain: "Телефону приписывают человеческое поведение. Это мягкая шутка про зависимость от уведомлений.",
    csExplain: "Telefon dostane lidské chování. Je to jemný vtip o závislosti na oznámeních.",
    enExplain: "The phone is given human behavior. It is a light joke about notification overload."
  },
  {
    zh: "老师问：“谁发明了作业？”\n小明说：“一定是老师的敌人。”",
    pinyin: "Lǎoshī wèn: “Shéi fāmíng le zuòyè?”\nXiǎomíng shuō: “Yídìng shì lǎoshī de dírén.”",
    ru: "Учитель спрашивает: «Кто придумал домашнее задание?»\nСяомин отвечает: «Наверное, враг учителей».",
    cs: "Učitel se ptá: „Kdo vymyslel domácí úkoly?“\nSiao-ming říká: „Určitě nepřítel učitelů.“",
    en: "The teacher asks, “Who invented homework?”\nXiaoming says, “It must have been the teachers’ enemy.”",
    ruExplain: "Обычно домашние задания ненавидят ученики, но ответ переворачивает ситуацию: проверять их тяжело и учителям.",
    csExplain: "Domácí úkoly obvykle nemají rádi žáci, ale odpověď situaci obrací: kontrolovat je je těžké i pro učitele.",
    enExplain: "Students usually dislike homework, but the answer flips it: grading it is hard for teachers too."
  },
  {
    zh: "爸爸说：“你要学会独立。”\n孩子说：“好，那我的零花钱也要独立增加。”",
    pinyin: "Bàba shuō: “Nǐ yào xuéhuì dúlì.”\nHáizi shuō: “Hǎo, nà wǒ de línghuāqián yě yào dúlì zēngjiā.”",
    ru: "Папа говорит: «Тебе нужно научиться самостоятельности».\nРебёнок отвечает: «Хорошо, тогда мои карманные деньги тоже должны самостоятельно увеличиться».",
    cs: "Táta říká: „Musíš se naučit samostatnosti.“\nDítě říká: „Dobře, tak moje kapesné se taky musí samostatně zvýšit.“",
    en: "Dad says, “You need to learn independence.”\nThe child says, “Okay, then my pocket money should independently increase too.”",
    ruExplain: "Ребёнок ловко использует взрослое слово «самостоятельность» в свою пользу.",
    csExplain: "Dítě chytře použije dospělé slovo „samostatnost“ ve svůj prospěch.",
    enExplain: "The child cleverly uses the adult word “independence” for personal benefit."
  },
  {
    zh: "朋友问：“你为什么不减肥？”\n他说：“我怕瘦下来，朋友认不出我。”",
    pinyin: "Péngyou wèn: “Nǐ wèishénme bù jiǎnféi?”\nTā shuō: “Wǒ pà shòu xiàlái, péngyou rèn bù chū wǒ.”",
    ru: "Друг спрашивает: «Почему ты не худеешь?»\nОн отвечает: «Боюсь, если похудею, друзья меня не узнают».",
    cs: "Kamarád se ptá: „Proč nehubneš?“\nOn říká: „Bojím se, že když zhubnu, přátelé mě nepoznají.“",
    en: "A friend asks, “Why don’t you lose weight?”\nHe says, “I’m afraid that if I slim down, my friends won’t recognize me.”",
    ruExplain: "Это самоироничная отговорка: человек делает вид, что не худеет ради друзей.",
    csExplain: "Je to sebeironická výmluva: člověk předstírá, že nehubne kvůli přátelům.",
    enExplain: "It is a self-deprecating excuse: the person pretends not to lose weight for the sake of friends."
  },
  {
    zh: "老师问：“你为什么迟到？”\n小明说：“因为路上有个牌子写着‘学校慢行’。”",
    pinyin: "Lǎoshī wèn: “Nǐ wèishénme chídào?”\nXiǎomíng shuō: “Yīnwèi lùshang yǒu ge páizi xiězhe ‘xuéxiào màn xíng’.”",
    ru: "Учитель спрашивает: «Почему ты опоздал?»\nСяомин отвечает: «Потому что по дороге был знак: “У школы двигаться медленно”».",
    cs: "Učitel se ptá: „Proč jdeš pozdě?“\nSiao-ming říká: „Protože cestou byla značka: ‚U školy jeď pomalu‘.“",
    en: "The teacher asks, “Why are you late?”\nXiaoming says, “Because there was a sign on the road: ‘Slow down near the school.’”",
    ruExplain: "Знак относится к транспорту, а ребёнок применяет его к себе. Смешно из-за буквального оправдания.",
    csExplain: "Značka platí pro dopravu, ale dítě ji vztáhne na sebe. Humor je v doslovné výmluvě.",
    enExplain: "The sign is for traffic, but the child applies it to himself. The joke is the literal excuse."
  }
];

const stratagemCharacterMeanings = {
  "瞒": { pinyin: "mán", ru: "скрывать, обманывать", cs: "skrývat, klamat", en: "to conceal, deceive" },
  "天": { pinyin: "tiān", ru: "небо; высшая сила", cs: "nebe; vyšší síla", en: "heaven; higher power" },
  "过": { pinyin: "guò", ru: "переходить, проходить", cs: "přejít, projít", en: "to cross, pass" },
  "海": { pinyin: "hǎi", ru: "море", cs: "moře", en: "sea" },
  "围": { pinyin: "wéi", ru: "окружать, осаждать", cs: "obklíčit, obléhat", en: "to surround, besiege" },
  "魏": { pinyin: "Wèi", ru: "Вэй, древнее царство", cs: "Wej, starověký stát", en: "Wei, an ancient state" },
  "救": { pinyin: "jiù", ru: "спасать", cs: "zachránit", en: "to rescue" },
  "赵": { pinyin: "Zhào", ru: "Чжао, древнее царство", cs: "Čao, starověký stát", en: "Zhao, an ancient state" },
  "借": { pinyin: "jiè", ru: "занимать, брать взаймы", cs: "půjčit si", en: "to borrow" },
  "刀": { pinyin: "dāo", ru: "нож", cs: "nůž", en: "knife" },
  "杀": { pinyin: "shā", ru: "убивать", cs: "zabít", en: "to kill" },
  "人": { pinyin: "rén", ru: "человек", cs: "člověk", en: "person" },
  "以": { pinyin: "yǐ", ru: "с помощью; используя", cs: "pomocí; za použití", en: "by means of; using" },
  "逸": { pinyin: "yì", ru: "покой, отдых", cs: "klid, odpočinek", en: "ease, rest" },
  "待": { pinyin: "dài", ru: "ждать", cs: "čekat", en: "to wait" },
  "劳": { pinyin: "láo", ru: "усталость, труд", cs: "únava, práce", en: "fatigue, labor" },
  "趁": { pinyin: "chèn", ru: "пользоваться моментом", cs: "využít chvíli", en: "to take advantage of" },
  "火": { pinyin: "huǒ", ru: "огонь", cs: "oheň", en: "fire" },
  "打": { pinyin: "dǎ", ru: "бить, действовать", cs: "bít, jednat", en: "to hit, act" },
  "劫": { pinyin: "jié", ru: "грабить", cs: "loupit", en: "to rob" },
  "声": { pinyin: "shēng", ru: "звук, шум", cs: "zvuk, hluk", en: "sound, noise" },
  "东": { pinyin: "dōng", ru: "восток", cs: "východ", en: "east" },
  "击": { pinyin: "jī", ru: "ударять", cs: "udeřit", en: "to strike" },
  "西": { pinyin: "xī", ru: "запад", cs: "západ", en: "west" },
  "无": { pinyin: "wú", ru: "нет, отсутствие", cs: "není, absence", en: "nothing, absence" },
  "中": { pinyin: "zhōng", ru: "середина, внутри", cs: "střed, uvnitř", en: "middle, within" },
  "生": { pinyin: "shēng", ru: "рождать, создавать", cs: "zrodit, vytvořit", en: "to give birth, create" },
  "有": { pinyin: "yǒu", ru: "иметь, существовать", cs: "mít, existovat", en: "to have, exist" },
  "暗": { pinyin: "àn", ru: "тайный, тёмный", cs: "tajný, temný", en: "secret, dark" },
  "度": { pinyin: "dù", ru: "переправляться, проходить", cs: "přejít, překročit", en: "to cross, pass" },
  "陈": { pinyin: "Chén", ru: "Чэнь; часть имени места", cs: "Čchen; část místního jména", en: "Chen; part of a place name" },
  "仓": { pinyin: "cāng", ru: "амбар; часть имени Чэньцан", cs: "sýpka; část jména Čchencchang", en: "granary; part of Chencang" },
  "隔": { pinyin: "gé", ru: "отделять", cs: "oddělovat", en: "to separate" },
  "岸": { pinyin: "àn", ru: "берег", cs: "břeh", en: "riverbank, shore" },
  "观": { pinyin: "guān", ru: "наблюдать", cs: "pozorovat", en: "to observe" },
  "笑": { pinyin: "xiào", ru: "улыбка, смеяться", cs: "úsměv, smát se", en: "smile, laugh" },
  "里": { pinyin: "lǐ", ru: "внутри", cs: "uvnitř", en: "inside" },
  "藏": { pinyin: "cáng", ru: "прятать", cs: "skrývat", en: "to hide" },
  "李": { pinyin: "lǐ", ru: "слива", cs: "švestka", en: "plum" },
  "代": { pinyin: "dài", ru: "заменять", cs: "nahradit", en: "to replace" },
  "桃": { pinyin: "táo", ru: "персик", cs: "broskev", en: "peach" },
  "僵": { pinyin: "jiāng", ru: "застыть, погибнуть", cs: "ztuhnout, odumřít", en: "to stiffen, die" },
  "顺": { pinyin: "shùn", ru: "по пути, удобно", cs: "po cestě, pohodlně", en: "along the way, smoothly" },
  "手": { pinyin: "shǒu", ru: "рука", cs: "ruka", en: "hand" },
  "牵": { pinyin: "qiān", ru: "вести, тянуть", cs: "vést, táhnout", en: "to lead, pull" },
  "羊": { pinyin: "yáng", ru: "овца", cs: "ovce", en: "sheep" },
  "草": { pinyin: "cǎo", ru: "трава", cs: "tráva", en: "grass" },
  "惊": { pinyin: "jīng", ru: "пугать, тревожить", cs: "vylekat", en: "to startle" },
  "蛇": { pinyin: "shé", ru: "змея", cs: "had", en: "snake" },
  "尸": { pinyin: "shī", ru: "тело, труп", cs: "tělo, mrtvola", en: "corpse, body" },
  "还": { pinyin: "huán", ru: "возвращать", cs: "vrátit", en: "to return" },
  "魂": { pinyin: "hún", ru: "душа", cs: "duše", en: "soul" },
  "调": { pinyin: "diào", ru: "перемещать, выманивать", cs: "přesunout, vylákat", en: "to move, lure" },
  "虎": { pinyin: "hǔ", ru: "тигр", cs: "tygr", en: "tiger" },
  "离": { pinyin: "lí", ru: "покидать", cs: "opustit", en: "to leave" },
  "山": { pinyin: "shān", ru: "гора", cs: "hora", en: "mountain" },
  "欲": { pinyin: "yù", ru: "желать, хотеть", cs: "chtít", en: "to want" },
  "擒": { pinyin: "qín", ru: "схватить, поймать", cs: "chytit", en: "to capture" },
  "故": { pinyin: "gù", ru: "намеренно", cs: "záměrně", en: "deliberately" },
  "纵": { pinyin: "zòng", ru: "отпускать", cs: "pustit", en: "to release" },
  "抛": { pinyin: "pāo", ru: "бросать", cs: "hodit", en: "to throw" },
  "砖": { pinyin: "zhuān", ru: "кирпич", cs: "cihla", en: "brick" },
  "引": { pinyin: "yǐn", ru: "привлекать, вести", cs: "přilákat, vést", en: "to attract, lead" },
  "玉": { pinyin: "yù", ru: "нефрит, драгоценность", cs: "nefrit, drahocennost", en: "jade, treasure" },
  "贼": { pinyin: "zéi", ru: "вор, разбойник", cs: "zloděj", en: "thief, bandit" },
  "王": { pinyin: "wáng", ru: "царь, глава", cs: "král, vůdce", en: "king, leader" },
  "釜": { pinyin: "fǔ", ru: "котёл", cs: "kotel", en: "cauldron, pot" },
  "底": { pinyin: "dǐ", ru: "дно", cs: "dno", en: "bottom" },
  "抽": { pinyin: "chōu", ru: "вытащить", cs: "vytáhnout", en: "to pull out" },
  "薪": { pinyin: "xīn", ru: "дрова", cs: "palivo, dříví", en: "firewood" },
  "混": { pinyin: "hún", ru: "мутить, смешивать", cs: "kalit, míchat", en: "to muddy, mix" },
  "水": { pinyin: "shuǐ", ru: "вода", cs: "voda", en: "water" },
  "摸": { pinyin: "mō", ru: "нащупывать, ловить", cs: "hmatat, chytat", en: "to feel for, catch" },
  "鱼": { pinyin: "yú", ru: "рыба", cs: "ryba", en: "fish" },
  "金": { pinyin: "jīn", ru: "золото", cs: "zlato", en: "gold" },
  "蝉": { pinyin: "chán", ru: "цикада", cs: "cikáda", en: "cicada" },
  "脱": { pinyin: "tuō", ru: "снимать, сбрасывать", cs: "svléknout, shodit", en: "to shed, take off" },
  "壳": { pinyin: "qiào", ru: "оболочка", cs: "skořápka", en: "shell" },
  "关": { pinyin: "guān", ru: "закрывать", cs: "zavřít", en: "to close" },
  "门": { pinyin: "mén", ru: "дверь", cs: "dveře", en: "door" },
  "捉": { pinyin: "zhuō", ru: "поймать", cs: "chytit", en: "to catch" },
  "远": { pinyin: "yuǎn", ru: "далёкий", cs: "daleký", en: "distant" },
  "交": { pinyin: "jiāo", ru: "общаться, союз", cs: "stýkat se, spojit se", en: "to associate, ally" },
  "近": { pinyin: "jìn", ru: "близкий", cs: "blízký", en: "near" },
  "攻": { pinyin: "gōng", ru: "атаковать", cs: "útočit", en: "to attack" },
  "假": { pinyin: "jiǎ", ru: "ложный, притворный", cs: "falešný, předstíraný", en: "false, pretend" },
  "道": { pinyin: "dào", ru: "дорога, путь", cs: "cesta", en: "road, way" },
  "伐": { pinyin: "fá", ru: "нападать, карать", cs: "napadnout, trestat", en: "to attack, punish" },
  "虢": { pinyin: "Guó", ru: "Го, древнее княжество", cs: "Kuo, starověké knížectví", en: "Guo, an ancient state" },
  "偷": { pinyin: "tōu", ru: "красть", cs: "krást", en: "to steal" },
  "梁": { pinyin: "liáng", ru: "балка", cs: "trám", en: "beam" },
  "换": { pinyin: "huàn", ru: "менять", cs: "vyměnit", en: "to replace" },
  "柱": { pinyin: "zhù", ru: "столб", cs: "sloup", en: "pillar" },
  "指": { pinyin: "zhǐ", ru: "указывать", cs: "ukázat", en: "to point" },
  "桑": { pinyin: "sāng", ru: "тутовник", cs: "moruše", en: "mulberry" },
  "骂": { pinyin: "mà", ru: "ругать", cs: "nadávat", en: "to scold" },
  "槐": { pinyin: "huái", ru: "акация/софора", cs: "akát/jerlín", en: "locust tree" },
  "痴": { pinyin: "chī", ru: "глупый, простоватый", cs: "hloupý", en: "foolish" },
  "不": { pinyin: "bù", ru: "не", cs: "ne", en: "not" },
  "癫": { pinyin: "diān", ru: "безумный", cs: "šílený", en: "mad, insane" },
  "上": { pinyin: "shàng", ru: "подниматься, верх", cs: "nahoru", en: "up, above" },
  "屋": { pinyin: "wū", ru: "дом, крыша", cs: "dům, střecha", en: "house, roof" },
  "梯": { pinyin: "tī", ru: "лестница", cs: "žebřík", en: "ladder" },
  "树": { pinyin: "shù", ru: "дерево", cs: "strom", en: "tree" },
  "开": { pinyin: "kāi", ru: "открывать, распускаться", cs: "otevřít, rozkvést", en: "to open, bloom" },
  "花": { pinyin: "huā", ru: "цветок", cs: "květ", en: "flower" },
  "反": { pinyin: "fǎn", ru: "обратить, перевернуть", cs: "obrátit", en: "to reverse" },
  "客": { pinyin: "kè", ru: "гость", cs: "host", en: "guest" },
  "为": { pinyin: "wéi", ru: "становиться, быть", cs: "stát se, být", en: "to become, be" },
  "主": { pinyin: "zhǔ", ru: "хозяин, главный", cs: "pán, hlavní", en: "host, master" },
  "美": { pinyin: "měi", ru: "красивый", cs: "krásný", en: "beautiful" },
  "计": { pinyin: "jì", ru: "план, стратагема", cs: "plán, strategie", en: "plan, stratagem" },
  "空": { pinyin: "kōng", ru: "пустой", cs: "prázdný", en: "empty" },
  "城": { pinyin: "chéng", ru: "город, крепость", cs: "město, pevnost", en: "city, fortress" },
  "间": { pinyin: "jiàn", ru: "шпион, разведка", cs: "špion, špionáž", en: "spy, espionage" },
  "苦": { pinyin: "kǔ", ru: "горький, страдание", cs: "hořký, utrpení", en: "bitter, suffering" },
  "肉": { pinyin: "ròu", ru: "плоть, тело", cs: "maso, tělo", en: "flesh, body" },
  "连": { pinyin: "lián", ru: "соединять", cs: "spojit", en: "to connect" },
  "环": { pinyin: "huán", ru: "кольцо, цепь", cs: "kruh, řetěz", en: "ring, chain" },
  "走": { pinyin: "zǒu", ru: "уходить", cs: "odejít", en: "to leave, retreat" }
};

const stratagemExamples = [
  { ru: ["На работе: спокойно готовить новый проект как обычную задачу, чтобы конкуренты не поняли масштаба.", "В жизни: собираться к переезду без громких объявлений, пока всё не готово."], cs: ["V práci: připravovat nový projekt jako běžný úkol, aby konkurence nepochopila jeho rozsah.", "V životě: chystat stěhování bez velkých oznámení, dokud není vše připravené."], en: ["At work: prepare a new project as if it were routine, so competitors do not notice its scale.", "In life: prepare a move quietly until everything is ready."] },
  { ru: ["На работе: вместо спора с начальником решить проблему через отдел, от которого зависит решение.", "В жизни: если человек давит напрямую, переключить разговор на его реальную слабую точку."], cs: ["V práci: místo sporu se šéfem řešit problém přes oddělení, na kterém závisí rozhodnutí.", "V životě: když někdo tlačí přímo, převést rozhovor na jeho skutečně slabé místo."], en: ["At work: instead of arguing with a boss, solve the issue through the department the decision depends on.", "In life: when someone pressures you directly, shift attention to their real weak point."] },
  { ru: ["На работе: дать фактам и отзывам клиентов говорить вместо личной критики.", "В жизни: не спорить самой, а попросить нейтрального человека объяснить ситуацию."], cs: ["V práci: nechat fakta a zpětnou vazbu klientů mluvit místo osobní kritiky.", "V životě: nehádát se sama, ale požádat neutrální osobu, aby situaci vysvětlila."], en: ["At work: let facts and customer feedback speak instead of personal criticism.", "In life: avoid arguing yourself and let a neutral person explain the situation."] },
  { ru: ["На работе: не отвечать на провокацию сразу, а дождаться, пока другая сторона устанет спорить.", "В жизни: взять паузу в конфликте и вернуться к разговору спокойнее."], cs: ["V práci: nereagovat na provokaci hned a počkat, až se druhá strana unaví sporem.", "V životě: dát si v konfliktu pauzu a vrátit se ke klidnějšímu rozhovoru."], en: ["At work: do not react to provocation immediately; wait until the other side tires itself out.", "In life: take a pause in a conflict and return calmer."] },
  { ru: ["На работе: когда конкурент ошибся с запуском, быстро предложить клиентам более понятную альтернативу.", "В жизни: во время общей путаницы спокойно занять свободное место или возможность."], cs: ["V práci: když konkurent pokazí spuštění, rychle nabídnout klientům jasnější alternativu.", "V životě: během zmatku klidně využít volné místo nebo příležitost."], en: ["At work: when a competitor mishandles a launch, quickly offer customers a clearer alternative.", "In life: during confusion, calmly take an available opportunity."] },
  { ru: ["На работе: обсуждать один продукт публично, а готовить главный запуск в другой категории.", "В жизни: говорить о второстепенном плане, пока главный сюрприз готовится отдельно."], cs: ["V práci: veřejně mluvit o jednom produktu, ale hlavní spuštění chystat v jiné kategorii.", "V životě: mluvit o vedlejším plánu, zatímco hlavní překvapení se připravuje zvlášť."], en: ["At work: publicly discuss one product while preparing the main launch in another category.", "In life: talk about a minor plan while the real surprise is being prepared elsewhere."] },
  { ru: ["На работе: сделать пробный макет, чтобы команда начала обсуждать уже конкретную идею.", "В жизни: сначала создать маленькую традицию, а потом она станет настоящей привычкой семьи."], cs: ["V práci: udělat zkušební návrh, aby tým začal řešit konkrétní myšlenku.", "V životě: nejprve vytvořit malou tradici a potom se z ní stane skutečný rodinný zvyk."], en: ["At work: create a rough prototype so the team starts discussing a concrete idea.", "In life: start a small tradition until it becomes a real family habit."] },
  { ru: ["На работе: официально улучшать старую услугу, а параллельно тихо строить новую платформу.", "В жизни: говорить, что идёшь обычным маршрутом, но выбрать более спокойный путь."], cs: ["V práci: oficiálně zlepšovat starou službu a potichu stavět novou platformu.", "V životě: říct, že jdeš běžnou cestou, ale zvolit klidnější trasu."], en: ["At work: officially improve an old service while quietly building a new platform.", "In life: say you are taking the usual route, but choose a calmer path."] },
  { ru: ["На работе: не вмешиваться в спор двух отделов, пока не станет ясно, где настоящее решение.", "В жизни: не лезть сразу в чужую ссору, если люди сами должны остыть."], cs: ["V práci: nezasahovat do sporu dvou oddělení, dokud není jasné skutečné řešení.", "V životě: hned nevstupovat do cizí hádky, když lidé potřebují sami vychladnout."], en: ["At work: do not jump into a dispute between departments until the real solution becomes clear.", "In life: do not rush into someone else's quarrel if people need to cool down."] },
  { ru: ["На работе: партнёр улыбается и соглашается, но в договоре оставляет жёсткие условия.", "В жизни: человек говорит мягко, но постепенно подводит тебя к неудобному решению."], cs: ["V práci: partner se usmívá a souhlasí, ale ve smlouvě nechá tvrdé podmínky.", "V životě: člověk mluví jemně, ale postupně tě vede k nevýhodnému rozhodnutí."], en: ["At work: a partner smiles and agrees, but leaves harsh terms in the contract.", "In life: someone speaks gently while slowly pushing you toward an uncomfortable decision."] },
  { ru: ["На работе: закрыть маленький убыточный проект, чтобы спасти главный продукт.", "В жизни: отказаться от одной покупки, чтобы сохранить деньги на важную цель."], cs: ["V práci: zavřít malý ztrátový projekt, aby se zachránil hlavní produkt.", "V životě: vzdát se jednoho nákupu, aby zůstaly peníze na důležitý cíl."], en: ["At work: close a small failing project to save the main product.", "In life: skip one purchase to keep money for an important goal."] },
  { ru: ["На работе: во время встречи заметить свободный контакт и сразу договориться о звонке.", "В жизни: по дороге по делам купить то, что давно было нужно."], cs: ["V práci: během schůzky si všimnout volného kontaktu a hned domluvit hovor.", "V životě: cestou za povinnostmi koupit něco, co bylo dlouho potřeba."], en: ["At work: notice a useful contact during a meeting and immediately schedule a call.", "In life: while running errands, pick up something you needed anyway."] },
  { ru: ["На работе: задать тестовый вопрос, чтобы увидеть, кто сливает информацию.", "В жизни: слегка изменить историю и посмотреть, откуда она вернётся."], cs: ["V práci: položit testovací otázku a zjistit, kdo vynáší informace.", "V životě: trochu změnit příběh a sledovat, odkud se vrátí."], en: ["At work: ask a test question to see who leaks information.", "In life: slightly change a story and see where it comes back from."] },
  { ru: ["На работе: оживить старый блог компании новым форматом уроков.", "В жизни: взять старую тетрадь и превратить её в новый учебный дневник."], cs: ["V práci: oživit starý firemní blog novým formátem lekcí.", "V životě: vzít starý sešit a změnit ho na nový studijní deník."], en: ["At work: revive an old company blog with a new lesson format.", "In life: turn an old notebook into a new learning diary."] },
  { ru: ["На работе: перенести переговоры из офиса конкурента на нейтральную площадку.", "В жизни: не спорить на чужой территории, а предложить спокойное место для разговора."], cs: ["V práci: přesunout jednání z kanceláře konkurenta na neutrální půdu.", "V životě: nehádat se na cizím území a navrhnout klidné místo k rozhovoru."], en: ["At work: move negotiations from the competitor's office to neutral ground.", "In life: avoid arguing on someone else's territory and suggest a calmer place."] },
  { ru: ["На работе: дать клиенту время подумать, чтобы он сам сформулировал свои сомнения.", "В жизни: не удерживать человека силой, а посмотреть, возвращается ли он сам."], cs: ["V práci: dát klientovi čas, aby sám pojmenoval své pochybnosti.", "V životě: nedržet člověka silou a sledovat, jestli se vrátí sám."], en: ["At work: give a client time so they reveal their own doubts.", "In life: do not hold someone by force; see whether they return on their own."] },
  { ru: ["На работе: показать простой черновик, чтобы получить от эксперта сильную идею.", "В жизни: задать простой вопрос, чтобы человек объяснил глубокую вещь понятнее."], cs: ["V práci: ukázat jednoduchý návrh, aby expert přinesl silnější nápad.", "V životě: položit jednoduchou otázku, aby člověk vysvětlil hlubokou věc srozumitelněji."], en: ["At work: show a simple draft to draw out a stronger idea from an expert.", "In life: ask a simple question so someone explains a deep topic clearly."] },
  { ru: ["На работе: решать не мелкие жалобы, а причину, почему система постоянно ломается.", "В жизни: не спорить о симптомах, а понять главную причину конфликта."], cs: ["V práci: neřešit drobné stížnosti, ale příčinu, proč se systém pořád kazí.", "V životě: nehádát se o příznaky, ale pochopit hlavní příčinu konfliktu."], en: ["At work: fix the root cause instead of small repeated complaints.", "In life: do not argue over symptoms; find the real cause of the conflict."] },
  { ru: ["На работе: вместо тушения скандалов изменить правило, которое их создаёт.", "В жизни: не бороться с постоянной усталостью, а убрать источник перегруза."], cs: ["V práci: místo hašení skandálů změnit pravidlo, které je vytváří.", "V životě: nebojovat s neustálou únavou, ale odstranit zdroj přetížení."], en: ["At work: instead of managing scandals, change the rule that creates them.", "In life: do not fight constant tiredness; remove the source of overload."] },
  { ru: ["На работе: во время реорганизации быстро занять полезную нишу.", "В жизни: когда планы меняются, найти в хаосе удобное новое решение."], cs: ["V práci: během reorganizace rychle obsadit užitečnou mezeru.", "V životě: když se plány mění, najít v chaosu nové praktické řešení."], en: ["At work: during a reorganization, quickly occupy a useful niche.", "In life: when plans change, find a practical new solution in the chaos."] },
  { ru: ["На работе: оставить старый email-адрес активным, пока команда уже перешла на новую систему.", "В жизни: уйти из токсичной переписки, оставив только формальный автоответ."], cs: ["V práci: nechat starý e-mail aktivní, zatímco tým už přešel na nový systém.", "V životě: odejít z toxické komunikace a nechat jen formální automatickou odpověď."], en: ["At work: leave an old email active while the team has already moved to a new system.", "In life: step away from toxic communication and leave only a formal auto-reply."] },
  { ru: ["На работе: когда проблема уже доказана, быстро закрыть все пути для её повторения.", "В жизни: если мошенник пойман, сразу поменять пароли и доступы."], cs: ["V práci: když je problém prokázaný, rychle zavřít všechny cesty k jeho opakování.", "V životě: když je podvodník odhalen, hned změnit hesla a přístupy."], en: ["At work: once a problem is proven, quickly close every path for it to repeat.", "In life: if a scammer is exposed, immediately change passwords and access."] },
  { ru: ["На работе: найти партнёра в другой стране, чтобы усилить позицию на местном рынке.", "В жизни: получить поддержку у далёкого знакомого, когда рядом давят."], cs: ["V práci: najít partnera v jiné zemi, aby se posílila pozice na místním trhu.", "V životě: získat podporu od vzdáleného známého, když okolí tlačí."], en: ["At work: find a partner abroad to strengthen your local position.", "In life: get support from a distant contact when nearby people pressure you."] },
  { ru: ["На работе: попросить доступ к данным для отчёта, а увидеть более глубокую проблему процесса.", "В жизни: попросить помощи с одним делом и понять, как решить соседнюю задачу."], cs: ["V práci: požádat o data pro report a objevit hlubší problém procesu.", "V životě: požádat o pomoc s jednou věcí a pochopit, jak vyřešit sousední úkol."], en: ["At work: request data for a report and discover a deeper process problem.", "In life: ask for help with one task and see how to solve a related one."] },
  { ru: ["На работе: тихо заменить слабый инструмент, чтобы команда продолжала работать без шока.", "В жизни: постепенно сменить плохую привычку на полезную, не объявляя революцию."], cs: ["V práci: potichu vyměnit slabý nástroj, aby tým pokračoval bez šoku.", "V životě: postupně změnit špatný zvyk za užitečný bez velkých prohlášení."], en: ["At work: quietly replace a weak tool so the team keeps working without shock.", "In life: gradually replace a bad habit with a useful one without dramatic announcements."] },
  { ru: ["На работе: говорить о типичной ошибке отдела, чтобы конкретный человек понял намёк.", "В жизни: обсуждать похожую ситуацию, не называя человека напрямую."], cs: ["V práci: mluvit o typické chybě oddělení, aby konkrétní člověk pochopil narážku.", "V životě: mluvit o podobné situaci bez přímého jmenování člověka."], en: ["At work: discuss a typical team mistake so a specific person understands the hint.", "In life: talk about a similar situation without naming the person directly."] },
  { ru: ["На работе: не показывать все знания на первой встрече, чтобы понять намерения партнёра.", "В жизни: выглядеть спокойнее и проще, пока не станет ясно, кому можно доверять."], cs: ["V práci: neukazovat všechny znalosti na první schůzce a zjistit záměry partnera.", "V životě: působit klidněji a jednodušeji, dokud není jasné, komu věřit."], en: ["At work: do not show all your knowledge in the first meeting; learn the partner's intentions.", "In life: appear calmer and simpler until you know whom to trust."] },
  { ru: ["На работе: дать человеку самому предложить срок, а потом зафиксировать его обязательство.", "В жизни: человек сам пообещал помочь, и теперь ему сложнее отступить."], cs: ["V práci: nechat člověka navrhnout termín a pak jeho závazek zapsat.", "V životě: člověk sám slíbil pomoc a teď se mu hůř couvá."], en: ["At work: let someone propose a deadline, then record their commitment.", "In life: someone promises help voluntarily, making it harder to back out."] },
  { ru: ["На работе: красиво оформить маленький проект, чтобы он выглядел солиднее для инвесторов.", "В жизни: подать простую идею аккуратно, чтобы люди увидели её ценность."], cs: ["V práci: pěkně zabalit malý projekt, aby působil silněji na investory.", "V životě: podat jednoduchou myšlenku upraveně, aby lidé viděli její hodnotu."], en: ["At work: present a small project beautifully so it looks stronger to investors.", "In life: package a simple idea well so people see its value."] },
  { ru: ["На работе: сначала прийти как помощник, а потом стать человеком, который ведёт процесс.", "В жизни: начать как гость в группе и постепенно взять организацию на себя."], cs: ["V práci: přijít nejprve jako pomocník a postupně se stát člověkem, který vede proces.", "V životě: začít jako host ve skupině a postupně převzít organizaci."], en: ["At work: enter as a helper and gradually become the person running the process.", "In life: start as a guest in a group and slowly take over organization."] },
  { ru: ["На работе: бренд использует привлекательный образ, чтобы смягчить жёсткое предложение.", "В жизни: человек пользуется обаянием, чтобы получить согласие."], cs: ["V práci: značka používá atraktivní obraz, aby změkčila tvrdou nabídku.", "V životě: člověk využívá šarm, aby získal souhlas."], en: ["At work: a brand uses an attractive image to soften a hard offer.", "In life: someone uses charm to gain agreement."] },
  { ru: ["На работе: стартап выглядит уверенно на презентации, хотя ресурсов мало.", "В жизни: сохранять спокойствие, когда внутри страшно, чтобы не усиливать панику."], cs: ["V práci: startup působí na prezentaci sebejistě, i když má málo zdrojů.", "V životě: zachovat klid, když je uvnitř strach, aby se nezvětšila panika."], en: ["At work: a startup presents confidently even with few resources.", "In life: stay calm when scared inside so panic does not grow."] },
  { ru: ["На работе: использовать слух конкурента, чтобы понять, кто его распространяет.", "В жизни: если кто-то передаёт сплетни, дать нейтральную информацию и посмотреть путь."], cs: ["V práci: využít fámu konkurenta a zjistit, kdo ji šíří.", "V životě: když někdo nosí drby, dát neutrální informaci a sledovat její cestu."], en: ["At work: use a competitor's rumor to discover who spreads it.", "In life: give neutral information to a gossip and watch where it goes."] },
  { ru: ["На работе: признать маленькую ошибку, чтобы восстановить доверие перед большим разговором.", "В жизни: честно взять на себя неудобную часть, чтобы другой человек поверил серьёзности."], cs: ["V práci: přiznat malou chybu, aby se obnovila důvěra před větším rozhovorem.", "V životě: férově vzít nepříjemnou část na sebe, aby druhý uvěřil vážnosti."], en: ["At work: admit a small mistake to rebuild trust before a bigger discussion.", "In life: accept an uncomfortable part honestly so the other person trusts your seriousness."] },
  { ru: ["На работе: связать скидку, обучение и поддержку так, чтобы клиенту было легче согласиться.", "В жизни: один маленький шаг ведёт к следующему: расписание, привычка, результат."], cs: ["V práci: propojit slevu, školení a podporu tak, aby klient snáze souhlasil.", "V životě: jeden malý krok vede k dalšímu: rozvrh, zvyk, výsledek."], en: ["At work: combine discount, training, and support so the client can agree more easily.", "In life: one small step leads to the next: schedule, habit, result."] },
  { ru: ["На работе: выйти из проекта, который стабильно сжигает деньги и силы.", "В жизни: прекратить спор, где уже понятно, что мира сегодня не будет."], cs: ["V práci: odejít z projektu, který trvale pálí peníze a síly.", "V životě: ukončit spor, kde je jasné, že dnes smír nebude."], en: ["At work: leave a project that keeps burning money and energy.", "In life: end an argument when it is clear peace will not happen today."] }
];

const ichingAnswers = [
  {
    number: 1,
    symbol: "䷀",
    name: "Tvořivost",
    meaning: "Silný začátek, energie a jasný směr.",
    reflection: "Možná není čas všechno vysvětlovat. Stačí udělat první konkrétní krok."
  },
  {
    number: 2,
    symbol: "䷁",
    name: "Přijímání",
    meaning: "Trpělivost, prostor a schopnost nést věci dál.",
    reflection: "Někdy není slabost čekat. Někdy je to způsob, jak neztratit půdu pod nohama."
  },
  {
    number: 3,
    symbol: "䷂",
    name: "Začáteční obtíž",
    meaning: "Nový začátek, který je trochu zamotaný.",
    reflection: "Když se věci pletou hned na začátku, nemusí to být špatné znamení. Možná se jen rodí tvar."
  },
  {
    number: 11,
    symbol: "䷊",
    name: "Mír",
    meaning: "Soulad, otevřená cesta a klidnější proud.",
    reflection: "To, co jde lehce, nemusí být podezřelé. Někdy se dveře prostě otevřou."
  },
  {
    number: 24,
    symbol: "䷗",
    name: "Návrat",
    meaning: "Návrat k sobě, nový cyklus a malý restart.",
    reflection: "Možná není potřeba začínat úplně od nuly. Stačí se vrátit k tomu, co bylo pravdivé."
  },
  {
    number: 29,
    symbol: "䷜",
    name: "Voda",
    meaning: "Nejistota, hloubka a opatrný pohyb.",
    reflection: "Když je kolem moc nejasna, pomáhá jít pomalu a držet se jedné pevné věci."
  },
  {
    number: 37,
    symbol: "䷤",
    name: "Rodina",
    meaning: "Vztahy, blízkost a každodenní řád.",
    reflection: "Velké otázky se někdy řeší malými gesty doma, u stolu nebo v obyčejném rozhovoru."
  },
  {
    number: 64,
    symbol: "䷿",
    name: "Ještě před dokončením",
    meaning: "Věc není hotová, ale už se blíží ke změně.",
    reflection: "Nespěchejte s tečkou. Možná jste právě v poslední větě před novou kapitolou."
  }
];

function t(key) {
  return interfaceTexts[interfaceLanguage][key] || interfaceTexts.cs[key] || key;
}

function updateThemeButtonText() {
  if (!themeButton) {
    return;
  }

  if (document.body.classList.contains("dark")) {
    themeButton.textContent = t("lightTheme");
  } else {
    themeButton.textContent = t("darkTheme");
  }
}

function updateLessonToggleTexts() {
  if (repeatFragmentButton) {
    repeatFragmentButton.textContent = lessonRepeatCurrentFragment ? t("repeatOn") : t("repeatOff");
  }

  if (floatingRepeatFragmentButton) {
    floatingRepeatFragmentButton.textContent = lessonRepeatCurrentFragment ? t("repeatOn") : t("repeatOff");
    floatingRepeatFragmentButton.classList.toggle("active", lessonRepeatCurrentFragment);
  }

  if (!lessonCard || !togglePinyinButton || !toggleTranslationButton || !toggleBreakdownButton || !translationBlock || !breakdownBlock) {
    return;
  }

  if (lessonCard.classList.contains("show-pinyin")) {
    togglePinyinButton.textContent = t("hidePinyin");
  } else {
    togglePinyinButton.textContent = t("showPinyin");
  }

  if (translationBlock.classList.contains("hidden")) {
    toggleTranslationButton.textContent = t("showTranslation");
  } else {
    toggleTranslationButton.textContent = t("hideTranslation");
  }

  if (breakdownBlock.classList.contains("hidden")) {
    toggleBreakdownButton.textContent = t("showBreakdown");
  } else {
    toggleBreakdownButton.textContent = t("hideBreakdown");
  }
}

function applyInterfaceLanguage() {
  const textElements = document.querySelectorAll("[data-i18n]");
  const placeholderElements = document.querySelectorAll("[data-i18n-placeholder]");
  const titleElements = document.querySelectorAll("[data-i18n-title]");

  document.documentElement.lang = interfaceLanguage;
  document.title = t("documentTitle");

  textElements.forEach(function(element) {
    element.textContent = t(element.dataset.i18n);
  });

  placeholderElements.forEach(function(element) {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });

  titleElements.forEach(function(element) {
    element.title = t(element.dataset.i18nTitle);
  });

  updateThemeButtonText();
  updateLessonToggleTexts();
}

function localizeStratagem(stratagem, field) {
  return stratagem[interfaceLanguage + field] || stratagem["ru" + field] || "";
}

function localizeStratagemExample(exampleSet) {
  return exampleSet[interfaceLanguage] || exampleSet.ru;
}

function renderStratagemCharacters(stratagem) {
  return Array.from(stratagem.zh).map(function(character) {
    const info = stratagemCharacterMeanings[character] || {
      pinyin: "",
      ru: "значение будет добавлено позже",
      cs: "význam bude doplněn později",
      en: "meaning will be added later"
    };
    const meaning = info[interfaceLanguage] || info.ru;

    return (
      "<div class=\"stratagem-character\">" +
        "<strong>" + character + "</strong>" +
        "<span>" + info.pinyin + "</span>" +
        "<p>" + meaning + "</p>" +
      "</div>"
    );
  }).join("");
}

function renderStratagemExamples(index) {
  const examples = localizeStratagemExample(stratagemExamples[index]);

  return (
    "<ul class=\"stratagem-examples\">" +
      "<li><strong>" + t("workExampleLabel") + ":</strong> " + examples[0] + "</li>" +
      "<li><strong>" + t("lifeExampleLabel") + ":</strong> " + examples[1] + "</li>" +
    "</ul>"
  );
}

function renderStratagems() {
  if (!stratagemList) {
    return;
  }

  stratagemList.innerHTML = stratagems.map(function(stratagem, index) {
    return (
      "<article class=\"stratagem-card\">" +
        "<div class=\"stratagem-header\">" +
          "<span class=\"stratagem-number\">" + (index + 1) + "</span>" +
          "<div>" +
            "<h3>" + stratagem.zh + "</h3>" +
            "<p class=\"stratagem-pinyin\">" + stratagem.pinyin + "</p>" +
          "</div>" +
          "<div class=\"stratagem-actions\">" +
            "<button class=\"stratagem-listen\" data-mode=\"slow\" data-rate=\"0.1\" data-speed-label=\"" + t("listenSlowButton") + "\" data-stratagem-index=\"" + index + "\">" + t("listenSlowButton") + "</button>" +
            "<button class=\"stratagem-listen\" data-mode=\"normal\" data-rate=\"0.85\" data-speed-label=\"" + t("listenNormalButton") + "\" data-stratagem-index=\"" + index + "\">" + t("listenNormalButton") + "</button>" +
            "<button class=\"stratagem-repeat-button" + (stratagemRepeatIndex === index ? " active" : "") + "\" data-stratagem-index=\"" + index + "\">" + (stratagemRepeatIndex === index ? t("repeatStratagemOn") : t("repeatStratagemOff")) + "</button>" +
            "<button class=\"stratagem-details-button\" data-stratagem-index=\"" + index + "\">" + t("detailsButton") + "</button>" +
          "</div>" +
        "</div>" +
        "<p><strong>" + t("literalLabel") + ":</strong> " + localizeStratagem(stratagem, "") + "</p>" +
        "<p><strong>" + t("explanationLabel") + ":</strong> " + localizeStratagem(stratagem, "Explain") + "</p>" +
        "<div class=\"stratagem-details hidden\" id=\"stratagemDetails" + index + "\">" +
          "<h4>" + t("charactersLabel") + "</h4>" +
          "<div class=\"stratagem-characters\">" + renderStratagemCharacters(stratagem) + "</div>" +
          "<h4>" + t("examplesLabel") + "</h4>" +
          renderStratagemExamples(index) +
        "</div>" +
      "</article>"
    );
  }).join("");
}

function speakStratagemCharacters(index, characters, position, runId) {
  if (runId !== stratagemSpeechRunId) {
    return;
  }

  if (position >= characters.length) {
    if (stratagemRepeatIndex === index) {
      setTimeout(function() {
        speakStratagem(index, stratagemRepeatRate, stratagemRepeatSpeedLabel, stratagemRepeatMode);
      }, 700);
    }

    return;
  }

  const utterance = new SpeechSynthesisUtterance(characters[position]);
  utterance.lang = "zh-CN";
  utterance.rate = 0.1;
  utterance.onend = function() {
    setTimeout(function() {
      speakStratagemCharacters(index, characters, position + 1, runId);
    }, 550);
  };

  window.speechSynthesis.speak(utterance);
}

function speakStratagem(index, rate, speedLabel, mode) {
  const stratagem = stratagems[index];

  if (!stratagem) {
    return;
  }

  if (!("speechSynthesis" in window)) {
    stratagemMessage.textContent = t("unsupportedSpeech");
    return;
  }

  stratagemSpeechRunId = stratagemSpeechRunId + 1;
  window.speechSynthesis.cancel();

  stratagemMessage.textContent = t("stratagemPlaying")
    .replace("{title}", stratagem.zh)
    .replace("{speed}", speedLabel);

  if (mode === "slow") {
    speakStratagemCharacters(index, Array.from(stratagem.zh), 0, stratagemSpeechRunId);
    return;
  }

  const utterance = new SpeechSynthesisUtterance(stratagem.zh);
  utterance.lang = "zh-CN";
  utterance.rate = rate;
  utterance.onend = function() {
    if (stratagemRepeatIndex === index) {
      speakStratagem(index, stratagemRepeatRate, stratagemRepeatSpeedLabel, stratagemRepeatMode);
    }
  };

  window.speechSynthesis.speak(utterance);
}

function localizeJoke(joke, field) {
  return joke[interfaceLanguage + field] || joke["ru" + field] || "";
}

function renderJokeText(text) {
  return text.split("\n").map(function(line) {
    return "<span>" + line + "</span>";
  }).join("<br>");
}

function renderJokes() {
  if (!jokeList) {
    return;
  }

  jokeList.innerHTML = jokes.map(function(joke, index) {
    return (
      "<article class=\"joke-card\">" +
        "<div class=\"joke-header\">" +
          "<span class=\"joke-number\">" + (index + 1) + "</span>" +
          "<div>" +
            "<h3>" + renderJokeText(joke.zh) + "</h3>" +
            "<p class=\"joke-pinyin\">" + renderJokeText(joke.pinyin) + "</p>" +
          "</div>" +
          "<div class=\"joke-actions\">" +
            "<button class=\"joke-listen\" data-rate=\"0.55\" data-speed-label=\"" + t("listenSlowButton") + "\" data-joke-index=\"" + index + "\">" + t("listenSlowButton") + "</button>" +
            "<button class=\"joke-listen\" data-rate=\"0.9\" data-speed-label=\"" + t("listenNormalButton") + "\" data-joke-index=\"" + index + "\">" + t("listenNormalButton") + "</button>" +
            "<button class=\"joke-repeat-button" + (jokeRepeatIndex === index ? " active" : "") + "\" data-joke-index=\"" + index + "\">" + (jokeRepeatIndex === index ? t("repeatStratagemOn") : t("repeatStratagemOff")) + "</button>" +
            "<button class=\"joke-details-button\" data-joke-index=\"" + index + "\">" + t("detailsButton") + "</button>" +
          "</div>" +
        "</div>" +
        "<p><strong>" + t("jokeTranslationLabel") + ":</strong> " + renderJokeText(localizeJoke(joke, "")) + "</p>" +
        "<div class=\"joke-details hidden\" id=\"jokeDetails" + index + "\">" +
          "<h4>" + t("explanationLabel") + "</h4>" +
          "<p>" + localizeJoke(joke, "Explain") + "</p>" +
        "</div>" +
      "</article>"
    );
  }).join("");
}

function speakJoke(index, rate, speedLabel) {
  const joke = jokes[index];

  if (!joke) {
    return;
  }

  if (!("speechSynthesis" in window)) {
    jokeMessage.textContent = t("unsupportedSpeech");
    return;
  }

  jokeSpeechRunId = jokeSpeechRunId + 1;
  window.speechSynthesis.cancel();

  jokeMessage.textContent = t("jokePlaying")
    .replace("{number}", index + 1)
    .replace("{speed}", speedLabel);

  const runId = jokeSpeechRunId;
  const utterance = new SpeechSynthesisUtterance(joke.zh.replace(/\n/g, " "));

  utterance.lang = "zh-CN";
  utterance.rate = rate;
  utterance.onend = function() {
    if (runId === jokeSpeechRunId && jokeRepeatIndex === index) {
      setTimeout(function() {
        speakJoke(index, jokeRepeatRate, jokeRepeatSpeedLabel);
      }, 700);
    }
  };

  window.speechSynthesis.speak(utterance);
}

function clearLessonHighlight() {
  lessonSentences.forEach(function(sentence) {
    sentence.classList.remove("is-reading");
  });
}

function getFragmentTranslation(index) {
  if (lessonExplanationLanguage === "cs") {
    return czechFragmentTranslations[index] || lessonSentences[index].dataset.translation;
  }

  if (lessonExplanationLanguage === "en") {
    return englishFragmentTranslations[index] || lessonSentences[index].dataset.translation;
  }

  return lessonSentences[index].dataset.translation;
}

function showLessonSentence(index) {
  clearLessonHighlight();

  const sentence = lessonSentences[index];

  if (!sentence) {
    if (currentTranslation) {
      currentTranslation.textContent = "";
    }
    return;
  }

  const textCard = sentence.closest(".text-card");
  if (textCard) {
    textCard.open = true;
  }

  sentence.classList.add("is-reading");

  if (currentTranslation) {
    currentTranslation.textContent = getFragmentTranslation(index);
  }

  if (breakdownBlock && !breakdownBlock.classList.contains("hidden")) {
    sentence.appendChild(breakdownBlock);
  }

  renderBreakdown(index);
}

function renderBreakdown(index) {
  if (!breakdownContent) {
    return;
  }

  const breakdownItems = lessonBreakdowns[index] || [];
  const czechItems = czechLessonBreakdowns[index] || [];
  const englishItems = englishLessonBreakdowns[index] || [];

  if (breakdownItems.length === 0) {
    breakdownContent.innerHTML = "<p>" + t("noBreakdown") + "</p>";
    return;
  }

  breakdownContent.innerHTML = breakdownItems.map(function(item, itemIndex) {
    let localizedItem = null;

    if (lessonExplanationLanguage === "cs") {
      localizedItem = czechItems[itemIndex];
    }

    if (lessonExplanationLanguage === "en") {
      localizedItem = englishItems[itemIndex];
    }

    const meaning = localizedItem ? localizedItem.meaning : item.meaning;
    const note = localizedItem ? localizedItem.note : item.note;

    return (
      "<div class=\"breakdown-item\">" +
        "<strong>" + item.text + "</strong>" +
        "<span>" + item.pinyin + "</span>" +
        "<p>" + meaning + "</p>" +
        "<small>" + note + "</small>" +
      "</div>"
    );
  }).join("");
}

function updateSentenceToggleButton(button, isActive) {
  if (!button) {
    return;
  }

  const target = button.dataset.toggleTarget;
  const labels = {
    pinyin: ["Zobrazit pinyin", "Skrýt pinyin"],
    translation: ["Zobrazit překlad", "Skrýt překlad"],
    breakdown: ["Zobrazit rozbor", "Skrýt rozbor"]
  };
  const labelPair = labels[target] || ["Zobrazit", "Skrýt"];

  button.textContent = isActive ? labelPair[1] : labelPair[0];
  button.classList.toggle("active", isActive);
}

function initializeSentenceStudyBlocks() {
  lessonSentences.forEach(function(sentence) {
    if (sentence.dataset.translation && !sentence.querySelector(".sentence-translation")) {
      const translation = document.createElement("p");
      translation.className = "sentence-translation";
      translation.textContent = sentence.dataset.translation;
      sentence.appendChild(translation);
    }

    const breakdownItems = inlineSentenceBreakdowns[sentence.dataset.text];

    if (breakdownItems && !sentence.querySelector(".sentence-breakdown-inline")) {
      const breakdown = document.createElement("div");
      breakdown.className = "sentence-breakdown-inline";

      const title = document.createElement("strong");
      title.textContent = "Rozbor";
      breakdown.appendChild(title);

      const list = document.createElement("ul");
      breakdownItems.forEach(function(item) {
        const listItem = document.createElement("li");
        listItem.textContent = item;
        list.appendChild(listItem);
      });
      breakdown.appendChild(list);

      sentence.appendChild(breakdown);
    }
  });
}

initializeSentenceStudyBlocks();

sentenceToggleButtons.forEach(function(button) {
  button.addEventListener("click", function() {
    const textCard = button.closest(".text-card");
    const target = button.dataset.toggleTarget;

    if (!textCard || !target) {
      return;
    }

    const className = "show-" + target;
    textCard.classList.toggle(className);
    updateSentenceToggleButton(button, textCard.classList.contains(className));
  });
});

function getCardSentences(textCard) {
  if (!textCard) {
    return [];
  }

  return Array.from(textCard.querySelectorAll(".lesson-sentence"));
}

function getSentenceGlobalIndex(sentence) {
  return Array.prototype.indexOf.call(lessonSentences, sentence);
}

function getOpenTextCards() {
  return Array.from(textCards).filter(function(textCard) {
    return textCard.open;
  });
}

function getActiveTextCard() {
  if (activeTextCard && activeTextCard.open) {
    return activeTextCard;
  }

  activeTextCard = getOpenTextCards()[0] || null;
  return activeTextCard;
}

function isCurrentSentenceInCard(textCard) {
  const currentSentence = lessonSentences[currentLessonSentenceIndex];
  return Boolean(textCard && currentSentence && textCard.contains(currentSentence));
}

function getTextCardTitle(textCard) {
  const title = textCard ? textCard.querySelector(".text-card-title") : null;
  const text = title ? title.textContent.trim() : "Texty";

  if (text.length > 34) {
    return text.slice(0, 31) + "...";
  }

  return text;
}

function setLessonPlayButtonText(text) {
  if (playLessonButton) {
    playLessonButton.textContent = text;
  }

  if (floatingPlayLessonButton) {
    floatingPlayLessonButton.textContent = text;
  }
}

function updateFloatingLessonPlayer() {
  const textCard = getActiveTextCard();

  if (!floatingLessonPlayer) {
    return;
  }

  floatingLessonPlayer.classList.toggle("is-visible", Boolean(textCard));
  document.body.classList.toggle("has-floating-lesson-player", Boolean(textCard));

  if (floatingLessonTitle) {
    floatingLessonTitle.textContent = getTextCardTitle(textCard);
  }

  if (floatingLessonStatus) {
    if (lessonIsPlaying) {
      floatingLessonStatus.textContent = "Přehrává se";
    } else if (lessonIsPaused) {
      floatingLessonStatus.textContent = "Pauza";
    } else {
      floatingLessonStatus.textContent = "Zastaveno";
    }
  }

  if (floatingSpeedSelect && String(lessonSpeechRate) !== floatingSpeedSelect.value) {
    const hasMatchingOption = Array.from(floatingSpeedSelect.options).some(function(option) {
      return option.value === String(lessonSpeechRate);
    });

    if (hasMatchingOption) {
      floatingSpeedSelect.value = String(lessonSpeechRate);
    }
  }

  updateLessonToggleTexts();
}

function setActiveTextCard(textCard, shouldMoveToFirstSentence) {
  if (!textCard) {
    activeTextCard = null;
    updateFloatingLessonPlayer();
    return;
  }

  activeTextCard = textCard;

  if (shouldMoveToFirstSentence || !isCurrentSentenceInCard(textCard)) {
    const firstSentence = getCardSentences(textCard)[0];
    const firstIndex = getSentenceGlobalIndex(firstSentence);

    if (firstIndex >= 0) {
      currentLessonSentenceIndex = firstIndex;
    }
  }

  updateFloatingLessonPlayer();
}

function finishLessonPlayback(message) {
  clearLessonHighlight();

  if (lessonMessage) {
    lessonMessage.textContent = message;
  }

  setLessonPlayButtonText("▶");
  lessonIsPlaying = false;
  lessonIsPaused = false;
  updateFloatingLessonPlayer();
}

function stopLessonPlayback(message) {
  lessonSpeechRunId = lessonSpeechRunId + 1;

  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }

  clearLessonHighlight();

  if (currentTranslation) {
    currentTranslation.textContent = "";
  }

  finishLessonPlayback(message);
}

function playActiveLesson() {
  if (!("speechSynthesis" in window)) {
    if (lessonMessage) {
      lessonMessage.textContent = t("unsupportedSpeech");
    }
    return;
  }

  const textCard = getActiveTextCard();

  if (!textCard) {
    const firstTextCard = textCards[0];

    if (firstTextCard) {
      firstTextCard.open = true;
      setActiveTextCard(firstTextCard, true);
      return playActiveLesson();
    }

    return;
  }

  setActiveTextCard(textCard, !isCurrentSentenceInCard(textCard));

  if (lessonIsPlaying) {
    window.speechSynthesis.pause();
    setLessonPlayButtonText("▶");
    lessonIsPlaying = false;
    lessonIsPaused = true;
    if (lessonMessage) {
      lessonMessage.textContent = t("pause");
    }
    updateFloatingLessonPlayer();
    return;
  }

  if (lessonIsPaused) {
    window.speechSynthesis.resume();
    setLessonPlayButtonText("⏸");
    lessonIsPlaying = true;
    lessonIsPaused = false;
    if (lessonMessage) {
      lessonMessage.textContent = t("continues");
    }
    updateFloatingLessonPlayer();
    return;
  }

  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
  lessonSpeechRunId = lessonSpeechRunId + 1;
  setLessonPlayButtonText("⏸");
  lessonIsPlaying = true;
  lessonIsPaused = false;
  if (lessonMessage) {
    lessonMessage.textContent = t("playing");
  }
  updateFloatingLessonPlayer();

  setTimeout(function() {
    speakLessonSentence(currentLessonSentenceIndex, lessonSpeechRunId);
  }, 0);
}

function moveLessonSentence(direction) {
  const textCard = getActiveTextCard();

  if (!textCard) {
    return;
  }

  const cardSentences = getCardSentences(textCard);
  const currentSentence = lessonSentences[currentLessonSentenceIndex];
  let localIndex = cardSentences.indexOf(currentSentence);
  const shouldContinue = lessonIsPlaying;

  if (localIndex < 0) {
    localIndex = 0;
  } else {
    localIndex = Math.max(0, Math.min(cardSentences.length - 1, localIndex + direction));
  }

  const targetIndex = getSentenceGlobalIndex(cardSentences[localIndex]);

  lessonSpeechRunId = lessonSpeechRunId + 1;
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
  setLessonPlayButtonText("▶");
  lessonIsPlaying = false;
  lessonIsPaused = false;
  currentLessonSentenceIndex = targetIndex;
  showLessonSentence(currentLessonSentenceIndex);

  if (lessonMessage) {
    lessonMessage.textContent = direction < 0 ? t("previousFragment") : t("nextFragment");
  }

  updateFloatingLessonPlayer();

  if (shouldContinue) {
    setLessonPlayButtonText("⏸");
    lessonIsPlaying = true;
    lessonIsPaused = false;
    if (lessonMessage) {
      lessonMessage.textContent = t("playing");
    }
    updateFloatingLessonPlayer();
    setTimeout(function() {
      speakLessonSentence(currentLessonSentenceIndex, lessonSpeechRunId);
    }, 0);
  }
}

function toggleLessonRepeat() {
  lessonRepeatCurrentFragment = !lessonRepeatCurrentFragment;

  if (lessonRepeatCurrentFragment) {
    if (repeatFragmentButton) {
      repeatFragmentButton.classList.add("active");
    }
    if (lessonMessage) {
      lessonMessage.textContent = t("repeatOnMessage");
    }
  } else {
    if (repeatFragmentButton) {
      repeatFragmentButton.classList.remove("active");
    }
    if (lessonMessage) {
      lessonMessage.textContent = t("repeatOffMessage");
    }
  }

  updateLessonToggleTexts();
  updateFloatingLessonPlayer();
}

function updateLessonSpeed(value) {
  lessonSpeechRate = Number(value);

  if (speedSelect && speedSelect.value !== String(value)) {
    speedSelect.value = String(value);
  }

  if (floatingSpeedSelect && floatingSpeedSelect.value !== String(value)) {
    const hasMatchingOption = Array.from(floatingSpeedSelect.options).some(function(option) {
      return option.value === String(value);
    });

    if (hasMatchingOption) {
      floatingSpeedSelect.value = String(value);
    }
  }

  if (lessonMessage) {
    lessonMessage.textContent = t("speedChanged");
  }

  updateFloatingLessonPlayer();
}

textCards.forEach(function(textCard) {
  textCard.addEventListener("toggle", function() {
    if (textCard.open) {
      setActiveTextCard(textCard, !isCurrentSentenceInCard(textCard));
      return;
    }

    if (activeTextCard === textCard) {
      if (lessonIsPlaying || lessonIsPaused) {
        stopLessonPlayback(t("stopped"));
      }

      setActiveTextCard(getOpenTextCards()[0] || null, true);
    } else {
      updateFloatingLessonPlayer();
    }
  });
});

setActiveTextCard(getOpenTextCards()[0] || null, false);

function speakLessonSentence(index, runId) {
  if (runId !== lessonSpeechRunId) {
    return;
  }

  const textCard = getActiveTextCard();
  const cardSentences = getCardSentences(textCard);
  const currentSentence = lessonSentences[index];
  const localIndex = cardSentences.indexOf(currentSentence);

  if (!textCard || localIndex < 0) {
    finishLessonPlayback(t("finished"));
    return;
  }

  clearLessonHighlight();

  const utterance = new SpeechSynthesisUtterance(currentSentence.dataset.text);

  currentLessonSentenceIndex = index;
  showLessonSentence(index);
  updateFloatingLessonPlayer();
  utterance.lang = "zh-CN";
  utterance.rate = lessonSpeechRate;
  utterance.onend = function() {
    if (runId !== lessonSpeechRunId) {
      return;
    }

    if (lessonRepeatCurrentFragment) {
      speakLessonSentence(index, runId);
    } else {
      const nextSentence = cardSentences[localIndex + 1];

      if (!nextSentence) {
        finishLessonPlayback(t("finished"));
        return;
      }

      speakLessonSentence(getSentenceGlobalIndex(nextSentence), runId);
    }
  };

  window.speechSynthesis.speak(utterance);
}

if (lessonCard) {
  lessonSentences.forEach(function(sentence, index) {
    sentence.addEventListener("click", function() {
      const shouldContinuePlaying = lessonIsPlaying;

      setActiveTextCard(sentence.closest(".text-card"), false);
      lessonSpeechRunId = lessonSpeechRunId + 1;
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      setLessonPlayButtonText("▶");
      lessonIsPlaying = false;
      lessonIsPaused = false;
      currentLessonSentenceIndex = index;
      showLessonSentence(currentLessonSentenceIndex);
      if (lessonMessage) {
        lessonMessage.textContent = t("fragmentSelected");
      }
      updateFloatingLessonPlayer();

      if (shouldContinuePlaying) {
        setLessonPlayButtonText("⏸");
        lessonIsPlaying = true;
        lessonIsPaused = false;
        if (lessonMessage) {
          lessonMessage.textContent = t("playing");
        }
        updateFloatingLessonPlayer();
        setTimeout(function() {
          speakLessonSentence(currentLessonSentenceIndex, lessonSpeechRunId);
        }, 0);
      }
    });
  });
}

if (playLessonButton) {
  playLessonButton.addEventListener("click", function() {
    playActiveLesson();
  });
}

if (floatingPlayLessonButton) {
  floatingPlayLessonButton.addEventListener("click", function() {
    playActiveLesson();
  });
}

if (previousSentenceButton) {
  previousSentenceButton.addEventListener("click", function() {
  moveLessonSentence(-1);
  });
}

if (nextSentenceButton) {
  nextSentenceButton.addEventListener("click", function() {
  moveLessonSentence(1);
  });
}

if (stopLessonButton) {
  stopLessonButton.addEventListener("click", function() {
  stopLessonPlayback(t("stopped"));
  });
}

if (floatingStopLessonButton) {
  floatingStopLessonButton.addEventListener("click", function() {
    stopLessonPlayback(t("stopped"));
  });
}

if (speedSelect) {
  speedSelect.addEventListener("change", function() {
    updateLessonSpeed(speedSelect.value);
  });
}

if (floatingSpeedSelect) {
  floatingSpeedSelect.addEventListener("change", function() {
    updateLessonSpeed(floatingSpeedSelect.value);
  });
}

if (explanationLanguageSelect) {
  explanationLanguageSelect.addEventListener("change", function() {
    lessonExplanationLanguage = explanationLanguageSelect.value;
    showLessonSentence(currentLessonSentenceIndex);

    if (lessonExplanationLanguage === "cs") {
      lessonMessage.textContent = t("explanationLanguageCs");
    } else if (lessonExplanationLanguage === "en") {
      lessonMessage.textContent = t("explanationLanguageEn");
    } else {
      lessonMessage.textContent = t("explanationLanguageRu");
    }
  });
}

if (repeatFragmentButton) {
  repeatFragmentButton.addEventListener("click", function() {
  toggleLessonRepeat();
  });
}

if (floatingRepeatFragmentButton) {
  floatingRepeatFragmentButton.addEventListener("click", function() {
    toggleLessonRepeat();
  });
}

if (togglePinyinButton) {
  togglePinyinButton.addEventListener("click", function() {
  lessonCard.classList.toggle("show-pinyin");

  if (lessonCard.classList.contains("show-pinyin")) {
  } else {
  }

  updateLessonToggleTexts();
  });
}

if (toggleTranslationButton) {
  toggleTranslationButton.addEventListener("click", function() {
  translationBlock.classList.toggle("hidden");

  if (translationBlock.classList.contains("hidden")) {
  } else {
  }

  updateLessonToggleTexts();
  });
}

if (toggleBreakdownButton) {
  toggleBreakdownButton.addEventListener("click", function() {
  breakdownBlock.classList.toggle("hidden");

  if (breakdownBlock.classList.contains("hidden")) {
  } else {
    lessonSentences[currentLessonSentenceIndex].appendChild(breakdownBlock);
    renderBreakdown(currentLessonSentenceIndex);
  }

  updateLessonToggleTexts();
  });
}

if (stratagemList) {
  stratagemList.addEventListener("click", function(event) {
  const listenButton = event.target.closest(".stratagem-listen");
  const repeatButton = event.target.closest(".stratagem-repeat-button");
  const detailsButton = event.target.closest(".stratagem-details-button");

  if (listenButton) {
    if (stratagemRepeatIndex === Number(listenButton.dataset.stratagemIndex)) {
      stratagemRepeatRate = Number(listenButton.dataset.rate);
      stratagemRepeatSpeedLabel = listenButton.dataset.speedLabel;
      stratagemRepeatMode = listenButton.dataset.mode;
    }

    speakStratagem(
      Number(listenButton.dataset.stratagemIndex),
      Number(listenButton.dataset.rate),
      listenButton.dataset.speedLabel,
      listenButton.dataset.mode
    );
  }

  if (repeatButton) {
    const index = Number(repeatButton.dataset.stratagemIndex);

    if (stratagemRepeatIndex === index) {
      stratagemRepeatIndex = null;
      stratagemSpeechRunId = stratagemSpeechRunId + 1;
      window.speechSynthesis.cancel();
      stratagemMessage.textContent = t("stratagemRepeatOffMessage");
    } else {
      stratagemRepeatIndex = index;
      stratagemRepeatRate = 0.1;
      stratagemRepeatSpeedLabel = t("listenSlowButton");
      stratagemRepeatMode = "slow";
      stratagemMessage.textContent = t("stratagemRepeatOnMessage");
    }

    renderStratagems();
  }

  if (detailsButton) {
    const index = Number(detailsButton.dataset.stratagemIndex);
    const details = document.getElementById("stratagemDetails" + index);

    details.classList.toggle("hidden");
    detailsButton.textContent = details.classList.contains("hidden") ? t("detailsButton") : t("hideDetailsButton");
  }
  });
}

if (jokeList) {
  jokeList.addEventListener("click", function(event) {
  const listenButton = event.target.closest(".joke-listen");
  const repeatButton = event.target.closest(".joke-repeat-button");
  const detailsButton = event.target.closest(".joke-details-button");

  if (listenButton) {
    if (jokeRepeatIndex === Number(listenButton.dataset.jokeIndex)) {
      jokeRepeatRate = Number(listenButton.dataset.rate);
      jokeRepeatSpeedLabel = listenButton.dataset.speedLabel;
    }

    speakJoke(
      Number(listenButton.dataset.jokeIndex),
      Number(listenButton.dataset.rate),
      listenButton.dataset.speedLabel
    );
  }

  if (repeatButton) {
    const index = Number(repeatButton.dataset.jokeIndex);

    if (jokeRepeatIndex === index) {
      jokeRepeatIndex = null;
      jokeSpeechRunId = jokeSpeechRunId + 1;
      window.speechSynthesis.cancel();
      jokeMessage.textContent = t("jokeRepeatOffMessage");
    } else {
      jokeRepeatIndex = index;
      jokeRepeatRate = 0.55;
      jokeRepeatSpeedLabel = t("listenSlowButton");
      jokeMessage.textContent = t("jokeRepeatOnMessage");
    }

    renderJokes();
  }

  if (detailsButton) {
    const index = Number(detailsButton.dataset.jokeIndex);
    const details = document.getElementById("jokeDetails" + index);

    details.classList.toggle("hidden");
    detailsButton.textContent = details.classList.contains("hidden") ? t("detailsButton") : t("hideDetailsButton");
  }
  });
}

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, function(character) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#039;"
    }[character];
  });
}

function drawIChingAnswer() {
  if (!ichingResult) {
    return;
  }

  const answer = ichingAnswers[Math.floor(Math.random() * ichingAnswers.length)];
  const question = ichingQuestionInput ? ichingQuestionInput.value.trim() : "";
  const questionLine = question
    ? `<p class="question-line">Otázka: ${escapeHtml(question)}</p>`
    : "";

  ichingResult.classList.remove("hidden");
  ichingResult.innerHTML = `
    ${questionLine}
    <h2><span class="hexagram-symbol">${answer.symbol}</span>${answer.number}. ${answer.name}</h2>
    <p><strong>Význam:</strong> ${answer.meaning}</p>
    <p><strong>Zamyšlení:</strong> ${answer.reflection}</p>
    <p class="oracle-chance-line">Možná je to náhoda. A možná ne.</p>
  `;
}

if (ichingButton) {
  ichingButton.addEventListener("click", drawIChingAnswer);
}

function normalizeSearchText(text) {
  return String(text)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function getChineseCharacters(value) {
  return Array.from(String(value)).filter(function(character, index, characters) {
    return /[\u3400-\u9fff]/u.test(character) && characters.indexOf(character) === index;
  });
}

function createStrokeButtons(word) {
  const characters = getChineseCharacters(word);

  if (!characters.length) {
    return "";
  }

  return `
    <div class="word-strokes">
      <span>Tahy znaku:</span>
      ${characters.map(function(character) {
        return `<button class="stroke-button" type="button" data-character="${escapeHtml(character)}">${escapeHtml(character)}</button>`;
      }).join("")}
    </div>
  `;
}

function renderFrequencyWords() {
  if (!frequencyWordList || !Array.isArray(window.frequencyWords)) {
    return;
  }

  frequencyWordList.innerHTML = window.frequencyWords.map(function(entry) {
    const searchText = [
      entry.word,
      entry.pinyin,
      entry.pinyinInput,
      entry.cz,
      entry.en
    ].join(" ");

    return `
      <details class="word-entry" data-search="${escapeHtml(searchText)}">
        <summary class="word-summary">
          <span class="word-rank">${entry.rank}.</span>
          <span class="word-hanzi">${escapeHtml(entry.word)}</span>
          <span class="word-pinyin">${escapeHtml(entry.pinyin)}</span>
          <span class="word-cz">${escapeHtml(entry.cz)}</span>
          <span class="word-en">${escapeHtml(entry.en)}</span>
          <span class="word-frequency">${entry.frequency}</span>
        </summary>
        <div class="word-detail">
          <div class="word-detail-head">
            <p><strong>${escapeHtml(entry.word)}</strong> · ${escapeHtml(entry.pinyin)}</p>
            <p>${escapeHtml(entry.cz)} / ${escapeHtml(entry.en)}</p>
            <p>${escapeHtml(entry.explanation || "Význam bude doplněn.")}</p>
          </div>
          <p class="source-note">SUBTLEX-CH WCount: ${entry.frequency}</p>
          ${createStrokeButtons(entry.word)}
        </div>
      </details>
    `;
  }).join("");

  wordEntries = document.querySelectorAll(".word-entry");
}

renderFrequencyWords();

function updateWordSearch() {
  if (!wordSearchInput || !wordSearchStatus) {
    return;
  }

  if (!wordEntries.length) {
    wordSearchStatus.textContent = "Zatím nejsou vložena žádná slova.";
    return;
  }

  const query = normalizeSearchText(wordSearchInput.value.trim());
  let visibleCount = 0;

  wordEntries.forEach(function(entry) {
    const searchableText = normalizeSearchText(entry.dataset.search || "");
    const isVisible = !query || searchableText.includes(query);
    entry.hidden = !isVisible;

    if (isVisible) {
      visibleCount = visibleCount + 1;
    }
  });

  if (visibleCount === 0) {
    wordSearchStatus.textContent = "Nenalezeno žádné slovo.";
  } else {
    wordSearchStatus.textContent = "Zobrazeno " + visibleCount + " z " + wordEntries.length + " slov";
  }
}

function getSingleChineseCharacter(value) {
  const characters = Array.from(String(value).trim());

  if (characters.length !== 1 || !/[\u3400-\u9fff]/u.test(characters[0])) {
    return null;
  }

  return characters[0];
}

function clearStrokeTarget() {
  if (strokeTarget) {
    strokeTarget.innerHTML = "";
  }
}

function renderStrokeCharacter(value, scrollToTool) {
  if (!strokeCharacterInput || !strokeMessage || !strokeTarget) {
    return;
  }

  const character = getSingleChineseCharacter(value);

  if (!character) {
    clearStrokeTarget();
    strokeMessage.textContent = "Zadejte prosím jen jeden čínský znak.";
    return;
  }

  strokeCharacterInput.value = character;

  if (typeof HanziWriter === "undefined") {
    clearStrokeTarget();
    strokeMessage.textContent = "Tahy pro tento znak se nepodařilo načíst.";
    return;
  }

  const currentRequestId = strokeRequestId + 1;
  strokeRequestId = currentRequestId;
  const targetSize = Math.min(280, Math.max(220, Math.floor(strokeTarget.getBoundingClientRect().width || 260)));

  clearStrokeTarget();
  strokeTarget.style.width = targetSize + "px";
  strokeTarget.style.height = targetSize + "px";
  strokeMessage.textContent = "Načítám tahy znaku " + character + "…";

  try {
    strokeWriter = HanziWriter.create("strokeTarget", character, {
      width: targetSize,
      height: targetSize,
      padding: 10,
      showOutline: true,
      showCharacter: false,
      strokeAnimationSpeed: 1,
      delayBetweenStrokes: 350,
      onLoadCharDataSuccess: function() {
        if (currentRequestId !== strokeRequestId) {
          return;
        }

        strokeMessage.textContent = "Tahy znaku " + character;
        strokeWriter.animateCharacter();
      },
      onLoadCharDataError: function() {
        if (currentRequestId !== strokeRequestId) {
          return;
        }

        clearStrokeTarget();
        strokeMessage.textContent = "Tahy pro tento znak se nepodařilo načíst.";
      }
    });
  } catch (error) {
    clearStrokeTarget();
    strokeMessage.textContent = "Tahy pro tento znak se nepodařilo načíst.";
  }

  if (scrollToTool && strokeTool) {
    strokeTool.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

if (wordSearchInput) {
  wordSearchInput.addEventListener("input", updateWordSearch);
  updateWordSearch();
}

document.querySelectorAll(".stroke-button").forEach(function(button) {
  button.addEventListener("click", function() {
    renderStrokeCharacter(button.dataset.character || "", true);
  });
});

if (showStrokeButton) {
  showStrokeButton.addEventListener("click", function() {
    renderStrokeCharacter(strokeCharacterInput ? strokeCharacterInput.value : "", false);
  });
}

if (strokeCharacterInput) {
  strokeCharacterInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      renderStrokeCharacter(strokeCharacterInput.value, false);
    }
  });
}

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

if (themeButton) {
  themeButton.addEventListener("click", function() {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }

    updateThemeButtonText();
  });
}

lessonExplanationLanguage = interfaceLanguage;
if (explanationLanguageSelect) {
  explanationLanguageSelect.value = interfaceLanguage;
}
applyInterfaceLanguage();
renderStratagems();
renderJokes();
