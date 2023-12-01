import {API} from '../../modules/api.js';
import {renderMessage, removeMessage} from '../Message/message.js';
import {ROUTES} from '../../config.js';
import {clearStorage} from '../../modules/storage.js';
import {goToPage} from "../../modules/router.js";
import {navbar} from "../Navbar/navbar.js";

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
    }
    return;
  }

  if (logoutStatus.message !== 'ok') {
    renderMessage(logoutStatus.message, true);
    if (logoutStatus.message === 'Потеряно соединеие с сервером') {
      return;
    }
  }

  clearStorage();
  navbar();
  goToPage(ROUTES.main, 0, true);
};
