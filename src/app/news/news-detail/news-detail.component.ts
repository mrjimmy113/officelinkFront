import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { News } from 'src/app/model/news';
import { NewsService } from 'src/app/service/news.service';
import { DomSanitizer } from '@angular/platform-browser';
import { DateRangePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { DatePipe } from '@angular/common';
import { DialogService } from "src/app/service/dialog.service";
import { MyMessage } from 'src/app/const/message';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {

  @ViewChild("rangeObj") rangeObj: DateRangePickerComponent;

  news;
  itemList;
  today: Date = new Date();
  currentYear: number = this.today.getFullYear();
  currentMonth: number = this.today.getMonth();
  currentDay: number = this.today.getDate();
  endDate: Object = new Date(this.currentYear, this.currentMonth, this.currentDay);
  startDate: Object = new Date(this.currentYear, this.currentMonth - 1, this.currentDay);
  minDays: Number = 7;
  maxDays: Number = 60;

  constructor(
    private route: ActivatedRoute,
    private service: NewsService,
    private router: Router,
    private dom: DomSanitizer,
    private datePipe: DatePipe,
    private dialogSer: DialogService,
  ) { }

  ngOnInit() {
    this.itemList = new Array;
    const itemId = +this.route.snapshot.params['id'];
    this.findById(itemId);
    this.findByDate();
  }

  findById(itemId) {
    this.news = new News();
    this.service.searchById(itemId).subscribe(result => {
      this.news = result;
      this.news.byte_image = this.doms('data:image/jpeg;charset=utf-8;base64,' + this.news.byte_image);
      this.news.dateCreated = this.datePipe.transform(this.news.dateCreated, 'yyyy-MM-dd');
    }, err => {
      this.dialogSer.init("News Detail", MyMessage.error400Message, undefined, undefined);
    })
  }

  findByDate() {
    this.service.searchByDate(this.datePipe.transform(this.startDate, 'yyyy-MM-dd'), this.datePipe.transform(this.endDate, 'yyyy-MM-dd')).subscribe(result => {
      this.itemList = result;
    }, err => {
      this.dialogSer.init("News Detail", MyMessage.error400Message, undefined, undefined);
    })
  }

  doms(s) {
    return this.dom.bypassSecurityTrustUrl(s);
  }

  onChange(args: any) {
    this.startDate = this.rangeObj.startDate;
    this.endDate = this.rangeObj.endDate;
    this.findByDate();
  }

  onClick(item) {
    var myUrl = `news/${item.id}/detail`;
    this.router.navigateByUrl(myUrl);
    this.findById(item.id);
  }

}
