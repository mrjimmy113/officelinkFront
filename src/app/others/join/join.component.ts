import { HttpResponse } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../service/account.service'
import { Account } from 'src/app/model/account';
import {Router , ActivatedRoute} from '@angular/router'
import {Location} from '../../model/location';
import {Workplace} from '../../model/workplace'
import { DialogService } from "src/app/service/dialog.service";
import {MyMessage} from "../../const/message"



import { from } from 'rxjs';


@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {

  account : Account;
  token;
  requestStatus;
  errorStatus;
  messContent : String;
  confirmPassText : String;
  workplace : Workplace;
  location : Location;

  constructor(private accountSer : AccountService , private route : ActivatedRoute, private _route:Router , private dialogService : DialogService) { }

  ngOnInit() {
      this.account = new Account();
      this.route.params.subscribe(params => {
        this.token = params["token"];
        this.accountSer.getInvitationInfor(this.token).subscribe(result => {
          this.account = result;

        },(err: HttpErrorResponse) => {
          if (err.status == 409) {
            this.dialogService.init(
              MyMessage.accountRegisterTitle,
              MyMessage.accountRegisterActive,
              undefined,
              () => {this._route.navigateByUrl("")}
            );
          } else if (err.status == 410) {
            this.dialogService.init(
              MyMessage.accountRegisterTitle,
              MyMessage.accountRegisterExpire,
              undefined,
              () => {this._route.navigateByUrl("")}
            );
          }
        })
      })
  }

  goLogin(){
    this._route.navigateByUrl("/login");
  }

  register(){


    this.account.role_id = 2;
    if(this.account.firstname == null || this.account.lastname == null || this.account.email == null || this.account.password == null
      ){
          // alert("Input not empty. Try again")
          this.dialogService.init("Form Require", MyMessage.joinFillFormRequire, undefined,undefined);
      }
     else{

        this.accountSer.updateEmployee(this.account).subscribe(res =>
          {

            this.requestStatus = res;
            if(this.requestStatus == 200){
                //alert("Welcome to office link")
                this.dialogService.init("Sign-Up", MyMessage.welcomeMessage, undefined,undefined);
                this._route.navigateByUrl("/login")
            }

          },
          error => {
            this.errorStatus = error.status;
            if(this.errorStatus == 409){
               //alert("Sorry, email already exists, please check again")
            }
            if(error.status == 400){
              //alert("The system has failed, please try again")
              this.dialogService.init("400", MyMessage.error400Message, undefined,undefined);
            }

          }
          )

      }

}


}
