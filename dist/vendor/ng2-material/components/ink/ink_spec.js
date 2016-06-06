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
var platform_browser_1 = require('@angular/platform-browser');
function main() {
    var defaultTemplate = "<div md-ink></div>";
    var TestComponent = (function () {
        function TestComponent() {
        }
        TestComponent = __decorate([
            core_1.Component({
                selector: 'test-app',
                directives: [index_1.MdInk],
                template: defaultTemplate
            }), 
            __metadata('design:paramtypes', [])
        ], TestComponent);
        return TestComponent;
    }());
    var createEvent = function () {
        var event = document.createEvent('MouseEvent');
        event.initEvent('mouse', true, true);
        return event;
    };
    testing_1.describe('MdInk', function () {
        var builder;
        function setup(template) {
            if (template === void 0) { template = defaultTemplate; }
            return builder
                .overrideTemplate(TestComponent, template)
                .createAsync(TestComponent)
                .then(function (fixture) {
                fixture.detectChanges();
                return fixture;
            }).catch(console.error.bind(console));
        }
        testing_1.beforeEach(testing_1.inject([testing_2.TestComponentBuilder], function (tcb) {
            builder = tcb;
        }));
        testing_1.describe('[md-ink]', function () {
            testing_1.it('should ink ripple when clicked', testing_1.async(testing_1.inject([], function () {
                setup().then(function (fixture) {
                    var element = fixture.debugElement.query(platform_browser_1.By.css('[md-ink]'));
                    var save = index_1.Ink.rippleEvent;
                    var fired = false;
                    index_1.Ink.rippleEvent = function () {
                        fired = true;
                        return Promise.resolve();
                    };
                    var event = createEvent();
                    element.triggerEventHandler('mousedown', event);
                    testing_1.expect(fired).toBe(true);
                    index_1.Ink.rippleEvent = save;
                });
            })));
            testing_1.it('should not ink ripple with md-no-ink attribute', testing_1.async(testing_1.inject([], function () {
                var template = "<div md-ink md-no-ink></div>";
                setup(template).then(function (fixture) {
                    var element = fixture.debugElement.query(platform_browser_1.By.css('[md-ink]'));
                    var save = index_1.Ink.rippleEvent;
                    var fired = false;
                    index_1.Ink.rippleEvent = function () {
                        fired = true;
                        return Promise.resolve();
                    };
                    var event = createEvent();
                    element.triggerEventHandler('mousedown', event);
                    testing_1.expect(fired).toBe(false);
                    index_1.Ink.rippleEvent = save;
                });
            })));
        });
    });
}
exports.main = main;
//# sourceMappingURL=ink_spec.js.map