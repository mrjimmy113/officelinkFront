
import { AccountSaveComponent } from './../account-save/account-save.component';
import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../service/account.service'
import { Account } from '../../model/account';
import {Location} from '../../model/location';
import {Workplace} from '../../model/workplace';
import {PasswordInfo} from "../../model/passwordInfo"
import {MyMessage} from "../../const/message"
import { DialogService } from "src/app/service/dialog.service";

import { from } from 'rxjs';



@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.css']
})
export class AccountProfileComponent implements OnInit { 

  requestStatus : Number;
  account : Account;
  passwordInfo : PasswordInfo;
  currentPasswordText : String;
  newPasswordText : String;
  confrimPasswordText : String;


  

  constructor(private accountService : AccountService, private dialogSerive : DialogService) { };

  ngOnInit() {
    
    this.account = new Account();
    this.account.location = new Location();
    this.account.workplace = new Workplace();
    this.passwordInfo = new PasswordInfo();
    this.newPasswordText = "";
    this.currentPasswordText = "";


    
    this.getProfile();
    //this.changeProfile();
    
    
    
  }

  getProfile(){
    this.accountService.getProfile().subscribe(result => {
        this.account = result;
        console.log(this.account)
    })
    
  }

  changeProfile(){
    this.accountService.changeProfile(this.account).subscribe(res => {
       if(res == 200){
        this.dialogSerive.init("Change Profile" , MyMessage.profileSuccess , undefined , undefined);
       }

    })
  }

  changePassword(){
        this.passwordInfo.currentPassword = this.currentPasswordText;
        this.passwordInfo.email = this.account.email;
        this.passwordInfo.newPassword = this.newPasswordText;
        if(this.currentPasswordText == null || this.newPasswordText == null || this.confrimPasswordText == null ){
          this.dialogSerive.init("Form Require" , MyMessage.profileFillFormRequire , undefined , undefined);
        }
      else{
         
            this.accountService.changePassword(this.passwordInfo).subscribe(res => {
             
              if(res == 200){
                this.dialogSerive.init("Change Profile" , MyMessage.profileSuccess , undefined , undefined);
              }
            },
            error => {
              if(error.status == 400){
                this.dialogSerive.init("Operation Fail" , MyMessage.currentPasswordError , undefined , undefined);
              }
            }
            
            )

        }

  }

}
