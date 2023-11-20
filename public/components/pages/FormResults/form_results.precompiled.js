(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['form_results'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=container.hooks.helperMissing, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"form-results\">\n        <h3 class=\"form-results__title\">Результаты опроса<br>"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"form") : depth0)) != null ? lookupProperty(stack1,"title") : stack1), depth0))
    + "</h3>\n        <div class=\"form-results__description\">\n            <h3 class=\"form-results__description-title\">Описание опроса</h3>\n            <p class=\"form-results__description-text\">\n                Дата создания: &nbsp;&nbsp;&nbsp;"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"form") : depth0)) != null ? lookupProperty(stack1,"created_at") : stack1), depth0))
    + "<br>\n                Количесто прохождений: &nbsp;&nbsp;&nbsp;"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"form") : depth0)) != null ? lookupProperty(stack1,"number_of_passages") : stack1), depth0))
    + "<br>\n"
    + ((stack1 = (lookupProperty(helpers,"ifEquals")||(depth0 && lookupProperty(depth0,"ifEquals"))||alias4).call(alias3,((stack1 = (depth0 != null ? lookupProperty(depth0,"form") : depth0)) != null ? lookupProperty(stack1,"anonymous") : stack1),true,{"name":"ifEquals","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":9,"column":12},"end":{"line":11,"column":25}}})) != null ? stack1 : "")
    + ((stack1 = (lookupProperty(helpers,"ifEquals")||(depth0 && lookupProperty(depth0,"ifEquals"))||alias4).call(alias3,((stack1 = (depth0 != null ? lookupProperty(depth0,"form") : depth0)) != null ? lookupProperty(stack1,"anonymous") : stack1),false,{"name":"ifEquals","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":12,"column":12},"end":{"line":14,"column":25}}})) != null ? stack1 : "")
    + "            </p>\n        </div>\n        <div class=\"check-form__questions-container\" id=\"check-form__questions-container\"></div>\n        <div class=\"button-container\">\n            <button class=\"secondary-button\" type=\"submit\" id=\"results-export-button\">Экспорт данных</button>\n        </div>\n    </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "                Это анонимный опрос. Участники скрыты.\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "                Участники:\n";
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