import { ActivatedRoute } from '@angular/router';
import { AnswerOption } from './../../model/answerOption';
import { SurveyReport } from './../../model/surveyReport';
import { SurveyService } from './../../service/survey.service';
import { SurveyCompareComponent } from './../survey-compare/survey-compare.component';
import { ModalService } from './../../service/modal.service';
import { Component, OnInit } from '@angular/core';
import { CloudOptions, CloudData } from 'angular-tag-cloud-module';
import { AnswerReport } from 'src/app/model/answerReport';

@Component({
  selector: 'app-survey-report',
  templateUrl: './survey-report.component.html',
  styleUrls: ['./survey-report.component.css']
})
export class SurveyReportComponent implements OnInit {
  surveyReport:SurveyReport;
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  options: CloudOptions = {
    width: 1,
    height: 200,
    overflow: false,
  };
  reportData: Array<any>;



  constructor(private modalSer:ModalService, private surveySer:SurveyService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.surveyReport = new SurveyReport();
    this.reportData = new Array<any>();
    this.route.params.subscribe(params =>{
      this.surveySer.getReportAll(params['id']).subscribe(result => {
        this.surveyReport = result;
        console.log(result);
        this.surveyReport.questions.forEach(element => {
          if(element.question.type.type == 'TEXT') {
            this.reportData.push(this.getWordCloud(element.answers));
          }else {
            this.reportData.push(this.getChartParam(element.answers, element.question.options));
          }
        });
      })
    })
  }
  openCompare() {
    this.modalSer.init(SurveyCompareComponent,[],[]);
  }

  getWordCloud(answers : Array<AnswerReport>): CloudData[] {
    let dataList = new Array<CloudData>();
    answers.forEach(element => {
      let data:CloudData = {
        text: element.term.toString(),
        weight: element.weight.valueOf(),
        color:"#"+((1<<24)*Math.random()|0).toString(16)
      }
      dataList.push(data);
    });
    return dataList;
  }

  getChartParam(answers: AnswerReport[], answerTexts :AnswerOption[]): NgxChartParam[] {
    let dataList = new Array<NgxChartParam>();
    answerTexts.forEach(element => {
      let data:NgxChartParam = {
        name: element.answerText.toString(),
        value: this.getOptionValue(element.id.valueOf(),answers),
      }
      dataList.push(data);
    });
    return dataList;
  }

  getOptionValue(id : number, answers: AnswerReport[]) : number {
    for (let index = 0; index < answers.length; index++) {
      if(Number(answers[index].term).valueOf() == id) {
        return answers[index].weight.valueOf();
      }
    }

    return 0;
  }


}
interface NgxChartParam {
  name:string;
  value:number;
}

