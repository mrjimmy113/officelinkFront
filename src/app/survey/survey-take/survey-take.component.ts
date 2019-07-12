import { SurveyAnswerInfor } from './../../model/surveyAnswerInfor';
import { AuthenticationService } from "./../../service/authentication.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Answer } from "./../../model/answer";
import { SurveyService } from "./../../service/survey.service";
import { Question } from "./../../model/question";
import { Component, OnInit } from "@angular/core";
import { Survey } from "src/app/model/survey";

@Component({
  selector: "app-survey-take",
  templateUrl: "./survey-take.component.html",
  styleUrls: ["./survey-take.component.css"]
})
export class SurveyTakeComponent implements OnInit {
  survey: Survey;
  answers: Array<Answer>;
  isLogin = this.authSer.isLogin();
  token;
  constructor(
    private surveySer: SurveyService,
    private route: ActivatedRoute,
    private authSer: AuthenticationService,
    private router:Router
  ) {}

  ngOnInit() {
    this.survey = new Survey();
    this.survey.questions = new Array<Question>();
    this.answers = new Array<Answer>();
    this.activeSurvey();
  }

  multipleAnswer(option: string, answerIndex) {
    let answer: String = "";
    if (!(this.answers[answerIndex].content == undefined)) {
      answer = this.answers[answerIndex].content + "";
    }
    if (answer.includes(option)) {
      answer.replace(option, "");
    } else {
      if (answer.trim().length == 0) {
        answer = option;
      } else {
        answer = answer + "," + option;
      }
    }
    this.answers[answerIndex].content = answer;
  }

  saveAnswer() {
    let surveyAnswerInfor = new SurveyAnswerInfor();
    surveyAnswerInfor.answers = this.answers;
    surveyAnswerInfor.surveyId = this.survey.id;
    this.surveySer.sendAnswer(surveyAnswerInfor).subscribe(result => {
      alert("Thank you for taking out this survey");
      this.router.navigate(['/']);
    });
  }

  activeSurvey() {
    if (this.authSer.isLogin()) {
      this.isLogin = this.authSer.isLogin();
      this.route.params.subscribe(params => {
        this.token = params["token"];
        this.surveySer.getTakeSurvey(this.token).subscribe(result => {
          if (result == null) {
            alert("You have taken this survey");
            this.router.navigate(['/']);
          } else {
            this.survey = result;
            this.survey.questions.forEach(element => {
              let answer = new Answer();
              answer.questionIdentity = element.questionIdentity;
              this.answers.push(answer);
            });
          }

        });
      });
    }else {
      alert("Please login to do the survey");
    }
  }
}
