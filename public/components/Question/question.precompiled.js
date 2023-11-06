(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['question'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"question-container\">\n    <div class=\"question-text\" id=\"question-text\">\n        <h3>Текст вопроса</h3>\n    </div>\n    <div class=\"question-answer\" id=\"question-answer\"></div>\n</div>";
},"useData":true});
})();