import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thumbnailFilter',
  pure: false
})
export class ThumbnailFilterPipe implements PipeTransform {

    transform(items: any[], filter: Object): any {
        if (!items || !filter) {
            return items;
        }
        return items.filter(item => item.folderName.indexOf(filter['folderName']) !== -1);
    }

}
