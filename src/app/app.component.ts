import { Component, OnInit } from '@angular/core';
import { DropboxService } from './services/dropbox.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent implements OnInit {
  constructor(private _dropboxService: DropboxService) {}
  ngOnInit() {
    this._dropboxService.setThumbnails();
  }
}
