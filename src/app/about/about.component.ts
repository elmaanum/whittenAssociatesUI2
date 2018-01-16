import { Component, OnInit } from '@angular/core';
import { Thumbnail } from '../thumbnail';
import { DropboxService } from '../services/dropbox.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  thumbnails: Thumbnail[];

  constructor(private dropboxService: DropboxService) { }

  ngOnInit() {
    this.dropboxService.getThumbnails('about').then(thumbnails => this.thumbnails = thumbnails);
  }

}
