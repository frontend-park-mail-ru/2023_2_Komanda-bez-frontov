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

  const answerContainer = questionElement.querySelector('#question-answers');
  const buttonAddAnswer = questionElement.querySelector('#update-question__answers_add_button');
  const buttonAddAnswerItem = questionElement.querySelector('#update-question__answers-item-button');


  const title = questionElement.querySelector('#update-question__title');
  const description = questionElement.querySelector('#update-question__description-textarea');
  const errorLabel = questionElement.querySelector('#update-question-title-validation-error');

  addValidationToFormInput(title, textValidation, errorLabel);
  addValidationToFormInput(description, textValidation, errorLabel);

  let type = question.type;
  const answers = question.answers;

  let isLastAnswer = -1;
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
          if (buttonAddAnswer) {
            buttonAddAnswer.classList.remove('button__disabled');
          }
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
      buttonAddAnswer.classList.add('display-none');
    }
  };


  const selectElement = questionElement.querySelector('#standard-select');
  let options = questionElement.querySelectorAll('.update-question__answer-format-radio');
  selectElement.value = options[type - 1].value;
  switch (type) {
    case TYPE_SINGLE_CHOICE:
      type = TYPE_SINGLE_CHOICE;
      buttonAddAnswerItem.type = 'radio';
      buttonAddAnswer.classList.add('update-question__answers_add_button');
      buttonAddAnswer.classList.remove('add-button-display-none');
      renderAnswers();
      break;
    case TYPE_MULTIPLE_CHOICE:
      type = TYPE_MULTIPLE_CHOICE;
      buttonAddAnswerItem.type = 'checkbox';
      buttonAddAnswer.classList.add('update-question__answers_add_button');
      buttonAddAnswer.classList.remove('add-button-display-none');
      renderAnswers();
      break;
    default:
      type = TYPE_TEXT;
      buttonAddAnswer.classList.remove('update-question__answers_add_button');
      buttonAddAnswer.classList.add('add-button-display-none');
      renderAnswers();
      break;
  }

  selectElement.addEventListener('change', () => {
  switch (selectElement.selectedIndex + 1) {
    case TYPE_SINGLE_CHOICE:
      type = TYPE_SINGLE_CHOICE;
      buttonAddAnswer.classList.add('update-question__answers_add_button');
      buttonAddAnswer.classList.remove('add-button-display-none');
      buttonAddAnswerItem.type = 'radio';
      renderAnswers();
      break;
    case TYPE_MULTIPLE_CHOICE:
      type = TYPE_MULTIPLE_CHOICE;
      buttonAddAnswer.classList.add('update-question__answers_add_button');
      buttonAddAnswer.classList.remove('add-button-display-none');
      buttonAddAnswerItem.type = 'checkbox';
      renderAnswers();
      break;
    default:
      type = TYPE_TEXT;
      buttonAddAnswer.classList.remove('update-question__answers_add_button');
      buttonAddAnswer.classList.add('add-button-display-none');
      renderAnswers();
      break;
  }
  });

  if (buttonAddAnswer) {
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
  }

  const requiredCheckbox = questionElement.querySelector('#required-question-checkbox');
  const requiredLabel = questionElement.querySelector('.update-question_button-container__required-label');
  requiredLabel.addEventListener('click', () => {
    requiredCheckbox.checked = !requiredCheckbox.checked;
  });

  return questionElement.querySelector('.update-question');
};
