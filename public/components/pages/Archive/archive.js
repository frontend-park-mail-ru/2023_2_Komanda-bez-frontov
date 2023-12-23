import {renderForms} from "../MyForms/forms.js";

/**
 * Функция для рендеринга страницы с архивированными опросами.
 * Если пользователь не авторизован, происходит редирект на страницу входа.
 *
 * @async
 * @function
 * @return {void}
 */
export const renderArchive = async () => {
  renderForms(true);

  const titleContainer = document.querySelector('.forms_title-container');
  const title = document.createElement('h3');
  title.innerHTML = 'Архив опросов';
  titleContainer.innerHTML = '';
  titleContainer.appendChild(title);
};

