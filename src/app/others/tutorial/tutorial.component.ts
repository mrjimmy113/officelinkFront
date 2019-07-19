import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { DashBoard } from 'src/app/model/dashBoard';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.css']
})
export class TutorialComponent implements OnInit {
  @Input() dashBoard:DashBoard;
  constructor() { }

  ngOnInit() {
  }

}
