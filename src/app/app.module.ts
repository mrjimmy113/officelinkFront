import { TeamSaveComponent } from './team-save/team-save.component';
import { TeamComponent } from './team/team.component';
import { LocationCreateComponent } from './location/location-create/location-create.component';
import { LocationComponent } from './location/location-main/location.component';
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
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
import { ConfirmRegisterComponent } from './others/confirm-register/confirm-register.component';
import { ConfirmInvitationComponent } from './confirm-invitation/confirm-invitation.component';
import { InvitationComponent } from './account/invitation/invitation.component';
import { ChartsModule } from 'ng2-charts';
import { GoogleChartsModule } from 'angular-google-charts';
import { SurveyReportComponent } from './survey/survey-report/survey-report.component';
import { SurveyCompareComponent } from './survey/survey-compare/survey-compare.component';
import { NewsCreateComponent } from './news/news-create/news-create.component';
import { NewsMainComponent } from './news/news-main/news-main.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { DepartmentComponent } from './department/department.component';
import { DepartmentSaveComponent } from './department-save/department-save.component';
import { WorkplaceComponent } from './workplace/workplace.component';
import { WorkplaceSaveComponent } from './workplace-save/workplace-save.component';
import { NewsDetailComponent } from './news/news-detail/news-detail.component';

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
    ConfirmRegisterComponent,
    ConfirmInvitationComponent,
    SurveyReportComponent,
    SurveyCompareComponent,
    InvitationComponent,
    TeamComponent,
    TeamSaveComponent,
    LocationComponent,
    LocationCreateComponent,
    NewsCreateComponent,
    NewsMainComponent,
    DepartmentComponent,
    DepartmentSaveComponent,
    WorkplaceComponent,
    WorkplaceSaveComponent,
    NewsDetailComponent,
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule, AppRoutingModule, CKEditorModule, ChartsModule, GoogleChartsModule],
  entryComponents: [SurveyCompareComponent],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
