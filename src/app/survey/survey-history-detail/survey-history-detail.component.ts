import { Component, OnInit, Input, Output } from '@angular/core';
import { Survey } from 'src/app/model/survey';
import { SurveyService } from 'src/app/service/survey.service';
import { ModalService } from 'src/app/service/modal.service';
import { Answer } from "./../../model/answer";
import { SurveyAnswerInfor } from 'src/app/model/surveyAnswerInfor';

@Component({
  selector: 'app-survey-history-detail',
  templateUrl: './survey-history-detail.component.html',
  styleUrls: ['./survey-history-detail.component.css']
})
export class SurveyHistoryDetailComponent implements OnInit {

  @Input() inputs;
  @Output() outputs;
  survey: Survey;
  answers: Array<Answer>;
  surveyAnswerInfor: SurveyAnswerInfor;

  constructor(
    private modalSer: ModalService,
    private surveySer: SurveyService
  ) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.answers = new Array<Answer>();
    this.survey = this.inputs;
    this.surveySer.getAnswerForSurveyHistory(this.survey.id).subscribe(result => {
      this.answers = result;
    });
    this.survey.questions.forEach(element => {
      let answer = new Answer();
      this.answers.push(answer);
    });
  }

  closeModal() {
    this.modalSer.destroy();
  }

  multipleAnswer(option: string, answerIndex, index) {
    let array: String[];
    if (!(this.answers[answerIndex].content == undefined)) {
      array = this.answers[answerIndex].content.split(",");
      array.forEach(element => {
        if (option == element) {
          (<HTMLInputElement>document.getElementById('multipleChoice' + index)).checked = true;
        }
      });
      // console.log("option: ", option);
      // console.log("answers: ", this.answers[answerIndex].content);

    }
    // if (answer.includes(option)) {
    //   answer.replace(option, "");
    // } else {
    //   if (answer.trim().length == 0) {
    //     answer = option;
    //   } else {
    //     answer = answer + "," + option;
    //   }
    // }
    // this.answers[answerIndex].content = answer;
  }

}
export class MultipleA {
  index:number;
  array:string[];
}
