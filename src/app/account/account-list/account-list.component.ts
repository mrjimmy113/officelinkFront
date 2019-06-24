import { Component, OnInit } from '@angular/core';
import {ModalService} from '../../service/modal.service'
import { from } from 'rxjs';
import {AccountSaveComponent} from '../account-save/account-save.component'
import {Account} from '../../model/account';
import {AccountService} from '../../service/account.service';
import { AccountDeleteComponent } from '../account-delete/account-delete.component';
import { InvitationComponent } from '../invitation/invitation.component';
@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
  itemList;
  maxPage;
  requestStatus : Number;
  searchTerm = ""


  constructor(private modalSer : ModalService, private accountSer : AccountService) {}

  ngOnInit() {
      this.search("");

  }
  

  search(value){
    this.accountSer.search(value).subscribe(result => {
      this.itemList = result.objList;
      this.maxPage = result.maxPage;
    })
  }

  filter() {
    let newSearchTerm = this.searchTerm;
    setTimeout(() => {
      if (newSearchTerm == this.searchTerm) {
        this.search(this.searchTerm);
      }
    }, 300);
  }

  openEdit(item){
    this.modalSer.init(AccountSaveComponent,item,() => this.search(""));
  }

  delete(id){
    
    this.modalSer.init(AccountDeleteComponent, id , () => this.search(""));

    
  }

  edit(item){
    this.modalSer.init(AccountSaveComponent, item , () => this.search(""));
  }

  openCreate(){
    this.modalSer.init(InvitationComponent, [] , () => this.search(""));
  }

  

  

}
