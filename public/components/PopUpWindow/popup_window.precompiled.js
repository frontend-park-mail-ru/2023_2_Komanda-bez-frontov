(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['popup_window'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"popup_fade\"></div>\n<div class=\"popup\">\n    <div class=\"popup_window\">\n        <h3 class=\"popup_window_message\" id=\"popup-title\">Требуется подтверждение</h3>\n        <p id=\"popup-message\"></p>\n        <input class=\"display-none\" id=\"popup-copy-input\">\n        <div class=\"button-container\">\n            <button class=\"secondary-button\" type=\"submit\" id=\"popup-ok-button\">Продолжить</button>\n            <button class=\"primary-button\" type=\"submit\" id=\"popup-cancel-button\">Отмена</button>\n        </div>\n    </div>\n</div>\n";
},"useData":true});
})();