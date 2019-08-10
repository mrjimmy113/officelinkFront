import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from 'src/app/service/modal.service';
import { Department } from 'src/app/model/department';
import { Router } from '@angular/router';
import { Team } from 'src/app/model/team';

@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.component.html',
  styleUrls: ['./department-detail.component.css']
})
export class DepartmentDetailComponent implements OnInit {
  @Input() inputs;
  dep: Department;
  teams: Array<Team>;
  pagedTeams: Array<Team>;
  currentPage = 1;
  maxPage = 1;

  constructor(
    private modalSer:ModalService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.dep = this.inputs;
    this.teams = this.dep.teams;
    if (this.teams != undefined && this.teams.length > 0) {
      this.maxPage = this.countMaxPage(this.teams.length);
      this.loadPage(1);
    }
  }

  closeModal() {
    this.modalSer.destroy();
  }

  redirectToTeam() {
    this.closeModal();
    this.router.navigateByUrl("/team");
  }

  loadPage(pageNumber) {
    if (pageNumber <= this.maxPage) {
      this.currentPage = pageNumber;
      this.pagedTeams = this.teams.slice((this.currentPage - 1) * 5, (this.currentPage * 5));
    }
  }

  countMaxPage(length) {
    if (length > 0) {
      return Math.ceil(length / 5);
    }
  }
}
