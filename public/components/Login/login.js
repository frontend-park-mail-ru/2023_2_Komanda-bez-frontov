import {ROUTES, goToPage} from "../../config.js";
import {API} from "../../modules/api.js";
import {renderMessage} from "../Message/message.js";
import {navbar} from "../Navbar/navbar.js";
import {emailValidation, passwordValidation} from "../../modules/validation.js";

//добавить валидацию
export async function renderLogin() {
    const rootElement = document.querySelector("#root");
    rootElement.innerHTML = '';
    rootElement.innerHTML = Handlebars.templates['login']();

    const loginButton = document.querySelector("#login-button");
    const signupButton = document.querySelector("#signup-button");

    loginButton.addEventListener("click",async (e) => {
        e.preventDefault();
        const api = new API();

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
        goToPage(ROUTES.main);
        navbar(user);
        renderMessage('Вы успешно вошли');
    });

    signupButton.addEventListener('click', (e) => {
        goToPage(ROUTES.signup);
    });

    // Не работает...
    // const backButton = document.querySelector("#back-button");
    // backButton.addEventListener("click", function (e) {
    //     window.history.back()
    // });
}
