(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['update_question'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"update-question\" id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"question") : depth0)) != null ? lookupProperty(stack1,"id") : stack1), depth0))
    + "\">\n        <div class=\"update-question__title-container\">\n            <h3 class=\"update-question__description-title\">Текст вопроса</h3>\n            <a class=\"update-question__question-delete\" id=\"delete-question\">❌</a>\n        </div>\n        <input class=\"update-question__title-input\" id=\"update-question__title\" placeholder=\"Новый вопрос\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"question") : depth0)) != null ? lookupProperty(stack1,"title") : stack1), depth0))
    + "\" maxlength=\"64\">\n        <textarea class=\"update-question__description-textarea\" id=\"update-question__description-textarea\" placeholder=\"Описание вопроса\" maxlength=\"512\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"question") : depth0)) != null ? lookupProperty(stack1,"description") : stack1), depth0))
    + "</textarea>\n        <h3 class=\"update-question__answer-title\">Формат ответа</h3>\n        <div class=\"update-question__answer-format\">\n            <input class=\"update-question__answer-format-radio\" id=\"update-question__answer-format-text\" type=\"radio\">\n            <label class=\"update-question__answer-format-label\" id=\"update-question__answer-format-text-label\">Текст</label>\n            <input class=\"update-question__answer-format-radio\" id=\"update-question__answer-format-radio\" type=\"radio\">\n            <label class=\"update-question__answer-format-label\" id=\"update-question__answer-format-radio-label\">Один вариант</label>\n            <input class=\"update-question__answer-format-radio\" id=\"update-question__answer-format-checkbox\" type=\"radio\">\n            <label class=\"update-question__answer-format-label\" id=\"update-question__answer-format-checkbox-label\">Несколько вариантов</label>\n        </div>\n        <div class=\"update-question__answer\" id=\"question-answers\">\n<!--            Answers will be here-->\n        </div>\n        <div class=\"update-question__button-container\">\n            <button class=\"primary-button\" type=\"submit\" id=\"add-answer-button\">Добавить ответ</button>\n            <button class=\"red-button\" type=\"submit\" id=\"clear-answers-button\">Очистить все</button>\n        </div>\n    </div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"question") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":26,"column":7}}})) != null ? stack1 : "");
},"useData":true});
})();