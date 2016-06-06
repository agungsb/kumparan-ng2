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
var core_1 = require("@angular/core");
var key_codes_1 = require("../../core/key_codes");
var util_1 = require("../../core/util/util");
var MdSwitch = (function () {
    function MdSwitch() {
        this.checkedChange = new core_1.EventEmitter(false);
        this.checked = false;
        this.disabled_ = false;
    }
    Object.defineProperty(MdSwitch.prototype, "tabindex", {
        get: function () {
            return this._tabindex;
        },
        set: function (value) {
            this._tabindex = util_1.parseTabIndexAttribute(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSwitch.prototype, "disabled", {
        get: function () {
            return this.disabled_;
        },
        set: function (value) {
            this.disabled_ = typeof value !== 'undefined' && value !== false;
        },
        enumerable: true,
        configurable: true
    });
    MdSwitch.prototype.onKeydown = function (event) {
        if (event.keyCode === key_codes_1.KeyCodes.SPACE) {
            event.preventDefault();
            this.toggle(event);
        }
    };
    MdSwitch.prototype.toggle = function (event) {
        if (this.disabled) {
            event.stopPropagation();
            return;
        }
        this.checked = !this.checked;
        this.checkedChange.emit(this.checked);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], MdSwitch.prototype, "checkedChange", void 0);
    __decorate([
        core_1.Input(),
        core_1.HostBinding('attr.aria-checked'), 
        __metadata('design:type', Boolean)
    ], MdSwitch.prototype, "checked", void 0);
    __decorate([
        core_1.Input('disabled'),
        core_1.HostBinding('attr.aria-disabled'), 
        __metadata('design:type', Boolean)
    ], MdSwitch.prototype, "disabled_", void 0);
    __decorate([
        core_1.Input('tabindex'), 
        __metadata('design:type', Number)
    ], MdSwitch.prototype, "_tabindex", void 0);
    __decorate([
        core_1.HostListener('keydown', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [KeyboardEvent]), 
        __metadata('design:returntype', void 0)
    ], MdSwitch.prototype, "onKeydown", null);
    __decorate([
        core_1.HostListener('click', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], MdSwitch.prototype, "toggle", null);
    MdSwitch = __decorate([
        core_1.Component({
            selector: 'md-switch',
            inputs: ['checked', 'disabled'],
            host: {
                'role': 'checkbox'
            },
            template: "\n    <div class=\"md-switch-container\">\n      <div class=\"md-switch-bar\"></div>\n      <div class=\"md-switch-thumb-container\">\n        <div class=\"md-switch-thumb\"></div>\n      </div>\n    </div>\n    <div class=\"md-switch-label\">\n      <ng-content></ng-content>\n    </div>",
            directives: []
        }), 
        __metadata('design:paramtypes', [])
    ], MdSwitch);
    return MdSwitch;
}());
exports.MdSwitch = MdSwitch;
//# sourceMappingURL=switch.js.map