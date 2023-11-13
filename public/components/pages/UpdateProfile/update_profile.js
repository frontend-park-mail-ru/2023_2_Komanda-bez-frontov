import {ROUTES} from '../../../config.js';
import {removeMessage, renderMessage} from '../../Message/message.js';
import {goToPage} from '../../../modules/router.js';
import {STORAGE} from '../../../modules/storage.js';

/**
 * Функция для рендеринга страницы изменения профиля авторизированного пользователя.
 * Если пользователь не авторизован, происходит редирект на страницу входа.
 *
 * @async
 * @function
 * @return {void}
 */
export const renderUpdateProfile = async () => {
  removeMessage();

  // Проверка авторизации
  if (!STORAGE.user) {
    goToPage(ROUTES.login);
    renderMessage('Вы не авторизованы!', true);
    return;
  }

  const rootElement = document.querySelector('#root');
  rootElement.innerHTML = '';
  rootElement.innerHTML = Handlebars.templates.update_profile({User: STORAGE.user});

  const user = STORAGE.user;
  const profilePicture = document.querySelector('#update-profile-page-picture');
  if (STORAGE.avatar) {
    profilePicture.src = `data:image/png;base64, ${STORAGE.avatar}`;
  }

  //
  // // const settingButton = document.querySelector("#profile-settings-button");
  // // settingButton.textContent = res.forms[id].title;
  // // settingButton.addEventListener("click", function (e) {
  // //     goToPage(ROUTES.settings);
  // // });
  // const formsButton = document.querySelector('#profile-forms-button');
  // formsButton.addEventListener('click', () => {
  //   goToPage(ROUTES.forms);
  // });

};
