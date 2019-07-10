import { SendSurvey } from './../../model/sendSurvey';
import { SurveyService } from "./../../service/survey.service";
import { ModalService } from "./../../service/modal.service";
import { SendOutInfor } from "./../../model/sendOutInfor";
import { Location } from "./../../model/location";
import { TeamService } from "./../../service/team.service";
import { DepartmentService } from "./../../service/department.service";
import { LocationService } from "./../../service/location.service";
import { Component, OnInit, Input } from "@angular/core";
import { Department } from "src/app/model/department";
import { Team } from "src/app/model/team";

@Component({
  selector: "app-send-out-survey",
  templateUrl: "./send-out-survey.component.html",
  styleUrls: ["./send-out-survey.component.css"]
})
export class SendOutSurveyComponent implements OnInit {
  @Input() inputs;
  locationList: Array<Location>;
  departmentList: Array<Department>;
  teamList: Array<Team>;
  inforList: Array<SendOutInfor>;
  displayInforList: Array<String>;
  currentLocation: Location;
  currentDepartment: Department;
  currentTeam: Team;
  constructor(
    private locationSer: LocationService,
    private departmentSer: DepartmentService,
    private teamSer: TeamService,
    private modalSer: ModalService,
    private surveySer: SurveyService
  ) {}

  ngOnInit() {
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
  }
  close() {
    this.modalSer.destroy();
  }

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
  send() {
    let sendOutList = this.filterSendOutList(this.inforList);
    let sendSurvey = new SendSurvey();
    sendSurvey.surveyId = this.inputs;
    sendSurvey.targetList = sendOutList;
    this.surveySer.sendOutSurvey(sendSurvey).subscribe(result => {
      console.log(result);
    })
  }

  filterSendOutList(list: SendOutInfor[]) : SendOutInfor[] {
    let targetList = new Array<SendOutInfor>();
    for (let index = 0; index < list.length; index++) {
      let infor: SendOutInfor = list[index];
      if (infor.locationId == 0 && infor.departmentId == 0) {
        targetList = new Array<SendOutInfor>();
        targetList.push(list[index]);
        break;
      }
      if (infor.locationId != 0 && infor.departmentId == 0) {
        targetList.push(list[index]);
      }
      if (infor.locationId == 0 && infor.departmentId != 0) {
        targetList.push(list[index]);
      }
      if (
        infor.locationId != 0 &&
        infor.departmentId != 0 &&
        infor.teamId != 0
      ) {
        let isFound = false;
        for (let j = 0; j < list.length; j++) {
          if (
            list[index].departmentId ==
            list[j].departmentId ||
            list[index].locationId == list[j].locationId
          ) {
            isFound = true;
          }
        }
        if (!isFound) {
          targetList.push(list[index]);
        }
      }
    }
    return targetList;
  }

  updateDep(event: Event) {
    let options: HTMLOptionsCollection = event.target["options"];
    this.currentLocation.name = options[options.selectedIndex].text;
    if (this.currentLocation.id == 0) {
      this.departmentSer.getAll().subscribe(result => {
        this.departmentList = result;
      });
    } else {
      this.departmentSer
        .getByLocationId(this.currentLocation.id)
        .subscribe(result => {
          this.departmentList = result;
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
      if (dupLocation && dupDep && dupTeam) {
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
}
