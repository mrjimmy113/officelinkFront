import { DialogComponent } from './../others/dialog/dialog.component';
import { DomService } from './dom.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private domService: DomService) { }

  private modalElementId = 'my-dialog';
  private overlayElementId = 'overlay';

  componentRef;

  init(title : string, message : string, confirm : Function, cancel : Function) {
    let close = () => {
      if(cancel != undefined || cancel != null) cancel();
      this.destroy();
    }
    let componentConfig = {
      inputs : [title,message],
      outputs : [confirm,close],
    }

    this.componentRef = this.domService.appendComponentTo(this.modalElementId, DialogComponent, componentConfig);
    document.getElementById(this.modalElementId).className = 'show';
  }

  destroy() {
    this.domService.removeByComponentRef(this.componentRef);
    document.getElementById(this.modalElementId).className = 'hidden';
  }
}
