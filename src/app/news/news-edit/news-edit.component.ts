import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { News } from 'src/app/model/news';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from 'src/app/service/news.service';
import { NgForm } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { DomSanitizer } from '@angular/platform-browser';
import { DialogService } from "src/app/service/dialog.service";
import { MyMessage } from 'src/app/const/message';

@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.css'],
})
export class NewsEditComponent implements OnInit {
  dump
  Editor = ClassicEditor;
  requestStatus;
  news;
  tmp = null;
  maxFileSize = 500000;
  isOverSize = false;
  countTitle = 20;
  countShort = 40;
  countContent = 1000;
  isTitle = false;
  isShort = false;
  isContent = false;
  isImage = false;

  constructor(
    private newsSer: NewsService,
    private router: Router,
    private route: ActivatedRoute,
    private dom: DomSanitizer,
    private dialogSer: DialogService,
  ) { }

  ngOnInit() {
    const itemId = +this.route.snapshot.params['id'];
    this.findById(itemId);
    this.requestStatus = 0;
  }

  findById(itemId) {
    this.news = new News();
    this.newsSer.searchById(itemId).subscribe(result => {
      this.news = result;
      this.news.byte_image = this.doms('data:image/jpeg;charset=utf-8;base64,' + this.news.byte_image);
    },
      error => {
        this.dialogSer.init("Update News", MyMessage.error400Message, undefined, undefined);
      }
    );
  }

  onFileChange(event) {
    var text = event.target.value.split('.')[1];
    if (text != "jpg" && text != "png" && text != "gif") {
      this.isImage = true;
    } else {
      this.isImage = false;
    }
    if (!(event.target.value.length == 0)) {
      if (event.target.files[0].size > this.maxFileSize) {
        this.isOverSize = true;
      } else {
        this.isOverSize = false;
        this.tmp = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(this.tmp);
        reader.onload = () => (this.news.byte_image = reader.result);
      }
    }
  }

  update(newsForm: NgForm) {
    this.requestStatus = 1;
    const fd = new FormData();
    if (this.tmp != null) {
      fd.append("file", this.tmp);
      fd.append("dto", JSON.stringify(this.news));
      this.newsSer.update(fd).subscribe(result => {
        this.requestStatus = result;
        if (this.requestStatus == 200) {
          this.dialogSer.init("Update News", MyMessage.updateNews, undefined, undefined);
        }
      },
        error => {
          this.dialogSer.init("Update News", MyMessage.error400Message, undefined, undefined);
        }
      );
    } else {
      fd.append("dto", JSON.stringify(this.news));
      this.newsSer.updateNotHasFile(fd).subscribe(result => {
        this.requestStatus = result;
        if (this.requestStatus == 200) {
          this.dialogSer.init("Update News", MyMessage.updateNews, undefined, undefined);
        }
      },
        error => {
          this.dialogSer.init("Update News", MyMessage.error400Message, undefined, undefined);
        }
      );
    }
  }

  doms(s) {
    return this.dom.bypassSecurityTrustUrl(s);
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

  back() {
    this.router.navigateByUrl("/news");
  }
}
