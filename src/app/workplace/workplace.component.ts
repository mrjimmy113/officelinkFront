import { Component, OnInit } from '@angular/core';
import { ModalService } from '../service/modal.service';
import { WorkplaceService } from '../service/workplace.service';
import { WorkplaceSaveComponent } from '../workplace-save/workplace-save.component';
import { Workplace } from '../model/workplace';
import { DialogService } from '../service/dialog.service';
import { MyMessage } from '../const/message';
import { UltisService } from '../service/ultis.service';

@Component({
  selector: 'app-workplace',
  templateUrl: './workplace.component.html',
  styleUrls: ['./workplace.component.css']
})
export class WorkplaceComponent implements OnInit {
  itemList = new Array<Workplace>();
  currentPage = 1;
  maxPage;
  searchTerm = "";
  requestStatus: Number;
  isSort = "";

  constructor(
    private modalSer: ModalService, 
    private ultisSer: UltisService,
    private ser: WorkplaceService,
    private dialogSer: DialogService
    ) { }

  ngOnInit() {
    this.search("");
  }

  search(value) {
    this.ser.searchGetPage(value, 1).subscribe(result => {
      this.maxPage = result.maxPage;
      this.itemList = result.objList;
      console.log(this.itemList);
    })
  }

  openCreate() {
    this.modalSer.init(WorkplaceSaveComponent, [], () => this.loadPage(this.currentPage));
  }

  openEdit(item) {
    this.modalSer.init(WorkplaceSaveComponent, item, () => this.loadPage(this.currentPage));
  }

  filter() {
    let newSearchTerm = this.searchTerm;
    setTimeout(() => {
      if (newSearchTerm == this.searchTerm) {
        this.search(this.searchTerm);
      }
    }, 300);
  }

  changeActiveStatus(wp: Workplace) {
    if(!wp.deleted) {
      this.dialogSer.init("Deactivate Workplace", MyMessage.confirmDeactivateWorkplace, () =>
      this.ser.changeActiveStatus(wp.id, !wp.deleted).subscribe(
        result => {
          this.requestStatus = result;
          if (this.requestStatus == 200) {
            this.dialogSer.init("Operation success", MyMessage.deactiveWorkplace, undefined, undefined)
            if (this.itemList.length <= 1) {
              this.loadPage(this.currentPage - 1);
            }
            else {
              this.loadPage(this.currentPage);
            }
          }
        },
        error => {
          if (error.status = 400) {
            this.dialogSer.init("Operation fail", MyMessage.actionError, undefined, undefined)
          }
        }
      ), undefined);
    } else {
      this.dialogSer.init("Activate Workplace", MyMessage.confirmActivateWorkplace, () =>
      this.ser.changeActiveStatus(wp.id, !wp.deleted).subscribe(
        result => {
          this.requestStatus = result;
          if (this.requestStatus == 200) {
            this.dialogSer.init("Operation success", MyMessage.activateWokrplace, undefined, undefined)
            if (this.itemList.length <= 1) {
              this.loadPage(this.currentPage - 1);
            }
            else {
              this.loadPage(this.currentPage);
            }
          }
        },
        error => {
          if (error.status = 400) {
            this.dialogSer.init("Operation fail", MyMessage.actionError, undefined, undefined)
          }
        }
      ), undefined);
    }
    
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
