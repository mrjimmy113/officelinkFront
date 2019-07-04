import { Component, OnInit, Input, Output } from '@angular/core';
import {ModalService } from '../../service/modal.service';
import { from } from 'rxjs';
import {AccountService} from '../../service/account.service';
import {Account} from '../../model/account'
import { listenToElementOutputs } from '@angular/core/src/view/element';

@Component({
  selector: 'app-account-save',
  templateUrl: './account-save.component.html',
  styleUrls: ['./account-save.component.css']
})
export class AccountSaveComponent implements OnInit {

  constructor(private modalSer : ModalService , private accountSer : AccountService) { }

  @Input() inputs;
  @Output() outputs ;
  account : Account;
  requestStatus : Number;
  role : String


  ngOnInit() {
    this.init();
    

  }

  init(){
      if(this.inputs.length == 0){
        this.account = new Account();
      }
      this.account = this.inputs;
    
  }

  closeModal(){
      this.modalSer.destroy();
  }

  edit(){ 
      this.account.role == this.role;
      alert(this.account.role )
      this.accountSer.update(this.account).subscribe(res => {
          this.requestStatus = res;
      })
        
  }

}
