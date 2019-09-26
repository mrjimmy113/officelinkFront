import { MyMessage } from './../../const/message';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogService } from 'src/app/service/dialog.service';
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
import { ConfigurationService } from 'src/app/service/configuration.service';

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
    private configSer: ConfigurationService,
    private dyLoadSer: DynamicLoadService,
    private ultisSer: UltisService,
    private modalSer: ModalService,
    private dialogSer : DialogService
  ) { }

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

  search() {
    this.surveySer
      .search(this.searchTerm, this.currentPage - 1)
      .subscribe(result => {
        this.maxPage = result.maxPage;
        this.itemList = result.objList;
      });
  }

  loadPage(pageNumber) {
    this.currentPage = pageNumber;
    this.surveySer.search(this.searchTerm, pageNumber - 1).subscribe(result => {
      this.maxPage = result.maxPage;
      this.itemList = result.objList;
    })
  }

  filter() {
    this.currentPage = 1;
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
    this.modalSer.init(ConfigurationSaveComponent, id, () => this.search());
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

  getTimeFromCron(cronExpression: String) {
    let result = "";
    var list = cronExpression.split(" ");
    result = (Number(list[2]) < 10 ? "0"+list[2] : list[2]) + ":" + (Number(list[1]) < 10 ? "0"+list[1] : list[1]);
    return result;
  }

  getWeekDaysFromCron(cronExpression: String) {
    let result = "Every ";
    var list = cronExpression.split(" ");

    if(list[5] == "?") {
      result = result + list[3] + "th of " + list[4];
    }else {
      result = result + list[5] + " of " + list[4];
    }
    return result;
  }

  getMonthsFromCron(cronExpression: String) {
    let result = "";
    var list = cronExpression.split(" ");
    result = list[4];
    if (result == "*") {
      result = "Every Month";
    }
    return result;
  }

  changeActive(survey: Survey) {
    this.surveySer.updateActiveStatus(survey.id, survey.active).subscribe(
      error => {
        if (this.requestStatus == 400) alert("Bad request");
      }
    );

    if (survey.configuration != null) {
      survey.configuration.active = !survey.configuration.active;
      console.log(survey.configuration.active);
      this.configSer.updateActiveStatus(survey.configuration.id, survey.configuration.active).subscribe(
        error => {
          if (this.requestStatus == 400) alert("Bad request");
        }
      );
    }
  }

  resend(id) {
    this.surveySer.resend(id).subscribe(() => {
      this.dialogSer.init(MyMessage.surveyTitle, "Your survey has been resent",undefined,undefined)
    },(err : HttpErrorResponse) => {
      if(err.status == 400) {
        this.dialogSer.init(MyMessage.errorTitle,MyMessage.error400Message,undefined,undefined);
      }else if(err.status == 409) {
        this.dialogSer.init(MyMessage.surveyTitle,"Your survey can not be resent",undefined,undefined);
      }
    })
  }
}
