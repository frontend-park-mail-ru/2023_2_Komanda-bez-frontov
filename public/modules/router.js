import {renderLogin} from '../components/pages/Login/login.js';
import {renderSignup} from '../components/pages/Signup/signup.js';
import {renderForms} from '../components/pages/Forms/forms.js';
import {renderForm} from '../components/pages/Form/CheckForm/check_form.js';
import {renderMain} from '../components/pages/Main/main.js';
import {renderInitial} from '../components/Initial/Initial.js';
import {render404} from '../components/404/404.js';
import {ROUTES} from '../config.js';
import {renderProfile} from '../components/pages/Profile/profile.js';
import {navbar} from '../components/Navbar/navbar.js';
import {renderFormUpdate} from '../components/pages/Form/UpdateForm/update_form.js';

/**
 * Расщепляет url запроса на нормальный url (с :id по умолчанию) и id страницы.
 * Так же убирает слеш в конце, если после него ничего не написано.
 * Например, '/forms/34/edit' -> { 'id': '34', 'normalUrl': '/forms/:id/edit' }
 *           '/forms/' -> { 'id': null, 'normalUrl': '/forms' }
 *
 * @function
 * @param url - Путь из запроса.
 * @return {{ id: number | *, normalUrl: string }} - Объект,содержащий ID запроса и нормальный url.
 */
export function parseUrl(url) {
  if (url[url.length - 1] === '/' && url.length > 1) {
    // eslint-disable-next-line no-param-reassign
    url = url.slice(0, url.length - 1);
  }
  const index = url.indexOf('/', 1);
  if (index !== -1) {
    let indexRight = url.indexOf('/', index + 1);
    if (indexRight === -1) {
      indexRight = url.length;
    }
    const id = url.slice(index + 1, indexRight);
    const normalUrl = `${url.slice(0, index + 1)}:id${url.slice(indexRight, url.length)}`;
    return {id, normalUrl};
  }
  const id = null;
  const normalUrl = url;
  return {id, normalUrl};
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
  window.scroll(0, 0);
  if (id) {
    const url = page.url.replace(':id', id.toString());
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
  // console.log(temp);
  const id = temp.id;
  const url = temp.normalUrl;

  await renderInitial();
  switch (url) {
    case '/':
      goToPage(ROUTES.main);
      break;
    case '/profile':
      goToPage(ROUTES.profile);
      break;
    case '/forms':
      goToPage(ROUTES.form, id);
      break;
    case '/forms/:id':
      goToPage(ROUTES.form, id);
      break;
    case '/forms/:id/edit':
      goToPage(ROUTES.formUpdate, id);
      break;
    case '/login':
      goToPage(ROUTES.login);
      break;
    case '/signup':
      goToPage(ROUTES.signup);
      break;
    default:
      // window.history.pushState('404', '', url);
      navbar();
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
      renderForm(parseUrl(window.location.pathname).id);
      break;
    case 'formUpdate':
      renderFormUpdate(parseUrl(window.location.pathname).id);
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
