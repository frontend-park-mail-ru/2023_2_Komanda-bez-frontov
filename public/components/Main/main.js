import {API} from '../../modules/api.js';
import {navbar} from "../Navbar/navbar.js";
import {renderMessage} from "../Message/message.js";

const api = new API();
const isAuth = await api.isAuth();

export function renderMain() {
    if (isAuth.isAuthorized) {
        navbar({user: {username: isAuth.username}});
    } else {
        navbar();
        const rootElement = document.querySelector("#root");
        rootElement.innerHTML = Handlebars.templates['main']();
        renderMessage('Вы не авторизованы!', true);
    }
}