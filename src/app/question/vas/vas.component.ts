import { Answer } from './../../model/answer';

import { Component, OnInit, Output, EventEmitter,Input } from "@angular/core";

@Component({
  selector: "app-vas",
  templateUrl: "./vas.component.html",
  styleUrls: ["./vas.component.css"]
})
export class VasComponent implements OnInit {
  options = new Array(5);
  text = ['Extremely Unsatisfied', 'Unsatisfied', 'Neutral', 'Satisfied','Extremely Satisfied'];
  emo = ['far fa-angry','far fa-frown','far fa-meh','far fa-smile-beam','far fa-grin-hearts']
  choosen = 0;
  @Input() answer :Answer;
  constructor() {}

  ngOnInit() {}

  choose(value) {
    this.choosen = value;
    this.answer.content = value;
    this.answer.point = value;
  }
}
