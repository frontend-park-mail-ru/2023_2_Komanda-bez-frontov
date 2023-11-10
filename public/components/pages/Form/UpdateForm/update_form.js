import {API} from '../../../../modules/api.js';
import {render404} from '../../../404/404.js';
import {removeMessage, renderMessage} from '../../../Message/message.js';
import {clearStorage, STORAGE, storageGetForm} from '../../../../modules/storage.js';
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
 * @param {number} id - ID.
 * @return {void}
 */
export async function renderFormUpdate(id) {
  removeMessage();
  if (!id) {
    render404();
    return;
  }

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

  let formJSON;
  try {
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

  if (STORAGE.user.id !== formJSON.author.id) {
    renderMessage('У вас нет прав на редактирование этого опроса.', true);
    return;
  }

  rootElement.innerHTML = Handlebars.templates.update_form({form: formJSON});

  const questions = document.querySelector('#check-form__questions-container');
  // eslint-disable-next-line no-restricted-syntax
  for (const index in formJSON.questions) {
    const questionElement = createQuestionUpdate(formJSON.questions[index]);
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
      shuffle: true,
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

  const deleteQuestion = document.querySelector('#delete-button');
  deleteQuestion.addEventListener('click', () => {
    renderPopUpWindow('Вы уверены, что хотите удалить опрос? Это действие необратимо.', true, () => {
      // delete api
    });
  });
}
