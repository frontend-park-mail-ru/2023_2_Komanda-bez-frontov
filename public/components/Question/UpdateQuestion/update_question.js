/**
 * Функция для рендеринга одного вопроса (вариант для формы обновления и создания).
 *
 * @function
 * @param {question} question - JSON с информацией о вопросе.
 * @return {HTMLDivElement} - HTML элемент вопроса.
 */
export function createQuestionUpdate(question) {
  const questionElement = document.createElement('div');
  questionElement.innerHTML = Handlebars.templates.update_question({question});

  const radioButton = questionElement.querySelector('#update-question__answer-format-radio');
  const checkboxButton = questionElement.querySelector('#update-question__answer-format-checkbox');
  const textButton = questionElement.querySelector('#update-question__answer-format-text');
  const answerContainer = questionElement.querySelector('#question-answers');
  const buttonContainer = questionElement.querySelector('.update-question__button-container');

  let type = question.type;
  const answers = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const index in question.answers) {
    answers.push({
      id: index,
      text: question.answers[index].text,
    });
  }

  function renderAnswers() {
    answerContainer.innerHTML = Handlebars.templates
      .update_answer({answers, type});
    const cInputText = questionElement.querySelectorAll('.update-question__answers-item-input');
    cInputText.forEach((input, index) => {
      input.addEventListener('change', () => {
        answers[index].text = input.value;
      });
    });
  }

  switch (type) {
    case 1:
      radioButton.checked = true;
      renderAnswers();
      break;
    case 2:
      checkboxButton.checked = true;
      renderAnswers();
      break;
    default:
      textButton.checked = true;
      renderAnswers();
      buttonContainer.style.display = 'none';
      break;
  }

  radioButton.addEventListener('click', () => {
    checkboxButton.checked = false;
    textButton.checked = false;
    type = 1;
    buttonContainer.style.display = 'flex';
    renderAnswers();
  });
  checkboxButton.addEventListener('click', () => {
    radioButton.checked = false;
    textButton.checked = false;
    type = 2;
    buttonContainer.style.display = 'flex';
    renderAnswers();
  });
  textButton.addEventListener('click', () => {
    checkboxButton.checked = false;
    radioButton.checked = false;
    type = 3;
    buttonContainer.style.display = 'none';
    renderAnswers();
  });

  const addButton = questionElement.querySelector('#add-answer-button');
  addButton.addEventListener('click', () => {
    answers.push({
      id: answers.length,
      text: 'новый ответ',
    });
    renderAnswers();
  });

  const clearButton = questionElement.querySelector('#clear-answers-button');
  clearButton.addEventListener('click', () => {
    answers.length = 0;
    answers.push({
      id: answers.length,
      text: 'новый ответ',
    });
    renderAnswers();
  });

  return questionElement;
}
