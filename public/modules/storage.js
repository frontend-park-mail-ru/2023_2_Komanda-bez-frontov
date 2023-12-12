import {renderMessage} from '../components/Message/message.js';
import {API} from './api.js';

export const STORAGE = {
  user: null,
  avatar: null,
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
      const profilePicture = document.querySelector('#navbar-profile-picture');
      profilePicture.src = `data:image/png;base64, ${res.avatar}`;
      const profilePagePicture = document.querySelector('#profile-page-picture');
      if (profilePagePicture) {
        profilePagePicture.src = `data:image/png;base64, ${res.avatar}`;
      }
    } else {
      renderMessage(res.message, true);
    }
  } catch (e) {
    renderMessage('Ошибка сеееервера. Попробуйте позже', true);
  }
};
