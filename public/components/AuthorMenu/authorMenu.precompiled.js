(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['authorMenu'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"form-author-menu\">\n    <button class=\"primary-button\" id=\"author-menu-check-button\">Просмотр</button>\n    <button class=\"primary-button\" id=\"author-menu-update-button\">Редактировать</button>\n    <button class=\"primary-button\" id=\"author-menu-results-button\">Результаты</button>\n    <button class=\"primary-button\" id=\"author-menu-link-button\">Публичная ссылка</button>\n</div>\n\n";
},"useData":true});
})();