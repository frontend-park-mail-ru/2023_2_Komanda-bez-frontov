import {ROUTES} from '../../../config.js';
import {API} from '../../../modules/api.js';
import {renderMessage, removeMessage} from '../../Message/message.js';
import {emailValidation, passwordValidation} from '../../../modules/validation.js';
import {goToPage} from '../../../modules/router.js';
import {STORAGE, getAuthAvatar} from '../../../modules/storage.js';
import {toggleFunc} from "../Signup/signup.js";

/**
 * Функция для рендеринга страницы аутенфикации.
 *
 * @async
 * @function
 * @return {void}
 */
export const renderLogin = async () => {
  removeMessage();

  const rootElement = document.querySelector('#root');
  rootElement.innerHTML = '';
  rootElement.innerHTML = Handlebars.templates.login();

  const loginButton = document.querySelector('#login-button');
  const signupButton = document.querySelector('#signup-button');
  const showPasswordButton = document.querySelector('#login-form_container__input-show-button');
  showPasswordButton.addEventListener('click',  () => {
    const password = document.querySelector('#password');
    const icon = document.querySelector('#login-form_container__input-show-button-icon');

    toggleFunc(password, icon);

  });

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

    try {
      const api = new API();
      const res = await api.userLogin(email.value, password.value);
      if (res.message !== 'ok') {
        renderMessage(res.message, true);
        return;
      }

      STORAGE.user = res.authorizedUser;
      await getAuthAvatar();

      goToPage(ROUTES.forms);
      renderMessage('Вы успешно вошли');
    } catch (err) {
      if (err.toString() !== 'TypeError: Failed to fetch') {
        renderMessage('Ошибка сервера. Попробуйте позже', true);
        return;
      }
      renderMessage('Потеряно соединение с сервером', true);
    }
  });

  signupButton.addEventListener('click', () => {
    goToPage(ROUTES.signup);
  });
};
