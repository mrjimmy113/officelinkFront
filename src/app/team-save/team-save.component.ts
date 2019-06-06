import { Component, OnInit, Input } from '@angular/core';
import { Team } from '../model/team';
import { ModalService } from '../service/modal.service';
import { TeamService } from '../service/team.service';

@Component({
  selector: 'app-team-save',
  templateUrl: './team-save.component.html',
  styleUrls: ['./team-save.component.css']
})
export class TeamSaveComponent implements OnInit {
  @Input() inputs;
  team:Team;
  requestStatus:Number;
  isEdit = false;

  constructor(private modalSer:ModalService, private ser:TeamService) { }

  ngOnInit() {
    this.init();
  }

  init() {
    if (this.inputs.length == 0) {
      this.team = new Team();
    }else {
      this.team = this.inputs;
      this.isEdit = true;
    }

    this.requestStatus = 0;
  }

  closeModal() {
    this.modalSer.destroy();
  }

  add() {
    if (this.isEdit == false) {
      this.team.id = 0;
    }
    this.ser.create(this.team).subscribe(result => console.log(result));
  }
}
