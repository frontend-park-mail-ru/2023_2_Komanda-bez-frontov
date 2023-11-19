(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['profileMenu'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"navbar-profile-menu\">\n    <button class=\"primary-button\" id=\"navbar-menu-profile-button\">Профиль</button>\n    <button class=\"primary-button\" id=\"navbar-menu-forms-button\">Мои опросы</button>\n<!--    <button class=\"primary-button\" id=\"navbar-menu-history-button\">История прохождения</button>-->\n<!--    <button class=\"primary-button\" id=\"navbar-menu-settings-button\">Настройки</button>-->\n    <div class=\"navbar-profile-menu-separator\"></div>\n    <button class=\"primary-button\" id=\"navbar-menu-logout-button\">Выйти</button>\n</div>\n\n";
},"useData":true});
})();