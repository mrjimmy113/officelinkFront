import { TypeEnum } from './../../model/typeEnum';
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
    private quesSer: QuestionService
  ) {}

  ngOnInit() {
    this.quest = new Question();
    this.quest.options = new Array<AnswerOption>();
    this.quest.options.push(new AnswerOption());
    this.quesSer.getAllType().subscribe(result => {
      this.typeList = result;
    });
  }
  addOption() {
    if(this.quest.options.length >=8) {
      alert("The maximum number of option is 10");
    }else {
      this.quest.options.push(new AnswerOption());
    }
  }
  closeModal() {
    this.modalSer.destroy();
  }
  deleteOption(index) {
    this.quest.options.splice(index, 1);
  }
  save() {
    if(this.quest.type.type == 'TEXT') {
      this.quest.options = new Array<AnswerOption>();
    }
    this.quesSer.create(this.quest).subscribe(result => {
      if(result == 201) {
        alert("Question is saved successfully");
        this.outputs();
        this.modalSer.destroy();
      }
    },err => {
      alert('Error');
    })
  }
}
