console.log('lol kek');

const application = document.getElementById('app');

const config = {
    menu: {
        href: '/menu',
        text: 'Меню!',
        open: menuPage,
    },
    signup: {
        href: '/signup',
        text: 'Зарегистрироваться!',
        open: signupPage,
    },
    login: {
        href: '/login',
        text: 'Авторизоваться!',
        open: loginPage,
    },
    profile: {
        href: '/profile',
        text: 'Профиль',
        open: profilePage,
    },
    about: {
        href: '/about',
        text: 'Контакты',
    }
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

function createHeader() {
    const navbar = document.createElement('nav');
    navbar.classList.add('navbar');

    const logo = document.createElement('div');
    logo.classList.add('logo');
    logo.textContent = '<a>FormHub</a>';

    const profile = document.createElement('div');
    profile.classList.add('profile')

    const image = document.createElement('img')

}


function menuPage() {
    application.innerHTML = '';

    Object
        .entries(config)
        .map(([menuKey, {text, href}]) => {
            const menuItem = document.createElement('a');
            menuItem.href = href;
            menuItem.textContent = text;
            menuItem.dataset.section = menuKey;

            return menuItem;
        })
        .forEach(element => application.appendChild(element))
    ;
}

function signupPage() {
    application.innerHTML = '<h1>Регистрация!</h1>';

    const form = document.createElement('form');

    const emailInput = createInput('email', 'Емайл', 'email');
    const passwordInput = createInput('password', 'Пароль', 'password');
    const ageInput = createInput('number', 'Возраст', 'age');

    const submitBtn = document.createElement('input');
    submitBtn.type = 'submit';
    submitBtn.value = 'Зарегистрироваться!';

    const back = document.createElement('a');
    back.href = '/menu';
    back.textContent = 'Назад';
    back.dataset.section = 'menu';


    form.appendChild(emailInput);
    form.appendChild(passwordInput);
    form.appendChild(ageInput);
    form.appendChild(submitBtn);
    form.appendChild(back);

    application.appendChild(form);
}

function loginPage() {
    application.innerHTML = '';

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

menuPage();

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