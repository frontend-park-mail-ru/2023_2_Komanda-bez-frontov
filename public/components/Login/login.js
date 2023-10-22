import {ROUTES, goToPage} from "../../config.js";
import {API} from "../../modules/api.js";
import {renderMessage} from "../Message/message.js";
import {navbar} from "../Navbar/navbar.js";

//добавить валидацию
export function renderLogin() {
    const rootElement = document.querySelector("#root");
    rootElement.innerHTML = '';
    rootElement.innerHTML = Handlebars.templates['login']();

    const loginButton = document.querySelector("#login-button");
    loginButton.addEventListener("click", async function (e) {
        e.preventDefault();
        const api = new API();

        const email =  document.querySelector("#email");
        const password = document.querySelector("#password");

        const res = await api.userLogin(email.value.trim(), password.value);
        if (!res.isLoggedIn) {
            renderMessage("Неправильный логин или пароль.", true);
            goToPage(ROUTES.login);
            return;
        }

        const user = {user: {username: res.username}}
        navbar(user);
        renderMessage('Вы успешно вошли!');
        goToPage(ROUTES.main);
    });
}