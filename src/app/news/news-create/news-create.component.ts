import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { News } from 'src/app/model/news';
import { ModalService } from 'src/app/service/modal.service';
import { NewsService } from 'src/app/service/news.service';
import { NgForm } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-news-create',
  templateUrl: './news-create.component.html',
  styleUrls: ['./news-create.component.css'],
})
export class NewsCreateComponent implements OnInit {

  public Editor = ClassicEditor;
  @Output() outputs;
  @Input() inputs;
  requestStatus;
  news;
  tmp;
  maxFileSize = 500000;
  isOverSize = false;
  dump;
  previewImage;
  eventList;
  isEdit = false;
  firstTime = true;
  ngModel = null;

  constructor(
    private newsSer: NewsService,
    private modalSer: ModalService,
    private dom: DomSanitizer,
  ) { }

  ngOnInit() {
    if (this.inputs.length == 0) {
      this.news = new News();
    } else {
      this.news = this.inputs;
      this.ngModel = this.news.content;
      if (this.firstTime) {
        this.previewImage = this.doms('data:image/jpeg;charset=utf-8;base64,' + this.inputs.byte_image);
      }
      this.isEdit = true;
      this.firstTime = false;
    }
    this.requestStatus = 0;
  }

  close() {
    this.modalSer.destroy();
  }

  onSubmit(newsForm) {
    if (this.requestStatus == 201) {
      this.ngOnInit();
      this.requestStatus = 0;
      newsForm.resetForm();
    } else {
      this.requestStatus = 1;
      const fd = new FormData();
      this.news.content = this.ngModel;
      fd.append("file", this.tmp);
      fd.append("dto", JSON.stringify(this.news));
      this.newsSer.create(fd).subscribe(result => {
        this.requestStatus = result;
        if (this.requestStatus == 201) {
          this.close();
        }
        this.outputs();
      },
        error => {
          if (error.status == 409) {
            alert("Title, Short Description, Content cannot be duplicated");
          } else if (error.status = 404) {
            alert("Bad request");
          }
          this.close();
          this.outputs();
        }
      );

    }
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

  update(newsForm) {
    if (this.requestStatus == 200) {
      this.ngOnInit();
      this.requestStatus = 0;
      newsForm.resetForm();
    } else {
      this.requestStatus = 1;
      const fd = new FormData();
      this.news.content = this.ngModel;
      this.news.byte_image = null;
      fd.append("file", this.tmp);
      fd.append("dto", JSON.stringify(this.news));
      this.newsSer.update(fd).subscribe(result => {
        this.requestStatus = result;
        if (this.requestStatus == 200) {
          this.close();
        }
        this.outputs();
      })
    }
  }

  save(newsForm: NgForm) {
    this.requestStatus = 1;
    if (this.isEdit) {
      this.update(newsForm);
    }
    else {
      this.onSubmit(newsForm);
    }
  }

  doms(s) {
    return this.dom.bypassSecurityTrustUrl(s);
  }
}
