import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.css']
})
export class InvitationComponent implements OnInit {
  listEmail: String[];
  newEmail:String;
  constructor() { }

  ngOnInit() {
    this.listEmail = new Array<String>();
  }
  addNewEmail() {
    this.listEmail.push(this.newEmail);
    this.newEmail = "";
  }
  removeEmail(index) {
    this.listEmail.splice(index,1);
  }

}
