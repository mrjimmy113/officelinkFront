import { DashBoardComponent } from "./others/dash-board/dash-board.component";
import { ReportListComponent } from "./survey/report-list/report-list.component";
import { AuthGuard } from "./guard/auth.guard";
import { AuthHomeComponent } from "./auth-home/auth-home.component";
import { SurveyListComponent } from "./survey/survey-list/survey-list.component";
import { ChooseQuestionComponent } from "./survey/choose-question/choose-question.component";
import { QuestionListComponent } from "./question/question-list/question-list.component";
import { SurveyReportComponent } from "./survey/survey-report/survey-report.component";
import { SurveyTakeComponent } from "./survey/survey-take/survey-take.component";
import { InvitationComponent } from "./account/invitation/invitation.component";
import { SendOutSurveyComponent } from "./survey/send-out-survey/send-out-survey.component";
import { RegisterComponent } from "./others/register/register.component";
import { HomeComponent } from "./others/home/home.component";
import { SurveySaveComponent } from "./survey/survey-save/survey-save.component";
import { QuestionComponent } from "./survey/question/question.component";
import { ForgetPasswordComponent } from "./others/forget-password/forget-password.component";
import { LoginComponent } from "./others/login/login.component";
import { WordCloudSaveComponent } from "./word-cloud-filter/word-cloud-save/word-cloud-save.component";
import { WordCloudListComponent } from "./word-cloud-filter/word-cloud-list/word-cloud-list.component";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NotFoundComponent } from "./others/not-found/not-found.component";
import { DepartmentComponent } from "./department/department.component";
import { DepartmentSaveComponent } from "./department-save/department-save.component";
import { TeamComponent } from "./team/team.component";
import { TeamSaveComponent } from "./team-save/team-save.component";
import { WorkplaceComponent } from "./workplace/workplace.component";
import { WorkplaceSaveComponent } from "./workplace-save/workplace-save.component";
import { ConfigurationSaveComponent } from "./configuration-save/configuration-save.component";
import { ConfigurationComponent } from "./configuration/configuration.component";
import { LocationComponent } from "./location/location-main/location.component";
import { LocationCreateComponent } from "./location/location-create/location-create.component";
import { LocationEditComponent } from "./location/location-edit/location-edit.component";
import { NewsMainComponent } from "./news/news-main/news-main.component";
import { NewsCreateComponent } from "./news/news-create/news-create.component";
import { NewsDetailComponent } from "./news/news-detail/news-detail.component";
import { NewsEditComponent } from "./news/news-edit/news-edit.component";
import { AccountListComponent } from "./account/account-list/account-list.component";
import { AccountSaveComponent } from "./account/account-save/account-save.component";
import { AccountDeleteComponent } from "./account/account-delete/account-delete.component";
import { JoinComponent } from "./others/join/join.component";
import { RegisterConfirmComponent } from "./others/register-confirm/register-confirm.component";

const authRoutes: Routes = [
  { path: "", component: DashBoardComponent },
  { path: "filter", component: WordCloudListComponent },
  { path: "account", component: AccountListComponent },
  { path: "account/create", component: AccountSaveComponent },
  { path: "account/delete", component: AccountDeleteComponent },
  { path: "login-form/:emailToken", component: LoginComponent },
  { path: "location", component: LocationComponent },
  { path: "location/create", component: LocationCreateComponent },
  { path: "location/:id/edit", component: LocationEditComponent },
  { path: "news", component: NewsMainComponent },
  { path: "news/:id/edit", component: NewsEditComponent },
  { path: "news/create", component: NewsCreateComponent },
  { path: "news/:id/detail", component: NewsDetailComponent },
  { path: "q", component: SurveySaveComponent },
  { path: "memInvite", component: InvitationComponent },
  { path: "take/:token", component: SurveyTakeComponent },
  { path: "team", component: TeamComponent },
  { path: "team/save", component: TeamSaveComponent },
  { path: "department", component: DepartmentComponent },
  { path: "department/save", component: DepartmentSaveComponent },
  { path: "workplace", component: WorkplaceComponent },
  { path: "workplace/save", component: WorkplaceSaveComponent },
  { path: "report", component: ReportListComponent },
  { path: "report/detail/:id", component: SurveyReportComponent },
  { path: "question", component: QuestionListComponent },
  { path: "choose", component: ChooseQuestionComponent },
  { path: "survey", component: SurveyListComponent },
  { path: "configuration", component: ConfigurationComponent },
  { path: "configuration/save", component: ConfigurationSaveComponent }
];

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "register", component: RegisterComponent },
  { path: "404", component: NotFoundComponent },
  { path: "forget", component: ForgetPasswordComponent },
  { path: "login", component: LoginComponent },
  { path: "join/:token", component: JoinComponent },
  { path: "confirm/:accountToken", component: RegisterConfirmComponent },
  {
    path: "",
    component: AuthHomeComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: authRoutes
  },
  { path: "**", redirectTo: "404" }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
