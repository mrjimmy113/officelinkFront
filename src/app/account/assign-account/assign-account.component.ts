import { DepartmentService } from "./../../service/department.service";
import { Department } from "src/app/model/department";
import { Workplace } from "./../../model/workplace";
import { AccountService } from "./../../service/account.service";
import { AssignInfor } from "./../../model/assignInfor";
import { ModalService } from "src/app/service/modal.service";
import { Component, OnInit, Input } from "@angular/core";
import { LocationService } from "../../service/location.service";
import { from } from "rxjs";
import { Location } from "../../model/location";
import { TeamService } from "../../service/team.service";
import { Team } from "../../model/team";
import { Account } from "src/app/model/account";
import { DialogService } from "src/app/service/dialog.service";
import {MyMessage} from "../../const/message"

@Component({
  selector: "app-assign-account",
  templateUrl: "./assign-account.component.html",
  styleUrls: ["./assign-account.component.css"]
})
export class AssignAccountComponent implements OnInit {
  @Input() inputs;
  locationId;
  teamId;
  teamName;
  
  locationList: Array<Location>;
  teamList: Array<Team>;
  requestStatus: Number;
  
  choosenTeamList: Array<number>;
  displayTeam: Array<String>;
  account: Account;
 
  departmentList: Array<Department>;
  choosenDep = 0;
  currentPage = 1;
  itemList;
  maxPage;
  

  test: String;
  testListName;

  constructor(
    private locationSer: LocationService,
    private teamSer: TeamService,
    private modalSer: ModalService,
    private accountSer: AccountService,
    private depSer: DepartmentService, 
    private dialogService : DialogService
  ) {}

  ngOnInit() {
    this.account = new Account();
    this.account.location = new Location();
    this.account.teams = new Array<Team>();

    this.locationId = 0;
    this.teamId = 0;
    this.displayTeam = new Array<String>();
    this.choosenTeamList = new Array<number>();
    this.getLocationByWorkplace();
    this.getInfoAssign();
    this.getDepartmentByWorkplace();
  }

  getLocationByWorkplace() {
    this.locationSer.getByWorkplace().subscribe(res => {
      this.locationList = res;
    });
  }
  getDepartmentByWorkplace() {
    this.depSer.getAll().subscribe(result => {
      this.departmentList = result;
    });
  }

  assignTeam() {
    if (this.teamId == undefined || this.teamId == 0) {
      //alert("Please choose a Team");
      this.dialogService.init("Choose Require", MyMessage.assignTeamRequire, undefined,undefined);
      return;
    }

    // if (this.choosenTeamList.includes(Number.parseInt(this.teamId))) {
    //   //alert("This team has already on the list");
    //   this.dialogService.init("Operation fail", MyMessage.addTeamToTeamListError, undefined,undefined);
    //   this.teamName = "";
    //   this.teamId = 0;
    //   return;
    // }

    this.displayTeam.forEach(team => {
        if(team ==  this.teamName){
          this.dialogService.init("Operation fail", MyMessage.addTeamToTeamListError, undefined,undefined);
          this.assignRemove(this.teamName);
          return;
        }
    })

    this.displayTeam.push(this.teamName);
    this.choosenTeamList.push(this.teamId);
    this.teamName = "";
    this.teamId = 0;
  }
  assignRemove(index) {
    this.displayTeam.splice(index, 1);
    this.choosenTeamList.splice(index, 1);
  }
  closeModal() {
    this.modalSer.destroy();
  }

 
  searchAccountNotAssign(value) {
    this.accountSer.searchAccountNotAssign(value, 1).subscribe(result => {
      this.maxPage = result.maxPage;
      this.itemList = result.objList;
      console.log(this.itemList)
    })
  }

  assign() {
    let assignInfor = new AssignInfor();
    if (!this.validate()) return;
    assignInfor.accountId = this.inputs;
    assignInfor.locationId = this.locationId;
    assignInfor.teamIdList = this.choosenTeamList;
    this.accountSer.assign(assignInfor).subscribe(result => {
      //alert("Assigned Successfully");
      this.searchAccountNotAssign("");
      this.dialogService.init("Assign Account", MyMessage.assignAccountSuccess , undefined ,() => {
        
        this.modalSer.destroy();
      });

     
      
    }, 
      error => {
        if(error.status == 400){
          this.dialogService.init("400", MyMessage.error400Message, undefined,undefined);
        }
      }
    );
    this.modalSer.destroy();
   
  }

  validate() {
    if (this.locationId == undefined || this.locationId == 0) {
      //alert("Please choose Location");
      this.dialogService.init("Choose Require", MyMessage.assignLocationRequire, undefined,undefined);
      return false;
    }
    if (this.choosenTeamList == undefined || this.choosenTeamList.length == 0) {
      //alert("The team list can not be empty");
      this.dialogService.init("Form Require", MyMessage.assignTeamRequire, undefined,undefined);
      return false;
    }
    return true;
  }

  chooseTeam(event: Event) {
    let choosenTeam: HTMLOptionsCollection = event.target["options"];
    if (choosenTeam.selectedIndex != 0) {
      this.teamName = this.teamList[choosenTeam.selectedIndex - 1].name;
    } else {
      this.teamName = "";
    }
  }

  getInfoAssign() {
    let assignInfor = new AssignInfor();
    assignInfor.accountId = this.inputs;
    this.accountSer
      .getAccountAssign(assignInfor.accountId)
      .subscribe(result => {
        this.account = result;
        if (this.account.location != null && this.account.location != undefined) {
          this.locationId = this.account.location.id;
        }
        if (result.teams != null && this.account.teams.length > 0) {
          this.choosenDep = result.teams[0].department.id.valueOf();
          this.teamSer.getTeamByDepId(this.choosenDep).subscribe(result => {
            this.teamList = result;
          });
          this.account.teams.forEach(result => {
            this.teamName = result.name;
            this.teamId = result.id;

            this.displayTeam.push(this.teamName);
            this.choosenTeamList.push(this.teamId);

            this.teamName = "";
            this.teamId = 0;
          });
        }
      });
  }

  loadTeam(event: Event) {
    let options: HTMLOptionsCollection = event.target["options"];
    let id: number = Number.parseInt(options[options.selectedIndex].value);
    if (id == 0) {
      this.teamList = new Array();
    } else {
      this.teamSer.getTeamByDepId(id).subscribe(result => {
        this.teamList = result;
      });
    }
  }
  removeAllTeam() {
    this.displayTeam = new Array();
    this.choosenTeamList = new Array();
  }
}
