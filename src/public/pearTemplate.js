(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['pear'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<article class=\"pear\">\r\n    \r\n    <a class=\"pear-image-container\" href=\"/pear/"
    + ((stack1 = ((helper = (helper = helpers.PID || (depth0 != null ? depth0.PID : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"PID","hash":{},"data":data,"loc":{"start":{"line":3,"column":48},"end":{"line":3,"column":57}}}) : helper))) != null ? stack1 : "")
    + "\">\r\n        <img class=\"pear-image\" src=\""
    + alias4(((helper = (helper = helpers.Image || (depth0 != null ? depth0.Image : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Image","hash":{},"data":data,"loc":{"start":{"line":4,"column":37},"end":{"line":4,"column":46}}}) : helper)))
    + "\" title=\""
    + alias4(((helper = (helper = helpers.Description || (depth0 != null ? depth0.Description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Description","hash":{},"data":data,"loc":{"start":{"line":4,"column":55},"end":{"line":4,"column":70}}}) : helper)))
    + "\">\r\n    </a>\r\n    <div class=\"pear-content\">       \r\n            <p class=\"pear-title\">\r\n                "
    + alias4(((helper = (helper = helpers.Title || (depth0 != null ? depth0.Title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Title","hash":{},"data":data,"loc":{"start":{"line":8,"column":16},"end":{"line":8,"column":25}}}) : helper)))
    + "\r\n            </p>\r\n            <p class=\"pear-poster\">\r\n                <a href=\"/user/"
    + alias4(((helper = (helper = helpers.Username || (depth0 != null ? depth0.Username : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Username","hash":{},"data":data,"loc":{"start":{"line":11,"column":31},"end":{"line":11,"column":43}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.Username || (depth0 != null ? depth0.Username : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Username","hash":{},"data":data,"loc":{"start":{"line":11,"column":45},"end":{"line":11,"column":57}}}) : helper)))
    + "</a>\r\n            </p>\r\n            <p class=\"pear-rating\">\r\n                "
    + alias4(((helper = (helper = helpers.Average || (depth0 != null ? depth0.Average : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Average","hash":{},"data":data,"loc":{"start":{"line":14,"column":16},"end":{"line":14,"column":27}}}) : helper)))
    + "\r\n            </p>\r\n    </div> \r\n    \r\n</article>\r\n";
},"useData":true});
})();