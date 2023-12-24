(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['profile'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"profile-background\"></div>\n<div class=\"profile\">\n    <div class=\"profile_main-container\">\n        <img class=\"profile_main-container__picture\" id=\"profile-page-picture\" src=\"../../../resources/images/profile_default.png\" alt=\"\">\n        <div class=\"profile_main-container_name-container\">\n            <h3 id=\"profile-page-name\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"user") : depth0)) != null ? lookupProperty(stack1,"first_name") : stack1), depth0))
    + "</h3>\n            <div class=\"line\"></div>\n            <a id=\"profile-page-username\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"user") : depth0)) != null ? lookupProperty(stack1,"username") : stack1), depth0))
    + "</a><br>\n            <a id=\"profile-page-email\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"user") : depth0)) != null ? lookupProperty(stack1,"email") : stack1), depth0))
    + "</a>\n        </div>\n    </div>\n    <div class=\"profile_right-container\">\n        <h3> Профиль </h3>\n        <p> Здесь можно посмотреть и изменить информацию о вас </p>\n        <div class=\"button-container\">\n            <button class=\"secondary-button\" id=\"profile-settings-button\">Редактировать</button>\n            <button class=\"primary-button\" id=\"profile-forms-button\">Мои опросы</button>\n        </div>\n    </div>\n\n</div>\n";
},"useData":true});
})();