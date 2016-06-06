"use strict";
var util_1 = require("../../platform/testing/util");
function main() {
    var template = "\n  <md-dialog>\n    <md-dialog-title>Title</md-dialog-title>\n    Content!\n  </md-dialog>";
    util_1.componentSanityCheck('Dialog', 'md-dialog', template);
}
exports.main = main;
//# sourceMappingURL=dialog_spec.js.map