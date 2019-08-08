import { MyMessage } from './../../const/message';
import { DialogService } from "./../../service/dialog.service";
import { TypeEnum } from "./../../model/typeEnum";
import { TypeQuestion } from "./../../model/typeQuestion";
import { QuestionService } from "./../../service/question.service";
import { ModalService } from "./../../service/modal.service";
import { AnswerOption } from "./../../model/answerOption";
import { Question } from "./../../model/question";
import { Component, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-question-save",
  templateUrl: "./question-save.component.html",
  styleUrls: ["./question-save.component.css"]
})
export class QuestionSaveComponent implements OnInit {
  @Output() outputs;
  quest: Question;
  typeList: TypeQuestion[];
  requestStatus = 0;
  typeEnum = TypeEnum;
  constructor(
    private modalSer: ModalService,
    private quesSer: QuestionService,
    private dialogSer: DialogService
  ) {}

  ngOnInit() {
    this.quest = new Question();
    this.quest.options = new Array<AnswerOption>();
    this.quest.options.push(new AnswerOption());
    this.quest.options.push(new AnswerOption());
    this.quesSer.getAllType().subscribe(result => {
      this.typeList = result;
    });
  }
  addOption() {
    if (this.quest.options.length >= 10) {
      this.dialogSer.init(MyMessage.createQuestionTitle, MyMessage.createQuestionOption, undefined,undefined);
    } else {
      this.quest.options.push(new AnswerOption());
    }
  }
  closeModal() {
    this.dialogSer.init(MyMessage.createQuestionTitle, MyMessage.createQuestionExit, ()=>{this.modalSer.destroy();},undefined);
  }
  deleteOption(index) {
    this.quest.options.splice(index, 1);
  }
  validate() :boolean{
    if(this.quest.question == undefined || this.quest.question.length == 0) {
      this.dialogSer.init(MyMessage.createQuestionTitle,MyMessage.createQuestionRequire,undefined,undefined);
      return false;
    }
    if(this.quest.type == undefined) {
      this.dialogSer.init(MyMessage.createQuestionTitle,MyMessage.createQuestionTypeRequire,undefined,undefined);
      return false;
    }
    for (let index = 0; index < this.quest.options.length; index++) {
      const element = this.quest.options[index];
      if(element.answerText == undefined || element.answerText.length == 0) {
        this.dialogSer.init(MyMessage.createQuestionTitle,MyMessage.createQuestionOptionRequire + (index + 1),undefined,undefined)
        return false;
      }
    }
    return true;
  }

  save() {
    if(!this.validate()) return;
    if (this.quest.type.type == "TEXT") {
      this.quest.options = new Array<AnswerOption>();
    }
    this.quesSer.create(this.quest).subscribe(
      result => {
        this.dialogSer.init(
          MyMessage.createQuestionTitle,
          MyMessage.createQuestionSuccess,
          undefined,
          () => {
            this.outputs();
            this.modalSer.destroy();
          }
        );
      },
      err => {
        this.dialogSer.init(
          MyMessage.errorTitle,
          MyMessage.error400Message,
          undefined,
          undefined
        );
      }
    );
  }
  updateType() {
    if (this.quest.type.type == "TEXT") {
      this.quest.options = new Array<AnswerOption>();
    } else {
      if (this.quest.options.length == 0) {
        this.quest.options.push(new AnswerOption());
        this.quest.options.push(new AnswerOption());
      }
    }
  }
}
