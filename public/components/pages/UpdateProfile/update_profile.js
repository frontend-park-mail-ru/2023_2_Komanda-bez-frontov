import {ROUTES} from '../../../config.js';
import {removeMessage, renderMessage} from '../../Message/message.js';
import {goToPage} from '../../../modules/router.js';
import {STORAGE} from '../../../modules/storage.js';
import {
  avatarValidation,
  emailValidation,
  nameValidation,
  passwordValidation,
  usernameValidation,
} from '../../../modules/validation.js';
import {API} from '../../../modules/api.js';
import {toggleFunc} from "../Signup/signup.js";

/**
 * Функция для рендеринга страницы изменения профиля авторизированного пользователя.
 * Если пользователь не авторизован, происходит редирект на страницу входа.
 *
 * @async
 * @function
 * @return {void}
 */
export const renderUpdateProfile = async () => {
  removeMessage();

  // Проверка авторизации
  if (!STORAGE.user) {
    goToPage(ROUTES.login, 0, true);
    renderMessage('Вы не авторизованы!', true);
    return;
  }

  const rootElement = document.querySelector('#root');
  rootElement.innerHTML = '';
  rootElement.innerHTML = Handlebars.templates.update_profile({User: STORAGE.user});

  let avatar = STORAGE.avatar;
  const profilePicture = document.querySelector('#update-profile-page-picture');
  if (STORAGE.avatar) {
    profilePicture.src = `data:image/png;base64, ${avatar}`;
  }

  const showOldPasswordButton = document.querySelector('#login-form_container__input-show-old-button');
  showOldPasswordButton.addEventListener('click',  () => {
    const password = document.querySelector('#update-profile_old-password');
    const icon = document.querySelector('#login-form_container__input-show-old-button-icon');

    toggleFunc(password, icon);
  });

  const showPasswordButton = document.querySelector('#login-form_container__input-show-button');
  showPasswordButton.addEventListener('click',  () => {
    const password = document.querySelector('#update-profile_new-password');
    const icon = document.querySelector('#login-form_container__input-show-button-icon');

    toggleFunc(password, icon);
  });

  const showRepeatPasswordButton = document.querySelector('#login-form_container__input-show-rep-button');
  showRepeatPasswordButton.addEventListener('click',  () => {
    const password = document.querySelector('#update-profile_repeat-password');
    const icon = document.querySelector('#login-form_container__input-show-rep-button-icon');

    toggleFunc(password, icon);
  });

  const inputAvatar = document.querySelector('#avatar');
  inputAvatar.addEventListener('change', (e) => {
    const labelAvatar = document.querySelector('#update-profile-avatar-button');
    const avatarFile = e.target.files[0];
    const isAvatarValid = avatarValidation(avatarFile);

    if (!isAvatarValid.valid) {
      renderMessage(isAvatarValid.message, true);
      return;
    }

    labelAvatar.style.backgroundColor = '#caecaf';
    // Перевод аватарка из файла в Base64
    if (avatarFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        avatar = reader.result
          .replace('data:', '')
          .replace(/^.+,/, '');
      };
      reader.readAsDataURL(avatarFile);
    }
    setTimeout(() => {
      profilePicture.src = `data:image/png;base64, ${avatar}`;
    }, 500);
  });

  const cancelAvatar = document.querySelector('#update-profile-avatar-cancel');
  cancelAvatar.addEventListener('click', () => {
    const labelAvatar = document.querySelector('#update-profile-avatar-button');
    labelAvatar.style.backgroundColor = '#ffffff';
    avatar = '';
    profilePicture.src = '../../resources/images/profile_default.png';
  });

  const saveButton = document.querySelector('#update-profile-save-button');
  saveButton.addEventListener('click', async (e) => {
    e.preventDefault();

    const firstName = document.querySelector('#update-profile_name');
    const email = document.querySelector('#update-profile_email');
    const username = document.querySelector('#update-profile_username');
    const oldPassword = document.querySelector('#update-profile_old-password');
    const newPassword = document.querySelector('#update-profile_new-password');
    const repeatPassword = document.querySelector('#update-profile_repeat-password');

    if (email.value === '' || firstName.value === ''
        || username.value === '') {
      renderMessage('Вы ввели не все данные', true);
      return;
    }

    const isNameValid = nameValidation(firstName.value);
    const isEmailValid = emailValidation(email.value);
    const isUsernameValid = usernameValidation(username.value);
    const isOldPasswordValid = passwordValidation(oldPassword.value);
    const isNewPasswordValid = passwordValidation(newPassword.value);

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

    if (username.value !== STORAGE.user.username || email.value !== STORAGE.user.email || newPassword.value !== '') {
      if (oldPassword.value === '') {
        renderMessage('Для сохранения изменений введите текущий пароль', true);
        return;
      } if (!isOldPasswordValid.valid) {
        renderMessage(isOldPasswordValid.message, true);
        return;
      }
    }

    if (newPassword.value) {
      if (!isNewPasswordValid.valid) {
        renderMessage(isNewPasswordValid.message, true);
        return;
      }
      if (newPassword.value !== repeatPassword.value) {
        renderMessage('Новые пароли не совпадают', true);
      }
    }

    try {
      const api = new API();
      const res = await api.updateProfile(
        firstName.value,
        username.value,
        email.value,
        oldPassword.value,
        newPassword.value,
        avatar,
      );

      if (res.message !== 'ok') {
        renderMessage(res.message, true);
        return;
      }

      STORAGE.user = res.updatedUser;
      STORAGE.avatar = avatar;

      goToPage(ROUTES.profile);
      renderMessage('Изменения успешно применены');
    } catch (err) {
      if (err.toString() !== 'TypeError: Failed to fetch') {
        renderMessage('Ошибка сервера. Попробуйте позже', true);
        return;
      }
      renderMessage('Потеряно соединение с сервером', true);
    }
  });

  const cancelButton = document.querySelector('#update-profile-cancel-button');
  cancelButton.addEventListener('click', () => {
    goToPage(ROUTES.profile);
  });
};
