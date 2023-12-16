import {API} from '../../../modules/api.js';
import {render404} from '../../404/404.js';
import {removeMessage, renderMessage} from '../../Message/message.js';
import {STORAGE} from '../../../modules/storage.js';
import {ROUTES} from '../../../config.js';
import {goToPage} from '../../../modules/router.js';
import {renderAuthorMenu} from '../../AuthorMenu/authorMenu.js';
import {renderResultsQuestion} from "../../Question/ResultsQuestion/results_question.js";

/**
 * Функция для рендеринга страницы опроса по его id.
 *
 * @async
 * @function
 * @param {number} id - ID.
 * @return {void}
 */
export const renderResultsForm = async (id) => {
  removeMessage();

  const api = new API();
  if (!id) {
    render404();
    return;
  }

  // Проверка авторизации
  if (!STORAGE.user) {
    goToPage(ROUTES.login, 0, true);
    renderMessage('Вы не авторизованы!', true);
    return;
  }

  const rootElement = document.querySelector('#root');
  rootElement.innerHTML = '';
  renderAuthorMenu(id);
  const menuResultsButton = document.querySelector('#author-menu-results-button');
  menuResultsButton.classList.add('secondary-button');
  menuResultsButton.classList.remove('primary-button');

  let formJSON;
  try {
    const res = await api.getFormResultsByID(id);
    if (res.message !== 'ok') {
      rootElement.innerHTML = '';
      if (res.message === '404') {
        render404();
        return;
      }
      renderMessage(res.message, true);
      return;
    }
    formJSON = res.formResults;
  } catch (e) {
    renderMessage('Ошибка сервера. Перезагрузите страницу', true);
    return;
  }

  if (STORAGE.user.id !== formJSON.author.id) {
    rootElement.innerHTML = '';
    renderMessage('У вас нет прав на просмотр результатов этого опроса.', true);
    return;
  }

  // Перевод даты создания в читабельный вид
  const date = new Date(formJSON.created_at);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  formJSON.created_at = date.toLocaleDateString('ru', options);

  rootElement.insertAdjacentHTML('beforeend', Handlebars.templates.form_results({form: formJSON}));

  if (!formJSON.participants && !formJSON.anonymous) {
    const description = document.querySelector('.form-results__description-text');
    description.innerHTML += '<br> &nbsp;&nbsp;&nbsp;Прохождений пока нет...';
  }

  const questions = document.querySelector('#check-form__questions-container');
  formJSON.questions.forEach((question) => {
    const questionElement = renderResultsQuestion(question);
    questions.appendChild(questionElement);
  });

};
