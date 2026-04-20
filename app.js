const tasks = {
    food: [{q:"apple",a:"яблуко"},{q:"bread",a:"хліб"},{q:"cheese",a:"сир"},{q:"milk",a:"молоко"},{q:"sugar",a:"цукор"}],
    travel: [{q:"airport",a:"аеропорт"},{q:"ticket",a:"квиток"},{q:"hotel",a:"готель"},{q:"taxi",a:"таксі"}],
    technology: [{q:"computer",a:"комп’ютер"},{q:"code",a:"код"},{q:"software",a:"програмне забезпечення"}],
    sport: [{q:"football",a:"футбол"},{q:"gym",a:"спортзал"},{q:"team",a:"команда"}],
    nature: [{q:"tree",a:"дерево"},{q:"river",a:"річка"},{q:"sun",a:"сонце"}]
};

const interfaceTexts = {
    uk: {
        appTitle: "Вивчення англійської", welcomeTitle: "Привіт!", registerButton: "Реєстрація", loginButton: "Вхід", guestButton: "Гість",
        logoutButton: "Вийти", progressTitle: "Прогрес", topicLabel: "Тема:", modeLabel: "Режим:", generateButton: "Старт",
        checkButton: "Перевірити", backButton: "Назад", regUsernamePlaceholder: "Ім'я", regEmailPlaceholder: "Email", regPasswordPlaceholder: "Пароль",
        loginEmailPlaceholder: "Email", loginPasswordPlaceholder: "Пароль", resultTitle: "Результат: [SCORE]/[TOTAL]", 
        topicFood: "Їжа", topicTravel: "Подорожі", topicTechnology: "IT", topicSport: "Спорт", topicNature: "Природа",
        processingText: "Обробка...", dictionaryTitle: "Словник", filterAll: "Всі"
    },
    en: {
        appTitle: "Learn English", welcomeTitle: "Welcome!", registerButton: "Sign Up", loginButton: "Login", guestButton: "Guest",
        logoutButton: "Logout", progressTitle: "Progress", topicLabel: "Topic:", modeLabel: "Mode:", generateButton: "Start",
        checkButton: "Check", backButton: "Back", regUsernamePlaceholder: "Name", regEmailPlaceholder: "Email", regPasswordPlaceholder: "Password",
        loginEmailPlaceholder: "Email", loginPasswordPlaceholder: "Password", resultTitle: "Result: [SCORE]/[TOTAL]",
        topicFood: "Food", topicTravel: "Travel", topicTechnology: "IT", topicSport: "Sport", topicNature: "Nature",
        processingText: "Processing...", dictionaryTitle: "Vocabulary", filterAll: "All"
    }
};

let currentLang = localStorage.getItem('userLang') || 'uk';

function navigateTo(id) {
    document.querySelectorAll('.screen').forEach(s => s.style.display = 'none');
    document.getElementById(id).style.display = 'block';
    document.getElementById('logout-btn').style.display = (id === 'app-screen') ? 'block' : 'none';
    
    // Якщо відкриваємо додаток, рендеримо словник
    if (id === 'app-screen') initDictionary();
}

function updateUI() {
    const texts = interfaceTexts[currentLang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if(texts[key]) el.textContent = texts[key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if(texts[key]) el.placeholder = texts[key];
    });
}

// ЗАВДАННЯ 2: Бургер-меню та блокування скролу
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('is-open');
    document.body.classList.toggle('no-scroll');
}

document.getElementById('burger-btn').addEventListener('click', toggleMobileMenu);
document.getElementById('close-menu-btn').addEventListener('click', toggleMobileMenu);

// Закриття меню при кліку на кнопки всередині (Контекстне закриття)
document.querySelectorAll('#mobile-menu button').forEach(btn => {
    btn.addEventListener('click', () => {
        if(document.getElementById('mobile-menu').classList.contains('is-open')) {
            toggleMobileMenu();
        }
    });
});

// Налаштування та теми
document.getElementById('theme-select').addEventListener('change', (e) => {
    document.documentElement.setAttribute('data-theme', e.target.value);
    localStorage.setItem('userTheme', e.target.value);
});

document.getElementById('lang-select').addEventListener('change', (e) => {
    currentLang = e.target.value;
    localStorage.setItem('userLang', currentLang);
    updateUI();
});

// Навігація авторизації
document.getElementById('show-registration-btn').addEventListener('click', () => navigateTo('registration-screen'));
document.getElementById('show-login-btn').addEventListener('click', () => navigateTo('login-screen'));
document.getElementById('back-to-auth-reg-btn').addEventListener('click', () => navigateTo('auth-screen'));
document.getElementById('back-to-auth-login-btn').addEventListener('click', () => navigateTo('auth-screen'));
document.getElementById('guest-btn').addEventListener('click', () => {
    localStorage.setItem('currentUser', 'Guest');
    document.getElementById('user-display-name').textContent = 'Guest';
    navigateTo('app-screen');
});

document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    navigateTo('auth-screen');
});

document.getElementById('settings-btn').addEventListener('click', () => document.getElementById('settings-modal').style.display = 'flex');
document.getElementById('close-settings-btn').addEventListener('click', () => document.getElementById('settings-modal').style.display = 'none');

// ЗАВДАННЯ 1: Анімована кнопка + імітація обробки
document.getElementById('generate').addEventListener('click', function() {
    const originalText = this.textContent;
    this.textContent = interfaceTexts[currentLang].processingText; // Текст "Обробка..."
    this.disabled = true; // Блокуємо кнопку

    // Штучна затримка для демонстрації мікроінтеракції
    setTimeout(() => {
        this.textContent = originalText;
        this.disabled = false;
        generateTasks(); // Викликаємо основну логіку
    }, 800);
});

// Логіка генерації завдань (твоя базова логіка)
function generateTasks() {
    const topic = document.getElementById('topic').value;
    const container = document.getElementById('task-container');
    container.innerHTML = '';
    
    const selectedTasks = tasks[topic].sort(() => 0.5 - Math.random()).slice(0, 3);
    selectedTasks.forEach((t, i) => {
        const div = document.createElement('div');
        div.className = 'task screen';
        div.innerHTML = `<p>${t.q}</p><input type="text" id="ans-${i}" placeholder="...">`;
        container.appendChild(div);
    });

    const btn = document.createElement('button');
    btn.className = 'auth-btn primary-btn';
    btn.textContent = interfaceTexts[currentLang].checkButton;
    btn.onclick = () => {
        let score = 0;
        selectedTasks.forEach((t, i) => {
            const input = document.getElementById(`ans-${i}`);
            if(input.value.toLowerCase().trim() === t.a.toLowerCase()) {
                input.style.borderColor = 'var(--success-color)';
                score++;
            } else {
                input.style.borderColor = 'var(--fail-color)';
            }
        });
        alert(`${interfaceTexts[currentLang].resultTitle.replace('[SCORE]', score).replace('[TOTAL]', 3)}`);
    };
    container.appendChild(btn);
}

// ЗАВДАННЯ 3 та 4: Рендер Словника, Лайки та Фільтри
function initDictionary() {
    const container = document.getElementById('dictionary-container');
    container.innerHTML = '';
    
    // Генеруємо всі картки
    for (const [topic, words] of Object.entries(tasks)) {
        words.forEach(word => {
            const card = document.createElement('div');
            card.className = 'word-card';
            card.setAttribute('data-category', topic); // Атрибут для фільтрації
            
            card.innerHTML = `
                <div class="word-info">
                    <strong>${word.q}</strong><br>
                    <small style="color: var(--secondary-text-color);">${word.a}</small>
                </div>
                <button class="favorite-btn" aria-label="Favorite">
                    <i class="fa-regular fa-heart"></i>
                </button>
            `;
            container.appendChild(card);
        });
    }

    // ЗАВДАННЯ 3: Обробка кліку на сердечко (classList.toggle)
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('is-active'); // Анімація кольору та розміру
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-regular'); // Пусте сердечко
            icon.classList.toggle('fa-solid');   // Зафарбоване сердечко
        });
    });

    // ЗАВДАННЯ 4: Фільтрація контенту (querySelectorAll + forEach)
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Забираємо active у всіх, даємо поточній
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            document.querySelectorAll('.word-card').forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// Ініціалізація теми та текстів при завантаженнии
const savedTheme = localStorage.getItem('userTheme');
if(savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.getElementById('theme-select').value = savedTheme;
}
document.getElementById('lang-select').value = currentLang;

updateUI();
navigateTo('auth-screen');