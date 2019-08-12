import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../service/location.service';
import { DatePipe } from '@angular/common';
import { UltisService } from "src/app/service/ultis.service";
import { DialogService } from "src/app/service/dialog.service";
import { MyMessage } from "src/app/const/message";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  itemList;
  currentPage = 1;
  maxPage;
  searchTerm = "";
  requestStatus: Number;
  isSort = "";

  constructor(
    private service: LocationService,
    private ultisSer: UltisService,
    private datePipe: DatePipe,
    private dialogSer: DialogService,
  ) { }

  ngOnInit() {
    this.itemList = new Array<Location>();
    this.search();
  }

  search() {
    this.service.searchGetPage(this.searchTerm, this.currentPage - 1).subscribe(result => {
      this.maxPage = result.maxPage;
      this.itemList = result.objList;
    }, (err: HttpErrorResponse) => {
        this.dialogSer.init("List Location", MyMessage.error400Message, undefined, undefined);
    })
  }

  filter() {
    let newSearchTerm = this.searchTerm;
    setTimeout(() => {
      if (newSearchTerm == this.searchTerm) {
        this.search();
      }
    }, 300);
  }

  loadPage(pageNumber) {
    this.currentPage = pageNumber;
    this.search();
  }

  delete(id) {
    this.dialogSer.init("Delete Location", MyMessage.confirmDeleteLocation, () => {
      this.service.delete(id).subscribe(result => {
        this.requestStatus = result;
        console.log("haha ", this.requestStatus);
        if (this.requestStatus == 200) {
          this.dialogSer.init("Delete Location", MyMessage.deleteLocation, undefined, undefined);
          this.search();
        }
      }, (err: HttpErrorResponse) => {
        if (err.status == 409) {
          this.dialogSer.init("Delete Location", MyMessage.deleteLocationConflict, undefined, undefined);
        } else {
          this.dialogSer.init("Delete Location", MyMessage.error400Message, undefined, undefined);
        }
      })
    }, undefined);
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
