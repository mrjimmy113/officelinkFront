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

  constructor(private modalSer:ModalService, private ser:TeamService) { }

  ngOnInit() {
    this.ser.search("").subscribe(result => {
      this.maxPage = result.maxPage;
      this.itemList = result.objList;
      console.log(result);
    })
  }

  openCreate() {
    this.modalSer.init(TeamSaveComponent,[],[]);
  }

  openEdit(item) {
    this.modalSer.init(TeamSaveComponent,item,[]);
  }
}
