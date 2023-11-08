(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['update_question'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"update-question\">\n        <h3 class=\"update-question__description-title\">Текст вопроса</h3>\n        <textarea class=\"update-question__description-textarea\" id=\"update-question__description-textarea\"></textarea>\n        <div class=\"update-question__answer\" id=\"question-answer\">\n            <h3 class=\"update-question__answer-title\">Формат ответа</h3>\n"
    + ((stack1 = (lookupProperty(helpers,"ifEquals")||(depth0 && lookupProperty(depth0,"ifEquals"))||alias2).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"question") : depth0)) != null ? lookupProperty(stack1,"type") : stack1),"multiple_choice",{"name":"ifEquals","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":7,"column":12},"end":{"line":28,"column":25}}})) != null ? stack1 : "")
    + ((stack1 = (lookupProperty(helpers,"ifEquals")||(depth0 && lookupProperty(depth0,"ifEquals"))||alias2).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"question") : depth0)) != null ? lookupProperty(stack1,"type") : stack1),"single_choice",{"name":"ifEquals","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":29,"column":12},"end":{"line":50,"column":25}}})) != null ? stack1 : "")
    + ((stack1 = (lookupProperty(helpers,"ifEquals")||(depth0 && lookupProperty(depth0,"ifEquals"))||alias2).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"question") : depth0)) != null ? lookupProperty(stack1,"type") : stack1),"no_choice",{"name":"ifEquals","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":51,"column":12},"end":{"line":60,"column":25}}})) != null ? stack1 : "")
    + "        </div>\n    </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <div class=\"update-question__answer-format\">\n                    <input class=\"update-question__answer-format-radio\" id=\"update-question__answer-format-text\" type=\"radio\">\n                    <label class=\"update-question__answer-format-label\" for=\"update-question__answer-format-text\">Текст</label>\n                    <input class=\"update-question__answer-format-radio\" id=\"update-question__answer-format-radio\" type=\"radio\">\n                    <label class=\"update-question__answer-format-label\" for=\"update-question__answer-format-radio\">Один вариант</label>\n                    <input class=\"update-question__answer-format-radio\" id=\"update-question__answer-format-checkbox\" type=\"radio\" checked>\n                    <label class=\"update-question__answer-format-label\" for=\"update-question__answer-format-checkbox\">Несколько вариантов</label>\n                </div>\n                <div class=\"update-question__answers\">\n                    <h3 class=\"update-question__answers-title\">Ответы</h3>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? lookupProperty(depth0,"question") : depth0)) != null ? lookupProperty(stack1,"answers") : stack1),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":18,"column":20},"end":{"line":23,"column":29}}})) != null ? stack1 : "")
    + "                </div>\n                <div class=\"button-container\">\n                    <button class=\"primary-button\" type=\"submit\" id=\"add-button-"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"question") : depth0)) != null ? lookupProperty(stack1,"title") : stack1), depth0))
    + "\">Добавить ответ</button>\n                </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                        <div class=\"update-question__answers-item\">\n                            <input class=\"update-question__answers-item-checkbox\" id=\"update-question__answers-item-checkbox\" type=\"checkbox\"></input>\n                            <input class=\"update-question__answers-item-input\" type=\"text\" value=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"text") || (depth0 != null ? lookupProperty(depth0,"text") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"text","hash":{},"data":data,"loc":{"start":{"line":21,"column":98},"end":{"line":21,"column":106}}}) : helper)))
    + "\"></input>\n                        </div>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <div class=\"update-question__answer-format\">\n                    <input class=\"update-question__answer-format-radio\" id=\"update-question__answer-format-text\" type=\"radio\">\n                    <label class=\"update-question__answer-format-label\" for=\"update-question__answer-format-text\">Текст</label>\n                    <input class=\"update-question__answer-format-radio\" id=\"update-question__answer-format-radio\" type=\"radio\" checked>\n                    <label class=\"update-question__answer-format-label\" for=\"update-question__answer-format-radio\">Один вариант</label>\n                    <input class=\"update-question__answer-format-radio\" id=\"update-question__answer-format-checkbox\" type=\"radio\">\n                    <label class=\"update-question__answer-format-label\" for=\"update-question__answer-format-checkbox\">Несколько вариантов</label>\n                </div>\n                <div class=\"update-question__answers\">\n                    <h3 class=\"update-question__answers-title\">Ответы</h3>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? lookupProperty(depth0,"question") : depth0)) != null ? lookupProperty(stack1,"answers") : stack1),{"name":"each","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":40,"column":20},"end":{"line":45,"column":29}}})) != null ? stack1 : "")
    + "                </div>\n                <div class=\"button-container\">\n                    <button class=\"primary-button\" type=\"submit\" id=\"add-button-"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"question") : depth0)) != null ? lookupProperty(stack1,"title") : stack1), depth0))
    + "\">Добавить ответ</button>\n                </div>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                        <div class=\"update-question__answers-item\">\n                            <input class=\"update-question__answers-item-radio\" id=\"update-question__answers-item-radio\" type=\"radio\"></input>\n                            <input class=\"update-question__answers-item-input\" type=\"text\" value=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"text") || (depth0 != null ? lookupProperty(depth0,"text") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"text","hash":{},"data":data,"loc":{"start":{"line":43,"column":98},"end":{"line":43,"column":106}}}) : helper)))
    + "\"></input>\n                        </div>\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "                <div class=\"update-question__answer-format\">\n                    <input class=\"update-question__answer-format-radio\" id=\"update-question__answer-format-text\" type=\"radio\" checked>\n                    <label class=\"update-question__answer-format-label\" for=\"update-question__answer-format-text\">Текст</label>\n                    <input class=\"update-question__answer-format-radio\" id=\"update-question__answer-format-radio\" type=\"radio\">\n                    <label class=\"update-question__answer-format-label\" for=\"update-question__answer-format-radio\">Один вариант</label>\n                    <input class=\"update-question__answer-format-radio\" id=\"update-question__answer-format-checkbox\" type=\"radio\">\n                    <label class=\"update-question__answer-format-label\" for=\"update-question__answer-format-checkbox\">Несколько вариантов</label>\n                </div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"question") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":63,"column":7}}})) != null ? stack1 : "");
},"useData":true});
})();