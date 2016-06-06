"use strict";
var util_1 = require("../../platform/testing/util");
function main() {
    var template = "\n  <md-card>\n    <md-card-title>Title</md-card-title>\n    Content!\n  </md-card>";
    util_1.componentSanityCheck('Card', 'md-card', template);
}
exports.main = main;
//# sourceMappingURL=card_spec.js.map