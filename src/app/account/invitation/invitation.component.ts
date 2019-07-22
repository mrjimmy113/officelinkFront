import { NgForm } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
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
    if(this.newEmail == null){
      alert("Input not empty. Try again")
    }else{
      this.listEmail.push(this.newEmail);
      emailForm.resetForm();
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
      this.accountSer.sendInvite(this.listEmail).subscribe(res => {

        alert("Send Mail Success")
        this.displaySer.hideLoader();
        this.modalSer.destroy();
      },
      error => {
        if(error.status == 400){
          alert("Error , try again")
        }
        this.displaySer.hideLoader();
      }
      )
    }

  }

  closeModal(){
    this.modalSer.destroy();
  }


    }





