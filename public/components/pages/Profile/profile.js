import {removeMessage} from '../../Message/message.js';

/**
 * Функция для рендеринга страницы профиля пользователя.
 *
 * @async
 * @function
 * @return {void}
 */
export async function renderProfile() {
  removeMessage();
  const rootElement = document.querySelector('#root');
  rootElement.innerHTML = '';
  rootElement.innerHTML = Handlebars.templates.profile();
}
