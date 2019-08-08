import { forEach } from '@angular/router/src/utils/collection';
import { Component, OnInit } from '@angular/core';
import {ModalService} from '../../service/modal.service'
import { from } from 'rxjs';
import {AccountSaveComponent} from '../account-save/account-save.component'
import {Account} from '../../model/account';
import {AccountService} from '../../service/account.service';
import { AccountDeleteComponent } from '../account-delete/account-delete.component';
import { InvitationComponent } from '../invitation/invitation.component';
import { AssignAccountComponent } from '../assign-account/assign-account.component';
import { DialogService } from "src/app/service/dialog.service";
@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css'],
})
export class AccountListComponent implements OnInit {
  itemList;
  maxPage;
  currentPage = 1;
  requestStatus : Number;
  searchTerm = "";
  notAssign = false;


  constructor(private modalSer : ModalService, private accountSer : AccountService , private dialogSerive : DialogService ) {}

  ngOnInit() {
    this.itemList = new Array();
    this.search("");
    
  }

  toggle(event: Event) {
    if(this.notAssign){
        this.searchAccountNotAssign("");
    }else{
      this.search("")
    }

  }

  

  search(value) {
    this.accountSer.searchGetPage(value, 1).subscribe(result => {
      this.maxPage = result.maxPage;
      this.itemList = result.objList;
      console.log(this.itemList)
    })
  }

  searchAccountNotAssign(value) {
    this.accountSer.searchAccountNotAssign(value, 1).subscribe(result => {
      this.maxPage = result.maxPage;
      this.itemList = result.objList;
      console.log(this.itemList)
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

 

  delete(id){
    //this.modalSer.init(AccountDeleteComponent, id ,() => this.loadPage(this.currentPage));
    this.dialogSerive.init("Delete Account", "Do you want to delete this account", () => {
      this.accountSer.delete(id).subscribe(result => {
          this.loadPage(this.currentPage);
      }, err => {
        alert('Error');
      })
    },undefined);

    this.modalSer.destroy();

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
