import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { News } from 'src/app/model/news';
import { NewsService } from 'src/app/service/news.service';
import { NgForm } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-news-create',
  templateUrl: './news-create.component.html',
  styleUrls: ['./news-create.component.css'],
})
export class NewsCreateComponent implements OnInit {

  Editor = ClassicEditor;
  requestStatus;
  news;
  tmp;
  maxFileSize = 500000;
  isOverSize = false;
  previewImage;

  constructor(
    private newsSer: NewsService,
  ) { }

  ngOnInit() {
    this.news = new News();
    this.news.content = null;
    this.previewImage = null;
    this.requestStatus = 0;
  }

  create(newsForm: NgForm) {
    this.requestStatus = 1;
    const fd = new FormData();
    fd.append("file", this.tmp);
    fd.append("dto", JSON.stringify(this.news));
    this.newsSer.create(fd).subscribe(result => {
      this.requestStatus = result;
      if (this.requestStatus == 201) {
        alert("Successfully created");
        newsForm.resetForm();
        this.ngOnInit();
      }
    },
      error => {
        if (error.status == 409) {
          alert("Something wrong");
          this.requestStatus = 0;
        } else if (error.status = 404) {
          alert("Bad request");
          this.requestStatus = 0;
        }
      }
    );
  }

  onFileChange(event) {
    if (!(event.target.value.length == 0)) {
      if (event.target.files[0].size > this.maxFileSize) {
        this.isOverSize = true;
      } else {
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
