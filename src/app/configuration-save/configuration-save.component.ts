import { Component, OnInit, Input, Output } from '@angular/core';
import { Configuration } from '../model/configuration';
import { ModalService } from '../service/modal.service';
import { ConfigurationService } from '../service/configuration.service';
import { Survey } from '../model/survey';
import { SurveyService } from '../service/survey.service';

@Component({
  selector: 'app-configuration-save',
  templateUrl: './configuration-save.component.html',
  styleUrls: ['./configuration-save.component.css']
})
export class ConfigurationSaveComponent implements OnInit {
  @Input() inputs;
  @Output() outputs;
  requestStatus: Number;
  isEdit = false;
  configuration: Configuration;
  surveys: Array<Survey>;
  selectedSurveyId: Number = 0;
  second;
  minute;
  arrayOfMinutes = new Array<Number>();
  hour;
  arrayOfHours = new Array<Number>();
  dayOfMonth;
  month;
  dayOfWeeks = new Array();
  arrayOfWeekDays;

  constructor(private modalSer: ModalService, private configSer: ConfigurationService, private surveySer: SurveyService) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.generateMinuteAndWeekDays();
    this.getWorkplaceSurveys();
    if (this.inputs.length == 0) {
      this.configuration = new Configuration();
      this.configuration.survey = new Survey();
    } else {
      this.configuration = this.inputs;
      this.storeCronValue(this.configuration.scheduleTime);
      this.selectedSurveyId = this.configuration.survey.id;
      this.isEdit = true;
    }
    this.requestStatus = 0;
  }

  generateMinuteAndWeekDays() {
    for (let i = 0; i < 60; i++) {
      this.arrayOfMinutes.push(i);
    }

    for (let i = 0; i < 24; i++) {
      this.arrayOfHours.push(i);
    }

    this.arrayOfWeekDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  }

  getWorkplaceSurveys() {
    this.surveySer.getWorkplaceSurveys().subscribe(result => {
      this.surveys = result;
      console.log(this.surveys);
    })
  }

  closeModal() {
    this.modalSer.destroy();
  }

  add() {
    this.configuration.scheduleTime = this.constructCronExpression();
    this.configuration.survey.id = this.selectedSurveyId;
    this.configSer.create(this.configuration).subscribe(
      result => {
        this.requestStatus = result;
        if (this.requestStatus == 201) {
          alert("Create Successful");
          this.closeModal();
        }
        this.outputs();
      },
      error => {
        if (error.status == 409) {
          alert("Something went wrong");
        } else if (error.status = 400) {
          alert("Bad request");
        }
        this.closeModal();
        this.outputs();
      }
    );
  }

  update() {
    this.configuration.scheduleTime = this.constructCronExpression();
    this.configuration.survey.id = this.selectedSurveyId;
    this.configSer.update(this.configuration).subscribe(
      result => {
        this.requestStatus = result;
        if (this.requestStatus == 200) {
          alert("Update Successful");
          this.closeModal();
        }
        this.outputs();
      },
      error => {
        if (this.requestStatus == 400) alert("Bad request");
        this.requestStatus = 0;
      });
  }

  save() {
    console.log(this.selectedSurveyId);
    this.requestStatus = 1;
    if (this.isEdit) this.update();
    else this.add();
  }

  // get value of second, minute, hour,... in cron expression and store them in corresponding variables
  storeCronValue(cronExpression: String) {
    var list = cronExpression.split(" ");

    // the value * in cron means "for every", example "*" at "second" means "for every second"
    this.second = list[0];
    this.minute = list[1];
    this.hour = list[2];
    this.dayOfMonth = list[3];
    this.month = list[4];

    var temp = list[5].split(",");
    this.dayOfWeeks = temp;
  }

  getIndex(checkValue) {
    return this.dayOfWeeks.indexOf(checkValue);
  }

  changeWeekDays(wDay) {
    let index = this.getIndex(wDay);
    if (index >= 0) {
      this.dayOfWeeks.splice(index, 1);
    } else {
      this.dayOfWeeks.push(wDay);
    }
  }

  constructCronExpression() {
    this.second = this.second == null ? "1" : this.second;
    this.minute = this.minute == null ? "1" : this.minute;
    this.hour = this.hour == null ? "1" : this.hour;
    this.dayOfMonth = this.dayOfMonth == null ? "*" : this.dayOfMonth;
    this.month = this.month == null ? "*" : this.month;
    let dayOfWeeks = this.dayOfWeeks == null ? "*" : this.dayOfWeeks;

    let result = this.second + " " + this.minute + " " + this.hour + " " + this.dayOfMonth + " " + this.month + " " + dayOfWeeks
    return result;
  }
}