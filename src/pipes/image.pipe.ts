import { Pipe, PipeTransform } from '@angular/core';
import { WordPressProvider } from '../providers/word-press/word-press';
import * as _ from 'lodash';
import { Observable } from 'rxjs';

@Pipe({
    name: 'cardImage'
})
export class CardImagePipe implements PipeTransform {

    constructor(private wp: WordPressProvider) { }

    transform(alohaMenuId: any, menuItemMap?: any) {
        if(alohaMenuId) {
            let postObj = _.find(menuItemMap, {'menuid' : String(alohaMenuId)});

            if(postObj !== undefined){
                return this.wp.getCustomPostTypeById('menu_item', postObj.id).map(post => {
                if(post.acf.submenu_image !== undefined){
                    return post.acf.submenu_image.url;
                }
                else{
                    return "//via.placeholder.com/265x115";
                }
                });
            }
            else{
                return Observable.of("//via.placeholder.com/265x115");
            }
        }
    }
}
