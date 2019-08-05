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

  searchByDate(startDate, endDate):Observable<Array<News>>{
    return this.http.get<Array<News>>(this.api + `/getDate?startDate=${startDate}&endDate=${endDate}`);
  }

  searchById(id):Observable<News>{
    return this.http.get<News>(this.api + `/getId?id=${id}`);
  }

  searchByTitle(term):Observable<PageSearch<News>>{
    return this.http.get<PageSearch<News>>(this.api + `?term=${term}`);
  }

  searchGetPage(term, page):Observable<PageSearch<News>>{
    return this.http.get<PageSearch<News>>(this.api + `/getPage?term=${term}&page=${page}`);
  }

  create(obj):Observable<Number>{
    return this.http.post<Number>(this.api, obj);
  }

  update(obj):Observable<Number>{
    return this.http.put<Number>(this.api, obj);
  }

  updateNotHasFile(obj):Observable<Number>{
    return this.http.put<Number>(this.api + `/edit`, obj);
  }

  delete(id):Observable<Number>{
    return this.http.delete<Number>(this.api + `?id=${id}`);
  }
  getLastest(page):Observable<PageSearch<News>> {
    return this.http.get<PageSearch<News>>(this.api + `/lastest?page=${page}`);
  }
}
