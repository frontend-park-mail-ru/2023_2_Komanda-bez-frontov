import {API, defaultFetchErrorMessage} from '../../../modules/api.js';
import {render404} from '../../404/404.js';
import {renderMessage} from '../../Message/message.js';
import {STORAGE} from '../../../modules/storage.js';
import {frontendUrl, ROUTES} from '../../../config.js';
import {goToPage} from '../../../modules/router.js';
import {changeMailIconUnread} from "../../Navbar/navbar.js";

/**
 * Функция для рендеринга страницы чата по его id.
 *
 * @async
 * @function
 * @param {number} id - ID.
 * @return {void}
 */
export const renderChat = async (id) => {
  if (!STORAGE.user) {
    goToPage(ROUTES.login, 0, true);
    renderMessage('Вы не авторизованы!', true);
    return;
  }

  const api = new API();

  const rootElement = document.querySelector('#root');

  let chat;
  try {
    const res = await api.getChatByID(id);
    if (res.message !== 'ok') {
      rootElement.innerHTML = '';
      if (res.message === '404') {
        render404();
        return;
      }
      renderMessage(res.message, true);
      return;
    }
    chat = res.chat;
  } catch (e) {
    if (e.toString() !== 'TypeError: Failed to fetch') {
      renderMessage(defaultFetchErrorMessage, true);
      return;
    }
  }
  if (chat) {
    chat.messages = chat.messages.sort((a, b) => {
      return b.id - a.id
    });
  }

  await checkUnreadMessages();

  console.log(chat);

  chat.avatar_check = !!chat.user.avatar;
  chat.messages.forEach((mes) => {
    const date = new Date(mes.send_at);
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
    };
    mes.send_at = date.toLocaleDateString('ru', options);
    mes.author = mes.sender_id === STORAGE.user.id ?
        mes.author = STORAGE.user : chat.user;
    if (mes.sender_id === STORAGE.user.id && STORAGE.avatar) {
      mes.author.avatar = STORAGE.avatar;
    }
    mes.avatar_check = !!mes.author.avatar;
  });

  console.log(chat)

  rootElement.innerHTML = '';
  rootElement.innerHTML = Handlebars.templates.chat({chat: chat});

  document.documentElement.style.scrollBehavior = 'unset';
  window.scroll(0, 10000);
  document.documentElement.style.scrollBehavior = 'smooth';

  const backButton = document.querySelector('#chat-back-button');
  backButton.addEventListener('click', () => {
    goToPage(ROUTES.chats);
  });

  const sendButton = document.querySelector('#chat-send-button');
  sendButton.addEventListener('click', async () => {
    const input = document.querySelector('#chat-send-input');
    if (input.value === '') {
      return;
    }
    const text = input.value;
    try {
      const res = await api.sendMessage(id, text);
      if (res.message !== 'ok') {
        renderMessage(res.message, true);
        return;
      }
    } catch (e) {
        renderMessage(defaultFetchErrorMessage, true);
        return;
    }
    renderChat(id)
  });
};

export const checkUnreadMessages = async () => {
  const api = new API();
  try {
    const res = await api.checkUnreadMessages();
    if (res.unread > 0) {
      changeMailIconUnread(true);
    } else {
      changeMailIconUnread(false);
    }
  } catch (e) {
    renderMessage(defaultFetchErrorMessage, true);
  }
}
