(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['update_question'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=container.hooks.helperMissing, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"update-question\" id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"question") : depth0)) != null ? lookupProperty(stack1,"id") : stack1), depth0))
    + "\">\n        <div class=\"update-question__title-container\">\n            <input class=\"update-question__title-input\" id=\"update-question__title\" placeholder=\"Вопрос\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"question") : depth0)) != null ? lookupProperty(stack1,"title") : stack1), depth0))
    + "\" maxlength=\"64\">\n            <div class=\"update-question__select\">\n                <select id=\"standard-select\">\n                    <option class=\"update-question__answer-format-radio\" id=\"update-question__answer-format-text-label\">Один вариант\n                    </option>\n                    <option class=\"update-question__answer-format-radio\" id=\"update-question__answer-format-text-label\">Несколько вариантов\n                    </option>\n                    <option class=\"update-question__answer-format-radio\" id=\"update-question__answer-format-text-label\">Текст (aбзац)\n                    </option>\n                </select>\n                <span class=\"update-question__select_custom-arrow material-symbols-outlined\">expand_more</span>\n            </div>\n        </div>\n        <textarea class=\"update-question__description-textarea\" id=\"update-question__description-textarea\" placeholder=\"Описание вопроса\" maxlength=\"512\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"question") : depth0)) != null ? lookupProperty(stack1,"description") : stack1), depth0))
    + "</textarea>\n        <div class=\"update-question__answer\" id=\"question-answers\">\n<!--            Answers will be here-->\n        </div>\n        <div class=\"update-question__answers_add_button\" id=\"update-question__answers_add_button\">\n            <input class=\"update-question__answers-item-checkbox\" id=\"update-question__answers-item-button\" type=\"checkbox\" disabled></input>\n            <input class=\"update-question__answers-add-input\" placeholder=\"Добавить ответ\" type=\"text\"></input>\n        </div>\n        <div class=\"update-question__button-container\">\n            <span class=\"material-symbols-outlined update-question__question-delete\" id=\"delete-question\">delete</span>\n            <div class=\"update-question__required-container\">\n"
    + ((stack1 = (lookupProperty(helpers,"ifEquals")||(depth0 && lookupProperty(depth0,"ifEquals"))||alias4).call(alias3,((stack1 = (depth0 != null ? lookupProperty(depth0,"question") : depth0)) != null ? lookupProperty(stack1,"required") : stack1),true,{"name":"ifEquals","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":28,"column":16},"end":{"line":30,"column":29}}})) != null ? stack1 : "")
    + ((stack1 = (lookupProperty(helpers,"ifEquals")||(depth0 && lookupProperty(depth0,"ifEquals"))||alias4).call(alias3,((stack1 = (depth0 != null ? lookupProperty(depth0,"question") : depth0)) != null ? lookupProperty(stack1,"required") : stack1),false,{"name":"ifEquals","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":31,"column":16},"end":{"line":33,"column":29}}})) != null ? stack1 : "")
    + "                <label class=\"update-question_button-container__required-label\" for=\"required-question-checkbox\">Обязательный вопрос</label>\n            </div>\n        </div>\n    </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "                    <input class=\"update-question_button-container__required-checkbox\" id=\"required-question-checkbox\" type=\"checkbox\" checked>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "                    <input class=\"update-question_button-container__required-checkbox\" id=\"required-question-checkbox\" type=\"checkbox\">\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"question") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":38,"column":7}}})) != null ? stack1 : "");
},"useData":true});
})();