(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['results_question'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"results-question\">\n        <div class=\"results-question_title-container\">\n            <h3 class=\"results-question__description-title\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"question") : depth0)) != null ? lookupProperty(stack1,"title") : stack1), depth0))
    + "</h3>\n"
    + ((stack1 = (lookupProperty(helpers,"ifEquals")||(depth0 && lookupProperty(depth0,"ifEquals"))||alias2).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"question") : depth0)) != null ? lookupProperty(stack1,"title") : stack1),"Статистика по участникам(Пол)",{"name":"ifEquals","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.program(4, data, 0, blockParams, depths),"data":data,"loc":{"start":{"line":5,"column":12},"end":{"line":11,"column":25}}})) != null ? stack1 : "")
    + "        </div>\n"
    + ((stack1 = (lookupProperty(helpers,"ifEquals")||(depth0 && lookupProperty(depth0,"ifEquals"))||alias2).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"question") : depth0)) != null ? lookupProperty(stack1,"required") : stack1),true,{"name":"ifEquals","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":13,"column":8},"end":{"line":15,"column":21}}})) != null ? stack1 : "")
    + ((stack1 = (lookupProperty(helpers,"ifEquals")||(depth0 && lookupProperty(depth0,"ifEquals"))||alias2).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"question") : depth0)) != null ? lookupProperty(stack1,"type") : stack1),3,{"name":"ifEquals","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":16,"column":8},"end":{"line":18,"column":21}}})) != null ? stack1 : "")
    + "        <div class=\"results-question_answers\" id=\"question-answers\">\n"
    + ((stack1 = (lookupProperty(helpers,"ifEquals")||(depth0 && lookupProperty(depth0,"ifEquals"))||alias2).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"question") : depth0)) != null ? lookupProperty(stack1,"type") : stack1),3,{"name":"ifEquals","hash":{},"fn":container.program(11, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":20,"column":12},"end":{"line":26,"column":25}}})) != null ? stack1 : "")
    + "        </div>\n    </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <p class=\"results-question__passage-text\">Количество участников: &nbsp;"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"question") : depth0)) != null ? lookupProperty(stack1,"number_of_passages") : stack1), depth0))
    + "</p>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = (lookupProperty(helpers,"ifEquals")||(depth0 && lookupProperty(depth0,"ifEquals"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? lookupProperty(depth0,"question") : depth0)) != null ? lookupProperty(stack1,"title") : stack1),"Статистика по участникам(Возраст)",{"name":"ifEquals","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(5, data, 0),"data":data,"loc":{"start":{"line":7,"column":12},"end":{"line":11,"column":12}}})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <p class=\"results-question__passage-text\">Количество ответов: &nbsp;"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"question") : depth0)) != null ? lookupProperty(stack1,"number_of_passages") : stack1), depth0))
    + "</p>\n            ";
},"7":function(container,depth0,helpers,partials,data) {
    return "            <p class=\"results-question__required-title\">Это обязательный вопрос</p>\n";
},"9":function(container,depth0,helpers,partials,data) {
    return "                <h3 class=\"results-question__answers-title\">Ответы</h3>\n";
},"11":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depths[1] != null ? lookupProperty(depths[1],"question") : depths[1])) != null ? lookupProperty(stack1,"answers") : stack1),{"name":"each","hash":{},"fn":container.program(12, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":21,"column":16},"end":{"line":25,"column":25}}})) != null ? stack1 : "");
},"12":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    <div class=\"results-question_answers_answer-item\">\n                        <p class=\"results-question_answers_answer-item__answer-text\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"text") || (depth0 != null ? lookupProperty(depth0,"text") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"text","hash":{},"data":data,"loc":{"start":{"line":23,"column":85},"end":{"line":23,"column":93}}}) : helper)))
    + "</p>\n                    </div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"question") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":29,"column":7}}})) != null ? stack1 : "");
},"useData":true,"useDepths":true});
})();