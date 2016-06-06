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
var MdList = (function () {
    function MdList() {
    }
    MdList = __decorate([
        core_1.Directive({
            selector: 'md-list',
            host: {
                'role': 'list'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], MdList);
    return MdList;
}());
exports.MdList = MdList;
var MdListItem = (function () {
    function MdListItem() {
    }
    MdListItem = __decorate([
        core_1.Component({
            selector: 'md-list-item',
            host: {
                'role': 'listitem',
            },
            template: "\n    <div class=\"md-no-style md-list-item-inner\">\n      <ng-content></ng-content>\n    </div>"
        }), 
        __metadata('design:paramtypes', [])
    ], MdListItem);
    return MdListItem;
}());
exports.MdListItem = MdListItem;
//# sourceMappingURL=list.js.map