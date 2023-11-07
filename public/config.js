import {renderMainLogout} from './components/Logout/logout.js';
import {renderLogin} from './components/pages/Login/login.js';
import {renderForms} from './components/pages/Forms/forms.js';
import {renderForm} from './components/pages/Form/form.js';
import {renderMain} from './components/pages/Main/main.js';
import {renderSignup} from './components/pages/Signup/signup.js';
import {renderProfile} from './components/pages/Profile/profile.js';

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
  profile: {
    url: '/profile',
    state: 'profile',
    open: renderProfile,
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

export const backendUrl = 'http://localhost:8080/api/v1';

const GET_METHOD = 'GET';
const POST_METHOD = 'POST';

export const ROUTES_API = {
  login: {
    url: '/login',
    method: POST_METHOD,
  },
  signup: {
    url: '/signup',
    method: POST_METHOD,
  },
  isAuth: {
    url: '/is_authorized',
    method: GET_METHOD,
  },
  logout: {
    url: '/logout',
    method: POST_METHOD,
  },
  avatar: {
    url: '/user/:username/avatar',
    method: GET_METHOD,
  },
  forms: {
    url: '/forms',
    method: GET_METHOD,
  },
  form: {
    url: '/forms/:id',
    method: GET_METHOD,
  },
};
