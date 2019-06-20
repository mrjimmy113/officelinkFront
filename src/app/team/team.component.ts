import { Component, OnInit } from '@angular/core';
import { ModalService } from '../service/modal.service';
import { TeamService } from '../service/team.service';
import { TeamSaveComponent } from '../team-save/team-save.component';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  itemList;
  currentPage = 1;
  maxPage;
  searchTerm = "";
  requestStatus: Number;

  constructor(private modalSer: ModalService, private ser: TeamService) { }

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
    this.modalSer.init(TeamSaveComponent, [], () => this.search(""));
  }

  openEdit(item) {
    this.modalSer.init(TeamSaveComponent, item, () => this.search(""));
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
          alert("success");
          this.search("");
        }
      });
    }
  }

  loadPage(pageNumber) {
    this.currentPage = pageNumber;
    this.ser.getPage(this.searchTerm, pageNumber).subscribe(result => {
      this.maxPage = result.maxPage;
      this.itemList = result.objList;
    })
  }
}
