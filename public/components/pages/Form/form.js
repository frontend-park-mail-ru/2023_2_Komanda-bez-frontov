import {API} from '../../../modules/api.js';
import {render404} from "../../404/404.js";
import {removeMessage, renderMessage} from "../../Message/message.js";
import {goToPage, ROUTES} from "../../../config.js";
import {renderForms} from "../Forms/forms.js";

export async function renderForm(id) {
    const api = new API();
    const isAuth = await api.isAuth();
    if (!isAuth.isAuthorized) {
        goToPage(ROUTES.login)
        renderMessage('Вы не авторизованы!', true);
        return;
    }

    if (!id) {
        renderForms();
        return;
    }

    removeMessage();
    const rootElement = document.querySelector("#root");
    rootElement.innerHTML = '';
    rootElement.innerHTML = Handlebars.templates['form']();

    const formTitle = document.querySelector("#form-title");

    const res = await api.getForm(id);

    if (res.status === 200) {
        formTitle.innerHTML = res.form.title;
    } else {
        render404();
    }
}
