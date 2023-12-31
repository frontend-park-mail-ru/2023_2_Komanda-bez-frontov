(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['check_question'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=container.hooks.helperMissing, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"check-question\">\n        <h3 class=\"check-question__description-title\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"question") : depth0)) != null ? lookupProperty(stack1,"title") : stack1), depth0))
    + "</h3>\n"
    + ((stack1 = (lookupProperty(helpers,"ifEquals")||(depth0 && lookupProperty(depth0,"ifEquals"))||alias4).call(alias3,((stack1 = (depth0 != null ? lookupProperty(depth0,"question") : depth0)) != null ? lookupProperty(stack1,"required") : stack1),true,{"name":"ifEquals","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":8},"end":{"line":6,"column":21}}})) != null ? stack1 : "")
    + "        <p class=\"check-question__description-text\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"question") : depth0)) != null ? lookupProperty(stack1,"description") : stack1), depth0))
    + "</p>\n        <div class=\"check-question__answer\" id=\"question-answer\">\n"
    + ((stack1 = (lookupProperty(helpers,"ifEquals")||(depth0 && lookupProperty(depth0,"ifEquals"))||alias4).call(alias3,((stack1 = (depth0 != null ? lookupProperty(depth0,"question") : depth0)) != null ? lookupProperty(stack1,"type") : stack1),1,{"name":"ifEquals","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":9,"column":12},"end":{"line":19,"column":25}}})) != null ? stack1 : "")
    + ((stack1 = (lookupProperty(helpers,"ifEquals")||(depth0 && lookupProperty(depth0,"ifEquals"))||alias4).call(alias3,((stack1 = (depth0 != null ? lookupProperty(depth0,"question") : depth0)) != null ? lookupProperty(stack1,"type") : stack1),2,{"name":"ifEquals","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":20,"column":12},"end":{"line":30,"column":25}}})) != null ? stack1 : "")
    + ((stack1 = (lookupProperty(helpers,"ifEquals")||(depth0 && lookupProperty(depth0,"ifEquals"))||alias4).call(alias3,((stack1 = (depth0 != null ? lookupProperty(depth0,"question") : depth0)) != null ? lookupProperty(stack1,"type") : stack1),3,{"name":"ifEquals","hash":{},"fn":container.program(10, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":31,"column":12},"end":{"line":37,"column":25}}})) != null ? stack1 : "")
    + "        </div>\n        <div class=\"button-container\">\n            <button class=\"primary-button\" id=\"check-question__clear-button\">Отменить выбор</button>\n        </div>\n    </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "            <p class=\"check-question__required-title\">Это обязательный вопрос</p>\n";
},"4":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <h3 class=\"check-question__answer-title\">Выберите один вариант из нижеперечисленных:</h3>\n                <div class=\"check-question__answers\" id=\"check-question_"
    + container.escapeExpression(container.lambda(((stack1 = (depths[1] != null ? lookupProperty(depths[1],"question") : depths[1])) != null ? lookupProperty(stack1,"id") : stack1), depth0))
    + "__answers\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depths[1] != null ? lookupProperty(depths[1],"question") : depths[1])) != null ? lookupProperty(stack1,"answers") : stack1),{"name":"each","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":12,"column":20},"end":{"line":17,"column":29}}})) != null ? stack1 : "")
    + "                </div>\n";
},"5":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=container.hooks.helperMissing, alias5="function", lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                        <div class=\"check-question__answer-item\">\n                            <input class=\"check-question__answer-item-radio\" id=\"check-question_"
    + alias2(alias1(((stack1 = (depths[2] != null ? lookupProperty(depths[2],"question") : depths[2])) != null ? lookupProperty(stack1,"id") : stack1), depth0))
    + "_answer-item_"
    + alias2(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":14,"column":130},"end":{"line":14,"column":136}}}) : helper)))
    + "\" type=\"radio\">\n                            <label class=\"check-question__answer-item-label\" for=\"check-question_"
    + alias2(alias1(((stack1 = (depths[2] != null ? lookupProperty(depths[2],"question") : depths[2])) != null ? lookupProperty(stack1,"id") : stack1), depth0))
    + "_answer-item_"
    + alias2(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":15,"column":131},"end":{"line":15,"column":137}}}) : helper)))
    + "\">"
    + alias2(((helper = (helper = lookupProperty(helpers,"text") || (depth0 != null ? lookupProperty(depth0,"text") : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"text","hash":{},"data":data,"loc":{"start":{"line":15,"column":139},"end":{"line":15,"column":147}}}) : helper)))
    + "</label>\n                        </div>\n";
},"7":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <h3 class=\"check-question__answer-title\">Выберите один или несколько вариантов из нижеперечисленных:</h3>\n                <div class=\"check-question__answers\" id=\"check-question_"
    + container.escapeExpression(container.lambda(((stack1 = (depths[1] != null ? lookupProperty(depths[1],"question") : depths[1])) != null ? lookupProperty(stack1,"id") : stack1), depth0))
    + "__answers\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depths[1] != null ? lookupProperty(depths[1],"question") : depths[1])) != null ? lookupProperty(stack1,"answers") : stack1),{"name":"each","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":23,"column":20},"end":{"line":28,"column":29}}})) != null ? stack1 : "")
    + "                </div>\n";
},"8":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=container.hooks.helperMissing, alias5="function", lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                        <div class=\"check-question__answer-item\">\n                            <input class=\"check-question__answer-item-checkbox\" id=\"check-question_"
    + alias2(alias1(((stack1 = (depths[2] != null ? lookupProperty(depths[2],"question") : depths[2])) != null ? lookupProperty(stack1,"id") : stack1), depth0))
    + "_answer-item_"
    + alias2(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":25,"column":133},"end":{"line":25,"column":139}}}) : helper)))
    + "\" type=\"checkbox\">\n                            <label class=\"check-question__answer-item-label\" for=\"check-question_"
    + alias2(alias1(((stack1 = (depths[2] != null ? lookupProperty(depths[2],"question") : depths[2])) != null ? lookupProperty(stack1,"id") : stack1), depth0))
    + "_answer-item-"
    + alias2(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":26,"column":131},"end":{"line":26,"column":137}}}) : helper)))
    + "\">"
    + alias2(((helper = (helper = lookupProperty(helpers,"text") || (depth0 != null ? lookupProperty(depth0,"text") : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"text","hash":{},"data":data,"loc":{"start":{"line":26,"column":139},"end":{"line":26,"column":147}}}) : helper)))
    + "</label>\n                        </div>\n";
},"10":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <h3 class=\"check-question__answer-title\">Дайте ответ в формате текста:</h3>\n                <p class=\"check-question__required-title display-none\" id=\"check-question-validation-error\">Текст должен состоять из русских или английских слов, цифр и знаков препинания</p>\n                <div class=\"check-question__answer-item\">\n                    <textarea class=\"check-question__answers-item-textarea\" id=\"check-question_"
    + container.escapeExpression(container.lambda(((stack1 = (depths[1] != null ? lookupProperty(depths[1],"question") : depths[1])) != null ? lookupProperty(stack1,"id") : stack1), depth0))
    + "_answers-item\" maxlength=\"512\"></textarea>\n                </div>\n";
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