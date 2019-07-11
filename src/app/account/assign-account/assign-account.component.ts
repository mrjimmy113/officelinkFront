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
  constructor(private locationSer : LocationService , private teamSer : TeamService) { }

  ngOnInit() {
    this.getLocationByname("");
   
    
  }

  getLocationByname(value){
      this.locationSer.searchByName(value).subscribe(res => {
        this.locationList = res.objList
        
      })
  }

  

}
