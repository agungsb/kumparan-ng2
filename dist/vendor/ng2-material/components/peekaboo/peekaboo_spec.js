"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/compiler/testing");
var core_1 = require("@angular/core");
var index_1 = require("../../index");
var platform_browser_1 = require("@angular/platform-browser");
function main() {
    var TestComponent = (function () {
        function TestComponent() {
            this.hideBinding = 'hide';
            this.showBinding = 'show';
            this.sizeBinding = 50;
        }
        TestComponent = __decorate([
            core_1.Component({
                selector: 'test-app',
                directives: [index_1.MdPeekaboo],
                template: "<div md-peekaboo></div>"
            }), 
            __metadata('design:paramtypes', [])
        ], TestComponent);
        return TestComponent;
    }());
    testing_1.describe('Peekaboo', function () {
        var builder;
        function setup(template) {
            if (template === void 0) { template = null; }
            var prep = template === null ?
                builder.createAsync(TestComponent) :
                builder.overrideTemplate(TestComponent, template).createAsync(TestComponent);
            return prep.then(function (fixture) {
                fixture.detectChanges();
                var debug = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MdPeekaboo));
                var component = debug.injector.get(index_1.MdPeekaboo);
                return {
                    fixture: fixture,
                    peek: component,
                    debug: debug
                };
            }).catch(console.error.bind(console));
        }
        testing_1.beforeEach(testing_1.inject([testing_2.TestComponentBuilder], function (tcb) {
            builder = tcb;
        }));
        testing_1.describe('[md-peekaboo]', function () {
            testing_1.it('should be inactive by default', testing_1.async(testing_1.inject([], function () {
                return setup().then(function (api) {
                    testing_1.expect(api.peek.active).toBe(false);
                    api.fixture.destroy();
                });
            })));
            testing_1.describe('breakAction', function () {
                testing_1.it('should be undefined by default', testing_1.async(testing_1.inject([], function () {
                    return setup().then(function (api) {
                        testing_1.expect(api.peek.breakAction).toBeUndefined();
                    });
                })));
                testing_1.it('should be set by attribute', testing_1.async(testing_1.inject([], function () {
                    return setup("<div md-peekaboo breakAction=\"show\"></div>").then(function (api) {
                        testing_1.expect(api.peek.breakAction).toBe('show');
                    });
                })));
                testing_1.it('should be set by binding', testing_1.async(testing_1.inject([], function () {
                    return setup("<div md-peekaboo [breakAction]=\"hideBinding\"></div>").then(function (api) {
                        testing_1.expect(api.peek.breakAction).toBe('hide');
                    });
                })));
            });
            ['breakXs', 'breakSm', 'breakMd', 'breakLg', 'breakXl'].forEach(function (size) {
                testing_1.describe(size, function () {
                    testing_1.it('should be -1 by default', testing_1.async(testing_1.inject([], function () {
                        return setup().then(function (api) {
                            testing_1.expect(api.peek[size]).toBe(-1);
                        });
                    })));
                    testing_1.it('should be set by attribute', testing_1.async(testing_1.inject([], function () {
                        return setup("<div md-peekaboo " + size + "=\"25\"></div>").then(function (api) {
                            testing_1.expect(api.peek[size]).toBe(25);
                        });
                    })));
                    testing_1.it('should be set by binding', testing_1.async(testing_1.inject([], function () {
                        return setup("<div md-peekaboo [" + size + "]=\"sizeBinding\"></div>").then(function (api) {
                            testing_1.expect(api.peek[size]).toBe(50);
                        });
                    })));
                    testing_1.it('should work with all breakpoint sizes', testing_1.async(testing_1.inject([], function () {
                        return setup("<div md-peekaboo [" + size + "]=\"sizeBinding\"></div>").then(function (api) {
                            index_1.MdPeekaboo.SIZES.forEach(function (s) {
                                api.peek.breakpoint = s;
                            });
                        });
                    })));
                });
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=peekaboo_spec.js.map