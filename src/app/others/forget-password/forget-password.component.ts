import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../service/account.service';
import { from } from 'rxjs';
import { DialogService } from "src/app/service/dialog.service";

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  emailReset : String;


  constructor(private accountService : AccountService , private dialogService : DialogService) { }

  ngOnInit() {
  }

  sendMailResetPass(){
     this.accountService.sendMailReset(this.emailReset).subscribe(result => {
       if(result == 200){
         this.dialogService.init("Office Link", "Please check your email to reset password", undefined,undefined);        
       }
     },
     error => {
       if(error.status == 404){
         this.dialogService.init("Office Link", "Email not exist, try again", undefined,undefined);  
       }

     }
     )

     
  }

}

