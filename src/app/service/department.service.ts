import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from '../model/department';
import { PageSearch } from '../model/page-search';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private api = environment.apiEndPoint + "/department";

  constructor(private http:HttpClient) { }

  getAll():Observable<Array<Department>> {
    return this.http.get<Array<Department>>(this.api + `/getAll`);
  }

  searchGetPage(term, page):Observable<PageSearch<Department>> {
    return this.http.get<PageSearch<Department>>(this.api + `?term=${term}&page=${page}`);
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
