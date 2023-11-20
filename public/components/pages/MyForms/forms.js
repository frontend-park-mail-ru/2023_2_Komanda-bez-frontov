import {API} from '../../../modules/api.js';
import {ROUTES} from '../../../config.js';
import {removeMessage, renderMessage} from '../../Message/message.js';
import {goToPage} from '../../../modules/router.js';
import {STORAGE} from '../../../modules/storage.js';

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

  const api = new API();
  const rootElement = document.querySelector('#root');
  rootElement.innerHTML = '';
  rootElement.innerHTML = Handlebars.templates.forms();

  // Проверка авторизации
  if (!STORAGE.user) {
    goToPage(ROUTES.login, 0, true);
    renderMessage('Вы не авторизованы!', true);
    return;
  }

  const formsContainer = document.querySelector('#forms-container');
  let forms = [];
  let message = 'ok';

  // Получение формы
  try {
    const res = await api.getForms(STORAGE.user.username);
    message = res.message;
    forms = res.forms;
    STORAGE.forms = res.forms;
  } catch (e) {
    if (e.toString() !== 'TypeError: Failed to fetch') {
      renderMessage('Ошибка сервера. Попробуйте позже.', true);
      return;
    }
    renderMessage('Потеряно соединение с сервером', true);
    // Попытка найти опросы в локальном хранилище
    forms = STORAGE.forms;
  }

  if (message === 'ok') {
    if (forms.length === 0) {
      const label = document.createElement('a');
      label.classList.add('forms_list_main-container_empty-label');
      label.textContent = 'Опросов пока нет...';
      formsContainer.appendChild(label);
    }

    forms.forEach((form) => {
      const item = document.createElement('div');
      item.innerHTML = Handlebars.templates.forms_item();

      const itemButton = item.querySelector('#forms-list-item');
      itemButton.textContent = form.title;
      itemButton.addEventListener('click', () => {
        goToPage(ROUTES.form, form.id);
      });

      formsContainer.appendChild(item);
    });
  } else {
    renderMessage(message, true);
  }

  const newFormButton = document.querySelector('#forms-list-add-button');
  newFormButton.addEventListener('click', () => {
    goToPage(ROUTES.formNew);
  });

  // Тестирование моментальных запросов
  const searchInput = document.querySelector('.forms_search-container__input');
  const searchRequest = () => {
    setTimeout(() => {
      console.log(searchInput.value);
      searchInput.addEventListener('input', searchRequest, {once: true});
    }, 1500);
  };
  searchInput.addEventListener('input', searchRequest, {once: true});
};
