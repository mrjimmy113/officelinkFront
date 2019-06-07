import { SurveyCompareComponent } from './../survey-compare/survey-compare.component';
import { ModalService } from './../../service/modal.service';
import { Question } from './../../model/question';
import { Component, OnInit } from '@angular/core';
import { Survey } from 'src/app/model/survey';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-survey-report',
  templateUrl: './survey-report.component.html',
  styleUrls: ['./survey-report.component.css']
})
export class SurveyReportComponent implements OnInit {
  public doughnutChartLabels: Label[] = ["Wonderful", "Good", "Not Bad", "Bad", "Unacceptable"]
  public doughnutChartData: MultiDataSet = [
    [50, 20, 10,10,10],
  ];

  public doughnutChartType: ChartType = 'doughnut';
  survey : Survey;
  constructor(private modalSer:ModalService) { }

  ngOnInit() {
    this.survey = new Survey();
    this.survey.name = "Experience of the new Cafeteria";
    this.survey.questions = new Array<Question>();
    let q = new Question();
    q.question = "How you rate the services ?";

    this.survey.questions.push(q);
    this.survey.questions.push(q);
    this.survey.questions.push(q);
    this.survey.questions.push(q);
  }
  openCompare() {
    this.modalSer.init(SurveyCompareComponent,[],[]);
  }

}
