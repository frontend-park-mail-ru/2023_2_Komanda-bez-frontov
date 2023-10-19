console.log('lol kek');

const application = document.getElementById('app');
// в user хранится текущий авторизированный пользователь. если случился logout, user должен быть очищен
let user;

const routes = [
    {
        path: '/index',
        open: renderIndex,
    },
    {
        path: '/signup',
        open: returnSignup,
    },
    {
        path: '/login',
        open: renderLogin,
    }
]

function createInput(type, text, name) {
    const input = document.createElement('input');
    input.type = type;
    input.name = name;
    input.placeholder = text;

    return input;
}

function createButton(classname, href, type, text) {
    const btn = document.createElement('button');
    btn.classList.add(classname);
    btn.type = type;
    btn.textContent = text;
    if(href !== "none") {
        console.log(classname, href, type, text);
        btn.addEventListener('click', function() {
            goToPage('/signup')
        });
    }

    return btn;
}

function createMessagesBox(message) {
    if (message === undefined) {
        return null;
    }

    const messageContainer = document.createElement('div');
    const messageText = document.createElement('p');

    JSON.parse(message, function (key, value) {
        if (key === "error") {
            messageContainer.classList.add("error-container");
            messageText.textContent = value;
        } else {
            if (key === "message") {
                messageContainer.classList.add("message-container");
                messageText.textContent = value;
            }
        }
    });
    messageContainer.appendChild(messageText);
    return messageContainer;
}

function createNavbar() {
    const navbar = document.createElement('nav');
    navbar.classList.add('navbar');

    const logo = document.createElement('div');
    logo.classList.add('logo');
    const logoText = document.createElement('a');
    logoText.textContent = 'FormHub';

    const profile = document.createElement('div');
    profile.classList.add('profile')

    if (user) {
        const profName = document.createElement('a');
        profName.classList.add('profile_name');
        profName.textContent = user.name;
        profile.appendChild(profName);
    }

    logo.appendChild(logoText);
    navbar.appendChild(logo);
    navbar.appendChild(profile)

    return navbar;
}


function renderIndex(message) {
    application.innerHTML = '';

    const navbarWrapper  = document.createElement('div');

    const listForm = document.createElement('div')
    listForm.classList.add('list-form');

    const mainContainer = document.createElement('div')

    const label = document.createElement('h3')
    label.textContent = 'Мои опросы';
    const br = document.createElement('br')

    ajax(
        'GET',
        '/index',
        null,
        (status, response) => {
            let isAuthorized = false;

            if (status === 200) {
                isAuthorized = true;
                user = JSON.parse(response).currentUser;
                const navbar = createNavbar();
                navbarWrapper.appendChild(navbar)
                for (let i = 1; i <= 5; i++) {
                    const btn = createButton('list-item', 'none', '', 'Мой опрос' + i);
                    mainContainer.appendChild(btn);
                }
            }

            if (!isAuthorized) {
                goToPage("/login", response);
            }
        }
    );

    application.appendChild(navbarWrapper);

    const messageBox = createMessagesBox(message);
    if (messageBox !== null) {
        application.appendChild(messageBox);
    }

    listForm.appendChild(label);
    listForm.appendChild(br);
    listForm.appendChild(mainContainer);

    return listForm
}

function returnSignup(message) {
    application.innerHTML = '';
    const navbar = createNavbar();
    application.appendChild(navbar);

    const messageBox = createMessagesBox(message);
    if (messageBox !== null) {
        application.appendChild(messageBox);
    }

    const formContainer = document.createElement('div')
    formContainer.classList.add('container')

    const signupForm = document.createElement('form');
    signupForm.classList.add('signup-form')

    const mainContainer = document.createElement('div')

    const label = document.createElement('h3')
    label.textContent = 'Регистрация';

    const nameInput = createInput('text', 'Имя', 'name');
    const usernameInput = createInput('text', 'Имя пользователя', 'username');
    const emailInput = createInput('email', 'Почта', 'email');
    const passwordInput = createInput('password', 'Пароль', 'password');
    const repeatPasswordInput = createInput('password', 'Повторите пароль', 'password');

    const buttonContainer = document.createElement('div')
    buttonContainer.classList.add('button-container')

    const signupButton = createButton('primary-button', 'none', 'submit', 'Создать аккаунт')

    buttonContainer.appendChild(signupButton);

    mainContainer.appendChild(nameInput);
    mainContainer.appendChild(usernameInput);
    mainContainer.appendChild(emailInput);
    mainContainer.appendChild(passwordInput);
    mainContainer.appendChild(repeatPasswordInput);
    mainContainer.appendChild(buttonContainer);

    signupForm.appendChild(label);
    signupForm.appendChild(mainContainer);

    formContainer.appendChild(signupForm);

    signupForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = nameInput.value;
        const username = usernameInput.value;
        const email = emailInput.value;
        const password = passwordInput.value;
        const repeat_password = repeatPasswordInput.value;

        ajax(
            'POST',
            '/signup',
            {name, username, email, password, repeat_password},
            (status, responseString) => {
                if (status === 201) {
                    goToPage('/index', responseString, email);
                    return;
                }

                if (status === 400) {
                    goToPage('/signup', responseString, null);
                    return;
                }
            }
        )
    });
    
    return formContainer
}

function renderLogin(message) {
    application.innerHTML = '';
    const navbar = createNavbar();
    application.appendChild(navbar);

    const messageBox = createMessagesBox(message);
    if (messageBox !== null) {
        application.appendChild(messageBox);
    }

    const formContainer = document.createElement('div');
    formContainer.classList.add('container');

    const loginForm = document.createElement('form');
    loginForm.classList.add('login-form');

    const mainContainer = document.createElement('div');

    const label = document.createElement('h3');
    label.textContent = 'Вход';
    const br = document.createElement('br')
    const emailInput = createInput('email', 'Почта', 'email');
    const passwordInput = createInput('password', 'Пароль', 'password');

    const buttonContainer = document.createElement('div')
    buttonContainer.classList.add('button-container')

    const loginButton = createButton('secondary-button', 'none', 'submit', 'Войти')
    const signupButton = createButton('primary-button', '/signup', 'none', 'Регистрация')

    buttonContainer.appendChild(loginButton);
    buttonContainer.appendChild(signupButton);

    mainContainer.appendChild(emailInput);
    mainContainer.appendChild(passwordInput);
    mainContainer.appendChild(buttonContainer);

    loginForm.appendChild(label);
    loginForm.appendChild(br);
    loginForm.appendChild(mainContainer);

    formContainer.appendChild(loginForm);

    formContainer.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        ajax(
            'POST',
            '/login',
            {password, email},
            (status, response) => {
                if (status === 200) {
                    user = JSON.parse(response).currentUser;
                    goToPage('/index', response.toString());
                    return;
                }

                if (status === 401) {
                    goToPage('/login', response.toString(), null)
                }
            }
        )
    });

    return formContainer
}

function ajax(method, url, body = null, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.withCredentials = true;

    xhr.addEventListener('readystatechange', function() {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;

        callback(xhr.status, xhr.response);
    });

    if (body) {
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf8');
        xhr.send(JSON.stringify(body));
        return;
    }

    xhr.send();
}

function goToPage(href, message) {
    application.innerHTML = '';
    const resultPage = routes.find(route => route.path === href).open(message);
    application.appendChild(resultPage)
}

const mainPage = renderIndex()
application.appendChild(mainPage)
