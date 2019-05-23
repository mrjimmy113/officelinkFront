import { PageSearch } from './../model/page-search';
import { WordCloudFilter } from './../model/word-cloud-filter';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WordCloudService {

  private api = environment.apiEndPoint + "/wordCloud";

  constructor(private http:HttpClient) { }

  search(term):Observable<PageSearch<WordCloudFilter>> {
    return this.http.get<PageSearch<WordCloudFilter>>(this.api + `?term=${term}`);
  }

  getPage(term,page): Observable<WordCloudFilter[]> {
    return this.http.get<WordCloudFilter[]>(this.api + `?term=${term}&page=${page}`);
  }

  create(obj): Observable<Number> {
    return this.http.post<Number>(this.api, obj);
  }

  update(obj): Observable<Number> {
    return this.http.put<Number>(this.api, obj);
  }
}
