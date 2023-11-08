import {API} from '../../modules/api.js';
import {renderMessage, removeMessage} from '../Message/message.js';
import {ROUTES} from '../../config.js';
import {goToPage} from '../../modules/router.js';
import {clearStorage} from '../../modules/storage.js';

/**
 * Функция для выполнения выхода из аккаунта.
 *
 * @async
 * @function
 * @return {void}
 */
export async function renderMainLogout() {
  removeMessage();

  let logoutStatus = 0;
  try {
    const api = new API();
    const res = await api.userLogout();
    logoutStatus = res.status;
  } catch (e) {
    if (e.toString() === 'TypeError: Failed to fetch') {
      renderMessage('Невозможно выполнить Logout - потеряно соединение с сервером!', true);
      return;
    }
  }

  window.history.replaceState(ROUTES.forms.state, '', ROUTES.main.url);
  clearStorage();
  if (logoutStatus === 401) {
    renderMessage('Невозможно выполнить Logout - вы не авторизованы!', true);
    return;
  }
  renderMessage('Вы вышли из аккаунта', true);
  goToPage(ROUTES.main);
}
