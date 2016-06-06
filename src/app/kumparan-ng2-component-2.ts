import {Component, OnInit} from '@angular/core';
// import { MdButton } from '@angular2-material/button';
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS, ITableSelectionChange} from 'ng2-material';
import {MD_TOOLBAR_DIRECTIVES} from '@angular2-material/toolbar';
import {MdCheckbox} from '@angular2-material/checkbox';
import {MdInput} from '@angular2-material/input';
import {employees} from './employees';
import {fotosrc} from './fotosrc';

@Component({
  moduleId: module.id,
  selector: 'kumparan-ng2-app',
  templateUrl: 'kumparan-ng2.component.html',
  directives: [MATERIAL_DIRECTIVES, MD_TOOLBAR_DIRECTIVES, MdCheckbox, MdInput],
  providers: [MATERIAL_PROVIDERS],
  styleUrls: ['kumparan-ng2.component.css']
})
export class KumparanNg2AppComponent implements OnInit {
  fotosrc: string = fotosrc;
  selected: Array<any> = [];
  selection: string;
  count: number;
  foundIndex: Array<any> = [];
  keyword: String = "";
  searchResult: String;

  id: number;
  nama: string;
  ssn: string;
  email: string;

  request: any;
  employeesData: Array<any> = [];
  db: any;
  dbName: string = "company_db";
  objectStoreName: string = "employees";
  constructor() { }
  ngOnInit() {
    this.init();
  }
  init() {
    var _self = this;
    this.request = indexedDB.open(this.dbName, 1);
    this.request.onerror = function (event) {
      // Handle errors.
    };
    this.request.onsuccess = function (event: any) {
      _self.db = event.currentTarget.result;
      console.log(_self.db);
      console.log("DB Opened!");
      _self.readAllRecords();
    };

    this.request.onupgradeneeded = function (event: any) {
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
  }
  readAllRecords() {
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
    }
  }
  addRecord() {
    var _self = this;
    var transaction = this.db.transaction([this.objectStoreName], "readwrite");
    transaction.oncomplete = function (event) {
      // console.log(event);
    }

    transaction.onerror = function (event) {
      // console.log(event);
      alert(event.target.error.message);
    }

    var lastId: number = 0;
    if (this.employeesData.length > 0) {
      lastId = this.employeesData[this.employeesData.length - 1].id;
    }
    const nextId = lastId + 1;
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
    }
  }
  deleteRecord() {
    var _self = this;
    this.selected.sort(function (a, b) {
      return b - a;
    });
    this.selected.forEach((sel: any) => {
      //   console.log(pas[i]);
      var transaction = this.db.transaction([this.objectStoreName], "readwrite");
      transaction.oncomplete = function (event) {
        // console.log(event);
        // alert('All is done');
      }
      transaction.onerror = function (event) {
        //   console.log(event);
        alert("Telah terjadi kesalahan");
      }
      var objectStore = transaction.objectStore(this.objectStoreName);
      var request = objectStore.delete(sel);
      request.onsuccess = function (event) {
        //   console.log(event);
        var loc = this.employeesData.map(function (d) { return d['id']; }).indexOf(sel);
        this.employeesData.splice(loc, 1);
      };
    });
    this.selected = [];
    this.keyword = "";
  }
  change(data: ITableSelectionChange) {
    this.selected = [];
    this.employeesData.forEach((mat: any) => {
      if (data.values.indexOf(mat.id) !== -1) {
        this.selected.push(mat.id);
      }
    });
    this.selection = this.selected.join(', ');
    this.count = this.selected.length;
  }
  search(event) {
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
    } else {
      this.foundIndex = [];
    }
  }
  filterData(keyword) {
    var regex = new RegExp(keyword, 'i');
    const filtered = this.employeesData.filter(function (obj) {
      return obj.nama.search(regex) > -1;
    });
    return filtered;
  }
  isMatched(i) {
    var result = false;
    if (this.keyword.length > 0) {
      result = this.foundIndex.indexOf(i) > -1;
    } else {
      result = true;
    }
    return result;
  }
}
