import { AuthenticationService } from './../../service/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  name = this.authSer.getName();
  isDisplay = false;
  constructor(private authSer:AuthenticationService) { }

  ngOnInit() {
  }

  display() {
    this.isDisplay = true;
  }
  hide() {
    this.isDisplay = false;
  }
  logout() {
    this.authSer.logout();
  }

}
