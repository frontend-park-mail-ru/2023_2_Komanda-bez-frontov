import {TYPE_MULTIPLE_CHOICE, TYPE_SINGLE_CHOICE} from "../../pages/Form/CheckForm/check_form.js";

/**
 * Функция для рендеринга результата одного вопроса.
 *
 * @function
 * @param {question} question - JSON с информацией о вопросе.
 * @return {HTMLDivElement} - HTML элемент вопроса.
 */
export const renderResultsQuestion = (question) => {
  const questionElement = document.createElement('div');

  questionElement.innerHTML = Handlebars.templates.results_question({question});

  if (question.type === TYPE_SINGLE_CHOICE || question.type === TYPE_MULTIPLE_CHOICE) {
    const max_selected_times = question.answers.reduce((accum, answer) => Math.max(accum, answer.selected_times), 0);

    const cAnswers = questionElement.querySelectorAll('.results-question_answers_answer-item');
    cAnswers.forEach((answerElement, index) => {
      const bar = answerElement.querySelector('.results-question_answers_answer-item__bar');
      const percentageLabel = answerElement.querySelector('.results-question_answers_answer-item__percentage');
      if (max_selected_times === 0) {
        bar.style.width = '1%';
      } else {
        const barWidth = question.answers[index].selected_times * 100 / max_selected_times;
        if (barWidth < 1) {
          bar.style.width = `1%`;
        } else {
          bar.style.width = `${barWidth}%`;
        }
      }
      const percentage = question.answers[index].selected_times * 100 / question.number_of_passages;
      percentageLabel.innerHTML += ` (${percentage}%)`;
    });
  } else {
    // TODO заменить на нормальный 0, когда будет апи
    if (question.number_of_passages === TYPE_SINGLE_CHOICE) {
      const answerContainer = questionElement.querySelector('#question-answers');
      answerContainer.innerHTML = '<br> &nbsp;&nbsp;&nbsp;Ответов пока нет...';
      answerContainer.style.margin = '0 0 10px 0';
    }
  }

  return questionElement;
};
