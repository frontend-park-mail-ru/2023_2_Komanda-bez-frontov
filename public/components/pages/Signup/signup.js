import {ROUTES} from '../../../config.js';
import {API, defaultFetchErrorMessage, startWebsocketConnection} from '../../../modules/api.js';
import {renderMessage, removeMessage} from '../../Message/message.js';
import {
  nameValidation,
  // avatarValidation,
  emailValidation,
  passwordValidation,
  usernameValidation,
} from '../../../modules/validation.js';
import {goToPage} from '../../../modules/router.js';
import {STORAGE} from '../../../modules/storage.js';
import {navbar} from "../../Navbar/navbar.js";
import {
  addValidationToInput,
  checkInputsValidation,
} from "../Login/login.js";
import {checkUnreadMessages} from "../Chat/chat.js";

/**
 * Функция для рендеринга страницы регистрации.
 *
 * @async
 * @function
 * @return {void}
 */

export const toggleFunc = (password, icon) => {

  if (password.type === 'password') {
    password.type = 'text';
    icon.innerText = 'visibility_off';
  } else {
    password.type = 'password';
    icon.innerText = 'visibility';
  }
};

export const renderSignup = async () => {
  removeMessage();

  const rootElement = document.querySelector('#root');
  rootElement.innerHTML = '';
  rootElement.innerHTML = Handlebars.templates.signup();

  const showPasswordButton = document.querySelector('#signup-form_container__input-show-button');
  showPasswordButton.addEventListener('click',  () => {
    const password = document.querySelector('#password');
    const icon = document.querySelector('#signup-form_container__input-show-button-icon');

    toggleFunc(password, icon);
  });

  const showRepPasswordButton = document.querySelector('#signup-form_container__input-show-rep-button');
  showRepPasswordButton.addEventListener('click',  () => {
    const password = document.querySelector('#repeat_password');
    const icon = document.querySelector('#signup-form_container__input-show-rep-button-icon');

    toggleFunc(password, icon);
  });

  const signupButton = document.querySelector('#signup-button');
  const firstName = document.querySelector('#name');
  const email = document.querySelector('#email');
  const username = document.querySelector('#username');
  const password = document.querySelector('#password');
  const repeatPassword = document.querySelector('#repeat_password');

  addValidationToInput(firstName, nameValidation, signupButton);
  addValidationToInput(email, emailValidation, signupButton);
  addValidationToInput(username, usernameValidation, signupButton);
  addValidationToInput(password, passwordValidation, signupButton);

  signupButton.addEventListener('click', async (e) => {
    e.preventDefault();

    if (!checkInputsValidation()) {
      renderMessage('Исправлены не все данные', true);
      return;
    }

    if (password.value === '' || email.value === '' || firstName.value === ''
        || username.value === '' || repeatPassword.value === '') {
      renderMessage('Вы ввели не все данные', true);
      return;
    }

    if (password.value !== repeatPassword.value) {
      renderMessage('Пароли не совпадают', true);
      return;
    }

    try {
      const api = new API();
      const res = await api.userSignup(
        firstName.value,
        username.value,
        email.value,
        password.value,
      );

      if (res.message !== 'ok') {
        renderMessage(res.message, true);
        return;
      }

      STORAGE.user = res.registeredUser;

      navbar();
      goToPage(ROUTES.forms);
      await checkUnreadMessages();
      // startWebsocketConnection();
      renderMessage('Вы успешно зарегистрировались');
    } catch (err) {
      renderMessage(defaultFetchErrorMessage, true);
    }
  });
};
