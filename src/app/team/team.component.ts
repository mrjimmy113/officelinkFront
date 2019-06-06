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
  requestStatus:Number;

  constructor(private modalSer:ModalService, private ser:TeamService) { }

  ngOnInit() {
    this.search();
  }

  search() {
    this.ser.search("").subscribe(result => {
      this.maxPage = result.maxPage;
      this.itemList = result.objList;
    })
  }

  openCreate() {
    this.modalSer.init(TeamSaveComponent,[],() => this.search());
  }

  openEdit(item) {
    this.modalSer.init(TeamSaveComponent,item,() => this.search());
  }

  delete(id) {
    console.log(id);
    this.ser.delete(id).subscribe(result => {
      this.requestStatus = result;
      if (this.requestStatus == 200){
        this.search();
      }
      alert("success");
    });
  }
}
