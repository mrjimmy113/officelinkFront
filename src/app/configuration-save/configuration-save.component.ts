import { SendSurvey } from './../model/sendSurvey';
import { Location } from './../model/location';
import { DepartmentService } from './../service/department.service';
import { LocationService } from './../service/location.service';
import { DisplayService } from 'src/app/service/display.service';
import { Team } from "./../model/team";
import { Department } from "src/app/model/department";
import { Component, OnInit, Input, Output } from "@angular/core";
import { Configuration } from "../model/configuration";
import { ModalService } from "../service/modal.service";
import { ConfigurationService } from "../service/configuration.service";
import { Survey } from "../model/survey";
import { SurveyService } from "../service/survey.service";
import { SendOutInfor } from "../model/sendOutInfor";
import { TeamService } from '../service/team.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: "app-configuration-save",
  templateUrl: "./configuration-save.component.html",
  styleUrls: ["./configuration-save.component.css"]
})
export class ConfigurationSaveComponent implements OnInit {
  @Input() inputs;
  @Output() outputs;
  requestStatus: Number;
  isEdit = false;
  isRoutine = false;
  configuration: Configuration;
  surveys: Array<Survey>;
  selectedSurveyId: Number = 0;
  second;
  minute = '0';
  arrayOfMinutes = new Array<Number>();
  hour = '0';
  arrayOfHours = new Array<Number>();
  dayOfMonth;
  months = new Array();
  arrayOfMonths;
  dayOfWeeks = new Array();
  arrayOfWeekDays;

  //Send out infor
  locationList: Array<Location>;
  departmentList: Array<Department>;
  teamList: Array<Team>;
  inforList: Array<SendOutInfor>;
  displayInforList: Array<String>;
  currentLocation: Location;
  currentDepartment: Department;
  currentTeam: Team;

  constructor(
    private modalSer: ModalService,
    private configSer: ConfigurationService,
    private surveySer: SurveyService,
    private locationSer: LocationService,
    private departmentSer: DepartmentService,
    private teamSer: TeamService,
    private displaySer:DisplayService
  ) {}

  ngOnInit() {
    this.init();
  }

  init() {
    this.generateMinuteAndWeekDays();
    //Send out infor
    this.currentLocation = new Location();
    this.currentLocation.id = 0;
    this.currentDepartment = new Department();
    this.currentDepartment.id = 0;

    this.locationSer.getAllLocation().subscribe(result => {
      this.locationList = result;
    });
    this.departmentSer.getAll().subscribe(result => {
      this.departmentList = result;
    });
    this.teamList = new Array<Team>();
    this.displayInforList = new Array<String>();
    this.inforList = new Array<SendOutInfor>();

    if (typeof(this.inputs) == 'number') {
      this.configuration = new Configuration();
      this.configuration.survey = new Survey();
      this.selectedSurveyId = this.inputs;
    } else {
      this.configuration = this.inputs;
      this.storeCronValue(this.configuration.scheduleTime);
      this.selectedSurveyId = this.configuration.survey.id;
      this.isEdit = true;
      //#region Send out infor
      let targetList = this.configuration.sendSurvey.targetList;
      for (let index = 0; index < targetList.length; index++) {
        let target = targetList[index];
        if(target.locationId == 0 && target.departmentId == 0) {
          this.inforList = new Array();
          this.displayInforList = new Array();
          this.inforList.push(target);
          this.displayInforList.push("All Company");
          break;
        }
        if(target.locationId != 0 && target.departmentId == 0) {
          this.inforList.push(target);
          this.displayInforList.push(target.locationName);
          continue;
        }
        if(target.locationId == 0 && target.departmentId != 0) {
          this.inforList.push(target);
          this.displayInforList.push(target.departmentName);
          continue;
        }
        if(target.locationId != 0 && target.departmentId != 0 && target.teamId == 0) {
          this.inforList.push(target);
          this.displayInforList.push(target.locationName + target.departmentName.valueOf());
          continue;
        }
        if(target.locationId != 0 && target.departmentId != 0 && target.teamId != 0) {
          this.inforList.push(target);
          this.displayInforList.push(target.teamName);
          continue;
        }
      }
      //#endregion
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
    this.arrayOfMonths = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  }


  closeModal() {
    this.modalSer.destroy();
  }

  add() {
    this.configuration.scheduleTime = this.constructCronExpression();
    this.configuration.survey.id = this.selectedSurveyId;
    this.configuration.isActive = true;
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
        } else if ((error.status = 400)) {
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
      }
    );
  }

  save() {
    //#region Send out infor
    let sendOutList = this.inforList;
    let sendSurvey = new SendSurvey();
    if (sendOutList.length <= 0){
      alert("You must choose at least a target to send.")
      return;
    }
    if(this.configuration.duration == undefined) {
      alert("Duration must be chosen.")
      return;
    }
    if(this.configuration.duration <= 0) {
      alert("Duration cannot be zero or negative.")
      return;
    }
    sendSurvey.surveyId = this.selectedSurveyId;
    sendSurvey.targetList = sendOutList;
    this.configuration.sendSurvey = sendSurvey;

    //#endregion
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
    this.months = list[4].split(",");
    this.dayOfWeeks = list[5].split(",");
  }

  getWeekDaysIndex(checkValue) {
    return this.dayOfWeeks.indexOf(checkValue);
  }

  getMonthsIndex(checkValue) {
    return this.months.indexOf(checkValue);
  }

  changeWeekDays(wDay) {
    let index = this.getWeekDaysIndex(wDay);
    if (index >= 0) {
      this.dayOfWeeks.splice(index, 1);
    } else {
      this.dayOfWeeks.push(wDay);
    }
  }

  changeMonths(month) {
    let index = this.getMonthsIndex(month);
    if (index >= 0) {
      this.months.splice(index, 1);
    } else {
      this.months.push(month);
    }
  }

  constructCronExpression() {
    this.second = this.second == null ? "0" : this.second;
    this.minute = this.minute == null ? "0" : this.minute;
    this.hour = this.hour == null ? "0" : this.hour;
    this.dayOfMonth = this.dayOfMonth == null ? "*" : this.dayOfMonth;
    let months = this.months.length <= 0 ? "*" : this.months;
    let dayOfWeeks = this.dayOfWeeks.length <= 0 ? "*" : this.dayOfWeeks;

    let result =
      this.second +
      " " +
      this.minute +
      " " +
      this.hour +
      " " +
      this.dayOfMonth +
      " " +
      months +
      " " +
      dayOfWeeks;

      console.log(result);
    return result;
  }

  //#region Send out infor
  loadTeam(event: Event) {
    let options: HTMLOptionsCollection = event.target["options"];
    this.currentDepartment.name = options[options.selectedIndex].text;
    this.currentTeam = undefined;
    if (this.currentDepartment.id == 0) {
      this.locationSer.getAllLocation().subscribe(result => {
        this.locationList = result;
      });
    } else {
      this.locationSer
        .getByDepId(this.currentDepartment.id)
        .subscribe(result => {
          this.locationList = result;
        });
    }
    if (this.currentDepartment.id == 0 && this.currentLocation.id) {
      this.teamList = new Array<Team>();
    } else {
      this.teamSer
        .getTeamByDepId(this.currentDepartment.id)
        .subscribe(result => {
          this.teamList = result;
        });
    }
  }

  updateDep(event: Event) {
    let options: HTMLOptionsCollection = event.target["options"];
    this.currentLocation.name = options[options.selectedIndex].text;
    if (this.currentLocation.id == 0) {
      this.departmentSer.getAll().subscribe(result => {
        this.departmentList = result;
        console.log(result);
      });
    } else {
      this.departmentSer
        .getByLocationId(this.currentLocation.id)
        .subscribe(result => {
          this.departmentList = result;
          console.log(result);
        });
    }
  }

  addInfor() {
    //Send Out Infor
    let sendOutInfor = new SendOutInfor();
    sendOutInfor.locationId = this.currentLocation.id.valueOf();
    sendOutInfor.departmentId = this.currentDepartment.id.valueOf();
    if (this.currentTeam == undefined) sendOutInfor.teamId = 0;
    else sendOutInfor.teamId = this.currentTeam.id.valueOf();

    //Check Duplicate
    for (let index = 0; index < this.inforList.length; index++) {
      let dupLocation =
        sendOutInfor.locationId == this.inforList[index].locationId;
      let dupDep =
        sendOutInfor.departmentId == this.inforList[index].departmentId;
      let dupTeam = sendOutInfor.teamId == this.inforList[index].teamId;
      if ((dupLocation && dupDep) || dupTeam) {
        alert("Duplicated Target");
        return;
      };
    }

    this.inforList.push(sendOutInfor);

    //Display Infor
    if (sendOutInfor.locationId == 0 && sendOutInfor.departmentId == 0) {
      this.displayInforList.push("All Employee");
    } else {
      //Team
      if (sendOutInfor.teamId != 0) {
        this.displayInforList.push(this.currentTeam.name);
        return;
      }

      //Department
      if (sendOutInfor.locationId == 0 && sendOutInfor.departmentId != 0) {
        this.displayInforList.push(this.currentDepartment.name);
        return;
      }

      //Location
      if (sendOutInfor.locationId != 0 && sendOutInfor.departmentId == 0) {
        this.displayInforList.push(this.currentLocation.name);
        return;
      }

      //Location - Department
      if (sendOutInfor.locationId != 0 && sendOutInfor.departmentId != 0) {
        this.displayInforList.push(
          this.currentLocation.name + " - " + this.currentDepartment.name
        );
        return;
      }
    }
  }
  removeInfor(index) {
    this.inforList.splice(index, 1);
    this.displayInforList.splice(index, 1);
  }
  send() {
    let sendOutList = this.inforList;
    let sendSurvey = new SendSurvey();
    if (sendOutList.length <= 0){
      alert("You must choose at least a target to send.")
      return;
    }
    if(this.configuration.duration == undefined) {
      alert("Duration must be chosen.")
      return;
    }
    if(this.configuration.duration <= 0) {
      alert("Duration cannot be zero or negative.")
      return;
    }
    sendSurvey.surveyId = this.inputs;
    sendSurvey.targetList = sendOutList;
    sendSurvey.duration = this.configuration.duration;
    this.displaySer.showLoader();
    this.surveySer.sendOutSurvey(sendSurvey).subscribe(result => {
      alert("Your survey has been sent");
      this.modalSer.destroy();
      this.displaySer.hideLoader();
      this.outputs();
    })
  }
  //#endregion
}
