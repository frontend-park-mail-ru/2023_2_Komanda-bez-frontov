(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['navbar'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <a class=\"profile_name\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"user") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "</a>\n        <button class=\"primary-button\" id=\"navbar-logout-button\">Выйти</button>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "        <div class=\"button-container-navbar\">\n            <button class=\"black-button\" id=\"navbar-login-button\">Войти</button>\n            <button class=\"primary-button\" id=\"navbar-signup-button\">Регистрация</button>\n        </div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<nav class=\"navbar\">\n    <div class=\"logo\">\n        <a  id=\"navbar-logo-label\">FormHub</a>\n    </div>\n    <div class=\"profile\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"user") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":6,"column":4},"end":{"line":14,"column":11}}})) != null ? stack1 : "")
    + "    </div>\n</nav>\n";
},"useData":true});
})();