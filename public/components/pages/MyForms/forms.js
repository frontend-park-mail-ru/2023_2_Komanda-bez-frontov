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

  const formsContainer = document.querySelector('#forms-container');
  const searchInput = document.querySelector('.forms_search-container__input');
  const loadingScreen = document.querySelector('.forms__loading-screen');
  let forms = [];
  let message = 'ok';

  // Рендерит полученные опросы на страничке
  const renderRequestedForms = (searchON = false) => {
    if (message === 'ok') {
      formsContainer.innerHTML = '';

      if (forms.length === 0) {
        const label = document.createElement('a');
        label.classList.add('forms_list_main-container_empty-label');
        label.textContent = 'Опросы не найдены';
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
  };

  // Отображает результаты поиска по введеной строке
  const searchFormsRequest = async () => {
    // Получение формы
    try {
      const res = await api.getFormsByTitle(searchInput.value);
      message = res.message;
      forms = res.forms;
      loadingScreen.classList.add('display-invisible');
    } catch (e) {
      loadingScreen.classList.add('display-invisible');
      if (e.toString() !== 'TypeError: Failed to fetch') {
        renderMessage('Ошибка сервера. Попробуйте позже.', true);
        return;
      }
      renderMessage('Потеряно соединение с сервером', true);
    }

    renderRequestedForms(true);
  };

  // Отображает все созданные пользователем опросы
  const showAllFormsRequest = async () => {
    // Получение формы
    try {
      const res = await api.getForms(STORAGE.user.username);
      message = res.message;
      forms = res.forms;
      STORAGE.forms = res.forms;
      loadingScreen.classList.add('display-invisible');
    } catch (e) {
      loadingScreen.classList.add('display-invisible');
      if (e.toString() !== 'TypeError: Failed to fetch') {
        renderMessage('Ошибка сервера. Попробуйте позже.', true);
        return;
      }
      renderMessage('Потеряно соединение с сервером', true);
      // Попытка найти опросы в локальном хранилище
      forms = STORAGE.forms;
    }

    forms = forms.sort((a, b) => b.id - a.id);
    renderRequestedForms();
  };

  await showAllFormsRequest();

  const newFormButton = document.querySelector('#forms-list-add-button');
  newFormButton.addEventListener('click', () => {
    goToPage(ROUTES.formNew);
  });

  const searchButton = document.querySelector('#forms-list-search-button');
  searchButton.addEventListener('click', () => {
    loadingScreen.classList.remove('display-invisible');
    if (searchInput.value === '') {
      showAllFormsRequest();
      return;
    }
    searchFormsRequest();
  });
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      loadingScreen.classList.remove('display-invisible');
      if (searchInput.value === '') {
        showAllFormsRequest();
        return;
      }
      searchFormsRequest();
    }
  });

  // Тестирование моментальных запросов
  const searchRequest = () => {
    if (searchInput.value === '') {
      showAllFormsRequest();
      return;
    }
    searchFormsRequest();
  };
  searchInput.addEventListener('input', debounce(searchRequest, 500));
  searchInput.addEventListener('input', () =>
      loadingScreen.classList.remove('display-invisible')
  );
};

export const debounce = (func, delay) => {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
}
