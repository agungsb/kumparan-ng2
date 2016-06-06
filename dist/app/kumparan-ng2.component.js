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
var core_1 = require('@angular/core');
// import { MdButton } from '@angular2-material/button';
var ng2_material_1 = require('ng2-material');
var toolbar_1 = require('@angular2-material/toolbar');
var checkbox_1 = require('@angular2-material/checkbox');
var input_1 = require('@angular2-material/input');
var fotosrc_1 = require('./fotosrc');
var angular2_indexeddb_1 = require('./angular2-indexeddb');
var KumparanNg2AppComponent = (function () {
    function KumparanNg2AppComponent() {
        this.fotosrc = fotosrc_1.fotosrc;
        this.selected = [];
        this.foundIndex = [];
        this.keyword = "";
        this.employeesData = [];
        this.dbName = "company_db";
        this.objectStoreName = "employees";
    }
    KumparanNg2AppComponent.prototype.ngOnInit = function () {
        this.init();
    };
    KumparanNg2AppComponent.prototype.init = function () {
        var _this = this;
        var _self = this;
        this.db = new angular2_indexeddb_1.AngularIndexedDB(this.dbName, 1);
        this.db.createStore(1, function (event) {
            console.log(event);
            if (event.oldVersion > 0 && event.newVersion > event.oldVersion) {
                _this.db.clear(_self.objectStoreName).then(function () {
                    console.log('cleared and recreated');
                    _this.createRecords(event);
                });
            }
            else {
                console.log('created');
                _this.createRecords(event);
            }
        }).then(function () {
            // console.log(this.db);
            _this.readAllRecords();
        });
    };
    KumparanNg2AppComponent.prototype.resetForm = function () {
        this.keyword = "";
        this.ssn = "";
        this.nama = "";
        this.email = "";
        this.dialog.close();
    };
    KumparanNg2AppComponent.prototype.createRecords = function (event) {
        var objectStore = event.target.result.createObjectStore(this.objectStoreName, { keyPath: "id", autoIncrement: false });
        objectStore.createIndex("ssn", "ssn", { unique: true });
        objectStore.createIndex("nama", "nama", { unique: false });
        objectStore.createIndex("email", "email", { unique: true });
        objectStore.createIndex("foto", "foto", { unique: false });
    };
    KumparanNg2AppComponent.prototype.readAllRecords = function () {
        var _this = this;
        this.db.openCursor(this.objectStoreName, function (evt) {
            var cursor = evt.target.result;
            if (cursor) {
                _this.employeesData.push({ "id": cursor.key, "ssn": cursor.value.ssn, "nama": cursor.value.nama, "email": cursor.value.email, "foto": cursor.value.foto });
                cursor.continue();
            }
        });
    };
    KumparanNg2AppComponent.prototype.addRecord = function () {
        var _this = this;
        var lastId = 0;
        if (this.employeesData.length > 0) {
            lastId = this.employeesData[this.employeesData.length - 1].id;
        }
        var nextId = lastId + 1;
        var employee = {
            "id": nextId,
            "ssn": this.ssn,
            "nama": this.nama,
            "email": this.email,
            "foto": this.fotosrc
        };
        // console.log(employee);
        this.db.add(this.objectStoreName, employee).then(function () {
            // Do something after the value was added
            _this.employeesData.push(employee);
            _this.resetForm();
        }, function (error) {
            console.log(error);
        });
    };
    KumparanNg2AppComponent.prototype.deleteRecord = function () {
        var _this = this;
        var _self = this;
        this.selected.sort(function (a, b) {
            return b - a;
        });
        this.selected.forEach(function (sel) {
            _this.db.delete(_this.objectStoreName, sel).then(function () {
                // Do something after remove
                var loc = _this.employeesData.map(function (d) { return d['id']; }).indexOf(sel);
                _this.employeesData.splice(loc, 1);
            }, function (error) {
                console.log(error);
            });
        });
        this.selected = [];
        this.keyword = "";
    };
    KumparanNg2AppComponent.prototype.change = function (index) {
        if (this.selected.indexOf(this.employeesData[index].id) == -1) {
            this.selected.push(this.employeesData[index].id);
        }
        else {
            var loc = this.selected.map(function (d) { return d; }).indexOf(this.employeesData[index].id);
            this.selected.splice(loc, 1);
        }
        this.count = this.selected.length;
    };
    KumparanNg2AppComponent.prototype.search = function (event) {
        event.stopPropagation();
        this.keyword = event.target.value;
        this.searchResult = 'hide';
        this.foundIndex = [];
        if (this.keyword.length > 0) {
            var x = this.filterData(event.target.value);
            for (var i in x) {
                var loc = this.employeesData.map(function (d) { return d['id']; }).indexOf(x[i].id);
                this.foundIndex.push(loc);
            }
        }
        else {
            this.foundIndex = [];
        }
    };
    KumparanNg2AppComponent.prototype.filterData = function (keyword) {
        var regex = new RegExp(keyword, 'i');
        var filtered = this.employeesData.filter(function (obj) {
            return obj.nama.search(regex) > -1;
        });
        return filtered;
    };
    KumparanNg2AppComponent.prototype.isMatched = function (i) {
        var result = false;
        if (this.keyword.length > 0) {
            result = this.foundIndex.indexOf(i) > -1;
        }
        else {
            result = true;
        }
        return result;
    };
    __decorate([
        core_1.ViewChild('custom'), 
        __metadata('design:type', Object)
    ], KumparanNg2AppComponent.prototype, "dialog", void 0);
    KumparanNg2AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'kumparan-ng2-app',
            templateUrl: 'kumparan-ng2.component.html',
            directives: [ng2_material_1.MATERIAL_DIRECTIVES, toolbar_1.MD_TOOLBAR_DIRECTIVES, checkbox_1.MdCheckbox, input_1.MdInput],
            providers: [ng2_material_1.MATERIAL_PROVIDERS],
            styleUrls: ['kumparan-ng2.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], KumparanNg2AppComponent);
    return KumparanNg2AppComponent;
}());
exports.KumparanNg2AppComponent = KumparanNg2AppComponent;
//# sourceMappingURL=kumparan-ng2.component.js.map