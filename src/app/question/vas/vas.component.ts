import { VASOPTION } from './../../const/vasOption';
import { Answer } from './../../model/answer';

import { Component, OnInit, Output, EventEmitter,Input } from "@angular/core";

@Component({
  selector: "app-vas",
  templateUrl: "./vas.component.html",
  styleUrls: ["./vas.component.css"]
})
export class VasComponent implements OnInit {
  options = VASOPTION;
  emo = ['far fa-angry','far fa-frown','far fa-meh','far fa-smile-beam','far fa-grin-hearts']
  choosen ;
  @Input() answer :Answer;
  constructor() {}

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
