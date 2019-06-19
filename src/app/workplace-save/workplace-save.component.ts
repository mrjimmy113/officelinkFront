import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ModalService } from "../service/modal.service";
import { WorkplaceService } from "../service/workplace.service";
import { Workplace } from "../model/workplace";

@Component({
  selector: "app-workplace-save",
  templateUrl: "./workplace-save.component.html",
  styleUrls: ["./workplace-save.component.css"]
})
export class WorkplaceSaveComponent implements OnInit {
  @Input() inputs;
  @Output() outputs;
  workplace: Workplace;
  requestStatus: Number; // 0: no request, 1: requesting, 2: requested
  isEdit = false;

  constructor(
    private modalSer: ModalService,
    private workpSer: WorkplaceService,
  ) { }

  ngOnInit() {
    this.init();
  }

  init() {
    // create new init modal
    if (this.inputs.length == 0) {
      this.workplace = new Workplace();
    } else {
      // edit init modal
      this.workplace = this.inputs;
      this.isEdit = true;
    }
    this.requestStatus = 0;
  }

  closeModal() {
    this.modalSer.destroy();
  }


  add() {
    this.workpSer.create(this.workplace).subscribe(
      result => {
        this.requestStatus = result;
        alert("Create Successful");
        this.closeModal();
        this.outputs();
      },
      error => {
        if (error.status == 409) {
          alert("Name cannot be duplicated");
        } else if ((error.status = 404)) {
          alert("Bad request");
        }
        this.requestStatus = 0;
        this.outputs();
      }
    );
  }

  update() {
    this.workpSer.update(this.workplace).subscribe(
      result => {
        this.requestStatus = result;
        if (this.requestStatus == 200) {
          alert("Update Successful");
          this.closeModal();
        }
        this.outputs();
      },
      error => {
        if (error.status == 409) {
          alert("Name cannot be duplicated");
        } else if ((error.status = 404)) {
          alert("Bad request");
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

}
