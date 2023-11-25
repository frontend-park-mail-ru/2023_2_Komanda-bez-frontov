import {ROUTES} from '../config.js';
import {renderLogin} from '../components/pages/Login/login.js';
import {renderSignup} from '../components/pages/Signup/signup.js';
import {renderForms} from '../components/pages/Forms/forms.js';
import {renderForm} from '../components/pages/Form/CheckForm/check_form.js';
import {renderMain} from '../components/pages/Main/main.js';
import {renderInitial} from '../components/Initial/Initial.js';
import {render404} from '../components/404/404.js';
import {renderProfile} from '../components/pages/Profile/profile.js';
import {navbar} from '../components/Navbar/navbar.js';
import {renderFormUpdate} from '../components/pages/Form/UpdateForm/update_form.js';
import {renderFormNew} from '../components/pages/Form/FormNew/new_form.js';
import {renderUpdateProfile} from '../components/pages/UpdateProfile/update_profile.js';
import {removeMessage} from "../components/Message/message.js";
import {renderCsatResults} from "../components/pages/csatResult/csat_result.js";
import {removeCSAT} from "../components/CSAT/csat.js";

/**
 * Расщепляет url запроса на нормальный url (с :id по умолчанию) и id страницы.
 * Так же убирает слеш в конце, если после него ничего не написано.
 * Например, '/forms/34/edit' -> { 'id': '34', 'normalUrl': '/forms/:id/edit' }
 *           '/forms/' -> { 'id': null, 'normalUrl': '/forms' }
 *
 * @function
 * @param url - Путь из запроса.
 * @return {{ id: number | null, normalUrl: string }} - Объект,содержащий
 * ID запроса и нормальный url.
 */
export const parseUrl = (url) => {
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
    if (!Number.isNaN(Number(id))) {
      const normalUrl = `${url.slice(0, index + 1)}:id${url.slice(indexRight, url.length)}`;
      return {id: Number(id), normalUrl};
    }
    return {id: null, normalUrl: url};
  }
  const id = null;
  const normalUrl = url;
  return {id, normalUrl};
};

/**
 * Рендерит выбранную в аргументах страницу.
 * Добавляет либо заменяет на ее в истории переходов.
 *
 * @param page - Объект, в котором содержится информация о странице из ROUTES.
 * @param id - Объект(опцианальный параметр) для перехода на страницу конкретного опроса.
 * @param redirect - Флаг, означающий, что случился редирект.
 * @return {void}
 */
export const goToPage = (page, id = null, redirect = false) => {
  if (!id) {
    id = '';
  }
  const url = page.url.replace(':id', id.toString());
  window.scroll(0, 0);
  navbar();

  if (window.location.pathname !== url) {
    if (redirect) {
      window.history.replaceState(page.state, '', url);
    } else {
      window.history.pushState(page.state, '', url);
    }
  }
  if (id) {
    page.open(id);
    return;
  }
  page.open();
  removeCSAT();
};

/**
 * Рендерит необходимую страницу при перезагрузке сайта (или первом заходе)
 *
 * @async
 * @function
 * @return {void}
 */
export const initialRouter = async () => {
  const temp = parseUrl(window.location.pathname);
  const id = temp.id;
  const url = temp.normalUrl;

  await renderInitial();
  switch (url) {
    case '/':
      goToPage(ROUTES.main);
      break;
    case '/profile':
      goToPage(ROUTES.profile, 0, true);
      break;
    case '/profile/update':
      goToPage(ROUTES.updateProfile);
      break;
    case '/forms':
      goToPage(ROUTES.forms, 0, true);
      break;
    case '/forms/new':
      goToPage(ROUTES.formNew);
      break;
    case '/forms/:id':
      goToPage(ROUTES.form, id, true);
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
    case '/csat_result':
      goToPage(ROUTES.csat_result);
      break;
    default:
      // window.history.pushState('404', '', url);
      navbar();
      render404();
  }
};

/**
 * Event listener для перехода по истории браузера.
 * При изменении текущего url в браузере происходит рендер соответствующей страницы.
 *
 * @function
 * @param event - Событие.
 * @return {void}
 */
// eslint-disable-next-line func-names
window.onpopstate = (event) => {
  removeMessage();
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
    case 'formNew':
      renderFormNew();
      break;
    case 'profile':
      renderProfile();
      break;
    case 'updateProfile':
      renderUpdateProfile();
      break;
    case 'login':
      renderLogin();
      break;
    case 'signup':
      renderSignup();
      break;
    case 'cast_result':
      renderCsatResults();
      break;
    default:
      render404();
  }
};
