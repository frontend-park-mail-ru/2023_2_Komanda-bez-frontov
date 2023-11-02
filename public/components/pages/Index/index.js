'use strict'

/**
 * Функция для рендеринга главной страницы с информацией о сервисе.
 *
 * @async
 * @function
 * @return {void}
 */
export async function renderIndex() {
    const rootElement = document.querySelector("#root");
    rootElement.innerHTML = '';
    rootElement.innerHTML = Handlebars.templates['index']();
}
