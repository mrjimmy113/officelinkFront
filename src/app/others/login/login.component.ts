import { NgForm } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { AuthenticationService } from './../../service/authentication.service';
import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../service/account.service'
import { from } from 'rxjs';
import { Account } from 'src/app/model/account';
import {Router , ActivatedRoute} from '@angular/router'
import { DisplayService } from 'src/app/service/display.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() activeSurvey = new EventEmitter();
  constructor(private authSer:AuthenticationService, private route:Router, private displaySer:DisplayService){}
  account:Account;
  isError = false;
  ngOnInit() {
    this.account = new Account();
  }

  login(loginForm : NgForm) {
    if(loginForm.valid) {
      this.isError = false;
      this.displaySer.showLoader();
      this.authSer.login(this.account).subscribe(result => {
        if(result != null) {
          this.authSer.setAuth(result);
          if(this.activeSurvey.observers.length > 0) {
            this.activeSurvey.emit();
          }else {
            this.route.navigate(['']);
          }
        }
        else this.isError =true;
        this.displaySer.hideLoader();
      })
    }

  }






  }



