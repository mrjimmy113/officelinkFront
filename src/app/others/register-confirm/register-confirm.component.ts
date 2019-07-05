import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../service/account.service'
import { from } from 'rxjs';
import { Account } from 'src/app/model/account';
import {Router , ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-register-confirm',
  templateUrl: './register-confirm.component.html',
  styleUrls: ['./register-confirm.component.css']
})
export class RegisterConfirmComponent implements OnInit {

  account : Account;
  accountToken : String;
  errorStatus : Number;
  requestStatus : Number;



  constructor( private _route : ActivatedRoute ,private accountSer : AccountService) { }

  ngOnInit() {
      this.account = new Account();
      this.accountToken =  this._route.snapshot.paramMap.get('accountToken');
      this.accountSer.createAccountByToken(this.accountToken)
      this.accountSer.getAccountByToken(this.accountToken).subscribe(res => {
          this.account = res;
         
      })
    



  }

}
