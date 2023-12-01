import {goToPage} from "../../../modules/router.js";
import {ROUTES} from "../../../config.js";
import {STORAGE} from "../../../modules/storage.js";
import {renderMessage} from "../../Message/message.js";

/**
 * Функция для рендеринга главной страницы с информацией о сервисе.
 *
 * @function
 * @return {void}
 */
export const renderMain = () => {
  if (STORAGE.user) {
    goToPage(ROUTES.forms);
    return;
  }

  const rootElement = document.querySelector('#root');
  rootElement.innerHTML = '';
  rootElement.innerHTML = Handlebars.templates.main();

  const formsButton = document.querySelector('#index-forms-button');
  formsButton.addEventListener('click', () => {
    goToPage(ROUTES.forms);
  });
  const signupButton = document.querySelector('#index-signup-button');
  signupButton.addEventListener('click', () => {
    goToPage(ROUTES.signup);
  });
};
