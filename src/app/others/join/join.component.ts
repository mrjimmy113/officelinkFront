import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../service/account.service'
import { Account } from 'src/app/model/account';
import {Router , ActivatedRoute} from '@angular/router'
import {Location} from '../../model/location';
import {Workplace} from '../../model/workplace'


import { from } from 'rxjs';


@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {

  account : Account;

  requestStatus;
  errorStatus;
  messContent : String;
  confirmPassText : String;
  workplace : Workplace;
  location : Location;

  constructor(private accountSer : AccountService , private _route : Router) { }

  ngOnInit() {
      this.account = new Account();
  }

  register(){

    this.account.role_id = 2;
    if(this.account.firstname == null || this.account.lastname == null || this.account.email == null || this.account.password == null
      ){
          alert("Input not empty. Try again")
      }
      if(this.account.password != this.confirmPassText ){
         alert("Password and Confirm password not match. Try again");
      }else{

        this.accountSer.create(this.account).subscribe(res =>
          {

            this.requestStatus = res;
            if(this.requestStatus == 200){
                alert("Welcome to office link")
                this._route.navigateByUrl("/login")
            }

          },
          error => {
            this.errorStatus = error.status;
            if(this.errorStatus == 409){
               alert("Sorry, email or workplace already exists, please check again")
            }
            if(error.status == 400){
              alert("The system has failed, please try again")
            }
          }
          )

      }

}


}
