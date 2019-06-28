import { SurveyCompareComponent } from './../survey-compare/survey-compare.component';
import { ModalService } from './../../service/modal.service';
import { Question } from './../../model/question';
import { Component, OnInit } from '@angular/core';
import { Survey } from 'src/app/model/survey';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { CloudOptions, CloudData } from 'angular-tag-cloud-module';

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
  options: CloudOptions = {
    // if width is between 0 and 1 it will be set to the size of the upper element multiplied by the value
    width: 1,
    height: 200,
    overflow: false,
  };

  data: CloudData[] = [
    {text: 'Good', weight: 8, color: "#"+((1<<24)*Math.random()|0).toString(16)},
    {text: 'Wonderful', weight: 5, color: "#"+((1<<24)*Math.random()|0).toString(16)},
    {text: 'Like', weight: 10, color: "#"+((1<<24)*Math.random()|0).toString(16)},
    {text: 'Awful', weight: 2, color: "#"+((1<<24)*Math.random()|0).toString(16)},
    {text: 'Well-done', weight: 6,  color: "#"+((1<<24)*Math.random()|0).toString(16)},
    {text: 'Hell', weight: 1, color: "#"+((1<<24)*Math.random()|0).toString(16)},
    {text: 'A', weight: 1,  color: "#"+((1<<24)*Math.random()|0).toString(16)},
    {text: 'B', weight: 2,  color: "#"+((1<<24)*Math.random()|0).toString(16)},
    {text: 'C', weight: 3,  color: "#"+((1<<24)*Math.random()|0).toString(16)},
    {text: 'D', weight: 4,  color: "#"+((1<<24)*Math.random()|0).toString(16)},
    {text: 'E', weight: 5,  color: "#"+((1<<24)*Math.random()|0).toString(16)},
    {text: 'F', weight: 6,  color: "#"+((1<<24)*Math.random()|0).toString(16)},
    {text: 'G', weight: 7,  color: "#"+((1<<24)*Math.random()|0).toString(16)},
    {text: 'H', weight: 8,  color: "#"+((1<<24)*Math.random()|0).toString(16)},
    {text: 'I', weight: 9,  color: "#"+((1<<24)*Math.random()|0).toString(16)},
    {text: 'J', weight: 10,  color: "#"+((1<<24)*Math.random()|0).toString(16)},
    {text: 'K', weight: 11,  color: "#"+((1<<24)*Math.random()|0).toString(16)},
    {text: 'L', weight: 12,  color: "#"+((1<<24)*Math.random()|0).toString(16)},
    {text: 'M', weight: 13,  color: "#"+((1<<24)*Math.random()|0).toString(16)},
    {text: 'N', weight: 14,  color: "#"+((1<<24)*Math.random()|0).toString(16)},
    {text: 'O', weight: 15,  color: "#"+((1<<24)*Math.random()|0).toString(16)},
    {text: 'P', weight: 16,  color: "#"+((1<<24)*Math.random()|0).toString(16)},

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
  }
  openCompare() {
    this.modalSer.init(SurveyCompareComponent,[],[]);
  }

}
