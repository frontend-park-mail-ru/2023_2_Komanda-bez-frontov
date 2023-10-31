import {renderMain, renderMainLogout} from "./components/Main/main.js";
import {renderLogin} from "./components/Login/login.js";
import {renderForms} from "./components/Forms/forms.js";
import {renderForm} from "./components/Form/form.js";
import {renderSignup} from "./components/Signup/signup.js";

export const ROUTES = {
    main: {
        url: '/main',
        state: 'main',
        open: renderMain,
    },
    forms:{
        url: '/',
        state: 'forms',
        open: renderForms,
    },
    form:{
        url: '/forms/',
        state: 'form',
        open: renderForm,
    },
    signup:{
        url: '/signup',
        state: 'signup',
        open: renderSignup,
    },
    login:{
        url: '/login',
        state: 'login',
        open: renderLogin,
    },
    logout:{
        url: '/logout',
        state: 'main',
        open: renderMainLogout,
    }
}

export const SERVER_URL = "https://b0f0-109-252-180-89.ngrok-free.app";

export function goToPage(page, id = null) {
    if (id) {
        const url = page.url + id;
        window.history.pushState(page.state,'', url)
        page.open(id);
        return;
    }
    window.history.pushState(page.state,'', page.url)
    page.open();
}

