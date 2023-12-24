import {API, defaultFetchErrorMessage} from '../../../modules/api.js';
import {render404} from '../../404/404.js';
import {renderMessage} from '../../Message/message.js';
import {createQuestion} from '../../Question/CheckQuestion/check_question.js';

/**
 * Функция для рендеринга страницы с данными о прохождении опроса по его id.
 *
 * @async
 * @function
 * @param {number} id - ID.
 * @return {void}
 */
export const renderFormPassage = async (id) => {
  const api = new API();
  const rootElement = document.querySelector('#root');

  let formJSON;
  try {
    const res = await api.getFormPassageByID(id);
    if (res.message !== 'ok') {
      rootElement.innerHTML = '';
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
      renderMessage(defaultFetchErrorMessage, true);
      return;
    }
  }

  rootElement.innerHTML = Handlebars.templates.check_form({form: formJSON});

  const date = new Date(formJSON.finished_at);
  const dateLabel = document.querySelector('.check-form__max-passage-container');
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  dateLabel.innerHTML = 'Дата прохождения: &nbsp;&nbsp;' + date.toLocaleDateString('ru', options);

  const updateSubmitButton = document.querySelector('#update-submit-button');
  updateSubmitButton.classList.add('display-none');
  const createLinkButton = document.querySelector('#create-link-button');
  createLinkButton.classList.add('display-none');

  const questions = document.querySelector('#check-form__questions-container');
  formJSON.questions.forEach((question) => {
    question.type = question.type === 3 ? 1 : question.type;
    const questionElement = createQuestion(question);
    const buttonClear = questionElement.querySelector('#check-question__clear-button');
    buttonClear.remove();
    questions.appendChild(questionElement);
  });

  const cInputs = document.querySelectorAll('input');
  cInputs.forEach((input) => {
    input.checked = true;
    input.disabled = true;
  });
};
