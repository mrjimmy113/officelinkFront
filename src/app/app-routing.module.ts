import { SurveyReportComponent } from './survey/survey-report/survey-report.component';
import { SurveyTakeComponent } from './survey/survey-take/survey-take.component';
import { InvitationComponent } from './account/invitation/invitation.component';
import { SendOutSurveyComponent } from './survey/send-out-survey/send-out-survey.component';
import { ConfirmRegisterComponent } from './others/confirm-register/confirm-register.component';
import { RegisterComponent } from './others/register/register.component';
import { HomeComponent } from './others/home/home.component';
import { SurveySaveComponent } from './survey/survey-save/survey-save.component';
import { QuestionComponent } from './survey/question/question.component';
import { ForgetPasswordComponent } from './others/forget-password/forget-password.component';
import { LoginComponent } from './others/login/login.component';
import { WordCloudSaveComponent } from "./word-cloud-filter/word-cloud-save/word-cloud-save.component";
import { WordCloudListComponent } from "./word-cloud-filter/word-cloud-list/word-cloud-list.component";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NotFoundComponent } from './others/not-found/not-found.component';
import { LocationComponent } from "./location/location-main/location.component";
import { LocationCreateComponent } from "./location/location-create/location-create.component";
import { TeamComponent } from './team/team.component';
import { TeamSaveComponent } from './team-save/team-save.component';
import { NewsMainComponent } from "./news/news-main/news-main.component";
import { NewsCreateComponent } from "./news/news-create/news-create.component";
import { DepartmentComponent } from './department/department.component';
import { DepartmentSaveComponent } from './department-save/department-save.component';
import { WorkplaceComponent } from './workplace/workplace.component';
import { WorkplaceSaveComponent } from './workplace-save/workplace-save.component';
import { NewsDetailComponent } from './news/news-detail/news-detail.component';

const routes: Routes = [
  { path: "", component:HomeComponent},
  { path: "home", component:HomeComponent},
  { path: "register", component:RegisterComponent},
  { path: "confirmReg", component: ConfirmRegisterComponent},
  { path: "admin/wordCloud", component: WordCloudListComponent },
  { path: "admin/create", component: WordCloudSaveComponent },
  { path: "404",  component: NotFoundComponent },
  { path: "forget", component: ForgetPasswordComponent},
  { path: "login", component: LoginComponent},
  { path: "news", component: NewsMainComponent },
  { path: "news/create", component: NewsCreateComponent },
  { path:"report", component:SurveyReportComponent},
  { path: "q", component: SendOutSurveyComponent},
  { path: "memInvite", component:InvitationComponent},
  { path: "take", component:SurveyTakeComponent},
  { path: "team", component:TeamComponent},
  { path: "team/save", component:TeamSaveComponent},
  { path: "department", component:DepartmentComponent},
  { path: "department/save", component:DepartmentSaveComponent},
  { path:"take", component:SurveyTakeComponent},
  { path: "location", component: LocationComponent },
  { path: "location/create", component: LocationCreateComponent },
  { path: "workplace", component:WorkplaceComponent},
  { path: "workplace/save", component:WorkplaceSaveComponent},
  { path: "news/:id/detail", component:NewsDetailComponent},
  { path: "**", redirectTo: "404" },
  
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
