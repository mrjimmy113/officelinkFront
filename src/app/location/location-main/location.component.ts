import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../service/modal.service';
import { LocationService } from '../../service/location.service';
import { DatePipe } from '@angular/common';
import { UltisService } from "src/app/service/ultis.service";

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
  ) { }

  ngOnInit() {
    this.itemList = new Array<Location>();
    this.search();
  }

  search() {
    this.service.searchGetPage(this.searchTerm, this.currentPage - 1).subscribe(result => {
      this.maxPage = result.maxPage;
      this.itemList = result.objList;
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
    this.service.searchGetPage(this.searchTerm,  this.currentPage - 1).subscribe(result => {
      this.maxPage = result.maxPage;
      this.itemList = result.objList;
    })
  }

  delete(id) {
    if (confirm("Are you sure to detele?")) {
      this.service.delete(id).subscribe(result => {
        this.requestStatus = result;
        if (this.requestStatus == 200) {
          this.search();
        }
      });
    }
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
