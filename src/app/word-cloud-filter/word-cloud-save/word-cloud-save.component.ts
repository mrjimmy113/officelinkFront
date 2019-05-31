import { async } from '@angular/core/testing';
import { ModalService } from "../../service/modal.service";
import { WordCloudService } from "../../service/word-cloud.service";
import { WordCloudFilter } from "../../model/word-cloud-filter";
import { Component, OnInit, Input } from "@angular/core";
import { Word } from "../../model/word";

@Component({
  selector: "app-word-cloud-save",
  templateUrl: "./word-cloud-save.component.html",
  styleUrls: ["./word-cloud-save.component.css"]
})
export class WordCloudSaveComponent implements OnInit {
  @Input() inputs;
  filter: WordCloudFilter;
  words: Array<Word>;
  currentWord: Word;
  requestStatus: Number;
  isEdit = false;
  constructor(private ser: WordCloudService, private modalSer: ModalService) {}

  // Cái hàm này mỗi lần load component lên thì nó chạy
  ngOnInit() {
    this.init();
  }

  //Muốn new hay set up cái gì bỏ vô đây
  init() {
    if (this.inputs.length == 0) {
      this.words = new Array<Word>();
      this.filter = new WordCloudFilter();
    } else {
      this.filter = this.inputs;
      this.words = this.filter.wordList;
      this.isEdit = true;
    }
    this.currentWord = new Word();
    this.requestStatus = 0;
  }

  closeModal() {
    this.modalSer.destroy();
  }
  addWordToList() {
    let isDuplicate = false;
    this.words.every((element) => {
      if(element.name == this.currentWord.name.toLowerCase()) {
        isDuplicate =true;
        return false;
      }else return true;
    });
    if (!isDuplicate) {
      this.currentWord.name = this.currentWord.name.toLowerCase();
      this.words.push(this.currentWord);
    }
    this.currentWord = new Word();
  }
  add() {
    this.ser.create(this.filter).subscribe(result => {
      this.requestStatus = result;
      if (this.requestStatus == 201) this.closeModal();
    });
  }
  update() {
    this.ser.update(this.filter).subscribe(result => {
      this.requestStatus = result;
      if (this.requestStatus == 200) this.closeModal();
    });
  }
  save() {
    this.requestStatus = 1;
    this.filter.wordList = this.words;
    if (this.isEdit) this.update();
    else this.add();
  }
  removeWord(index) {
    this.words.splice(index, 1);
  }
}
