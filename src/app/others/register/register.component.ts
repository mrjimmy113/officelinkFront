import { Component, OnInit } from '@angular/core';
import {DomService} from '../../service/dom.service'
import {AccountService} from '../../service/account.service'
import { from } from 'rxjs';
import { ModalService } from 'src/app/service/modal.service';
import { initDomAdapter } from '@angular/platform-browser/src/browser';
import {Account} from '../../model/account';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  account : Account;
  requestStatus;
  errorStatus;
  confirmPassText : String;
  

  constructor( private accoutSer : AccountService , private modalSer : ModalService) { }

  ngOnInit() {
    this.init();
  }

  init (){
      this.account = new Account();
      this.account.isDelete = false;
      
  }
  register(){
        this.account.role = "employer";
        if(this.account.firstname == null || this.account.lastname == null || this.account.email == null || 
         this.account.password == null|| this.account.address == null ){
           alert("Input not empty. Try again ")
         }
         if(this.account.password != this.confirmPassText){
           alert("Password and Confirm password not match. Try again");
         }else{                         
                  this.accoutSer.sendMail(this.account).subscribe(res => {               
                    alert("Successful registration of account information, please check your mail to complete the registration")
                  })
             ,
            error => {
              this.errorStatus = error.status;
              if(this.errorStatus == 409){
                 alert("Sorry, email or work space already exists, please check again")
              }
              if(error.status == 400){
                alert("The system has failed, please try again")
              }
            }
            
         }

        
    
  }

  

}
