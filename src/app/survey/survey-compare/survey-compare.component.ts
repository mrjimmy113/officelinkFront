import { CloudData } from 'angular-tag-cloud-module';
import { CloudOptions } from 'angular-tag-cloud-module';
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
  surveyName: string;
  listSurvey: String[];
  newSurvey: String;
  surveyIndex = -1;
  choosenSurveys: Survey[];
  surveys: Survey[];
  compareData;
  dataList: MyChartData[];
  locationId;
  departmentId;
  teamId;

  options: CloudOptions = {
    width: 1,
    height: 200,
    overflow: false
  };


  constructor(
    private modalSer: ModalService,
    private reportSer: ReportService
  ) {}

  ngOnInit() {
    this.dataList = new Array<MyChartData>();
    this.question = this.inputs[0];
    this.surveyId = this.inputs[1];
    this.surveyName = this.inputs[2];
    this.locationId = this.inputs[3];
    this.departmentId = this.inputs[4];
    this.teamId = this.inputs[5];
    this.listSurvey = new Array<String>();
    this.choosenSurveys = new Array<Survey>();
    this.surveys = new Array<Survey>();
    let firstData = new MyChartData();
    this.compareData = new Array();
    firstData.surveyName = this.surveyName;
    firstData.answers = this.question.answers;
    this.dataList.push(firstData);
    this.createData(this.question.answers);
    this.reportSer.getSameSurvey(this.question.question.id,this.surveyId).subscribe(result => {
      this.surveys = result;
    });
  }
  addNewSurvey() {
    if (this.surveyIndex >= 0) {
      let chartData = new MyChartData();
      let currentSurvey =this.surveys[this.surveyIndex];
      chartData.surveyName = this.surveys[this.surveyIndex].name.toString();
      this.choosenSurveys.push(currentSurvey);
      this.surveys.splice(this.surveyIndex,1);
      this.reportSer
        .getCompareQuestionAnswer(
          currentSurvey.id,
          this.question.question.id,this.locationId,this.departmentId,this.teamId
        )
        .subscribe(result => {
          console.log(result);
          chartData.answers = result;
          this.dataList.push(chartData);
          this.createData(result);
        });


    }
  }
  removeSurvey(index, survey) {
    this.surveys.push(survey);
    this.choosenSurveys.splice(index,1);
    this.dataList.splice(index + 1,1);
    if(this.question.question.type.type == "TEXT") {
      this.compareData.splice(index + 1, 1);
    }else {
      this.createChartData();
    }

  }

  createData(data) {
    if(this.question.question.type.type == "TEXT") {
      if(this.dataList.length < 4) this.compareData.push(this.getWordCloud(data));
      else alert("You can only compare 4 survey at a time");
    }else {
      this.createChartData();
    }
  }

  closeModal() {
    this.modalSer.destroy();
  }

  createChartData() {
    this.compareData = new Array();
    this.question.question.options.forEach(e => {
      let series = new Array();
      this.dataList.forEach(d => {
        let isFound = false;
        for (let index = 0; index < d.answers.length; index++) {
          const element = d.answers[index];
          if (element.term == e.id.toString()) {
            let serie: Serie = {
              name: d.surveyName,
              value: element.weight.valueOf()
            };
            series.push(serie);
            isFound = true;
            break;
          }
        }
        if (!isFound) {
          let serie: Serie = {
            name: d.surveyName,
            value: 0
          };
          series.push(serie);
        }
      });


      let data: NormalizedChartData = {
        name: e.answerText.toString(),
        series: series
      };
      this.compareData.push(data);
    });
    console.log(this.compareData);
  }

  createWordCloudData() {

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

  sortBySerieValue = (a : NormalizedChartData,b) => {
    return b.series[0].value - a.series[0].value;
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
