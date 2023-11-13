import {ROUTES} from '../../../config.js';
import {removeMessage, renderMessage} from '../../Message/message.js';
import {goToPage} from '../../../modules/router.js';
import {STORAGE} from '../../../modules/storage.js';
import {avatarValidation} from '../../../modules/validation.js';

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
    goToPage(ROUTES.login);
    renderMessage('Вы не авторизованы!', true);
    return;
  }

  const rootElement = document.querySelector('#root');
  rootElement.innerHTML = '';
  rootElement.innerHTML = Handlebars.templates.update_profile({User: STORAGE.user});

  const user = STORAGE.user;
  let avatar = STORAGE.avatar;
  const profilePicture = document.querySelector('#update-profile-page-picture');
  if (STORAGE.avatar) {
    profilePicture.src = `data:image/png;base64, ${avatar}`;
  }

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
    const changeAvatarRender = setTimeout(() => {
      profilePicture.src = `data:image/png;base64, ${avatar}`;
    }, 500);
    changeAvatarRender();
  });

  const cancelAvatar = document.querySelector('#update-profile-avatar-cancel');
  cancelAvatar.addEventListener('click', () => {
    const labelAvatar = document.querySelector('#update-profile-avatar-button');
    labelAvatar.style.backgroundColor = '#ffffff';
    avatar = '';
    profilePicture.src = '../../resources/images/profile_default.png';
  });
};
