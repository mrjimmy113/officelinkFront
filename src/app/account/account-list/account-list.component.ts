import { Component, OnInit } from '@angular/core';
import {ModalService} from '../../service/modal.service'
import { from } from 'rxjs';
import {AccountSaveComponent} from '../account-save/account-save.component'
import {Account} from '../../model/account';
import {AccountService} from '../../service/account.service';
import { AccountDeleteComponent } from '../account-delete/account-delete.component';
import { InvitationComponent } from '../invitation/invitation.component';
import { AssignAccountComponent } from '../assign-account/assign-account.component';
@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
  itemList;
  maxPage;
  currentPage = 1;
  requestStatus : Number;
  searchTerm = ""


  constructor(private modalSer : ModalService, private accountSer : AccountService) {}

  ngOnInit() {
      this.search("");

  }

  search(value) {
    this.accountSer.searchGetPage(value, 1).subscribe(result => {
      this.maxPage = result.maxPage;
      this.itemList = result.objList;
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
    this.modalSer.init(AccountSaveComponent,item,() => this.loadPage(this.currentPage));
  }

  delete(id){

    this.modalSer.init(AccountDeleteComponent, id ,() => this.loadPage(this.currentPage));


  }

  edit(item){
    this.modalSer.init(AccountSaveComponent, item , () => this.loadPage(this.currentPage));
  }

  openCreate(){
    this.modalSer.init(InvitationComponent, [] , () => this.loadPage(this.currentPage));
  }

  openAssign(id){
    this.modalSer.init(AssignAccountComponent,  id, () => this.loadPage(this.currentPage));
  }

  sort(property) {

  }

  loadPage(pageNumber) {
    this.currentPage = pageNumber;
    this.accountSer.searchGetPage(this.searchTerm, pageNumber).subscribe(result => {
      this.maxPage = result.maxPage;
      this.itemList = result.objList;
    })
  }



}
