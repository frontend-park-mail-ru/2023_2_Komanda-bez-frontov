(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['profile'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <br>\n                <a id=\"profile-page-email\">Дата рождения: "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"user") : depth0)) != null ? lookupProperty(stack1,"birthday") : stack1), depth0))
    + "</a>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "                <a id=\"profile-page-email\">Пол: Мужской</a>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "                <a id=\"profile-page-email\">Пол: Женский</a>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=container.hooks.helperMissing, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"profile-background\"></div>\n<div class=\"profile\">\n    <div class=\"profile_main-container\">\n        <img class=\"profile_main-container__picture\" id=\"profile-page-picture\" src=\"../../../resources/images/profile_default.webp\" alt=\"\">\n        <div class=\"profile_main-container_name-container\">\n            <h3 id=\"profile-page-name\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"user") : depth0)) != null ? lookupProperty(stack1,"first_name") : stack1), depth0))
    + "</h3>\n            <div class=\"line\"></div>\n            <a id=\"profile-page-username\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"user") : depth0)) != null ? lookupProperty(stack1,"username") : stack1), depth0))
    + "</a><br>\n            <a id=\"profile-page-email\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"user") : depth0)) != null ? lookupProperty(stack1,"email") : stack1), depth0))
    + "</a>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,((stack1 = (depth0 != null ? lookupProperty(depth0,"user") : depth0)) != null ? lookupProperty(stack1,"birthday") : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":10,"column":12},"end":{"line":13,"column":19}}})) != null ? stack1 : "")
    + "            <br>\n"
    + ((stack1 = (lookupProperty(helpers,"ifEquals")||(depth0 && lookupProperty(depth0,"ifEquals"))||alias4).call(alias3,((stack1 = (depth0 != null ? lookupProperty(depth0,"user") : depth0)) != null ? lookupProperty(stack1,"gender") : stack1),"M",{"name":"ifEquals","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":15,"column":12},"end":{"line":17,"column":25}}})) != null ? stack1 : "")
    + ((stack1 = (lookupProperty(helpers,"ifEquals")||(depth0 && lookupProperty(depth0,"ifEquals"))||alias4).call(alias3,((stack1 = (depth0 != null ? lookupProperty(depth0,"user") : depth0)) != null ? lookupProperty(stack1,"gender") : stack1),"F",{"name":"ifEquals","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":18,"column":12},"end":{"line":20,"column":25}}})) != null ? stack1 : "")
    + "        </div>\n    </div>\n    <div class=\"profile_right-container\">\n        <h3> Профиль </h3>\n        <p> Здесь можно посмотреть и изменить информацию о вас </p>\n        <div class=\"button-container\">\n            <button class=\"secondary-button\" id=\"profile-settings-button\">Редактировать</button>\n            <button class=\"primary-button\" id=\"profile-forms-button\">Мои опросы</button>\n        </div>\n    </div>\n</div>\n";
},"useData":true});
})();