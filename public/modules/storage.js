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
export function clearStorage() {
  STORAGE.user = null;
  STORAGE.avatar = null;
  STORAGE.forms = [];
}

/**
 * Функция для получения и сохранения аватарки текущего пользователя.
 *
 * @async
 * @function
 * @return {void}
 */
export async function getAuthAvatar() {
  if (!STORAGE.user) {
    return;
  }
  try {
    const api = new API();
    const res = await api.getAvatar(STORAGE.user.username);
    if (res.status === 200) {
      STORAGE.avatar = res.avatar;
    }
  } catch (e) {
    if (e.toString() === 'TypeError: Failed to fetch') {
      renderMessage('Потеряно соединение с сервером', true);
    }
  }
}

/**
 * Функция поиска формы в локальном хранилище по id.
 *
 * @function
 * @param {number} id - ID искомой формы
 * @return {form | null} - Искомая форма
 */
export function storageGetFormByID(id) {
  // eslint-disable-next-line no-restricted-syntax
  for (const index in STORAGE.forms) {
    if (STORAGE.forms[index].id === id) {
      return STORAGE.forms[index];
    }
  }
  return null;
}
