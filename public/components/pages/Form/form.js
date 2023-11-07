import {API} from '../../../modules/api.js';
import {render404} from '../../404/404.js';
import {removeMessage, renderMessage} from '../../Message/message.js';
import {renderForms} from '../Forms/forms.js';

/**
 * Функция для рендеринга страницы опроса по его id.
 * Если пользователь не авторизован, происходит редирект на страницу входа.
 *
 * @async
 * @function
 * @param {number} id - ID.
 * @return {void}
 */
export async function renderForm(id) {
  if (!id) {
    renderForms();
    return;
  }

  removeMessage();
  const rootElement = document.querySelector('#root');
  rootElement.innerHTML = '';
  rootElement.innerHTML = Handlebars.templates.form();

  const formTitle = document.querySelector('#form-title');

  try {
    const api = new API();
    const res = await api.getForm(id);
    if (res.status === 200) {
      formTitle.innerHTML = res.form.title;
    } else {
      render404();
    }
  } catch (e) {
    if (e.toString() === 'TypeError: Failed to fetch') {
      renderMessage('Потеряно соединение с сервером', true)
    }
  }

}
