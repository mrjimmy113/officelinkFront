import { Component, OnInit, Input } from '@angular/core';
import { ModalService} from '../../service/modal.service';
import { from } from 'rxjs';
import {AccountService} from '../../service/account.service'
import {Account} from '../../model/account'

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




  constructor(private modalSer : ModalService, private accountSer : AccountService) { }

  ngOnInit() {
    this.listEmail = new Array<String>();
    this.listAccount = new Array<Account>();
    

  }
  addNewEmail() {
    if(this.newEmail == null){
      alert("Input not empty. Try again")
    }else{
      this.listEmail.push(this.newEmail);
    this.newEmail = "";
    }
    
  }
  removeEmail(index) {
    
    this.listEmail.splice(index , 1);
    
    
  }

  



  sendMail(){
    
    if(this.newEmail == null){
      alert("Input not null. Try again")
    }else{
      this.accountSer.sendMail(this.listEmail , "employee").subscribe(res => {
      
        alert("Send Mail Success")
      },
      error => {
        if(error.status == 400){
          alert("Error , try again")
        }
      }
      )
    }
<<<<<<< HEAD
  }

  closeModal(){
    this.modalSer.destroy();
  }
=======
  
    }
>>>>>>> 21559e73a2013f77bda3cbeb420c1d29b0324dfe
    
    

}
