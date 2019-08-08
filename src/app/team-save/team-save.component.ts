import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Team } from "../model/team";
import { Department } from "../model/department";
import { ModalService } from "../service/modal.service";
import { TeamService } from "../service/team.service";
import { DepartmentService } from "../service/department.service";
import { DialogService } from '../service/dialog.service';
import { MyMessage } from '../const/message';

@Component({
  selector: "app-team-save",
  templateUrl: "./team-save.component.html",
  styleUrls: ["./team-save.component.css"]
})
export class TeamSaveComponent implements OnInit {
  @Input() inputs;
  @Output() outputs;
  team: Team;
  depList: Array<Department>;
  requestStatus: Number; // 0: no request, 1: requesting, 2: requested
  isEdit = false;
  choosenDepId: Number = 0;

  constructor(
    private modalSer: ModalService,
    private teamSer: TeamService,
    private depSer: DepartmentService,
    private dialogSer: DialogService
  ) { }

  ngOnInit() {
    this.init();
  }

  init() {
    // create new init modal
    if (this.inputs.length == 0) {
      this.team = new Team();
      this.getListDepartment();
    } else {
      // edit init modal
      this.team = this.inputs;
      this.choosenDepId = this.team.department.id;
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

  add() {
    this.getDepartment();
    this.teamSer.create(this.team).subscribe(
      result => {
        this.requestStatus = result;
        this.dialogSer.init(
          "Operation success",
          MyMessage.createTeam,
          undefined,
          () => this.closeModal()
        );
        this.outputs();
      },
      error => {
        if (error.status == 409) {
          this.dialogSer.init(
            "Operation fail",
            MyMessage.dupplicatedTeamName,
            undefined,
            undefined
          );
        } else if (error.status = 400) {
          this.dialogSer.init(
            "Operation fail",
            MyMessage.error400Message,
            undefined,
            undefined
          );
        }
        this.requestStatus = 0;
        this.outputs();
      }
    );
  }

  update() {
    this.getDepartment();
    this.teamSer.update(this.team).subscribe(
      result => {
        this.requestStatus = result;
        if (this.requestStatus == 200) {
          this.dialogSer.init(
            "Operation success",
            MyMessage.updateTeam,
            undefined,
            () => this.closeModal()
          );
        }
        this.outputs();
      },
      error => {
        if (error.status == 409) {
          this.dialogSer.init(
            "Operation fail",
            MyMessage.dupplicatedTeamName,
            undefined,
            undefined
          );
        } else if (error.status = 400) {
          this.dialogSer.init(
            "Operation fail",
            MyMessage.error400Message,
            undefined,
            undefined
          );
        }
        this.requestStatus = 0;
        this.outputs();
      }
    );
  }

  save() {
    this.requestStatus = 1;
    if (this.isEdit) this.update();
    else this.add();
  }

  getDepartment() {
    if (this.choosenDepId == 0) {
      this.team.department = null;
    } else {
      this.depList.forEach(e => {
        if (e.id == this.choosenDepId) this.team.department = e;
      });
    }
  }
}
