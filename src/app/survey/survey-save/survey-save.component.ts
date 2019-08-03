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
    private utliSer:UltisService
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
      alert("Please check your survey title")
      return false;
    }
    if(this.qComponentList.length == 0) {
      alert("Survey must have more than one question");
      return false;
    }

    for (let index = 0; index < this.qComponentList.length; index++) {
      const element = this.qComponentList[index];
      if(element.form.invalid) {
        alert("Question number " + (index + 1) + " is not valid");
        return false;
      }
    }

    return true;
  }

  save() {
    if(!this.isValidForm()) return;
    if (!this.isEdit) {
      this.surveySer.create(this.survey).subscribe(result => {
        alert("Successfully Created");
        this.close();
      }, (err : HttpErrorResponse) => {
        if(err.status == 409) alert("Your survey title is already existed");
      });
    } else {
      this.surveySer.update(this.survey).subscribe(result => {
        alert("Successfully Updated");
        this.close();
      }, (err : HttpErrorResponse) => {
        if(err.status == 409) alert("Your survey title is already existed");
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
