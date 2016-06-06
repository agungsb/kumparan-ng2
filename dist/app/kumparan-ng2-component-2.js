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
        var _self = this;
        this.request = indexedDB.open(this.dbName, 1);
        this.request.onerror = function (event) {
            // Handle errors.
        };
        this.request.onsuccess = function (event) {
            _self.db = event.currentTarget.result;
            console.log(_self.db);
            console.log("DB Opened!");
            _self.readAllRecords();
        };
        this.request.onupgradeneeded = function (event) {
            _self.db = event.target.result;
            console.log(event);
            var objectStore;
            console.log(event.target.transaction);
            if (event.oldVersion > 0 && event.newVersion > event.oldVersion) {
                _self.db.deleteObjectStore(_self.objectStoreName);
            }
            // Create an objectStore to hold information about our employees. We're
            // going to use "ssn" as our key path because it's guaranteed to be
            // unique - or at least that's what I was told during the kickoff meeting.
            objectStore = _self.db.createObjectStore(_self.objectStoreName, { keyPath: "id", autoIncrement: true });
            // Create an index to search employees by name. We may have duplicates
            // so we can't use a unique index.
            objectStore.createIndex("ssn", "ssn", { unique: true });
            // Create an index to search employees by name. We may have duplicates
            // so we can't use a unique index.
            objectStore.createIndex("nama", "nama", { unique: false });
            // Create an index to search employees by email. We want to ensure that
            // no two employees have the same email, so use a unique index.
            objectStore.createIndex("email", "email", { unique: true });
            // Create an index to display employees' image. We may have duplicates
            // so we can't use a unique index.
            objectStore.createIndex("foto", "foto", { unique: false });
            // Use transaction oncomplete to make sure the objectStore creation is 
            // finished before adding data into it.
            objectStore.transaction.oncomplete = function (event) {
                // console.log(event.target.result);
                // // Store values in the newly created objectStore.
            };
        };
    };
    KumparanNg2AppComponent.prototype.readAllRecords = function () {
        var _self = this;
        var transaction = this.db.transaction([this.objectStoreName], "readwrite");
        var objectStore = transaction.objectStore(this.objectStoreName);
        objectStore.openCursor().onsuccess = function (event) {
            console.log(event);
            var cursor = event.target.result;
            if (cursor) {
                console.log(cursor.key);
                _self.employeesData.push({ "id": cursor.key, "ssn": cursor.value.ssn, "nama": cursor.value.nama, "email": cursor.value.email, "foto": cursor.value.foto });
                cursor.continue();
            }
        };
    };
    KumparanNg2AppComponent.prototype.addRecord = function () {
        var _self = this;
        var transaction = this.db.transaction([this.objectStoreName], "readwrite");
        transaction.oncomplete = function (event) {
            // console.log(event);
        };
        transaction.onerror = function (event) {
            // console.log(event);
            alert(event.target.error.message);
        };
        var lastId = 0;
        if (this.employeesData.length > 0) {
            lastId = this.employeesData[this.employeesData.length - 1].id;
        }
        var nextId = lastId + 1;
        var objectStore = transaction.objectStore(this.objectStoreName);
        var employee = {
            "id": nextId,
            "ssn": _self.ssn,
            "nama": _self.nama,
            "email": _self.email,
            "foto": _self.fotosrc
        };
        console.log(employee);
        var request = objectStore.add(employee);
        request.onsuccess = function (event) {
            _self.employeesData.push(employee);
        };
    };
    KumparanNg2AppComponent.prototype.deleteRecord = function () {
        var _this = this;
        var _self = this;
        this.selected.sort(function (a, b) {
            return b - a;
        });
        this.selected.forEach(function (sel) {
            //   console.log(pas[i]);
            var transaction = _this.db.transaction([_this.objectStoreName], "readwrite");
            transaction.oncomplete = function (event) {
                // console.log(event);
                // alert('All is done');
            };
            transaction.onerror = function (event) {
                //   console.log(event);
                alert("Telah terjadi kesalahan");
            };
            var objectStore = transaction.objectStore(_this.objectStoreName);
            var request = objectStore.delete(sel);
            request.onsuccess = function (event) {
                //   console.log(event);
                var loc = this.employeesData.map(function (d) { return d['id']; }).indexOf(sel);
                this.employeesData.splice(loc, 1);
            };
        });
        this.selected = [];
        this.keyword = "";
    };
    KumparanNg2AppComponent.prototype.change = function (data) {
        var _this = this;
        this.selected = [];
        this.employeesData.forEach(function (mat) {
            if (data.values.indexOf(mat.id) !== -1) {
                _this.selected.push(mat.id);
            }
        });
        this.selection = this.selected.join(', ');
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
//# sourceMappingURL=kumparan-ng2-component-2.js.map