import { MyMessage } from "./../../const/message";
import { async } from "@angular/core/testing";
import { ModalService } from "../../service/modal.service";
import { WordCloudService } from "../../service/word-cloud.service";
import { WordCloudFilter } from "../../model/word-cloud-filter";
import { Component, OnInit, Input, Output } from "@angular/core";
import { Word } from "../../model/word";
import { NgForm } from "@angular/forms";
import { DialogService } from "src/app/service/dialog.service";

@Component({
  selector: "app-word-cloud-save",
  templateUrl: "./word-cloud-save.component.html",
  styleUrls: ["./word-cloud-save.component.css"]
})
export class WordCloudSaveComponent implements OnInit {
  @Input() inputs;
  @Output() outputs;
  filter: WordCloudFilter;
  words: Array<Word>;
  currentWord: Word;
  requestStatus: Number;
  isEdit = false;
  isWordDuplicate = false;
  isExisted = false;
  currentName;

  constructor(
    private ser: WordCloudService,
    private modalSer: ModalService,
    private dialogSer: DialogService
  ) {}

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
      this.currentName = this.filter.name;
      this.isEdit = true;
    }
    this.currentWord = new Word();
    this.requestStatus = 0;
  }

  closeModal() {
    this.modalSer.destroy();
  }
  addWordToList(form: NgForm) {
    this.currentWord.name = this.currentWord.name.toLowerCase();
    this.words.push(this.currentWord);
    this.currentWord = new Word();
    form.resetForm();
  }
  add() {
    this.ser.create(this.filter).subscribe(result => {
      this.dialogSer.init(
        MyMessage.wordCloudFilterTitle,
        MyMessage.createFilterMessage,
        undefined,
        () => {
          this.outputs[0]();
          if (this.outputs[1] != undefined) {
            this.outputs[1](result);
          }
          this.closeModal();
        }
      );
    });
  }
  update() {
    this.ser.update(this.filter).subscribe(result => {
      this.dialogSer.init(
        MyMessage.wordCloudFilterTitle,
        MyMessage.updateFilterMessage,
        undefined,
        () => {
          this.outputs[0]();
          this.closeModal();
        }
      );
    });
  }
  save() {
    this.requestStatus = 1;
    this.filter.wordList = this.words;
    if (this.isEdit) this.update();
    else this.add();
  }
  removeWord(index) {
    this.dialogSer.init(
      MyMessage.wordCloudFilterTitle,
      MyMessage.deleteWordMessage,
      () => {
        this.words.splice(index, 1);
      },
      undefined
    );
  }
  closeDialog() {
    this.dialogSer.init(
      MyMessage.wordCloudFilterTitle,
      MyMessage.filterDialogExit,
      () => {
        this.closeModal();
      },
      undefined
    );
  }

  checkDuplicateWord() {
    let oldWord = this.currentWord.name;
    setTimeout(() => {
      if (oldWord == this.currentWord.name) {
        this.isWordDuplicate = false;
        this.words.every(element => {
          if (element.name == this.currentWord.name.toLowerCase()) {
            this.isWordDuplicate = true;
            return false;
          } else return true;
        });
      }
    }, 300);
  }
  checkIsExisted() {
    if (this.filter.name != undefined && this.filter.name.trim() != "") {
      if (this.isEdit) {
        if (this.filter.name.toLowerCase() == this.currentName.toLowerCase()) {
          return;
        }
      }
      let oldName = this.filter.name;
      setTimeout(() => {
        if (oldName == this.filter.name) {
          this.ser.isExisted(this.filter.name).subscribe(result => {
            this.isExisted = result;
          });
        }
      }, 300);
    }
  }
}
