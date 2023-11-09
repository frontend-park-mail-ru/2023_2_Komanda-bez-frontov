import {API} from '../../../modules/api.js';
import {ROUTES} from '../../../config.js';
import {removeMessage, renderMessage} from '../../Message/message.js';
import {goToPage} from '../../../modules/router.js';
import {clearStorage, STORAGE} from '../../../modules/storage.js';

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
      clearStorage();
      goToPage(ROUTES.login);
      renderMessage('Вы не авторизованы!', true);
      return;
    }
  } catch (e) {
    if (e.toString() === 'TypeError: Failed to fetch') {
      renderMessage('Потеряно соединение с сервером', true);
    }
    if (!STORAGE.user) {
      goToPage(ROUTES.main);
    }
  }

  const formsContainer = document.querySelector('#forms-container');
  let forms = [];
  let status = 200;

  try {
    const res = await api.getForms(STORAGE.user.username);
    status = res.status;
    forms = res.forms;
    STORAGE.forms = res.forms;
  } catch (e) {
    if (e.toString() !== 'TypeError: Failed to fetch') {
      renderMessage('Ошибка сервера. Попробуйте позже.', true);
      return;
    }
    renderMessage('Потеряно соединение с сервером', true);
    forms = STORAGE.forms;
  }

  if (status === 200) {
    if (forms.length === 0) {
      const label = document.createElement('a');
      label.classList.add('forms_list_main-container_empty-label');
      label.textContent = 'Опросов пока нет...';
      formsContainer.appendChild(label);
      return;
    }
    // eslint-disable-next-line no-restricted-syntax
    for (const index in forms) {
      const form = forms[index];

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
