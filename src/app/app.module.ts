import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { FormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { JsonpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { ProjectsComponent } from './projects/projects.component';
import { HomeComponent } from './home/home.component';

import { DropboxService } from './services/dropbox.service';
import { SubProjectsComponent } from './projects/sub-projects/sub-projects.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    HomeComponent,
    SubProjectsComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'projects/:folderName', component: SubProjectsComponent },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
    ])
  ],
  providers: [DropboxService],
  bootstrap: [AppComponent]
})
export class AppModule {}
