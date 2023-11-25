(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['csat_result'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return " <div class=\"form-results\">\n    <h3 class=\"form-results__title\">Результаты оценок</h3>\n    <div class=\"check-form__questions-container\" id=\"check-form__questions-container\">\n        <p>Количество оценок 1:</p><p id=\"rating_1\">0</p><br>\n        <p>Количество оценок 2:</p><p id=\"rating_2\">0</p><br>\n        <p>Количество оценок 3:</p><p id=\"rating_3\">0</p><br>\n        <p>Количество оценок 4:</p><p id=\"rating_4\">0</p><br>\n        <p>Количество оценок 5:</p><p id=\"rating_5\">0</p><br>\n    </div>\n</div>";
},"useData":true});
})();