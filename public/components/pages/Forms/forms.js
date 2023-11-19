import {API} from '../../../modules/api.js';
import {ROUTES} from '../../../config.js';
import {removeMessage, renderMessage} from '../../Message/message.js';
import {goToPage} from "../../../modules/router.js";

/**
 * Функция для рендеринга страницы с созданными пользователем опросами.
 * Если пользователь не авторизован, происходит редирект на страницу входа.
 *
 * @async
 * @function
 * @return {void}
 */
export const renderForms = async () => {
  removeMessage();
  const rootElement = document.querySelector('#root');
  rootElement.innerHTML = '';
  rootElement.innerHTML = Handlebars.templates.forms();
  const formsContainer = document.querySelector('#forms-container');

  const api = new API();
  const res = await api.getForms();

  if (res.forms) {
    res.forms.forEach((form) => {
      const item = document.createElement('div');
      item.innerHTML = Handlebars.templates.forms_item();

      const itemButton = item.querySelector('#list-item');
      itemButton.textContent = form.title;
      itemButton.addEventListener('click', () => {
        goToPage(ROUTES.form, form.id);
      });

      formsContainer.appendChild(item);
    });
  } else {
    const label = document.createElement('a');
    label.textContent = 'Опросов пока нет...';
    formsContainer.appendChild(label);
  }
};
