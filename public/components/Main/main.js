import {API} from '../../modules/api.js';
import {navbar} from "../Navbar/navbar.js";
import {renderMessage} from "../Message/message.js";


export async function renderMain() {
    const rootElement = document.querySelector("#root");

    const api = new API();
    const isAuth = await api.isAuth();
    if (!isAuth.isAuthorized) {
        navbar();
        rootElement.innerHTML = Handlebars.templates['main']();
        renderMessage('Вы не авторизованы!', true);
        return;
    }

    navbar({user: {username: isAuth.authorizedUserEmail}})
    rootElement.innerHTML = "";

}