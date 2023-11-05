import {API} from '../../modules/api.js';
import {navbar} from '../Navbar/navbar.js';
import {renderMessage, removeMessage} from '../Message/message.js';
import {goToPage, ROUTES} from '../../config.js';

/**
 * Функция для выполнения выхода из аккаунта.
 *
 * @async
 * @function
 * @return {void}
 */
export async function renderMainLogout() {
  window.history.replaceState(ROUTES.forms.state, '', ROUTES.forms.url);
  removeMessage();
  const api = new API();
  const logoutStatus = await api.userLogout();
  navbar();
  if (logoutStatus === 404) {
    renderMessage('Невозможно выполнить Logout - вы не авторизованы!', true);
    return;
  }
  renderMessage('Вы вышли из аккаунта', true);
  goToPage(ROUTES.index);
}
