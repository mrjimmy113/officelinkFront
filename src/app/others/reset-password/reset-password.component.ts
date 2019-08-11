import { AccountService } from './../../service/account.service';
import { Component, OnInit } from '@angular/core';
import {Router , ActivatedRoute} from '@angular/router';
import {resetpassworkInfo} from '../../model/resetpasswordInfo'
import { from } from 'rxjs';
import { MyMessage} from "../../const/message";
import { DialogService } from "src/app/service/dialog.service";


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  token : String;
  newPass : String;
  confirmNewPass : String;
  resetPasswordInfo : resetpassworkInfo;

  constructor(private _route : ActivatedRoute ,private accountService : AccountService , private dialogService : DialogService) { }

  ngOnInit() {
   
    this.resetPasswordInfo = new resetpassworkInfo();
    this.token =  this._route.snapshot.paramMap.get('emailToken');
    this.newPass = "";
    this.confirmNewPass = "";
   
    
  }

  changePassword(){
    this.resetPasswordInfo.emailToken = this.token;
    this.resetPasswordInfo.newPassword = this.newPass;
      if(this.newPass == null || this.confirmNewPass == null){
        this.dialogService.init("Form Require",MyMessage.resetPasswordFillFormRequire, undefined,undefined);
      }
     else{
        
        this.accountService.resetPassword(this.resetPasswordInfo).subscribe(res => {
          this.dialogService.init("Reset password",MyMessage.resetPasswordSuccess, undefined,undefined);
        })
      }
      
  }



}
