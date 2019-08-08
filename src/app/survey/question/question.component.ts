import { MyMessage } from './../../const/message';
import { DialogService } from 'src/app/service/dialog.service';
import { TypeEnum } from "./../../model/typeEnum";
import { QuestionService } from "./../../service/question.service";
import { AnswerOption } from "./../../model/answerOption";
import { Question } from "./../../model/question";
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from "@angular/core";
import { TypeQuestion } from "src/app/model/typeQuestion";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-question",
  templateUrl: "./question.component.html",
  styleUrls: ["./question.component.css"]
})
export class QuestionComponent implements OnInit {
  @Input() quest: Question;
  @Input() index: number;
  @Input() lastIndex: number;
  @Output() updateEditMode = new EventEmitter();
  @Output() giveClassToParent = new EventEmitter();
  @Output() copyQ = new EventEmitter();
  @Output() deleteQ = new EventEmitter();
  @Output() moveUpQ = new EventEmitter();
  @Output() moveDownQ = new EventEmitter();
  isEditMode = false;
  isNew = true;
  typeList: TypeQuestion[];
  typeEnum = TypeEnum;
  constructor(private questSer: QuestionService, private dialogSer:DialogService) {}

  ngOnInit() {
    this.quest.questionIndex = this.index;
    if (this.quest.id != undefined) this.isNew = false;
    let sub = this.questSer.getAllType().subscribe(result => {
      this.typeList = result;
      if (this.isNew && this.typeList.length > 0) {
        this.quest.type = this.typeList[0];
      }
      sub.unsubscribe();
    });
    if (this.isNew) {
      this.quest.options = new Array<AnswerOption>();
      this.quest.options.push(new AnswerOption());
      this.quest.options.push(new AnswerOption());
    }
    this.classToParent();
  }

  addOption() {
    if (this.quest.options.length <= 10) {
      this.quest.options.push(new AnswerOption());
    } else {
      this.dialogSer.init(MyMessage.createQuestionTitle, MyMessage.createQuestionOption, undefined,undefined);
    }
  }

  deleteOption(index) {
    this.quest.options.splice(index, 1);
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

  updateType() {
    if (this.quest.type.type == 'TEXT') {
      this.quest.options = new Array<AnswerOption>();
    } else {
      if (this.quest.options.length == 0) {
        this.quest.options.push(new AnswerOption());
        this.quest.options.push(new AnswerOption());
      }
    }
  }
  validate() :boolean{
    if(this.quest.question == undefined || this.quest.question.length == 0) {
      this.dialogSer.init(MyMessage.createQuestionTitle,MyMessage.createQuestionRequire + " number " + this.index,undefined,undefined);
      return false;
    }
    if(this.quest.type == undefined) {
      this.dialogSer.init(MyMessage.createQuestionTitle,MyMessage.createQuestionTypeRequire,undefined,undefined);
      return false;
    }
    for (let index = 0; index < this.quest.options.length; index++) {
      const element = this.quest.options[index];
      if(element.answerText == undefined || element.answerText.length == 0) {
        this.dialogSer.init(MyMessage.createQuestionTitle,MyMessage.createQuestionOptionRequire + (index + 1) + " of question number " + this.index,undefined,undefined)
        return false;
      }
    }
    return true;
  }
}
