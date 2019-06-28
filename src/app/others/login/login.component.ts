import { AuthenticationService } from './../../service/authentication.service';
import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../service/account.service'
import { from } from 'rxjs';
import { Account } from 'src/app/model/account';
import {Router , ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private authSer:AuthenticationService){}
  account:Account;
  ngOnInit() {
    this.account = new Account();
  }

  login() {
    this.authSer.login(this.account).subscribe(result => {
      console.log(result);
    })
  }






  }



