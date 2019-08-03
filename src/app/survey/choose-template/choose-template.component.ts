import { EventEmitter } from '@angular/core';
import { SurveyService } from 'src/app/service/survey.service';
import { Component, OnInit, Output } from '@angular/core';
import { Survey } from 'src/app/model/survey';

@Component({
  selector: 'app-choose-template',
  templateUrl: './choose-template.component.html',
  styleUrls: ['./choose-template.component.css']
})
export class ChooseTemplateComponent implements OnInit {
  itemList: Array<Survey>;
  term = "";
  maxPage;
  currentPage = 1;
  @Output() newBlankSurvey = new EventEmitter();
  @Output() newWithTemplate = new EventEmitter();

  constructor(private surveySer:SurveyService) { }

  ngOnInit() {
    this.itemList = new Array<Survey>();
    this.search(this.term,this.currentPage);
  }

  search(term, currentPage) {
    this.surveySer.getTemplate(term,currentPage - 1).subscribe(result => {
      this.itemList = result.objList;
      this.maxPage = result.maxPage;
    })
  }
  loadPage(pageNum) {
    this.currentPage = pageNum;
    this.search(this.term,this.currentPage);
  }

  filter() {
    let oldTerm = this.term;
    setTimeout(() => {
      if (oldTerm == this.term) {
        this.search(this.term,this.currentPage);
      }
    }, 300);
  }
  getTemplate(id) {
    this.newWithTemplate.emit(id);
  }
  newBlank() {
    this.newBlankSurvey.emit();
  }

}
