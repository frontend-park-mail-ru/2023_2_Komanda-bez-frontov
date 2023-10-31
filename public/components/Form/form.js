import {API} from '../../modules/api.js';
import {render404} from "../404/404.js";
import {removeMessage} from "../Message/message.js";

export async function renderForm(id) {
    if (!id) {
        render404();
        return;
    }

    removeMessage();
    const rootElement = document.querySelector("#root");
    rootElement.innerHTML = '';
    rootElement.innerHTML = Handlebars.templates['form']();

    const formTitle = document.querySelector("#form-title");

    const api = new API();
    const res = await api.getForm(id);

    if (res.status === 200) {
        formTitle.innerHTML = res.form.title;
    } else {
        render404();
    }
}
