import { MyMessage } from "./../../const/message";
import { UltisService } from "src/app/service/ultis.service";
import { Question } from "./../../model/question";
import { TypeEnum } from "./../../model/typeEnum";
import { QuestionService } from "./../../service/question.service";
import { ModalService } from "./../../service/modal.service";
import { Component, OnInit } from "@angular/core";
import { QuestionSaveComponent } from "../question-save/question-save.component";
import { DetailComponent } from "../detail/detail.component";
import { DialogService } from "src/app/service/dialog.service";
@Component({
  selector: "app-question-list",
  templateUrl: "./question-list.component.html",
  styleUrls: ["./question-list.component.css"]
})
export class QuestionListComponent implements OnInit {
  itemList;
  currentPage = 1;
  maxPage;
  searchTerm = "";
  isSort = "";
  requestStatus: Number;
  typeEnum = TypeEnum;
  constructor(
    private modalSer: ModalService,
    private quesSer: QuestionService,
    private ultiSer: UltisService,
    private dialogSer: DialogService
  ) {}

  ngOnInit() {
    this.itemList = new Array();
    this.search();
  }

  openCreate() {
    this.modalSer.init(QuestionSaveComponent, [], () => {
      this.search();
    });
  }

  search() {
    this.quesSer
      .search(this.searchTerm, this.currentPage - 1)
      .subscribe(result => {
        this.maxPage = result.maxPage;
        this.itemList = result.objList;
      });
  }
  loadPage(num) {
    this.currentPage = num;
    this.search();
  }
  filter() {
    let newSearchTerm = this.searchTerm;
    setTimeout(() => {
      if (newSearchTerm == this.searchTerm) {
        this.currentPage = 1;
        this.search();
      }
    }, 300);
  }
  delete(id) {
    this.dialogSer.init(
      MyMessage.deleteQuestionTitle,
      MyMessage.deleteQuestionMessage,
      () => {
        this.quesSer.delete(id).subscribe(
          result => {
            this.search();
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
      },
      undefined
    );
  }
  detail(quest: Question) {
    this.modalSer.init(DetailComponent, quest, []);
  }
  sort(property) {
    if (this.isSort == property) {
      this.itemList.sort(this.ultiSer.sortByPropertyNameDSC(property));
      this.isSort = "";
    } else {
      this.itemList.sort(this.ultiSer.sortByPropertyNameASC(property));
      this.isSort = property;
    }
  }
}
