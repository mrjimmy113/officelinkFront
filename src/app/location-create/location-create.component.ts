import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from '../service/modal.service';
import { LocationService } from '../service/location.service';

@Component({
  selector: 'app-location-create',
  templateUrl: './location-create.component.html',
  styleUrls: ['./location-create.component.css']
})
export class LocationCreateComponent implements OnInit {

  @Input() input;
  location:Location;
  requestStatus:Number;
  isEdit:boolean;

  constructor(private modalService:ModalService, private service:LocationService) { }

  ngOnInit() {
    this.init();
  }

  init() {
    if(this.input.length == 0) {
      this.location = new Location();
    } else {
      this.location = this.input;
      this.isEdit = true;
    }
    this.requestStatus = 0;
  }

  close() {
    this.modalService.destroy();
  }

  add() {
    this.service.create(this.location);
  }
}
