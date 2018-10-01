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
  timBioPicURL: string;
  heatherBioPicURL: string;

  constructor(private dropBoxService: DropboxService) { }

  ngOnInit() {
    this.timBioPicURL = '';
    this.heatherBioPicURL = '';
    this.dropBoxService.getThumbnails('about')
      .then(thumbs => new Promise(resolve =>
        setTimeout(() => resolve(this.thumbnails = thumbs), 5000))
      )
      .then(results => this.setBioPic(results));
  }

  setBioPic(thumbNails) {
    thumbNails.map(thumbNail => {
      this.heatherBioPicURL = thumbNail.folderName.includes('heather')
        ? thumbNail.url
        : '';
      this.timBioPicURL = thumbNail.folderName.includes('tim')
        ? thumbNail.url
        : '';
    });
  }
}
