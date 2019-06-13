import { Component, OnInit, Input, Output } from '@angular/core';
import { Department } from '../model/department';
import { ModalService } from '../service/modal.service';
import { DepartmentService } from '../service/department.service';
import { Location } from '../model/location';

@Component({
  selector: 'app-department-save',
  templateUrl: './department-save.component.html',
  styleUrls: ['./department-save.component.css']
})
export class DepartmentSaveComponent implements OnInit {
  @Input() inputs;
  @Output() outputs;
  department: Department;
  notSelectedLocations: Array<Location>;
  requestStatus: Number;
  isEdit = false;

  constructor(private modalSer: ModalService, private ser: DepartmentService) { }

  ngOnInit() {
    this.notSelectedLocations = this.generateLocation(6);
    this.init();
  }

  init() {
    if (this.inputs.length == 0) {
      this.department = new Department();
    } else {
      this.department = this.inputs;
      this.getDepartment(this.department.id);
      this.isEdit = true;
    }
    this.requestStatus = 0;
  }

  closeModal() {
    this.modalSer.destroy();
  }

  add() {
    this.ser.create(this.department).subscribe(
      result => {
        this.requestStatus = result;
        if (this.requestStatus == 201) {
          alert("Create Successful");
          this.closeModal();
        }
        this.outputs();
      },
      error => {
        if (error.status == 409) {
          alert("Name cannot be duplicated");
        } else if (error.status = 400) {
          alert("Bad request");
        }
        this.closeModal();
        this.outputs();
      }
    );
  }

  update() {
    this.ser.update(this.department).subscribe(
      result => {
        this.requestStatus = result;
        if (this.requestStatus == 200) {
          alert("Update Successful");
          this.closeModal();
        }
        this.outputs();
      },
      error => {
        if (this.requestStatus == 400) alert("Bad request");
        this.requestStatus = 0;
      });
  }

  save() {
    this.requestStatus = 1;
    if (this.isEdit) this.update();
    else this.add();
  }

  getDepartment(depId) {
    this.ser.getDepartmentWithTeams(depId).subscribe(
      result => {
        this.department = result;
        this.department.locations = this.generateLocation(1);
      },
      error => {
        alert("Something went wrong. Try again later.");
        this.closeModal();
      });
  }

  generateLocation(startId) {
    // test location
    let locations = new Array<Location>();
    var i = startId;
    for (i = 1; i <= 5; i++) {
      var loc: Location = {
        id: i,
        address: "Address" + i,
        city: "City" + i,
        county: "County" + i,
        dateCreated: null,
        dateModified: null,
        isDeleted: false,
      }
      locations.push(loc);
    }
    return locations;
    // end test
  }

  addLocation(location) {

  }

  removeLocation(locId) {
    var loc = this.department.locations.find(function (el) {
      return el.id == locId;
    })
    var index = this.department.locations.indexOf(loc);
    this.department.locations.splice(index, 1);
  }
}
