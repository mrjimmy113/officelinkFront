import { ModalService } from './../../service/modal.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective, Label, Color } from 'ng2-charts';
import { ChartDataSets, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-survey-compare',
  templateUrl: './survey-compare.component.html',
  styleUrls: ['./survey-compare.component.css']
})
export class SurveyCompareComponent implements OnInit {
  listEmail: String[];
  newEmail:String;
  public lineChartData: ChartDataSets[] = [
    { data: [60], label: 'Wonderful' },
    { data: [30], label: 'Good' },
    { data: [5], label: 'Not bad' },
    { data: [3], label: 'Bad' },
    { data: [2], label: 'Unacceptable' },
  ];
  public lineChartLabels: Label[] = ['Survey 1'];
  public lineChartType = 'line';



  constructor(private modalSer:ModalService) { }

  ngOnInit() {
    this.listEmail = new Array<String>();
  }
  addNewEmail() {
    this.lineChartLabels.push('Survey 2');
    this.lineChartData[0].data = [60,50];
    this.lineChartData[1].data = [30,25];
    this.lineChartData[2].data = [5,15];
    this.lineChartData[3].data = [3,6];
    this.lineChartData[4].data = [2,4];
    this.listEmail.push(this.newEmail);
    this.newEmail = "";
  }
  removeEmail(index) {
    this.listEmail.splice(index,1);
  }
  closeModal() {
    this.modalSer.destroy();
  }

}
