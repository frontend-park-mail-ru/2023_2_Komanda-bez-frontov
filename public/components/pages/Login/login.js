import {ROUTES} from '../../../config.js';
import {API} from '../../../modules/api.js';
import {renderMessage, removeMessage} from '../../Message/message.js';
import {navbar} from '../../Navbar/navbar.js';
import {emailValidation, passwordValidation} from '../../../modules/validation.js';
import {goToPage} from "../../../modules/router.js";

/**
 * Функция для рендеринга страницы аутенфикации.
 *
 * @async
 * @function
 * @return {void}
 */
export async function renderLogin() {
  removeMessage();

  const rootElement = document.querySelector('#root');
  rootElement.innerHTML = '';
  rootElement.innerHTML = Handlebars.templates.login();

  const loginButton = document.querySelector('#login-button');
  const signupButton = document.querySelector('#signup-button');

  loginButton.addEventListener('click', async (e) => {
    e.preventDefault();

    const email = document.querySelector('#email');
    const password = document.querySelector('#password');

    const isEmailValid = emailValidation(email.value);
    const isPasswordValid = passwordValidation(password.value);

    if (!isEmailValid.valid) {
      renderMessage(isEmailValid.message, true);
      return;
    }

    if (!isPasswordValid.valid) {
      renderMessage(isPasswordValid.message, true);
      return;
    }

    const api = new API();
    const res = await api.userLogin(email.value, password.value);
    if (res.message !== 'ok') {
      renderMessage(res.message, true);
      return;
    }

    const user = {
      user: {
        id: res.authorizedUser.id,
        first_name: res.authorizedUser.first_name,
        username: res.authorizedUser.username,
        email: res.authorizedUser.email,
      }
    };
    goToPage(ROUTES.main);
    navbar(user);
    renderMessage('Вы успешно вошли');
  });

  signupButton.addEventListener('click', () => {
    goToPage(ROUTES.signup);
  });
}
