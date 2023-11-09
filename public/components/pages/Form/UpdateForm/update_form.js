import {API} from '../../../../modules/api.js';
import {render404} from '../../../404/404.js';
import {removeMessage, renderMessage} from '../../../Message/message.js';
import {STORAGE, storageGetForm} from '../../../../modules/storage.js';

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

  let formJSON;
  try {
    const api = new API();
    const res = await api.getForm(id);
    if (res.status !== 200) {
      render404();
      return;
    }
    formJSON = res.form;
  } catch (e) {
    if (e.toString() !== 'TypeError: Failed to fetch') {
      return;
    }
    renderMessage('Потеряно соединение с сервером', true);
    formJSON = storageGetForm(id);
  }

  if (STORAGE.user.id !== formJSON.author.id) {
    renderMessage('Вы не являетесь автором опроса. Доступ запрещен.', true);
  }
  //
  // const rootElement = document.querySelector('#root');
  // rootElement.innerHTML = '';
  // rootElement.innerHTML = Handlebars.templates.update_form({form: formJSON});
  //
  // const questions = document.querySelector('#update-form__questions-container');
  // // eslint-disable-next-line no-restricted-syntax
  // for (const index in formJSON.questions) {
  //   const questionElement = document.createElement('div');
  //   questionElement.innerHTML = Handlebars.templates
  //     .update_question({question: formJSON.questions[index]});
  //   questions.appendChild(questionElement);
  // }
}
