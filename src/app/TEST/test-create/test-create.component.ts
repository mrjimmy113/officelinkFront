import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { News } from 'src/app/model/news';
import { ModalService } from 'src/app/service/modal.service';
import { NewsService } from 'src/app/service/news.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-test-create',
  templateUrl: './test-create.component.html',
  styleUrls: ['./test-create.component.css']
})
export class TestCreateComponent implements OnInit {

  @Output() outputs = new EventEmitter<any>();
  requestStatus;
  news;
  tmp;
  maxFileSize = 500000;
  isOverSize = false;
  dump;
  previewImage;
  eventList;
  constructor(
    private newsSer: NewsService,
    private modalSer: ModalService,
  ) { }

  ngOnInit() {
    this.initNews();
  }

  initNews() {
    this.requestStatus = 0;
    this.news = new News();
  }

  closeModal() {
    this.outputs[0]();
    this.modalSer.destroy();
  }
  onSubmit(newsForm: NgForm) {
    if (this.requestStatus == 201) {
      this.initNews();
      this.requestStatus = 0;
      newsForm.resetForm();
    } else {
      this.requestStatus = 1;
      const fd = new FormData();
      fd.append("file", this.tmp);
      fd.append("dto", JSON.stringify(this.news));
      this.newsSer.create(fd).subscribe(result => {
      this.requestStatus = result;
      });
    }
  }
  onFileChange(event) {
    if (!(event.target.value.length == 0)) {

      if (event.target.files[0].size > this.maxFileSize) this.isOverSize = true;
      else {
        this.tmp = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(this.tmp);
        reader.onload = () => (this.previewImage = reader.result);
      }
    } else {
      this.previewImage = null;
    }
  }
}
