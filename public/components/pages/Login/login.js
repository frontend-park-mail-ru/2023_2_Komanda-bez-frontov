'use strict';

import {ROUTES, goToPage} from "../../../config.js";
import {API} from "../../../modules/api.js";
import {renderMessage, removeMessage} from "../../Message/message.js";
import {navbar} from "../../Navbar/navbar.js";
import {emailValidation, passwordValidation} from "../../../modules/validation.js";

/**
 * Функция для рендеринга страницы аутенфикации.
 *
 * @async
 * @function
 * @return {void}
 */
export async function renderLogin() {
    removeMessage();

    const rootElement = document.querySelector("#root");
    rootElement.innerHTML = '';
    rootElement.innerHTML = Handlebars.templates['login']();

    const loginButton = document.querySelector("#login-button");
    const signupButton = document.querySelector("#signup-button");

    loginButton.addEventListener("click",async (e) => {
        e.preventDefault();
        const api = new API();
        const isAuth = await api.isAuth();
        if (isAuth.isAuthorized) {
            renderMessage('Невозможно выполнить вход. Завершите предыдущую сессию!', true);
            return;
        }

        const email =  document.querySelector("#email");
        const password = document.querySelector("#password");

        const isEmailValid = emailValidation(email.value);
        const isPasswordValid = passwordValidation(password.value);

        if(!isEmailValid.valid) {
            renderMessage(isEmailValid.message, true);
            return;
        }

        if(!isPasswordValid.valid) {
            renderMessage(isPasswordValid.message, true);
            return;
        }

        const res = await api.userLogin(email.value, password.value);
        if (!res.isLoggedIn) {
            renderMessage("Неправильный логин или пароль", true);
            return;
        }

        const user = {user: {name: res.authorizedUser.name}}
        goToPage(ROUTES.index);
        navbar(user);
        renderMessage('Вы успешно вошли');
    });

    signupButton.addEventListener('click', (e) => {
        goToPage(ROUTES.signup);
    });

}
