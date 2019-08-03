import { AuthenticationService } from './../../service/authentication.service';
import { ReportService } from './../../service/report.service';
import { Component, OnInit } from '@angular/core';
import { DashBoard } from 'src/app/model/dashBoard';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {
  dashBoard : DashBoard
  tutorial = false;
  role;
  constructor(private reportSer:ReportService, private authSer:AuthenticationService) { }

  ngOnInit() {
    this.role = this.authSer.getRole();
    this.dashBoard = new DashBoard();
    this.reportSer.getDashBoard().subscribe(result => {
      this.dashBoard = result;
      this.tutorial = this.isTutorial();
    })
  }

  isTutorial(): boolean {
    if(this.role != 'employer') return false;
    if(this.dashBoard.account == 0) return true;

    if(this.dashBoard.department == 0) return true;

    if(this.dashBoard.team == 0) return true;

    if(this.dashBoard.news == null || this.dashBoard.news == undefined) return true;

    if(this.dashBoard.location.length == 0) return false;

    return false;
  }

}
