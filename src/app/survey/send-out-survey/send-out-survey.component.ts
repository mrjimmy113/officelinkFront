import { SurveyService } from './../../service/survey.service';
import { ModalService } from "./../../service/modal.service";
import { SendOutInfor } from "./../../model/sendOutInfor";
import { Location } from "./../../model/location";
import { TeamService } from "./../../service/team.service";
import { DepartmentService } from "./../../service/department.service";
import { LocationService } from "./../../service/location.service";
import { Component, OnInit, Input } from "@angular/core";
import { Department } from "src/app/model/department";
import { Team } from "src/app/model/team";
import { resource } from "selenium-webdriver/http";

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
    private surveySer:SurveyService
  ) {}

  ngOnInit() {
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

  loadTeam() {
    if (this.currentDepartment == undefined) {
      this.teamList = new Array<Team>();
      this.currentTeam = undefined;
    } else {
      this.teamSer
        .getTeamByDepId(this.currentDepartment.id)
        .subscribe(result => {
          this.teamList = result;
        });
    }
  }
  send() {
    this.surveySer.sendOutSurvey(this.inputs).subscribe(result => {
    })
  }
  updateDep() {
    if(this.currentLocation == undefined) {
      this.departmentSer.getAll().subscribe(result => {
        this.departmentList = result;
      })
    }else {
      this.departmentSer.getByLocationId(this.currentLocation.id).subscribe(result => {
        this.departmentList = result;
      })
    }
  }

  addInfor() {
    let sendOutInfor = new SendOutInfor();

    if (this.currentLocation == undefined) sendOutInfor.locationId = 0;
    else sendOutInfor.locationId = this.currentLocation.id;

    if (this.currentDepartment == undefined) sendOutInfor.departmentId = 0;
    else sendOutInfor.departmentId = this.currentDepartment.id;

    if (this.currentTeam == undefined) sendOutInfor.teamId = 0;
    else sendOutInfor.teamId = this.currentTeam.id;

    this.inforList.push(sendOutInfor);

    if (sendOutInfor.locationId == 0 && sendOutInfor.departmentId == 0) {
      this.inforList = new Array<SendOutInfor>();
      this.displayInforList = new Array<String>();
      this.displayInforList.push("All Employee");
    } else {
      this.inforList.forEach(element => {
        if (element.locationId == 0 && element.departmentId == 0) {
          this.inforList = new Array<SendOutInfor>();
          this.displayInforList = new Array<String>();
        }
      });
      if (sendOutInfor.teamId != 0) {
        for (var i = 0; i < this.inforList.length; i++) {
          if (this.inforList[i].departmentId == sendOutInfor.departmentId) {
            this.removeInfor(i);
          }
        }
        this.displayInforList.push(this.currentTeam.name);
        return;
      }

      if (sendOutInfor.locationId == 0 && sendOutInfor.departmentId != 0) {
        for (var i = 0; i < this.inforList.length; i++) {
          if (this.inforList[i].departmentId == sendOutInfor.departmentId) {
            this.removeInfor(i);
          }
        }
        this.displayInforList.push(this.currentDepartment.name);
        return;
      }

      if (sendOutInfor.locationId != 0 && sendOutInfor.departmentId == 0) {
        for (var i = 0; i < this.inforList.length; i++) {
          if (this.inforList[i].locationId == sendOutInfor.locationId) {
            this.removeInfor(i);
          }
        }
        this.displayInforList.push(this.currentLocation.address);
        return;
      }

      if (sendOutInfor.locationId != 0 && sendOutInfor.departmentId != 0) {
        this.displayInforList.push(
          this.currentLocation.address + " - " + this.currentDepartment.name
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
