import {API, defaultFetchErrorMessage} from '../../../../modules/api.js';
import {render404} from '../../../404/404.js';
import {renderMessage} from '../../../Message/message.js';
import {STORAGE} from '../../../../modules/storage.js';
import {backendUrl, frontendUrl, ROUTES, ROUTES_API} from '../../../../config.js';
import {goToPage} from '../../../../modules/router.js';
import {createQuestion} from '../../../Question/CheckQuestion/check_question.js';
import {closePopUpWindow, renderPopUpWindow} from '../../../PopUpWindow/popup_window.js';
import {renderAuthorMenu} from '../../../AuthorMenu/authorMenu.js';
import {checkInputsValidation} from "../../Login/login.js";

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

  const api = new API();
  if (!id) {
    const page = ROUTES.forms;
    window.history.replaceState(page.state, '', page.url);
    goToPage(page, 0, true);
    return;
  }

  const rootElement = document.querySelector('#root');

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
      renderMessage(defaultFetchErrorMessage, true);
      return;
    }
  }

  rootElement.innerHTML = '';

  if (STORAGE.user && STORAGE.user.id === formJSON.author.id) {
    renderAuthorMenu(id, formJSON.is_archived);
    const menuCheckButton = document.querySelector('#author-menu-check-button');
    menuCheckButton.classList.add('secondary-button');
    menuCheckButton.classList.remove('primary-button');
  }

  rootElement.insertAdjacentHTML('beforeend', Handlebars.templates.check_form({form: formJSON}));

  if (STORAGE.user && !formJSON.anonymous) {
    document.querySelector('.check-form__anonymous-warning-container').classList.add('display-none');
    if (formJSON.archive_when && STORAGE.user.id === formJSON.author.id) {
      const archiveLabel = document.querySelector('.form__archive-warning');
      const date = new Date(formJSON.archive_when);
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      formJSON.archive_when= date.toLocaleDateString('ru', options);
      archiveLabel.innerHTML += formJSON.archive_when;
    }
  }

  if (!STORAGE.user || STORAGE.user.id !== formJSON.author.id) {
    const warning = document.querySelector('.form__archive-warning');
    if (warning) {
      warning.remove();
    }
  }

  const updateSubmitButton = document.querySelector('#update-submit-button');
  if (formJSON.anonymous || formJSON.passage_max === -1) {
    const passagesMaxContainer = document.querySelector('.check-form__max-passage-container');
    passagesMaxContainer.classList.add('display-none');
  } else {
    const passagesLeftLabel = document.querySelector('#check-form-passages-left');
    const passagesLeft = formJSON.passage_max - formJSON.cur_passage_total >= 0 ?
        formJSON.passage_max - formJSON.cur_passage_total : 0;
    passagesLeftLabel.innerText = passagesLeft;
    if (passagesLeft <= 0) {
      updateSubmitButton.classList.add('display-none');
    }
  }

  const questions = document.querySelector('#check-form__questions-container');
  formJSON.questions.forEach((question) => {
    const questionElement = createQuestion(question);
    questions.appendChild(questionElement);
  });

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
      if (!checkInputsValidation()) {
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
        renderMessage(defaultFetchErrorMessage, true);
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

  if (STORAGE.user && STORAGE.user.id !== formJSON.author.id) {
    const chatButton = document.querySelector('#form-chat-button');
    chatButton.classList.remove('display-none');
    chatButton.addEventListener('click', (e) => {
      e.stopImmediatePropagation();

      const popupContainer = document.querySelector('#popup');
      popupContainer.innerHTML = Handlebars.templates.popup_message();
      document.body.classList.add("stop-scrolling");

      const input = popupContainer.querySelector('#popup-mess-input');

      const cancelButton = document.querySelector('#popup-cancel-button');
      cancelButton.addEventListener('click', () => {
        closePopUpWindow();
      });
      const okButton = document.querySelector('#popup-ok-button');
      okButton.addEventListener('click', async() => {
        if (input.value === '') {
          return;
        }
        const text = input.value;
        try {
          const res = await api.sendMessage(formJSON.author.id, text);
          if (res.message !== 'ok') {
            renderMessage(res.message, true);
            return;
          }
        } catch (e) {
          renderMessage(defaultFetchErrorMessage, true);
          return;
        }
        closePopUpWindow();
        goToPage(ROUTES.chat, formJSON.author.id);
      });

      const closePopUpWindowByBody = (e) => {
        if (!e.target.classList.contains('popup_window')
            && !e.target.parentNode.classList.contains('popup_window')
            && !e.target.parentNode.classList.contains('button-container-diagram')) {
          document.body.removeEventListener('click', closePopUpWindowByBody);
          closePopUpWindow();
        }
      };

      document.body.addEventListener('click', closePopUpWindowByBody);
    })
  }

};
