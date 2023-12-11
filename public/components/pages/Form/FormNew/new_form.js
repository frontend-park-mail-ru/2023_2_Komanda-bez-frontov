import {API} from '../../../../modules/api.js';
import {removeMessage, renderMessage} from '../../../Message/message.js';
import {STORAGE} from '../../../../modules/storage.js';
import {goToPage} from '../../../../modules/router.js';
import {ROUTES} from '../../../../config.js';
import {createQuestionUpdate, removedAnswersID} from '../../../Question/UpdateQuestion/update_question.js';
import {closePopUpWindow, renderPopUpWindow} from '../../../PopUpWindow/popup_window.js';
import {textValidation, usernameValidation} from '../../../../modules/validation.js';
import {TYPE_SINGLE_CHOICE, TYPE_MULTIPLE_CHOICE, TYPE_TEXT} from "../CheckForm/check_form.js";
import {editInProcess, setEditInProcess} from "../UpdateForm/update_form.js";
import {debounce} from "../../MyForms/forms.js";

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

  const rootElement = document.querySelector('#root');
  rootElement.innerHTML = '';
  rootElement.innerHTML = Handlebars.templates.update_form({form: defaultForm});

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

    let isTitleValid = true;
    const titleInput = document.querySelector('#update-form__title');

  titleInput.addEventListener("input", debounce((e) => {
    e.preventDefault();

    const titleValid = textValidation(titleInput.value);

    if (titleValid.valid) {
      titleInput.classList.remove('update-form__input-error');
      isTitleValid = true;
      removeMessage();
    } else {
      titleInput.classList.add('update-form__input-error');
      titleInput.addEventListener('click', () => {
        titleInput.classList.remove('update-form__input-error');
      }, {once: true});
      renderMessage(titleValid.message, true);
      isTitleValid = false;
    }
  }, 500));

  let isDescriptionValid = true;
  const descriptionInput = document.querySelector('#update-form__description-textarea');

  descriptionInput.addEventListener("input", debounce((e) => {
    e.preventDefault();

    const descriptionValid = textValidation(descriptionInput.value);
    if (descriptionValid.valid) {
      descriptionInput.classList.remove('update-form__input-error');
      removeMessage();
      isDescriptionValid = true;
    } else {
      descriptionInput.classList.add('update-form__input-error');
      descriptionInput.addEventListener('click', () => {
        descriptionInput.classList.remove('update-form__input-error');
      }, {once: true});
      renderMessage(descriptionValid.message, true);
      isDescriptionValid = false;
    }
  }, 500));


  let isQuestionsValid = 0;
  const cQuestions = document.querySelectorAll('.update-question');
  cQuestions.forEach((questionElement) => {
    let isQuestionTitleValid = true;
    const questionTitleInput = questionElement.querySelector('.update-question__title-input');

    questionTitleInput.addEventListener("input", debounce((e) => {
      e.preventDefault();

      const questionTitleValid = textValidation(questionTitleInput.value);
      if (questionTitleValid.valid) {
        questionTitleInput.classList.remove('update-form__input-error');
        isQuestionTitleValid = true;
        removeMessage();
        if (isQuestionsValid > 0) {
          isQuestionsValid -= 1;
        }
      } else {
        questionTitleInput.classList.add('update-form__input-error');
        questionTitleInput.addEventListener('click', () => {
          questionTitleInput.classList.remove('update-form__input-error');
        }, {once: true});
        renderMessage(questionTitleValid.message, true);
        isQuestionTitleValid = false;
        isQuestionsValid += 1;
      }
    }, 500));


    let isQuestionDescriptionValid = true;
    const questionDescriptionInput = questionElement.querySelector('.update-question__description-textarea');

    questionDescriptionInput.addEventListener("input", debounce((e) => {
      e.preventDefault();

      const questionDescriptionValid = textValidation(questionDescriptionInput.value);
      if (questionDescriptionValid.valid) {
        questionDescriptionInput.classList.remove('update-form__input-error');
        removeMessage();
        isQuestionDescriptionValid = true;
        if (isQuestionsValid > 0) {
          isQuestionsValid -= 1;
        }
      } else {
        questionDescriptionInput.classList.add('update-form__input-error');
        questionDescriptionInput.addEventListener('click', () => {
          questionDescriptionInput.classList.remove('update-form__input-error');
        }, {once: true});
        renderMessage(questionDescriptionValid.message, true);
        isQuestionDescriptionValid = false;
        isQuestionsValid += 1;
      }
    }, 500));

    let isAnswersValid = 0;
    if (!questionElement.querySelector('#update-question__answer-format-text').checked) {
      const cAnswers = questionElement.querySelectorAll('.update-question__answers-item-input');
      cAnswers.forEach((answer) => {
        let isAnswerValid = true;
        answer.addEventListener("input", debounce((e) => {
          e.preventDefault();

          const answerValid = textValidation(answer.value);

          if (answerValid.valid) {
            answer.classList.remove('update-form__input-error');
            removeMessage();
            isAnswerValid = true;
            if (isAnswersValid > 0) {
              isAnswersValid -= 1;
            }

          } else {
            answer.classList.add('update-form__input-error');
            answer.addEventListener('click', () => {
              answer.classList.remove('update-form__input-error');
            }, {once: true});
            renderMessage(answerValid.message, true);
            isAnswerValid = false;
            isAnswersValid += 1;
          }
        }, 500))
      });
      if (isAnswersValid > 0) {
        isQuestionsValid += 1;
      }
    }

  });

  saveForm.addEventListener('click', async () => {
    // eslint-disable-next-line no-use-before-define
    const createdForm = formUpdatePageParser();
    if (!createdForm) {
      return;
    }

    if (!isTitleValid || !isDescriptionValid || isQuestionsValid !== 0) {
      return;
    }

    // const formValidation = formUpdateValidator();
    // if (!formValidation.valid) {
    //   renderMessage(formValidation.message, true);
    //   return;
    // }
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
      if (e.toString() !== 'TypeError: Failed to fetch') {
        renderMessage('Ошибка сервера. Попробуйте позже', true);
        return;
      }
      renderMessage('Потеряно соединение с сервером', true);
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

