import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/service/modal.service';
import { NewsService } from 'src/app/service/news.service';
import { NewsCreateComponent } from '../news-create/news-create.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-news-main',
  templateUrl: './news-main.component.html',
  styleUrls: ['./news-main.component.css']
})
export class NewsMainComponent implements OnInit {

  itemList;
  currentPage = 1;
  maxPage;
  searchTerm = "";
  requestStatus:Number;

  constructor(private modalService: ModalService, private service: NewsService, private dom: DomSanitizer) { }

  ngOnInit() {
    this.searchByTitle("");
  }

  searchById(value) {
    this.service.searchById(value).subscribe(result => {
      this.itemList = result;
    })
  }

  searchByTitle(value) {
    this.service.searchByTitle(value).subscribe(result => {
      this.maxPage = result.maxPage;
      this.itemList = result.objList;
    })
  }

  filter() {
    let newSearchTerm = this.searchTerm;
    setTimeout(() => {
      if (newSearchTerm == this.searchTerm) {
        this.searchByTitle(this.searchTerm);
      }
    }, 300);
  }

  create() {
    this.modalService.init(NewsCreateComponent,[],() => this.searchByTitle(""));
  }

  edit(item) {
    this.modalService.init(NewsCreateComponent,item,() => this.searchByTitle(""));
  }

  delete(id) {
    this.service.delete(id).subscribe(result => {
      this.requestStatus = result;
      if (this.requestStatus == 200){
        this.searchByTitle("");
      }
    });
  }

  doms(s) {
    return this.dom.bypassSecurityTrustUrl(s);
  }

}

