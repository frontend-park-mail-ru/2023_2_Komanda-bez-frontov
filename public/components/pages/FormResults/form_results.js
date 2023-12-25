import {API, defaultFetchErrorMessage} from '../../../modules/api.js';
import {render404} from '../../404/404.js';
import {removeMessage, renderMessage} from '../../Message/message.js';
import {STORAGE} from '../../../modules/storage.js';
import {backendUrl, ROUTES, ROUTES_API} from '../../../config.js';
import {goToPage} from '../../../modules/router.js';
import {renderAuthorMenu} from '../../AuthorMenu/authorMenu.js';
import {renderResultsQuestion} from "../../Question/ResultsQuestion/results_question.js";
import {closePopUpWindow} from "../../PopUpWindow/popup_window.js";

function calculateAge(dateOfBirth) {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

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
    renderMessage(defaultFetchErrorMessage, true);
    return;
  }

  rootElement.innerHTML = '';
  if (STORAGE.user.id !== formJSON.author.id) {
    renderMessage('У вас нет прав на просмотр результатов этого опроса.', true);
    return;
  } else {
    renderAuthorMenu(id, formJSON.is_archived);
    const menuResultsButton = document.querySelector('#author-menu-results-button');
    menuResultsButton.classList.add('secondary-button');
    menuResultsButton.classList.remove('primary-button');
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

  const participantsQuestion = {
    title: 'Статистика по участникам(Пол)',
    type: 1,
    number_of_passages: 0,
    answers: [
      {text: 'Мужской', selected_times: 0},
      {text: 'Женский', selected_times: 0},
      {text: 'Не указан', selected_times: 0},
    ],
  }

  if (formJSON.participants) {
    formJSON.participants.forEach((participant) => {
      switch (participant.gender) {
        case 'M':
          participantsQuestion.answers[0].selected_times += 1;
          participantsQuestion.number_of_passages += 1;
          break;
        case 'F':
          participantsQuestion.answers[1].selected_times += 1;
          participantsQuestion.number_of_passages += 1;
          break
        default:
          participantsQuestion.answers[2].selected_times += 1;
          participantsQuestion.number_of_passages += 1;
          break;
      }
    })
  }

  const participantsAgeQuestion = {
    title: 'Статистика по участникам(Возраст)',
    type: 1,
    number_of_passages: 0,
    answers: [
      {text: '0 - 18', selected_times: 0},
      {text: '18 - 35', selected_times: 0},
      {text: '35-60', selected_times: 0},
      {text: '60+', selected_times: 0},
    ],
  }

  if (formJSON.participants) {
    formJSON.participants.forEach((participant) => {
      let age = calculateAge(participant.birthday);
      if (age < 18) {
        participantsAgeQuestion.answers[0].selected_times += 1;
        participantsAgeQuestion.number_of_passages += 1;
      } else if (age >= 18 && age < 35) {
        participantsAgeQuestion.answers[1].selected_times += 1;
        participantsAgeQuestion.number_of_passages += 1;
      } else if (age >= 35 && age < 60) {
        participantsAgeQuestion.answers[2].selected_times += 1;
        participantsAgeQuestion.number_of_passages += 1;
      } else if (age >= 60) {
        participantsAgeQuestion.answers[3].selected_times += 1;
        participantsAgeQuestion.number_of_passages += 1;
      }
    })
  }

  const questions = document.querySelector('#check-form__questions-container');
  const participantsElement = renderResultsQuestion(participantsQuestion);
  const participantAgesElement = renderResultsQuestion(participantsAgeQuestion);

  questions.appendChild(participantsElement);
  questions.appendChild(participantAgesElement)
  formJSON.questions.forEach((question) => {
    console.log(question);
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
    okButton.addEventListener('click', async() => {
      if (radioExcel.checked) {
        // Excel download
        window.location.href = backendUrl + ROUTES_API.formResultsExcel.url.replace(':id', id.toString());
      } else {
        // CSV download
        window.location.href = backendUrl + ROUTES_API.formResultsCSV.url.replace(':id', id.toString());
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
