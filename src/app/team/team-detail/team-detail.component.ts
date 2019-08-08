import { Component, OnInit, Input } from '@angular/core';
import { Team } from 'src/app/model/team';
import { ModalService } from 'src/app/service/modal.service';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent implements OnInit {
  @Input() inputs;
  team: Team;

  constructor(private modalSer:ModalService) { }

  ngOnInit() {
    this.team = this.inputs;
    console.log(this.team);
  }

  closeModal() {
    this.modalSer.destroy();
  }
}
