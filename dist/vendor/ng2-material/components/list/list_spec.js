"use strict";
var util_1 = require("../../platform/testing/util");
function main() {
    var template = "\n    <md-list>\n      <md-list-item class=\"md-2-line\">\n        <img/>\n        <div class=\"md-list-item-text\">\n          <h3>Title</h3>\n          <p>Secondary text</p>\n        </div>\n      </md-list-item>\n    </md-list>\n  ";
    util_1.componentSanityCheck('List', 'md-list', template);
    util_1.componentSanityCheck('List Item', 'md-list-item', template);
}
exports.main = main;
//# sourceMappingURL=list_spec.js.map