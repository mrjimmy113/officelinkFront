import { SurveyReport } from './../model/surveyReport';
import { ApplyFilter } from './../model/applyFilter';
import { Survey } from "src/app/model/survey";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "./../../environments/environment";
import { Injectable } from "@angular/core";
import { SurveySendTargetDetail } from "../model/surveySendTargetDetail";
import { QuestionReport } from "../model/questionReport";
import { AnswerReport } from "../model/answerReport";
import { DashBoard } from "../model/dashBoard";
import { CategoryReport } from '../model/categoryReport';

@Injectable({
  providedIn: "root"
})
export class ReportService {
  private api = environment.apiEndPoint + "/report";

  constructor(private http: HttpClient) {}

  getSendSurveyTargetDetail(id): Observable<SurveySendTargetDetail> {
    return this.http.get<SurveySendTargetDetail>(this.api + `/target?id=${id}`);
  }

  getFilteredReport(
    id,
    locationId,
    depId,
    teamId
  ): Observable<CategoryReport[]> {
    return this.http.get<CategoryReport[]>(
      this.api +
        `?surveyId=${id}&locationId=${locationId}&departmentId=${depId}&teamId=${teamId}`
    );
  }

  getSameSurvey(id, notId): Observable<Survey[]> {
    return this.http.get<Survey[]>(
      this.api + `/getSameSurvey?id=${id}&notId=${notId}`
    );
  }

  getCompareQuestionAnswer(
    surveyId,
    questionId,
    locationId,
    departmentId,
    teamId
  ): Observable<AnswerReport[]> {
    return this.http.get<AnswerReport[]>(
      this.api +
        `/getCompareQuestion?surveyId=${surveyId}&questionId=${questionId}&locationId=${locationId}&departmentId=${departmentId}&teamId=${teamId}`
    );
  }
  getDashBoard(): Observable<DashBoard> {
    return this.http.get<DashBoard>(this.api + `/dashboard`);
  }
  getDownloadToken(surveyId, questionId): Observable<String> {
    return this.http.get<String>(
      this.api +
        `/getDownloadToken?surveyId=${surveyId}&questionId=${questionId}`,
      {responseType: "text" as "json" }
    );
  }
  getDownloadLink(token):string {
    return this.api + `/download?token=${token}`;
  }
  getFilterdWordCloud(applyFilter : ApplyFilter): Observable<AnswerReport[]> {
    return this.http.post<AnswerReport[]>(this.api + `/applyFilter`,applyFilter);
  }
  getReport(id) :Observable<SurveyReport> {
    return this.http.get<SurveyReport>(this.api + `/detail?id=${id}`)
  }
}
