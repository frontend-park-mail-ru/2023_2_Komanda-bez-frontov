(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['check_form'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"check-form\">\n    <h3 class=\"check-form__title\" id=\"check-form-title\"></h3>\n    <div class=\"check-form__description\" id=\"check-form-description\">\n        <h3 class=\"check-form__description-title\">Описание опроса</h3>\n        <p class=\"check-form__description-text\" id=\"check-form__description-text\"></p>\n    </div>\n    <div class=\"check-form__questions-container\" id=\"check-form__questions-container\"></div>\n    <div class=\"button-container\">\n        <button class=\"secondary-button\" type=\"submit\" id=\"update-button\">Редактировать</button>\n    </div>\n</div>";
},"useData":true});
})();