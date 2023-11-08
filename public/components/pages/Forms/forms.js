import {API} from '../../../modules/api.js';
import {ROUTES} from '../../../config.js';
import {removeMessage, renderMessage} from '../../Message/message.js';
import {goToPage} from '../../../modules/router.js';
import {STORAGE} from '../../../index.js';

/**
 * Функция для рендеринга страницы с созданными пользователем опросами.
 * Если пользователь не авторизован, происходит редирект на страницу входа.
 *
 * @async
 * @function
 * @return {void}
 */
export async function renderForms() {
  removeMessage();

  const api = new API();
  const rootElement = document.querySelector('#root');
  rootElement.innerHTML = '';
  rootElement.innerHTML = Handlebars.templates.forms();

  try {
    const isAuth = await api.isAuth();
    if (!isAuth.isAuthorized) {
      STORAGE.user = null;
      STORAGE.avatar = null;
      goToPage(ROUTES.login);
      renderMessage('Вы не авторизованы!', true);
      return;
    }
  } catch (e) {
    if (e.toString() === 'TypeError: Failed to fetch') {
      renderMessage('Потеряно соединение с сервером', true);
    }
    return;
  }

  const formsContainer = document.querySelector('#forms-container');

  const res = await api.getForms(STORAGE.user.username);
  if (res.status === 200) {
    if (res.count === 0) {
      const label = document.createElement('a');
      label.classList.add('forms_list_main-container_empty-label');
      label.textContent = 'Опросов пока нет...';
      formsContainer.appendChild(label);
      return;
    }
    // eslint-disable-next-line no-restricted-syntax
    for (const index in res.forms) {
      const form = res.forms[index];

      const item = document.createElement('div');
      item.innerHTML = Handlebars.templates.forms_item();

      const itemButton = item.querySelector('#forms-list-item');
      itemButton.textContent = form.title;
      itemButton.addEventListener('click', () => {
        goToPage(ROUTES.form, form.id);
      });

      formsContainer.appendChild(item);
    }
  } else {
    renderMessage('Ошибка сервера. Попробуйте позже.', true);
  }
}
