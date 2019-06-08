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
    this.search("");
  }

  search(value) {
    this.ser.search(value).subscribe(result => {
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
