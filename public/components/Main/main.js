import {API} from '../../modules/api.js';
import {navbar} from "../Navbar/navbar.js";
import {renderMessage, removeMessage} from "../Message/message.js";
import {goToPage, ROUTES} from "../../config.js";


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

export async function renderMainLogout() {
    window.history.replaceState(ROUTES.forms.state,'', ROUTES.forms.url)

    removeMessage();
    const rootElement = document.querySelector("#root");
    const api = new API();
    const logoutStatus = await api.userLogout();

    navbar();
    if (logoutStatus === 404) {
        renderMessage('Невозможно выполнить Logout - вы не авторизованы!', true);
        return;
    }
    renderMessage('Вы не авторизованы!', true);
    goToPage(ROUTES.forms);
}
