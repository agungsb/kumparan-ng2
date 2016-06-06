"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var compiler_1 = require("@angular/compiler");
var TestUrlResolver = (function (_super) {
    __extends(TestUrlResolver, _super);
    function TestUrlResolver() {
        _super.call(this);
    }
    TestUrlResolver.prototype.resolve = function (baseUrl, url) {
        return "/base/" + _super.prototype.resolve.call(this, baseUrl, url);
    };
    return TestUrlResolver;
}(compiler_1.UrlResolver));
exports.TestUrlResolver = TestUrlResolver;
//# sourceMappingURL=test_url_resolver.js.map