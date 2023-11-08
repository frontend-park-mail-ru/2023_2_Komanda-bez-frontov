/**
 * Функция для рендеринга главной страницы с информацией о сервисе.
 *
 * @function
 * @return {void}
 */
export function renderMain() {
  const rootElement = document.querySelector('#root');
  rootElement.innerHTML = '';
  rootElement.innerHTML = Handlebars.templates.main();
}
