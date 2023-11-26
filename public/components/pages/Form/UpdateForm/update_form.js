import {API} from '../../../../modules/api.js';
import {render404} from '../../../404/404.js';
import {removeMessage, renderMessage} from '../../../Message/message.js';
import {STORAGE, storageGetFormByID} from '../../../../modules/storage.js';
import {goToPage} from '../../../../modules/router.js';
import {ROUTES} from '../../../../config.js';
import {createQuestionUpdate, removedAnswersID} from '../../../Question/UpdateQuestion/update_question.js';
import {closePopUpWindow, renderPopUpWindow} from '../../../PopUpWindow/popup_window.js';
import {formUpdatePageParser, formUpdateValidator} from '../FormNew/new_form.js';
import {renderAuthorMenu} from "../../../AuthorMenu/authorMenu.js";

const TYPE_SINGLE_CHOICE = 1;

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

  let formJSON;
  try {
    const res = await api.getFormByID(id);
    if (res.message !== 'ok') {
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
      renderMessage('Ошибка сервера. Попробуйте позже', true);
      return;
    }
    // Попытка найти опрос в локальном хранилище
    renderMessage('Потеряно соединение с сервером', true);
    formJSON = storageGetFormByID(id);
  }

  if (STORAGE.user.id !== formJSON.author.id) {
    renderMessage('У вас нет прав на редактирование этого опроса.', true);
    return;
  }

  const removedQuestionsID = [];
  removedAnswersID.length = 0;

  const rootElement = document.querySelector('#root');
  rootElement.innerHTML = '';

  renderAuthorMenu(id);
  const menuUpdateButton = document.querySelector('#author-menu-update-button');
  menuUpdateButton.disabled = true;
  menuUpdateButton.classList.add('secondary-button');
  menuUpdateButton.classList.remove('primary-button');

  rootElement.insertAdjacentHTML('beforeend', Handlebars.templates.update_form({form: formJSON}));

  const questions = document.querySelector('#check-form__questions-container');
  formJSON.questions.forEach((question) => {
    const questionElement = createQuestionUpdate(question);
    questionElement.querySelector('#delete-question').addEventListener('click', (e) => {
      e.stopImmediatePropagation();
      renderPopUpWindow('Требуется подтверждение', 'Вы уверены, что хотите безвозвратно удалить вопрос?', true, () => {
        questionElement.remove();
        removedQuestionsID.push(question.id);
        closePopUpWindow();
      });
    });
    questions.appendChild(questionElement);
  });

  const addQuestion = document.querySelector('#add-button');
  addQuestion.addEventListener('click', () => {
    const defaultQuestion = {
      id: 0,
      title: '',
      description: '',
      type: TYPE_SINGLE_CHOICE,
      shuffle: false,
      answers: [
        {
          id: 0,
          text: '',
        },
      ],
    };
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
  deleteForm.addEventListener('click', (e) => {
    e.stopImmediatePropagation();
    renderPopUpWindow('Требуется подтверждение', 'Вы уверены, что хотите удалить опрос? Это действие необратимо.', true, async () => {
      try {
        const res = await api.deleteForm(id);
        if (res.message === 'ok') {
          renderMessage('Опрос успешно удален.');
          goToPage(ROUTES.forms);
          closePopUpWindow();
          return;
        }
        renderMessage(res.message, true);
      } catch (e) {
        if (e.toString() !== 'TypeError: Failed to fetch') {
          renderMessage('Ошибка сервера. Попробуйте позже', true);
          closePopUpWindow();
          return;
        }
        renderMessage('Потеряно соединение с сервером', true);
      }
      closePopUpWindow();
    });
  });

  const updateForm = document.querySelector('#update-button');
  updateForm.addEventListener('click', async () => {
    const updatedForm = formUpdatePageParser();
    if (!updatedForm) {
      return;
    }
    const formValidation = formUpdateValidator();
    if (!formValidation.valid) {
      renderMessage(formValidation.message, true);
      return;
    }
    updatedForm.id = Number(id);
    updatedForm.removed_questions = removedQuestionsID;
    updatedForm.remoed_answers = removedAnswersID;
    console.log(updatedForm);
    try {
      const res = await api.updateForm(updatedForm);
      if (res.message === 'ok') {
        renderMessage('Опрос успешно обновлен.');
        goToPage(ROUTES.form, id);
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
