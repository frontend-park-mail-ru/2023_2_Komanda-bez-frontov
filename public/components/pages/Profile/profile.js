'use strict'

import {API} from '../../../modules/api.js';
import {goToPage, ROUTES} from "../../../config.js";
import {removeMessage, renderMessage} from "../../Message/message.js";
import {navbar} from "../../Navbar/navbar.js";

/**
 * Функция для рендеринга страницы профиля авторизированного пользователя.
 * Если пользователь не авторизован, происходит редирект на страницу входа.
 *
 * @async
 * @function
 * @return {void}
 */
export async function renderProfile() {
    const api = new API();
    const isAuth = await api.isAuth();
    if (!isAuth.isAuthorized) {
        navbar();
        goToPage(ROUTES.login)
        renderMessage('Вы не авторизованы!', true);
        return;
    }

    removeMessage();
    const rootElement = document.querySelector("#root");
    rootElement.innerHTML = '';
    rootElement.innerHTML = Handlebars.templates['profile']();

    const user = isAuth.authorizedUser;
    const name = document.querySelector("#profile-page-name");
    name.textContent = user.name;
    const username = document.querySelector("#profile-page-username");
    username.textContent = user.username;
    const email = document.querySelector("#profile-page-email");
    email.textContent = user.email;

    // const settingButton = document.querySelector("#profile-settings-button");
    // settingButton.textContent = res.forms[id].title;
    // settingButton.addEventListener("click", function (e) {
    //     goToPage(ROUTES.settings);
    // });
    const formsButton = document.querySelector("#profile-forms-button");
    formsButton.addEventListener("click", function (e) {
        goToPage(ROUTES.forms);
    });
    // const historyButton = document.querySelector("#profile-history-button");
    // historyButton.addEventListener("click", function (e) {
    //     goToPage(ROUTES.history);
    // });
}
