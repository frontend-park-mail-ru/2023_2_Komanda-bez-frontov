import {API} from '../../modules/api.js';
import {renderMessage, removeMessage} from '../Message/message.js';
import {ROUTES} from '../../config.js';
import {clearStorage} from '../../modules/storage.js';
import {renderMain} from '../pages/Main/main.js';

/**
 * Функция для выполнения выхода из аккаунта.
 *
 * @async
 * @function
 * @return {void}
 */
export const renderMainLogout = async () => {
  removeMessage();

  let logoutStatus;
  try {
    const api = new API();
    logoutStatus = await api.userLogout();
  } catch (e) {
    if (e.toString() === 'TypeError: Failed to fetch') {
      renderMessage('Невозможно выполнить выход - потеряно соединение с сервером!', true);
      return;
    }
  }

  window.history.replaceState(ROUTES.forms.state, '', ROUTES.main.url);
  clearStorage();
  renderMessage(logoutStatus.message, true);
  renderMain();
};
