
import { AccountSaveComponent } from './../account-save/account-save.component';
import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../service/account.service'
import { Account } from '../../model/account';
import {Location} from '../../model/location';
import {Workplace} from '../../model/workplace'
import { from } from 'rxjs';



@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.css']
})
export class AccountProfileComponent implements OnInit { 

  requestStatus : Number;
  account : Account;

  constructor(private accountService : AccountService) { };

  ngOnInit() {
    this.account = new Account();
    this.account.location = new Location();
    this.account.workplace = new Workplace();
    this.getProfile();
    //this.changeProfile();
    
    
    
  }

  getProfile(){
    this.accountService.getProfile().subscribe(result => {
        this.account = result;
        console.log(this.account)
    })
    
  }

  // changeProfile(){
    
  //   this.accountService.update(this.account).subscribe(res => {
          
  //     this.requestStatus = res;
  //     if(this.requestStatus == 201){
  //       alert("Change profile success")
  //     }
    
     
  // })

  // }

}
