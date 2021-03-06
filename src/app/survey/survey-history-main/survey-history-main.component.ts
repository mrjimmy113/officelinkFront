import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { UltisService } from "src/app/service/ultis.service";
import { ModalService } from 'src/app/service/modal.service';
import { SurveyService } from "./../../service/survey.service";
import { SurveyHistoryDetailComponent } from '../survey-history-detail/survey-history-detail.component';
import { MyMessage } from 'src/app/const/message';
import { DialogService } from "src/app/service/dialog.service";

@Component({
  selector: 'app-survey-history-main',
  templateUrl: './survey-history-main.component.html',
  styleUrls: ['./survey-history-main.component.css']
})
export class SurveyHistoryMainComponent implements OnInit {

  itemList;
  currentPage = 1;
  maxPage;
  searchTerm = "";
  requestStatus: Number;
  isSort = "";

  constructor(
    private modalService: ModalService,
    private service: SurveyService,
    private datePipe: DatePipe,
    private ultisSer: UltisService,
    private dialogSer: DialogService,
  ) { }

  ngOnInit() {
    this.itemList = new Array;
    this.search();
  }

  search() {
    this.service.getSurveyHistory(this.searchTerm, this.currentPage - 1).subscribe(result => {
      this.maxPage = result.maxPage;
      this.itemList = result.objList;
    }, err => {
      this.dialogSer.init("List Survey History", MyMessage.error400Message, undefined, undefined);
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

  sort(property) {
    if (this.isSort == property) {
      this.itemList.sort(this.ultisSer.sortByPropertyNameDSC(property));
      this.isSort = "";
    } else {
      this.itemList.sort(this.ultisSer.sortByPropertyNameASC(property));
      this.isSort = property;
    }
  }

  goDetail(item) {    
    this.modalService.init(SurveyHistoryDetailComponent, item, () => this.search());
  }

}
