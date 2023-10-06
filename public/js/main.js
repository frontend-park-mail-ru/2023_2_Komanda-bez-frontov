console.log('lol kek');

const application = document.getElementById('app');

const config = {
    menu: {
        href: '/',
        text: 'Лента',
        open: indexPage,
    },
    signup: {
        href: '/signup',
        text: 'Регистрация',
        open: signupPage,
    },
    login: {
        href: '/login',
        text: 'Авторизация',
        open: loginPage,
    },
}

function createInput(type, text, name) {
    const input = document.createElement('input');
    input.type = type;
    input.name = name;
    input.placeholder = text;

    return input;
}

function createButton(classname, type, text) {
    const btn = document.createElement('button');
    btn.classList.add(classname);
    btn.type = type;
    btn.textContent = text;

    return btn;
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

    const image = document.createElement('img')
    image.classList.add('profile_pic');
    image.src = '../resources/images/profile_default.png';
    const profName = document.createElement('a');
    profName.classList.add('profile_name');
    profName.textContent = 'Ваше Имя';

    profile.appendChild(image);
    profile.appendChild(profName);
    logo.appendChild(logoText);
    navbar.appendChild(logo);
    navbar.appendChild(profile)

    return navbar;
}


function indexPage() {
    application.innerHTML = '';
    const navbar = createNavbar();
    application.appendChild(navbar);

    const listContainer = document.createElement('div')
    listContainer.classList.add('list-container');
    const mainContainer = document.createElement('div')
    mainContainer.classList.add('main-container');

    const label = document.createElement('h3')
    label.textContent = 'Популярные опросы';
    const br = document.createElement('br')
    for (let i = 1; i <= 10; i++) {
        const btn = createButton('list-item', '', 'Мой опрос'+i);
        mainContainer.appendChild(btn);
    }

    listContainer.appendChild(label);
    listContainer.appendChild(br);
    listContainer.appendChild(mainContainer);

    application.appendChild(listContainer);
}

function signupPage() {
    application.innerHTML = '';
    const navbar = createNavbar();
    application.appendChild(navbar);

    const formContainer = document.createElement('div')
    formContainer.classList.add('form-container')
    const signupForm = document.createElement('form');
    signupForm.classList.add('signup-form')
    const mainContainer = document.createElement('div')
    mainContainer.classList.add('main-container')

    const label = document.createElement('h3')
    label.textContent = 'Регистрация';

    const nameInput = createInput('text', 'Имя', 'name');
    const surnameInput = createInput('text', 'Фамилия', 'surname');
    const emailInput = createInput('email', 'Почта', 'email');
    const passwordInput = createInput('password', 'Пароль', 'password');

    const buttonContainer = document.createElement('div')
    buttonContainer.classList.add('button-container')

    const signupButton = createButton('secondary-button', 'submit', 'Создать аккаунт')

    buttonContainer.appendChild(signupButton);

    mainContainer.appendChild(nameInput);
    mainContainer.appendChild(surnameInput);
    mainContainer.appendChild(emailInput);
    mainContainer.appendChild(passwordInput);
    mainContainer.appendChild(buttonContainer);

    signupForm.appendChild(label);
    signupForm.appendChild(mainContainer);

    formContainer.appendChild(signupForm);

    application.appendChild(formContainer)
}

function loginPage() {
    application.innerHTML = '';
    const navbar = createNavbar();
    application.appendChild(navbar);

    const formContainer = document.createElement('div')
    formContainer.classList.add('form-container')
    const loginForm = document.createElement('form');
    loginForm.classList.add('login-form')
    const mainContainer = document.createElement('div')
    mainContainer.classList.add('main-container')

    const label = document.createElement('h3')
    label.textContent = 'Вход';

    const emailInput = createInput('email', 'Почта', 'email');
    const passwordInput = createInput('password', 'Пароль', 'password');

    const buttonContainer = document.createElement('div')
    buttonContainer.classList.add('button-container')

    const loginButton = createButton('secondary-button', 'submit', 'Войти')
    const signupButton = createButton('primary-button', 'none', 'Регистрация')

    buttonContainer.appendChild(loginButton);
    buttonContainer.appendChild(signupButton);

    mainContainer.appendChild(emailInput);
    mainContainer.appendChild(passwordInput);
    mainContainer.appendChild(buttonContainer);

    loginForm.appendChild(label);
    loginForm.appendChild(mainContainer);

    formContainer.appendChild(loginForm);

    loginForm.addEventListener('submit', (evt) => {
        evt.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        ajax(
            'POST',
            '/login',
            {email, password},
            (status, response) => {
                if (status === 200) {
                    profilePage();
                } else {
                    const {error} = JSON.parse(response);
                    alert(error);
                }
            }
        )

    });

    application.appendChild(formContainer);
}

function profilePage() {
    application.innerHTML = '';

    ajax('GET', '/me', null, (status, responseText) => {
        let isAuthorized = false;

        if (status === 200) {
            isAuthorized = true;
        }

        if (status === 401) {
            isAuthorized = false;
        }


        if (isAuthorized) {
            const responseBody = JSON.parse(responseText);

            const span = document.createElement('span');
            span.innerHTML = `Мне ${responseBody.age} и я крутой на ${responseBody.score} очков`;


            application.appendChild(span);

            const back = document.createElement('a');
            back.href = '/menu';
            back.textContent = 'Назад';
            back.dataset.section = 'menu';

            application.appendChild(back);


            const {images} = responseBody;

            if (images && Array.isArray(images)) {
                const div = document.createElement('div');
                application.appendChild(div);

                images.forEach((imageSrc) => {
                    div.innerHTML += `<img src="${imageSrc}" width="400" />`;
                });
            }

            return;
        }


        alert('АХТУНГ! НЕТ АВТОРИЗАЦИИ');

        loginPage();
    });
}

signupPage();

application.addEventListener('click', e => {
    const {target} = e;

    if (target instanceof HTMLAnchorElement) {
        e.preventDefault();
        config[target.dataset.section].open();
    }
});

function ajax(method, url, body = null, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.withCredentials = true;

    xhr.addEventListener('readystatechange', function() {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;

        callback(xhr.status, xhr.responseText);
    });

    if (body) {
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf8');
        xhr.send(JSON.stringify(body));
        return;
    }

    xhr.send();
}