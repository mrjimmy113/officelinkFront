import { AccountService } from './../../service/account.service';
import { Component, OnInit } from '@angular/core';
import {Router , ActivatedRoute} from '@angular/router';
import {resetpassworkInfo} from '../../model/resetpasswordInfo'
import { from } from 'rxjs';


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

  constructor(private _route : ActivatedRoute ,private accountService : AccountService) { }

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
        alert("Input not empty, try again")
      }
      if(this.newPass != this.confirmNewPass){
        alert("New password and Confirm password not match");
      }else{
        
        this.accountService.resetPassword(this.resetPasswordInfo).subscribe(res => {
          alert("Change password success");
        })
      }
      
  }



}
