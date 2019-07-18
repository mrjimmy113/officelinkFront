import { forEach } from "@angular/router/src/utils/collection";
import { QuestionReport } from "./../../model/questionReport";
import { AnswerOption } from "./../../model/answerOption";
import { AnswerReport } from "./../../model/answerReport";
import { ReportService } from "./../../service/report.service";
import { Survey } from "./../../model/survey";
import { Question } from "./../../model/question";
import { Input } from "@angular/core";
import { ModalService } from "./../../service/modal.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ChartData } from "chart.js";
import { Series } from "@swimlane/ngx-charts";

@Component({
  selector: "app-survey-compare",
  templateUrl: "./survey-compare.component.html",
  styleUrls: ["./survey-compare.component.css"]
})
export class SurveyCompareComponent implements OnInit {
  @Input() inputs;
  surveyId: number;
  question: QuestionReport;
  reportData;
  surveyName: string;
  listSurvey: String[];
  newSurvey: String;
  surveyIndex = -1;
  choosenSurveys: Survey[];
  surveys: Survey[];
  compareData;
  dataList: MyChartData[];


  constructor(
    private modalSer: ModalService,
    private reportSer: ReportService
  ) {}

  ngOnInit() {
    this.dataList = new Array<MyChartData>();
    this.question = this.inputs[0];
    this.reportData = this.inputs[1];
    this.surveyId = this.inputs[2];
    this.surveyName = this.inputs[3];
    this.listSurvey = new Array<String>();
    this.choosenSurveys = new Array<Survey>();
    this.surveys = new Array<Survey>();
    let firstData = new MyChartData();
    firstData.surveyName = this.surveyName;
    firstData.answers = this.question.answers;
    this.dataList.push(firstData);
    this.createChartData();
    this.reportSer.getSameSurvey(this.surveyId).subscribe(result => {
      this.surveys = result;
    });
  }
  addNewSurvey() {
    if (this.surveyIndex >= 0) {
      let chartData = new MyChartData();
      chartData.surveyName = this.surveys[this.surveyIndex].name.toString() + "123";
      this.reportSer
        .getCompareQuestionAnswer(
          this.surveys[this.surveyIndex].id,
          this.question.question.id
        )
        .subscribe(result => {
          chartData.answers = result;
          this.dataList.push(chartData);
          this.createChartData();
        });

      this.surveys.splice(this.surveyIndex, 1);
    }
  }
  removeSurvey(index, survey) {}
  closeModal() {
    this.modalSer.destroy();
  }

  createChartData() {
    this.compareData = new Array();
    this.question.question.options.forEach(e => {
      let series = new Array();
      let isFound = false;
      this.dataList.forEach(d => {
        for (let index = 0; index < d.answers.length; index++) {
          const element = d.answers[index];
          if (element.term == e.id.toString()) {
            let serie: Serie = {
              name: d.surveyName,
              value: element.weight.valueOf()
            };
            series.push(serie);
            isFound = true;
          }
        }
      });
      if (!isFound) {
        this.dataList.forEach(d => {
          let serie: Serie = {
            name: d.surveyName,
            value: 0
          };
          series.push(serie);
        });
      }

      let data: NormalizedChartData = {
        name: e.answerText.toString(),
        series: series
      };
      this.compareData.push(data);
    });
  }
}
interface NormalizedChartData {
  name: string;
  series: Serie[];
}
interface Serie {
  name: string;
  value: number;
}

class MyChartData {
  surveyName: string;
  answers: AnswerReport[];
}
