import { EventEmitter } from '@angular/core';
import { Component, OnInit, Input ,Output} from '@angular/core';
import { CategoryReport } from 'src/app/model/categoryReport';


@Component({
  selector: 'app-question-report-list',
  templateUrl: './question-report-list.component.html',
  styleUrls: ['./question-report-list.component.css']
})
export class QuestionReportListComponent implements OnInit {
  @Input() itemList : CategoryReport[];
  @Input() surveyId: number;
  @Input() locationId: number;
  @Input() departmentId: number;
  @Input() teamId : number;
  constructor() { }

  ngOnInit() {
  }

}
