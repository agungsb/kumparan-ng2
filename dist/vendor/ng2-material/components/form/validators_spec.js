"use strict";
var testing_1 = require("@angular/core/testing");
var common_1 = require("@angular/common");
var index_1 = require("../../index");
function main() {
    testing_1.describe("Validators", function () {
        testing_1.describe("MdPatternValidator", function () {
            testing_1.it("should not error when pattern is found", function () {
                var v = index_1.MdPatternValidator.inline('[a-z]+');
                testing_1.expect(v(new common_1.Control("abcd"))).toEqual(null);
            });
            testing_1.it("should error when pattern is not found", function () {
                var v = index_1.MdPatternValidator.inline('[a-z]+');
                testing_1.expect(v(new common_1.Control("1234"))).toEqual({ mdPattern: true });
            });
            testing_1.it("should error when pattern is not found", function () {
                var v = index_1.MdPatternValidator.inline('[a-z]+');
                testing_1.expect(v(new common_1.Control("1234"))).toEqual({ mdPattern: true });
            });
        });
        testing_1.describe("MdNumberRequiredValidator", function () {
            var v = index_1.MdNumberRequiredValidator.inline();
            testing_1.it("should not error when number is found", function () {
                testing_1.expect(v(new common_1.Control(2))).toEqual(null);
            });
            testing_1.it("should error when number is a string", function () {
                testing_1.expect(v(new common_1.Control("1234"))).toEqual({ mdNumberRequired: true });
            });
            testing_1.it("should error when given NaN", function () {
                testing_1.expect(v(new common_1.Control(NaN))).toEqual({ mdNumberRequired: true });
            });
            testing_1.it("should error when given nonsense values", function () {
                testing_1.expect(v(new common_1.Control(null))).toEqual({ mdNumberRequired: true });
                testing_1.expect(v(new common_1.Control(undefined))).toEqual({ mdNumberRequired: true });
                testing_1.expect(v(new common_1.Control('sunset'))).toEqual({ mdNumberRequired: true });
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=validators_spec.js.map