import {API} from '../../modules/api.js';

export async function renderForms() {
    const rootElement = document.querySelector("#root");
    rootElement.innerHTML = '';
    rootElement.innerHTML = Handlebars.templates['forms']();
    const formsContainer = document.querySelector("#forms-container");

    const api = new API();
    const forms = await api.getForms();

    if (forms.status === 200) {
        for (let id in forms.forms) {
            const item = document.createElement('div');
            item.innerHTML = Handlebars.templates['forms_item']();

            const itemButton = item.querySelector("#list-item");
            itemButton.textContent = forms.forms[id].title;

            formsContainer.appendChild(item);
        }
    } else {
        const label = document.createElement('a');
        label.textContent = 'Опросов пока нет...';
        formsContainer.appendChild(label);
    }

}
