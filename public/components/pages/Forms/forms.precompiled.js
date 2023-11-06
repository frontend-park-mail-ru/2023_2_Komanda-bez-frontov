(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['forms'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"forms-list-container\">\n    <div class=\"title-container\">\n        <h3>Мои опросы</h3>\n        <div class=\"title-container-space\"></div>\n        <div class=\"list-button-container\">\n            <button class=\"primary-button\" id=\"forms-list-sort-button\">⇅</button>\n            <button class=\"secondary-button\" id=\"forms-list-add-button\">+</button>\n        </div>\n    </div>\n    <div class=\"main-container\" id=\"forms-container\">\n\n    </div>\n</div>";
},"useData":true});
})();