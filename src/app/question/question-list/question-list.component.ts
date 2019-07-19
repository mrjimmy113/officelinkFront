import { QuestionService } from './../../service/question.service';
import { ModalService } from './../../service/modal.service';
import { Component, OnInit } from '@angular/core';
import { QuestionSaveComponent } from '../question-save/question-save.component';
@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {
  itemList;
  currentPage = 1;
  maxPage;
  searchTerm = "";
  requestStatus:Number;
  constructor(private modalSer:ModalService, private quesSer:QuestionService) { }

  ngOnInit() {
    this.itemList = new Array();
    this.search();
  }

  openCreate() {
    this.modalSer.init(QuestionSaveComponent,[],() => {
      this.search();
    });
  }

  search() {
    this.quesSer.search(this.searchTerm).subscribe(result => {
      this.maxPage = result.maxPage;
      this.itemList = result.objList;
    });
  }
  loadPage(num) {
    this.quesSer.getPage(this.searchTerm, num).subscribe(result => {
      this.itemList = result;
    });
  }
  filter() {
    let newSearchTerm = this.searchTerm;
    setTimeout(() => {
      if(newSearchTerm == this.searchTerm) {
        this.search();
      }
    },300)
  }
  delete(id) {
    if(confirm("Do you want to take out this action")) {
      this.quesSer.delete(id).subscribe(result => {
        if(result === 200) {
          alert('Question is deleted successfully');
          this.search();
        }
      }, err => {
        alert('Error');
      })
    }
  }
  sort(property) {

  }

}
