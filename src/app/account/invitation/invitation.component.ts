import { NgForm } from '@angular/forms';
import { Component, OnInit, Input, Output } from '@angular/core';
import { ModalService} from '../../service/modal.service';
import { from } from 'rxjs';
import {AccountService} from '../../service/account.service'
import {Account} from '../../model/account'
import { DisplayService } from 'src/app/service/display.service';
import { Form } from '@angular/forms';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.css']
})
export class InvitationComponent implements OnInit {
  @Output() outputs ;
  listAccount : Account[];
  listEmail: String[];
  newEmail:String;
  messContent : String;




  constructor(private modalSer : ModalService, private accountSer : AccountService, private displaySer:DisplayService) { }

  ngOnInit() {
    this.listEmail = new Array<String>();
    this.listAccount = new Array<Account>();


  }
  addNewEmail(emailForm : NgForm) {
    if(this.newEmail == "" || this.newEmail == null){
      alert("Input not empty. Try again")
    }else{
      this.accountSer.checkEmailExisted(this.newEmail).subscribe(res => {
        this.listEmail.forEach(email => {
          if(this.newEmail == email){
            alert("Email already exists in the email list. Try again")
            emailForm.resetForm();
          }       
      });
  
      if(this.newEmail != null ){
        this.listEmail.push(this.newEmail);
        emailForm.resetForm();
  
      }         
      }, 
      error => {
        if(error.status == 409){
          emailForm.resetForm();
          alert("Email existed on System. Try again")
        }
        
       
      })
    } 
  }
  removeEmail(index) {

    this.listEmail.splice(index , 1);


  }





  sendMail(){

    if(this.listEmail.length == 0){
      alert("Please add more email")
    }else{

      this.displaySer.showLoader();
      this.accountSer.acceptInvite(this.listEmail).subscribe(result => {
        this.accountSer.sendInvite(this.listEmail).subscribe(res => {

          alert("Send Mail Success")
           this.displaySer.hideLoader();
           this.modalSer.destroy();
           this.outputs();

        },
        error => {
          if(error.status == 400){
            alert("Error , try again")
          }
          this.displaySer.hideLoader();
        }
        )
      }    
      )     
    }


  }

  closeModal(){
    this.modalSer.destroy();
  }


    }





