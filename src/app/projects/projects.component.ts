import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Thumbnail } from '../thumbnail';
import { DropboxService } from '../services/dropbox.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'projects',
  templateUrl: './projects.component.html',
  // styleUrls: ['../app.component.css','../app.component.scss']
})
export class ProjectsComponent implements OnInit {
  title: "Projects"
  thumbnails: Thumbnail[];
  selectedHero: Thumbnail;
  folderName: string;

  constructor(private dropboxService: DropboxService,
              private router: Router,
              private route: ActivatedRoute,) { }

  getThumbnails(): void {
    this.dropboxService.getThumbnails().then(thumbnails => this.thumbnails = thumbnails);
  }
 
  ngOnInit(): void {
    this.getThumbnails();

    this.route.params.subscribe((params) => {
      console.log('params',params)
      this.folderName = params['folderName'];
    })
  }
 
  onSelect(thumbnail: Thumbnail): void {
    this.selectedHero = thumbnail;
  }

  openSubProject(thumbnail) {
    this.router.navigateByUrl(`/projects/${thumbnail.folderName}`);
  }

}
