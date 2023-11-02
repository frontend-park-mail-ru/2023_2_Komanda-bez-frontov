'use strict'

import {renderMain} from "./components/Main/main.js";
import {renderLogin} from "./components/pages/Login/login.js";
import {renderSignup} from "./components/pages/Signup/signup.js";
import {render404} from "./components/404/404.js";
import {goToPage, ROUTES} from "./config.js";
import {renderForms} from "./components/pages/Forms/forms.js";
import {renderForm} from "./components/pages/Form/form.js";

const parseUrl = (url) => {
    const index = url.indexOf("/", 1);
    if (index !== -1) {
        const id = url.slice(index + 1, url.length);
        url = url.slice(0, index + 1);
        return {id, url};
    }
    const id = null;
    return {id, url};
};

const temp = parseUrl(window.location.pathname);
const id = temp.id;
const url = temp.url;

await renderMain();
switch (url) {
    case '/':
        goToPage(ROUTES.forms)
        break;
    case '/forms/':
        goToPage(ROUTES.form, id)
        break;
    case '/login':
        goToPage(ROUTES.login);
        break;
    case '/signup':
        goToPage(ROUTES.signup);
        break;
    default:
        window.history.pushState('404','', url)
        render404();
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
        case 'form':
            const id = parseUrl(window.location.pathname).id;
            console.log(id);
            renderForm(id);
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

