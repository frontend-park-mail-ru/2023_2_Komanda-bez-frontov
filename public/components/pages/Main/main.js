import {goToPage} from "../../../modules/router.js";
import {ROUTES} from "../../../config.js";
import {STORAGE} from "../../../modules/storage.js";
import {removeCSAT, renderCSAT} from "../../CSAT/csat.js";

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

  // renderCSAT("../../CSAT/csat.html");
  //
  // window.onmessage = function(event){
  //   if (event.data === 'close') {
  //     removeCSAT();
  //   }
  // };
};
