import {renderMessage} from '../components/Message/message.js';
import {API} from './api.js';

export const STORAGE = {
  user: null,
  avatar: localStorage.getItem('avatar'),
};

/**
 * Функция очистки информации о текущем пользователе.
 *
 * @function
 * @return {void}
 */
export const clearStorage = () => {
  STORAGE.user = null;
  STORAGE.avatar = null;
  localStorage.removeItem('avatar');
};

/**
 * Функция для получения и сохранения аватарки текущего пользователя.
 *
 * @async
 * @function
 * @return {void}
 */
export const getAuthAvatar = async () => {
  if (!STORAGE.user) {
    return;
  }
  try {
    const api = new API();
    const res = await api.getAvatar(STORAGE.user.username);
    if (res.message === 'ok') {
      STORAGE.avatar = res.avatar;
      // Проверка на то, сможет ли аватар поместится в localStorage, иначе храним только в оперативной памяти
      // Максимальная длина записи - 5200000 символов
      if (res.avatar.length >= 5200000) {
        localStorage.setItem('avatar', '');
      } else {
        localStorage.setItem('avatar', res.avatar);
      }

      const profilePicture = document.querySelector('#navbar-profile-picture');
      const profilePagePicture = document.querySelector('#profile-page-picture');
      if (res.avatar === '') {
        profilePicture.src = `../../../resources/images/profile_default.png`;
        if (profilePagePicture) {
          profilePagePicture.src = `../../../resources/images/profile_default.png`;
        }
      } else {
        profilePicture.src = `data:image/png;base64, ${res.avatar}`;
        if (profilePagePicture) {
          profilePagePicture.src = `data:image/png;base64, ${res.avatar}`;
        }
      }
    } else {
      renderMessage(res.message, true);
    }
  } catch (e) {
    renderMessage(`Ошибка сеееервера. Перезагрузите страницу ${e}`, true);
  }
};
