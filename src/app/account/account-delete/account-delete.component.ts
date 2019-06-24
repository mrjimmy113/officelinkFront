import { Component, OnInit, Input, Output } from '@angular/core';
import {ModalService } from '../../service/modal.service';
import { from } from 'rxjs';
import {AccountService} from '../../service/account.service';
import {Account} from '../../model/account'
import { listenToElementOutputs } from '@angular/core/src/view/element';

@Component({

  selector: 'app-account-delete',
  templateUrl: './account-delete.component.html',
  styleUrls: ['./account-delete.component.css']
})
export class AccountDeleteComponent implements OnInit {
  @Input() inputs ;
  @Output() outputs ;
   requestStatus : Number ;
   itemList;
   maxPage;
   account : Account;

  constructor( private modalSer : ModalService , private accountSer : AccountService) { }

  ngOnInit() {
    
  }
  search(){
    this.accountSer.search("").subscribe(result => {
      this.itemList = result.objList;
      this.maxPage = result.maxPage;
    })
  }

  closeModal(){
    this.modalSer.destroy();
  }


  delete(){
    this.accountSer.delete(this.inputs).subscribe(res => {
      this.requestStatus = res;
      if(this.requestStatus == 200){
        this.closeModal();
        this.outputs();
    
      }
      else{
        alert(("Fail, try again"))
      }
    })
  }
  
}
