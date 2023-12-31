import {API} from '../../../../modules/api.js';
import {removeMessage, renderMessage} from '../../../Message/message.js';
import {STORAGE} from '../../../../modules/storage.js';
import {goToPage} from '../../../../modules/router.js';
import {ROUTES} from '../../../../config.js';
import {createQuestionUpdate, removedAnswersID} from '../../../Question/UpdateQuestion/update_question.js';
import {closePopUpWindow, renderPopUpWindow} from '../../../PopUpWindow/popup_window.js';
import {textValidation} from '../../../../modules/validation.js';
import {TYPE_SINGLE_CHOICE, TYPE_MULTIPLE_CHOICE, TYPE_TEXT} from "../CheckForm/check_form.js";
import {editInProcess, setEditInProcess} from "../UpdateForm/update_form.js";
import {checkInputsValidation} from "../../Login/login.js";

/**
 * Функция для рендеринга страницы опроса по его id.
 * Если пользователь не авторизован, происходит редирект на страницу входа.
 *
 * @async
 * @function
 * @return {void}
 */
export const renderFormNew = async () => {
  removeMessage();

  // Проверка авторизации
  if (!STORAGE.user) {
    goToPage(ROUTES.login, 0, true);
    renderMessage('Вы не авторизованы!', true);
    return;
  }

  const rootElement = document.querySelector('#root');
  rootElement.innerHTML = '';

  const defaultForm = {
    title: '',
    description: '',
    anonymous: false,
    questions: [
      {
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
      },
    ],
  };

  rootElement.innerHTML = Handlebars.templates.update_form({form: defaultForm});

  const pageTitle = document.querySelector('#update-form-title');
  pageTitle.innerHTML = 'Создание опроса';

  const questions = document.querySelector('#check-form__questions-container');
  {
    const questionElement = createQuestionUpdate(defaultForm.questions[0]);
    questionElement.querySelector('#delete-question').addEventListener('click', (e) => {
      e.stopImmediatePropagation();
      renderPopUpWindow('Требуется подтверждение', 'Вы уверены, что хотите безвозвратно удалить вопрос?', true, () => {
        questionElement.remove();
        closePopUpWindow();
      });
    });
    questions.appendChild(questionElement);
  }

  const cInputs = document.querySelectorAll('input, textarea');
  cInputs.forEach((input) => {
    input.addEventListener('change', () => {
      setEditInProcess(true);
    }, {once: true})
  });
  const cButtons = document.querySelectorAll('#delete-question, #add-answer-button');
  cButtons.forEach((input) => {
    input.addEventListener('click', () => {
      setEditInProcess(true);
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
    setEditInProcess(true);
    const questionElement = createQuestionUpdate(defaultQuestion);
    questionElement.querySelector('#delete-question').addEventListener('click', (e) => {
      e.stopImmediatePropagation();
      renderPopUpWindow('Требуется подтверждение', 'Вы уверены, что хотите безвозвратно удалить вопрос?', true, () => {
        questionElement.remove();
        closePopUpWindow();
      });
    });
    questions.appendChild(questionElement);
  });

  const deleteForm = document.querySelector('#delete-button');
  deleteForm.classList.add('display-none');

  const saveForm = document.querySelector('#update-button');
  saveForm.innerHTML = 'Опубликовать';
  saveForm.addEventListener('click', async () => {
    // eslint-disable-next-line no-use-before-define
    const createdForm = formUpdatePageParser();
    if (!createdForm) {
      return;
    }
    if (!checkInputsValidation()) {
      renderMessage('Исправлены не все данные', true);
      return;
    }
    try {
      const api = new API();
      const res = await api.saveForm(createdForm);
      if (res.message === 'ok') {
        renderMessage('Опрос успешно создан.');
        setEditInProcess(false);
        goToPage(ROUTES.form, res.form.id);
        return;
      }
      renderMessage(res.message, true);
    } catch (e) {
      renderMessage('Ошибка сервера. Перезагрузите страницу', true);
    }
  });
};

/**
 * Функция для сбора информации о заполнении формы создания/редактирования опроса.
 * Читает все input`ы и textarea, собирая все в json
 *
 * @function
 * @return {form} form - собранный объект с опросом.
 */
export const formUpdatePageParser = () => {
  // Флаг того, что не все данные введены
  let flag = false;
  let flagRepeation = false;
  const form = {
    title: document.querySelector('#update-form__title').value,
    description: document.querySelector('#update-form__description-textarea').value,
    anonymous: document.querySelector('#update-form-anonymous-checkbox').checked,
    questions: [],
  };
  if (!form.title) {
    const titleInput = document.querySelector('#update-form__title');
    titleInput.classList.add('update-form__input-error');
    titleInput.addEventListener('click', () => {
      titleInput.classList.remove('update-form__input-error');
    }, {once: true});
    flag = true;
  }

  const cQuestions = document.querySelectorAll('.update-question');
  cQuestions.forEach((questionElement) => {
    let type = TYPE_TEXT;
    if (questionElement.querySelector('#update-question__answer-format-radio').checked) {
      type = TYPE_SINGLE_CHOICE;
    }
    if (questionElement.querySelector('#update-question__answer-format-checkbox').checked) {
      type = TYPE_MULTIPLE_CHOICE;
    }

    const question = {
      id: Number(questionElement.id),
      title: questionElement.querySelector('#update-question__title').value,
      description: questionElement.querySelector('#update-question__description-textarea').value,
      type,
      required: questionElement.querySelector('#required-question-checkbox').checked,
      answers: [],
    };

    if (!question.title) {
      const titleInput = questionElement.querySelector('#update-question__title');
      titleInput.classList.add('update-form__input-error');
      titleInput.addEventListener('click', () => {
        titleInput.classList.remove('update-form__input-error');
      }, {once: true});
      flag = true;
    }

    if (question.type === TYPE_TEXT) {
      question.answers.push({
        // id: Number(questionElement.querySelector('.update-question__answers-item-textarea').id),
        id: 0,
        text: '',
      });
    } else {
      const cAnswers = questionElement.querySelectorAll('.update-question__answers-item-input');
      const uniqueAnswers = new Set();
      cAnswers.forEach((answer) => {
        if (!answer.value) {
          answer.classList.add('update-form__input-error');
          answer.addEventListener('click', () => {
            answer.classList.remove('update-form__input-error');
          }, {once: true});
          flag = true;
        }
        question.answers.push({
          id: Number(answer.id),
          text: answer.value,
        });
        uniqueAnswers.add(answer.value);
      });
      if (question.answers.length !== uniqueAnswers.size) {
        const answersContainer = questionElement.querySelector('#question-answers');
        answersContainer.classList.add('update-form__input-error');
        answersContainer.addEventListener('click', () => {
          answersContainer.classList.remove('update-form__input-error');
        }, {once: true});
        flagRepeation = true;
      }
    }
    form.questions.push(question);
  });
  if (form.questions.length === 0) {
    const addButton = document.querySelector('#add-button');
    addButton.classList.add('update-form__input-error');
    addButton.addEventListener('click', () => {
      addButton.classList.remove('update-form__input-error');
    }, {once: true});
    flag = true;
  }

  if (flagRepeation) {
    renderMessage('Повторяющиеся ответы не допустимы.', true);
    return null;
  }
  if (flag) {
    renderMessage('Введены не все данные. Проверьте правильность заполнения.', true);
    return null;
  }
  return form;
};
