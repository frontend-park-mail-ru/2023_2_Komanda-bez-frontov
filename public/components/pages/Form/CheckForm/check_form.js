import {API} from '../../../../modules/api.js';
import {render404} from '../../../404/404.js';
import {renderMessage} from '../../../Message/message.js';
import {STORAGE} from '../../../../modules/storage.js';
import {frontendUrl, ROUTES} from '../../../../config.js';
import {goToPage} from '../../../../modules/router.js';
import {createQuestion} from '../../../Question/CheckQuestion/check_question.js';
import {renderPopUpWindow} from '../../../PopUpWindow/popup_window.js';
import {renderAuthorMenu} from '../../../AuthorMenu/authorMenu.js';
import {submitPageValidation, submitPageValidationCheck} from "../../Login/login.js";

export const TYPE_SINGLE_CHOICE = 1;
export const TYPE_MULTIPLE_CHOICE = 2;
export const TYPE_TEXT = 3;

export let formIDToRedirect = 0;
export const clearFormIDToRedirect = () => {
  formIDToRedirect = 0;
}

/**
 * Функция для рендеринга страницы опроса по его id.
 *
 * @async
 * @function
 * @param {number} id - ID.
 * @return {void}
 */
export const renderForm = async (id) => {
  submitPageValidationCheck();

  const api = new API();
  if (!id) {
    const page = ROUTES.forms;
    window.history.replaceState(page.state, '', page.url);
    goToPage(page, 0, true);
    return;
  }

  const rootElement = document.querySelector('#root');
  rootElement.innerHTML = '';
  if (STORAGE.user) {
    renderAuthorMenu(id);
    const menuCheckButton = document.querySelector('#author-menu-check-button');
    menuCheckButton.disabled = true;
    menuCheckButton.classList.add('secondary-button');
    menuCheckButton.classList.remove('primary-button');
  }

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
    if (e.toString() !== 'TypeError: Failed to fetch') {
      renderMessage('Ошибка сервера. Перезагрузите страницу', true);
      return;
    }
  }

  if (!STORAGE.user || STORAGE.user.id !== formJSON.author.id) {
    rootElement.innerHTML = '';
  }

  rootElement.insertAdjacentHTML('beforeend', Handlebars.templates.check_form({form: formJSON}));

  if (STORAGE.user && !formJSON.anonymous) {
    document.querySelector('.check-form__anonymous').classList.add('display-none');
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
    if (!STORAGE.user && !formJSON.anonymous) {
      formIDToRedirect = id;
      updateSubmitButton.classList.add('display-none');
    }
    updateSubmitButton.innerHTML = 'Отправить';

    updateSubmitButton.addEventListener('click', async () => {
      if (!submitPageValidation) {
        renderMessage('Исправлены не все данные', true);
        return;
      }

      const passageJSON = {
        form_id: formJSON.id,
        passage_answers: [
        ]
      };

      let err = false;
      formJSON.questions.forEach((question) => {
        if (question.type === TYPE_SINGLE_CHOICE || question.type === TYPE_MULTIPLE_CHOICE) {
          let isAnswered = false;
          question.answers.forEach((answer) => {
            const chosenAnswer = document.querySelector(`#check-question_${question.id}_answer-item_${answer.id}`);
            if (chosenAnswer.checked) {
              const passageAnswerJSON = {
                question_id: question.id,
                answer_text: answer.text,
              };
              passageJSON.passage_answers.push(passageAnswerJSON);
              isAnswered = true;
            }
          })

          if (question.required && !isAnswered) {
            renderMessage("Вы ответили не на все вопросы", true);
            const answerContainer = document.querySelector(`#check-question_${question.id}__answers`);
            answerContainer.classList.add('update-form__input-error');
            answerContainer.addEventListener('click', () => {
              answerContainer.classList.remove('update-form__input-error');
            }, {once: true});
            err = true;
          }
        }

        else if (question.type === TYPE_TEXT) {
          const chosenAnswer = document.querySelector(`#check-question_${question.id}_answers-item`);

          if (question.required && chosenAnswer.value === "") {
            chosenAnswer.classList.add('update-form__input-error');
            chosenAnswer.addEventListener('input', () => {
              chosenAnswer.classList.remove('update-form__input-error');
            }, {once: true});

            renderMessage("Вы ответили не на все вопросы", true);
            err = true;
            return;
          }

          if (chosenAnswer.value !== '') {
            const passageAnswerJSON = {
              question_id: question.id,
              answer_text: chosenAnswer.value,
            };
            passageJSON.passage_answers.push(passageAnswerJSON);
          }
        }
      });

      if (err) {
        return;
      }
      if (passageJSON.passage_answers.length === 0) {
        renderMessage('Вы не ответили ни на один вопрос', true);
        return;
      }

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
        renderMessage('Ошибка сервера. Перезагрузите страницу', true);
        return;
      }
      if (!STORAGE.user) {
        goToPage(ROUTES.main);
      } else {
        goToPage(ROUTES.forms);
      }
      renderMessage("Вы успешно прошли опрос! Ваш ответ записан");

    });
  }

  const createLinkButton = document.querySelector('#create-link-button');
  if (STORAGE.user && STORAGE.user.id === formJSON.author.id) {
    createLinkButton.addEventListener('click', (e) => {
      const link = `${frontendUrl}/forms/${id}`;
      e.stopImmediatePropagation();
      renderPopUpWindow('Ваша ссылка готова', link, false, () => {
        const copyButton = document.querySelector('#popup-ok-button');
        copyButton.innerHTML = 'Скопировано!';
        copyButton.classList.add('primary-button');
        copyButton.classList.remove('secondary-button');
        // Копирование ссылки в буфер на компе
        navigator.clipboard.writeText(link);
      });
      document.querySelector('#popup-ok-button').innerHTML = 'Скопировать';
    });
  } else {
    createLinkButton.classList.add('display-none');
  }
};
