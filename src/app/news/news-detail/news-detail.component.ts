import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { News } from 'src/app/model/news';
import { NewsService } from 'src/app/service/news.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {

  news;

  constructor(
    private route: ActivatedRoute,
    private service: NewsService,
    private router: Router,
    private dom: DomSanitizer,
  ) { }

  ngOnInit() {
    this.news = new News();
    const itemId = +this.route.snapshot.params['id'];
    this.service.searchById(itemId).subscribe(result => {
      this.news = result;
      this.news.byte_image = this.doms('data:image/jpeg;charset=utf-8;base64,' + this.news.byte_image);
    })

  }

  doms(s) {
    return this.dom.bypassSecurityTrustUrl(s);
  }
}
