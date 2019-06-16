import { Component, OnInit,Input, Output } from '@angular/core';
import { News } from 'src/app/model/news';
import { ModalService } from 'src/app/service/modal.service';
import { NewsService } from 'src/app/service/news.service';

@Component({
  selector: 'app-news-create',
  templateUrl: './news-create.component.html',
  styleUrls: ['./news-create.component.css']
})
export class NewsCreateComponent implements OnInit {

  @Input() inputs;
  @Output() outputs;
  news: News;
  requestStatus: Number;
  isEdit = false;


  constructor(private modalService: ModalService, private service: NewsService) { }

  ngOnInit() {
    this.init();
  }

  init() {
    if (this.inputs.length == 0) {
      this.news = new News();
    } else {
      this.news = this.inputs;
      this.isEdit = true;
    }
    this.requestStatus = 0;
  }

  close() {
    this.modalService.destroy();
  }

  add() {
    this.service.create(this.news).subscribe(result => {
      this.requestStatus = result;
      if (this.requestStatus == 201) {
        alert("Create Successful");
        this.close();
      }
      this.outputs();
    },
      error => {
        if (error.status == 409) {
          alert("Title cannot be duplicated");
        } else if (error.status = 404) {
          alert("Bad request");
        }
        this.close();
        this.outputs();
      }
    );
  }

  update() {
    this.service.update(this.news).subscribe(result => {
      this.requestStatus = result;
      if (this.requestStatus == 200) {
        alert("Update Successful");
        this.close();
      }
      this.outputs();
    });
  }

  save() {
    this.requestStatus = 1;
    if (this.isEdit) this.update();
    else this.add();
  }
}
