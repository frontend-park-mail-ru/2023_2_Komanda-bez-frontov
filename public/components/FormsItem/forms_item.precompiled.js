(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['forms_item'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"forms-list__item\" id=\"forms-list-item\">\n        <div class=\"forms-list_item__hat\"></div>\n        <div class=\"forms-list_item__content\">\n            <h3 class=\"forms-list_item__title\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"form") : depth0)) != null ? lookupProperty(stack1,"title") : stack1), depth0))
    + "</h3>\n            <p class=\"forms-list_item__description\">\n                Прохождений:  &nbsp;&nbsp;"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"form") : depth0)) != null ? lookupProperty(stack1,"number_of_passages") : stack1), depth0))
    + " <br>\n                Создан:  &nbsp;"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"form") : depth0)) != null ? lookupProperty(stack1,"created_at") : stack1), depth0))
    + "\n            </p>\n        </div>\n    </div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"form") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":12,"column":7}}})) != null ? stack1 : "");
},"useData":true});
})();