import { Component, OnInit } from '@angular/core';
import {LocationService} from '../../service/location.service'
import { from } from 'rxjs';
import { Location} from '../../model/location';
import {TeamService} from '../../service/team.service';
import {Team } from '../../model/team'

@Component({
  selector: 'app-assign-account',
  templateUrl: './assign-account.component.html',
  styleUrls: ['./assign-account.component.css']
})
export class AssignAccountComponent implements OnInit {

  locationList : Array<Location>;
  teamList : Array<Team>
  requestStatus : Number;
  newTeamIndex : Number;
  newTeam : Team;
  listTeam : String[];
  constructor(private locationSer : LocationService , private teamSer : TeamService) { }

  ngOnInit() {
    this.listTeam = new Array<String>();
    this.getLocationByWorkplace();
    this.getTeamByWorkplace();
    
  }

  getLocationByWorkplace(){
      this.locationSer.getByWorkplace().subscribe(res => {
        this.locationList = res
        
      })
  }
  getTeamByWorkplace(){
      this.teamSer.getByWorkplace().subscribe(res => {
        this.teamList = res;
      })
  }

  
  assignTeam() {
    if(this.newTeamIndex == null){
      alert("Input not empty. Try again")
    }else{
      console.log(this.newTeamIndex);
      this.listTeam.push(this.teamList[this.newTeamIndex].name);
    this.newTeam = "";
    }
    
  }
  assignRemove(index) {
    
    this.listTeam.splice(index , 1);
    
    
  }

  assign(){
    
  }
  
  

  

}
