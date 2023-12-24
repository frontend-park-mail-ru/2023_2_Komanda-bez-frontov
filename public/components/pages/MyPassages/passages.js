import {API, defaultFetchErrorMessage} from '../../../modules/api.js';
import {ROUTES} from '../../../config.js';
import {removeMessage, renderMessage} from '../../Message/message.js';
import {goToPage} from '../../../modules/router.js';
import {STORAGE} from '../../../modules/storage.js';
import {closePopUpWindow, renderPopUpWindow} from "../../PopUpWindow/popup_window.js";
import {editInProcess} from "../Form/UpdateForm/update_form.js";

/**
 * Функция для рендеринга страницы с пройденным пользователем опросами.
 * Если пользователь не авторизован, происходит редирект на страницу входа.
 *
 * @async
 * @function
 * @return {void}
 */
export const renderPassages = async () => {
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
  title.innerHTML = 'История прохождений';
  titleContainer.innerHTML = '';
  titleContainer.appendChild(title);

  const formsContainer = document.querySelector('#forms-container');
  let forms = [];
  let message = 'ok';

  try {
    const res = await api.getPassageForms();
    message = res.message;
    forms = res.forms;
  } catch (e) {
    renderMessage(defaultFetchErrorMessage, true);
    return;
  }
  if (forms) {
    forms = forms.sort((a, b) => b.id - a.id);
  }

    if (message === 'ok') {
      formsContainer.innerHTML = '';
      if (forms.length === 0) {
        const label = document.createElement('a');
        label.classList.add('forms_list_main-container_empty-label');
        label.textContent = 'История прохождений пуста';
        formsContainer.appendChild(label);
      } else {
        const temp = document.createElement('div');
        forms.forEach((form) => {
          const date = new Date(form.finished_at);
          const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          };
          form.finished_at = date.toLocaleDateString('ru', options);
          temp.innerHTML = Handlebars.templates.form_pass_item({form: form});
          const item = temp.querySelector('#forms-pass-list-item');
          item.addEventListener('click', () => {
            goToPage(ROUTES.passage, form.id);
          });
          formsContainer.appendChild(item);
        });
      }

    } else {
      renderMessage(message, true);
    }

};
