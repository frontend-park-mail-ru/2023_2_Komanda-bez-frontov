import {ROUTES} from '../../../config.js';
import {API, defaultFetchErrorMessage} from '../../../modules/api.js';
import {renderMessage, removeMessage} from '../../Message/message.js';
import {emailValidation, passwordValidation} from '../../../modules/validation.js';
import {goToPage} from '../../../modules/router.js';
import {STORAGE, getAuthAvatar} from '../../../modules/storage.js';
import {toggleFunc} from "../Signup/signup.js";
import {navbar} from "../../Navbar/navbar.js";
import {debounce} from "../MyForms/forms.js";

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

  const email = document.querySelector('#email');
  const password = document.querySelector('#password');

  addValidationToInput(email, emailValidation, loginButton);
  addValidationToInput(password, passwordValidation, loginButton);

  loginButton.addEventListener('click', async (e) => {
    e.preventDefault();

    if (!checkInputsValidation()) {
      renderMessage('Исправлены не все данные', true);
      return;
    }

    if (password.value === '' || email.value === '') {
      renderMessage('Вы ввели не все данные', true);
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

      navbar();
      goToPage(ROUTES.forms);
      // renderMessage('Вы успешно вошли');
    } catch (err) {
      renderMessage(defaultFetchErrorMessage, true);
    }
  });

  signupButton.addEventListener('click', () => {
    goToPage(ROUTES.signup);
  });
};

export const addValidationToInput = (input, validator, submitButton) => {
  input.addEventListener("input", debounce((e) => {
    e.preventDefault();

    const validation = validator(e.target.value);

    if (validation.valid || e.target.value === '') {
      removeMessage();
      submitButton.disabled = false;
    } else {
      renderMessage(validation.message, true);
      e.target.classList.add('update-form__input-error');
      e.target.addEventListener('input', () => {
        e.target.classList.remove('update-form__input-error');
      }, {once: true});
      submitButton.disabled = true;
    }
  }, 1000));
};

export const checkInputsValidation = () => {
  const cInputs = document.querySelectorAll('input, textarea');
  let isValid = true;
  cInputs.forEach((input) => {
    if (input.classList.contains('update-form__input-error')) {
      isValid = false;
    }
  });
  return isValid;
};