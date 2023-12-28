(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['navbar'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <span class=\"material-symbols-outlined\" id=\"navbar-mail-button\">mail</span>\n        <a class=\"navbar_profile__name\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"user") : depth0)) != null ? lookupProperty(stack1,"first_name") : stack1), depth0))
    + "</a>\n        <img class=\"navbar_profile__picture\" id=\"navbar-profile-picture\" src=\"../../resources/images/profile_default.webp\" alt=\"\">\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "        <div class=\"navbar_button-container\">\n            <button class=\"secondary-button\" id=\"navbar-login-button\">Войти</button>\n            <button class=\"outline-button\" id=\"navbar-signup-button\">Регистрация</button>\n        </div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<nav class=\"navbar\">\n    <div class=\"navbar_logo\" id=\"navbar-logo\">\n        <span class=\"material-symbols-outlined\">description</span>\n        <a id=\"navbar-logo-label\">\n            FormHub\n        </a>\n    </div>\n    <div class=\"navbar_profile\" id=\"navbar-profile\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"user") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":9,"column":4},"end":{"line":18,"column":11}}})) != null ? stack1 : "")
    + "    </div>\n</nav>\n";
},"useData":true});
})();