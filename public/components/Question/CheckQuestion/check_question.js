/** Compares first value to the second one allowing entering IF clouse if true.
 * Otherwise entering ELSE clause if exist.
 * eslint-disable-next-line func-names
 */
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

  // TODO удалить потом, для теста
  question.required = true;

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
      case 1:
        cRadioButtons.forEach( (rb) => {
          rb.checked = false;
        });
        break;
      case 2:
        cCheckboxButton.forEach( (cb) => {
          cb.checked = false;
        });
        break;
      case 3:
        textArea.value = '';
        break;
      default:
    }
  });

  return questionElement;
};
