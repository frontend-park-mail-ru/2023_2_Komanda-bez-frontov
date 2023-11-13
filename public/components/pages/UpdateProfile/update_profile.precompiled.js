(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['update_profile'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"update-profile\">\n    <div class=\"update-profile_main-container\">\n        <div class=\"update-profile_main-container_img-container\">\n            <img class=\"update-profile_main-container__picture\" id=\"update-profile-page-picture\" src=\"../../../resources/images/profile_default.png\" alt=\"\">\n            <input class=\"signup-form_container_avatar__input\" type=\"file\" id=\"avatar\" name=\"avatar\" accept=\"image/png, image/jpeg, image/jpg\">\n                Загрузить\n            <a id=\"signup-avatar-cancel\">❌</a>\n        </div>\n        <div class=\"update-profile_main-container_name-container\">\n            <input class=\"update-form__title-input\" id=\"update-profile_name\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"User") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "\">\n            <input class=\"update-form__title-input\" id=\"update-profile_username\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"User") : depth0)) != null ? lookupProperty(stack1,"username") : stack1), depth0))
    + "\">\n            <input class=\"update-form__title-input\" id=\"update-profile_email\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"User") : depth0)) != null ? lookupProperty(stack1,"email") : stack1), depth0))
    + "\">\n            <input class=\"update-form__title-input\" id=\"update-profile_old-password\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"User") : depth0)) != null ? lookupProperty(stack1,"password") : stack1), depth0))
    + "\">\n            <input class=\"update-form__title-input\" id=\"update-profile_new-password\" value=\"Новый пароль\">\n            <input class=\"update-form__title-input\" id=\"update-profile_repeat-password\" value=\"Повторите пароль\">\n        </div>\n    </div>\n    <div class=\"update-profile_button-container\">\n        <button class=\"secondary-button\" id=\"update-profile-save-button\">Сохранить</button>\n<!--        <button class=\"primary-button\" id=\"profile-history-button\">История прохождения</button>-->\n    </div>\n</div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"profile-title\"><h3>Редактирование профиля</h3></div>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"User") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":0},"end":{"line":25,"column":7}}})) != null ? stack1 : "");
},"useData":true});
})();