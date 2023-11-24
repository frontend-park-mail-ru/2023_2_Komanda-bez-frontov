import {API} from '../../../../modules/api.js';
import {render404} from '../../../404/404.js';
import {renderMessage} from '../../../Message/message.js';
import {storageGetFormByID, STORAGE} from '../../../../modules/storage.js';
import {frontendUrl, ROUTES} from '../../../../config.js';
import {goToPage} from '../../../../modules/router.js';
import {createQuestion} from '../../../Question/CheckQuestion/check_question.js';
import {renderPopUpWindow} from '../../../PopUpWindow/popup_window.js';
import {renderAuthorMenu} from '../../../AuthorMenu/authorMenu.js';
import {textValidation} from "../../../../modules/validation.js";

/**
 * Функция для рендеринга страницы опроса по его id.
 *
 * @async
 * @function
 * @param {number} id - ID.
 * @return {void}
 */
export const renderForm = async (id) => {
  const api = new API();
  if (!id) {
    const page = ROUTES.forms;
    window.history.replaceState(page.state, '', page.url);
    goToPage(page, 0, true);
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

  const rootElement = document.querySelector('#root');
  rootElement.innerHTML = '';

  if (STORAGE.user && STORAGE.user.id === formJSON.author.id) {
    renderAuthorMenu(id);
    const menuCheckButton = document.querySelector('#author-menu-check-button');
    menuCheckButton.disabled = true;
    menuCheckButton.classList.add('secondary-button');
    menuCheckButton.classList.remove('primary-button');
  }

  // TODO удалить. потом будет получаться из апи, пока тест
  formJSON.anonymous = true;

  rootElement.innerHTML += Handlebars.templates.check_form({form: formJSON});

  // Чтоб красиво выглядело, но не получилось
  // if (STORAGE.user && STORAGE.user.id === formJSON.author.id) {
  //   document.querySelector('.check-form').style.left = '155px';
  // }

  if (STORAGE.user && !formJSON.anonymous) {
    document.querySelector('.check-form__anonymous').style.display = 'none';
  }

  const questions = document.querySelector('#check-form__questions-container');
  formJSON.questions.forEach((question) => {
    const questionElement = createQuestion(question);
    questions.appendChild(questionElement);
  });

  const updateSubmitButton = document.querySelector('#update-submit-button');
  if (STORAGE.user && STORAGE.user.id === formJSON.author.id) {
    updateSubmitButton.innerHTML = 'Редактировать';
    updateSubmitButton.addEventListener('click', () => {
      goToPage(ROUTES.formUpdate, id);
    });
  } else {
    // TODO проверка на анонимность
    if (!STORAGE.user && !formJSON.anonymous) {
      goToPage(ROUTES.login);
      renderMessage("Для прохождение опроса необходимо авторизироваться", true);
      return;
    }
    updateSubmitButton.innerHTML = 'Отправить';

    updateSubmitButton.addEventListener('click', async () => {
      let passageJSON = {
        form_id: formJSON.id,
        passage_answers: [
        ]
      };

      let passageAnswerJSON = {
        question_id: -1,
        answer_text: -1,
      };

      formJSON.questions.forEach((question) => {
        if (question.type === 1 || question.type === 2) {
          let isAnswered = false;
          question.answers.forEach((answer) => {
            const chosenAnswer = document.querySelector(`#check-question_${question.id}_answer-item_${answer.id}`);
            if (chosenAnswer.checked) {
              passageAnswerJSON = {
                question_id: question.id,
                answer_text: answer.text,
              };
              passageJSON.passage_answers.push(passageAnswerJSON);
              isAnswered = true;
            }
          })

          if (question.required && !isAnswered) {
            renderMessage("Вы ответили не на все вопросы", true);
          }
        }

        else if (question.type === 3) {
          const chosenAnswer = document.querySelector(`#check-question_${question.id}_answers-item`);

          if (question.required && chosenAnswer.value === "") {
            chosenAnswer.classList.add('update-form__input-error');
            chosenAnswer.addEventListener('click', () => {
              chosenAnswer.classList.remove('update-form__input-error');
            }, {once: true});

            renderMessage("Вы ответили не на все вопросы", true);
            return;
          }

          const validator = textValidation(chosenAnswer.value);
          if (!validator.valid) {
            chosenAnswer.classList.add('update-form__input-error');
            chosenAnswer.addEventListener('click', () => {
              chosenAnswer.classList.remove('update-form__input-error');
            }, {once: true});

            renderMessage(validator.message, true);
            return;
          }

          passageAnswerJSON = {
            question_id: question.id,
            answer_text: chosenAnswer.value,
          };
          passageJSON.passage_answers.push(passageAnswerJSON);
        }
      });

      try {
        const res = await api.passageForm(passageJSON);
        if (res.message !== 'ok') {
          if (res.message === '404') {
            render404();
            return;
          }
          renderMessage(res.message, true);
          return;
        }
      } catch (e) {
        if (e.toString() !== 'TypeError: Failed to fetch') {
          renderMessage('Ошибка сервера. Попробуйте позже', true);
          return;
        }
      }
      if (!STORAGE.user) {
        goToPage(ROUTES.main);
      } else {
        goToPage(ROUTES.forms);
      }
      renderMessage("Вы успешно прошли опрос! Ваши результаты сохранены");

    });
  }

  const createLinkButton = document.querySelector('#create-link-button');
  if (STORAGE.user.id === formJSON.author.id) {
    createLinkButton.addEventListener('click', (e) => {
      const link = `${frontendUrl}/forms/${id}`;
      e.stopImmediatePropagation();
      renderPopUpWindow('Ваша ссылка готова', link, false, () => {
        const copyButton = document.querySelector('#popup-ok-button');
        copyButton.innerHTML = 'Скопировано!';
        copyButton.classList.add('primary-button');
        copyButton.classList.remove('secondary-button');
        navigator.clipboard.writeText(link);
      });
      document.querySelector('#popup-ok-button').innerHTML = 'Скопировать';
    });
  } else {
    createLinkButton.style.display = 'none';
  }
};
