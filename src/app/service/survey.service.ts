import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  private api = environment.apiEndPoint + "/survey"

  constructor(private http:HttpClient) { }

  create(survey): Observable<Number> {
    return this.http.post<Number>(this.api, survey);
  }
}
