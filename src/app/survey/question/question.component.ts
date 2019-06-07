import { AnswerOption } from './../../model/answerOption';
import { Question } from './../../model/question';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  @Input() question:Question;
  @Input() index:Number;
  @Output() updateEditMode = new EventEmitter();
  @Output() giveClassToParent = new EventEmitter();
  @Output() copyQ = new EventEmitter();
  @Output() deleteQ = new EventEmitter();
  isEditMode = false;
  constructor() { }

  ngOnInit() {
    this.question.options = new Array<AnswerOption>();
    console.log(this.updateEditMode);
    this.classToParent();
  }

  addOption() {
    this.question.options.push(new AnswerOption());
  }

  deleteOption(index) {
    this.question.options.splice(index,1);
  }
  enableEditMode() {
    this.updateEditMode.emit();
    this.isEditMode = true;
  }
  classToParent() {
    this.giveClassToParent.emit(this);
  }

  disableEditMode() {
    this.isEditMode = false;
  }

  copyQuestion() {
    this.copyQ.emit(this.index);
  }

  deleteQuestion() {
    this.deleteQ.emit(this.index);
  }

}
