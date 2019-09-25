import { CategorySaveComponent } from './../category-save/category-save.component';
import { Category } from './../../model/category';
import { DialogService } from './../../service/dialog.service';
import { UltisService } from './../../service/ultis.service';
import { ModalService } from 'src/app/service/modal.service';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  itemList = new Array<Category>();
  currentPage = 1;
  maxPage;
  searchTerm = "";
  requestStatus: Number;
  isSort = "";

  constructor(
    private modalSer: ModalService,
    private ser: CategoryService,
    private ultisSer: UltisService,
    private dialogSer: DialogService
  ) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.search("");
  }

  search(value) {
    this.ser.search(value, 1).subscribe(result => {
      this.maxPage = result.maxPage;
      this.itemList = result.objList;
      console.log(result);
    })
  }

  openCreate() {
    this.modalSer.init(CategorySaveComponent, undefined, () => this.loadPage(this.currentPage));
  }

  openEdit(item) {
    this.modalSer.init(CategorySaveComponent, item, () => this.loadPage(this.currentPage));
  }

  filter() {
    let newSearchTerm = this.searchTerm;
    setTimeout(() => {
      if (newSearchTerm == this.searchTerm) {
        this.search(this.searchTerm);
      }
    }, 300);
  }


  loadPage(pageNumber) {
    this.currentPage = pageNumber;
    this.ser.search(this.searchTerm, pageNumber).subscribe(result => {
      this.maxPage = result.maxPage;
      this.itemList = result.objList;
    })
  }

  sort(property) {
    if (this.isSort == property) {
      this.itemList.sort(this.ultisSer.sortByPropertyNameDSC(property));
      this.isSort = "";
    } else {
      this.itemList.sort(this.ultisSer.sortByPropertyNameASC(property));
      this.isSort = property;
    }
  }

}
