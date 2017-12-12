import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Thumbnail } from '../thumbnail';
import { DropboxService } from '../services/dropbox.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  // styleUrls: ['../app.component.css','../app.component.scss']
})
export class ProjectsComponent implements OnInit {
  title: "Projects"
  thumbnails: Thumbnail[];
  selectedHero: Thumbnail;
  folderName: string;
  filterArgs = undefined;

  constructor(private dropboxService: DropboxService,
              private router: Router,
              private route: ActivatedRoute,) { }

  getThumbnails(): void {
    this.dropboxService.getThumbnails().then(thumbnails => this.thumbnails = thumbnails);
  }
  
  toggleFilter(arg) {
    if(arg != 'All'){
        this.filterArgs = {folderName: arg}
    } else {
      this.filterArgs = undefined
    }
  }
  
  ngOnInit(): void {
    this.getThumbnails();
    this.route.params.subscribe((params) => {
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
