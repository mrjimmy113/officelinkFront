import { Component, OnInit } from '@angular/core';
import { ModalService } from '../service/modal.service';
import { Configuration } from '../model/configuration';
import { ConfigurationService } from '../service/configuration.service';
import { ConfigurationSaveComponent } from '../configuration-save/configuration-save.component';
import { Workplace } from '../model/workplace';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
  itemList;
  currentPage = 1;
  maxPage;
  searchTerm = "";
  requestStatus: Number;
  workplace: Workplace;

  constructor(private modalSer: ModalService, private ser: ConfigurationService) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.ser.getAllByWorkplace(1).subscribe(result => {
      this.maxPage = result.maxPage;
      this.itemList = result.objList;
    });
  }

  getTimeFromCron(cronExpression: String) {
    let result = "";
    var list = cronExpression.split(" ");
    result = list[2] + ":" + list[1];
    return result;
  }

  getWeekDaysFromCron(cronExpression: String) {
    let result = "";
    var list = cronExpression.split(" ");
    result = list[5];
    return result;
  }

  // search(value) {
  //   this.ser.search(value).subscribe(result => {
  //     this.maxPage = result.maxPage;
  //     this.itemList = result.objList;
  //   })
  // }

  openCreate() {
    this.modalSer.init(ConfigurationSaveComponent, [], () => this.init());
  }

  openEdit(item) {
    this.modalSer.init(ConfigurationSaveComponent, item, () => this.init());
  }

  // filter() {
  //   let newSearchTerm = this.searchTerm;
  //   setTimeout(() => {
  //     if (newSearchTerm == this.searchTerm) {
  //       this.search(this.searchTerm);
  //     }
  //   }, 300);
  // }

  delete(id) {
    if (confirm("Do you want to delete this")) {
      this.ser.delete(id).subscribe(result => {
        this.requestStatus = result;
        if (this.requestStatus == 200) {
          alert("Success");
          this.init();
        }
      });
    }
  }

  // loadPage(pageNumber) {
  //   this.currentPage = pageNumber;
  //   this.ser.getPage(this.searchTerm, pageNumber).subscribe(result => {
  //     this.maxPage = result.maxPage;
  //     this.itemList = result.objList;
  //   })
  // }

  changeActive(config: Configuration) {
    this.ser.update(config).subscribe(
      error => {
        if (this.requestStatus == 400) alert("Bad request");
        config.isActive = !config.isActive;
      });
  }
}
