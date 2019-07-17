import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../service/account.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  emailReset : String;


  constructor(private accountService : AccountService) { }

  ngOnInit() {
  }

  sendMailResetPass(){
    
     this.accountService.sendMailReset(this.emailReset).subscribe(result => {
       if(result == 200){
         alert("Please check your email to reset password");
        
       }
     },
     error => {
       if(error.status == 400){
         alert("Email not exist, try again")
       }
     }
     )


  }

}

