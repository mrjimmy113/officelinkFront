import { Question } from './../model/question';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { TypeQuestion } from '../model/typeQuestion';
import { PageSearch } from '../model/page-search';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private api = environment.apiEndPoint + "/question";
  constructor(private http:HttpClient) { }

  getAllType():Observable<TypeQuestion[]> {
    return this.http.get<TypeQuestion[]>(this.api + "/type");
  }

  create(question : Question):Observable<Number> {
    return this.http.post<Number>(this.api,question);
  }
  search(term,page) : Observable<PageSearch<Question>> {
    return this.http.get<PageSearch<Question>>(this.api + `?term=${term}&page=${page}`);
  }
  delete(id):Observable<Number> {
    return this.http.delete<Number>(this.api + `?id=${id}`);
  }
  searchWithType(term,type,page) : Observable<PageSearch<Question>> {
    return this.http.get<PageSearch<Question>>(this.api + `/search?term=${term}&type=${type}&page=${page}`);
  }
}
