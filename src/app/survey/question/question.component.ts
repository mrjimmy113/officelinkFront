import { TypeEnum } from './../../model/typeEnum';
import { QuestionService } from './../../service/question.service';
import { AnswerOption } from './../../model/answerOption';
import { Question } from './../../model/question';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { TypeQuestion } from 'src/app/model/typeQuestion';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  @Input() quest:Question;
  @Input() index:number;
  @Input() lastIndex:number;
  @Output() updateEditMode = new EventEmitter();
  @Output() giveClassToParent = new EventEmitter();
  @Output() copyQ = new EventEmitter();
  @Output() deleteQ = new EventEmitter();
  @Output() moveUpQ = new EventEmitter();
  @Output() moveDownQ = new EventEmitter();
  @ViewChild("createForm") form : NgForm;
  isEditMode = false;
  isNew = true;
  typeList: TypeQuestion[];
  typeEnum = TypeEnum;
  constructor(private questSer:QuestionService) { }

  ngOnInit() {
    this.quest.questionIndex = this.index;
    if(this.quest.id != undefined) this.isNew = false;
    let sub = this.questSer.getAllType().subscribe(result => {
      this.typeList = result;
      if(this.isNew && this.typeList.length > 0) {
        this.quest.type = this.typeList[0];
      }
      sub.unsubscribe();
    })
    if(this.isNew) {
      this.quest.options = new Array<AnswerOption>();
      this.quest.options.push(new AnswerOption());
    }
    this.classToParent();

  }

  addOption() {
    if(this.quest.options.length <= 8) {
      this.quest.options.push(new AnswerOption());
    }else {
      alert("The maximum number of option is 8")
    }
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

  deleteQuestion() {
    this.deleteQ.emit(this.index);
  }

  moveUp() {
    this.moveUpQ.emit(this.index);
  }

  moveDown() {
    this.moveDownQ.emit(this.index);
  }

}
