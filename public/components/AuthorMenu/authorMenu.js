import {ROUTES} from '../../config.js';
import {goToPage} from '../../modules/router.js';
import {STORAGE} from '../../modules/storage.js';

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

  setTimeout(() => {
    const checkButton = document.querySelector('#author-menu-check-button');
    checkButton.addEventListener('click', () => {
      goToPage(ROUTES.form, id);
    });

    const updateButton = document.querySelector('#author-menu-update-button');
    updateButton.addEventListener('click', () => {
      goToPage(ROUTES.formUpdate, id);
    });

    // const resultsButton = document.querySelector('#author-menu-results-button');
    // resultsButton.addEventListener('click', () => {
    //   goToPage(ROUTES.formResults, id);
    // });
  }, 10);

};
