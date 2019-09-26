import { Answer } from './../../model/answer';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';


@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  options = new Array(10);
  choosen = 0;
  @Input() answer : Answer
  constructor() {

  }

  ngOnInit() {
    if(this.answer.content != undefined) {
      this.choosen = this.answer.point.valueOf();
    }

  }

  choose(value) {
    this.choosen = value;
    this.answer.content = value;
    this.answer.point = value;
  }

}
