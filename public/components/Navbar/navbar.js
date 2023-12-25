import {ROUTES} from '../../config.js';
import {renderProfileMenu} from '../ProfileMenu/profileMenu.js';
import {removeMessage} from '../Message/message.js';
import {goToPage} from '../../modules/router.js';
import {STORAGE} from '../../modules/storage.js';

/**
 * Функция для рендеринга навбара страницы.
 * Если в функцию был передан объект пользователя, то рендерится навбар с профилем пользователя,
 * иначе - с кнопками "Войти" и "Регистрация".
 *
 * @async
 * @function
 * @return {void}
 */
export const navbar = () => {
  const navbarElement = document.querySelector('#navbar');
  navbarElement.innerHTML = '';

  const user = STORAGE.user;
  if (user) {
    navbarElement.innerHTML = Handlebars.templates.navbar({ user: STORAGE.user });

    const profilePicture = document.querySelector('#navbar-profile-picture');
    if (STORAGE.avatar) {
      profilePicture.src = `data:image/png;base64, ${STORAGE.avatar}`;
    }
    const profileButton = document.querySelector('#navbar-profile');
    profileButton.addEventListener('click', (e) => {
      e.stopImmediatePropagation();
      if (e.target.id === 'navbar-mail-button') {
        return;
      }
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
  const logoButton = document.querySelector('#navbar-logo');
  logoButton.addEventListener('click', () => {
    removeMessage();
    if (!STORAGE.user) {
      goToPage(ROUTES.main);
    } else {
      goToPage(ROUTES.forms);
    }
  });
  const mailButton = document.querySelector('#navbar-mail-button');
  mailButton.addEventListener('click', () => {
    goToPage(ROUTES.chats);
  });

};

export const changeMailIconUnread = (unread) => {
  const mailButton = document.querySelector('#navbar-mail-button');
  mailButton.innerHTML = unread ? "mark_email_unread" : "mail";
}
