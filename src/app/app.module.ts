import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { WordCloudListComponent } from "./word-cloud-list/word-cloud-list.component";
import { WordCloudSaveComponent } from "./word-cloud-save/word-cloud-save.component";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { TeamComponent } from './team/team.component';
import { TeamSaveComponent } from './team-save/team-save.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WordCloudListComponent,
    WordCloudSaveComponent,
    TeamComponent,
    TeamSaveComponent
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule, AppRoutingModule],
  entryComponents: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
