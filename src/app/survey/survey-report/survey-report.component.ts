import { AuthenticationService } from './../../service/authentication.service';
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
import { MyMessage } from 'src/app/const/message';
import { all } from 'q';


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

  colorScheme = {
    domain: ["#5AA454", "#A10A28", "#C7B42C", "#AAAAAA"]
  };
  options: CloudOptions = {
    width: 1,
    height: 200,
    overflow: false
  };

  noDataFlag = false;
  choosenFilter = 0;
  role = this.authSer.getRole();
  disableTemplate = false;
  constructor(
    private modalSer: ModalService,
    private route: ActivatedRoute,
    private reportSer: ReportService,
    private utltis: UltisService,
    private filterSer: WordCloudService,
    private authSer: AuthenticationService,
    private dialogSer: DialogService,
  ) { }

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
        this.surveyReport.goodCate = new Array();
        this.surveyReport.badCate = new Array();
        this.calculateCurrentSurveyPoint();
        this.getTextFromSendOutInfor(this.surveyReport.sendTargets);
      });
    });
    this.getFilterList();
  }

  getWordCloud(answers: Array<AnswerReport>): CloudData[] {
    let dataList = new Array<CloudData>();
    answers.forEach(element => {
      let data: CloudData = {
        text: element.term.toString(),
        weight: element.weight.valueOf(),
        color: "#" + (((1 << 24) * Math.random()) | 0).toString(16)
      };
      dataList.push(data);
    });
    return dataList;
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
        // this.surveyReport.questions = result;

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

  getDownloadToken(id) {
    this.reportSer.getDownloadToken(this.surveyId, id).subscribe(result => {
      window.open(this.reportSer.getDownloadLink(result));
    }, err => {
      this.dialogSer.init("Download Answers", MyMessage.error400Message, undefined, undefined);
    })
  }
  filterWordCloud(event: Event, dataIndex) {
    let options: HTMLOptionsCollection = event.target["options"];
    let filterId = options[options.selectedIndex].value;
    if (this.isFilterTemplate(filterId)) {
      this.disableTemplate = true;
    } else {
      this.disableTemplate = false;
    }
    this.getNewWordCloud(filterId, dataIndex);
  }

  getNewWordCloud(filterId, dataIndex) {
    // if (Number(filterId) == 0) {
    //   this.surveyReport.questions[dataIndex].reportData = this.getWordCloud(
    //     this.surveyReport.questions[dataIndex].answers
    //   );
    // } else {
    //   let applyFilter = new ApplyFilter();
    //   applyFilter.filterId = Number(filterId);
    //   applyFilter.answers = this.surveyReport.questions[dataIndex].answers;
    //   this.reportSer.getFilterdWordCloud(applyFilter).subscribe(result => {
    //     this.surveyReport.questions[dataIndex].reportData = this.getWordCloud(
    //       result
    //     );
    //   });
    // }
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

  openApplyFilter(q: QuestionReport) {
    this.modalSer.init(ApplyFilterComponent, q, []);
  }

  getFilterList() {
    this.filterSer.getAll().subscribe(result => {
      this.filters = result;
    });
  }

  addFilter(dataIndex) {
    if (this.choosenFilter == 0) {
      this.modalSer.init(
        WordCloudSaveComponent,
        [],
        [
          () => {
            this.getFilterList();
          },
          newFilter => {
            this.getNewWordCloud(newFilter, dataIndex);
            this.choosenFilter = newFilter;
          }
        ]
      );
    } else {
      this.filterSer.getOne(this.choosenFilter).subscribe(result => {
        this.modalSer.init(WordCloudSaveComponent, result, () => {
          this.getFilterList();
          this.getNewWordCloud(this.choosenFilter, dataIndex);
        });
      });
    }
  }

  isFilterTemplate(id): boolean {
    let found = this.filters.filter(e => {
      return e.id == id;
    })
    if(found.length > 0) {
      return found[0].template;
    }else {
      return false;
    }

  }

  //#region New Content
  calculateCurrentSurveyPoint() {
    this.surveyReport.categories.forEach(element => {
        let point = 0;
        element.questions.forEach(element => {
          point += element.avgPoint;
        });
        point = point / element.questions.length;
        element.point = point;
    });
    let allPoint = 0;
    this.surveyReport.categories.forEach(element => {
      allPoint += element.point;
      if(element.point > 6) {
        this.surveyReport.goodCate.push(element);
      }else {
        this.surveyReport.badCate.push(element);
      }
    })
    allPoint = allPoint / this.surveyReport.categories.length;
    this.surveyReport.point = allPoint;
    console.log(this.surveyReport);
  }

  //#endregion
}

