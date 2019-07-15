import { AccountSaveComponent } from './../account-save/account-save.component';
import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../service/account.service'
import { from } from 'rxjs';


@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.css']
})
export class AccountProfileComponent implements OnInit {

  constructor(private accountService : AccountService) { };

  ngOnInit() {
    this.accountService.getProfile().subscribe(result => {
      console.log(result)
    })
    
    
  }

}
