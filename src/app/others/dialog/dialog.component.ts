import { DialogService } from './../../service/dialog.service';
import { Component, OnInit, Input, Output, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  @Input() inputs;
  @Output() outputs;
  @ViewChild("cancelButton") cancelBtn : ElementRef;
  title : string;
  message : string;
  isConfirm = false;
  constructor() { }

  ngOnInit() {
    this.cancelBtn.nativeElement.focus();
    this.title = this.inputs[0];
    this.message = this.inputs[1];
    if(this.outputs[0] != undefined || this.outputs[0] != null) this.isConfirm = true;
  }

  confirm() {
    if(this.isConfirm) this.outputs[0]();
    this.outputs[1]();
  }

  cancel() {
    this.outputs[1]();
  }

}
