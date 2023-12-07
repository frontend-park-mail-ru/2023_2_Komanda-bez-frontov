/**
 * Функция для рендеринга всплывающего диалогового окна.
 *
 * @function
 * @param {string} titleText - Текст заголовка.
 * @param {string} messageText - Текст сообщения.
 * @param {boolean} error - Флаг, который показывает, является ли сообщение сообщение критическим.
 * @param {function} action - Выполняется при подтверждении окна.
 * @return {void}
 */
export const renderPopUpWindow = (titleText, messageText, error = false, action = null) => {
  const popupContainer = document.querySelector('#popup');
  popupContainer.innerHTML = Handlebars.templates.popup_window();

  disableScroll();

  if (error) {
    document.querySelector('#popup-ok-button').classList.add('red-button');
  } else {
    document.querySelector('#popup-ok-button').classList.add('secondary-button');
  }

  const title = document.querySelector('#popup-title');
  title.textContent = titleText;

  const message = document.querySelector('#popup-message');
  message.textContent = messageText;

  const cancelButton = document.querySelector('#popup-cancel-button');
  cancelButton.addEventListener('click', () => {
    // eslint-disable-next-line no-use-before-define
    closePopUpWindow();
  });
  const okButton = document.querySelector('#popup-ok-button');
  okButton.addEventListener('click', () => {
    action();
  });

  const closePopUpWindowByBody = (e) => {
    if (!e.target.classList.contains('popup_window')
        && !e.target.parentNode.classList.contains('popup_window')
        && !e.target.parentNode.classList.contains('button-container')) {
      document.body.removeEventListener('click', closePopUpWindowByBody);
      // eslint-disable-next-line no-use-before-define
      closePopUpWindow();
    }
  };
  document.body.addEventListener('click', closePopUpWindowByBody);
};

/**
 * Функция для закрытия всплывающего окна.
 *
 * @function
 * @return {void}
 */
export const closePopUpWindow = () => {
  enableScroll();
  const messageContainer = document.querySelector('#popup');
  messageContainer.innerHTML = '';
};

function disableScroll() {
  document.body.classList.add("stop-scrolling");
}

function enableScroll() {
  document.body.classList.remove("stop-scrolling");
}