import {API} from '../../modules/api.js';
import {navbar} from "../Navbar/navbar.js";
import {renderMessage, removeMessage} from "../Message/message.js";
import {renderForms} from "../Forms/forms.js";


export async function renderMain() {
    removeMessage();
    const rootElement = document.querySelector("#root");

    const api = new API();
    const isAuth = await api.isAuth();
    if (!isAuth.isAuthorized) {
        navbar();
        rootElement.innerHTML = Handlebars.templates['main']();
        renderMessage('Вы не авторизованы!', true);
        return;
    }

    navbar({user: {name: isAuth.authorizedUser.name}})
    rootElement.innerHTML = "";
}

export async function renderMainLogout() {
    removeMessage();
    const rootElement = document.querySelector("#root");
    const api = new API();
    const logoutStatus = await api.userLogout();

    navbar();
    rootElement.innerHTML = Handlebars.templates['main']();
    if (logoutStatus === 404) {
        renderMessage('Невозможно выполнить Logout - вы не авторизованы!', true);
        return;
    }
    renderMessage('Вы не авторизованы!', true);
    renderForms();
}
