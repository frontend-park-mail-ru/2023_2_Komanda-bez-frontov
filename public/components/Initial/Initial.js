import {API} from '../../modules/api.js';
import {navbar} from '../Navbar/navbar.js';
import {renderMessage, removeMessage} from '../Message/message.js';
import {STORAGE} from "../../index.js";

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

  const api = new API();
  const isAuth = await api.isAuth();
  if (!isAuth.isAuthorized) {
    renderMessage('Вы не авторизованы!', true);
    return;
  }
  STORAGE.user = isAuth.authorizedUser;
  STORAGE.avatar = isAuth.authorizedUser.username;
}
