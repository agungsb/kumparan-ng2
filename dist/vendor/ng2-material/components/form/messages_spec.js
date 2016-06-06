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
var testing_1 = require('@angular/core/testing');
var testing_2 = require('@angular/compiler/testing');
var core_1 = require('@angular/core');
var index_1 = require('../../index');
var common_1 = require('@angular/common');
var platform_browser_1 = require('@angular/platform-browser');
var util_1 = require('../../platform/testing/util');
function main() {
    var TestComponent = (function () {
        function TestComponent() {
            this.name = 'MorTon';
        }
        TestComponent = __decorate([
            core_1.Component({
                selector: 'test-app',
                directives: [common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES, index_1.MdMessage, index_1.MdMessages],
                template: "\n    <form>\n      <input ngControl=\"name\" required #name=\"ngForm\"/>\n      <section [md-messages]=\"name\">\n        <div md-message=\"required\">required</div>\n      </section>\n    </form>"
            }), 
            __metadata('design:paramtypes', [])
        ], TestComponent);
        return TestComponent;
    }());
    testing_1.describe('Form Messages', function () {
        var builder;
        function setup(template) {
            if (template === void 0) { template = null; }
            var prep = template === null ?
                builder.createAsync(TestComponent) :
                builder.overrideTemplate(TestComponent, template).createAsync(TestComponent);
            return prep.then(function (fixture) {
                fixture.detectChanges();
                var container = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MdMessages)).injector.get(index_1.MdMessages);
                var messages = fixture.debugElement.queryAll(platform_browser_1.By.directive(index_1.MdMessage)).map(function (b) { return b.injector.get(index_1.MdMessage); });
                return {
                    fixture: fixture,
                    container: container,
                    messages: messages
                };
            });
        }
        testing_1.beforeEach(testing_1.inject([testing_2.TestComponentBuilder], function (tcb) {
            builder = tcb;
        }));
        testing_1.describe('md-messages', function () {
            testing_1.it('should error if used outside of an NgFormControl', testing_1.async(testing_1.inject([], function () {
                return setup("<div md-messages></div>").catch(function (err) {
                    testing_1.expect(err).toBeDefined();
                });
            })));
            testing_1.it('should initialize when given model and control group are present', testing_1.async(testing_1.inject([], function () {
                return setup().then(function (api) {
                    testing_1.expect(api.container.isTouched).toBe(false);
                    api.fixture.destroy();
                });
            })));
            testing_1.it('should bind local view references #ref="ngForm"', testing_1.async(testing_1.inject([], function () {
                return setup().then(function (api) {
                    testing_1.expect(api.container.isTouched).toBe(false);
                    testing_1.expect(api.messages.length).toBe(1);
                    testing_1.expect(api.container.form).not.toBeNull();
                    testing_1.expect(api.fixture.componentInstance.name).toBe('MorTon');
                });
            })));
            testing_1.it('should re-export valid from control or form', testing_1.async(testing_1.inject([], function () {
                return setup().then(function (api) {
                    return util_1.promiseWait().then(function () {
                        var ctrl = api.container.property.control;
                        testing_1.expect(ctrl.value).toBe(null);
                        testing_1.expect(api.container.valid).toBe(false);
                        testing_1.expect(api.container.valid).toBe(ctrl.valid);
                        ctrl.updateValue('MorTon', { emitEvent: true });
                        api.fixture.detectChanges();
                        testing_1.expect(api.container.valid).toBe(true);
                    });
                });
            })));
        });
    });
}
exports.main = main;
//# sourceMappingURL=messages_spec.js.map