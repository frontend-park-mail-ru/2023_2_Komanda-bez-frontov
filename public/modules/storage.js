import {renderMessage} from '../components/Message/message.js';
import {API} from './api.js';

export const STORAGE = {
  user: null,
  avatar: null,
  forms: [],
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
  STORAGE.forms = [];
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
    } else {
      renderMessage(res.message, true);
    }
  } catch (e) {
    if (e.toString() === 'TypeError: Failed to fetch') {
      renderMessage('Потеряно соединение с сервером', true);
    }
  }
};

/**
 * Функция поиска формы в локальном хранилище по id.
 *
 * @function
 * @param {number} id - ID искомой формы
 * @return {form | null} - Искомая форма
 */
export const storageGetFormByID = (id) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const index in STORAGE.forms) {
    if (STORAGE.forms[index].id === id) {
      return STORAGE.forms[index];
    }
  }
  return null;
};
