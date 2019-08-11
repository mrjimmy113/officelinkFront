import { MyMessage } from "./../../const/message";
import { DialogService } from "./../../service/dialog.service";
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
    private ultisSer: UltisService,
    private dialogSer: DialogService
  ) {}

  ngOnInit() {
    this.itemList = new Array();
    this.search();
  }

  openCreate() {
    this.modalSer.init(WordCloudSaveComponent, [], [() => this.search()]);
  }
  openEdit(item) {
    this.modalSer.init(WordCloudSaveComponent, item, [() => this.search()]);
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
    this.dialogSer.init(
      MyMessage.deleteFilterTitle,
      MyMessage.deleteFilterMessage,
      () => {
        this.ser.delete(id).subscribe(result => {
          this.search();
          this.dialogSer.init(MyMessage.deleteFilterTitle,MyMessage.deleteFilterSuccess,undefined,undefined);
        });
      },
      undefined
    );
  }
  filter() {
    let oldTerm = this.searchTerm;
    setTimeout(() => {
      if (oldTerm == this.searchTerm) {
        this.currentPage = 1;
        this.search();
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
