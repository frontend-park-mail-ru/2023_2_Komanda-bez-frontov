import {renderMain, renderMainLogout} from "./components/Main/main.js";
import {renderLogin} from "./components/Login/login.js";
import {renderSignup} from "./components/Signup/signup.js";


export const ROUTES = {
    main: {
        url: '/',
        state: 'main',
        open: renderMain,
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

export function goToPage(page) {
    window.history.pushState(page.state,'', page.url)
    page.open();
}
