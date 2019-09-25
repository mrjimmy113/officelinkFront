import { TypeEnum } from "./../../model/typeEnum";
import { ModalService } from "./../../service/modal.service";
import { PageSearch } from "./../../model/page-search";
import { Question } from "./../../model/question";
import { QuestionService } from "./../../service/question.service";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-choose-question",
  templateUrl: "./choose-question.component.html",
  styleUrls: ["./choose-question.component.css"]
})
export class ChooseQuestionComponent implements OnInit {
  @Input() inputs;
  term = "";
  itemList = new Array<Question>();
  maxPage = 1;
  currentPage = 1;
  typeList;
  categoryList;
  currentType = 0;
  currentCategory = 0;
  typeEnum = TypeEnum;
  choosenList = new Array<Question>();
  showDetail = false;
  detailQuestion;
  constructor(
    private questSer: QuestionService,
    private modalSer: ModalService
  ) {}

  ngOnInit() {
    this.choosenList = this.inputs;
    this.questSer.getAllType().subscribe(result => {
      this.typeList = result;
    });
    this.questSer.getAllCategory().subscribe(result => {
      this.categoryList = result;
    });
    this.search();
  }

  search() {
    this.questSer
      .getChooseList(
        this.term,
        this.currentType,
        this.currentCategory,
        this.currentPage - 1
      )
      .subscribe(result => {
        this.itemList = result.objList;
        this.maxPage = result.maxPage;
      });
  }
  filter() {
    let oldTerm = this.term;
    setTimeout(() => {
      if (oldTerm == this.term) {
        this.search();
      }
    }, 300);
  }
  chooseQuestion(q) {
    this.choosenList.push(q);
  }
  checkChoosen(q): boolean {
    for (var i = 0; i < this.choosenList.length; i++) {
      if (q.id == this.choosenList[i].id) return true;
    }
    return false;
  }
  changeType() {
    this.search();
  }
  changeCategory() {
    this.search();
  }
  closeModal() {
    this.modalSer.destroy();
  }
  loadPage(pageNum) {
    this.currentPage = pageNum;
    if (this.currentType != 0) {
      this.questSer
        .searchWithType(this.term, this.currentType, this.currentPage - 1)
        .subscribe(result => {
          this.itemList = result.objList;
          this.maxPage = result.maxPage;
        });
    } else {
      this.questSer
        .search(this.term, this.currentPage - 1)
        .subscribe(result => {
          result.objList.forEach(e => {
            this.itemList = result.objList;
            this.maxPage = result.maxPage;
          });
        });
    }
  }
  viewDetail(q: Question) {
    this.showDetail = true;
    this.detailQuestion = q;
  }

  closeDetail() {
    this.showDetail = false;
  }
}
