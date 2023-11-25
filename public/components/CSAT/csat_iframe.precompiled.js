(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['csat_iframe'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div>\n    <iframe class=\"csat_iframe\" src=\"./components/CSAT/csat.html\" width=\"500\" height=\"200\">\n        Ваш браузер не поддерживает плавающие фреймы!\n    </iframe>\n</div>\n\n";
},"useData":true});
})();