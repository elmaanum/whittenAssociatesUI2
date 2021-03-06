import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { ProjectsComponent } from './projects/projects.component';
import { HomeComponent } from './home/home.component';

import { DropboxService } from './services/dropbox.service';
import { ExpertiseComponent } from './expertise/expertise.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { ThumbnailFilterPipe } from './thumbnail-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    HomeComponent,
    ExpertiseComponent,
    ContactComponent,
    FooterComponent,
    AboutComponent,
    ThumbnailFilterPipe,
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
  ],
  providers: [DropboxService],
  bootstrap: [AppComponent]
})
export class AppModule {}
