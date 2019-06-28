import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PageSearch } from '../model/page-search';
import { Team } from '../model/team';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private api = environment.apiEndPoint + "/team";

  constructor(private http:HttpClient) { }

  search(term):Observable<PageSearch<Team>> {
    return this.http.get<PageSearch<Team>>(this.api + `?term=${term}`);
  }

  getPage(term, page):Observable<PageSearch<Team>> {
    return this.http.get<PageSearch<Team>>(this.api + `/getPage?term=${term}&page=${page}`);
  }

  getTeamByDepId(id):Observable<Team[]> {
    return this.http.get<Team[]>(this.api + `/dep?id=${id}`)
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
