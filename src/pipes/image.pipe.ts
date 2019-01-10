import { Pipe, PipeTransform } from '@angular/core';
import { WordPressProvider } from '../providers/word-press/word-press';
import * as _ from 'lodash';
import { Observable } from 'rxjs';

@Pipe({
    name: 'cardImage'
})
export class CardImagePipe implements PipeTransform {

    constructor(private wpService: WordPressProvider) { }

    transform(alohaMenuId: any, menuItemMap?: any) {
        // console.log(alohaMenuId)
      if(alohaMenuId) {
        let postObj = _.find(menuItemMap, {'menuid' : String(alohaMenuId)});
        // console.log('post-obj', postObj)
        if(postObj !== undefined){
          return this.wpService.getCustomPostTypeById('menu_item', postObj['id']).map(post => {
            //   console.log(post)
            if(post.acf.submenu_image !== undefined){
              return post.acf.submenu_image.url;
            }
            else{
              return "";
            }
          });
        }
        else{
          return Observable.of('');
        }
      }
    }

  }