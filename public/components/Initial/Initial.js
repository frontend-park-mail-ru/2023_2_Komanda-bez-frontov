import {API, defaultFetchErrorMessage, startWebsocketConnection} from '../../modules/api.js';
import {renderMessage} from '../Message/message.js';
import {clearStorage, getAuthAvatar, STORAGE} from '../../modules/storage.js';
import {navbar} from "../Navbar/navbar.js";
import {checkUnreadMessages} from "../pages/Chat/chat.js";

/**
 * Функция для рендеринга страницы при первой загрузке.
 *
 * @async
 * @function
 * @return {void}
 */
export const renderInitial = async () => {
  const rootElement = document.querySelector('#root');
  rootElement.innerHTML = '';

  try {
    const api = new API();
    const isAuth = await api.isAuth();
    if (isAuth.isAuthorized) {
      STORAGE.user = isAuth.authorizedUser;
      getAuthAvatar();
      startWebsocketConnection();
    } else {
      localStorage.removeItem('avatar');
    }
  } catch (e) {
    renderMessage(defaultFetchErrorMessage, true);
  }

  navbar();
  if (STORAGE.user) {
    await checkUnreadMessages();
  }
};
