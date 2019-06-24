import { SurveyListComponent } from './survey/survey-list/survey-list.component';
import { ChooseQuestionComponent } from './survey/choose-question/choose-question.component';
import { QuestionListComponent } from './question/question-list/question-list.component';
import { SurveyReportComponent } from './survey/survey-report/survey-report.component';
import { SurveyTakeComponent } from './survey/survey-take/survey-take.component';
import { InvitationComponent } from './account/invitation/invitation.component';
import { SendOutSurveyComponent } from './survey/send-out-survey/send-out-survey.component';
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
import { TeamComponent } from './team/team.component';
import { TeamSaveComponent } from './team-save/team-save.component';
import { DepartmentComponent } from './department/department.component';
import { DepartmentSaveComponent } from './department-save/department-save.component';
import { LocationComponent } from "./location/location.component";
import { LocationCreateComponent } from "./location-create/location-create.component";
import { TeamComponent } from './team/team.component';
import { TeamSaveComponent } from './team-save/team-save.component';
import { WorkplaceComponent } from './workplace/workplace.component';
import { WorkplaceSaveComponent } from './workplace-save/workplace-save.component';

import { AccountListComponent } from './account/account-list/account-list.component';
import { AccountSaveComponent } from './account/account-save/account-save.component';
import { AccountDeleteComponent } from './account/account-delete/account-delete.component';
import { JoinComponent } from './others/join/join.component'


import { from } from 'rxjs';
import { Login2Component } from './others/login2/login2.component';

const routes: Routes = [
  { path: "", component:HomeComponent},
  { path: "home", component:HomeComponent},

  { path: "register", component:RegisterComponent},
  { path: "admin/wordCloud", component: WordCloudListComponent },
  { path: "admin/create", component: WordCloudSaveComponent },


  { path: "join" , component: JoinComponent},
  { path: "admin/account", component:AccountListComponent},
  { path: "admin/account/create" , component:AccountSaveComponent},
  { path: "admin/account/delete", component:AccountDeleteComponent},
  { path:"login" , component: Login2Component,  },
  { path: "login-form/:emailToken", component: LoginComponent, },
  

  { path: "404",  component: NotFoundComponent },
  { path: "forget", component: ForgetPasswordComponent},
  { path: "login", component: LoginComponent},
  { path: "q", component: SurveySaveComponent},
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
  { path:"report", component:SurveyReportComponent},
  { path:"question",component: QuestionListComponent},
  { path:"survey", component: SurveySaveComponent},
  { path:"choose", component: ChooseQuestionComponent},
  { path: "survey/list",component:SurveyListComponent},
  { path: "**", redirectTo: "404" },
  
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
