import { Question } from './../../model/question';
import { Component, OnInit } from '@angular/core';
import { Survey } from 'src/app/model/survey';

@Component({
  selector: 'app-survey-take',
  templateUrl: './survey-take.component.html',
  styleUrls: ['./survey-take.component.css']
})
export class SurveyTakeComponent implements OnInit {
  survey : Survey;
  constructor() { }

  ngOnInit() {
    this.survey = new Survey();
    this.survey.name = "Experience of the new Cafeteria";
    this.survey.questions = new Array<Question>();
    let q = new Question();
    q.question = "How you rate the services ?";
    q.options = ["Wonderful", "Good", " Not Bad", "Bad", "Unacceptable"]
    this.survey.questions.push(q);
    this.survey.questions.push(q);
    this.survey.questions.push(q);
    this.survey.questions.push(q);
  }

}
