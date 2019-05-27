import { WordCloudSaveComponent } from './word-cloud-save/word-cloud-save.component';
import { WordCloudListComponent } from './word-cloud-list/word-cloud-list.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamComponent } from './team/team.component';
import { TeamSaveComponent } from './team-save/team-save.component';
const routes:Routes = [
  {path: "admin/wordCloud", component:WordCloudListComponent},
  {path: "admin/create", component:WordCloudSaveComponent},
  {path: "team", component:TeamComponent},
  {path: "team/create", component:TeamSaveComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
