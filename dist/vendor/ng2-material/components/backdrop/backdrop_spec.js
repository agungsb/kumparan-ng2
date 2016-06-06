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
var util_1 = require("../../platform/testing/util");
function main() {
    var TestComponent = (function () {
        function TestComponent() {
        }
        TestComponent = __decorate([
            core_1.Component({
                selector: 'test-app',
                directives: [index_1.MdBackdrop],
                template: "<md-backdrop></md-backdrop>"
            }), 
            __metadata('design:paramtypes', [])
        ], TestComponent);
        return TestComponent;
    }());
    testing_1.describe('Backdrop', function () {
        var builder;
        function setup(show, transitionAddClass) {
            if (show === void 0) { show = false; }
            if (transitionAddClass === void 0) { transitionAddClass = true; }
            var result = null;
            return util_1.promiseWait()
                .then(function () { return builder.createAsync(TestComponent); })
                .then(function (fixture) {
                var debug = fixture.debugElement.query(platform_browser_1.By.css('md-backdrop'));
                var backdrop = debug.componentInstance;
                backdrop.transitionAddClass = transitionAddClass;
                fixture.detectChanges();
                result = {
                    fixture: fixture,
                    debug: debug,
                    backdrop: backdrop
                };
                if (show) {
                    return backdrop.show();
                }
            })
                .then(function () { return result; });
        }
        testing_1.beforeEach(testing_1.inject([testing_2.TestComponentBuilder], function (tcb) {
            builder = tcb;
        }));
        testing_1.describe('md-backdrop', function () {
            testing_1.describe('transitionClass', function () {
                testing_1.it('should be added to classList when shown', testing_1.async(testing_1.inject([], function () {
                    return setup(true).then(function (api) {
                        api.fixture.detectChanges();
                        var el = api.debug.nativeElement;
                        testing_1.expect(el.classList.contains(api.backdrop.transitionClass)).toBe(true);
                    });
                })));
                testing_1.it('should be removed from classList when hidden', testing_1.async(testing_1.inject([], function () {
                    return setup(true).then(function (api) {
                        return util_1.promiseWait().then(function () {
                            var el = api.debug.nativeElement;
                            testing_1.expect(el.classList.contains(api.backdrop.transitionClass)).toBe(true);
                            return api.backdrop
                                .hide()
                                .then(function () { return util_1.promiseWait(); })
                                .then(function () {
                                testing_1.expect(el.classList.contains(api.backdrop.transitionClass)).toBe(false);
                            });
                        });
                    });
                })));
            });
            testing_1.describe('transitionAddClass=false', function () {
                testing_1.it('should remove transitionClass when shown', testing_1.async(testing_1.inject([], function () {
                    return setup(false, false).then(function (api) {
                        var el = api.debug.nativeElement;
                        testing_1.expect(el.classList.contains(api.backdrop.transitionClass)).toBe(false);
                        el.classList.contains(api.backdrop.transitionClass);
                        return api.backdrop.show().then(function () {
                            testing_1.expect(el.classList.contains(api.backdrop.transitionClass)).toBe(false);
                        });
                    });
                })));
                testing_1.it('should add transitionClass when hidden', testing_1.async(testing_1.inject([], function () {
                    return setup(true, false).then(function (api) {
                        var el = api.debug.nativeElement;
                        testing_1.expect(el.classList.contains(api.backdrop.transitionClass)).toBe(false);
                        return api.backdrop.hide().then(function () {
                            testing_1.expect(el.classList.contains(api.backdrop.transitionClass)).toBe(true);
                        });
                    });
                })));
            });
            testing_1.describe('clickClose', function () {
                testing_1.it('should be hidden by a click when true', testing_1.async(testing_1.inject([], function () {
                    return setup(true).then(function (api) {
                        var triggered = false;
                        api.backdrop.clickClose = true;
                        api.backdrop.hide = function () {
                            triggered = true;
                            return Promise.resolve();
                        };
                        api.debug.nativeElement.click();
                        testing_1.expect(triggered).toBe(true);
                    });
                })));
                testing_1.it('should not be hidden when clickClose is false', testing_1.async(testing_1.inject([], function () {
                    return setup(true).then(function (api) {
                        var triggered = false;
                        api.backdrop.clickClose = false;
                        api.backdrop.hide = function () {
                            triggered = true;
                            return Promise.resolve();
                        };
                        api.debug.nativeElement.click();
                        testing_1.expect(triggered).toBe(false);
                    });
                })));
                testing_1.it('should not be clickable during transition animation', testing_1.async(testing_1.inject([], function () {
                    return setup().then(function (api) {
                        var triggered = false;
                        api.backdrop.clickClose = true;
                        api.backdrop.hide = function () {
                            triggered = true;
                            return Promise.resolve();
                        };
                        var promise = api.backdrop.show();
                        api.debug.nativeElement.click();
                        testing_1.expect(triggered).toBe(false);
                        return promise.then(function () {
                            testing_1.expect(triggered).toBe(false);
                            api.debug.nativeElement.click();
                            testing_1.expect(triggered).toBe(true);
                        });
                    });
                })));
            });
            testing_1.describe('show', function () {
                testing_1.it('emit events before and after being shown', testing_1.async(testing_1.inject([], function () {
                    return setup().then(function (api) {
                        var changes = [];
                        testing_1.expect(api.backdrop.visible).toBe(false);
                        api.backdrop.onShowing.subscribe(function () { return changes.push('showing'); });
                        api.backdrop.onShown.subscribe(function () { return changes.push('shown'); });
                        return api.backdrop
                            .show()
                            .then(function () { return util_1.promiseWait(); })
                            .then(function () {
                            testing_1.expect(changes.length).toBe(2);
                            testing_1.expect(changes[0]).toBe('showing');
                            testing_1.expect(changes[1]).toBe('shown');
                        });
                    });
                })));
                testing_1.it('does not emit events events if already shown', testing_1.async(testing_1.inject([], function () {
                    return setup(true).then(function (api) {
                        var changes = 0;
                        api.backdrop.onShowing.subscribe(function () { return changes++; });
                        api.backdrop.onShown.subscribe(function () { return changes++; });
                        return api.backdrop
                            .show()
                            .then(function () { return util_1.promiseWait(); })
                            .then(function () {
                            testing_1.expect(changes).toBe(0);
                        });
                    });
                })));
            });
            testing_1.describe('hide', function () {
                testing_1.it('hide emits events before and after being hidden', testing_1.async(testing_1.inject([], function () {
                    return setup(true).then(function (api) {
                        var changes = [];
                        api.backdrop.onHiding.subscribe(function () { return changes.push('hiding'); });
                        api.backdrop.onHidden.subscribe(function () { return changes.push('hidden'); });
                        return api.backdrop
                            .hide()
                            .then(function () { return util_1.promiseWait(); })
                            .then(function () {
                            testing_1.expect(changes.length).toBe(2);
                            testing_1.expect(changes[0]).toBe('hiding');
                            testing_1.expect(changes[1]).toBe('hidden');
                        });
                    });
                })));
                testing_1.it('does not emit events events if already hidden', testing_1.async(testing_1.inject([], function () {
                    return setup().then(function (api) {
                        var changes = 0;
                        testing_1.expect(api.backdrop.visible).toBe(false);
                        api.backdrop.onHiding.subscribe(function () { return changes++; });
                        api.backdrop.onHidden.subscribe(function () { return changes++; });
                        return api.backdrop
                            .hide()
                            .then(function () { return util_1.promiseWait(); })
                            .then(function () {
                            testing_1.expect(changes).toBe(0);
                        });
                    });
                })));
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=backdrop_spec.js.map