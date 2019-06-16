import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { PageSearch } from '../model/page-search';
import { HttpClient } from '@angular/common/http';
import { News } from '../model/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private api = environment.apiEndPoint + "/news";

  constructor(private http:HttpClient) { }

  search(term):Observable<PageSearch<News>>{
    return this.http.get<PageSearch<News>>(this.api + `?term=${term}`);
  }

  getPage(term, page):Observable<PageSearch<News>>{
    return this.http.get<PageSearch<News>>(this.api + `?term=${term}&page=${page}`);
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
