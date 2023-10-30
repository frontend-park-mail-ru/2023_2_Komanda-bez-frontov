import {renderMessage} from "../Message/message.js";

export function render404(url) {
    window.history.pushState('404','', url)
    renderMessage('Ошибка 404. Страница не найдена.', true);
}
