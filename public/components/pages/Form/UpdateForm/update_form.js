import {API, defaultFetchErrorMessage} from '../../../../modules/api.js';
import {render404} from '../../../404/404.js';
import {removeMessage, renderMessage} from '../../../Message/message.js';
import {STORAGE} from '../../../../modules/storage.js';
import {goToPage} from '../../../../modules/router.js';
import {ROUTES} from '../../../../config.js';
import {createQuestionUpdate, removedAnswersID} from '../../../Question/UpdateQuestion/update_question.js';
import {closePopUpWindow, renderPopUpWindow} from '../../../PopUpWindow/popup_window.js';
import {formUpdatePageParser} from '../FormNew/new_form.js';
import {renderAuthorMenu} from "../../../AuthorMenu/authorMenu.js";
import {TYPE_SINGLE_CHOICE} from "../CheckForm/check_form.js";
import {textValidation} from "../../../../modules/validation.js";
import {checkInputsValidation} from "../../Login/login.js";
import {debounce} from "../../MyForms/forms.js";

export let editInProcess = false;
export const setEditInProcess = (bool) => {
  editInProcess = bool;
}
let cQuestions = [];

/**
 * Функция для рендеринга страницы редактирования опроса по его id.
 * Если пользователь не авторизован, происходит редирект на страницу входа.
 * Если пользователь не является автором, возвращается ошибка 403.
 *
 * @async
 * @function
 * @param {number} id - ID.
 * @return {void}
 */
export const renderFormUpdate = async (id) => {
  const api = new API();
  removeMessage();
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

  let formJSON;
  try {
    const res = await api.getFormByID(id);
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
    renderMessage(defaultFetchErrorMessage, true);
    return;
  }

  if (STORAGE.user.id !== formJSON.author.id) {
    renderMessage('У вас нет прав на редактирование этого опроса.', true);
    return;
  } else {
    renderAuthorMenu(id, formJSON.is_archived);
    const menuUpdateButton = document.querySelector('#author-menu-update-button');
    menuUpdateButton.classList.add('secondary-button');
    menuUpdateButton.classList.remove('primary-button');
  }

  const removedQuestionsID = [];
  removedAnswersID.length = 0;

  rootElement.insertAdjacentHTML('beforeend', Handlebars.templates.update_form({form: formJSON}));

  const title = document.querySelector('#update-form__title');
  const description = document.querySelector('#update-form__description-textarea');
  const errorLabel = document.querySelector('#update-form-title-validation-error');

  addValidationToFormInput(title, textValidation, errorLabel);
  addValidationToFormInput(description, textValidation, errorLabel);

  const anonymousCheckbox = document.querySelector('#update-form-anonymous-checkbox');
  const limitContainer = document.querySelector('.update-form__max-passage-container');
  const limitInput = document.querySelector('#update-form__max-passage');

  if (anonymousCheckbox.checked) {
    limitContainer.classList.add('display-none');
  }
  anonymousCheckbox.addEventListener('change', () => {
    if (anonymousCheckbox.checked) {
      limitContainer.classList.add('display-none');
    } else {
      limitContainer.classList.remove('display-none');
    }
  });

  if (Number(limitInput.value) < 1) {
    limitInput.value = '';
  }
  limitInput.addEventListener('change', () => {
    if (Number(limitInput.value) < 1) {
      limitInput.value = '';
      return;
    }
    if (Number(limitInput.value) > 100) {
      limitInput.value = '100';
      return;
    }
    limitInput.value = Math.floor(limitInput.value);
  });

  const questions = document.querySelector('#check-form__questions-container');
  formJSON.questions.forEach((question) => {
    const questionElement = createQuestionUpdate(question);
    questionElement.querySelector('#delete-question').addEventListener('click', (e) => {
      e.stopImmediatePropagation();
      editInProcess = true;
      renderPopUpWindow('Требуется подтверждение', 'Вы уверены, что хотите безвозвратно удалить вопрос?', true, () => {
        questionElement.remove();
        removedQuestionsID.push(Number(question.id));
        closePopUpWindow();
        cQuestions = document.querySelectorAll('.update-question');
      });
    });
    moveQuestionUpDown(questionElement);
    questions.appendChild(questionElement);
  });

  const cInputs = document.querySelectorAll('input, textarea');
  cInputs.forEach((input) => {
    input.addEventListener('change', () => {
      editInProcess = true;
    }, {once: true})
  });
  const cButtons = document.querySelectorAll('#delete-question, #add-answer-button, .update-question__answers-item-delete');
  cButtons.forEach((input) => {
    input.addEventListener('click', () => {
      editInProcess = true;
    }, {once: true})
  });

  const addQuestion = document.querySelector('#add-button');
  addQuestion.addEventListener('click', () => {
    const defaultQuestion = {
      id: 0,
      title: '',
      description: '',
      type: TYPE_SINGLE_CHOICE,
      required: false,
      answers: [
        {
          id: 0,
          text: '',
        },
      ],
    };
    editInProcess = true;
    const questionElement = createQuestionUpdate(defaultQuestion);
    questionElement.querySelector('#delete-question').addEventListener('click', (e) => {
      e.stopImmediatePropagation();
      renderPopUpWindow('Требуется подтверждение', 'Вы уверены, что хотите безвозвратно удалить вопрос?', true, () => {
        questionElement.remove();
        closePopUpWindow();
        cQuestions = document.querySelectorAll('.update-question');
      });
    });
    moveQuestionUpDown(questionElement);
    questions.appendChild(questionElement);

    cQuestions = document.querySelectorAll('.update-question');
  });

  const updateForm = document.querySelector('#update-button');
  updateForm.addEventListener('click', async () => {
    const updatedForm = formUpdatePageParser();
    if (!updatedForm) {
      return;
    }

    if (!checkInputsValidation()) {
      renderMessage('Исправлены не все данные', true);
      return;
    }
    updatedForm.id = Number(id);
    updatedForm.removed_questions = removedQuestionsID;
    updatedForm.removed_answers = removedAnswersID;
    try {
      const res = await api.updateForm(updatedForm);
      if (res.message === 'ok') {
        renderMessage('Опрос успешно обновлен.');
        editInProcess = false;
        goToPage(ROUTES.form, id);
        return;
      }
      renderMessage(res.message, true);
    } catch (e) {
      renderMessage(defaultFetchErrorMessage, true);
    }
  });

  cQuestions = document.querySelectorAll('.update-question');
};

export const renderQuitEditingWindow = (page, id = '', redirect = false) => {
  setTimeout(() => {
    renderPopUpWindow('Требуется подтверждение', 'Вы уверены, что хотите выйти? Все несохраненные данные удалятся', false, (e) => {
      editInProcess = false;
      goToPage(page, id, redirect);
      closePopUpWindow();
    });
  }, 0);
};

export const addValidationToFormInput = (input, validator, errorLabel) => {
  input.addEventListener("input", debounce((e) => {
    e.preventDefault();

    const validation = validator(e.target.value);

    if (validation.valid || e.target.value === '') {
      errorLabel.classList.add('display-none');
    } else {
      errorLabel.classList.remove('display-none');
      e.target.classList.add('update-form__input-error');
      e.target.addEventListener('input', () => {
        e.target.classList.remove('update-form__input-error');
      }, {once: true});
    }
  }, 1000));
};

const moveQuestionUpDown = (questionElement) => {
  const questionContainer = document.querySelector('#check-form__questions-container');

  questionElement.querySelector('#question-move-up').addEventListener('click', () => {
    editInProcess = true;
    const index = Array.from(cQuestions).indexOf(questionElement);
    if (index === 0 || index === -1) {
      return;
    }
    replaceTwoElements(cQuestions[index], cQuestions[index - 1]);
  });

  questionElement.querySelector('#question-move-down').addEventListener('click', () => {
    editInProcess = true;
    const index = Array.from(cQuestions).indexOf(questionElement);
    if (index === cQuestions.length - 1 || index === -1) {
      return;
    }
    replaceTwoElements(cQuestions[index + 1], cQuestions[index]);
  });

  const replaceTwoElements = (element1, element2) => {
    const temp = document.createElement('div');
    const margin = window.innerWidth >= 768 ? 24 : 16;

    element1.style.transform = `translate(0, -${element2.clientHeight + margin}px)`;
    element2.style.transform = `translate(0, ${element1.clientHeight + margin}px)`;

    setTimeout(() => {
      element1.style.transform = `none`;
      element2.style.transform = `none`;

      questionContainer.insertBefore(temp, element1);
      questionContainer.insertBefore(element1, element2);
      questionContainer.insertBefore(element2, temp);
      questionContainer.removeChild(temp);

      cQuestions = document.querySelectorAll('.update-question');
    }, 1000);
  }
};