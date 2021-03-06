import { Component, OnInit, Input, Output } from '@angular/core';
import { Survey } from 'src/app/model/survey';
import { SurveyService } from 'src/app/service/survey.service';
import { ModalService } from 'src/app/service/modal.service';
import { Answer } from "./../../model/answer";
import { SurveyAnswerInfor } from 'src/app/model/surveyAnswerInfor';
import { MyMessage } from 'src/app/const/message';
import { DialogService } from "src/app/service/dialog.service";

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
  ready = false;

  constructor(
    private modalSer: ModalService,
    private surveySer: SurveyService,
    private dialogSer: DialogService,
  ) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.answers = new Array<Answer>();
    this.survey = this.inputs;
    this.surveySer.getAnswerForSurveyHistory(this.survey.id).subscribe(result => {
      this.answers = result;
      this.survey.questions.forEach(element => {
        for (let index = 0; index < this.answers.length; index++) {
          const answer = this.answers[index];
          if(element.questionIdentity == answer.questionIdentity) {
            element.answer = answer;
          }
        }
      });
      this.ready = true;
    }, err => {
      this.dialogSer.init("Survey History", MyMessage.error400Message, undefined, undefined);
    })


;
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
    }
  }

}
