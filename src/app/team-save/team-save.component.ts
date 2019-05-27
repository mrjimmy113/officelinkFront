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
    if (this.inputs.lenght == 0) {
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
    console.log(this.team);
    this.ser.create(this.team).subscribe(result => console.log(result));
  }
}
