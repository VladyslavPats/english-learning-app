let globalTasks = []; // Глобальний масив для зберігання завантажених даних з JSON

const interfaceTexts = {
    uk: {
        appTitle: "Вивчення англійської", welcomeTitle: "Привіт!", registerButton: "Реєстрація", loginButton: "Вхід", guestButton: "Гість",
        logoutButton: "Вийти", progressTitle: "Прогрес", topicLabel: "Тема:", modeLabel: "Режим:", generateButton: "Старт",
        checkButton: "Перевірити", backButton: "Назад", regUsernamePlaceholder: "Ім'я", regEmailPlaceholder: "Email", regPasswordPlaceholder: "Пароль",
        loginEmailPlaceholder: "Email", loginPasswordPlaceholder: "Пароль", resultTitle: "Результат: [SCORE]/[TOTAL]", 
        topicFood: "Їжа", topicTravel: "Подорожі", topicTechnology: "IT", topicSport: "Спорт", topicNature: "Природа",
        processingText: "Обробка...", dictionaryTitle: "Словник", filterAll: "Всі",
        loadingText: "Завантаження даних...", errorFetch: "Вибачте, дані тимчасово недоступні. Спробуйте оновити сторінку."
    },
    en: {
        appTitle: "Learn English", welcomeTitle: "Welcome!", registerButton: "Sign Up", loginButton: "Login", guestButton: "Guest",
        logoutButton: "Logout", progressTitle: "Progress", topicLabel: "Topic:", modeLabel: "Mode:", generateButton: "Start",
        checkButton: "Check", backButton: "Back", regUsernamePlaceholder: "Name", regEmailPlaceholder: "Email", regPasswordPlaceholder: "Password",
        loginEmailPlaceholder: "Email", loginPasswordPlaceholder: "Password", resultTitle: "Result: [SCORE]/[TOTAL]",
        topicFood: "Food", topicTravel: "Travel", topicTechnology: "IT", topicSport: "Sport", topicNature: "Nature",
        processingText: "Processing...", dictionaryTitle: "Vocabulary", filterAll: "All",
        loadingText: "Loading data...", errorFetch: "Sorry, data is temporarily unavailable. Try refreshing the page."
    }
};

let currentLang = localStorage.getItem('userLang') || 'uk';

function navigateTo(id) {
    document.querySelectorAll('.screen').forEach(s => s.style.display = 'none');
    document.getElementById(id).style.display = 'block';
    document.getElementById('logout-btn').style.display = (id === 'app-screen') ? 'block' : 'none';
    
    // При переході в додаток - викликаємо асинхронне завантаження (Завдання 2)
    if (id === 'app-screen') loadData();
}

function updateUI() {
    const texts = interfaceTexts[currentLang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if(texts[key]) el.innerHTML = el.querySelector('i') ? el.querySelector('i').outerHTML + ' ' + texts[key] : texts[key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if(texts[key]) el.placeholder = texts[key];
    });
}

// ЗАВДАННЯ 2: Асинхронне отримання даних з JSON та обробка помилок
async function loadData() {
    const container = document.getElementById('dictionary-container');
    const loader = document.getElementById('loader');
    const errorMsg = document.getElementById('error-message');
    
    // Очищення перед завантаженням та показ лоадера
    container.innerHTML = '';
    errorMsg.style.display = 'none';
    loader.style.display = 'block';

    try {
        // Штучна затримка на 1 секунду, щоб викладач побачив анімацію лоадера
        await new Promise(resolve => setTimeout(resolve, 1000)); 

        const response = await fetch('data.json');
        
        // Перевірка статусу
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const dataArray = await response.json();
        globalTasks = dataArray; // Зберігаємо дані для генератора завдань
        
        renderCards(dataArray); // Виклик функції рендерингу (Завдання 3)

    } catch (error) {
        // Обробка помилок (UX)
        console.error("Помилка завантаження бази даних:", error);
        errorMsg.textContent = interfaceTexts[currentLang].errorFetch;
        errorMsg.style.display = 'block';
    } finally {
        // Гарантоване приховування лоадера
        loader.style.display = 'none';
    }
}

// ЗАВДАННЯ 3: Динамічний рендеринг за допомогою шаблонних рядків
function renderCards(dataArray) {
    const container = document.getElementById('dictionary-container');
    container.innerHTML = ''; // Очищення контейнера

    // Ітерація масиву та генерація HTML
    dataArray.forEach(item => {
        const cardHTML = `
            <div class="word-card" data-category="${item.topic}">
                <div class="word-info">
                    <strong>${item.q}</strong><br>
                    <small style="color: var(--secondary-text-color);">${item.a}</small>
                </div>
                <button class="favorite-btn" aria-label="Favorite">
                    <i class="fa-regular fa-heart"></i>
                </button>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', cardHTML);
    });

    // Після рендеру потрібно заново повісити події на нові сердечка
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('is-active'); 
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-regular'); 
            icon.classList.toggle('fa-solid');   
        });
    });
}

// Логіка генерації завдань (Оновлена для роботи з глобальним масивом)
function generateTasks() {
    const topic = document.getElementById('topic').value;
    const container = document.getElementById('task-container');
    container.innerHTML = '';
    
    // Фільтруємо глобальний масив по обраній темі
    const filteredTasks = globalTasks.filter(t => t.topic === topic);
    const selectedTasks = filteredTasks.sort(() => 0.5 - Math.random()).slice(0, 3);
    
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
        alert(`${interfaceTexts[currentLang].resultTitle.replace('[SCORE]', score).replace('[TOTAL]', selectedTasks.length)}`);
    };
    container.appendChild(btn);
}

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

// Бургер меню
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('is-open');
    document.body.classList.toggle('no-scroll');
}
document.getElementById('burger-btn').addEventListener('click', toggleMobileMenu);
document.getElementById('close-menu-btn').addEventListener('click', toggleMobileMenu);
document.querySelectorAll('#mobile-menu button').forEach(btn => {
    btn.addEventListener('click', () => {
        if(document.getElementById('mobile-menu').classList.contains('is-open')) toggleMobileMenu();
    });
});

// Кнопка Старт
document.getElementById('generate').addEventListener('click', function() {
    const originalText = this.textContent;
    this.textContent = interfaceTexts[currentLang].processingText; 
    this.disabled = true; 
    setTimeout(() => {
        this.textContent = originalText;
        this.disabled = false;
        generateTasks(); 
    }, 800);
});

// Фільтрація словника
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
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

// Ініціалізація
const savedTheme = localStorage.getItem('userTheme');
if(savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.getElementById('theme-select').value = savedTheme;
}
document.getElementById('lang-select').value = currentLang;

updateUI();
navigateTo('auth-screen');