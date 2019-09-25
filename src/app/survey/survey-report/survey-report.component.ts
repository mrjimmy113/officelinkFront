import { AuthenticationService } from "./../../service/authentication.service";
import { WordCloudSaveComponent } from "./../../word-cloud-filter/word-cloud-save/word-cloud-save.component";
import { ApplyFilterComponent } from "./../apply-filter/apply-filter.component";
import { QuestionReport } from "./../../model/questionReport";
import { SendOutInfor } from "./../../model/sendOutInfor";
import { ApplyFilter } from "./../../model/applyFilter";
import { WordCloudFilter } from "./../../model/word-cloud-filter";
import { UltisService } from "src/app/service/ultis.service";
import { Question } from "./../../model/question";
import { element } from "protractor";
import { Location } from "./../../model/location";
import { ReportService } from "./../../service/report.service";
import { Team } from "./../../model/team";
import { Department } from "./../../model/department";
import { ActivatedRoute } from "@angular/router";
import { AnswerOption } from "./../../model/answerOption";
import { SurveyReport } from "./../../model/surveyReport";
import { SurveyService } from "./../../service/survey.service";
import { SurveyCompareComponent } from "./../survey-compare/survey-compare.component";
import { ModalService } from "./../../service/modal.service";
import { Component, OnInit } from "@angular/core";
import { CloudOptions, CloudData } from "angular-tag-cloud-module";
import { AnswerReport } from "src/app/model/answerReport";
import { WordCloudService } from "src/app/service/word-cloud.service";
import { filter } from "rxjs/operators";
import { DialogService } from "src/app/service/dialog.service";
import { MyMessage } from "src/app/const/message";
import { all } from "q";

@Component({
  selector: "app-survey-report",
  templateUrl: "./survey-report.component.html",
  styleUrls: ["./survey-report.component.css"]
})
export class SurveyReportComponent implements OnInit {
  locations: Location[];
  departments: Department[];
  teams: Team[];
  filters: WordCloudFilter[];

  locationId: number;
  departmentId: number;
  teamId: number;

  surveyId: number;

  surveyReport: SurveyReport;
  textOfSendOutInfor: string[];

  constructor(
    private modalSer: ModalService,
    private route: ActivatedRoute,
    private reportSer: ReportService
  ) {}

  ngOnInit() {
    this.locationId = 0;
    this.departmentId = 0;
    this.teamId = 0;
    this.surveyReport = new SurveyReport();
    this.textOfSendOutInfor = new Array();
    this.route.params.subscribe(params => {
      this.surveyId = params["id"];
      this.reportSer
        .getSendSurveyTargetDetail(this.surveyId)
        .subscribe(result => {
          this.locations = result.locations;
          this.departments = result.departments;
          this.teams = result.teams;
        });
      this.reportSer.getReport(this.surveyId).subscribe(result => {
        this.surveyReport = result;
        this.calculateCurrentSurveyPoint();
        this.getTextFromSendOutInfor(this.surveyReport.sendTargets);
      });
    });
    // this.getFilterList();
  }

  applyFilter() {
    this.reportSer
      .getFilteredReport(
        this.surveyId,
        this.locationId,
        this.departmentId,
        this.teamId
      )
      .subscribe(result => {
        this.surveyReport.categories = result;
        this.calculateCurrentSurveyPoint();
        console.log(this.surveyReport.categories);
      });
  }
  openCompare(q) {
    this.modalSer.init(
      SurveyCompareComponent,
      [
        q,
        this.surveyId,
        this.surveyReport.name,
        this.locationId,
        this.departmentId,
        this.teamId
      ],
      []
    );
  }

  getTextFromSendOutInfor(infors: SendOutInfor[]) {
    infors.forEach(element => {
      if (
        element.departmentName == "" &&
        element.locationName == "" &&
        element.teamName == ""
      ) {
        this.textOfSendOutInfor.push("All Company");
      } else if (
        element.departmentName != "" &&
        element.locationName == "" &&
        element.teamName == ""
      ) {
        this.textOfSendOutInfor.push(
          "Department: " + element.departmentName.toString()
        );
      } else if (
        element.departmentName == "" &&
        element.locationName != "" &&
        element.teamName == ""
      ) {
        this.textOfSendOutInfor.push(
          "Location: " + element.locationName.toString()
        );
      } else if (
        element.departmentName != "" &&
        element.locationName != "" &&
        element.teamName == ""
      ) {
        this.textOfSendOutInfor.push(
          "Location: " +
            element.locationName +
            " - Department: " +
            element.departmentName
        );
      } else if (
        element.departmentName != "" &&
        element.locationName != "" &&
        element.teamName != ""
      ) {
        this.textOfSendOutInfor.push("Team: " + element.teamName.toString());
      }
    });
  }

  //#region New Content
  calculateCurrentSurveyPoint() {
    this.surveyReport.goodCate = new Array();
    this.surveyReport.badCate = new Array();
    this.surveyReport.categories.forEach(element => {
      let point = 0;
      let numberOfQuestion = 0;
      for (let index = 0; index < element.questions.length; index++) {
        let currentPoint = element.questions[index].avgPoint;
        if (currentPoint < 0) {
          continue;
        }
        point += currentPoint;
        numberOfQuestion++;
      }
      if (numberOfQuestion > 0) {
        point = point / element.questions.length;
        element.point = point;
      }else {
        element.point = -1;
      }
    });
    let allPoint = 0;
    let numberOfCategory = 0;
    for (let index = 0; index < this.surveyReport.categories.length; index++) {
      let currentPoint = this.surveyReport.categories[index];
      if(currentPoint.point < 0) {
        continue;
      }
      allPoint += currentPoint.point;
      numberOfCategory++;
      if (currentPoint.point > 6) {
        this.surveyReport.goodCate.push(currentPoint);
      } else {
        this.surveyReport.badCate.push(currentPoint);
      }
    }

    if (numberOfCategory > 0) {
      allPoint = allPoint / this.surveyReport.categories.length;
      this.surveyReport.point = allPoint;
    } else {
      this.surveyReport.point = -1;
    }
  }

  //#endregion
}
