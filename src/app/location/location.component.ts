import { Component, OnInit } from '@angular/core';
import { ModalService } from '../service/modal.service';
import { LocationService } from '../service/location.service';


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  itemList;
  currentPage = 1;
  maxPage;
  searchTerm = "";

  constructor(private modalService: ModalService, private service: LocationService) { }

  ngOnInit() {
    this.service.search("").subscribe(result => {
      this.maxPage = result.maxPage;
      this.itemList = result.objList;
    });
  }

}
