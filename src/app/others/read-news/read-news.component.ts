import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/model/news';
import { NewsService } from 'src/app/service/news.service';

@Component({
  selector: 'app-read-news',
  templateUrl: './read-news.component.html',
  styleUrls: ['./read-news.component.css']
})
export class ReadNewsComponent implements OnInit {
  listNews : News[];
  currentPage = 0;
  maxPage = 0;
  constructor(private newsSer:NewsService) { }

  ngOnInit() {
    this.newsSer.getLastest(this.currentPage).subscribe(result => {
      this.listNews = result.objList;
      this.maxPage = result.maxPage.valueOf();
    })
  }

}
