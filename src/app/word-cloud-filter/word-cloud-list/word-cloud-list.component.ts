import { UltisService } from "./../../service/ultis.service";
import { WordCloudService } from "../../service/word-cloud.service";
import { WordCloudSaveComponent } from "./../word-cloud-save/word-cloud-save.component";
import { ModalService } from "../../service/modal.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-word-cloud-list",
  templateUrl: "./word-cloud-list.component.html",
  styleUrls: ["./word-cloud-list.component.css"]
})
export class WordCloudListComponent implements OnInit {
  itemList;
  isSort = "";
  currentPage = 1;
  maxPage;
  searchTerm = "";
  constructor(
    private modalSer: ModalService,
    private ser: WordCloudService,
    private ultisSer: UltisService
  ) {}

  ngOnInit() {
    this.itemList = new Array();
    this.search();
  }

  openCreate() {
    this.modalSer.init(WordCloudSaveComponent, [], () => this.search());
  }
  openEdit(item) {
    this.modalSer.init(WordCloudSaveComponent, item, () => this.search());
  }
  search() {
    this.ser.search(this.searchTerm).subscribe(result => {
      this.maxPage = result.maxPage;
      this.itemList = result.objList;
    });
  }
  loadPage(page) {
    this.ser.getPage(this.searchTerm, page).subscribe(result => {
      this.itemList = result;
    });
  }
  delete(id) {
    if (confirm("Do you want to delete this")) {
      this.ser.delete(id).subscribe(result => {
        if (result == 200) {
          alert("Successfully Deleted");
          this.search();
        }
      });
    }
  }
  filter() {
    let oldTerm = this.searchTerm;
    setTimeout(() => {
      if (oldTerm == this.searchTerm) {
        this.search();
        console.log(this.searchTerm);
      }
    }, 300);
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
