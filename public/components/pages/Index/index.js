'use strict'

/**
 * Функция для рендеринга главной страницы с информацией о сервисе.
 *
 * @function
 * @return {void}
 */
export function renderIndex() {
    const rootElement = document.querySelector("#root");
    rootElement.innerHTML = '';
    rootElement.innerHTML = Handlebars.templates['index']();
}
