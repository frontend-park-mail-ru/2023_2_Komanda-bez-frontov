'use strict'

import {renderMain} from "./components/Main/main.js";
import {renderLogin} from "./components/pages/Login/login.js";
import {renderSignup} from "./components/pages/Signup/signup.js";
import {render404} from "./components/404/404.js";
import {goToPage, ROUTES} from "./config.js";
import {renderForms} from "./components/pages/Forms/forms.js";
import {renderForm} from "./components/pages/Form/form.js";
import {renderIndex} from "./components/pages/Index/index.js";

/**
 * Расщепляет url запроса на префикс и id страницы.
 *
 * @function
 * @param url - Путь из запроса.
 * @return {{ id: number | *, prefix: string }} - Объект,содержащий ID запроса и префикс url.
 */
const parseUrl = (url) => {
    const index = url.indexOf("/", 1);
    if (index !== -1) {
        const id = url.slice(index + 1, url.length);
        const prefix = url.slice(0, index + 1);
        return {id, prefix};
    }
    const id = null;
    const prefix = url;
    return {id, prefix};
};

const temp = parseUrl(window.location.pathname);
const id = temp.id;
const url = temp.prefix;

console.log(window.location.pathname, url, id)

await renderMain();
switch (url) {
    case '/':
        goToPage(ROUTES.index)
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

/**
 * Event listener для перехода по истории браузера.
 * При изменении текущего url в браузере происходит рендер соответствующей страницы.
 *
 * @function
 * @param event - Событие.
 * @return {void}
 */
window.onpopstate = function (event) {
    const state = event.state
    switch (state) {
        case 'index':
            renderIndex();
            break;
        case 'forms':
            renderForms();
            break;
        case 'form':
            const id = parseUrl(window.location.pathname).id;
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

