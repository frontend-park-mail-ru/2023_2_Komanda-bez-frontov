import {TYPE_SINGLE_CHOICE, TYPE_MULTIPLE_CHOICE, TYPE_TEXT} from "../../pages/Form/CheckForm/check_form.js";
import {textValidation} from "../../../modules/validation.js";
import {addValidationToFormInput} from "../../pages/Form/UpdateForm/update_form.js";
export const removedAnswersID = [];

/**
 * Функция для рендеринга одного вопроса (вариант для формы обновления и создания).
 *
 * @function
 * @param {question} question - JSON с информацией о вопросе.
 * @return {HTMLDivElement} - HTML элемент вопроса.
 */
export const createQuestionUpdate = (question) => {
  const questionElement = document.createElement('div');
  questionElement.innerHTML = Handlebars.templates.update_question({question});

  const radioButton = questionElement.querySelector('#update-question__answer-format-radio');
  const checkboxButton = questionElement.querySelector('#update-question__answer-format-checkbox');
  const textButton = questionElement.querySelector('#update-question__answer-format-text');
  const answerContainer = questionElement.querySelector('#question-answers');
  const buttonAddAnswer = questionElement.querySelector('#add-answer-button');

  const title = questionElement.querySelector('#update-question__title');
  const description = questionElement.querySelector('#update-question__description-textarea');
  const errorLabel = questionElement.querySelector('#update-question-title-validation-error');

  addValidationToFormInput(title, textValidation, errorLabel);
  addValidationToFormInput(description, textValidation, errorLabel);

  let type = question.type;
  const answers = question.answers;

  const renderAnswers = () => {
    answerContainer.innerHTML = Handlebars.templates.update_answer({answers, type});
    const errorLabelAnswers = questionElement.querySelector('#update-answers-validation-error');
    const cInputText = questionElement.querySelectorAll('.update-question__answers-item-input');
    cInputText.forEach((input, index) => {
      input.addEventListener('change', () => {
        answers[index].text = input.value;
      });
      addValidationToFormInput(input, textValidation, errorLabelAnswers);
    });
    const cAnswers = questionElement.querySelectorAll('.update-question__answers-item');
    cAnswers.forEach((answerElement, index) => {
      const deleteButton = answerElement.querySelector('.update-question__answers-item-delete');
      if (deleteButton) {
        deleteButton.addEventListener('click', () => {
          buttonAddAnswer.classList.remove('button__disabled');
          answers.splice(index, 1);
          if (answers.length === 0) {
            answers.push({
              id: 0,
              text: '',
            })
          }
          if (deleteButton.id !== '0') {
            removedAnswersID.push(Number(deleteButton.id));
          }
          renderAnswers();
        });
      }
    });

    if (answers.length >= 12) {
      buttonAddAnswer.classList.add('button__disabled');
    }
  };

  switch (type) {
    case TYPE_SINGLE_CHOICE:
      radioButton.checked = true;
      renderAnswers();
      break;
    case TYPE_MULTIPLE_CHOICE:
      checkboxButton.checked = true;
      renderAnswers();
      break;
    default:
      textButton.checked = true;
      renderAnswers();
      buttonAddAnswer.classList.add('display-none');
      break;
  }

  radioButton.addEventListener('click', () => {
    checkboxButton.checked = false;
    textButton.checked = false;
    type = TYPE_SINGLE_CHOICE;
    buttonAddAnswer.classList.remove('display-none');
    renderAnswers();
  });
  checkboxButton.addEventListener('click', () => {
    radioButton.checked = false;
    textButton.checked = false;
    type = TYPE_MULTIPLE_CHOICE;
    buttonAddAnswer.classList.remove('display-none');
    renderAnswers();
  });
  textButton.addEventListener('click', () => {
    checkboxButton.checked = false;
    radioButton.checked = false;
    type = TYPE_TEXT;
    buttonAddAnswer.classList.add('display-none');
    renderAnswers();
  });

  buttonAddAnswer.addEventListener('click', () => {
    if (answers.length >= 12) {
      return;
    }
    answers.push({
      id: 0,
      text: '',
    });
    renderAnswers();
  });

  return questionElement;
};
