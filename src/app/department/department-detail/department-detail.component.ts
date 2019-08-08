import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from 'src/app/service/modal.service';
import { Department } from 'src/app/model/department';
import { Router } from '@angular/router';

@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.component.html',
  styleUrls: ['./department-detail.component.css']
})
export class DepartmentDetailComponent implements OnInit {
  @Input() inputs;
  dep: Department;

  constructor(
    private modalSer:ModalService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.dep = this.inputs;
  }

  closeModal() {
    this.modalSer.destroy();
  }

  redirectToTeam() {
    this.closeModal();
    this.router.navigateByUrl("/account");
  }
}
