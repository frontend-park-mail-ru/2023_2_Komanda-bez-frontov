import {API} from '../../../../modules/api.js';
import {render404} from '../../../404/404.js';
import {removeMessage, renderMessage} from '../../../Message/message.js';
import {storageGetForm, STORAGE} from '../../../../modules/storage.js';
import {ROUTES} from '../../../../config.js';
import {goToPage} from '../../../../modules/router.js';
import {createQuestion} from '../../../Question/CheckQuestion/check_question.js';

/**
 * Функция для рендеринга страницы опроса по его id.
 * Если пользователь не авторизован, происходит редирект на страницу входа.
 *
 * @async
 * @function
 * @param {number} id - ID.
 * @return {void}
 */
export async function renderForm(id) {
  removeMessage();
  if (!id) {
    const page = ROUTES.forms;
    window.history.replaceState(page.state, '', page.url);
    goToPage(page);
    return;
  }

  let formJSON;
  try {
    const api = new API();
    const res = await api.getForm(id);
    if (res.status !== 200) {
      render404();
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
    formJSON = storageGetForm(id);
  }

  const rootElement = document.querySelector('#root');
  rootElement.innerHTML = '';
  rootElement.innerHTML = Handlebars.templates.check_form({form: formJSON});

  const questions = document.querySelector('#check-form__questions-container');
  // eslint-disable-next-line no-restricted-syntax
  for (const index in formJSON.questions) {
    const questionElement = createQuestion(formJSON.questions[index]);
    questions.appendChild(questionElement);
  }

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
}
