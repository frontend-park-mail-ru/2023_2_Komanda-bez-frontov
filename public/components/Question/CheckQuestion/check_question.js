/** Compares first value to the second one allowing entering IF clause if true.
 * Otherwise, entering ELSE clause if exists.
 * eslint-disable-next-line func-names
 */
import {TYPE_SINGLE_CHOICE, TYPE_MULTIPLE_CHOICE, TYPE_TEXT} from "../../pages/Form/CheckForm/check_form.js";
import {textValidation} from "../../../modules/validation.js";
import {addValidationToFormInput} from "../../pages/Form/UpdateForm/update_form.js";

Handlebars.registerHelper('ifEquals', (a, b, options) => {
  if (a === b) {
    return options.fn(this);
  }
  return options.inverse(this);
});

/**
 * Функция для рендеринга одного вопроса (вариант для просмотра и прохождения).
 *
 * @function
 * @param {question} question - JSON с информацией о вопросе.
 * @return {HTMLDivElement} - HTML элемент вопроса.
 */
export const createQuestion = (question) => {
  const questionElement = document.createElement('div');

  questionElement.innerHTML = Handlebars.templates.check_question({question});

  const cRadioButtons = questionElement.querySelectorAll('.check-question__answer-item-radio');
  cRadioButtons.forEach((radioButton) => {
    radioButton.addEventListener('click', () => {
      cRadioButtons.forEach((rb) => {
        // eslint-disable-next-line no-param-reassign
        rb.checked = false;
      });
      // eslint-disable-next-line no-param-reassign
      radioButton.checked = true;
    });
  });

  const cCheckboxButton = questionElement.querySelectorAll('.check-question__answer-item-checkbox');
  const textArea = questionElement.querySelector('.check-question__answers-item-textarea');

  const clearButton = questionElement.querySelector('#check-question__clear-button');
  clearButton.addEventListener('click', () => {
    switch (question.type) {
      case TYPE_SINGLE_CHOICE:
        cRadioButtons.forEach( (rb) => {
          rb.checked = false;
        });
        break;
      case TYPE_MULTIPLE_CHOICE:
        cCheckboxButton.forEach( (cb) => {
          cb.checked = false;
        });
        break;
      case TYPE_TEXT:
        textArea.value = '';
        break;
      default:
    }
  });

  if (question.type === TYPE_TEXT) {
    const errorLabel = questionElement.querySelector('#check-question-validation-error');
    addValidationToFormInput(textArea, textValidation, errorLabel);
  }

  return questionElement;
};
