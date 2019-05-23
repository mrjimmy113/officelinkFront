import { WordCloudSaveComponent } from './word-cloud-save/word-cloud-save.component';
import { WordCloudListComponent } from './word-cloud-list/word-cloud-list.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
const routes:Routes = [
  {path: "admin/wordCloud", component:WordCloudListComponent},
  {path: "admin/create", component:WordCloudSaveComponent}
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
