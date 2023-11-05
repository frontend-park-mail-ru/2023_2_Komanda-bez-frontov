import {renderInitial} from './components/Initial/Initial.js';
import {renderMainLogout} from './components/Logout/logout.js';
import {renderLogin} from './components/pages/Login/login.js';
import {renderForms} from './components/pages/Forms/forms.js';
import {renderForm} from './components/pages/Form/form.js';
import {renderMain} from './components/pages/Main/main.js';
import {renderSignup} from './components/pages/Signup/signup.js';

export const ROUTES = {
  main: {
    url: '/',
    state: 'main',
    open: renderMain,
  },
  forms: {
    url: '/forms/',
    state: 'forms',
    open: renderForms,
  },
  form: {
    url: '/forms/',
    state: 'form',
    open: renderForm,
  },
  signup: {
    url: '/signup',
    state: 'signup',
    open: renderSignup,
  },
  login: {
    url: '/login',
    state: 'login',
    open: renderLogin,
  },
  logout: {
    url: '/logout',
    state: 'main',
    open: renderMainLogout,
  },
};

export const SERVER_URL = 'https://b0f0-109-252-180-89.ngrok-free.app';

/**
 * Рендерит выбранную в аргументах страницу.
 *
 * @param page - Объект, в котором содержится информация о странице из ROUTES.
 * @param id - Объект(опцианальный параметр) для перехода на страницу конкретного опроса.
 * @return {void}
 */
export function goToPage(page, id = null) {
  if (id) {
    const url = page.url + id;
    window.history.pushState(page.state, '', url);
    page.open(id);
    return;
  }
  window.history.pushState(page.state, '', page.url);
  page.open();
}
