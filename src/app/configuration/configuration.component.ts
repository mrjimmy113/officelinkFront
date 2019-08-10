import { Component, OnInit } from '@angular/core';
import { ModalService } from '../service/modal.service';
import { Configuration } from '../model/configuration';
import { ConfigurationService } from '../service/configuration.service';
import { ConfigurationSaveComponent } from '../configuration-save/configuration-save.component';
import { Workplace } from '../model/workplace';
import { UltisService } from '../service/ultis.service';

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
  isSort = "";

  constructor(private modalSer: ModalService, private ser: ConfigurationService, private ultisSer: UltisService) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.ser.searchGetPage("", 1).subscribe(result => {
      this.maxPage = result.maxPage;
      this.itemList = result.objList;
    });
  }

  getTimeFromCron(cronExpression: String) {
    let result = "";
    var list = cronExpression.split(" ");
    result = (Number(list[2]) < 10 ? "0"+list[2] : list[2]) + ":" + (Number(list[1]) < 10 ? "0"+list[1] : list[1]);
    return result;
  }

  getWeekDaysFromCron(cronExpression: String) {
    let result = "";
    var list = cronExpression.split(" ");
    result = list[5];
    if (result == "*") {
      result = "Every Day";
    }
    return result;
  }

  getMonthsFromCron(cronExpression: String) {
    let result = "";
    var list = cronExpression.split(" ");
    result = list[4];
    if (result == "*") {
      result = "Every Month";
    }
    return result;
  }

  search(value) {
    this.ser.searchGetPage(value, 1).subscribe(result => {
      this.maxPage = result.maxPage;
      this.itemList = result.objList;
    })
  }

  openCreate() {
    this.modalSer.init(ConfigurationSaveComponent, [], () => this.init());
  }

  openEdit(item) {
    this.modalSer.init(ConfigurationSaveComponent, item, () => this.init());
  }

  filter() {
    let newSearchTerm = this.searchTerm;
    setTimeout(() => {
      if (newSearchTerm == this.searchTerm) {
        this.search(this.searchTerm);
      }
    }, 300);
  }

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

  loadPage(pageNumber) {
    this.currentPage = pageNumber;
    this.ser.searchGetPage(this.searchTerm, pageNumber).subscribe(result => {
      this.maxPage = result.maxPage;
      this.itemList = result.objList;
    })
  }

  changeActive(config: Configuration) {
    this.ser.update(config).subscribe(
      error => {
        if (this.requestStatus == 400) alert("Bad request");
        config.active = !config.active;
      });
  }

  sort(property) {
    if (property == "surveyName") {
      if (this.isSort == property) {
        this.itemList.sort(this.sortConfigBySurveyASC());
        this.isSort = "";
      } else {
        this.itemList.sort(this.sortConfigBySurveyDSC());
        this.isSort = property;
      }
    } else {
      if (this.isSort == property) {
        this.itemList.sort(this.ultisSer.sortByPropertyNameDSC(property));
        this.isSort = "";
      } else {
        this.itemList.sort(this.ultisSer.sortByPropertyNameASC(property));
        this.isSort = property;
      }
    }
  }

  sortConfigBySurveyASC() {
    return function (a, b) {
      if (a['survey'].name < b['survey'].name) {
        return -1;
      }
      if (a['survey'].name > b['survey'].name) {
        return 1;
      }
      return 0;
    }
  }

  sortConfigBySurveyDSC() {
    return function (a, b) {
      if (a['survey'].name < b['survey'].name) {
        return 1;
      }
      if (a['survey'].name > b['survey'].name) {
        return -1;
      }
      return 0;
    }
  }
}
