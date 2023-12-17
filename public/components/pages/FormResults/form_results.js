import {API} from '../../../modules/api.js';
import {render404} from '../../404/404.js';
import {removeMessage, renderMessage} from '../../Message/message.js';
import {STORAGE} from '../../../modules/storage.js';
import {ROUTES} from '../../../config.js';
import {goToPage} from '../../../modules/router.js';
import {renderAuthorMenu} from '../../AuthorMenu/authorMenu.js';
import {renderResultsQuestion} from "../../Question/ResultsQuestion/results_question.js";
import {closePopUpWindow, renderPopUpWindow} from "../../PopUpWindow/popup_window.js";

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

  const exportButton = document.querySelector('#results-export-button');
  exportButton.addEventListener('click', (e) => {
    e.stopImmediatePropagation();

    const popupContainer = document.querySelector('#popup');
    popupContainer.innerHTML = Handlebars.templates.popup_export();
    document.body.classList.add("stop-scrolling");

    const radioExcel = popupContainer.querySelector('#format-type-excel');
    const radioCSV = popupContainer.querySelector('#format-type-csv');
    radioExcel.addEventListener('click', () => {
      radioExcel.checked = true;
      radioCSV.checked = false;
    });
    radioCSV.addEventListener('click', () => {
      radioExcel.checked = false;
      radioCSV.checked = true;
    });

    const cancelButton = document.querySelector('#popup-cancel-button');
    cancelButton.addEventListener('click', () => {
      closePopUpWindow();
    });
    const okButton = document.querySelector('#popup-ok-button');
    okButton.addEventListener('click', () => {
      // TODO Заменить на нормальный API
      if (radioExcel.checked) {
        alert('Excel Downloaded!');
      } else {
        alert('CSV Downloaded!');
      }
    });

    const closePopUpWindowByBody = (e) => {
      if (!e.target.classList.contains('popup_window')
          && !e.target.parentNode.classList.contains('popup_window')
          && !e.target.parentNode.classList.contains('button-container-diagram')
          && !e.target.parentNode.classList.contains('popup_window_radio-container')) {
        document.body.removeEventListener('click', closePopUpWindowByBody);
        closePopUpWindow();
      }
    };

    document.body.addEventListener('click', closePopUpWindowByBody);
  });

};
