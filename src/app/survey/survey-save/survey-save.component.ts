import { MyMessage } from './../../const/message';
import { DialogService } from 'src/app/service/dialog.service';
import { NgForm } from '@angular/forms';
import { UltisService } from './../../service/ultis.service';
import {ViewChild} from '@angular/core';
import { DynamicLoadService } from "./../../service/dynamic-load.service";
import { SurveyService } from "./../../service/survey.service";
import { Survey } from "./../../model/survey";
import { ChooseQuestionComponent } from "./../choose-question/choose-question.component";
import { ModalService } from "./../../service/modal.service";
import { QuestionComponent } from "./../question/question.component";
import { Question } from "./../../model/question";
import { Component, OnInit, Input, Output } from "@angular/core";
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: "app-survey-save",
  templateUrl: "./survey-save.component.html",
  styleUrls: ["./survey-save.component.css"]
})
export class SurveySaveComponent implements OnInit {
  @Input() inputs;
  @Output() outputs;
  @ViewChild("surveyForm") form : NgForm;
  survey: Survey;
  qComponentList: QuestionComponent[];
  isEdit = false;
  isChooseTemplate =true;
  constructor(
    private modalSer: ModalService,
    private surveySer: SurveyService,
    private dyLoadSer: DynamicLoadService,
    private utliSer:UltisService,
    private dialogSer:DialogService
  ) {}

  ngOnInit() {
    this.survey = this.inputs;
    this.qComponentList = new Array<QuestionComponent>();
    if (this.survey.id != undefined) this.isEdit = true;
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
    this.survey.questions.push(new Question());
  }

  copyQ(index) {
    let tmpQ = this.survey.questions[index];
    this.survey.questions.push(tmpQ);
  }
  deleteQ(index) {
    this.survey.questions.splice(index, 1);
    this.qComponentList.splice(index, 1);
  }
  moveUpQ(index) {
    if (index > 0) {
      let tmpQ = this.survey.questions.splice(index, 1)[0];
      this.survey.questions.splice(index - 1, 0, tmpQ);
      this.survey.questions[index - 1].questionIndex = index - 1;
      this.survey.questions[index].questionIndex = index;
    }
  }
  moveDownQ(index) {
    if(index < (this.qComponentList.length -1)) {
      let tmpQ = this.survey.questions.splice(index, 1)[0];
      this.survey.questions.splice(index + 1, 0, tmpQ);
      this.survey.questions[index + 1].questionIndex = index + 1;
      this.survey.questions[index].questionIndex = index;
    }
  }

  openChooseQuestion() {
    this.modalSer.init(ChooseQuestionComponent, this.survey.questions, []);
  }

  isValidForm() : boolean {
    if(this.form.invalid) {
      this.dialogSer.init(MyMessage.surveyTitle,MyMessage.surveyTitleRequire,undefined,undefined);
      return false;
    }
    if(this.qComponentList.length == 0) {
      this.dialogSer.init(MyMessage.surveyTitle,MyMessage.surveyQuestionLimit,undefined,undefined);
      return false;
    }
    for (let index = 0; index < this.qComponentList.length; index++) {
      const element = this.qComponentList[index];
      if(element.validate()) {
        return true;
      }
    }
    return true;
  }

  save() {
    console.log("save");
    if(!this.isValidForm()) return;
    console.log("Qua validate");
    if (!this.isEdit) {
      this.surveySer.create(this.survey).subscribe(result => {
        this.dialogSer.init(MyMessage.surveyTitle,MyMessage.createSurveySuccess,undefined,() => {this.close();});

      }, (err : HttpErrorResponse) => {
        if(err.status == 409) this.dialogSer.init(MyMessage.surveyTitle,MyMessage.surveyDuplicateName,undefined,undefined);
        if(err.status == 400) this.dialogSer.init(MyMessage.errorTitle,MyMessage.error400Message,undefined,undefined);
      });
    } else {
      this.surveySer.update(this.survey).subscribe(result => {
        this.dialogSer.init(MyMessage.surveyTitle,MyMessage.updateSurveySuccess,undefined,() => {this.close();});
      }, (err : HttpErrorResponse) => {
        if(err.status == 409) this.dialogSer.init(MyMessage.surveyTitle,MyMessage.surveyDuplicateName,undefined,undefined);
        if(err.status == 400) this.dialogSer.init(MyMessage.errorTitle,MyMessage.error400Message,undefined,undefined);
      });
    }
  }
  close() {
    this.outputs();
  }
  closeTemplate() {
    this.isChooseTemplate = false;
  }
  getTemplate(id) {
    this.closeTemplate();
    this.surveySer.getDetail(id).subscribe(result => {
      this.survey.questions = result;
    })
  }
}
