import * as tslib_1 from "tslib";
import { SurveyReportComponent } from './survey/survey-report/survey-report.component';
import { SurveyTakeComponent } from './survey/survey-take/survey-take.component';
import { InvitationComponent } from './account/invitation/invitation.component';
import { ConfirmRegisterComponent } from './others/confirm-register/confirm-register.component';
import { RegisterComponent } from './others/register/register.component';
import { HomeComponent } from './others/home/home.component';
import { SurveySaveComponent } from './survey/survey-save/survey-save.component';
import { ForgetPasswordComponent } from './others/forget-password/forget-password.component';
import { LoginComponent } from './others/login/login.component';
import { WordCloudSaveComponent } from "./word-cloud-filter/word-cloud-save/word-cloud-save.component";
import { WordCloudListComponent } from "./word-cloud-filter/word-cloud-list/word-cloud-list.component";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NotFoundComponent } from './others/not-found/not-found.component';
import { LocationComponent } from "./location/location-main/location.component";
import { LocationCreateComponent } from "./location/location-create/location-create.component";
import { TeamComponent } from './team/team.component';
import { TeamSaveComponent } from './team-save/team-save.component';
import { NewsMainComponent } from "./news/news-main/news-main.component";
import { NewsCreateComponent } from "./news/news-create/news-create.component";
import { TestCreateComponent } from './TEST/test-create/test-create.component';
import { TestMainComponent } from './TEST/test-main/test-main.component';
var routes = [
    { path: "", component: HomeComponent },
    { path: "home", component: HomeComponent },
    { path: "register", component: RegisterComponent },
    { path: "confirmReg", component: ConfirmRegisterComponent },
    { path: "admin/wordCloud", component: WordCloudListComponent },
    { path: "admin/create", component: WordCloudSaveComponent },
    { path: "404", component: NotFoundComponent },
    { path: "forget", component: ForgetPasswordComponent },
    { path: "login", component: LoginComponent },
    { path: "q", component: SurveySaveComponent },
    { path: "memInvite", component: InvitationComponent },
    { path: "take", component: SurveyTakeComponent },
    { path: "team", component: TeamComponent },
    { path: "team/save", component: TeamSaveComponent },
    { path: "location", component: LocationComponent },
    { path: "location/create", component: LocationCreateComponent },
    { path: "news", component: NewsMainComponent },
    { path: "news/create", component: NewsCreateComponent },
    { path: "test", component: TestMainComponent },
    { path: "test/create", component: TestCreateComponent },
    { path: "report", component: SurveyReportComponent },
    { path: "**", redirectTo: "404" },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            declarations: [],
            imports: [CommonModule, RouterModule.forRoot(routes)],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map