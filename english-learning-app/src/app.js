// app.js - Версія з підтримкою Темної/Світлої теми, зміни мови, РОЗШИРЕННЯМ СЛОВНИКА та ПРИВ'ЯЗКОЮ ПРОГРЕСУ ДО КОРИСТУВАЧА

const tasks = {
    food: [
        { question: "apple", answer: "яблуко" },
        { question: "bread", answer: "хліб" },
        { question: "cheese", answer: "сир" },
        { question: "milk", answer: "молоко" },
        { question: "sugar", answer: "цукор" },
        { question: "meat", answer: "м'ясо" },
        { question: "salt", answer: "сіль" },
        { question: "fork", answer: "виделка" },
        { question: "knife", answer: "ніж" },
        { question: "spoon", answer: "ложка" },
    ],
    travel: [
        { question: "airport", answer: "аеропорт" },
        { question: "ticket", answer: "квиток" },
        { question: "luggage", answer: "багаж" },
        { question: "hotel", answer: "готель" },
        { question: "passport", answer: "паспорт" },
        { question: "map", answer: "карта" },
        { question: "taxi", answer: "таксі" },
        { question: "bus", answer: "автобус" },
        { question: "country", answer: "країна" },
    ],
    technology: [
        { question: "computer", answer: "комп’ютер" },
        { question: "keyboard", answer: "клавіатура" },
        { question: "internet", answer: "інтернет" },
        { question: "software", answer: "програмне забезпечення" },
        { question: "mouse", answer: "миша" },
        { question: "screen", answer: "екран" },
        { question: "smartphone", answer: "смартфон" },
        { question: "application", answer: "застосунок" },
        { question: "code", answer: "код" },
    ],
    sport: [ // НОВА ТЕМА
        { question: "football", answer: "футбол" },
        { question: "basketball", answer: "баскетбол" },
        { question: "swimming", answer: "плавання" },
        { question: "run", answer: "бігати" },
        { question: "team", answer: "команда" },
        { question: "score", answer: "рахунок" },
        { question: "gym", answer: "спортзал" },
        { question: "training", answer: "тренування" },
    ],
    nature: [ // НОВА ТЕМА
        { question: "tree", answer: "дерево" },
        { question: "river", answer: "річка" },
        { question: "mountain", answer: "гора" },
        { question: "sun", answer: "сонце" },
        { question: "cloud", answer: "хмара" },
        { question: "flower", answer: "квітка" },
        { question: "animal", answer: "тварина" },
        { question: "forest", answer: "ліс" },
        { question: "sky", answer: "небо" },
    ],
};

// =======================================================
// ДАНІ МОВИ ІНТЕРФЕЙСУ
// =======================================================

const interfaceTexts = {
    uk: {
        welcomeTitle: "Ласкаво просимо! 👋",
        appTitle: "Онлайн-сервіс для вивчення англійської",
        optionsPrompt: "Оберіть параметри тренування:",
        generateButton: "Згенерувати завдання",
        backButton: "Назад",
        closeButton: "Закрити",
        orSeparator: "або",

        // 💥 АВТЕНТИФІКАЦІЯ
        authPrompt: "Оберіть, як ви бажаєте розпочати:",
        registerButton: "Я тут вперше (Реєстрація)",
        registerButtonShort: "Зареєструватися",
        loginButton: "У мене вже є аккаунт (Вхід)",
        loginButtonShort: "Увійти",
        guestButton: "Продовжити як Гість",
        registrationTitle: "Реєстрація",
        registrationPrompt: "Створіть свій навчальний профіль:",
        loginTitle: "Вхід",
        loginPrompt: "Будь ласка, введіть Email та пароль для входу:",
        // 💥 ПЛЕЙСХОЛДЕРИ
        regUsernamePlaceholder: "Ваше ім'я (для відображення)",
        regEmailPlaceholder: "Ваш Email",
        regPasswordPlaceholder: "Пароль (мін. 6 символів)",
        loginEmailPlaceholder: "Ваш Email",
        loginPasswordPlaceholder: "Ваш Пароль",
        logoutButton: "Вийти",

        // Налаштування
        settingsTitle: "Налаштування",
        themeLabel: "Тема сайту:",
        themeLight: "Світла",
        themeDark: "Темна",
        languageLabel: "Мова інтерфейсу:",

        // Прогрес та режими
        progressTitle: "Мій прогрес, [USER]: [SCORE]",
        badgeMessage: "🏅 Ви досягли мети! Бейдж 'Майстер Засвоєння' розблоковано!",
        topicLabel: "Тема:",
        topicFood: "Їжа",
        topicTravel: "Подорожі",
        topicTechnology: "Технології",
        topicSport: "Спорт",
        topicNature: "Природа",
        modeLabel: "Режим:",
        modePractice: "Тренування (Без часу)",
        modeExam: "Іспит (На час)",
        timerBase: "Час: [TIME]с",

        // Завдання
        taskTranslate: "Перекладіть:",
        taskPlaceholder: "Ваша відповідь",
        examStartButton: "Почати Іспит ([TIME] секунд)",
        checkButton: "Перевірити відповіді",
        timeUpAlert: "Час вийшов!",
        resultTitle: "Ваш результат: [SCORE] з [TOTAL]",
        resultSuccess: "Чудово! Усі відповіді правильні! 🎉",
        resultFail: "Спробуйте ще раз, щоб закріпити матеріал. (Слова, в яких ви помилились, будуть повторені).",
        tryAgainButton: "Спробувати ще раз",

        // 💥 ПОВІДОМЛЕННЯ ПРО ПОМИЛКИ (АВТЕНТИФІКАЦІЯ)
        regErrorLength: "Помилка: Ім'я (для відображення) повинно містити мін. 3 символи і не може бути 'Гість'.",
        regErrorEmailInvalid: "Помилка: Будь ласка, введіть коректний Email.",
        regErrorPasswordLength: "Помилка: Пароль повинен містити мінімум 6 символів.",
        regErrorExists: "Помилка: Користувач з таким Email вже існує.",
        loginErrorEmpty: "Помилка: Будь ласка, заповніть Email та пароль.",
        loginErrorNotFound: "Помилка: Користувач не знайдений або невірний Email/Пароль.",
        audioError: "Ваш браузер не підтримує синтез мовлення.",
        badgeAlert: "ВІТАЄМО! Ви досягли мети та отримали бейдж 'Майстер Засвоєння'!",
    },
    en: {
        welcomeTitle: "Welcome! 👋",
        appTitle: "Online English Learning Service",
        optionsPrompt: "Select training parameters:",
        generateButton: "Generate Tasks",
        backButton: "Back",
        closeButton: "Close",
        orSeparator: "or",

        // 💥 АВТЕНТИФІКАЦІЯ
        authPrompt: "Choose how you want to start:",
        registerButton: "New user (Registration)",
        registerButtonShort: "Register",
        loginButton: "Already have an account (Login)",
        loginButtonShort: "Log In",
        guestButton: "Continue as Guest",
        registrationTitle: "Registration",
        registrationPrompt: "Create your learning profile:",
        loginTitle: "Login",
        loginPrompt: "Please enter your Email and password to log in:",
        // 💥 ПЛЕЙСХОЛДЕРИ
        regUsernamePlaceholder: "Your name (for display)",
        regEmailPlaceholder: "Your Email",
        regPasswordPlaceholder: "Password (min. 6 characters)",
        loginEmailPlaceholder: "Your Email",
        loginPasswordPlaceholder: "Your Password",
        logoutButton: "Log out",

        // Налаштування
        settingsTitle: "Settings",
        themeLabel: "Site Theme:",
        themeLight: "Light",
        themeDark: "Dark",
        languageLabel: "Interface Language:",

        // Progress and modes
        progressTitle: "My progress, [USER]: [SCORE]",
        badgeMessage: "🏅 You've reached the goal! The 'Mastery Badge' is unlocked!",
        topicLabel: "Topic:",
        topicFood: "Food",
        topicTravel: "Travel",
        topicTechnology: "Technology",
        topicSport: "Sport",
        topicNature: "Nature",
        modeLabel: "Mode:",
        modePractice: "Practice (No time limit)",
        modeExam: "Exam (Timed)",
        timerBase: "Time: [TIME]s",

        // Tasks
        taskTranslate: "Translate:",
        taskPlaceholder: "Your answer",
        examStartButton: "Start Exam ([TIME] seconds)",
        checkButton: "Check Answers",
        timeUpAlert: "Time is up!",
        resultTitle: "Your result: [SCORE] out of [TOTAL]",
        resultSuccess: "Excellent! All answers are correct! 🎉",
        resultFail: "Try again to reinforce the material. (Words you missed will be repeated).",
        tryAgainButton: "Try Again",

        // 💥 ПОВІДОМЛЕННЯ ПРО ПОМИЛКИ (АВТЕНТИФІКАЦІЯ)
        regErrorLength: "Error: Display name must be at least 3 characters long and cannot be 'Guest'.",
        regErrorEmailInvalid: "Error: Please enter a valid Email.",
        regErrorPasswordLength: "Error: Password must be at least 6 characters long.",
        regErrorExists: "Error: A user with this Email already exists.",
        loginErrorEmpty: "Error: Please fill in Email and password.",
        loginErrorNotFound: "Error: User not found or incorrect Email/Password.",
        audioError: "Your browser does not support speech synthesis.",
        badgeAlert: "CONGRATULATIONS! You reached the goal and earned the 'Mastery Badge'!",
    }
};

// КОНСТАНТИ ТА ГЛОБАЛЬНІ ЗМІННІ
const USER_KEY = 'currentUser';
const PROGRESS_KEY = 'totalCompletedTasks';
const REGISTERED_USERS_KEY = 'registeredUsers';
const ERROR_WORDS_KEY = 'errorWords';
const THEME_KEY = 'userTheme';
const LANG_KEY = 'userLang';
const TOTAL_TASKS_FOR_GOAL = 10;
const TIMER_DURATION_SECONDS = 30;
let timerInterval;
let currentLang = localStorage.getItem(LANG_KEY) || 'uk';

// Елементи DOM
const htmlElement = document.documentElement;

const authScreen = document.getElementById('auth-screen');
const registrationScreen = document.getElementById('registration-screen');
const loginScreen = document.getElementById('login-screen');
const appScreen = document.getElementById('app-screen');

// ОНОВЛЕНО: Нові поля для Email та Password
const regUsernameInput = document.getElementById('reg-username-input');
const regEmailInput = document.getElementById('reg-email-input');
const regPasswordInput = document.getElementById('reg-password-input');
const loginEmailInput = document.getElementById('login-email-input');
const loginPasswordInput = document.getElementById('login-password-input');

const regMessage = document.getElementById('reg-message');
const loginMessage = document.getElementById('login-message');
const userDisplayName = document.getElementById('user-display-name');
const progressFill = document.getElementById('progress-bar-fill');
const progressText = document.getElementById('progress-text');
const topicSelect = document.getElementById("topic");
const modeSelect = document.getElementById("mode");
const generateButton = document.getElementById("generate");
const taskContainer = document.getElementById("task-container");
const badgeDisplay = document.getElementById('badge-display');
const timerDisplay = document.getElementById('timer-display');
const timerSection = document.getElementById('timer-section');

// Елементи Налаштувань
const settingsBtn = document.getElementById('settings-btn');
const settingsModal = document.getElementById('settings-modal');
const closeSettingsBtn = document.getElementById('close-settings-btn');
const themeSelect = document.getElementById('theme-select');
const langSelect = document.getElementById('lang-select');


// =======================================================
// ФУНКЦІОНАЛ НАЛАШТУВАНЬ: ТЕМА
// =======================================================

function toggleTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    themeSelect.value = theme;
}


// =======================================================
// ФУНКЦІОНАЛ НАЛАШТУВАНЬ: МОВА
// =======================================================

function updateInterfaceTexts(lang) {
    currentLang = lang;
    localStorage.setItem(LANG_KEY, lang);
    langSelect.value = lang;
    const texts = interfaceTexts[lang];

    // 1. Оновлення контенту
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        // Пропускаємо progressTitle, оскільки оновлюємо його окремо
        if (key === 'progressTitle') {
             return;
        }
        if (texts[key]) {
            element.textContent = texts[key];
        }
    });

    // 2. Оновлення placeholder'ів
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (texts[key]) {
            element.placeholder = texts[key];
        }
    });

    // 3. Оновлення <select> options
    document.querySelectorAll('#topic option, #mode option, #theme-select option').forEach(option => {
        const key = option.getAttribute('data-i18n');
        if (key && texts[key]) {
            option.textContent = texts[key];
        }
    });

    // ОНОВЛЕННЯ: Додавання нових опцій тем
    const topicOptionsContainer = topicSelect;
    const existingTopics = Array.from(topicOptionsContainer.options).map(opt => opt.value);
    const newTopics = ['sport', 'nature'];

    newTopics.forEach(topicKey => {
        if (!existingTopics.includes(topicKey)) {
            const newOption = document.createElement('option');
            newOption.value = topicKey;
            newOption.setAttribute('data-i18n', `topic${topicKey.charAt(0).toUpperCase() + topicKey.slice(1)}`);
            newOption.textContent = texts[`topic${topicKey.charAt(0).toUpperCase() + topicKey.slice(1)}`];
            topicOptionsContainer.appendChild(newOption);
        }
    });


    updateProgressDisplay();

    // Оновлення тексту кнопок, які можуть бути на екрані
    const checkBtn = document.getElementById('check-btn');
    const startBtn = document.getElementById('start-btn');
    if (checkBtn) {
        checkBtn.textContent = texts.checkButton;
    }
    if (startBtn) {
         startBtn.textContent = texts.examStartButton.replace('[TIME]', TIMER_DURATION_SECONDS);
    }
}


// =======================================================
// ЛОГІКА АВТЕНТИФІКАЦІЇ ТА ВАЛІДАЦІЯ
// =======================================================

function navigateTo(screenId) {
    // Встановлюємо lang в <html>
    htmlElement.setAttribute('lang', currentLang);

    authScreen.style.display = 'none';
    registrationScreen.style.display = 'none';
    loginScreen.style.display = 'none';
    appScreen.style.display = 'none';
    // Налаштування приховується лише при навігації
    settingsModal.style.display = 'none';

    document.getElementById(screenId).style.display = 'block';

    // Відображаємо кнопку Вийти лише на екрані додатка
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.style.display = (screenId === 'app-screen' && !isGuest(localStorage.getItem(USER_KEY))) ? 'block' : 'none';
    }
}

/**
 * Отримує зареєстрованих користувачів. Зберігаються як масив об'єктів {email, password, name}.
 * @returns {Array<Object>} Масив користувачів.
 */
function getRegisteredUsers() {
    const users = localStorage.getItem(REGISTERED_USERS_KEY);
    return users ? JSON.parse(users) : [];
}

function saveRegisteredUsers(users) {
    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
}

// ФУНКЦІЯ ВАЛІДАЦІЇ EMAIL
function isValidEmail(email) {
    // Проста регулярний вираз для перевірки формату email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function registerUser() {
    const name = regUsernameInput.value.trim();
    const email = regEmailInput.value.trim();
    const password = regPasswordInput.value;

    regMessage.textContent = "";

    const guestName = interfaceTexts[currentLang].guestButton;
    const texts = interfaceTexts[currentLang];

    // 1. Валідація Імені (для відображення)
    if (name.length < 3 || name.toLowerCase() === guestName.toLowerCase().toLowerCase()) {
        regMessage.textContent = texts.regErrorLength;
        return;
    }

    // 2. Валідація Email
    if (!isValidEmail(email)) {
        regMessage.textContent = texts.regErrorEmailInvalid;
        return;
    }

    // 3. Валідація Пароля
    if (password.length < 6) {
        regMessage.textContent = texts.regErrorPasswordLength;
        return;
    }

    const users = getRegisteredUsers();

    // 4. Перевірка на існування Email
    if (users.find(user => user.email === email)) {
        regMessage.textContent = texts.regErrorExists;
        return;
    }

    // 5. Реєстрація та збереження
    const newUser = {
        email: email,
        password: password,
        name: name,
    };
    users.push(newUser);
    saveRegisteredUsers(users);

    // 6. Вхід
    loginUser(email, password, name);
}

function getGuestNames() {
    return [interfaceTexts.uk.guestButton, interfaceTexts.en.guestButton];
}

function isGuest(username) {
    // Перевіряємо, чи поточне ім'я користувача відповідає гостьовому імені в будь-якій мові
    return getGuestNames().map(n => n.toLowerCase()).includes(username ? username.toLowerCase() : '');
}

/**
 * Здійснює вхід користувача. Може викликатися з email/password/name (після реєстрації) або без (з форми).
 * @param {string} prefilledEmail Email, якщо викликається після реєстрації.
 * @param {string} prefilledPassword Пароль, якщо викликається після реєстрації.
 * @param {string} prefilledName Ім'я, якщо викликається після реєстрації.
 */
function loginUser(prefilledEmail = null, prefilledPassword = null, prefilledName = null) {
    const email = prefilledEmail ? prefilledEmail : loginEmailInput.value.trim();
    const password = prefilledPassword ? prefilledPassword : loginPasswordInput.value;
    loginMessage.textContent = "";
    const texts = interfaceTexts[currentLang];

    // 1. Валідація на порожні поля
    if (!prefilledEmail && (email.length === 0 || password.length === 0)) {
        loginMessage.textContent = texts.loginErrorEmpty;
        return;
    }

    let foundUser;

    if (prefilledEmail) {
        // Логін після успішної реєстрації
        foundUser = { name: prefilledName, email: prefilledEmail, password: prefilledPassword };
    } else {
        // Логін через форму
        const users = getRegisteredUsers();
        foundUser = users.find(user => user.email === email && user.password === password);
    }


    if (!foundUser) {
        loginMessage.textContent = texts.loginErrorNotFound;
        return;
    }

    // 3. Успішний вхід
    // Зберігаємо ім'я користувача (name) як поточного користувача
    localStorage.setItem(USER_KEY, foundUser.name);
    userDisplayName.textContent = foundUser.name;

    navigateTo('app-screen');
    updateProgressDisplay();

    // Очищення полів входу після успішного входу
    loginEmailInput.value = '';
    loginPasswordInput.value = '';
}


function handleGuestLogin() {
    const guestName = interfaceTexts[currentLang].guestButton;
    localStorage.setItem(USER_KEY, guestName);
    userDisplayName.textContent = guestName;

    navigateTo('app-screen');
    updateProgressDisplay();
}

function handleLogout() {
    // Очищення полів реєстрації/входу при виході
    regUsernameInput.value = '';
    regEmailInput.value = '';
    regPasswordInput.value = '';
    loginEmailInput.value = '';
    loginPasswordInput.value = '';

    // ВИДАЛЯЄМО СТАРІ ГЕНЕРАЛЬНІ КЛЮЧІ, ЯКЩО ВОНИ ІСНУЮТЬ (одноразово для міграції)
    localStorage.removeItem(PROGRESS_KEY);
    localStorage.removeItem(ERROR_WORDS_KEY);

    // Видаляємо лише поточного користувача
    localStorage.removeItem(USER_KEY);
    stopTimer();
    navigateTo('auth-screen');
}

// =======================================================
// ФУНКЦІОНАЛ АУДІО
// =======================================================

function speakWord(word) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(word);
        const voices = speechSynthesis.getVoices();
        const enVoice = voices.find(v => v.lang.startsWith('en'));
        if (enVoice) {
            utterance.voice = enVoice;
        } else {
             utterance.lang = 'en-US';
        }
        speechSynthesis.speak(utterance);
    } else {
        alert(interfaceTexts[currentLang].audioError);
    }
}

// =======================================================
// ФУНКЦІОНАЛ ТАЙМЕРА ТА СТАРТ
// =======================================================

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerSection.style.display = 'none';
        timerDisplay.classList.remove('low-time');
    }
}

function startTimer() {
    const inputs = taskContainer.querySelectorAll('input[type="text"]');
    const checkBtn = document.getElementById("check-btn");

    // 1. Розблоковуємо поля вводу
    inputs.forEach(input => input.disabled = false);

    // 2. Показуємо кнопку перевірки
    if (checkBtn) {
        checkBtn.style.display = 'block';
    }

    // 3. Ховаємо кнопку "Почати"
    const startBtn = document.getElementById("start-btn");
    if (startBtn) {
        startBtn.style.display = 'none';
    }

    // 4. Запускаємо таймер
    stopTimer();
    timerSection.style.display = 'block';
    let timeLeft = TIMER_DURATION_SECONDS;
    timerDisplay.textContent = interfaceTexts[currentLang].timerBase.replace('[TIME]', timeLeft);

    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = interfaceTexts[currentLang].timerBase.replace('[TIME]', timeLeft);

        if (timeLeft <= 10) {
            timerDisplay.classList.add('low-time');
        } else {
            timerDisplay.classList.remove('low-time');
        }

        if (timeLeft <= 0) {
            stopTimer();
            alert(interfaceTexts[currentLang].timeUpAlert);
            // Примусова перевірка
            checkAnswers(topicSelect.value);
        }
    }, 1000);
}


// =======================================================
// АДАПТИВНЕ НАВЧАННЯ ТА ПРОГРЕС (ВИПРАВЛЕНО)
// =======================================================

/**
 * ГЕНЕРАТОР ДИНАМІЧНОГО КЛЮЧА
 * Створює унікальний ключ для localStorage на основі імені користувача.
 * @param {string} keyName Назва ключа (PROGRESS_KEY або ERROR_WORDS_KEY).
 * @returns {string} Динамічний ключ для localStorage або null, якщо користувач Гість.
 */
function getUserKey(keyName) {
    const currentUser = localStorage.getItem(USER_KEY);
    // Якщо користувач не встановлений або він є Гостем, прогрес не зберігається.
    if (!currentUser || isGuest(currentUser)) {
        return null;
    }
    // Формуємо унікальний ключ: наприклад, "yura_totalCompletedTasks"
    return `${currentUser.toLowerCase()}_${keyName}`;
}


function getErrorWords() {
    const key = getUserKey(ERROR_WORDS_KEY);
    if (!key) return [];

    const errorWordsJSON = localStorage.getItem(key);
    return errorWordsJSON ? JSON.parse(errorWordsJSON) : [];
}

function saveErrorWords(words) {
    const key = getUserKey(ERROR_WORDS_KEY);
    if (!key) return; // Не зберігаємо для Гостя

    localStorage.setItem(key, JSON.stringify(words));
}

function addErrorWord(word) {
    let errorWords = getErrorWords();
    if (!errorWords.includes(word)) {
        errorWords.push(word);
        saveErrorWords(errorWords);
    }
}

function removeErrorWord(word) {
    let errorWords = getErrorWords();
    const index = errorWords.indexOf(word);
    if (index > -1) {
        errorWords.splice(index, 1);
        saveErrorWords(errorWords);
    }
}

function updateProgressDisplay() {
    const currentUser = localStorage.getItem(USER_KEY);
    let completedTasks = 0;
    const progressKey = getUserKey(PROGRESS_KEY); // Використовуємо унікальний ключ

    if (progressKey) {
        // Читаємо прогрес за унікальним ключем
        completedTasks = parseInt(localStorage.getItem(progressKey) || 0);
    }

    let percentage = (completedTasks / TOTAL_TASKS_FOR_GOAL) * 100;

    if (percentage > 100) {
        percentage = 100;
    }

    const scoreText = `${completedTasks} / ${TOTAL_TASKS_FOR_GOAL} (${Math.round(percentage)}%)`;

    // Оновлення заголовка прогресу з перекладом
    const titleTemplate = interfaceTexts[currentLang].progressTitle;
    const displayName = userDisplayName.textContent || 'Користувач';

    // Встановлюємо оновлений текст в елемент h3
    const h3Progress = document.querySelector('.progress-section h3');
    if (h3Progress) {
        h3Progress.textContent = titleTemplate.replace('[USER]', displayName).replace('[SCORE]', scoreText);
    }

    if (progressFill && progressText) {
        progressFill.style.width = `${percentage}%`;
        progressText.textContent = scoreText;
        // Оновлення ARIA-атрибутів для прогрес-бару
        document.querySelector('.progress-bar-container').setAttribute('aria-valuenow', Math.round(percentage));
    }

    if (badgeDisplay) {
        if (completedTasks >= TOTAL_TASKS_FOR_GOAL) {
            badgeDisplay.style.display = 'block';
        } else {
            badgeDisplay.style.display = 'none';
        }
    }
}


function saveProgress(score, total) {
    const progressKey = getUserKey(PROGRESS_KEY);

    if (!progressKey) {
        return; // Не зберігаємо для Гостя
    }

    if (score === total) {
        // Читаємо прогрес за унікальним ключем
        const completedTasks = parseInt(localStorage.getItem(progressKey) || 0);

        // Збільшуємо прогрес лише якщо він ще не досяг мети
        if (completedTasks < TOTAL_TASKS_FOR_GOAL) {
            // Зберігаємо прогрес за унікальним ключем
            localStorage.setItem(progressKey, completedTasks + 1);
            updateProgressDisplay();

            // Перевіряємо, чи досягнуто мету
            if (completedTasks + 1 === TOTAL_TASKS_FOR_GOAL) {
                alert(interfaceTexts[currentLang].badgeAlert);
            }
        }
    }
}


function displayResult(correct, total, incorrectWords) {
    stopTimer();
    const texts = interfaceTexts[currentLang];

    // Створюємо список неправильних слів для виводу
    let incorrectWordsList = '';
    if (incorrectWords.length > 0) {
        const listItems = incorrectWords.map(word => `<li>**${word}**</li>`).join('');
        incorrectWordsList = `
            <p style="margin-top: 15px; font-weight: 600;">Помилки були у словах:</p>
            <ul style="list-style-type: none; padding: 0 0 10px 0;">${listItems}</ul>
        `;
    }

    const resultHTML = `
        <div class="result-message">
            <h3>${texts.resultTitle.replace('[SCORE]', correct).replace('[TOTAL]', total)}</h3>
            ${correct === total
                ? `<p class="success">${texts.resultSuccess}</p>`
                : `<p class="fail">${texts.resultFail}</p>${incorrectWordsList}`}

            <button id="try-again-btn" class="auth-btn primary-btn">${texts.tryAgainButton}</button>
            <button id="generate-new-btn" class="auth-btn secondary-btn" style="margin-top: 20px;">${texts.generateButton}</button>
        </div>
    `;

    taskContainer.innerHTML = '';
    const resultElement = document.createElement('div');
    resultElement.innerHTML = resultHTML;
    taskContainer.appendChild(resultElement);


    // Обробник "Спробувати ще раз"
    document.getElementById('try-again-btn').onclick = () => {
        let repeatTasks = tasks[topicSelect.value].filter(task => incorrectWords.includes(task.question));

        // Доповнюємо до 3, якщо недостатньо слів
        const totalTopicTasks = tasks[topicSelect.value];
        while (repeatTasks.length < 3 && repeatTasks.length < totalTopicTasks.length) {
            const potentialTasks = totalTopicTasks.filter(t => !repeatTasks.some(rt => rt.question === t.question));
            if (potentialTasks.length === 0) break;
            const randomTask = potentialTasks[Math.floor(Math.random() * potentialTasks.length)];
            repeatTasks.push(randomTask);
        }

        generateTasks(topicSelect.value, repeatTasks);
    };

    // Обробник "Згенерувати нові завдання"
    document.getElementById('generate-new-btn').onclick = () => {
         generateTasks(topicSelect.value);
    };
}
function checkAnswers(topic) {
    stopTimer();
    let correct = 0;
    const currentTasks = JSON.parse(taskContainer.dataset.currentTasks);
    const total = currentTasks.length;

    // Нова логіка для збору неправильних слів
    const incorrectWords = [];

    currentTasks.forEach((t, i) => {
        const inputElement = document.getElementById(`answer-${i}`);
        if (!inputElement) return;

        // Нормалізуємо відповіді
        const userAnswer = inputElement.value.trim().toLowerCase();
        const correctAnswer = t.answer.toLowerCase();

        inputElement.classList.remove('correct', 'incorrect');

        if (userAnswer === correctAnswer) {
            correct++;
            inputElement.classList.add('correct');
            removeErrorWord(t.question);
        } else {
            inputElement.classList.add('incorrect');
            addErrorWord(t.question);
            // Додаємо слово до списку для виводу
            incorrectWords.push(t.question);
        }

        inputElement.disabled = true;
    });

    const checkBtn = document.getElementById("check-btn");
    if (checkBtn) {
        checkBtn.style.display = 'none';
    }

    saveProgress(correct, total);

    // ЗМІНА: Передаємо список неправильних слів
    displayResult(correct, total, incorrectWords);
}


function generateTasks(topic, specificTasks = null) {
    const mode = modeSelect.value;
    localStorage.setItem('selectedTopic', topic);
    stopTimer();
    taskContainer.innerHTML = "";

    let newTasks;
    const texts = interfaceTexts[currentLang];
    const totalTasksCount = 3;

    if (specificTasks) {
        // Якщо передані конкретні завдання (наприклад, для повтору)
        newTasks = specificTasks;
    } else {
        // Логіка генерації нових завдань (як у вашій старій версії)
        newTasks = [];
        const errorWords = getErrorWords();
        const topicTasks = tasks[topic];

        // 1. Пріоритет для помилкових слів (до 2 слів)
        const topicErrorTasks = errorWords
            .map(word => topicTasks.find(t => t.question === word))
            .filter(t => t);

        const errorCount = Math.min(topicErrorTasks.length, 2);
        for (let i = 0; i < errorCount; i++) {
            const randomIndex = Math.floor(Math.random() * topicErrorTasks.length);
            const task = topicErrorTasks.splice(randomIndex, 1)[0];
            newTasks.push(task);
        }

        // 2. Доповнюємо до 3 випадковими словами
        const regularTasks = topicTasks.filter(t => !newTasks.some(nt => nt.question === t.question));
        const regularCount = totalTasksCount - newTasks.length;

        // Перемішуємо залишок слів
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
        shuffleArray(regularTasks);

        for (let i = 0; i < regularCount && regularTasks.length > 0; i++) {
            newTasks.push(regularTasks.shift()); // Беремо перше після перемішування
        }
    }


    taskContainer.dataset.currentTasks = JSON.stringify(newTasks);

    // Визначаємо, чи повинні бути заблоковані поля
    const isDisabled = (mode === 'exam');

    // 3. Відображення завдань
    newTasks.forEach((t, i) => {
        const div = document.createElement("div");
        div.className = "task";
        div.innerHTML = `
          <p>${i + 1}. ${texts.taskTranslate}
                <span class="task-word-highlight">${t.question}</span>
                <button class="audio-btn" aria-label="Прослухати слово ${t.question}" onclick="speakWord('${t.question}')">
                    <i class="fas fa-volume-up"></i>
                </button>
          </p>
          <input type="text" id="answer-${i}" data-correct-answer="${t.answer.toLowerCase()}" placeholder="${texts.taskPlaceholder}" ${isDisabled ? 'disabled' : ''}>
        `;
        taskContainer.appendChild(div);
    });

    // 4. Додавання кнопок в залежності від режиму
    if (mode === 'exam') {
        const startBtn = document.createElement("button");
        startBtn.textContent = texts.examStartButton.replace('[TIME]', TIMER_DURATION_SECONDS);
        startBtn.id = "start-btn";
        startBtn.className = "auth-btn primary-btn";
        startBtn.style.marginBottom = '20px';
        startBtn.onclick = startTimer;
        taskContainer.appendChild(startBtn);

        const checkBtn = document.createElement("button");
        checkBtn.textContent = texts.checkButton;
        checkBtn.id = "check-btn";
        checkBtn.className = "auth-btn primary-btn";
        checkBtn.style.marginTop = '10px';
        checkBtn.onclick = () => checkAnswers(topic);
        checkBtn.style.display = 'none';
        taskContainer.appendChild(checkBtn);

        timerSection.style.display = 'none';
    } else {
        const checkBtn = document.createElement("button");
        checkBtn.textContent = texts.checkButton;
        checkBtn.id = "check-btn";
        checkBtn.className = "auth-btn primary-btn";
        checkBtn.onclick = () => checkAnswers(topic);
        taskContainer.appendChild(checkBtn);

        timerSection.style.display = 'none';
    }
}


// =======================================================
// ОБРОБНИКИ ПОДІЙ ТА ІНІЦІАЛІЗАЦІЯ
// =======================================================

// Обробники Налаштувань
settingsBtn.addEventListener('click', () => {
    settingsModal.style.display = 'flex';
});
closeSettingsBtn.addEventListener('click', () => {
    settingsModal.style.display = 'none';
});

// Обробник для закриття при кліку поза модальним вікном
settingsModal.addEventListener('click', (event) => {
    if (event.target === settingsModal) {
        settingsModal.style.display = 'none';
    }
});


themeSelect.addEventListener('change', (e) => {
    toggleTheme(e.target.value);
});

langSelect.addEventListener('change', (e) => {
    const newLang = e.target.value;
    updateInterfaceTexts(newLang);

    const savedUser = localStorage.getItem(USER_KEY);
    if (isGuest(savedUser)) {
        // Оновлюємо ім'я Гостя відповідно до нової мови
        handleGuestLogin();
    }

    if (taskContainer.dataset.currentTasks) {
        // Перегенеруємо завдання, щоб оновити тексти кнопок
        generateTasks(topicSelect.value);
    }

    htmlElement.setAttribute('lang', newLang);
});


// Перемикачі екранів
document.getElementById('show-registration-btn').addEventListener('click', () => { stopTimer(); navigateTo('registration-screen'); });
document.getElementById('show-login-btn').addEventListener('click', () => { stopTimer(); navigateTo('login-screen'); });
document.getElementById('back-to-auth-reg-btn').addEventListener('click', () => navigateTo('auth-screen'));
document.getElementById('back-to-auth-login-btn').addEventListener('click', () => navigateTo('auth-screen'));

// Обробники автентифікації
document.getElementById('register-btn').addEventListener('click', registerUser);
document.getElementById('login-btn').addEventListener('click', () => loginUser());
document.getElementById('guest-btn').addEventListener('click', handleGuestLogin);
document.getElementById('logout-btn').addEventListener('click', handleLogout);

// Обробник генерації завдань
generateButton.addEventListener("click", () => {
    const topic = topicSelect.value;
    generateTasks(topic);
});

// ІНІЦІАЛІЗАЦІЯ
(function init() {
    // 1. Завантаження теми
    const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
    toggleTheme(savedTheme);

    // 2. Завантаження мови та оновлення інтерфейсу
    const savedLang = localStorage.getItem(LANG_KEY) || 'uk';
    updateInterfaceTexts(savedLang);

    // 3. Перевірка автентифікації
    const savedUser = localStorage.getItem(USER_KEY);
    if (savedUser) {
        if (isGuest(savedUser)) {
            handleGuestLogin();
        } else {
            userDisplayName.textContent = savedUser;
            navigateTo('app-screen');
            updateProgressDisplay();
        }
    } else {
        navigateTo('auth-screen');
    }
})();