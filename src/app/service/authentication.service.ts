import { Auth } from './../model/auth';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { Account } from 'src/app/model/account';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private itemName = "auth";

  constructor(private http:HttpClient) { }

  login(acc: Account):Observable<Auth> {
    return this.http.post<Auth>(environment.apiEndPoint + "/login",acc);
  }

  setAuth(auth:Auth) {
    localStorage.setItem(this.itemName, JSON.stringify(auth));
  }

  getAuth():Auth {
    return JSON.parse(localStorage.getItem(this.itemName));
  }

  getRole() {
    if(this.isLogin())
    return this.getAuth().role;
  }

  getToken() {
    if(this.isLogin())
    return this.getAuth().token;
  }

  isLogin() {
    if(this.getAuth() != null) return true;
    else return false;
  }

  getName() {
    if(this.isLogin())
    return this.getAuth().name;
  }
  getWorkplaceName() {
    if(this.isLogin())
    return this.getAuth().workplaceName;
  }
  logout() {
    localStorage.removeItem(this.itemName);
    window.location.pathname="/home";
  }
}
