import {API} from '../../modules/api.js';
import {navbar} from '../Navbar/navbar.js';
import {renderMessage, removeMessage} from '../Message/message.js';
import {ROUTES} from '../../config.js';
import {goToPage} from "../../modules/router.js";

/**
 * Функция для выполнения выхода из аккаунта.
 *
 * @async
 * @function
 * @return {void}
 */
export const renderMainLogout = async () => {
  window.history.replaceState(ROUTES.forms.state, '', ROUTES.main.url);
  removeMessage();
  const api = new API();
  const logoutStatus = await api.userLogout();
  navbar();
  renderMessage(logoutStatus.message, true);
  goToPage(ROUTES.main);
};
