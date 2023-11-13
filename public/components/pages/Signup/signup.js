import {ROUTES} from '../../../config.js';
import {API} from '../../../modules/api.js';
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

/**
 * Функция для рендеринга страницы регистрации.
 *
 * @async
 * @function
 * @return {void}
 */
export const renderSignup = async () => {
  removeMessage();
  const rootElement = document.querySelector('#root');
  rootElement.innerHTML = '';
  rootElement.innerHTML = Handlebars.templates.signup();

  // let avatar = '';

  const signupButton = document.querySelector('#signup-button');
  signupButton.addEventListener('click', async (e) => {
    e.preventDefault();

    const firstName = document.querySelector('#name');
    const email = document.querySelector('#email');
    const username = document.querySelector('#username');
    const password = document.querySelector('#password');
    const repeatPassword = document.querySelector('#repeat_password');

    if (password.value === '' || email.value === '' || firstName.value === ''
        || username.value === '' || repeatPassword.value === '') {
      renderMessage('Вы ввели не все данные', true);
      return;
    }

    const isNameValid = nameValidation(firstName.value);
    const isEmailValid = emailValidation(email.value);
    const isUsernameValid = usernameValidation(username.value);
    const isPasswordValid = passwordValidation(password.value);

    if (!isNameValid.valid) {
      renderMessage(isNameValid.message, true);
      return;
    }

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

    try {
      const api = new API();
      const res = await api.userSignup(
        firstName.value,
        username.value,
        email.value,
        password.value,
        // avatar,
      );

      if (res.message !== 'ok') {
        renderMessage(res.message, true);
        return;
      }

      STORAGE.user = res.registeredUser;
      // STORAGE.avatar = avatar;

      goToPage(ROUTES.main);
      renderMessage('Вы успешно зарегистрировались');
    } catch (err) {
      if (err.toString() !== 'TypeError: Failed to fetch') {
        renderMessage('Ошибка сервера. Попробуйте позже', true);
        return;
      }
      renderMessage('Потеряно соединение с сервером', true);
    }
  });

  // const inputAvatar = document.querySelector('#avatar');
  // inputAvatar.addEventListener('change', (e) => {
  //   const labelAvatar = document.querySelector('#signup-avatar-button');
  //   labelAvatar.style.backgroundColor = '#caecaf';
  //   const avatarFile = e.target.files[0];
  //   const isAvatarValid = avatarValidation(avatarFile);
  //
  //   if (!isAvatarValid.valid) {
  //     renderMessage(isAvatarValid.message, true);
  //     return;
  //   }
  //   // Перевод аватарка из файла в Base64
  //   if (avatarFile) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       avatar = reader.result
  //         .replace('data:', '')
  //         .replace(/^.+,/, '');
  //     };
  //     reader.readAsDataURL(avatarFile);
  //   }
  // });
  //
  // const cancelAvatar = document.querySelector('#signup-avatar-cancel');
  // cancelAvatar.addEventListener('click', () => {
  //   const labelAvatar = document.querySelector('#signup-avatar-button');
  //   labelAvatar.style.backgroundColor = '#ffffff';
  //   avatar = '';
  // });
};
