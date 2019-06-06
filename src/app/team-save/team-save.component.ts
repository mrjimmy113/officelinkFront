import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Team } from '../model/team';
import { ModalService } from '../service/modal.service';
import { TeamService } from '../service/team.service';
import { refreshDescendantViews } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-team-save',
  templateUrl: './team-save.component.html',
  styleUrls: ['./team-save.component.css']
})
export class TeamSaveComponent implements OnInit {
  @Input() inputs;
  @Output() outputs
  team:Team;
  requestStatus:Number;
  isEdit = false;

  constructor(private modalSer:ModalService, private ser:TeamService) { }

  ngOnInit() {
    console.log(this.outputs);
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
    this.ser.create(this.team).subscribe(result => {
      this.requestStatus = result;
      if (this.requestStatus == 201) {
        this.closeModal();
      } 
      this.outputs();
    },
    error => {
      console.log(error);
      if (error.status == 409){
        alert("Name cannot be duplicated");
      } else if (error.status = 404) {
        alert("Bad request");
      }
      this.closeModal();
      this.outputs();
    }
    );
  }

  update() {
    this.ser.update(this.team).subscribe(result => {
      this.requestStatus = result;
      if (this.requestStatus == 200) this.closeModal();
      this.outputs();
    });
  }

  save() {
    this.requestStatus = 1;
    if (this.isEdit) this.update();
    else this.add();
  }
}
