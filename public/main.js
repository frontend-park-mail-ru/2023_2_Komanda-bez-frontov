console.log('lol kek');

const application = document.getElementById('app');

const routes = [
    {
        path: '/',
        open: indexPage,
    },
    {
        path: '/signup',
        open: signupPage,
    },
    {
        path: '/login',
        open: loginPage,
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
    if(href != "none") {
        console.log(classname, href, type, text);
        btn.addEventListener('click', function() {
            window.location.href = href;
            routes.find(route => route.path === href).open();
        });
    }

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
    label.textContent = 'Мои опросы';
    const br = document.createElement('br')
    for (let i = 1; i <= 5; i++) {
        const btn = createButton('list-item', 'none', '', 'Мой опрос' + i);
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

    const signupButton = createButton('secondary-button', 'none', 'submit', 'Создать аккаунт')

    buttonContainer.appendChild(signupButton);

    mainContainer.appendChild(nameInput);
    mainContainer.appendChild(surnameInput);
    mainContainer.appendChild(emailInput);
    mainContainer.appendChild(passwordInput);
    mainContainer.appendChild(buttonContainer);

    signupForm.appendChild(label);
    signupForm.appendChild(mainContainer);

    formContainer.appendChild(signupForm);

    signupForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form submission
    
        const name = nameInput.value;
        const surname = surnameInput.value;
        const email = emailInput.value;
        const password = passwordInput.value;
    
        const data = {
            name: name,
            surname: surname,
            email: email,
            password: password
        };
    
        fetch("https://b0f0-109-252-180-89.ngrok-free.app/api/v1/signup", {
            method: "POST",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then((response) => {
            if (!response.ok) {
                throw new Error("Error: " + response.status);
            } else {
                console.log("Redirect will go here.")
            }
            return response.json();
        }).then((responseData) => {
            console.log(responseData); // Handle the response data
        }).catch((error) => {
            console.error(error); // Handle any errors
        });
    });

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

    const loginButton = createButton('secondary-button', 'none', 'submit', 'Войти')
    const signupButton = createButton('primary-button', '/signup', 'none', 'Регистрация')

    buttonContainer.appendChild(loginButton);
    buttonContainer.appendChild(signupButton);

    mainContainer.appendChild(emailInput);
    mainContainer.appendChild(passwordInput);
    mainContainer.appendChild(buttonContainer);

    loginForm.appendChild(label);
    loginForm.appendChild(mainContainer);

    formContainer.appendChild(loginForm);

    application.appendChild(formContainer);
}

window.addEventListener('DOMContentLoaded', function() {
    application.innerHTML = "";
    let route = routes.find(route => route.path === window.location.pathname);
    console.log(route.path)
    route.open();
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