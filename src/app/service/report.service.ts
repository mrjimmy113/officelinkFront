import { Survey } from "src/app/model/survey";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "./../../environments/environment";
import { Injectable } from "@angular/core";
import { SurveySendTargetDetail } from "../model/surveySendTargetDetail";
import { QuestionReport } from "../model/questionReport";
import { AnswerReport } from "../model/answerReport";
import { DashBoard } from "../model/dashBoard";

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
  ): Observable<QuestionReport[]> {
    return this.http.get<QuestionReport[]>(
      this.api +
        `?surveyId=${id}&locationId=${locationId}&departmentId=${depId}&teamId=${teamId}`
    );
  }

  getSameSurvey(id, notId): Observable<Survey[]> {
    return this.http.get<Survey[]>(
      this.api + `/getSameSurvey?id=${id}&notId=${notId}`
    );
  }

  getCompareQuestionAnswer(surveyId, questionId,locationId,departmentId,teamId): Observable<AnswerReport[]> {
    return this.http.get<AnswerReport[]>(
      this.api +
        `/getCompareQuestion?surveyId=${surveyId}&questionId=${questionId}&locationId=${locationId}&departmentId=${departmentId}&teamId=${teamId}`
    );
  }
  getDashBoard(): Observable<DashBoard> {
    return this.http.get<DashBoard>(this.api + `/dashboard`);
  }
}
