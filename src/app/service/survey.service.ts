import { SendSurvey } from "./../model/sendSurvey";
import { SendOutInfor } from "./../model/sendOutInfor";
import { Question } from "./../model/question";
import { Survey } from "./../model/survey";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "./../../environments/environment";
import { Injectable } from "@angular/core";
import { PageSearch } from "../model/page-search";
import { SurveyReport } from "../model/surveyReport";

@Injectable({
  providedIn: "root"
})
export class SurveyService {
  private api = environment.apiEndPoint + "/survey";

  constructor(private http: HttpClient) {}

  create(survey): Observable<Number> {
    return this.http.post<Number>(this.api, survey);
  }
  update(survey): Observable<Number> {
    return this.http.put<Number>(this.api, survey);
  }
  search(term, page): Observable<PageSearch<Survey>> {
    return this.http.get<PageSearch<Survey>>(
      this.api + `?term=${term}&page=${page}`
    );
  }
  delete(id): Observable<Number> {
    return this.http.delete<Number>(this.api + `?id=${id}`);
  }
  getDetail(id): Observable<Question[]> {
    return this.http.get<Question[]>(this.api + `/detail?id=${id}`);
  }
  getTakeSurvey(token): Observable<Survey> {
    return this.http.get<Survey>(this.api + `/take?token=${token}`);
  }
  sendOutSurvey(sendSurvey: SendSurvey) {
    return this.http.post<Number>(this.api + `/sendOut`, sendSurvey);
  }
  sendAnswer(answers): Observable<Number> {
    return this.http.post<Number>(this.api + `/answer`, answers);
  }
  getWorkplaceSurveys(): Observable<Array<Survey>> {
    return this.http.get<Array<Survey>>(this.api + `/getWorkplaceSurveys`);
  }
  getReportAll(id): Observable<SurveyReport> {
    return this.http.get<SurveyReport>(this.api + `/report/detail?id=${id}`);
  }
  getReportList(term, page): Observable<PageSearch<SurveyReport>> {
    return this.http.get<PageSearch<SurveyReport>>(
      this.api + `/report?term=${term}&page=${page}`
    );
  }
}
