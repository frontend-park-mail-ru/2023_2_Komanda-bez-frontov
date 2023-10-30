'use strict'

import {renderMain} from "./components/Main/main.js";
import {renderLogin} from "./components/Login/login.js";
import {renderSignup} from "./components/Signup/signup.js";
import {render404} from "./components/404/404.js";
import {goToPage, ROUTES} from "./config.js";
import {renderForms} from "./components/Forms/forms.js";

const url = window.location.pathname

await renderMain();
switch (url) {
    case '/':
        goToPage(ROUTES.forms)
        break;
    case '/login':
        goToPage(ROUTES.login);
        break;
    case '/signup':
        goToPage(ROUTES.signup);
        break;
    default:
        window.history.pushState('404','', url)
        render404(url);
        break;
}

window.onpopstate = function (event) {
    const state = event.state
    switch (state) {
        case 'main':
            renderForms();
            break;
        case 'forms':
            renderForms();
            break;
        case 'login':
            renderLogin();
            break;
        case 'signup':
            renderSignup();
            break;
        default:
            render404(window.location.pathname);
            break;
    }
};

