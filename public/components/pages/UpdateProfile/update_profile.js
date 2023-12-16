import {ROUTES} from '../../../config.js';
import {removeMessage, renderMessage} from '../../Message/message.js';
import {goToPage} from '../../../modules/router.js';
import {getAuthAvatar, STORAGE} from '../../../modules/storage.js';
import {
  avatarValidation,
  emailValidation,
  nameValidation,
  passwordValidation,
  usernameValidation,
} from '../../../modules/validation.js';
import {API} from '../../../modules/api.js';
import {toggleFunc} from "../Signup/signup.js";
import {navbar} from "../../Navbar/navbar.js";
import {addValidationToInput, checkInputsValidation} from "../Login/login.js";

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
  const profilePicture = document.querySelector('#profile-page-picture');
  if (STORAGE.avatar) {
    profilePicture.src = `data:image/png;base64, ${avatar}`;
  }

  const showOldPasswordButton = document.querySelector('#update-profile-form_container__input-show-old-button');
  showOldPasswordButton.addEventListener('click',  () => {
    const password = document.querySelector('#update-profile_old-password');
    const icon = document.querySelector('#update-profile-form_container__input-show-old-button-icon');

    toggleFunc(password, icon);
  });

  const showPasswordButton = document.querySelector('#update-profile-form_container__input-show-button');
  showPasswordButton.addEventListener('click',  () => {
    const password = document.querySelector('#update-profile_new-password');
    const icon = document.querySelector('#update-profile-form_container__input-show-button-icon');

    toggleFunc(password, icon);
  });

  const showRepeatPasswordButton = document.querySelector('#update-profile-form_container__input-show-rep-button');
  showRepeatPasswordButton.addEventListener('click',  () => {
    const password = document.querySelector('#update-profile_repeat-password');
    const icon = document.querySelector('#update-profile-form_container__input-show-rep-button-icon');

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
  const firstName = document.querySelector('#update-profile_name');
  const email = document.querySelector('#update-profile_email');
  const username = document.querySelector('#update-profile_username');
  const oldPassword = document.querySelector('#update-profile_old-password');
  const newPassword = document.querySelector('#update-profile_new-password');
  const repeatPassword = document.querySelector('#update-profile_repeat-password');

  addValidationToInput(firstName, nameValidation, saveButton);
  addValidationToInput(email, emailValidation, saveButton);
  addValidationToInput(username, usernameValidation, saveButton);
  addValidationToInput(oldPassword, passwordValidation, saveButton);
  addValidationToInput(newPassword, passwordValidation, saveButton);

  saveButton.addEventListener('click', async (e) => {
    e.preventDefault();

    if (!checkInputsValidation()) {
      renderMessage('Исправлены не все данные', true);
      return;
    }

    email.value = !email.value ? STORAGE.user.email : email.value;
    firstName.value = !firstName.value ? STORAGE.user.first_name: firstName.value;
    username.value = !username.value ? STORAGE.user.username : username.value;

    if (username.value !== STORAGE.user.username || email.value !== STORAGE.user.email || newPassword.value !== '') {
      if (oldPassword.value === '') {
        renderMessage('Для сохранения изменений введите текущий пароль', true);
        return;
      }
    }

    if (newPassword.value) {
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
      getAuthAvatar();

      navbar();
      goToPage(ROUTES.profile);
      renderMessage('Изменения успешно применены');
    } catch (err) {
      renderMessage('Ошибка сервера. Перезагрузите страницу', true);
    }
  });

  const cancelButton = document.querySelector('#update-profile-cancel-button');
  cancelButton.addEventListener('click', () => {
    goToPage(ROUTES.profile);
  });
};
