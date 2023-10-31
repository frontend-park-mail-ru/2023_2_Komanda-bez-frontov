import {renderMessage} from "../Message/message.js";

export function render404() {
    const rootElement = document.querySelector("#root");
    rootElement.innerHTML = '';
    renderMessage('Ошибка 404. Страница не найдена.', true);
}
