import { Component, OnInit, Input, Output } from '@angular/core';
import { Department } from '../model/department';
import { ModalService } from '../service/modal.service';
import { DepartmentService } from '../service/department.service';
import { Location } from '../model/location';
import { LocationService } from '../service/location.service';

@Component({
  selector: 'app-department-save',
  templateUrl: './department-save.component.html',
  styleUrls: ['./department-save.component.css']
})
export class DepartmentSaveComponent implements OnInit {
  @Input() inputs;
  @Output() outputs;
  department: Department;
  // notSelectedLocations: Array<Location>;
  requestStatus: Number;
  isEdit = false;

  constructor(private modalSer: ModalService, private depSer: DepartmentService, private locSer: LocationService) { }

  ngOnInit() {
    this.init();
  }

  init() {
    // this.notSelectedLocations = new Array<Location>();

    if (this.inputs.length == 0) {
      this.department = new Department();
      // this.department.locations = new Array<Location>();
      // this.locSer.getAllLocation().subscribe(
      //   result => {
      //     this.notSelectedLocations = result;
      //   });
    } else {
      this.department = this.inputs;

      // this.locSer.getLocationByDepartmnetId(this.department.id).subscribe(
      //   result => {
      //     this.department.locations = result;
      //     console.log(this.department.locations);
      //   });

      // this.locSer.getAllLocation().subscribe(
      //   result => {
      //     this.notSelectedLocations = result;
      //     console.log(this.notSelectedLocations);

      //     this.notSelectedLocations = this.ola(this.department.locations, this.notSelectedLocations);
          
      //     console.log(this.notSelectedLocations);
      //   });

      this.isEdit = true;
    }
    this.requestStatus = 0;
  }

  closeModal() {
    this.modalSer.destroy();
  }

  add() {
    this.depSer.create(this.department).subscribe(
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
    this.depSer.update(this.department).subscribe(
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

  // generateLocation(startId) {
  //   // test location
  //   let locations = new Array<Location>();
  //   var i = startId;
  //   for (i = 1; i <= 5; i++) {
  //     var loc: Location = {
  //       id: i,
  //       address: "Address" + i,
  //       city: "City" + i,
  //       county: "County" + i,
  //       dateCreated: null,
  //       dateModified: null,
  //       isDeleted: false,
  //     }
  //     locations.push(loc);
  //   }
  //   return locations;
  //   // end test
  // }

  // return a list of locations different in two array
  // ola(arr1:Array<Location>, arr2:Array<Location>) {
  //   arr1.forEach(element => {
  //     arr2 = arr2.filter(el => el.id != element.id);
  //   });
  //   return arr2;
  // }

  // addLocation(locId) {
  //   var loc = this.notSelectedLocations.find(function (el) {
  //     return el.id == locId;
  //   })
  //   var index = this.notSelectedLocations.indexOf(loc);
  //   this.notSelectedLocations.splice(index, 1);
  //   this.department.locations.push(loc);
  // }

  // removeLocation(locId) {
  //   var loc = this.department.locations.find(function (el) {
  //     return el.id == locId;
  //   })
  //   var index = this.department.locations.indexOf(loc);
  //   this.department.locations.splice(index, 1);
  //   this.notSelectedLocations.push(loc);
  // }
}
