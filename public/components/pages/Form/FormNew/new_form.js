import {API} from '../../../../modules/api.js';
import {removeMessage, renderMessage} from '../../../Message/message.js';
import {clearStorage, STORAGE} from '../../../../modules/storage.js';
import {goToPage} from '../../../../modules/router.js';
import {ROUTES} from '../../../../config.js';
import {createQuestionUpdate} from '../../../Question/UpdateQuestion/update_question.js';
import {renderPopUpWindow} from '../../../PopUpWindow/popup_window.js';

/**
 * Функция для рендеринга страницы опроса по его id.
 * Если пользователь не авторизован, происходит редирект на страницу входа.
 *
 * @async
 * @function
 * @return {void}
 */
export async function renderFormNew() {
  removeMessage();

  // Проверка авторизации
  const api = new API();
  try {
    const isAuth = await api.isAuth();
    if (!isAuth.isAuthorized) {
      clearStorage();
      goToPage(ROUTES.login);
      renderMessage('Вы не авторизованы!', true);
      return;
    }
    STORAGE.user = isAuth.authorizedUser;
  } catch (e) {
    if (e.toString() !== 'TypeError: Failed to fetch') {
      renderMessage('Ошибка сервера. Попробуйте позже', true);
      return;
    }
    renderMessage('Потеряно соединение с сервером', true);
    if (!STORAGE.user) {
      goToPage(ROUTES.main);
      return;
    }
  }

  const defaultForm = {
    title: 'Заголовок опроса',
    description: 'Описание опроса',
    questions: [
      {
        id: 0,
        title: 'Новый вопрос',
        description: 'Описание вопроса',
        type: 1,
        shuffle: false,
        answers: [
          {
            id: 0,
            text: 'новый ответ',
          },
        ],
      },
    ],
  };

  const rootElement = document.querySelector('#root');
  rootElement.innerHTML = '';
  rootElement.innerHTML = Handlebars.templates.update_form({form: defaultForm});

  const pageTitle = document.querySelector('#update-form-title');
  pageTitle.innerHTML = 'Создание опроса';

  const questions = document.querySelector('#check-form__questions-container');
  {
    const questionElement = createQuestionUpdate(defaultForm.questions[0]);
    questionElement.querySelector('#delete-question').addEventListener('click', () => {
      renderPopUpWindow('Вы уверены, что хотите безвозвратно удалить вопрос?', true, () => {
        questionElement.remove();
      });
    });
    questions.appendChild(questionElement);
  }

  const addQuestion = document.querySelector('#add-button');
  addQuestion.addEventListener('click', () => {
    const defaultQuestion = {
      id: 0,
      title: 'Новый вопрос',
      description: 'Описание вопроса',
      type: 1,
      shuffle: false,
      answers: [
        {
          id: 0,
          text: 'новый ответ',
        },
      ],
    };
    const questionElement = createQuestionUpdate(defaultQuestion);
    questionElement.querySelector('#delete-question').addEventListener('click', () => {
      renderPopUpWindow('Вы уверены, что хотите безвозвратно удалить вопрос?', true, () => {
        questionElement.remove();
      });
    });
    questions.appendChild(questionElement);
  });

  const deleteForm = document.querySelector('#delete-button');
  deleteForm.style.display = 'none';

  const saveForm = document.querySelector('#update-button');
  saveForm.innerHTML = 'Опубликовать';
  saveForm.addEventListener('click', async () => {
    // eslint-disable-next-line no-use-before-define
    const createdForm = formPageParser();
    if (!createdForm) {
      renderMessage('Введены не все данные. Проверьте правильность заполнения.', true);
      return;
    }
    try {
      const res = await api.saveForm(createdForm);
      const status = res.status;
      if (status === 200) {
        renderMessage('Опрос успешно создан.');
        goToPage(ROUTES.form, res.form.id);
        return;
      }
      renderMessage('Ошибка сервера. Попробуйте позже', true);
    } catch (e) {
      if (e.toString() !== 'TypeError: Failed to fetch') {
        renderMessage('Ошибка сервера. Попробуйте позже', true);
        return;
      }
      renderMessage('Потеряно соединение с сервером', true);
    }
  });
}

/**
 * Функция для сбора информации о заполнении формы создания/редактирования опроса.
 * Читает все input`ы и textarea, собирая все в json
 *
 * @function
 * @return {form} form - собранный объект с опросом.
 */
export function formPageParser() {
  // Флаг того, что не все данные введены
  let flag = false;
  const form = {
    title: document.querySelector('#update-form__title').value,
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
    let type = 3;
    if (questionElement.querySelector('#update-question__answer-format-radio').checked) {
      type = 1;
    }
    if (questionElement.querySelector('#update-question__answer-format-checkbox').checked) {
      type = 2;
    }

    const question = {
      title: questionElement.querySelector('#update-question__title').value,
      description: questionElement.querySelector('#update-question__description-textarea').value,
      type,
      shuffle: false,
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
    if (!question.description) {
      const descInput = questionElement.querySelector('#update-question__description-textarea');
      descInput.classList.add('update-form__input-error');
      descInput.addEventListener('click', () => {
        descInput.classList.remove('update-form__input-error');
      }, {once: true});
      flag = true;
    }

    if (question.type === 3) {
      question.answers.push({
        text: '',
      });
    } else {
      const cAnswers = questionElement.querySelectorAll('#update-question__answers-item-input');
      cAnswers.forEach((answer) => {
        if (!answer.value) {
          answer.classList.add('update-form__input-error');
          answer.addEventListener('click', () => {
            answer.classList.remove('update-form__input-error');
          }, {once: true});
          flag = true;
        }
        question.answers.push({
          text: answer.value,
        });
      });
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

  if (flag) {
    console.log(form);
    return null;
  }
  return form;
}
