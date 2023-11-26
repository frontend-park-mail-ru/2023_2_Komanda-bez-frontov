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

  // TODO заменить на получение через апи, когда будет готово
  let formJSON;
  //   id: 18,
  //   title: "Test Form title",
  //   description: "Description text",
  //   created_at: "2023-11-18 15:27",
  //   anonymous: true,
  //   author: STORAGE.user,
  //   number_of_passages: 24,
  //   questions: [
  //     {
  //       id: 34,
  //       title: "Question 1 Title",
  //       description: "Description text",
  //       type: 1,
  //       required: true,
  //       number_of_passages: 20,
  //       answers: [
  //         {
  //           text: "Answer 1",
  //           selected_times: 8,
  //         },
  //         {
  //           text: "Answer 2",
  //           selected_times: 5,
  //         },
  //         {
  //           text: "Answer 3",
  //           selected_times: 7,
  //         },
  //       ],
  //     },
  //     {
  //       id: 35,
  //       title: "Question 2 Title",
  //       description: "Description text",
  //       type: 3,
  //       required: false,
  //       number_of_passages: 16,
  //       answers: [
  //         {
  //           text: "Text Answer 1",
  //         },
  //         {
  //           text: "Text Answer 2",
  //         },
  //       ],
  //     },
  //   ],
  // };

  try {
    const res = await api.getFormResultsByID(id);
    if (res.message !== 'ok') {
      if (res.message === '404') {
        render404();
        return;
      }
      renderMessage(res.message, true);
      return;
    }
    formJSON = res.formResults;
  } catch (e) {
    if (e.toString() !== 'TypeError: Failed to fetch') {
      renderMessage('Ошибка сервера. Попробуйте позже', true);
      return;
    }
    renderMessage('Потеряно соединение с сервером', true);
    return;
  }

  if (STORAGE.user.id !== formJSON.author.id) {
    renderMessage('У вас нет прав на просмотр результатов этого опроса.', true);
    return;
  }

  const rootElement = document.querySelector('#root');
  rootElement.innerHTML = '';

  renderAuthorMenu(id);
  const menuResultsButton = document.querySelector('#author-menu-results-button');
  menuResultsButton.disabled = true;
  menuResultsButton.classList.add('secondary-button');
  menuResultsButton.classList.remove('primary-button');

  rootElement.innerHTML += Handlebars.templates.form_results({form: formJSON});

  if (!formJSON.participants) {
    const description = document.querySelector('.form-results__description-text');
    description.innerHTML += '<br> &nbsp;&nbsp;&nbsp;Прохождений пока нет...';
  }

  const questions = document.querySelector('#check-form__questions-container');
  formJSON.questions.forEach((question) => {
    const questionElement = renderResultsQuestion(question);
    questions.appendChild(questionElement);
  });

};
