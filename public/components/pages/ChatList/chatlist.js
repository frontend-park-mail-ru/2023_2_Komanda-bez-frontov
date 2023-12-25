import {API, defaultFetchErrorMessage} from '../../../modules/api.js';
import {ROUTES} from '../../../config.js';
import {removeMessage, renderMessage} from '../../Message/message.js';
import {goToPage} from '../../../modules/router.js';
import {STORAGE} from '../../../modules/storage.js';
import {renderChat} from "../Chat/chat.js";

/**
 * Функция для рендеринга страницы с пройденным пользователем опросами.
 * Если пользователь не авторизован, происходит редирект на страницу входа.
 *
 * @async
 * @function
 * @return {void}
 */
export const renderChatList = async () => {
    removeMessage();

    // Проверка авторизации
    if (!STORAGE.user) {
        goToPage(ROUTES.login, 0, true);
        renderMessage('Вы не авторизованы!', true);
        return;
    }

    const api = new API();
    const rootElement = document.querySelector('#root');
    rootElement.innerHTML = '';
    rootElement.innerHTML = Handlebars.templates.forms();

    const searchBar = document.querySelector('.forms_search-container');
    searchBar.remove();
    const titleContainer = document.querySelector('.forms_title-container');
    const title = document.createElement('h3');
    title.innerHTML = 'Сообщения';
    titleContainer.innerHTML = '';
    titleContainer.appendChild(title);

    const chatsContainer = document.querySelector('#forms-container');
    let chats = [];
    let message = 'ok';

    try {
        const res = await api.getChats();
        message = res.message;
        chats = res.chats;
    } catch (e) {
        renderMessage(defaultFetchErrorMessage, true);
        return;
    }
    if (chats) {
        chats = chats.sort((a, b) => {
            return b.messages[b.messages.length - 1].id - a.messages[a.messages.length - 1].id
        });
    }

    if (message === 'ok') {
        chatsContainer.innerHTML = '';
        if (chats.length === 0) {
            const label = document.createElement('a');
            label.classList.add('forms_list_main-container_empty-label');
            label.textContent = 'Пока ничего нет...';
            chatsContainer.appendChild(label);
        } else {
            const temp = document.createElement('div');
            chats.forEach((chat) => {
                const lastMessage = chat.messages[chat.messages.length - 1];
                const date = new Date(lastMessage.send_at);
                const options = {
                    hour: '2-digit',
                    minute: '2-digit',
                    month: 'numeric',
                    day: 'numeric',
                    // year: 'numeric',
                };
                chat.time = date.toLocaleDateString('ru', options);
                chat.avatar_check = !!chat.user.avatar;
                chat.last_message = lastMessage.sender_id === STORAGE.user.id ?
                    'Вы: ' + lastMessage.text : lastMessage.text;
                chat.unread = lastMessage.sender_id !== STORAGE.user.id && !lastMessage.is_read;

                chat.messages.forEach((mes) => {
                    chat.messages = chat.messages.sort((a, b) => {
                        return b.id - a.id
                    });
                });

                temp.innerHTML = Handlebars.templates.chat_item({chat: chat});
                const item = temp.querySelector('#chat-item');
                item.addEventListener('click', () => {
                    goToPage(ROUTES.chat, chat.user.id);
                });
                chatsContainer.appendChild(item);
            });
        }

    } else {
        renderMessage(message, true);
    }

};
