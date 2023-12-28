(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['chat'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"chat\">\n        <div class=\"chat__background\"></div>\n        <div class=\"chat__header\">\n            <span class=\"material-symbols-outlined\" id=\"chat-back-button\">arrow_back</span>\n            <h3>"
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"chat") : depth0)) != null ? lookupProperty(stack1,"user") : stack1)) != null ? lookupProperty(stack1,"first_name") : stack1), depth0))
    + "</h3>\n"
    + ((stack1 = (lookupProperty(helpers,"ifEquals")||(depth0 && lookupProperty(depth0,"ifEquals"))||alias2).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"chat") : depth0)) != null ? lookupProperty(stack1,"avatar_check") : stack1),true,{"name":"ifEquals","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":7,"column":12},"end":{"line":9,"column":25}}})) != null ? stack1 : "")
    + ((stack1 = (lookupProperty(helpers,"ifEquals")||(depth0 && lookupProperty(depth0,"ifEquals"))||alias2).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"chat") : depth0)) != null ? lookupProperty(stack1,"avatar_check") : stack1),false,{"name":"ifEquals","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":10,"column":12},"end":{"line":12,"column":25}}})) != null ? stack1 : "")
    + "        </div>\n        <div class=\"chat__messages-container\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"chat") : depth0)) != null ? lookupProperty(stack1,"messages") : stack1),{"name":"each","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":15,"column":12},"end":{"line":36,"column":21}}})) != null ? stack1 : "")
    + "        </div>\n        <div class=\"chat__send-form\">\n            <input class=\"chat_send-form__input\" id=\"chat-send-input\" placeholder=\"Сообщение\" maxlength=\"256\">\n            <span class=\"material-symbols-outlined\" id=\"chat-send-button\">send</span>\n        </div>\n    </div>\n";
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <img class=\"chat_header__picture\" id=\"chat-item-picture\" src=\"data:image/png;base64, "
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depths[1] != null ? lookupProperty(depths[1],"chat") : depths[1])) != null ? lookupProperty(stack1,"user") : stack1)) != null ? lookupProperty(stack1,"avatar") : stack1), depth0))
    + "\" alt=\"\">\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "                <img class=\"chat_header__picture\" id=\"chat-item-picture\" src=\"../../../resources/images/profile_default.webp\" alt=\"\">\n";
},"6":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, alias4="function", lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <div class=\"chat_message-item\">\n"
    + ((stack1 = (lookupProperty(helpers,"ifEquals")||(depth0 && lookupProperty(depth0,"ifEquals"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"avatar_check") : depth0),true,{"name":"ifEquals","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":17,"column":20},"end":{"line":19,"column":33}}})) != null ? stack1 : "")
    + ((stack1 = (lookupProperty(helpers,"ifEquals")||(depth0 && lookupProperty(depth0,"ifEquals"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"avatar_check") : depth0),false,{"name":"ifEquals","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":20,"column":20},"end":{"line":22,"column":33}}})) != null ? stack1 : "")
    + "                    <div class=\"chat_message-item__container\">\n                        <h3>"
    + alias3(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"author") : depth0)) != null ? lookupProperty(stack1,"first_name") : stack1), depth0))
    + ", &nbsp;&nbsp;&nbsp;"
    + alias3(((helper = (helper = lookupProperty(helpers,"send_at") || (depth0 != null ? lookupProperty(depth0,"send_at") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"send_at","hash":{},"data":data,"loc":{"start":{"line":24,"column":69},"end":{"line":24,"column":80}}}) : helper)))
    + "</h3>\n                        <p>"
    + alias3(((helper = (helper = lookupProperty(helpers,"text") || (depth0 != null ? lookupProperty(depth0,"text") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"text","hash":{},"data":data,"loc":{"start":{"line":25,"column":27},"end":{"line":25,"column":35}}}) : helper)))
    + "</p>\n                    </div>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"sent_message") : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":27,"column":20},"end":{"line":34,"column":27}}})) != null ? stack1 : "")
    + "                </div>\n";
},"7":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                        <img class=\"chat_message-item__picture\" id=\"chat-item-picture\" src=\"data:image/png;base64, "
    + container.escapeExpression(container.lambda(((stack1 = (depths[1] != null ? lookupProperty(depths[1],"author") : depths[1])) != null ? lookupProperty(stack1,"avatar") : stack1), depth0))
    + "\" alt=\"\">\n";
},"9":function(container,depth0,helpers,partials,data) {
    return "                        <img class=\"chat_message-item__picture\" id=\"chat-item-picture\" src=\"../../../resources/images/profile_default.webp\" alt=\"\">\n";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = (lookupProperty(helpers,"ifEquals")||(depth0 && lookupProperty(depth0,"ifEquals"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"is_read") : depth0),true,{"name":"ifEquals","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":28,"column":24},"end":{"line":30,"column":37}}})) != null ? stack1 : "")
    + ((stack1 = (lookupProperty(helpers,"ifEquals")||(depth0 && lookupProperty(depth0,"ifEquals"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"is_read") : depth0),false,{"name":"ifEquals","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":31,"column":24},"end":{"line":33,"column":37}}})) != null ? stack1 : "");
},"12":function(container,depth0,helpers,partials,data) {
    return "                            <span class=\"material-symbols-outlined\">done_all</span>\n";
},"14":function(container,depth0,helpers,partials,data) {
    return "                            <span class=\"material-symbols-outlined\">done</span>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"chat") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":43,"column":7}}})) != null ? stack1 : "");
},"useData":true,"useDepths":true});
})();