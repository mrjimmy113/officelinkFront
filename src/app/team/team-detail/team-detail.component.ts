import { Component, OnInit, Input } from '@angular/core';
import { Team } from 'src/app/model/team';
import { ModalService } from 'src/app/service/modal.service';
import { AccountService } from 'src/app/service/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent implements OnInit {
  @Input() inputs;
  team: Team;

  constructor(
    private modalSer:ModalService,
    private accSer:AccountService,
    private router: Router
    ) { }

  ngOnInit() {
    this.team = this.inputs;
    console.log(this.team);
  }

  closeModal() {
    this.modalSer.destroy();
  }

  unassigned(accId) {
    this.accSer.unassigned(this.team.id, accId).subscribe(
      result => {
        console.log(result)
      },
      error => {
        console.log(error);
      }
    );
  }

  redirectToAccount() {
    this.closeModal();
    this.router.navigateByUrl("/account");
  }
}
