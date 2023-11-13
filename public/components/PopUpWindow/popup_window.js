/**
 * Функция для рендеринга всплывающего диалогового окна.
 *
 * @function
 * @param {string} text - Текст сообщения.
 * @param {boolean} error - Флаг, который показывает, является ли сообщение сообщение критическим.
 * @param {function} action - Выполняется при подтверждении окна.
 * @return {void}
 */
export const renderPopUpWindow = (text, error = false, action = null) => {
  const popupContainer = document.querySelector('#popup');
  popupContainer.innerHTML += Handlebars.templates.popup_window();

  if (error) {
    document.querySelector('#popup-ok-button').classList.add('red-button');
  } else {
    document.querySelector('#popup-ok-button').classList.add('secondary-button');
  }

  const message = document.querySelector('#popup-message');
  message.textContent = text;

  const cancelButton = document.querySelector('#popup-cancel-button');
  cancelButton.addEventListener('click', () => {
    // eslint-disable-next-line no-use-before-define
    closePopUpWindow();
  });
  const okButton = document.querySelector('#popup-ok-button');
  okButton.addEventListener('click', () => {
    action();
    // eslint-disable-next-line no-use-before-define
    closePopUpWindow();
  });
};

/**
 * Функция для закрытия всплывающего окна.
 *
 * @function
 * @return {void}
 */
export const closePopUpWindow = () => {
  const messageContainer = document.querySelector('#popup');
  messageContainer.innerHTML = '';
};
