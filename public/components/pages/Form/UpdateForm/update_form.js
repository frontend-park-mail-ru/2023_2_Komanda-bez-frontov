import {API} from '../../../../modules/api.js';
import {render404} from '../../../404/404.js';
import {removeMessage, renderMessage} from '../../../Message/message.js';
import {renderForms} from '../../Forms/forms.js';

const formJSON = {
  title: 'new-form',
  questions: [
    {
      title: '1',
      type: 'single_choice',
      shuffle: false,
      description: '1',
      answers: [
        {
          text: '1_1',
        },
        {
          text: '1_2',
        },
      ],
    },
    {
      title: '2',
      type: 'multiple_choice',
      shuffle: false,
      description: '2',
      answers: [
        {
          text: '2_1',
        },
        {
          text: '2_2',
        },
      ],
    },
    {
      title: '1',
      type: 'no_choice',
      shuffle: false,
      description: '1',
      answers: [],
    },
  ],
};

// Compares first value to the second one allowing entering IF clouse if true.
// Otherwise entering ELSE clause if exist.
// eslint-disable-next-line func-names
Handlebars.registerHelper('ifEquals', function (a, b, options) {
  if (a === b) {
    return options.fn(this);
  }
  return options.inverse(this);
});

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
  rootElement.innerHTML = Handlebars.templates.update_form({form: formJSON});
  const questions = document.querySelector('#check-form__questions-container');
  for (const index in formJSON.questions) {
    const questionElement = document.createElement('div');
    questionElement.innerHTML = Handlebars.templates.update_question({question: formJSON.questions[index]});
    questions.appendChild(questionElement);
  }
  // try {
  //   const api = new API();
  //   const res = await api.getForm(id);
  //   if (res.status === 200) {
  //     formTitle.innerHTML = res.form.title;
  //   } else {
  //     render404();
  //   }
  // } catch (e) {
  //   if (e.toString() === 'TypeError: Failed to fetch') {
  //     renderMessage('Потеряно соединение с сервером', true);
  //   }
  // }
}
