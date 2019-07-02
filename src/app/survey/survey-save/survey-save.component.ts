import { TypeEnum } from './../../model/typeEnum';
import { DynamicLoadService } from './../../service/dynamic-load.service';
import { SurveyService } from './../../service/survey.service';
import { Survey } from './../../model/survey';
import { ChooseQuestionComponent } from './../choose-question/choose-question.component';
import { ModalService } from './../../service/modal.service';
import { QuestionComponent } from './../question/question.component';
import { Question } from './../../model/question';
import { Component, OnInit, Input, Output } from '@angular/core';
import { listenToElementOutputs } from '@angular/core/src/view/element';

@Component({
  selector: 'app-survey-save',
  templateUrl: './survey-save.component.html',
  styleUrls: ['./survey-save.component.css']
})
export class SurveySaveComponent implements OnInit {
  @Input() inputs;
  @Output() outputs;
  survey: Survey;
  qComponentList: QuestionComponent[];
  isEdit= false;
  constructor(private modalSer:ModalService, private surveySer:SurveyService, private dyLoadSer:DynamicLoadService) { }

  ngOnInit() {
    this.survey = this.inputs;
    this.qComponentList = new Array<QuestionComponent>();
    if(this.survey.id != undefined) this.isEdit = true;
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
    this.survey.questions.splice(index,1);
    this.qComponentList.splice(index,1);
  }
  openChooseQuestion() {
    this.modalSer.init(ChooseQuestionComponent,this.survey.questions,[]);
  }
  save() {
    if(!this.isEdit) {
      this.surveySer.create(this.survey).subscribe(result => {
        alert("Successfully Created");
        this.close();
      })
    }else {
      this.surveySer.update(this.survey).subscribe(result => {
        alert("Successfully Updated");
        this.close();
      })
    }
  }
  close() {
    this.outputs();
  }


}
