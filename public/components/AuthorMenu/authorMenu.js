import {frontendUrl, ROUTES} from '../../config.js';
import {goToPage} from '../../modules/router.js';
import {STORAGE} from '../../modules/storage.js';
import {renderPopUpWindow} from '../PopUpWindow/popup_window.js';

/**
 * Функция для рендеринга меню с инструментами автора опроса.
 * Если пользователь не авторизован, ничего не происходит.
 *
 * @function
 * @param {number} id - ID опроса.
 * @return {void}
 */
export const renderAuthorMenu = (id) => {
  if (!STORAGE.user) {
    return;
  }
  const rootElement = document.querySelector('#root');
  rootElement.innerHTML = Handlebars.templates.authorMenu();

  const menu = document.querySelector('.form-author-menu');
  let flagClosed = false;
  
  const checkButton = document.querySelector('#author-menu-check-button');
  checkButton.addEventListener('click', () => {
    if (checkButton.classList.contains('secondary-button')) {
      menu.classList.remove('form-author-menu__open');
      menu.classList.add('form-author-menu__close');
      closeButton.innerHTML = 'menu';
      flagClosed = true;
    } else {
      goToPage(ROUTES.form, id);
    }
  });

  const updateButton = document.querySelector('#author-menu-update-button');
  updateButton.addEventListener('click', () => {
    if (updateButton.classList.contains('secondary-button')) {
      menu.classList.remove('form-author-menu__open');
      menu.classList.add('form-author-menu__close');
      closeButton.innerHTML = 'menu';
      flagClosed = true;
    } else {
      goToPage(ROUTES.formUpdate, id);
    }
  });

  const resultsButton = document.querySelector('#author-menu-results-button');
  resultsButton.addEventListener('click', () => {
    if (resultsButton.classList.contains('secondary-button')) {
      menu.classList.remove('form-author-menu__open');
      menu.classList.add('form-author-menu__close');
      closeButton.innerHTML = 'menu';
      flagClosed = true;
    } else {
      goToPage(ROUTES.formResults, id);
    }
  });

  const createLinkButton = document.querySelector('#author-menu-link-button');
  createLinkButton.addEventListener('click', (e) => {
    const link = `${frontendUrl}/forms/${id}`;
    e.stopImmediatePropagation();
    renderPopUpWindow('Ссылка на ваш опрос', link, false, () => {
      const copyButton = document.querySelector('#popup-ok-button');
      copyButton.innerHTML = 'Скопировано!';
      copyButton.classList.add('primary-button');
      copyButton.classList.remove('secondary-button');
      // Копирование ссылки в буфер на компе
      navigator.clipboard.writeText(link);
    });
    document.querySelector('#popup-ok-button').innerHTML = 'Скопировать';
  })

  const closeButton = document.querySelector('#author-menu-close-button');
  closeButton.addEventListener('click', () => {
    if (flagClosed) {
      menu.classList.add('form-author-menu__open');
      menu.classList.remove('form-author-menu__close');
      closeButton.innerHTML = 'menu_open';
      flagClosed = false;
    } else {
      menu.classList.remove('form-author-menu__open');
      menu.classList.add('form-author-menu__close');
      closeButton.innerHTML = 'menu';
      flagClosed = true;
    }
  });

};
