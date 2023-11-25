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

  // let avatar = '';

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

  const firstName = document.querySelector('#name');
  const email = document.querySelector('#email');
  const username = document.querySelector('#username');
  const password = document.querySelector('#password');
  const repeatPassword = document.querySelector('#repeat_password');

  let isNameValid = true;
  let isEmailValid = true;
  let isUsernameValid = true;
  let isPasswordValid = true;

  firstName.addEventListener("input", (e) => {
    e.preventDefault();

    const nameValid = nameValidation(firstName.value);

    if (nameValid.valid) {
      removeMessage();
      isNameValid = true;
    } else {
      renderMessage(nameValid.message, true);
      isNameValid = false;
    }
  });

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

  username.addEventListener("input", (e) => {
    e.preventDefault();

    const usernameValid = usernameValidation(e.target.value);

    if (usernameValid.valid) {
      removeMessage();
      isUsernameValid = true;
    } else {
      renderMessage(usernameValid.message, true);
      isUsernameValid = false;
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

  const signupButton = document.querySelector('#signup-button');
  signupButton.addEventListener('click', async (e) => {
    e.preventDefault();

    if (password.value === '' || email.value === '' || firstName.value === ''
        || username.value === '' || repeatPassword.value === '') {
      renderMessage('Вы ввели не все данные', true);
      return;
    }

    if (!isNameValid || !isEmailValid || !isUsernameValid || !isPasswordValid) {
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

      goToPage(ROUTES.forms);
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
