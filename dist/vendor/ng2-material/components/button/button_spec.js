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
    var defaultTemplate = "<button md-button type=\"button\" (click)=\"increment()\" [disabled]=\"isDisabled\">Go</button>";
    var TestComponent = (function () {
        function TestComponent() {
            this.clickCount = 0;
            this.isDisabled = false;
        }
        TestComponent.prototype.increment = function () {
            this.clickCount++;
        };
        TestComponent = __decorate([
            core_1.Component({
                selector: 'test-app',
                directives: [index_1.MdButton],
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
    testing_1.describe('MdButton', function () {
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
        testing_1.describe('button[md-button]', function () {
            testing_1.it('should handle a click on the button', testing_1.async(function () {
                return setup().then(function (fixture) {
                    var testComponent = fixture.debugElement.componentInstance;
                    var buttonDebugElement = fixture.debugElement.query(platform_browser_1.By.css('button'));
                    buttonDebugElement.nativeElement.click();
                    testing_1.expect(testComponent.clickCount).toBe(1);
                });
            }), 10000);
            testing_1.it('should ink ripple when clicked', testing_1.async(function () {
                return setup().then(function (fixture) {
                    var button = fixture.debugElement.children[0];
                    var save = index_1.Ink.rippleEvent;
                    var fired = false;
                    index_1.Ink.rippleEvent = function () {
                        fired = true;
                        return Promise.resolve();
                    };
                    var event = createEvent();
                    button.triggerEventHandler('mousedown', event);
                    testing_1.expect(fired).toBe(true);
                    index_1.Ink.rippleEvent = save;
                });
            }));
            testing_1.it('should not ink ripple with md-no-ink attribute', testing_1.async(testing_1.inject([], function () {
                var template = "<button md-button md-no-ink></button>";
                return setup(template).then(function (fixture) {
                    var button = fixture.debugElement.children[0];
                    var save = index_1.Ink.rippleEvent;
                    var fired = false;
                    index_1.Ink.rippleEvent = function () {
                        fired = true;
                        return Promise.resolve();
                    };
                    var event = createEvent();
                    button.triggerEventHandler('mousedown', event);
                    testing_1.expect(fired).toBe(false);
                    index_1.Ink.rippleEvent = save;
                });
            })));
            testing_1.it('should disable the button', testing_1.async(function () {
                return setup().then(function (fixture) {
                    var testAppComponent = fixture.debugElement.componentInstance;
                    var buttonDebugElement = fixture.debugElement.query(platform_browser_1.By.css('button'));
                    var buttonElement = buttonDebugElement.nativeElement;
                    testing_1.expect(buttonElement.disabled).toBe(false);
                    testAppComponent.isDisabled = true;
                    fixture.detectChanges();
                    testing_1.expect(buttonElement.disabled).toBe(true);
                    buttonElement.click();
                    testing_1.expect(testAppComponent.clickCount).toBe(0);
                });
            }), 10000);
        });
        testing_1.describe('a[md-button]', function () {
            var anchorTemplate = "<a md-button href=\"javascript:void(0);\" [disabled]=\"isDisabled\">Go</a>";
            testing_1.beforeEach(function () {
                builder = builder.overrideView(TestComponent, new core_1.ViewMetadata({ template: anchorTemplate, directives: [index_1.MdAnchor] }));
            });
            testing_1.it('should remove disabled anchors from tab order', testing_1.async(function () {
                return builder.createAsync(TestComponent).then(function (fixture) {
                    var testAppComponent = fixture.debugElement.componentInstance;
                    var anchorDebugElement = fixture.debugElement.query(platform_browser_1.By.css('a'));
                    var anchorElement = anchorDebugElement.nativeElement;
                    testing_1.expect(anchorElement.tabIndex).toBe(0);
                    testAppComponent.isDisabled = true;
                    fixture.detectChanges();
                    testing_1.expect(anchorElement.tabIndex).toBe(-1);
                });
            }), 10000);
            testing_1.it('should not preventDefault on enabled anchor clicks', testing_1.async(testing_1.inject([], function () {
                return builder.createAsync(TestComponent).then(function (fixture) {
                    var anchor = fixture.debugElement.children[0];
                    var event = createEvent();
                    var triggered = false;
                    event.preventDefault = function () { return triggered = true; };
                    anchor.triggerEventHandler('click', event);
                    testing_1.expect(triggered).toBe(false);
                });
            })));
            testing_1.it('should preventDefault for disabled anchor clicks', testing_1.async(testing_1.inject([], function () {
                return builder.createAsync(TestComponent).then(function (fixture) {
                    var anchor = fixture.debugElement.children[0];
                    var anchorComp = anchor.componentInstance;
                    var event = createEvent();
                    var triggered = false;
                    event.preventDefault = function () { return triggered = true; };
                    anchorComp.disabled = true;
                    anchor.triggerEventHandler('click', event);
                    testing_1.expect(triggered).toBe(true);
                    fixture.destroy();
                });
            })));
        });
    });
}
exports.main = main;
//# sourceMappingURL=button_spec.js.map