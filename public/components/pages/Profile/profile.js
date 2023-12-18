import {ROUTES} from '../../../config.js';
import {removeMessage, renderMessage} from '../../Message/message.js';
import {goToPage} from '../../../modules/router.js';
import {STORAGE} from '../../../modules/storage.js';

/**
 * Функция для рендеринга страницы профиля авторизированного пользователя.
 * Если пользователь не авторизован, происходит редирект на страницу входа.
 *
 * @async
 * @function
 * @return {void}
 */
export const renderProfile = async () => {
  removeMessage();

  // Проверка авторизации
  if (!STORAGE.user) {
    goToPage(ROUTES.login, 0, true);
    renderMessage('Вы не авторизованы!', true);
    return;
  }

  const rootElement = document.querySelector('#root');
  rootElement.innerHTML = '';
  rootElement.innerHTML = Handlebars.templates.profile({user: STORAGE.user});

  const profilePicture = document.querySelector('#profile-page-picture');
  if (STORAGE.avatar) {
    profilePicture.src = `data:image/png;base64, ${STORAGE.avatar}`;
  }

  const settingButton = document.querySelector('#profile-settings-button');
  settingButton.addEventListener('click', () => {
    goToPage(ROUTES.updateProfile);
  });
  const formsButton = document.querySelector('#profile-forms-button');
  formsButton.addEventListener('click', () => {
    goToPage(ROUTES.forms);
  });
};
