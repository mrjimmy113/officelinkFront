import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Team } from '../model/team';
import { Department } from '../model/department';
import { ModalService } from '../service/modal.service';
import { TeamService } from '../service/team.service';
import { DepartmentService } from '../service/department.service';

@Component({
  selector: 'app-team-save',
  templateUrl: './team-save.component.html',
  styleUrls: ['./team-save.component.css']
})
export class TeamSaveComponent implements OnInit {
  @Input() inputs;
  @Output() outputs;
  team: Team;
  depList: Array<Department>;
  requestStatus: Number; // 0: no request, 1: requesting, 2: requested
  isEdit = false;

  constructor(private modalSer: ModalService, private teamSer: TeamService, private depSer: DepartmentService) { }

  ngOnInit() {
    this.init();
  }

  init() {
    // create new init modal
    if (this.inputs.length == 0) {
      this.team = new Team();
      this.getListDepartment();
    } else { // edit init modal
      this.team = this.inputs;
      this.getListDepartment();
      this.isEdit = true;
    }
    this.requestStatus = 0;
  }

  closeModal() {
    this.modalSer.destroy();
  }

  // get list department and store in depList
  getListDepartment() {
    this.depSer.getAll().subscribe(result => {
      this.depList = result;
    });
  }

  selectDepartment(depId) {
    var dep = this.depList.find(function (el) {
      return el.id == depId
    })

    this.team.department = dep;
  }

  add() {
    this.teamSer.create(this.team).subscribe(result => {
      this.requestStatus = result;
      alert("Create Successful");
      this.closeModal();
      this.outputs();
    },
      error => {
        if (error.status == 409) {
          alert("Name cannot be duplicated");
        } else if (error.status = 404) {
          alert("Bad request");
        }
        this.outputs();
      }
    );
  }

  update() {
    this.teamSer.update(this.team).subscribe(result => {
      this.requestStatus = result;
      alert("Update Successful");
      this.closeModal();
      this.outputs();
    },
      error => {
        if (this.requestStatus == 400) alert("Some Error happened");
      });
  }

  save() {
    this.requestStatus = 1;
    if (this.isEdit) this.update();
    else this.add();
  }
}
