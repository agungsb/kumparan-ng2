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
var common_1 = require("@angular/common");
var platform_browser_1 = require("@angular/platform-browser");
function main() {
    var TestComponent = (function () {
        function TestComponent() {
            this.selectedIndex = 2;
        }
        TestComponent = __decorate([
            core_1.Component({
                selector: 'test-app',
                directives: [common_1.CORE_DIRECTIVES, index_1.MdTabs, index_1.MdTab],
                template: "\n    <md-tabs>\n      <template md-tab label=\"Tab1\"><span>Tab1</span></template>\n      <template md-tab label=\"Tab2\"><span>Tab2</span></template>\n      <template md-tab label=\"Tab3\"><span>Tab3</span></template>\n    </md-tabs>"
            }), 
            __metadata('design:paramtypes', [])
        ], TestComponent);
        return TestComponent;
    }());
    testing_1.describe('Tabs', function () {
        var builder;
        function setup(template) {
            if (template === void 0) { template = null; }
            var prep = template === null ?
                builder.createAsync(TestComponent) :
                builder.overrideTemplate(TestComponent, template).createAsync(TestComponent);
            return prep.then(function (fixture) {
                fixture.detectChanges();
                var tabs = fixture.debugElement.query(platform_browser_1.By.css('md-tabs')).componentInstance;
                var tabButtons = fixture.debugElement.queryAll(platform_browser_1.By.css('md-tab-item')).map(function (b) { return b.nativeElement; });
                return {
                    fixture: fixture,
                    tabs: tabs,
                    tabButtons: tabButtons
                };
            }).catch(console.error.bind(console));
        }
        testing_1.beforeEach(testing_1.inject([testing_2.TestComponentBuilder], function (tcb) {
            builder = tcb;
        }));
        testing_1.describe('md-tabs', function () {
            testing_1.it('should initialize with first tab selected', testing_1.async(testing_1.inject([], function () {
                return setup().then(function (api) {
                    testing_1.expect(api.tabs.selected).toBe(0);
                    testing_1.expect(api.tabs.selectedTab).toBe(null);
                });
            })));
            testing_1.it('should update selected and selectedTab when changed by clicking on tab buttons', testing_1.async(testing_1.inject([], function () {
                return setup().then(function (api) {
                    api.tabButtons[1].click();
                    testing_1.expect(api.tabs.selected).toBe(1);
                    testing_1.expect(api.tabs.selectedTab).not.toBeNull();
                    api.tabButtons[0].click();
                    testing_1.expect(api.tabs.selected).toBe(0);
                    testing_1.expect(api.tabs.selectedTab).not.toBeNull();
                });
            })));
            testing_1.it('should update selectedTab when selected is set', testing_1.async(testing_1.inject([], function () {
                return setup().then(function (api) {
                    testing_1.expect(api.tabs.selectedTab).toBeNull();
                    api.tabs.selected = 1;
                    testing_1.expect(api.tabs.selectedTab).not.toBeNull();
                    api.tabs.selected = 0;
                    testing_1.expect(api.tabs.selectedTab).not.toBeNull();
                    api.tabs.selected = -1;
                    testing_1.expect(api.tabs.selectedTab).toBeNull();
                });
            })));
            testing_1.it('should bind [selected] to an index', testing_1.async(testing_1.inject([], function () {
                var template = "\n          <md-tabs [selected]=\"selectedIndex\">\n            <template md-tab label=\"Tab1\"><span>Tab1</span></template>\n            <template md-tab label=\"Tab2\"><span>Tab2</span></template>\n            <template md-tab label=\"Tab3\"><span>Tab3</span></template>\n          </md-tabs>";
                return setup(template).then(function (api) {
                    testing_1.expect(api.tabs.selected).toBe(2);
                });
            })));
            testing_1.it('md-tabs should ripple when tab buttons are clicked', testing_1.async(testing_1.inject([], function () {
                var template = "\n          <md-tabs [selected]=\"selectedIndex\">\n            <template md-tab label=\"Tab1\"><span>Tab1</span></template>\n          </md-tabs>";
                return setup(template).then(function (api) {
                    var save = index_1.Ink.rippleEvent;
                    var fired = false;
                    index_1.Ink.rippleEvent = function () {
                        fired = true;
                        return Promise.resolve();
                    };
                    api.tabButtons[0].click();
                    testing_1.expect(fired).toBe(true);
                    index_1.Ink.rippleEvent = save;
                });
            })));
            testing_1.it('md-tabs[md-no-ink] should not ripple when tab buttons are clicked', testing_1.async(testing_1.inject([], function () {
                var template = "\n          <md-tabs md-no-ink [selected]=\"selectedIndex\">\n            <template md-tab label=\"Tab1\"><span>Tab1</span></template>\n          </md-tabs>";
                return setup(template).then(function (api) {
                    var save = index_1.Ink.rippleEvent;
                    var fired = false;
                    index_1.Ink.rippleEvent = function () {
                        fired = true;
                        return Promise.resolve();
                    };
                    api.tabButtons[0].click();
                    testing_1.expect(fired).toBe(false);
                    index_1.Ink.rippleEvent = save;
                });
            })));
        });
    });
}
exports.main = main;
//# sourceMappingURL=tabs_spec.js.map