import {API} from '../../../modules/api.js';
import {goToPage, ROUTES} from "../../../config.js";

export async function renderForms() {
    const rootElement = document.querySelector("#root");
    rootElement.innerHTML = '';
    rootElement.innerHTML = Handlebars.templates['forms']();
    const formsContainer = document.querySelector("#forms-container");

    const api = new API();
    const res = await api.getForms();

    if (res.status === 200) {
        for (let id in res.forms) {
            const item = document.createElement('div');
            item.innerHTML = Handlebars.templates['forms_item']();

            const itemButton = item.querySelector("#list-item");
            itemButton.textContent = res.forms[id].title;
            itemButton.addEventListener("click", function (e) {
                goToPage(ROUTES.form, id);
            });

            formsContainer.appendChild(item);
        }
    } else {
        const label = document.createElement('a');
        label.textContent = 'Опросов пока нет...';
        formsContainer.appendChild(label);
    }

}
