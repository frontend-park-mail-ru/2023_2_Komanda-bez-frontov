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

  let isEmailValid = true;
  let isPasswordValid = true;

  const email = document.querySelector('#email');
  const password = document.querySelector('#password');

  email.addEventListener("input", (e) => {
    e.preventDefault();

    const emailValid = emailValidation(e.target.value);

    if (emailValid.valid) {
      removeMessage();
      isEmailValid = true;
    } else {
      renderMessage(emailValid.message, true);
      isEmailValid = false;
    }
  });

  password.addEventListener("input", (e) => {
    e.preventDefault();

    const passwordValid = passwordValidation(e.target.value);

    if (passwordValid.valid) {
      removeMessage();
      isPasswordValid = true;
    } else {
      renderMessage(passwordValid.message, true);
      isPasswordValid = false;
    }
  });

  loginButton.addEventListener('click', async (e) => {
    e.preventDefault();

    if (!isEmailValid || !isPasswordValid) {
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
