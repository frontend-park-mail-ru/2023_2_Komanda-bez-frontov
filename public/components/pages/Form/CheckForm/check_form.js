import {API} from '../../../../modules/api.js';
import {render404} from '../../../404/404.js';
import {renderMessage} from '../../../Message/message.js';
import {storageGetFormByID, STORAGE} from '../../../../modules/storage.js';
import {frontendUrl, ROUTES} from '../../../../config.js';
import {goToPage} from '../../../../modules/router.js';
import {createQuestion} from '../../../Question/CheckQuestion/check_question.js';
import {renderPopUpWindow} from '../../../PopUpWindow/popup_window.js';

/**
 * Функция для рендеринга страницы опроса по его id.
 *
 * @async
 * @function
 * @param {number} id - ID.
 * @return {void}
 */
export const renderForm = async (id) => {
  const api = new API();
  if (!id) {
    const page = ROUTES.forms;
    window.history.replaceState(page.state, '', page.url);
    goToPage(page, 0, true);
    return;
  }

  let formJSON;
  try {
    const res = await api.getFormByID(id);
    if (res.message !== 'ok') {
      if (res.message === '404') {
        render404();
        return;
      }
      renderMessage(res.message, true);
      return;
    }
    formJSON = res.form;
  } catch (e) {
    if (e.toString() !== 'TypeError: Failed to fetch') {
      renderMessage('Ошибка сервера. Попробуйте позже', true);
      return;
    }
    // Попытка найти опрос в локальном хранилище
    renderMessage('Потеряно соединение с сервером', true);
    formJSON = storageGetFormByID(id);
  }

  const rootElement = document.querySelector('#root');
  rootElement.innerHTML = '';
  rootElement.innerHTML = Handlebars.templates.check_form({form: formJSON});

  const questions = document.querySelector('#check-form__questions-container');
  formJSON.questions.forEach((question) => {
    const questionElement = createQuestion(question);
    questions.appendChild(questionElement);
  });

  const updateSubmitButton = document.querySelector('#update-submit-button');
  if (STORAGE.user.id === formJSON.author.id) {
    updateSubmitButton.innerHTML = 'Редактировать';
    updateSubmitButton.addEventListener('click', () => {
      goToPage(ROUTES.formUpdate, id);
    });
  } else {
    updateSubmitButton.innerHTML = 'Отправить';
    updateSubmitButton.addEventListener('click', () => {
      // иначе отправим заполненную форму.
    });
  }

  const createLinkButton = document.querySelector('#create-link-button');
  if (STORAGE.user.id === formJSON.author.id) {
    createLinkButton.addEventListener('click', (e) => {
      const link = `${frontendUrl}/forms/${id}`;
      e.stopImmediatePropagation();
      renderPopUpWindow('Ваша ссылка готова', link, false, () => {
        const copyButton = document.querySelector('#popup-ok-button');
        copyButton.innerHTML = 'Скопировано!';
        copyButton.classList.add('primary-button');
        copyButton.classList.remove('secondary-button');
        navigator.clipboard.writeText(link);
      });
      document.querySelector('#popup-ok-button').innerHTML = 'Скопировать';
    });
  } else {
    createLinkButton.style.display = 'none';
  }
};
