import { WordCloudService } from './../service/word-cloud.service';
import { WordCloudSaveComponent } from './../word-cloud-save/word-cloud-save.component';
import { ModalService } from './../service/modal.service';
import { Component, OnInit } from '@angular/core';
import { serializePath } from '@angular/router/src/url_tree';

@Component({
  selector: 'app-word-cloud-list',
  templateUrl: './word-cloud-list.component.html',
  styleUrls: ['./word-cloud-list.component.css']
})
export class WordCloudListComponent implements OnInit {
  itemList;
  isSort = "";
  currentPage = 1;
  maxPage;
  searchTerm = "";
  constructor(private modalSer:ModalService, private ser:WordCloudService) { }

  ngOnInit() {
    this.ser.search("").subscribe(result => {
      this.maxPage = result.maxPage;
      this.itemList = result.objList;
    })
  }

  openCreate() {
    this.modalSer.init(WordCloudSaveComponent,[],[]);
  }
  openEdit(item) {
    this.modalSer.init(WordCloudSaveComponent,item,[]);
  }
  search() {

  }

}
