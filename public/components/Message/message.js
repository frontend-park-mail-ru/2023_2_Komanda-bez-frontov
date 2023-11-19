/**
 * Функция для рендеринга сообщений для пользователя на странице.
 *
 * @function
 * @param {string} text - Текст сообщения.
 * @param {boolean} error - Флаг, который показывает, является ли сообщение сообщением об ошибке.
 * @return {void}
 */
export const renderMessage = (text, error = false) => {
  const messageContainer = document.querySelector('#message-box');
  messageContainer.innerHTML = '';
  messageContainer.classList.remove('error-container', 'success-container');

  if (error) {
    messageContainer.classList.add('error-container');
  } else {
    messageContainer.classList.add('success-container');
  }

  const message = document.createElement('p');
  message.textContent = text;

  messageContainer.appendChild(message);
  window.scroll(0, 0);
};

/**
 * Функция для очистки поля ошибки на странице.
 *
 * @function
 * @return {void}
 */
export const removeMessage = () => {
  const messageContainer = document.querySelector('#message-box');
  messageContainer.innerHTML = '';
  messageContainer.classList.remove('error-container', 'success-container');
};
