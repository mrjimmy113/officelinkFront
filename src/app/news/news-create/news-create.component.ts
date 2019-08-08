import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { News } from 'src/app/model/news';
import { NewsService } from 'src/app/service/news.service';
import { NgForm } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Router } from "@angular/router";
import { DialogService } from "src/app/service/dialog.service";

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
  countTitle = 20;
  countShort = 40;
  countContent = 1000;
  isTitle = false;
  isShort = false;
  isContent = false;

  constructor(
    private newsSer: NewsService,
    private router: Router,
    private dialogSer: DialogService,
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
        this.dialogSer.init("Create News", "Successfully created", () => {
          this.router.navigateByUrl('/news')
        }, undefined);
      }
    },
      error => {
        if (error.status == 409) {
          this.dialogSer.init("Create News", "Fail to create", undefined, undefined);
          this.requestStatus = 0;
        } else if (error.status = 404) {
          this.dialogSer.init("Create News", "Something wrong", undefined, undefined);
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
        this.isOverSize = false;
        this.tmp = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(this.tmp);
        reader.onload = () => (this.previewImage = reader.result);
      }
    } else {
      this.previewImage = null;
    }
  }

  wordCountTitle(event) {
    this.isTitle = false;
    var key_length = event.split(' ').length;
    this.countTitle = 21 - key_length;
    if (key_length > 21) {
      this.isTitle = true;
    }
  }

  wordCountShort(event) {
    this.isShort = false;
    var key_length = event.split(' ').length;
    this.countShort = 41 - key_length;
    if (key_length > 41) {
      this.isShort = true;
    }
  }

  wordCountContent(event) {
    this.isContent = false;
    var key_length = event.split(' ').length;
    this.countContent = 1001 - key_length;
    if (key_length > 1001) {
      this.isContent = true;
    }
  }
}
