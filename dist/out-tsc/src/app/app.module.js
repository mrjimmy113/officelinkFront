import * as tslib_1 from "tslib";
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
import { TestCreateComponent } from './TEST/test-create/test-create.component';
import { TestMainComponent } from './TEST/test-main/test-main.component';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib_1.__decorate([
        NgModule({
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
                TestCreateComponent,
                TestMainComponent,
            ],
            imports: [BrowserModule, HttpClientModule, FormsModule, AppRoutingModule, ChartsModule, GoogleChartsModule],
            entryComponents: [SurveyCompareComponent],
            providers: [],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map