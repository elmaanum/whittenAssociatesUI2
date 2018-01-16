import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Thumbnail } from '../thumbnail';
import {DomSanitizer} from '@angular/platform-browser';

@Injectable()
export class DropboxService {
    private _Dropbox = require('dropbox');
    private dbx = new this._Dropbox({accessToken: '4DoLY_hotPAAAAAAAAAOkw8YImtvR_v3ZD0HdykEFsWsWqo8AUQUdB3cTZy_f3FZ'});
    private portfolioThumbs = [];
    private aboutThumbs = [];
    constructor(private sanitizer: DomSanitizer) {}

  getThumbnails(thumbType):  Promise<Thumbnail[]> {
      if (thumbType === 'portfolio') {
        return Promise.resolve(this.portfolioThumbs);
      } else if (thumbType === 'about') {
        return Promise.resolve(this.aboutThumbs);
      }
  }

  setThumbnails() {
    const promisesArray = [];
    this.getFileList()
      .then(result => {
        result.entries.forEach(element => {
          if (element['media_info']) {
            const thumbPromise = this.dbx.filesGetThumbnail({path: element.path_lower, size: 'w1024h768'});
              return promisesArray.push(thumbPromise);
            }
        });
        return promisesArray;
    })
    .then(fileListResult => {
      console.log('fileListResult', fileListResult);
      Observable.forkJoin(fileListResult)
        .subscribe(thumbs => {
          console.log('allthumbs', thumbs);
          for (const key in thumbs) {
            if (thumbs.hasOwnProperty(key)) {
              const element = thumbs[key];
              const url = URL.createObjectURL(element['fileBlob']);
              const sanitizedUrl = this.sanitizer.bypassSecurityTrustUrl(url);
              const pathSplit = element['path_display'].split('/');
              if (pathSplit[1] === 'portfolio') {
                this.portfolioThumbs.push({
                  imageUrl: sanitizedUrl,
                  folderName: pathSplit[2],
                  superFolder: pathSplit[1]
                });
              } else if (pathSplit[1] === 'about') {
                this.aboutThumbs.push({
                  imageUrl: sanitizedUrl,
                  folderName: pathSplit[2],
                  superFolder: pathSplit[1]
                });
              }
            }
          }
        });
    });
  }

  getFileList() {
      return this.dbx.filesListFolder({path: '', recursive: true, include_media_info: true});
  }
  // temporarily unused
  // getThumbNailInfo(result) {
  //     return new Observable(observer => {
  //         for (var i = 0; result.entries[i]; i++) {
  //             if (result.entries[i]['media_info']) {
  //                 this.dbx.filesGetThumbnail({path: result.entries[i].path_lower, size:'w1024h768'})
  //                 .then(function (data) {
  //                     observer.next(data)
  //                 })
  //                 .catch(function (err) {
  //                     throw err;
  //                 });
  //             }
  //         }
  //     })
  // }
  // setThumbnailsOld() {
  //     return new Promise((resolve, reject)=> {
  //         let filelist = this.getFileList();
  //         let thumbnailinfo = filelist.then(result => {
  //             return this.getThumbNailInfo(result)
  //         })
  //         .then(result =>{
  //             result.forEach(value => {
  //                 this.thumbnails.push({
  //                     imageUrl:window.URL.createObjectURL(value['fileBlob']),
  //                     folderName:value['path_display'].split('/')[1]
  //                 })
  //             })
  //         })
  //         resolve(this.thumbnails)
  //     })
  // }
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
  // getThumbs(){
  //     return new Promise((resolve, reject)=> {
  //         this.setThumbnails().then(result=>{
  //             resolve(result)
  //         })
  //     })
  // }
}

// export const THUMBNAILS = new DropBoxService().getThumbs()
