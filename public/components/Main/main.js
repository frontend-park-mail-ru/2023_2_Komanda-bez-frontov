'use strict';

import {API} from '../../modules/api.js';
import {navbar} from "../Navbar/navbar.js";
import {renderMessage, removeMessage} from "../Message/message.js";
import {goToPage, ROUTES} from "../../config.js";


/**
 * Функция для рендеринга главной страницы.
 *
 * @async
 * @function
 * @return {void}
 */
export async function renderMain() {
    removeMessage();
    const rootElement = document.querySelector("#root");

    const api = new API();
    const isAuth = await api.isAuth();
    if (!isAuth.isAuthorized) {
        navbar();
        renderMessage('Вы не авторизованы!', true);
        return;
    }

    navbar({user: {name: isAuth.authorizedUser.name}})
    rootElement.innerHTML = "";
}
