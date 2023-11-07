import {API} from '../../modules/api.js';
import {renderMessage} from '../Message/message.js';
import {STORAGE} from '../../index.js';
import {getAuthAvatar} from '../Avatar/avatar.js';

/**
 * Функция для рендеринга страницы при первой загрузке.
 *
 * @async
 * @function
 * @return {void}
 */
export async function renderInitial() {
  const rootElement = document.querySelector('#root');
  rootElement.innerHTML = '';

  try {
    const api = new API();
    const isAuth = await api.isAuth();
    if (isAuth.isAuthorized) {
      STORAGE.user = isAuth.authorizedUser;
      await getAuthAvatar();
    } else {
      renderMessage('Вы не авторизованы!', true);
    }
  } catch (e) {
    if (e.toString() === 'TypeError: Failed to fetch') {
      renderMessage('Потеряно соединение с сервером', true);
    }
  }
}
