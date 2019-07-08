import { ActivatedRoute } from '@angular/router';
import { Answer } from './../../model/answer';
import { SurveyService } from './../../service/survey.service';
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
  answers : Array<Answer>;
  token;
  constructor(private surveySer:SurveyService, private route:ActivatedRoute) { }

  ngOnInit() {
    this.survey = new Survey();
    this.answers = new Array<Answer>();
    this.route.params.subscribe(params => {
      this.token = params["token"];
      this.surveySer.getTakeSurvey(this.token).subscribe(result => {
        this.survey = result;
        this.survey.questions.forEach(element => {
          let answer = new Answer();
          answer.questionIdentity = element.questionIdentity;
          this.answers.push(answer);
        });
      })
    })

  }

  multipleAnswer(option : string, answerIndex) {
    let answer:String = "";
    if(!(this.answers[answerIndex].content == undefined)) {
      answer= this.answers[answerIndex].content + "";
    }
    if(answer.includes(option)) {
      answer.replace(option,"");
    }else {
      if(answer.trim().length == 0) {
        answer = option;
      }else {
        answer = answer + "," + option;
      }
    }
    this.answers[answerIndex].content = answer;
  }

  saveAnswer() {
    this.surveySer.sendAnswer(this.answers).subscribe(result => {
      alert("Thank you for taking out this survey");
    })
  }

}
