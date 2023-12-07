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

  const newFormButton = document.querySelector('#forms-list-add-button');
  newFormButton.addEventListener('click', () => {
    goToPage(ROUTES.formNew);
  });

  // Запрос с поиском по опросам
  const searchInput = document.querySelector('.forms_search-container__input');
  const searchRequest = () => {
    if (searchInput.value === '') {
      showAllFormsRequest();
      return;
    }
    searchFormsRequest();
  };
  searchInput.addEventListener('input', debounce(searchRequest, 600));
  searchInput.addEventListener('input', () =>
      loadingScreen.classList.remove('display-invisible')
  );

  const formsContainer = document.querySelector('#forms-container');
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
        if (searchON) {
          label.textContent = 'Опросы не найдены';
          formsContainer.appendChild(label);
        } else {
          label.textContent = 'Опросов пока нет...';
          const createNewLink = document.createElement('a');
          createNewLink.classList.add('forms_list_main-container_create-new-label');
          createNewLink.textContent = 'Создайте свой первый опрос';
          createNewLink.addEventListener('click', () => {
            goToPage(ROUTES.formNew);
          });
          formsContainer.appendChild(label);
          formsContainer.appendChild(createNewLink);
        }
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
      renderMessage('Ошибка сервера. Перезагрузите страницу', true);
      return;
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
      loadingScreen.classList.add('display-invisible');
    } catch (e) {
      loadingScreen.classList.add('display-invisible');
      renderMessage('Ошибка сервера. Перезагрузите страницу', true);
      return;
    }

    if (forms) {
      forms = forms.sort((a, b) => b.id - a.id);
    }
    renderRequestedForms();
  };

  await showAllFormsRequest();

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
