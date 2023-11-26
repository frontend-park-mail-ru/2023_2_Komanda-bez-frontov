(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['results_question'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=container.hooks.helperMissing, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"results-question\">\n        <div class=\"results-question_title-container\">\n            <h3 class=\"results-question__description-title\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"question") : depth0)) != null ? lookupProperty(stack1,"title") : stack1), depth0))
    + "</h3>\n            <p class=\"results-question__passage-text\">Количество ответов: &nbsp;"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"question") : depth0)) != null ? lookupProperty(stack1,"number_of_passages") : stack1), depth0))
    + "</p>\n        </div>\n"
    + ((stack1 = (lookupProperty(helpers,"ifEquals")||(depth0 && lookupProperty(depth0,"ifEquals"))||alias4).call(alias3,((stack1 = (depth0 != null ? lookupProperty(depth0,"question") : depth0)) != null ? lookupProperty(stack1,"required") : stack1),true,{"name":"ifEquals","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":7,"column":8},"end":{"line":9,"column":21}}})) != null ? stack1 : "")
    + "        <h3 class=\"results-question__answers-title\">Ответы</h3>\n        <div class=\"results-question_answers\" id=\"question-answers\">\n"
    + ((stack1 = (lookupProperty(helpers,"ifEquals")||(depth0 && lookupProperty(depth0,"ifEquals"))||alias4).call(alias3,((stack1 = (depth0 != null ? lookupProperty(depth0,"question") : depth0)) != null ? lookupProperty(stack1,"type") : stack1),1,{"name":"ifEquals","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":12,"column":12},"end":{"line":22,"column":25}}})) != null ? stack1 : "")
    + ((stack1 = (lookupProperty(helpers,"ifEquals")||(depth0 && lookupProperty(depth0,"ifEquals"))||alias4).call(alias3,((stack1 = (depth0 != null ? lookupProperty(depth0,"question") : depth0)) != null ? lookupProperty(stack1,"type") : stack1),2,{"name":"ifEquals","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":23,"column":12},"end":{"line":33,"column":25}}})) != null ? stack1 : "")
    + ((stack1 = (lookupProperty(helpers,"ifEquals")||(depth0 && lookupProperty(depth0,"ifEquals"))||alias4).call(alias3,((stack1 = (depth0 != null ? lookupProperty(depth0,"question") : depth0)) != null ? lookupProperty(stack1,"type") : stack1),3,{"name":"ifEquals","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":34,"column":12},"end":{"line":40,"column":25}}})) != null ? stack1 : "")
    + "        </div>\n    </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "            <p class=\"results-question__required-title\">Это обязательный вопрос</p>\n";
},"4":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depths[1] != null ? lookupProperty(depths[1],"question") : depths[1])) != null ? lookupProperty(stack1,"answers") : stack1),{"name":"each","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":13,"column":16},"end":{"line":21,"column":25}}})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    <div class=\"results-question_answers_answer-item\">\n                        <p class=\"results-question_answers_answer-item__label\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"text") || (depth0 != null ? lookupProperty(depth0,"text") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data,"loc":{"start":{"line":15,"column":79},"end":{"line":15,"column":87}}}) : helper)))
    + "</p>\n                        <div class=\"results-question_answers_answer-item__bar-container\">\n                            <div class=\"results-question_answers_answer-item__bar\"></div>\n                        </div>\n                        <p class=\"results-question_answers_answer-item__percentage\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"selected_times") || (depth0 != null ? lookupProperty(depth0,"selected_times") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"selected_times","hash":{},"data":data,"loc":{"start":{"line":19,"column":84},"end":{"line":19,"column":102}}}) : helper)))
    + "</p>\n                    </div>\n";
},"7":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depths[1] != null ? lookupProperty(depths[1],"question") : depths[1])) != null ? lookupProperty(stack1,"answers") : stack1),{"name":"each","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":35,"column":16},"end":{"line":39,"column":25}}})) != null ? stack1 : "");
},"8":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    <div class=\"results-question_answers_answer-item\">\n                        <p class=\"results-question_answers_answer-item__label\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"text") || (depth0 != null ? lookupProperty(depth0,"text") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"text","hash":{},"data":data,"loc":{"start":{"line":37,"column":79},"end":{"line":37,"column":87}}}) : helper)))
    + "</p>\n                    </div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"question") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":43,"column":7}}})) != null ? stack1 : "");
},"useData":true,"useDepths":true});
})();