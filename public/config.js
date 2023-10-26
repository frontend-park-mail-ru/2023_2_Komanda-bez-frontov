import {renderMain} from "./components/Main/main.js";
import {renderLogin} from "./components/Login/login.js";
import {renderSignup} from "./components/Signup/signup.js";


export const ROUTES = {
    main: {
        url: '/main',
        open: renderMain,
    },
    signup:{
        url: '/signup',
        open: renderSignup,
    },
    login:{
        url: '/login',
        open: renderLogin,
    }
}

export const SERVER_URL = "https://b0f0-109-252-180-89.ngrok-free.app";

export function goToPage(page) {
    // window.location.href = page.url;
    page.open();
}
