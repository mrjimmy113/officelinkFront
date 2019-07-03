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
  emailParam : String;
  errorStatus : Number;
  requestStatus : Number;



  constructor( private _route : ActivatedRoute ,private accountSer : AccountService) { }

  ngOnInit() {
      this.account = new Account();
      this.emailParam =  this._route.snapshot.paramMap.get('accountToken');

      this.account.email = this.emailParam;
      
    
        this.accountSer.getAccountByEmail(this.account.email).subscribe(res => {
          this.account = res;
          
    })
      
      
    



  }

}
