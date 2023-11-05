import {API} from '../../../modules/api.js';
import {goToPage, ROUTES} from '../../../config.js';
import {removeMessage, renderMessage} from '../../Message/message.js';

/**
 * Функция для рендеринга страницы с созданными пользователем опросами.
 * Если пользователь не авторизован, происходит редирект на страницу входа.
 *
 * @async
 * @function
 * @return {void}
 */
export async function renderForms() {
  const api = new API();
  const isAuth = await api.isAuth();
  if (!isAuth.isAuthorized) {
    goToPage(ROUTES.login);
    renderMessage('Вы не авторизованы!', true);
    return;
  }

  removeMessage();
  const rootElement = document.querySelector('#root');
  rootElement.innerHTML = '';
  rootElement.innerHTML = Handlebars.templates.forms();
  const formsContainer = document.querySelector('#forms-container');

  const res = await api.getForms();

  if (res.status === 200) {
  // eslint-disable-next-line no-restricted-syntax
    for (const id in res.forms) {
      const item = document.createElement('div');
      item.innerHTML = Handlebars.templates.forms_item();

      const itemButton = item.querySelector('#list-item');
      itemButton.textContent = res.forms[id].title;
      itemButton.addEventListener('click', () => {
        goToPage(ROUTES.form, id);
      });

      formsContainer.appendChild(item);
    }
  } else {
    const label = document.createElement('a');
    label.textContent = 'Опросов пока нет...';
    formsContainer.appendChild(label);
  }
}
