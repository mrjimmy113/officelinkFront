import { Component, OnInit } from '@angular/core';
import { ModalService } from '../service/modal.service';
import { DepartmentService } from '../service/department.service';
import { DepartmentSaveComponent } from '../department-save/department-save.component';
import { Department } from '../model/department';
import { UltisService } from '../service/ultis.service';
import { DialogService } from '../service/dialog.service';
import { MyMessage } from '../const/message';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  itemList = new Array<Department>();
  currentPage = 1;
  maxPage;
  searchTerm = "";
  requestStatus: Number;
  isSort = "";

  constructor(
    private modalSer: ModalService,
    private ser: DepartmentService,
    private ultisSer: UltisService,
    private dialogSer: DialogService
  ) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.search("");
  }

  search(value) {
    this.ser.searchGetPage(value, 1).subscribe(result => {
      this.maxPage = result.maxPage;
      this.itemList = result.objList;
    })
  }

  openCreate() {
    this.modalSer.init(DepartmentSaveComponent, [], () => this.loadPage(this.currentPage));
  }

  openEdit(item) {
    this.modalSer.init(DepartmentSaveComponent, item, () => this.loadPage(this.currentPage));
  }

  filter() {
    let newSearchTerm = this.searchTerm;
    setTimeout(() => {
      if (newSearchTerm == this.searchTerm) {
        this.search(this.searchTerm);
      }
    }, 300);
  }

  delete(dep: Department) {
    this.dialogSer.init("Delete Department", MyMessage.confirmDeleteDep, () =>
      this.ser.delete(dep.id).subscribe(
        result => {
          this.requestStatus = result;
          if (this.requestStatus == 200) {
            this.dialogSer.init("Operation success", MyMessage.deleteDepartment, undefined, undefined)
            if (this.itemList.length <= 1) {
              this.loadPage(this.currentPage - 1);
            }
            else {
              this.loadPage(this.currentPage);
            }
          }
        },
        error => {
          if (error.status == 409) {
            this.dialogSer.init("Operation fail", MyMessage.deleteDepHasTeamWarning, undefined, undefined)
          } else if (error.status = 400) {
            this.dialogSer.init("Operation fail", MyMessage.error400Message, undefined, undefined)
          }
        }
      ), undefined);
  }

  loadPage(pageNumber) {
    this.currentPage = pageNumber;
    this.ser.searchGetPage(this.searchTerm, pageNumber).subscribe(result => {
      this.maxPage = result.maxPage;
      this.itemList = result.objList;
    })
  }

  sort(property) {
    if (this.isSort == property) {
      this.itemList.sort(this.ultisSer.sortByPropertyNameDSC(property));
      this.isSort = "";
    } else {
      this.itemList.sort(this.ultisSer.sortByPropertyNameASC(property));
      this.isSort = property;
    }
  }
}
