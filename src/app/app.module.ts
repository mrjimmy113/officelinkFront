import { TokenInterceptor } from './interceptor/tokenAuth.interceptor';
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./others/header/header.component";
import { WordCloudListComponent } from "./word-cloud-filter/word-cloud-list/word-cloud-list.component";
import { WordCloudSaveComponent } from "./word-cloud-filter/word-cloud-save/word-cloud-save.component";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { NotFoundComponent } from './others/not-found/not-found.component';
import { LoginComponent } from './others/login/login.component';
import { SideMenuComponent } from './others/side-menu/side-menu.component';
import { ForgetPasswordComponent } from './others/forget-password/forget-password.component';
import { SurveySaveComponent } from './survey/survey-save/survey-save.component';
import { QuestionComponent } from './survey/question/question.component';
import { SurveyTakeComponent } from './survey/survey-take/survey-take.component';
import { HomeComponent } from './others/home/home.component';
import { RegisterComponent } from './others/register/register.component';
import { SendOutSurveyComponent } from './survey/send-out-survey/send-out-survey.component';
import { ConfirmInvitationComponent } from './confirm-invitation/confirm-invitation.component';
import { InvitationComponent } from './account/invitation/invitation.component';
import { ChartsModule } from 'ng2-charts';
import { GoogleChartsModule } from 'angular-google-charts';
import { SurveyReportComponent } from './survey/survey-report/survey-report.component';
import { SurveyCompareComponent } from './survey/survey-compare/survey-compare.component';
import { QuestionListComponent } from './question/question-list/question-list.component';
import { QuestionSaveComponent } from './question/question-save/question-save.component';
import { ChooseQuestionComponent } from './survey/choose-question/choose-question.component';
import { SurveyListComponent } from './survey/survey-list/survey-list.component';
import { TeamComponent } from './team/team.component';
import { TeamSaveComponent } from './team-save/team-save.component';
import { DepartmentComponent } from './department/department.component';
import { DepartmentSaveComponent } from './department-save/department-save.component';
import { LocationComponent } from './location/location.component';
import { LocationCreateComponent } from './location-create/location-create.component';
import { WorkplaceComponent } from './workplace/workplace.component';
import { WorkplaceSaveComponent } from './workplace-save/workplace-save.component';
import { TagCloudModule } from 'angular-tag-cloud-module';

import { AccountListComponent } from './account/account-list/account-list.component';
import { AccountSaveComponent } from './account/account-save/account-save.component';
import { AccountDeleteComponent } from './account/account-delete/account-delete.component';
import { JoinComponent } from './others/join/join.component'
import {Login2Component} from './others/login2/login2.component'

import { ConfigurationComponent } from './configuration/configuration.component';
import { ConfigurationSaveComponent } from './configuration-save/configuration-save.component';

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
    WorkplaceComponent,
    WorkplaceSaveComponent,
    AccountListComponent,
    AccountSaveComponent,
    AccountDeleteComponent,
    JoinComponent,
    Login2Component,
    QuestionListComponent,
    QuestionSaveComponent,
    ChooseQuestionComponent,
    SurveyListComponent,
    ConfigurationComponent,
    ConfigurationSaveComponent,
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule, AppRoutingModule, ChartsModule, GoogleChartsModule, TagCloudModule],
  entryComponents: [SurveyCompareComponent,QuestionSaveComponent, SendOutSurveyComponent],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {}
