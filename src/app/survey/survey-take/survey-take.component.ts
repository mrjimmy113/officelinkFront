import { MyMessage } from 'src/app/const/message';
import { SurveyAnswerInfor } from "./../../model/surveyAnswerInfor";
import { AuthenticationService } from "./../../service/authentication.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Answer } from "./../../model/answer";
import { SurveyService } from "./../../service/survey.service";
import { Question } from "./../../model/question";
import { Component, OnInit } from "@angular/core";
import { Survey } from "src/app/model/survey";
import { HttpErrorResponse } from "@angular/common/http";
import { DialogService } from 'src/app/service/dialog.service';

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
  isSaved = false;
  constructor(
    private surveySer: SurveyService,
    private route: ActivatedRoute,
    private authSer: AuthenticationService,
    private router: Router,
    private dialogSer : DialogService
  ) {}

  ngOnInit() {
    this.survey = new Survey();
    this.survey.questions = new Array<Question>();
    this.answers = new Array<Answer>();
    this.activeSurvey();
  }

  multipleAnswer(option: string, answerIndex) {
    let answer: string = "";
    if (!(this.answers[answerIndex].content == undefined)) {
      answer = this.answers[answerIndex].content + "";
    }
    if (answer.includes(option)) {
      answer = answer.replace(option, "");
      answer = answer.replace(/,/g,"");
    } else {
      if (answer.trim().length == 0) {
        answer = option;
      } else {
        answer = answer + "," + option;
      }
    }
    this.answers[answerIndex].content = answer;
    console.log(this.answers[answerIndex].content);
  }

  saveAnswer() {
    if (this.requireValidate()) {
      let surveyAnswerInfor = new SurveyAnswerInfor();
      surveyAnswerInfor.answers = this.answers;
      surveyAnswerInfor.surveyId = this.survey.id;
      this.isSaved = true;
      this.surveySer.sendAnswer(surveyAnswerInfor).subscribe(
        () => {
          this.dialogSer.init(MyMessage.takeSurveyTitle,MyMessage.doneTakeSurvey,undefined,() => {
            this.router.navigate(["/"]);
          })

        },
        (err: HttpErrorResponse) => {
          if (err.status == 409) {
            this.dialogSer.init(MyMessage.takeSurveyTitle, MyMessage.noPermissionToTake,undefined,() => {
              this.router.navigate(["/"]);
            })
          }
          if(err.status == 400) {
            this.dialogSer.init(MyMessage.errorTitle, MyMessage.error400Message,undefined,undefined);
          }
        }
      );
    }
  }

  activeSurvey() {
    if (this.authSer.isLogin()) {
      this.isLogin = this.authSer.isLogin();
      this.route.params.subscribe(
        params => {
          this.token = params["token"];
          this.surveySer.getTakeSurvey(this.token).subscribe(result => {
            this.survey = result;
            this.survey.questions.forEach(element => {
              let answer = new Answer();
              answer.questionType = element.type.type;
              answer.questionIdentity = element.questionIdentity;
              this.answers.push(answer);
            });
          },
          (err: HttpErrorResponse) => {
            if (err.status == 409) {
              this.dialogSer.init(MyMessage.takeSurveyTitle, MyMessage.noPermissionToTake,undefined,() => {
                this.router.navigate(["/"]);
              })
            }
          });
        }
      );
    } else {
      this.dialogSer.init(MyMessage.takeSurveyTitle, MyMessage.takeSurveyLogin,undefined,undefined);
    }
  }

  requireValidate(): boolean {
    for (let index = 0; index < this.survey.questions.length; index++) {
      const element = this.survey.questions[index];
      if (element.required) {
        let answer: String = this.answers[index].content;
        if (answer == undefined || answer.toString().trim() == "") {
          this.dialogSer.init(MyMessage.takeSurveyTitle, "Question number " + (index + 1) + " is required",undefined,undefined);
          return false;
        }
      }
    }
    return true;
  }
}
