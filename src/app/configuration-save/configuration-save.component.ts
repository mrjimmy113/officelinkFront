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
import { DialogService } from '../service/dialog.service';
import { MyMessage } from '../const/message';
import { Alert } from 'selenium-webdriver';

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
  confirmMessage = "";

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
    private displaySer: DisplayService,
    private dialogSer: DialogService
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
    if (this.configuration.duration == undefined || this.configuration.duration == null){
      this.configuration.duration = 1;
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
    console.log(this.months.length, " ", this.dayOfWeeks.length)
    if (this.months.length <= 0 && this.dayOfWeeks.length <= 0) {
      this.dialogSer.init(
        "Check your inputs",
        MyMessage.invalidScheduleTime,
        undefined,
        undefined
      );
      this.requestStatus = 0;
      return;
    }


    this.configuration.scheduleTime = this.constructCronExpression();
    this.dialogSer.init(
      "Confirm your schedule",
      this.confirmMessage,
      () => this.sendCreateRequest(),
      () => {return}
    );

    this.requestStatus = 0;
  }

  sendCreateRequest() {
    this.configuration.survey.id = this.selectedSurveyId;
    console.log(this.selectedSurveyId);
    this.configuration.active = true;
    this.surveySer.updateActiveStatus(this.selectedSurveyId, true).subscribe();
    
    this.configSer.create(this.configuration).subscribe(
      result => {
        this.requestStatus = result;
        if (this.requestStatus == 201) {
          this.dialogSer.init(
            "Operation success",
            MyMessage.createSurveyRoutine,
            undefined,
            () => this.closeModal()
          );
        }
        this.outputs();
      },
      error => {
        if (error.status == 409) {
          this.dialogSer.init(
            "Operation fail",
            MyMessage.error400Message,
            undefined,
            undefined
          );
        } else if (error.status = 400) {
          this.dialogSer.init(
            "Operation fail",
            MyMessage.error400Message,
            undefined,
            undefined
          );
        }
        this.requestStatus = 0;
        this.outputs();
      }
    );
  }

  // update() {
  //   this.configuration.scheduleTime = this.constructCronExpression();
  //   this.configuration.survey.id = this.selectedSurveyId;
  //   this.configSer.update(this.configuration).subscribe(
  //     result => {
  //       this.requestStatus = result;
  //       if (this.requestStatus == 200) {
  //         this.dialogSer.init(
  //           "Operation success",
  //           MyMessage.updateSurveyRoutine,
  //           undefined,
  //           () => this.closeModal()
  //         );
  //       }
  //       this.outputs();
  //     },
  //     error => {
  //       if (error.status == 409) {
  //         this.dialogSer.init(
  //           "Operation fail",
  //           MyMessage.error400Message,
  //           undefined,
  //           undefined
  //         );
  //       } else if (error.status = 400) {
  //         this.dialogSer.init(
  //           "Operation fail",
  //           MyMessage.error400Message,
  //           undefined,
  //           undefined
  //         );
  //       }
  //       this.requestStatus = 0;
  //       this.outputs();
  //     }
  //   );
  // }

  save() {
    //#region Send out infor
    let sendOutList = this.inforList;
    let sendSurvey = new SendSurvey();
    if (sendOutList.length <= 0){
      this.dialogSer.init(
        "Check your inputs",
        MyMessage.targetListEmpty,
        undefined,
        undefined
      );
      return;
    }
    if(this.configuration.duration == undefined) {
      this.dialogSer.init(
        "Check your inputs",
        MyMessage.createDepartment,
        undefined,
        undefined
      );
      return;
    }
    if(this.configuration.duration <= 0) {
      this.dialogSer.init(
        "Check your inputs",
        MyMessage.durationInvalid,
        undefined,
        undefined
      );
      return;
    }
    sendSurvey.surveyId = this.selectedSurveyId;
    sendSurvey.targetList = sendOutList;
    this.configuration.sendSurvey = sendSurvey;

    //#endregion
    this.requestStatus = 1;
    this.add();
    // if (this.isEdit) this.update();
    // else this.add();
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
    this.confirmMessage = "Your survey will be sent on ";

    this.second = this.second == null ? "0" : this.second;
    this.minute = this.minute == null ? "0" : this.minute;
    this.hour = this.hour == null ? "0" : this.hour;
    this.dayOfMonth = this.dayOfMonth == null ? "?" : this.dayOfMonth;
    let months = this.months;
    let dayOfWeeks = this.dayOfWeeks.length <= 0 ? "?" : this.dayOfWeeks;

    if (this.months.length <= 0) {
      alert("Stop");
      return;
    }

    if (this.dayOfWeeks.length <= 0) {
      this.dayOfMonth = "1";
      this.confirmMessage = this.confirmMessage + "the " + this.dayOfMonth + "th of every " + this.months + " at " + (Number(this.hour) < 10 ? "0"+this.hour: this.hour)  + ":" + (Number(this.minute) < 10 ? "0"+this.minute : this.minute);
    } else {
      this.dayOfMonth = "?";
    }

    if (this.dayOfWeeks.length > 0 && this.months.length > 0) {
      this.confirmMessage = this.confirmMessage + "every " + this.dayOfWeeks + " of every " + this.months + " at " + (Number(this.hour) < 10 ? "0"+this.hour: this.hour)  + ":" + (Number(this.minute) < 10 ? "0"+this.minute : this.minute);
    }

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
        this.dialogSer.init(
          "Check your inputs",
          MyMessage.duplicatedTarget,
          undefined,
          undefined
        );
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
      this.dialogSer.init(
        "Check your inputs",
        MyMessage.targetListEmpty,
        undefined,
        undefined
      );
      return;
    }
    if(this.configuration.duration == undefined) {
      this.dialogSer.init(
        "Check your inputs",
        MyMessage.createDepartment,
        undefined,
        undefined
      );
      return;
    }
    if(this.configuration.duration <= 0) {
      this.dialogSer.init(
        "Check your inputs",
        MyMessage.durationInvalid,
        undefined,
        undefined
      );
      return;
    }
    sendSurvey.surveyId = this.inputs;
    sendSurvey.targetList = sendOutList;
    sendSurvey.duration = this.configuration.duration;
    this.displaySer.showLoader();
    this.surveySer.sendOutSurvey(sendSurvey).subscribe(result => {
      this.dialogSer.init(
        "Operation success",
        MyMessage.surveySent,
        undefined,
        () => this.modalSer.destroy()
      );
      this.displaySer.hideLoader();
      this.outputs();
    })
  }
  //#endregion
}
