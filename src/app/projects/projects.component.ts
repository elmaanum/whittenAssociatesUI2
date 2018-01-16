import { Component, OnInit } from '@angular/core';
import { Thumbnail } from '../thumbnail';
import { DropboxService } from '../services/dropbox.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  // styleUrls: ['../app.component.css','../app.component.scss']
})
export class ProjectsComponent implements OnInit {
  title: 'Projects';
  thumbnails: Thumbnail[];
  folderName: string;
  filterArgs = undefined;

  constructor(private dropboxService: DropboxService) { }
  ngOnInit() {
    this.dropboxService.getThumbnails('portfolio').then(thumbnails => this.thumbnails = thumbnails);
  }
  toggleFilter(selectedType) {
    if (selectedType !== 'All') {
        this.filterArgs = {folderName: selectedType};
    } else {
      this.filterArgs = undefined;
    }
  }
}
