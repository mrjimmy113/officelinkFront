import { MyMessage } from './../../const/message';
import { DialogService } from './../../service/dialog.service';
import { AccountService } from './../../service/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resend-account-confirm',
  templateUrl: './resend-account-confirm.component.html',
  styleUrls: ['./resend-account-confirm.component.css']
})
export class ResendAccountConfirmComponent implements OnInit {

  emailReset : String;


  constructor(private accountService : AccountService , private dialogService : DialogService) { }

  ngOnInit() {
  }

  resendConfirm(){
     this.accountService.resendConfirm(this.emailReset).subscribe(() => {
         this.dialogService.init("Resend Confirmation", "Please check your email", undefined,undefined);
     },
     error => {
       if(error.status == 409){
        this.dialogService.init("Resend Confirmation", "Your email is not valid", undefined,undefined);
       }
       if(error.status == 400){
        this.dialogService.init(MyMessage.errorTitle, MyMessage.error400Message, undefined,undefined);
       }

     }
     )


  }

}
