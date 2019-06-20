import { Component, OnInit, Input, Output } from '@angular/core';
import { Location } from '../model/location';
import { ModalService } from '../service/modal.service';
import { LocationService } from '../service/location.service';

@Component({
  selector: 'app-location-create',
  templateUrl: './location-create.component.html',
  styleUrls: ['./location-create.component.css']
})
export class LocationCreateComponent implements OnInit {

  @Input() inputs;
  @Output() outputs;
  location: Location;
  requestStatus: Number;
  isEdit = false;

  constructor(private modalService: ModalService, private service: LocationService) { }

  ngOnInit() {
    this.init();
  }

  init() {
    if (this.inputs.length == 0) {
      this.location = new Location();
    } else {
      this.location = this.inputs;
      this.isEdit = true;
    }
    this.requestStatus = 0;
  }

  close() {
    this.modalService.destroy();
  }

  add() {
    this.service.create(this.location).subscribe(result => {
      this.requestStatus = result;
      if (this.requestStatus == 201) {
        alert("Create Successful");
        this.close();
      }
      this.outputs();
    },
      error => {
        if (error.status == 409) {
          alert("Address cannot be duplicated");
        } else if (error.status = 404) {
          alert("Bad request");
        }
        this.close();
        this.outputs();
      }
    );
  }

  update() {
    this.service.update(this.location).subscribe(result => {
      this.requestStatus = result;
      if (this.requestStatus == 200) {
        alert("Update Successful");
        this.close();
      }
      this.outputs();
    });
  }

  save() {
    this.requestStatus = 1;
    if (this.isEdit) this.update();
    else this.add();
  }
}
