(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['pear'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<article class=\"pear\">\r\n    <div class=\"pear-content\">\r\n        <img class=\"pear-image\" src="
    + alias4(((helper = (helper = helpers.image || (depth0 != null ? depth0.image : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image","hash":{},"data":data,"loc":{"start":{"line":3,"column":36},"end":{"line":3,"column":45}}}) : helper)))
    + "></img>\r\n    </div>\r\n    <div class=\"pear-info\">\r\n        <p class=\"pear-title\">\r\n            "
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":7,"column":12},"end":{"line":7,"column":21}}}) : helper)))
    + "\r\n        </p>\r\n        <p class=\"pear-poster\">\r\n            <a href=\"#\">"
    + alias4(((helper = (helper = helpers.author || (depth0 != null ? depth0.author : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"author","hash":{},"data":data,"loc":{"start":{"line":10,"column":24},"end":{"line":10,"column":34}}}) : helper)))
    + "</a>\r\n        </p>\r\n        <p class=\"pear-rating\">\r\n            "
    + alias4(((helper = (helper = helpers.rating || (depth0 != null ? depth0.rating : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"rating","hash":{},"data":data,"loc":{"start":{"line":13,"column":12},"end":{"line":13,"column":22}}}) : helper)))
    + "\r\n        </p>\r\n    </div>\r\n</article>\r\n";
},"useData":true});
})();