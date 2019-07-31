import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TokenInterceptor } from "./interceptor/tokenAuth.interceptor";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./others/header/header.component";
import { WordCloudListComponent } from "./word-cloud-filter/word-cloud-list/word-cloud-list.component";
import { WordCloudSaveComponent } from "./word-cloud-filter/word-cloud-save/word-cloud-save.component";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { NotFoundComponent } from "./others/not-found/not-found.component";
import { LoginComponent } from "./others/login/login.component";
import { SideMenuComponent } from "./others/side-menu/side-menu.component";
import { ForgetPasswordComponent } from "./others/forget-password/forget-password.component";
import { SurveySaveComponent } from "./survey/survey-save/survey-save.component";
import { QuestionComponent } from "./survey/question/question.component";
import { SurveyTakeComponent } from "./survey/survey-take/survey-take.component";
import { HomeComponent } from "./others/home/home.component";
import { RegisterComponent } from "./others/register/register.component";
import { SendOutSurveyComponent } from "./survey/send-out-survey/send-out-survey.component";
import { ConfirmInvitationComponent } from "./confirm-invitation/confirm-invitation.component";
import { InvitationComponent } from "./account/invitation/invitation.component";
import { ChartsModule } from "ng2-charts";
import { GoogleChartsModule } from "angular-google-charts";
import { SurveyReportComponent } from "./survey/survey-report/survey-report.component";
import { SurveyCompareComponent } from "./survey/survey-compare/survey-compare.component";
import { QuestionListComponent } from "./question/question-list/question-list.component";
import { QuestionSaveComponent } from "./question/question-save/question-save.component";
import { ChooseQuestionComponent } from "./survey/choose-question/choose-question.component";
import { SurveyListComponent } from "./survey/survey-list/survey-list.component";
import { TeamComponent } from "./team/team.component";
import { TeamSaveComponent } from "./team-save/team-save.component";
import { DepartmentComponent } from "./department/department.component";
import { DepartmentSaveComponent } from "./department-save/department-save.component";
import { LocationCreateComponent } from "./location/location-create/location-create.component";
import { LocationComponent } from "./location/location-main/location.component";
import { LocationEditComponent } from "./location/location-edit/location-edit.component";
import { DateRangePickerModule } from "@syncfusion/ej2-angular-calendars";
import { NewsCreateComponent } from "./news/news-create/news-create.component";
import { NewsMainComponent } from "./news/news-main/news-main.component";
import { NewsDetailComponent } from "./news/news-detail/news-detail.component";
import { NewsEditComponent } from "./news/news-edit/news-edit.component";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { AgmCoreModule } from "@agm/core";
import { DatePipe } from "@angular/common";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";

import { WorkplaceComponent } from "./workplace/workplace.component";
import { WorkplaceSaveComponent } from "./workplace-save/workplace-save.component";
import { TagCloudModule } from "angular-tag-cloud-module";

import { AccountListComponent } from './account/account-list/account-list.component';
import { AccountSaveComponent } from './account/account-save/account-save.component';
import { AccountDeleteComponent } from './account/account-delete/account-delete.component';
import { JoinComponent } from './others/join/join.component';
import { RegisterConfirmComponent } from './others/register-confirm/register-confirm.component'

import { ConfigurationComponent } from "./configuration/configuration.component";
import { ConfigurationSaveComponent } from "./configuration-save/configuration-save.component";

import { NgxChartsModule } from "@swimlane/ngx-charts";
import { AuthHomeComponent } from "./auth-home/auth-home.component";
import { ReportListComponent } from './survey/report-list/report-list.component';
import { DashBoardComponent } from './others/dash-board/dash-board.component';
import { TutorialComponent } from './others/tutorial/tutorial.component';
import { AssignAccountComponent } from './account/assign-account/assign-account.component';

import { from } from 'rxjs';
import { AccountProfileComponent } from './account/account-profile/account-profile.component';
import { ResetPasswordComponent } from './others/reset-password/reset-password.component';
import { ReadNewsComponent } from './others/read-news/read-news.component';
import { DetailComponent } from './question/detail/detail.component';
import { SurveyHistoryDetailComponent } from "./survey/survey-history-detail/survey-history-detail.component"
import { SurveyHistoryMainComponent } from "./survey/survey-history-main/survey-history-main.component";
import { ChooseTemplateComponent } from './survey/choose-template/choose-template.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WordCloudListComponent,
    WordCloudSaveComponent,
    NotFoundComponent,
    LoginComponent,
    SideMenuComponent,
    ForgetPasswordComponent,
    SurveySaveComponent,
    QuestionComponent,
    SurveyTakeComponent,
    HomeComponent,
    RegisterComponent,
    SendOutSurveyComponent,
    ConfirmInvitationComponent,
    SurveyReportComponent,
    SurveyCompareComponent,
    InvitationComponent,
    TeamComponent,
    TeamSaveComponent,
    DepartmentComponent,
    DepartmentSaveComponent,
    LocationComponent,
    LocationCreateComponent,
    LocationEditComponent,
    NewsCreateComponent,
    NewsMainComponent,
    NewsDetailComponent,
    NewsEditComponent,
    WorkplaceComponent,
    WorkplaceSaveComponent,
    AccountListComponent,
    AccountSaveComponent,
    AccountDeleteComponent,
    JoinComponent,
    QuestionListComponent,
    QuestionSaveComponent,
    ChooseQuestionComponent,
    SurveyListComponent,
    ConfigurationComponent,
    ConfigurationSaveComponent,
    AuthHomeComponent,
    RegisterConfirmComponent,
    ReportListComponent,
    DashBoardComponent,
    TutorialComponent,
    AssignAccountComponent,
    AccountProfileComponent,
    ResetPasswordComponent,
    ReadNewsComponent,
    DetailComponent,
    SurveyHistoryDetailComponent,
    SurveyHistoryMainComponent,
    ChooseTemplateComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ScrollingModule,
    DateRangePickerModule,
    CKEditorModule,
    ChartsModule,
    GoogleChartsModule,
    TagCloudModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCdlgyq8ejq83BTKNpz2q2m1PrLp3D20JY",
      libraries: ["places"]
    })
  ],
  entryComponents: [
    SurveyCompareComponent,
    QuestionSaveComponent,
    SendOutSurveyComponent,
    WordCloudSaveComponent,
    SurveySaveComponent,
    AssignAccountComponent,
    DetailComponent,
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    [DatePipe]
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
