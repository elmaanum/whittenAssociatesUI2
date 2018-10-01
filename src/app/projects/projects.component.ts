import { Component, OnInit } from '@angular/core';
import { Thumbnail } from '../thumbnail';
import { DropboxService } from '../services/dropbox.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: []
})
export class ProjectsComponent implements OnInit {
  title: 'Projects';
  thumbnails: Thumbnail[];
  folderName: string;
  filterArgs: object;

  constructor(private dropboxService: DropboxService) { }
  ngOnInit() {
    this.dropboxService.getThumbnails('portfolio')
      .then(thumbnails => this.thumbnails = thumbnails);
  }
  toggleFilter(selectedType) {
    this.filterArgs = selectedType !== 'All'
      ? {folderName: selectedType}
      : null;
  }
}
