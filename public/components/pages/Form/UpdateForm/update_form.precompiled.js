(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['update_form'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=container.hooks.helperMissing, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"update-form\">\n        <h3 class=\"update-form__title-label\" id=\"update-form-title\">Редактирование</h3>\n        <div class=\"update-form__title\">\n            <h3 class=\"update-form__title-title\">Название опроса</h3>\n            <p class=\"check-question__required-title display-none\" id=\"update-form-title-validation-error\">Текст должен состоять из русских или английских слов, цифр и знаков препинания</p>\n            <input class=\"update-form__title-input\" id=\"update-form__title\" placeholder=\"Заголовок опроса\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"form") : depth0)) != null ? lookupProperty(stack1,"title") : stack1), depth0))
    + "\" maxlength=\"64\">\n        </div>\n        <div class=\"update-form__description\">\n            <h3 class=\"update-form__description-title\">Описание опроса</h3>\n            <p class=\"check-question__required-title display-none\" id=\"update-form-description-validation-error\">Текст должен состоять из русских или английских слов, цифр и знаков препинания</p>\n            <textarea class=\"update-form__description-textarea\" id=\"update-form__description-textarea\" maxlength=\"512\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"form") : depth0)) != null ? lookupProperty(stack1,"description") : stack1), depth0))
    + "</textarea>\n        </div>\n        <div class=\"update-form_anonymous\">\n"
    + ((stack1 = (lookupProperty(helpers,"ifEquals")||(depth0 && lookupProperty(depth0,"ifEquals"))||alias4).call(alias3,((stack1 = (depth0 != null ? lookupProperty(depth0,"form") : depth0)) != null ? lookupProperty(stack1,"anonymous") : stack1),true,{"name":"ifEquals","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":15,"column":12},"end":{"line":17,"column":25}}})) != null ? stack1 : "")
    + ((stack1 = (lookupProperty(helpers,"ifEquals")||(depth0 && lookupProperty(depth0,"ifEquals"))||alias4).call(alias3,((stack1 = (depth0 != null ? lookupProperty(depth0,"form") : depth0)) != null ? lookupProperty(stack1,"anonymous") : stack1),false,{"name":"ifEquals","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":18,"column":12},"end":{"line":20,"column":25}}})) != null ? stack1 : "")
    + "            <label class=\"update-form_anonymous__checkbox-label\" for=\"update-form-anonymous-checkbox\">Анонимный опрос</label>\n            <p class=\"check-form__anonymous-warning\">⚠️ &nbsp;Включив анонимный опрос вы не сможете получать информацию о участниках опроса</p>\n        </div>\n        <div class=\"update-form__questions-container\" id=\"check-form__questions-container\"></div>\n        <div class=\"button-container\">\n            <button class=\"secondary-button\" type=\"submit\" id=\"update-button\">Cохранить</button>\n            <button class=\"primary-button\" type=\"submit\" id=\"add-button\">Добавить вопрос</button>\n            <button class=\"red-button\" type=\"submit\" id=\"delete-button\">Удалить опрос</button>\n        </div>\n    </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "                <input class=\"update-form_anonymous__checkbox\" id=\"update-form-anonymous-checkbox\" type=\"checkbox\" checked>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "                <input class=\"update-form_anonymous__checkbox\" id=\"update-form-anonymous-checkbox\" type=\"checkbox\">\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"form") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":31,"column":7}}})) != null ? stack1 : "");
},"useData":true});
})();