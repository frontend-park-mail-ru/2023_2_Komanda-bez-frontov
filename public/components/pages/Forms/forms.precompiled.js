(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['forms'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"forms_list-container\">\n    <div class=\"forms_title-container\">\n        <h3>Мои опросы</h3>\n        <div class=\"forms_title-container__space\"></div>\n        <div class=\"forms_title-container_button-container\">\n            <button class=\"primary-button\" id=\"forms-list-sort-button\">⇅</button>\n            <button class=\"secondary-button\" id=\"forms-list-add-button\">+</button>\n        </div>\n    </div>\n    <div class=\"forms_list_main-container\" id=\"forms-container\">\n\n    </div>\n</div>";
},"useData":true});
})();