import { Workplace } from './../../model/workplace';
import { AccountService } from './../../service/account.service';
import { AssignInfor } from './../../model/assignInfor';
import { ModalService } from "src/app/service/modal.service";
import { Component, OnInit, Input } from "@angular/core";
import { LocationService } from "../../service/location.service";
import { from } from "rxjs";
import { Location } from "../../model/location";
import { TeamService } from "../../service/team.service";
import { Team } from "../../model/team";
import { Account } from 'src/app/model/account';

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
  listmTeamId;
  locationList: Array<Location>;
  teamList: Array<Team>;
  requestStatus: Number;
  newTeamIndex: Number;
  newTeam: Team;
  choosenTeamList : Array<number>;
  displayTeam: Array<String>;
  account : Account;
  location : Location;
  workplace : Workplace;
  teamAssigned : Array<Team>;
  teamAssignedList ;

  
  constructor(
    private locationSer: LocationService,
    private teamSer: TeamService,
    private modalSer: ModalService,
    private accountSer:AccountService,
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
    this.getTeamByWorkplace();
    this.getInfoAssign(); 
  }

  getLocationByWorkplace() {
    this.locationSer.getByWorkplace().subscribe(res => {
      this.locationList = res;
    });
  }
  getTeamByWorkplace() {
    this.teamSer.getByWorkplace().subscribe(res => {
      this.teamList = res;
    });
  }

  assignTeam() {
    this.displayTeam.push(this.teamName);
    this.choosenTeamList.push(this.teamId);
    this.teamName = '';
    this.teamId = 0;
  }
  assignRemove(index) {
    this.displayTeam.splice(index, 1);
    this.choosenTeamList.splice(index,1);
  }
  closeModal() {
    this.modalSer.destroy();
  }

  assign() {
    let assignInfor = new AssignInfor();
    assignInfor.accountId = this.inputs;
    assignInfor.locationId = this.locationId;
    assignInfor.teamIdList = this.choosenTeamList;
    this.accountSer.assign(assignInfor).subscribe(result => {
      alert("Assigned Successfully");
      this.modalSer.destroy();
    })
  }

  chooseTeam(event :Event) {
    let choosenTeam : HTMLOptionsCollection = event.target['options'];
    if(choosenTeam.selectedIndex != 0)
    this.teamName = this.teamList[choosenTeam.selectedIndex -1 ].name;
    else this.teamName = '';
  }

  getInfoAssign(){
    this.accountSer.getAccountAssign().subscribe(result => {
      this.account = result
      this.teamAssigned = this.account.teams;
      this.teamAssignedList =  this.teamAssigned.map(x => x.name).join(" - ")
      
       console.log(this.account);  
    })
  }



}
