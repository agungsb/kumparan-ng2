import {Component, NgZone, ViewChild} from '@angular/core';
// import { MdButton } from '@angular2-material/button';
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS, ITableSelectionChange} from 'ng2-material';
import {MD_TOOLBAR_DIRECTIVES} from '@angular2-material/toolbar';
import {MdCheckbox} from '@angular2-material/checkbox';
import {MdInput} from '@angular2-material/input';
import {employees} from './employees';
import {fotosrc} from './fotosrc';
import {AngularIndexedDB} from './angular2-indexeddb';

@Component({
  moduleId: module.id,
  selector: 'kumparan-ng2-app',
  templateUrl: 'kumparan-ng2.component.html',
  directives: [MATERIAL_DIRECTIVES, MD_TOOLBAR_DIRECTIVES, MdCheckbox, MdInput],
  providers: [MATERIAL_PROVIDERS],
  styleUrls: ['kumparan-ng2.component.css']
})
export class KumparanNg2AppComponent {
  @ViewChild('custom') dialog;
  zone: NgZone;
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
  constructor() {
  }
  ngOnInit() {
    this.init();
  }
  init() {
    var _self = this;
    this.db = new AngularIndexedDB(this.dbName, 1);
    this.db.createStore(1, (event) => {
      console.log(event);
      if (event.oldVersion > 0 && event.newVersion > event.oldVersion) {
        this.db.clear(_self.objectStoreName).then(() => {
          console.log('cleared and recreated');
          this.createRecords(event);
        });
      } else {
        console.log('created');
        this.createRecords(event);
      }
    }).then(() => {
      // console.log(this.db);
      this.readAllRecords();
    });
  }
  resetForm() {
    this.keyword = "";
    this.ssn = "";
    this.nama = "";
    this.email = "";
    this.dialog.close();
  }
  createRecords(event: any) {
    let objectStore = event.target.result.createObjectStore(this.objectStoreName, { keyPath: "id", autoIncrement: false });

    objectStore.createIndex("ssn", "ssn", { unique: true });

    objectStore.createIndex("nama", "nama", { unique: false });

    objectStore.createIndex("email", "email", { unique: true });

    objectStore.createIndex("foto", "foto", { unique: false });
  }
  readAllRecords() {
    this.db.openCursor(this.objectStoreName, (evt) => {
      var cursor = evt.target.result;
      if (cursor) {
        this.employeesData.push({ "id": cursor.key, "ssn": cursor.value.ssn, "nama": cursor.value.nama, "email": cursor.value.email, "foto": cursor.value.foto });
        cursor.continue();
      }
    });
  }
  addRecord() {
    var lastId: number = 0;
    if (this.employeesData.length > 0) {
      lastId = this.employeesData[this.employeesData.length - 1].id;
    }
    const nextId = lastId + 1;
    var employee = {
      "id": nextId,
      "ssn": this.ssn,
      "nama": this.nama,
      "email": this.email,
      "foto": this.fotosrc
    };
    // console.log(employee);
    this.db.add(this.objectStoreName, employee).then(() => {
      // Do something after the value was added
      this.employeesData.push(employee);
      this.resetForm();
    }, (error) => {
      console.log(error);
    });
  }
  deleteRecord() {
    var _self = this;
    this.selected.sort(function (a, b) {
      return b - a;
    });
    this.selected.forEach((sel: any) => {
      this.db.delete(this.objectStoreName, sel).then(() => {
        // Do something after remove
        var loc = this.employeesData.map(function (d) { return d['id']; }).indexOf(sel);
        this.employeesData.splice(loc, 1);
      }, (error) => {
        console.log(error);
      });
    });
    this.selected = [];
    this.keyword = "";
  }
  change(index: number) {
    if (this.selected.indexOf(this.employeesData[index].id) == -1) {
      this.selected.push(this.employeesData[index].id);
    } else {
      var loc = this.selected.map(function (d) { return d; }).indexOf(this.employeesData[index].id);
      this.selected.splice(loc, 1);
    }
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
