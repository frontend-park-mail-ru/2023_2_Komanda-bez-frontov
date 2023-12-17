import {TYPE_MULTIPLE_CHOICE, TYPE_SINGLE_CHOICE} from "../../pages/Form/CheckForm/check_form.js";

const colors = [
  '#337EFF', // Синий
  '#f13e26', // Красный
  '#FFCE33', // Желтый
  '#20d03d', // Зеленый
  '#8C33FF', // Фиолетовый
  '#33ffc2', // Бирюзовый
  '#FF33D1', // Розовый
  '#A8A9AC', // Серый
  '#a9ea52', // Светло-зеленый
  '#f57c19', // Оранжевый
  '#c45eec', // Лиловый
  '#a14c2f', // Коричневый
];
const colorEmpty = '#DDDDDD';

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

  const container = questionElement.querySelector('#question-answers');
  const renderHistogram = () => {
    container.innerHTML = Handlebars.templates.histogram({question});

    container.querySelector('#diagram-button').addEventListener('click', () => {
      renderDiagram();
    });

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
      if (question.number_of_passages === 0) {
        percentageLabel.innerHTML += ` (0%)`;
      } else {
        const percentage = question.answers[index].selected_times * 100 / question.number_of_passages;
        percentageLabel.innerHTML += ` (${Number.isInteger(percentage) ?
            percentage : percentage.toFixed(2)}%)`;
      }
    });
  };

  const renderDiagram = () => {
    container.innerHTML = Handlebars.templates.diagram({question});

    container.querySelector('#histogram-button').addEventListener('click', () => {
      renderHistogram();
    });

    const cAnswers = questionElement.querySelectorAll('.results-question_answers_answer-item');
    const canvas = questionElement.querySelector('.diagram__canvas');
    const ctx = canvas.getContext('2d');

    const x = canvas.width / 2;
    const y = canvas.height / 2;
    const radius = 90;
    let startAngle = 0;
    const selectedTimesAll = question.answers.reduce((acc, answer) => {
      return acc + answer.selected_times;
    }, 0);

    if (selectedTimesAll === 0) {
      const endAngle = Math.PI * 2;
      ctx.beginPath();
        ctx.arc(x, y, radius, startAngle, endAngle);
        ctx.fillStyle = colorEmpty;
        ctx.fill();
      ctx.closePath();
    } else {
      question.answers.forEach((answer, index) => {
        const endAngle = Math.PI * 2 * answer.selected_times / selectedTimesAll;

        ctx.beginPath();
          ctx.arc(x, y, radius, startAngle, startAngle + endAngle);
          ctx.lineTo(x, y);
          ctx.fillStyle = colors[index];
          ctx.fill();
        ctx.closePath();

        startAngle += endAngle;
      });
    }

    cAnswers.forEach((answerElement, index) => {
      const percentageLabel = answerElement.querySelector('.results-question_answers_answer-item__percentage');
      const answerColor = answerElement.querySelector('.results-question__answers-answer-item__color');

      if (question.number_of_passages === 0) {
        percentageLabel.innerHTML += ` (0%)`;
      } else {
        const percentage = question.answers[index].selected_times * 100 / question.number_of_passages;
        percentageLabel.innerHTML += ` (${Number.isInteger(percentage) ? 
            percentage : percentage.toFixed(2)}%)`;
      }

      answerColor.style.backgroundColor = colors[index];
    });
  };

  if (question.type === TYPE_SINGLE_CHOICE || question.type === TYPE_MULTIPLE_CHOICE) {
    renderHistogram();
  } else {
    if (question.number_of_passages === 0) {
      container.innerHTML = '<br> &nbsp;&nbsp;&nbsp;Ответов пока нет...';
      container.style.margin = '0 0 10px 0';
    }
  }

  return questionElement;
};
