import {API} from '../../modules/api.js';
import {navbar} from '../Navbar/navbar.js';
import {renderMessage, removeMessage} from '../Message/message.js';

/**
 * Функция для рендеринга страницы при первой загрузке.
 *
 * @async
 * @function
 * @return {void}
 */
export async function renderInitial() {
  removeMessage();
  const rootElement = document.querySelector('#root');

  const api = new API();
  const isAuth = await api.isAuth();
  if (!isAuth.isAuthorized) {
    navbar();
    renderMessage('Вы не авторизованы!', true);
    return;
  }

  navbar({user: {name: isAuth.authorizedUser.name}});
  rootElement.innerHTML = '';
}
