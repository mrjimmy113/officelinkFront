import { ApplyFilter } from './../../model/applyFilter';
import { WordCloudService } from 'src/app/service/word-cloud.service';
import { ModalService } from 'src/app/service/modal.service';
import { ApplyFilterComponent } from "./../apply-filter/apply-filter.component";
import { AuthenticationService } from "./../../service/authentication.service";
import { DialogService } from "src/app/service/dialog.service";
import { CloudOptions } from "angular-tag-cloud-module";
import { CloudData } from "angular-tag-cloud-module";
import { VASOPTION } from "./../../const/vasOption";
import { RATEOPTION } from "./../../const/rateOption";
import { TypeEnum } from "./../../model/typeEnum";
import { UltisService } from "./../../service/ultis.service";
import { AnswerOption } from "./../../model/answerOption";
import { AnswerReport } from "./../../model/answerReport";
import { ReportService } from "./../../service/report.service";
import { EventEmitter } from "@angular/core";
import { QuestionReport } from "./../../model/questionReport";
import { Component, OnInit, Input, Output } from "@angular/core";
import { MyMessage } from "src/app/const/message";
import { WordCloudSaveComponent } from "src/app/word-cloud-filter/word-cloud-save/word-cloud-save.component";
import { WordCloudFilter } from 'src/app/model/word-cloud-filter';

@Component({
  selector: "app-question-report",
  templateUrl: "./question-report.component.html",
  styleUrls: ["./question-report.component.css"]
})
export class QuestionReportComponent implements OnInit {
  @Input() question: QuestionReport;
  @Input() surveyId: number;
  @Input() locationId: number;
  @Input() departmentId: number;
  @Input() teamId: number;

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
  filters: WordCloudFilter[];
  isOpen = false;
  typeEnum = TypeEnum;
  constructor(
    private reportSer: ReportService,
    private utltis: UltisService,
    private dialogSer: DialogService,
    private authSer: AuthenticationService,
    private modalSer: ModalService,
    private filterSer:WordCloudService
  ) {}

  ngOnInit() {
    this.getFilterList();
  }

  openDetail() {
    this.isOpen = true;
    if (this.question.answers == null) {
      this.reportSer
        .getCompareQuestionAnswer(
          this.surveyId,
          this.question.question.id,
          this.locationId,
          this.departmentId,
          this.teamId
        )
        .subscribe(result => {
          this.question.answers = result;
          if (this.question.question.type.type == "RATE") {
            this.question.reportData = this.getChartParam(result, RATEOPTION);
          } else if (this.question.question.type.type == "VAS") {
            this.question.reportData = this.getChartParam(result, VASOPTION);
          } else if (this.question.question.type.type == "TEXT") {
            this.question.reportData = this.getWordCloud(result);
          }
        });
    }
  }

  closeDetail() {
    this.isOpen = false;
  }
  getChartParam(
    answers: AnswerReport[],
    answerTexts: AnswerOption[]
  ): NgxChartParam[] {
    let dataList = new Array<NgxChartParam>();
    answerTexts.forEach(element => {
      let data: NgxChartParam = {
        name: element.answerText.toString(),
        value: this.getOptionValue(element.id.valueOf(), answers)
      };
      dataList.push(data);
    });
    dataList.sort(this.utltis.sortByPropertyNameDSC("name"));
    dataList.sort(this.utltis.sortByPropertyNameDSC("value"));
    return dataList;
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

  getOptionValue(id: number, answers: AnswerReport[]): number {
    for (let index = 0; index < answers.length; index++) {
      if (Number(answers[index].term).valueOf() == id) {
        return answers[index].weight.valueOf();
      }
    }

    return 0;
  }

  getDownloadToken(id) {
    this.reportSer.getDownloadToken(this.surveyId, id).subscribe(
      result => {
        window.open(this.reportSer.getDownloadLink(result));
      },
      err => {
        this.dialogSer.init(
          "Download Answers",
          MyMessage.error400Message,
          undefined,
          undefined
        );
      }
    );
  }
  filterWordCloud(event: Event, dataIndex) {
    let options: HTMLOptionsCollection = event.target["options"];
    let filterId = options[options.selectedIndex].value;
    if (this.isFilterTemplate(filterId)) {
      this.disableTemplate = true;
    } else {
      this.disableTemplate = false;
    }
    this.getNewWordCloud(filterId);
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
            this.getNewWordCloud(newFilter);
            this.choosenFilter = newFilter;
          }
        ]
      );
    } else {
      this.filterSer.getOne(this.choosenFilter).subscribe(result => {
        this.modalSer.init(WordCloudSaveComponent, result, () => {
          this.getFilterList();
          this.getNewWordCloud(this.choosenFilter);
        });
      });
    }
  }

  isFilterTemplate(id): boolean {
    let found = this.filters.filter(e => {
      return e.id == id;
    });
    if (found.length > 0) {
      return found[0].template;
    } else {
      return false;
    }
  }

  getNewWordCloud(filterId) {
    if (Number(filterId) == 0) {
      this.question.reportData = this.getWordCloud(
        this.question.answers
      );
    } else {
      let applyFilter = new ApplyFilter();
      applyFilter.filterId = Number(filterId);
      applyFilter.answers = this.question.answers;
      this.reportSer.getFilterdWordCloud(applyFilter).subscribe(result => {
        this.question.reportData = this.getWordCloud(
          result
        );
      });
    }
  }
}
interface NgxChartParam {
  name: string;
  value: number;
}
