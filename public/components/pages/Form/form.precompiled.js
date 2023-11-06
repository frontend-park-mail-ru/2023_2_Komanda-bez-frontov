(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['form'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"form-wrapper\">\n    <h3 id=\"form-title\">Form title here</h3>\n    <div class=\"description\" id=\"description\">\n        <h3>Описание опроса</h3>\n    </div>\n    <div class=\"question-container\"></div>\n</div>";
},"useData":true});
})();