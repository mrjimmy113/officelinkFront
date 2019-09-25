import { Observable } from 'rxjs';

import { PageSearch } from './../model/page-search';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private api = environment.apiEndPoint + "/category";

  constructor(private http:HttpClient) { }

  search(term,page) : Observable<PageSearch<Category>> {
    return this.http.get<PageSearch<Category>>(this.api + `?term=${term}&page=${page}`);
  }

  create(category) : Observable<void> {
    return this.http.post<void>(this.api,category);
  }

  update(category) : Observable<void> {
    return this.http.put<any>(this.api,category);
  }
}
