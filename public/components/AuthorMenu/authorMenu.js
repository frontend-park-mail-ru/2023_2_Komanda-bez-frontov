import {frontendUrl, ROUTES} from '../../config.js';
import {goToPage} from '../../modules/router.js';
import {STORAGE} from '../../modules/storage.js';
import {closePopUpWindow, renderPopUpWindow} from '../PopUpWindow/popup_window.js';
import {renderMessage} from "../Message/message.js";
import {API, defaultFetchErrorMessage} from "../../modules/api.js";
import {editInProcess} from "../pages/Form/UpdateForm/update_form.js";

/**
 * Функция для рендеринга меню с инструментами автора опроса.
 * Если пользователь не авторизован, ничего не происходит.
 *
 * @function
 * @param {number} id - ID опроса.
 * @param {boolean} archive - Пометка, лежит ли опрос в архиве
 * @return {void}
 */
export const renderAuthorMenu = (id, archive = false) => {
  if (!STORAGE.user) {
    return;
  }

  const api = new API();
  const rootElement = document.querySelector('#root');
  rootElement.innerHTML = Handlebars.templates.authorMenu();

  const menu = document.querySelector('.form-author-menu');
  let flagClosed = false;
  
  const checkButton = document.querySelector('#author-menu-check-button');
  checkButton.addEventListener('click', () => {
    if (checkButton.classList.contains('secondary-button')) {
      menu.classList.remove('form-author-menu__open');
      menu.classList.add('form-author-menu__close');
      closeButton.innerHTML = 'menu';
      flagClosed = true;
    } else {
      goToPage(ROUTES.form, id);
    }
  });

  const updateButton = document.querySelector('#author-menu-update-button');
  updateButton.addEventListener('click', () => {
    if (updateButton.classList.contains('secondary-button')) {
      menu.classList.remove('form-author-menu__open');
      menu.classList.add('form-author-menu__close');
      closeButton.innerHTML = 'menu';
      flagClosed = true;
    } else {
      goToPage(ROUTES.formUpdate, id);
    }
  });

  const resultsButton = document.querySelector('#author-menu-results-button');
  resultsButton.addEventListener('click', () => {
    if (resultsButton.classList.contains('secondary-button')) {
      menu.classList.remove('form-author-menu__open');
      menu.classList.add('form-author-menu__close');
      closeButton.innerHTML = 'menu';
      flagClosed = true;
    } else {
      goToPage(ROUTES.formResults, id);
    }
  });

  const archiveButton = document.querySelector('#author-menu-archive-button');
  if (archive) {
    archiveButton.querySelector('label').innerHTML = "Восстановить";
    archiveButton.querySelector('span').innerHTML = "restore";
    archiveButton.addEventListener('click', async () => {
      try {
        const res = await api.archiveForm(id, false);
        if (res.message === 'ok') {
          goToPage(ROUTES.form, id);
          renderMessage('Опрос успешно восстановлен');
          return;
        }
        renderMessage(res.message, true);
      } catch (e) {
        renderMessage(defaultFetchErrorMessage, true);
      }
    });
  } else {
    archiveButton.addEventListener('click', (e) => {
      e.stopImmediatePropagation();
      renderPopUpWindow('Перемещение в архив', 'Опрос будет невозможно пройти, пока он в архиве. Вы можете восстановить его в любой момент', false, async () => {
        try {
          const res = await api.archiveForm(id, true);
          if (res.message === 'ok') {
            goToPage(ROUTES.forms);
            renderMessage('Опрос успешно перемещен в архив');
            closePopUpWindow();
            return;
          }
          renderMessage(res.message, true);
        } catch (err) {
          renderMessage(defaultFetchErrorMessage, true);
          closePopUpWindow();
          return;
        }
        closePopUpWindow();
      });
    });
  }

  const deleteButton = document.querySelector('#author-menu-delete-button');
  if (archive) {
    deleteButton.addEventListener('click', (e) => {
      e.stopImmediatePropagation();
      renderPopUpWindow('Требуется подтверждение', 'Вы уверены, что хотите удалить опрос? Это действие необратимо.', true, async () => {
        try {
          const res = await api.deleteForm(id);
          if (res.message === 'ok') {
            goToPage(ROUTES.archive);
            renderMessage('Опрос успешно удален.');
            closePopUpWindow();
            return;
          }
          renderMessage(res.message, true);
        } catch (e) {
          renderMessage(defaultFetchErrorMessage, true);
          closePopUpWindow();
          return;
        }
        closePopUpWindow();
      });
    });
  } else {
    deleteButton.classList.add('display-none');
  }

  const createLinkButton = document.querySelector('#author-menu-link-button');
  if (archive) {
    createLinkButton.classList.add('display-none');
  } else {
    createLinkButton.addEventListener('click', (e) => {
      const link = `${frontendUrl}/forms/${id}`;
      e.stopImmediatePropagation();
      renderPopUpWindow('Ссылка на ваш опрос', link, false, () => {
        const copyButton = document.querySelector('#popup-ok-button');
        copyButton.innerHTML = 'Скопировано!';
        copyButton.classList.add('primary-button');
        copyButton.classList.remove('secondary-button');
        // Копирование ссылки в буфер на компе
        navigator.clipboard.writeText(link);
      });
      document.querySelector('#popup-ok-button').innerHTML = 'Скопировать';
    });
  }

  const closeButton = document.querySelector('#author-menu-close-button');
  closeButton.addEventListener('click', () => {
    if (flagClosed) {
      menu.classList.add('form-author-menu__open');
      menu.classList.remove('form-author-menu__close');
      closeButton.innerHTML = 'menu_open';
      flagClosed = false;
    } else {
      menu.classList.remove('form-author-menu__open');
      menu.classList.add('form-author-menu__close');
      closeButton.innerHTML = 'menu';
      flagClosed = true;
    }
  });

  setTimeout(() => {
    if (window.innerWidth <= 1150 || (window.innerWidth >= 1200 && window.innerWidth <= 1340)) {
      menu.classList.add('form-author-menu__close');
      menu.classList.remove('form-author-menu__open');
      closeButton.innerHTML = 'menu';
      flagClosed = true;
    }
  }, 10);
};
