import { MyMessage } from "src/app/const/message";
import { DialogService } from "src/app/service/dialog.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { AccountService } from "../../service/account.service";
import { from } from "rxjs";
import { Account } from "src/app/model/account";
import { Router, ActivatedRoute } from "@angular/router";
import { Workplace } from "src/app/model/workplace";

@Component({
  selector: "app-register-confirm",
  templateUrl: "./register-confirm.component.html",
  styleUrls: ["./register-confirm.component.css"]
})
export class RegisterConfirmComponent implements OnInit {
  account: Account;
  accountToken: String;
  errorStatus: Number;
  requestStatus: Number;

  constructor(
    private _route: ActivatedRoute,
    private accountSer: AccountService,
    private dialogSer: DialogService,
    private router : Router
  ) {}

  ngOnInit() {
    this.account = new Account();
    this.account.workplace = new Workplace();
    this.accountToken = this._route.snapshot.paramMap.get("accountToken");

    this.accountSer.getAccountByToken(this.accountToken).subscribe(
      res => {
        this.account = res;
        this.accountSer.createAccountByToken(this.accountToken).subscribe();
      },
      (err: HttpErrorResponse) => {
        if (err.status == 409) {
          this.dialogSer.init(
            MyMessage.accountRegisterTitle,
            MyMessage.accountRegisterActive,
            undefined,
            () => {this.router.navigateByUrl("")}
          );
        } else if (err.status == 410) {
          this.dialogSer.init(
            MyMessage.accountRegisterTitle,
            MyMessage.accountRegisterExpire,
            undefined,
            () => {this.router.navigateByUrl("")}
          );
        }
      }
    );
  }
}
