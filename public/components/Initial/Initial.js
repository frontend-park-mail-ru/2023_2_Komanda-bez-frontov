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
export const renderInitial = async () => {
  removeMessage();
  const rootElement = document.querySelector('#root');

  const api = new API();
  const isAuth = await api.isAuth();
  if (!isAuth.isAuthorized) {
    navbar();
    renderMessage('Вы не авторизованы!', true);
    return;
  }

  const user = {
    user: {
      id: isAuth.authorizedUser.id,
      first_name: isAuth.authorizedUser.first_name,
      username: isAuth.authorizedUser.username,
      email: isAuth.authorizedUser.email,
    }
  }
  navbar(user);
  rootElement.innerHTML = '';
};
