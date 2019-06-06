import { QuestionComponent } from './../question/question.component';
import { Question } from './../../model/question';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-survey-save',
  templateUrl: './survey-save.component.html',
  styleUrls: ['./survey-save.component.css']
})
export class SurveySaveComponent implements OnInit {
  questionList: Question[];
  qComponentList: QuestionComponent[];
  constructor() { }

  ngOnInit() {
    this.questionList = new Array<Question>();
    this.qComponentList = new Array<QuestionComponent>();
  }

  updateEditMode() {
    this.qComponentList.forEach(element => {
      element.disableEditMode();
    });
  }
  getChildInfor(infor) {
    this.qComponentList.push(infor);
  }

  addQuestion() {
    this.questionList.push(new Question());
  }

  copyQ(index) {
    let tmpQ = this.questionList[index];
    this.questionList.push(tmpQ);
  }
  deleteQ(index) {
    this.questionList.splice(index,1);
    this.qComponentList.splice(index,1);
  }
}
