import { Injectable, SecurityContext } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Thumbnail } from '../thumbnail';
import {DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl} from '@angular/platform-browser';

@Injectable()
export class DropboxService {
    private _Dropbox = require('dropbox');
    private dbx = new this._Dropbox({accessToken: '4DoLY_hotPAAAAAAAAAOkw8YImtvR_v3ZD0HdykEFsWsWqo8AUQUdB3cTZy_f3FZ'});
    private thumbnails = [];

    constructor(private sanitizer: DomSanitizer) {}

   getThumbnails():  Promise<Thumbnail[]>{ 
        console.log('get.thumbnails',this.thumbnails)
        return Promise.resolve(this.thumbnails);
    }

    setThumbnails(){
        let promises = []
        this.getFileList()
        .then(result => {
            result.entries.forEach(element => {
                if (element['media_info']) {
                    var thumbPromise = this.dbx.filesGetThumbnail({path: element.path_lower, size:'w1024h768'})
                    promises.push(thumbPromise)
                }
            })
        })
        .then(result => {
            Observable.forkJoin(promises)
            .subscribe(t => {
            console.log('t', t)
                let thumbNails=[];
                for (var key in t) {
                    if (t.hasOwnProperty(key)) {
                        var element = t[key];
                        let url = URL.createObjectURL(element['fileBlob'])
                        let sanitizedUrl = this.sanitizer.bypassSecurityTrustUrl(url);
                        this.thumbnails.push({
                            imageUrl:sanitizedUrl,
                            folderName:element['path_display'].split('/')[1]
                        })
                    }
                }
            })
        })
    }

    getFileList() {
        return this.dbx.filesListFolder({path: '', recursive: true, include_media_info: true})
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
        var array = [];
        for (var i = 0; result.entries[i]; i++) {
            if (result.entries[i]['.tag'] === 'file') {
                this.dbx.filesGetTemporaryLink({path: result.entries[i].path_lower})
                .then(function (data) {
                    //console.log("filesGetTemporaryLink", data)
                    array.push(data)
                })
                .catch(function (err) {
                    throw err;
                });
            }
        }
        return array
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