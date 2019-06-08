import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { PageSearch } from '../model/page-search';
import { HttpClient } from '@angular/common/http';
import { Location } from '../model/location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private api = environment.apiEndPoint + "/location";

  constructor(private http:HttpClient) { }

  search(term):Observable<PageSearch<Location>>{
    return this.http.get<PageSearch<Location>>(this.api + `?term=${term}`);
  }

  getPage(term, page):Observable<PageSearch<Location>>{
    return this.http.get<PageSearch<Location>>(this.api + `?term=${term}&page=${page}`);
  }

  create(obj):Observable<Number>{
    return this.http.post<Number>(this.api, obj);
  }

  update(obj):Observable<Number>{
    return this.http.put<Number>(this.api, obj);
  }

  delete(id):Observable<Number>{
    return this.http.delete<Number>(this.api + `?id=${id}`);
  }
}
