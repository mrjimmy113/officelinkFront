import { Router } from '@angular/router';
import { SurveyService } from './../../service/survey.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {
  itemList;
  currentPage = 1;
  maxPage;
  searchTerm = "";
  requestStatus: Number;
  constructor(private surveySer:SurveyService, private route:Router) { }

  ngOnInit() {
    this.itemList = new Array();
    this.surveySer.getReportList(this.searchTerm, this.currentPage - 1).subscribe(result => {
      this.itemList = result.objList;
      this.maxPage = result.maxPage;
      console.log(this.itemList);
    })
  }
  goDetaild(id) {
    this.route.navigateByUrl(`/report/detail/${id}`);
  }

  sort(property) {

  }

}
