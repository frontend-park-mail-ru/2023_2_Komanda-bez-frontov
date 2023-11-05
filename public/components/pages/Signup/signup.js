'use strict';

import {ROUTES, goToPage} from "../../../config.js";
import {API} from "../../../modules/api.js";
import {renderMessage, removeMessage} from "../../Message/message.js";
import {navbar} from "../../Navbar/navbar.js";
import {emailValidation, passwordValidation, usernameValidation} from "../../../modules/validation.js";

/**
 * Функция для рендеринга страницы регистрации.
 *
 * @async
 * @function
 * @return {void}
 */
export async function renderSignup() {
    removeMessage();
    const rootElement = document.querySelector("#root");
    rootElement.innerHTML = '';
    rootElement.innerHTML = Handlebars.templates['signup']();


    const signupButton = document.querySelector('#signup-button');
    signupButton.addEventListener('click', async(e) => {
        e.preventDefault();
        const api = new API();
        const isAuth = await api.isAuth();
        if (isAuth.isAuthorized) {
            renderMessage('Невозможно зарегистрироваться. Завершите предыдущую сессию!', true);
            return;
        }

        const name = document.querySelector('#name');
        const email = document.querySelector("#email");
        const username = document.querySelector('#username');
        const password = document.querySelector("#password");
        const repeatPassword = document.querySelector("#repeat_password");

        if (password.value === '' || email.value === '' || name.value === ''
            || username.value === '' || repeatPassword.value === '') {
            renderMessage("Вы ввели не все данные", true);
            return;
        }

        const isEmailValid = emailValidation(email.value);
        const isUsernameValid = usernameValidation(username.value);
        const isPasswordValid = passwordValidation(password.value);

        if(!isEmailValid.valid) {
            renderMessage(isEmailValid.message, true);
            return;
        }

        if(!isUsernameValid.valid) {
            renderMessage(isUsernameValid.message, true);
            return;
        }

        if(!isPasswordValid.valid) {
            renderMessage(isPasswordValid.message, true);
            return;
        }

        if (password.value !== repeatPassword.value) {
            renderMessage("Пароли не совпадают", true);
            return;
        }

        const res = await api.userSignup(name.value, username.value,
                                                        email.value, password.value);

        if (res.status === 400) {
            renderMessage("Пользователь уже существует", true);
            return;
        }

        const user = {user: {name: res.registeredUser.name}};
        goToPage(ROUTES.forms);
        navbar(user);
        renderMessage('Вы успешно зарегистрировались');
    });

    const loginButton = document.querySelector('#login-button');
    loginButton.addEventListener('click', (e) => {
       goToPage(ROUTES.login);
    });

}