(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['navbar'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "            <span class=\"material-symbols-outlined\" id=\"navbar-mail-button\">mail</span>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <a class=\"navbar_profile__name\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"user") : depth0)) != null ? lookupProperty(stack1,"first_name") : stack1), depth0))
    + "</a>\n                <img class=\"navbar_profile__picture\" id=\"navbar-profile-picture\" src=\"../../resources/images/profile_default.png\" alt=\"\">\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "                <div class=\"navbar_button-container\">\n                    <button class=\"secondary-button\" id=\"navbar-login-button\">Войти</button>\n                    <button class=\"outline-button\" id=\"navbar-signup-button\">Регистрация</button>\n                </div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<nav class=\"navbar\">\n    <div class=\"navbar_logo\" id=\"navbar-logo\">\n        <img src=\"../../resources/images/icon.jpg\" alt=\"\">\n        <span class=\"material-symbols-outlined\">description</span>\n        <a id=\"navbar-logo-label\">\n            FormHub\n        </a>\n    </div>\n    <div>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"user") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":10,"column":8},"end":{"line":12,"column":15}}})) != null ? stack1 : "")
    + "        <div class=\"navbar_profile\" id=\"navbar-profile\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"user") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data,"loc":{"start":{"line":14,"column":12},"end":{"line":22,"column":19}}})) != null ? stack1 : "")
    + "        </div>\n    </div>\n\n</nav>\n";
},"useData":true});
})();