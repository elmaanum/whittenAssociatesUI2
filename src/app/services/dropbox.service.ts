import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs/Rx';
import { Thumbnail } from '../thumbnail';

@Injectable()
export class DropboxService {
  private _Dropbox = require('dropbox');
  private dbx = new this._Dropbox({accessToken: '4DoLY_hotPAAAAAAAAAOkw8YImtvR_v3ZD0HdykEFsWsWqo8AUQUdB3cTZy_f3FZ'});
  private portfolioThumbs = [];
  private aboutThumbs = [];
  constructor(private sanitizer: DomSanitizer) {}

  getThumbnails(thumbType): Promise<Thumbnail[]> {
      return thumbType === 'portfolio'
        ? Promise.resolve(this.portfolioThumbs)
        : Promise.resolve(this.aboutThumbs);
  }

  setThumbnails(): void {
    this.getFileList([])
      .then(fileListResult => {
        Observable.forkJoin(fileListResult)
          .subscribe(thumbs => {
            thumbs.map(element => {
              const displayPathSplit = element['path_display'].split('/');
              const thumb = {
                imageUrl: this.sanitizer.bypassSecurityTrustUrl(
                  URL.createObjectURL(element['fileBlob'])
                ),
                superFolder: displayPathSplit[1],
                folderName: displayPathSplit[2],
              } as Thumbnail;
              if (thumb.superFolder === 'portfolio') {
                this.portfolioThumbs.push(thumb);
              } else if (thumb.superFolder === 'about') {
                this.aboutThumbs.push(thumb);
              }
            });
          });
      });
  }

  getFileList(promisesArray): Promise<Promise<object[]>[]> {
      return this.dbx.filesListFolder(
        {path: '', recursive: true, include_media_info: true}
      )
        .then(result => {
          result.entries.forEach(element => element['media_info']
              ?  promisesArray.push(
                this.dbx.filesGetThumbnail(
                  {path: element.path_lower, size: 'w1024h768'}
                )
              )
              : null,
          );
          return promisesArray;
        });
  }

  getTemporaryDownloadLink(result) {
      const array = [];
      for (let i = 0; result.entries[i]; i++) {
          if (result.entries[i]['.tag'] === 'file') {
              this.dbx.filesGetTemporaryLink({path: result.entries[i].path_lower})
              .then(function (data) {
                  array.push(data);
              })
              .catch(function (err) {
                  throw err;
              });
          }
      }
      return array;
  }
}
