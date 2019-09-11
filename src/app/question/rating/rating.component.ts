import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';


@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  options = new Array(10);
  choosen = 0;
  @Input() answer
  constructor() {

  }

  ngOnInit() {


  }

  choose(value) {
    this.choosen = value;
    this.answer.content = value;
    this.answer.point = value;
  }

}
