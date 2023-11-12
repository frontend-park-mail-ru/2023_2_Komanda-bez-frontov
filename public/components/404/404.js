import {renderMessage} from '../Message/message.js';

/**
 * Функция для рендеринга страницы при ошибке 404.
 *
 * @function
 * @return {void}
 */
export const render404 = () => {
  const rootElement = document.querySelector('#root');
  rootElement.innerHTML = '';
  renderMessage('Ошибка 404. Страница не найдена.', true);
};
