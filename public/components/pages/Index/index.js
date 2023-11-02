'use strict'

export async function renderIndex() {
    const rootElement = document.querySelector("#root");
    rootElement.innerHTML = '';
    rootElement.innerHTML = Handlebars.templates['index']();

}
