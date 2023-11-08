import {renderLogin} from '../components/pages/Login/login.js';
import {renderSignup} from '../components/pages/Signup/signup.js';
import {renderForms} from '../components/pages/Forms/forms.js';
import {renderForm} from '../components/pages/Form/CheckForm/check_form.js';
import {renderMain} from '../components/pages/Main/main.js';
import {renderInitial} from '../components/Initial/Initial.js';
import {render404} from '../components/404/404.js';
import {ROUTES} from '../config.js';
import {renderProfile} from '../components/pages/Profile/profile.js';
import {navbar} from "../components/Navbar/navbar.js";

/**
 * Расщепляет url запроса на префикс и id страницы.
 *
 * @function
 * @param url - Путь из запроса.
 * @return {{ id: number | *, prefix: string }} - Объект,содержащий ID запроса и префикс url.
 */
export function parseUrl(url) {
  const index = url.indexOf('/', 1);
  if (index !== -1) {
    const id = url.slice(index + 1, url.length);
    const prefix = url.slice(0, index + 1);
    return {id, prefix};
  }
  const id = null;
  const prefix = url;
  return {id, prefix};
}

/**
 * Рендерит выбранную в аргументах страницу.
 *
 * @param page - Объект, в котором содержится информация о странице из ROUTES.
 * @param id - Объект(опцианальный параметр) для перехода на страницу конкретного опроса.
 * @return {void}
 */
export function goToPage(page, id = null) {
  navbar();
  if (id) {
    const url = page.url + id;
    window.history.pushState(page.state, '', url);
    page.open(id);
    return;
  }
  window.history.pushState(page.state, '', page.url);
  page.open();
}

/**
 * Рендерит необходимую страницу при перезагрузке сайта (или первом заходе)
 *
 * @async
 * @function
 * @return {void}
 */
export async function initialRouter() {
  const temp = parseUrl(window.location.pathname);
  const id = temp.id;
  const url = temp.prefix;

  await renderInitial();
  switch (url) {
    case '/':
      goToPage(ROUTES.main);
      break;
    case '/profile':
      goToPage(ROUTES.profile);
      break;
    case '/forms/':
      goToPage(ROUTES.form, id);
      break;
    case '/login':
      goToPage(ROUTES.login);
      break;
    case '/signup':
      goToPage(ROUTES.signup);
      break;
    default:
      window.history.pushState('404', '', url);
      render404();
      break;
  }
}

/**
 * Event listener для перехода по истории браузера.
 * При изменении текущего url в браузере происходит рендер соответствующей страницы.
 *
 * @function
 * @param event - Событие.
 * @return {void}
 */
// eslint-disable-next-line func-names
window.onpopstate = function (event) {
  const state = event.state;
  switch (state) {
    case 'main':
      renderMain();
      break;
    case 'forms':
      renderForms();
      break;
    case 'form':
      // eslint-disable-next-line no-case-declarations
      const id = parseUrl(window.location.pathname).id;
      renderForm(id);
      break;
    case 'profile':
      renderProfile();
      break;
    case 'login':
      renderLogin();
      break;
    case 'signup':
      renderSignup();
      break;
    default:
      render404();
      break;
  }
};
