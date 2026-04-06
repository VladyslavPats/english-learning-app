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
        logoutButton: "Вийти", progressTitle: "Прогрес [USER]: [SCORE]", topicLabel: "Тема:", modeLabel: "Режим:", generateButton: "Згенерувати",
        checkButton: "Перевірити", backButton: "Назад", regUsernamePlaceholder: "Ім'я", regEmailPlaceholder: "Email", regPasswordPlaceholder: "Пароль",
        loginEmailPlaceholder: "Email", loginPasswordPlaceholder: "Пароль", resultTitle: "Результат: [SCORE]/[TOTAL]", timerBase: "Час: [TIME]с", badgeMessage: "Майстер!"
    },
    en: {
        appTitle: "Learn English", welcomeTitle: "Welcome!", registerButton: "Sign Up", loginButton: "Login", guestButton: "Guest",
        logoutButton: "Logout", progressTitle: "Progress [USER]: [SCORE]", topicLabel: "Topic:", modeLabel: "Mode:", generateButton: "Generate",
        checkButton: "Check", backButton: "Back", regUsernamePlaceholder: "Name", regEmailPlaceholder: "Email", regPasswordPlaceholder: "Password",
        loginEmailPlaceholder: "Email", loginPasswordPlaceholder: "Password", resultTitle: "Result: [SCORE]/[TOTAL]", timerBase: "Time: [TIME]s", badgeMessage: "Master!"
    }
};

let currentLang = localStorage.getItem('userLang') || 'uk';
let timerInterval;

function navigateTo(id) {
    document.querySelectorAll('.screen').forEach(s => s.style.display = 'none');
    document.getElementById(id).style.display = 'block';
    document.getElementById('logout-btn').style.display = (id === 'app-screen') ? 'block' : 'none';
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

document.getElementById('burger-btn').addEventListener('click', () => {
    document.querySelector('.header-controls').classList.toggle('active');
});

document.getElementById('theme-select').addEventListener('change', (e) => {
    document.documentElement.setAttribute('data-theme', e.target.value);
    localStorage.setItem('userTheme', e.target.value);
});

document.getElementById('lang-select').addEventListener('change', (e) => {
    currentLang = e.target.value;
    localStorage.setItem('userLang', currentLang);
    updateUI();
});

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

document.getElementById('generate').addEventListener('click', () => {
    const topic = document.getElementById('topic').value;
    const mode = document.getElementById('mode').value;
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
                input.style.borderColor = 'green';
                score++;
            } else {
                input.style.borderColor = 'red';
            }
        });
        alert(`${interfaceTexts[currentLang].resultTitle.replace('[SCORE]', score).replace('[TOTAL]', 3)}`);
    };
    container.appendChild(btn);
});

updateUI();
navigateTo('auth-screen');