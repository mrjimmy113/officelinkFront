import { TypeEnum } from './../../model/typeEnum';
import { ModalService } from './../../service/modal.service';
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
  maxPage;
  currentPage = 1;
  typeList;
  currentType = 0;
  typeEnum = TypeEnum;
  choosenList = new Array<Question>();
  constructor(private questSer: QuestionService, private modalSer:ModalService) {}

  ngOnInit() {
    this.choosenList = this.inputs;
    this.questSer.getAllType().subscribe(result => {
      this.typeList = result;
    });
    this.search();
  }

  search() {
    if (this.currentType != 0) {
      this.questSer
        .searchWithType(this.term, this.currentType,this.currentPage - 1)
        .subscribe(result => {
          this.itemList = result.objList;
          this.maxPage = result.maxPage;
        });
    } else {
      this.questSer.search(this.term,this.currentPage - 1).subscribe(result => {
        this.itemList = result.objList;
        this.maxPage = result.maxPage;
      });
    }
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
    for(var i = 0; i< this.choosenList.length; i++) {
      if(q.id == this.choosenList[i].id) return true;
    }
    return false;
  }
  changeType() {
    this.search();
  }
  closeModal() {
    this.modalSer.destroy();
  }
  loadMore() {
    console.log(this.maxPage);
    if(this.maxPage < this.currentPage) {
      console.log("ye");
      this.currentPage++;
      if (this.currentType != 0) {
        this.questSer
          .searchWithType(this.term, this.currentType,this.currentPage - 1)
          .subscribe(result => {
            result.objList.forEach(e => {
              this.itemList.push(e);
            })
          });
      } else {
        this.questSer.search(this.term,this.currentPage - 1).subscribe(result => {
          result.objList.forEach(e => {
            this.itemList.push(e);
          })
        });
      }
    }
  }

}
