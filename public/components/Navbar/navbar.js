import {ROUTES} from '../../config.js';
import {renderProfileMenu} from '../ProfileMenu/profileMenu.js';
import {removeMessage} from '../Message/message.js';
import {goToPage} from '../../modules/router.js';
import {STORAGE} from "../../index.js";

/**
 * Функция для рендеринга навбара страницы.
 * Если в функцию был передан объект пользователя, то рендерится навбар с профилем пользователя,
 * иначе - с кнопками "Войти" и "Регистрация".
 *
 * @async
 * @function
 * @return {void}
 */
export function navbar() {
  const navbarElement = document.querySelector('#navbar');
  navbarElement.innerHTML = '';

  const user = STORAGE.user;
  if (user) {
    navbarElement.innerHTML = Handlebars.templates.navbar({ user: STORAGE.user });

    const profilePicture = document.querySelector('#navbar-profile-picture');
    if (STORAGE.avatar) {
      profilePicture.src = "data:image/png;base64, " + STORAGE.avatar;
    }
    const profileButton = document.querySelector('#navbar-profile');
    profileButton.addEventListener('click', (e) => {
      e.stopImmediatePropagation();
      renderProfileMenu();
    });
  } else {
    navbarElement.innerHTML = Handlebars.templates.navbar();
    const loginButton = document.querySelector('#navbar-login-button');
    loginButton.addEventListener('click', () => {
      goToPage(ROUTES.login);
    });

    const signupButton = document.querySelector('#navbar-signup-button');
    signupButton.addEventListener('click', () => {
      goToPage(ROUTES.signup);
    });
  }
  const logoButton = document.querySelector('#navbar-logo-label');
  logoButton.addEventListener('click', () => {
    removeMessage();
    goToPage(ROUTES.main);
  });
}
