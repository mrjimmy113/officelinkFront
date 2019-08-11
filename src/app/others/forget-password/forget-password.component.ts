import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../service/account.service';
import { from } from 'rxjs';
import { DialogService } from "src/app/service/dialog.service";
import {MyMessage} from "../../const/message"

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
         this.dialogService.init("Forger Password", MyMessage.inputEmailSuccess, undefined,undefined);        
       }
     },
     error => {
       if(error.status == 404){
        this.dialogService.init("Operation fail", MyMessage.inputEmailError, undefined,undefined); 
       }

     }
     )

     
  }

}

