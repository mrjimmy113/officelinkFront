import { Component, OnInit, Input } from '@angular/core';
import { Team } from 'src/app/model/team';
import { ModalService } from 'src/app/service/modal.service';
import { AccountService } from 'src/app/service/account.service';
import { Router } from '@angular/router';
import { Account } from 'src/app/model/account';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent implements OnInit {
  @Input() inputs;
  team: Team;
  emps: Array<Account>;
  pagedEmps: Array<Account>;
  currentPage = 1;
  maxPage = 1;

  constructor(
    private modalSer: ModalService,
    private accSer: AccountService,
    private router: Router
  ) { }

  ngOnInit() {
    this.team = this.inputs;
    this.emps = this.team.accounts;
    if (this.emps != undefined && this.emps.length > 0) {
      this.maxPage = this.countMaxPage(this.emps.length);
      this.loadPage(1);
    }
  }

  loadPage(pageNumber) {
    if (pageNumber <= this.maxPage) {
      this.currentPage = pageNumber;
      this.pagedEmps = this.emps.slice((this.currentPage - 1) * 5, (this.currentPage * 5));
    }
  }

  countMaxPage(length) {
    if (length > 0) {
      return Math.ceil(length / 5);
    }
  }

  closeModal() {
    this.modalSer.destroy();
  }

  unassigned(accId) {
    this.accSer.unassigned(this.team.id, accId).subscribe(
      result => {
        this.team.accounts.splice(this.getAccPosition(accId), 1);
        this.emps = this.team.accounts;
        this.countMaxPage(this.emps.length);
        this.loadPage(this.currentPage);
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

  getAccPosition(accId) {
    return this.team.accounts.map(function (acc) {
      return acc.id;
    }).indexOf(accId);
  }
}
