(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['chat_item'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.lambda, alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"chat-item\" id=\"chat-item\">\n"
    + ((stack1 = (lookupProperty(helpers,"ifEquals")||(depth0 && lookupProperty(depth0,"ifEquals"))||alias2).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"chat") : depth0)) != null ? lookupProperty(stack1,"avatar_check") : stack1),true,{"name":"ifEquals","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":3,"column":8},"end":{"line":5,"column":21}}})) != null ? stack1 : "")
    + ((stack1 = (lookupProperty(helpers,"ifEquals")||(depth0 && lookupProperty(depth0,"ifEquals"))||alias2).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"chat") : depth0)) != null ? lookupProperty(stack1,"avatar_check") : stack1),false,{"name":"ifEquals","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":8},"end":{"line":8,"column":21}}})) != null ? stack1 : "")
    + "        <div class=\"chat-item__container\">\n            <h3>"
    + alias4(alias3(((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"chat") : depth0)) != null ? lookupProperty(stack1,"user") : stack1)) != null ? lookupProperty(stack1,"first_name") : stack1), depth0))
    + ", &nbsp;&nbsp;&nbsp;"
    + alias4(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"chat") : depth0)) != null ? lookupProperty(stack1,"time") : stack1), depth0))
    + "</h3>\n            <p>"
    + alias4(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"chat") : depth0)) != null ? lookupProperty(stack1,"last_message") : stack1), depth0))
    + "</p>\n        </div>\n"
    + ((stack1 = (lookupProperty(helpers,"ifEquals")||(depth0 && lookupProperty(depth0,"ifEquals"))||alias2).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"chat") : depth0)) != null ? lookupProperty(stack1,"unread") : stack1),true,{"name":"ifEquals","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":13,"column":8},"end":{"line":15,"column":21}}})) != null ? stack1 : "")
    + "    </div>\n";
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <img class=\"chat-item__picture\" id=\"chat-item-picture\" src=\"data:image/png;base64, "
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depths[1] != null ? lookupProperty(depths[1],"chat") : depths[1])) != null ? lookupProperty(stack1,"user") : stack1)) != null ? lookupProperty(stack1,"avatar") : stack1), depth0))
    + "\" alt=\"\">\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "            <img class=\"chat-item__picture\" id=\"chat-item-picture\" src=\"../../resources/images/profile_default.png\" alt=\"\">\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "            <div class=\"chat-item__unread-mark\"></div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"chat") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":17,"column":7}}})) != null ? stack1 : "");
},"useData":true,"useDepths":true});
})();