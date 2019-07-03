import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PageSearch } from './../model/page-search';
import {Account} from '../model/account';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private api = environment.apiEndPoint + "/account";

  constructor(private httpClient : HttpClient) {}

  search(term) : Observable<PageSearch<Account>>{
    return this.httpClient.get<PageSearch<Account>>(this.api + `?term=${term}`);
  }

  getPage(term,page): Observable<Account[]> {
    return this.httpClient.get<Account[]>(this.api + `?term=${term}&page=${page}`);
  }


  update(obj) : Observable<Number>{
    return this.httpClient.put<Number>(this.api, obj);
  }

  delete(id) : Observable<Number>{
    return this.httpClient.delete<Number>(this.api +`?id=${id}`);
  }
 
  create(obj) : Observable<Number>{
    return this.httpClient.post<Number>(this.api, obj);
  }

//  getAccountByEmail(emailToken) : Observable<Account>{
//    return this.httpClient.get<Account>(this.api + `/getAccountByEmail` + `?emailToken=${emailToken}`);
//  }


 getAccountByToken(accountToken) : Observable<Account>{
  return this.httpClient.get<Account>(this.api + `/confirm` + `?accountToken=${accountToken}`);
}



  sendMail(obj) : Observable<Number>{
    return this.httpClient.post<Number>(this.api + `/sendMail`, obj);
  }

  createAccountByToken(accountToken) : Observable<Number>{
    return this.httpClient.post<Number>(this.api + `/confirm`, accountToken);
  }

  
}

