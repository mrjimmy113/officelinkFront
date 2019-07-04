import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../service/modal.service';
import { LocationService } from '../../service/location.service';
import { DatePipe } from '@angular/common';


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
  requestStatus: Number;

  constructor(
    private service: LocationService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit() {
    this.searchByName("");
  }

  searchByName(value) {
    this.service.searchByName(value).subscribe(result => {
      this.maxPage = result.maxPage;
      this.itemList = result.objList;
    })
  }

  filter() {
    let newSearchTerm = this.searchTerm;
    setTimeout(() => {
      if (newSearchTerm == this.searchTerm) {
        this.searchByName(this.searchTerm);
      }
    }, 300);
  }

  delete(id) {
    if (confirm("Are you sure to detele?")) {
      this.service.delete(id).subscribe(result => {
        this.requestStatus = result;
        if (this.requestStatus == 200) {
          this.searchByName("");
        }
      });
    }
  }
}
