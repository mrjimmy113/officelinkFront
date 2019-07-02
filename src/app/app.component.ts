import { AuthenticationService } from './service/authentication.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'officelinkFront';
  isLogin = this.authSer.isLogin();
  role = this.authSer.getRole();

  constructor(private authSer:AuthenticationService) {}
}
