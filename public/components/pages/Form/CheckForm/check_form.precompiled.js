(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['check_form'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=container.hooks.helperMissing, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"check-form\">\n        <div class=\"check-form__description\" id=\"check-form-description\">\n            <h3 class=\"check-form__title\" id=\"check-form-title\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"form") : depth0)) != null ? lookupProperty(stack1,"title") : stack1), depth0))
    + "</h3>\n"
    + ((stack1 = (lookupProperty(helpers,"ifEquals")||(depth0 && lookupProperty(depth0,"ifEquals"))||alias4).call(alias3,((stack1 = (depth0 != null ? lookupProperty(depth0,"form") : depth0)) != null ? lookupProperty(stack1,"is_archived") : stack1),true,{"name":"ifEquals","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":5,"column":12},"end":{"line":10,"column":25}}})) != null ? stack1 : "")
    + "            "
    + ((stack1 = (lookupProperty(helpers,"ifEquals")||(depth0 && lookupProperty(depth0,"ifEquals"))||alias4).call(alias3,((stack1 = (depth0 != null ? lookupProperty(depth0,"form") : depth0)) != null ? lookupProperty(stack1,"is_archived") : stack1),false,{"name":"ifEquals","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":11,"column":12},"end":{"line":16,"column":32}}})) != null ? stack1 : "")
    + "\n            <p class=\"check-form__description-text\" id=\"check-form__description-text\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"form") : depth0)) != null ? lookupProperty(stack1,"description") : stack1), depth0))
    + "</p>\n            <div class=\"check-form__anonymous-warning-container\">\n"
    + ((stack1 = (lookupProperty(helpers,"ifEquals")||(depth0 && lookupProperty(depth0,"ifEquals"))||alias4).call(alias3,((stack1 = (depth0 != null ? lookupProperty(depth0,"form") : depth0)) != null ? lookupProperty(stack1,"anonymous") : stack1),true,{"name":"ifEquals","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":19,"column":16},"end":{"line":22,"column":29}}})) != null ? stack1 : "")
    + ((stack1 = (lookupProperty(helpers,"ifEquals")||(depth0 && lookupProperty(depth0,"ifEquals"))||alias4).call(alias3,((stack1 = (depth0 != null ? lookupProperty(depth0,"form") : depth0)) != null ? lookupProperty(stack1,"anonymous") : stack1),false,{"name":"ifEquals","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":23,"column":16},"end":{"line":26,"column":29}}})) != null ? stack1 : "")
    + "            </div>\n            <div class=\"check-form__max-passage-container\">\n                <span class=\"check-form__anonymous-warning-icon\">⚠️</span>\n                <p class=\"check-form__max-passage-error\">\n                    Для этого опроса задан лимит прохождений.<br>\n                    Осталось попыток:\n                    <span id=\"check-form-passages-left\"></span>\n                </p>\n            </div>\n        </div>\n        <div class=\"check-form__questions-container\" id=\"check-form__questions-container\"></div>\n        <div class=\"button-container\">\n            <button class=\"secondary-button\" type=\"submit\" id=\"update-submit-button\">Редактировать</button>\n            <button class=\"primary-button\" type=\"submit\" id=\"create-link-button\">\n                <span class=\"material-symbols-outlined\">share</span>\n                <label>Поделиться</label>\n            </button>\n            <button class=\"primary-button display-none\" type=\"submit\" id=\"form-chat-button\">Задать вопрос</button>\n        </div>\n    </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "                <p class=\"form__archive-warning\">\n                    <span class=\"material-symbols-outlined\">archive</span>\n                    Это архивированный опрос. Просмотр доступен только вам\n                </p>\n";
},"4":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depths[1] != null ? lookupProperty(depths[1],"form") : depths[1])) != null ? lookupProperty(stack1,"archive_when") : stack1),{"name":"if","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":11,"column":48},"end":{"line":16,"column":19}}})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data) {
    return "\n                <p class=\"form__archive-warning\">\n                    <span class=\"material-symbols-outlined\">archive</span>\n                    Этот опрос автоматически переместится в архив\n                </p>\n            ";
},"7":function(container,depth0,helpers,partials,data) {
    return "                    <span class=\"check-form__anonymous-warning-icon\">⚠️</span>\n                    <p class=\"check-form__anonymous-warning\">Это анонимный опрос. Ваше имя  не будет видно автору опроса.</p>\n";
},"9":function(container,depth0,helpers,partials,data) {
    return "                    <span class=\"check-form__anonymous-warning-icon\">⚠️</span>\n                    <p class=\"check-form__anonymous-error\">Прохождение этого опроса требует авторизации!</p>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"form") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":47,"column":7}}})) != null ? stack1 : "");
},"useData":true,"useDepths":true});
})();