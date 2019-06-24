import { QuestionService } from './../../service/question.service';
import { AnswerOption } from './../../model/answerOption';
import { Question } from './../../model/question';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TypeQuestion } from 'src/app/model/typeQuestion';
import { Type } from '@angular/compiler';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  @Input() quest:Question;
  @Input() index:Number;
  @Output() updateEditMode = new EventEmitter();
  @Output() giveClassToParent = new EventEmitter();
  @Output() copyQ = new EventEmitter();
  @Output() deleteQ = new EventEmitter();
  isEditMode = false;
  isNew = true;
  typeList: TypeQuestion[];
  constructor(private questSer:QuestionService) { }

  ngOnInit() {
    if(this.quest.id != undefined) this.isNew = false;
    this.questSer.getAllType().subscribe(result => {
      this.typeList = result;
      if(this.isNew && this.typeList.length > 0) {
        this.quest.type = this.typeList[0];
      }
    })
    if(this.isNew) {
      this.quest.options = new Array<AnswerOption>();
    }
    this.classToParent();
  }

  addOption() {
    this.quest.options.push(new AnswerOption());
  }

  deleteOption(index) {
    this.quest.options.splice(index,1);
  }
  enableEditMode() {
    this.updateEditMode.emit();
    this.isEditMode = true;
  }
  classToParent() {
    this.giveClassToParent.emit(this);
  }

  disableEditMode() {
    this.isEditMode = false;
  }

  copyQuestion() {
    console.log(this.quest);
    this.copyQ.emit(this.index);
  }

  deleteQuestion() {
    this.deleteQ.emit(this.index);
  }

}
