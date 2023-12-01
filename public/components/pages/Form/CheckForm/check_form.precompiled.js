(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['check_form'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=container.hooks.helperMissing, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"check-form\">\n        <h3 class=\"check-form__title\" id=\"check-form-title\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"form") : depth0)) != null ? lookupProperty(stack1,"title") : stack1), depth0))
    + "</h3>\n        <div class=\"check-form__description\" id=\"check-form-description\">\n            <h3 class=\"check-form__description-title\">Описание опроса</h3>\n            <p class=\"check-form__description-text\" id=\"check-form__description-text\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"form") : depth0)) != null ? lookupProperty(stack1,"description") : stack1), depth0))
    + "</p>\n        </div>\n        <div class=\"check-form__anonymous\">\n"
    + ((stack1 = (lookupProperty(helpers,"ifEquals")||(depth0 && lookupProperty(depth0,"ifEquals"))||alias4).call(alias3,((stack1 = (depth0 != null ? lookupProperty(depth0,"form") : depth0)) != null ? lookupProperty(stack1,"anonymous") : stack1),true,{"name":"ifEquals","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":9,"column":12},"end":{"line":11,"column":25}}})) != null ? stack1 : "")
    + ((stack1 = (lookupProperty(helpers,"ifEquals")||(depth0 && lookupProperty(depth0,"ifEquals"))||alias4).call(alias3,((stack1 = (depth0 != null ? lookupProperty(depth0,"form") : depth0)) != null ? lookupProperty(stack1,"anonymous") : stack1),false,{"name":"ifEquals","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":12,"column":12},"end":{"line":14,"column":25}}})) != null ? stack1 : "")
    + "        </div>\n        <div class=\"check-form__questions-container\" id=\"check-form__questions-container\"></div>\n        <div class=\"button-container\">\n            <button class=\"secondary-button\" type=\"submit\" id=\"update-submit-button\">Редактировать</button>\n            <button class=\"primary-button\" type=\"submit\" id=\"create-link-button\">Создать публичную ссылку</button>\n        </div>\n    </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "                <p class=\"check-form__anonymous-warning\">⚠️ &nbsp;Это анонимный опрос. Ваше имя  не будет видно автору опроса</p>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "                <p class=\"check-form__anonymous-error\">⚠️ &nbsp;Прохождение этого опроса требует авторизации!</p>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"form") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":22,"column":7}}})) != null ? stack1 : "");
},"useData":true});
})();