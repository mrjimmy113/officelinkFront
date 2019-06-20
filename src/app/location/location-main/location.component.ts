import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../service/modal.service';
import { LocationService } from '../../service/location.service';
import { LocationCreateComponent } from '../location-create/location-create.component';


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
  requestStatus:Number;

  constructor(private modalService: ModalService, private service: LocationService) { }

  ngOnInit() {
    this.search("");
  }

  search(value) {
    this.service.search(value).subscribe(result => {
      this.maxPage = result.maxPage;
      this.itemList = result.objList;
    })
  }

  filter() {
    let newSearchTerm = this.searchTerm;
    setTimeout(() => {
      if (newSearchTerm == this.searchTerm) {
        this.search(this.searchTerm);
      }
    }, 300);
  }

  create() {
    this.modalService.init(LocationCreateComponent,[],() => this.search(""));
  }

  edit(item) {
    this.modalService.init(LocationCreateComponent,item,() => this.search(""));
  }

  delete(id) {
    this.service.delete(id).subscribe(result => {
      this.requestStatus = result;
      if (this.requestStatus == 200){
        alert("success");
        this.search("");
      }
    });
  }
}
