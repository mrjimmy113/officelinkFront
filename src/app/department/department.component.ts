import { Component, OnInit } from '@angular/core';
import { ModalService } from '../service/modal.service';
import { DepartmentService } from '../service/department.service';
import { DepartmentSaveComponent } from '../department-save/department-save.component';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  itemList;
  currentPage = 1;
  maxPage;
  searchTerm = "";
  requestStatus: Number;

  constructor(private modalSer: ModalService, private ser: DepartmentService) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.ser.searchGetPage("", 1).subscribe(result => {
      this.maxPage = result.maxPage;
      this.itemList = result.objList;
    });
  }

  search(value) {
    this.ser.searchGetPage(value, 1).subscribe(result => {
      this.maxPage = result.maxPage;
      this.itemList = result.objList;
    })
  }

  openCreate() {
    this.modalSer.init(DepartmentSaveComponent, [], () => this.search(""));
  }

  openEdit(item) {
    this.modalSer.init(DepartmentSaveComponent, item, () => this.search(""));
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
          this.search("");
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
}
