import { Component, OnInit, Input, Output } from '@angular/core';
import { Department } from '../model/department';
import { ModalService } from '../service/modal.service';
import { DepartmentService } from '../service/department.service';

@Component({
  selector: 'app-department-save',
  templateUrl: './department-save.component.html',
  styleUrls: ['./department-save.component.css']
})
export class DepartmentSaveComponent implements OnInit {
  @Input() inputs;
  @Output() outputs;
  department:Department;
  requestStatus:Number;
  isEdit = false;
  
  constructor(private modalSer:ModalService, private ser:DepartmentService) { }

  ngOnInit() {
    this.init();
  }

  init() {
    if (this.inputs.length == 0) {
      this.department = new Department();
    }else {
      this.department = this.inputs;
      this.isEdit = true;
    }
    this.requestStatus = 0;
  }

  closeModal() {
    this.modalSer.destroy();
  }

  add() {
    if (this.isEdit == false) {
      this.department.id = 0;
    }
    this.ser.create(this.department).subscribe(result => {
      this.requestStatus = result;
      if (this.requestStatus == 201) {
        this.closeModal();
      } 
      this.outputs();
    },
    error => {
      console.log(error);
      if (error.status == 409){
        alert("Name cannot be duplicated");
      } else if (error.status = 404) {
        alert("Bad request");
      }
      this.closeModal();
      this.outputs();
    }
    );
  }

  update() {
    this.ser.update(this.department).subscribe(result => {
      this.requestStatus = result;
      if (this.requestStatus == 200) this.closeModal();
      this.outputs();
    });
  }

  save() {
    this.requestStatus = 1;
    if (this.isEdit) this.update();
    else this.add();
  }
}
