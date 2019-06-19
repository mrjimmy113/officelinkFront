import { Component, OnInit } from '@angular/core';
import { ModalService } from '../service/modal.service';
import { WorkplaceService } from '../service/workplace.service';
import { WorkplaceSaveComponent } from '../workplace-save/workplace-save.component';

@Component({
  selector: 'app-workplace',
  templateUrl: './workplace.component.html',
  styleUrls: ['./workplace.component.css']
})
export class WorkplaceComponent implements OnInit {
  itemList;
  currentPage = 1;
  maxPage;
  searchTerm = "";
  requestStatus: Number;

  constructor(private modalSer: ModalService, private ser: WorkplaceService) { }

  ngOnInit() {
    this.search("");
  }

  search(value) {
    this.ser.search(value).subscribe(result => {
      this.maxPage = result.maxPage;
      this.itemList = result.objList;
    })
  }

  openCreate() {
    this.modalSer.init(WorkplaceSaveComponent, [], () => this.search(""));
  }

  openEdit(item) {
    this.modalSer.init(WorkplaceSaveComponent, item, () => this.search(""));
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
    this.ser.delete(id).subscribe(result => {
      this.requestStatus = result;
      if (this.requestStatus == 200) {
        alert("Success");
        this.search("");
      }
    });
  }
}
