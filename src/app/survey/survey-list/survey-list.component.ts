import { ConfigurationSaveComponent } from './../../configuration-save/configuration-save.component';
import { SendOutSurveyComponent } from './../send-out-survey/send-out-survey.component';
import { ModalService } from './../../service/modal.service';
import { Question } from './../../model/question';
import { Survey } from "./../../model/survey";
import { SurveySaveComponent } from "./../survey-save/survey-save.component";
import { DynamicLoadService } from "./../../service/dynamic-load.service";
import { SurveyService } from "./../../service/survey.service";
import { Component, OnInit } from "@angular/core";
import { UltisService } from "src/app/service/ultis.service";

@Component({
  selector: "app-survey-list",
  templateUrl: "./survey-list.component.html",
  styleUrls: ["./survey-list.component.css"]
})
export class SurveyListComponent implements OnInit {
  itemList;
  currentPage = 1;
  maxPage;
  searchTerm = "";
  requestStatus: Number;
  isHide = false;
  saveComponentRef;
  isSort = "";
  constructor(
    private surveySer: SurveyService,
    private dyLoadSer: DynamicLoadService,
    private ultisSer: UltisService,
    private modalSer:ModalService
  ) {}

  ngOnInit() {
    this.itemList = new Array();
    this.search();
  }
  openCreate() {
    this.isHide = true;
    let newSurvey = new Survey();
    newSurvey.questions = new Array<Question>();
    this.saveComponentRef = this.dyLoadSer.init(
      "saveComponent",
      SurveySaveComponent,
      newSurvey,
      () => this.offSave()
    );
  }
  openEdit(choosen: Survey) {
    this.surveySer.getDetail(choosen.id).subscribe(result => {
      this.isHide = true;
      choosen.questions = result;
      this.saveComponentRef = this.dyLoadSer.init(
        "saveComponent",
        SurveySaveComponent,
        choosen,
        () => this.offSave()
      );
    });
  }

  openClone(choosen: Survey) {
    let clone = new Survey();
    this.surveySer.getDetail(choosen.id).subscribe(result => {
      this.isHide = true;
      clone.questions = result;
      this.saveComponentRef = this.dyLoadSer.init(
        "saveComponent",
        SurveySaveComponent,
        clone,
        () => this.offSave()
      );
    });
  }

  search() {
    this.surveySer
      .search(this.searchTerm, this.currentPage - 1)
      .subscribe(result => {
        this.maxPage = result.maxPage;
        this.itemList = result.objList;
        console.log(this.itemList);
      });
  }
  loadPage(num) {}
  filter() {
    let newSearchTerm = this.searchTerm;
    setTimeout(() => {
      if (newSearchTerm == this.searchTerm) {
        this.search();
      }
    }, 300);
  }
  delete(id) {
    if (confirm("Do you really want to delete this")) {
      this.surveySer.delete(id).subscribe(() => {
        alert("Successfully Deleted");
        this.search();
      });
    }
  }

  sendOut(id) {
    this.modalSer.init(ConfigurationSaveComponent,id,[]);
  }

  offSave() {
    this.isHide = false;
    this.dyLoadSer.destroy(this.saveComponentRef);
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
}
