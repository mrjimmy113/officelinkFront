import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/service/news.service';
import { DomSanitizer } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { UltisService } from "src/app/service/ultis.service";
import { DialogService } from "src/app/service/dialog.service";
import { MyMessage } from 'src/app/const/message';

@Component({
  selector: 'app-news-main',
  templateUrl: './news-main.component.html',
  styleUrls: ['./news-main.component.css']
})
export class NewsMainComponent implements OnInit {

  itemList;
  currentPage = 1;
  maxPage;
  searchTerm = "";
  requestStatus: Number;
  isSort = "";

  constructor(
    private service: NewsService,
    private dom: DomSanitizer,
    private datePipe: DatePipe,
    private ultisSer: UltisService,
    private dialogSer: DialogService,
    ) { }

  ngOnInit() {
    this.itemList = new Array;
    this.search();
  }

  search() {
    this.service.searchGetPage(this.searchTerm, this.currentPage - 1).subscribe(result => {
      this.maxPage = result.maxPage;
      this.itemList = result.objList;
    })
  }

  loadPage(pageNumber) {
    this.currentPage = pageNumber;
    this.search();
  }

  filter() {
    let newSearchTerm = this.searchTerm;
    setTimeout(() => {
      if (newSearchTerm == this.searchTerm) {
        this.search();
      }
    }, 300);
  }

  delete(id) {
    this.dialogSer.init("Delete News", MyMessage.confirmDeleteNews, () => {
      this.service.delete(id).subscribe(result => {
        this.requestStatus = result;
        if (this.requestStatus == 200) {
          this.dialogSer.init("Delete News", MyMessage.deleteNews, undefined, undefined);
          this.search();
        }
      }, err => {
        this.dialogSer.init("Delete News", MyMessage.error400Message, undefined, undefined);
      })
    }, undefined);
  }

  doms(s) {
    return this.dom.bypassSecurityTrustUrl(s);
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

