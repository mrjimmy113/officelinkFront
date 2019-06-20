import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Workplace } from '../model/workplace';
import { PageSearch } from '../model/page-search';

@Injectable({
  providedIn: 'root'
})
export class WorkplaceService {
  private api = environment.apiEndPoint + "/workplace";

  constructor(private http:HttpClient) { }

  getAll():Observable<Array<Workplace>> {
    return this.http.get<Array<Workplace>>(this.api + `/getAll`);
  }

  search(term):Observable<PageSearch<Workplace>> {
    return this.http.get<PageSearch<Workplace>>(this.api + `?term=${term}`);
  }

  getPage(term, page):Observable<PageSearch<Workplace>> {
    return this.http.get<PageSearch<Workplace>>(this.api + `/getPage?term=${term}&page=${page}`);
  }

  create(obj):Observable<Number> {
    return this.http.post<Number>(this.api, obj);
  }

  update(obj):Observable<Number> {
    return this.http.put<Number>(this.api, obj);
  }

  delete(id):Observable<Number> {
    return this.http.delete<Number>(this.api + `?id=${id}`);
  }
}
