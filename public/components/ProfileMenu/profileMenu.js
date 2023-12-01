import {ROUTES} from '../../config.js';
import {navbar} from '../Navbar/navbar.js';
import {goToPage} from '../../modules/router.js';
import {STORAGE} from '../../modules/storage.js';

/**
 * Функция для рендеринга страницы с созданными пользователем опросами.
 * Если пользователь не авторизован, ничего не происходит.
 *
 * @function
 * @return {void}
 */
export const renderProfileMenu = () => {
  if (!STORAGE.user) {
    return;
  }
  const navbarElement = document.querySelector('#navbar');
  navbarElement.innerHTML += Handlebars.templates.profileMenu();

  // Функция убирающая рендер меню, а так же убирающая event listener клика по области вне нее
  const removeProfileMenu = (e) => {
    if (!e.target.classList.contains('navbar-profile-menu')
            && !e.target.parentNode.classList.contains('navbar-profile-menu')) {
      document.body.removeEventListener('click', removeProfileMenu);
      navbar();
    }
  };
  document.body.addEventListener('click', removeProfileMenu);

  const profileButton = document.querySelector('#navbar-menu-profile-button');
  profileButton.addEventListener('click', () => {
    document.body.removeEventListener('click', removeProfileMenu);
    navbar();
    goToPage(ROUTES.profile);
  });
  const formsButton = document.querySelector('#navbar-menu-forms-button');
  formsButton.addEventListener('click', () => {
    document.body.removeEventListener('click', removeProfileMenu);
    navbar();
    goToPage(ROUTES.forms);
  });
  // const historyButton = document.querySelector("#navbar-menu-history-button")
  // historyButton.addEventListener("click", (e) => {
  //     document.body.removeEventListener("click", removeProfileMenu)
  //     goToPage(ROUTES.history);
  // });
  // const settingsButton = document.querySelector("#navbar-menu-settings-button")
  // settingsButton.addEventListener("click", (e) => {
  //     document.body.removeEventListener("click", removeProfileMenu)
  //     goToPage(ROUTES.settings);
  // });

  const logoutButton = document.querySelector('#navbar-menu-logout-button');
  logoutButton.addEventListener('click', () => {
    document.body.removeEventListener('click', removeProfileMenu);
    goToPage(ROUTES.logout);
  });
};
