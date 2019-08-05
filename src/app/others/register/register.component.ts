
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { AccountService } from "../../service/account.service";
import { ModalService } from "src/app/service/modal.service";
import { Account } from "../../model/account";
import { Location } from "../../model/location";
import { Workplace } from "../../model/workplace";
import { DisplayService } from "src/app/service/display.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  account: Account;
  requestStatus;
  errorStatus;
  confirmPassText: String;
  workplace: Workplace;
  location: Location;

  constructor(
    private accoutSer: AccountService,
    private displaySer: DisplayService,
    private route: Router,
    private modalSer: ModalService
  ) {}

  ngOnInit() {
    this.init();
  }

  init() {
    this.account = new Account();
    this.account.location = new Location();
    this.account.workplace = new Workplace();
    this.account.isDeleted = false;
    this.account.isActivated = false;
  }
  register() {
    this.account.role_id = 1;
    if (
      this.account.firstname == null ||
      this.account.lastname == null ||
      this.account.email == null ||
      this.account.password == null ||
      this.confirmPassText == null
    ) {
      alert('Please complete your register form');
      return;
    }
    if (this.account.password != this.confirmPassText) {
      return;
    } else {
      this.displaySer.showLoader();

      this.accoutSer.sendMail(this.account).subscribe(
        res => {
          this.accoutSer.createAccount(this.account).subscribe(res => {});
          alert('Successful registration of account information, please check your mail to complete the registration');
          this.displaySer.hideLoader();
        },
        error => {
          this.errorStatus = error.status;
          if (this.errorStatus == 409) {
            alert('Sorry, email or workplace already exists, please check again');
          }
          if (error.status == 400) {
            alert('The system has failed, please try again');
          }
          this.displaySer.hideLoader();
        }
      );
    }
  }
}
