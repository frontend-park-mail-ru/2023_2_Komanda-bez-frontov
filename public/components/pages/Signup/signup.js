import {ROUTES} from '../../../config.js';
import {API} from '../../../modules/api.js';
import {renderMessage, removeMessage} from '../../Message/message.js';
import {navbar} from '../../Navbar/navbar.js';
import {emailValidation, passwordValidation, usernameValidation} from '../../../modules/validation.js';
import {goToPage} from '../../../modules/router.js';
import {STORAGE} from "../../../index.js";
import {getAuthAvatar} from "../../Avatar/avatar.js";

/**
 * Функция для рендеринга страницы регистрации.
 *
 * @async
 * @function
 * @return {void}
 */
export async function renderSignup() {
  removeMessage();
  const rootElement = document.querySelector('#root');
  rootElement.innerHTML = '';
  rootElement.innerHTML = Handlebars.templates.signup();

  let avatar_file = null;

  const signupButton = document.querySelector('#signup-button');
  signupButton.addEventListener('click', async (e) => {
    e.preventDefault();

    const firstName = document.querySelector('#name');
    const email = document.querySelector('#email');
    const username = document.querySelector('#username');
    const password = document.querySelector('#password');
    const repeatPassword = document.querySelector('#repeat_password');
    let avatar = '';

    if (password.value === '' || email.value === '' || firstName.value === ''
        || username.value === '' || repeatPassword.value === '') {
      renderMessage('Вы ввели не все данные', true);
      return;
    }

    const isEmailValid = emailValidation(email.value);
    const isUsernameValid = usernameValidation(username.value);
    const isPasswordValid = passwordValidation(password.value);

    if (!isEmailValid.valid) {
      renderMessage(isEmailValid.message, true);
      return;
    }

    if (!isUsernameValid.valid) {
      renderMessage(isUsernameValid.message, true);
      return;
    }

    if (!isPasswordValid.valid) {
      renderMessage(isPasswordValid.message, true);
      return;
    }

    if (password.value !== repeatPassword.value) {
      renderMessage('Пароли не совпадают', true);
      return;
    }

    console.log(avatar_file)
    console.log(avatar)
    // Перевод аватарка из файла в Base64
    if (avatar_file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result
            .replace('data:', '')
            .replace(/^.+,/, '');
        avatar = base64;
      };
      reader.readAsDataURL(avatar_file);
    }
    console.log(avatar)

    const api = new API();
    const res = await api.userSignup(
      firstName.value,
      username.value,
      email.value,
      password.value,
      avatar
    );

    if (res.status === 409) {
      renderMessage('Пользователь уже существует', true);
      return;
    }
    if (res.status === 400) {
      renderMessage('Невозможно зарегистрироваться. Завершите предыдущую сессию!', true);
      return;
    }
    if (res.status !== 200) {
      renderMessage('Ошибка сервера. Попробуйте позже.', true);
      return;
    }

    STORAGE.user = res.registeredUser;
    STORAGE.avatar = avatar;
    goToPage(ROUTES.main);
    renderMessage('Вы успешно зарегистрировались');
  });

  const inputAvatar = document.querySelector('#avatar');
  inputAvatar.addEventListener('change', (e) => {
    const labelAvatar = document.querySelector('#signup_avatar_input-label');
    labelAvatar.style.backgroundColor = '#caecaf';
    avatar_file = e.target.files[0];
  });
  const cancelAvatar = document.querySelector('#signup_avatar_cancel');
  cancelAvatar.addEventListener('click', (e) => {
    const labelAvatar = document.querySelector('#signup_avatar_input-label');
    labelAvatar.style.backgroundColor = '#ffffff';
    const avatar = document.querySelector('#avatar');
    avatar_file = null;
  });

}
